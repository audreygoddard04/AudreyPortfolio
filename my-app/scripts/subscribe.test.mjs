import test from "node:test";
import assert from "node:assert/strict";
import { createSubscribeHandler } from "../pages/api/subscribe.js";
const identity = { firstName: "Audrey", lastName: "Goddard", gender: "female" };
const env = {
  RESEND_API_KEY: "test-key",
  RESEND_KELTNER_SEGMENT_ID: "keltner-segment",
};
async function request(options = {}, overrides = {}) {
  const response = {
    headers: {},
    setHeader(key, value) {
      this.headers[key] = value;
    },
    status(code) {
      this.code = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
  await createSubscribeHandler({
    getContact: async () => ({ error: { name: "not_found" } }),
    listContactSegments: async () => ({ data: { data: [], has_more: false } }),
    queueWelcome: async () => ({ data: { event: "keltner.subscribed" } }),
    updateContact: async () => ({ data: { id: "contact-id" } }),
    ...options,
  })(
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: { ...identity, email: "Reader@example.com" },
      ...overrides,
    },
    response,
  );
  return response;
}
test("Subscription rejects unsupported methods, content types, and malformed email", async () => {
  const get = await request({}, { method: "GET" });
  assert.equal(get.code, 405);
  assert.equal(get.headers.Allow, "POST");
  assert.equal((await request({}, { headers: {} })).code, 415);
  for (const email of [
    "",
    "bad@",
    ["reader@example.com"],
    "x".repeat(255) + "@example.com",
  ]) {
    assert.equal((await request({}, { body: { email } })).code, 400);
  }
});
test("Missing newsletter configuration never reports a successful subscription", async () => {
  const result = await request({ env: {} });
  assert.equal(result.code, 503);
  assert.ok(result.body.error);
});
test("Successful signup records the normalized email in the KELTNER segment", async () => {
  let sent;
  const result = await request({
    env,
    createContact: async (contact) => {
      sent = contact;
      return { data: { id: "contact-id" }, error: null };
    },
  });
  assert.equal(result.code, 200);
  assert.deepEqual(sent, {
    email: "reader@example.com",
    firstName: "Audrey",
    lastName: "Goddard",
    properties: { gender: "female", salutation: "Ms. Goddard" },
    unsubscribed: false,
    segments: [{ id: "keltner-segment" }],
  });
  assert.equal(result.body.success, true);
});
test("Provider failures and network errors return retryable errors without exposing secrets", async () => {
  for (const createContact of [
    async () => ({ error: { message: "private provider details" } }),
    async () => {
      throw new Error("private credentials");
    },
  ]) {
    const result = await request({ env, createContact });
    assert.equal(result.code, 502);
    assert.ok(!JSON.stringify(result.body).includes("private"));
  }
});

test("Popup signup passes the first name to Resend and rejects excessive length", async () => {
  let sent;
  const result = await request(
    {
      env,
      createContact: async (contact) => {
        sent = contact;
        return { data: { id: "contact-id" } };
      },
    },
    {
      body: { ...identity, email: "reader@example.com", firstName: " Audrey " },
    },
  );
  assert.equal(result.code, 200);
  assert.equal(sent.firstName, "Audrey");
  assert.equal(
    (
      await request(
        { env },
        {
          body: {
            ...identity,
            email: "reader@example.com",
            firstName: "a".repeat(81),
          },
        },
      )
    ).code,
    400,
  );
});

test("New subscribers trigger the welcome workflow and persist its accepted status", async () => {
  const calls = [];
  const result = await request({
    env,
    createContact: async () => ({ data: { id: "contact-id" } }),
    queueWelcome: async (payload) => {
      calls.push(payload);
      return { data: { event: payload.event } };
    },
    updateContact: async (payload) => {
      calls.push(payload);
      return { data: { id: payload.id } };
    },
  });
  assert.equal(result.code, 200);
  assert.deepEqual(calls, [
    { event: "keltner.subscribed", contactId: "contact-id" },
    { id: "contact-id", properties: { keltner_welcome_queued: "yes" } },
  ]);
});

test("Repeated signups do not queue another welcome", async () => {
  const result = await request({
    env,
    getContact: async () => ({
      data: { id: "existing", properties: { keltner_welcome_queued: { value: "yes" } } },
    }),
    createContact: async () => ({ data: { id: "contact-id" } }),
    queueWelcome: async () => {
      assert.fail("Duplicate welcome");
    },
  });
  assert.equal(result.code, 200);
});

test("Welcome queue failures can be retried and do not mark the welcome accepted", async () => {
  const result = await request({
    env,
    createContact: async () => ({ data: { id: "contact-id" } }),
    queueWelcome: async () => ({ error: { message: "secret" } }),
    updateContact: async () => {
      assert.fail("Must not mark a failed welcome");
    },
  });
  assert.equal(result.code, 502);
  assert.ok(!JSON.stringify(result.body).includes("secret"));
});

test("Existing opt-outs and lookup failures cannot be overwritten", async () => {
  for (const [lookup, status] of [
    [{ data: { unsubscribed: true } }, 409],
    [{ error: { name: "invalid_api_key", message: "secret" } }, 502],
  ]) {
    const result = await request({
      env,
      getContact: async () => lookup,
      createContact: async () => {
        assert.fail("Must not overwrite contact");
      },
    });
    assert.equal(result.code, status);
  }
});

test("Identity is required, validated, and normalized before a welcome is queued", async () => {
  for (const patch of [
    { firstName: " " },
    { lastName: "" },
    { lastName: "a".repeat(81) },
    { gender: "" },
    { gender: "other" },
    { gender: [] },
    { lastName: "<b>Smith</b>" },
    { lastName: "Smith\nTest" },
  ]) {
    const result = await request(
      {
        env,
        createContact: async () =>
          assert.fail("Invalid identity cannot be saved"),
      },
      { body: { email: "reader@example.com", ...identity, ...patch } },
    );
    assert.equal(result.code, 400);
  }
  let saved;
  const result = await request(
    {
      env,
      createContact: async (contact) => {
        saved = contact;
        return { data: { id: "contact-id" } };
      },
    },
    {
      body: {
        email: "reader@example.com",
        firstName: " José ",
        lastName: " O’Neill-Smith ",
        gender: "male",
      },
    },
  );
  assert.equal(result.code, 200);
  assert.equal(saved.firstName, "José");
  assert.equal(saved.lastName, "O’Neill-Smith");
  assert.deepEqual(saved.properties, {
    gender: "male",
    salutation: "Mr. O’Neill-Smith",
  });
});

test("Already subscribed addresses return a friendly status without profile changes or welcome emails", async () => {
  const result = await request({
    env,
    getContact: async () => ({
      data: {
        id: "existing",
        properties: { keltner_welcome_queued: { value: "yes" } },
      },
    }),
    listContactSegments: async () => ({
      data: { data: [{ id: "keltner-segment" }], has_more: false },
    }),
    createContact: async () =>
      assert.fail("Do not recreate existing subscriber"),
    updateContact: async () =>
      assert.fail("Do not overwrite subscriber profile"),
    queueWelcome: async () => assert.fail("Do not resend welcome"),
  });
  assert.equal(result.code, 200);
  assert.deepEqual(result.body, { success: true, alreadySubscribed: true });
});
test("Imported KELTNER subscribers are recognized across segment pages", async () => {
  const result = await request({
    env,
    getContact: async () => ({ data: { id: "existing" } }),
    listContactSegments: async ({ after }) => ({
      data: {
        data: [{ id: after ? "keltner-segment" : "other-list" }],
        has_more: !after,
      },
    }),
    createContact: async () => assert.fail("Already in newsletter"),
    queueWelcome: async () => assert.fail("Do not resend welcome"),
  });
  assert.deepEqual(result.body, { success: true, alreadySubscribed: true });
});
test("A contact in another list can join KELTNER", async () => {
  let welcomed = false;
  const result = await request({
    env,
    getContact: async () => ({ data: { id: "existing" } }),
    listContactSegments: async () => ({
      data: { data: [{ id: "other-list" }], has_more: false },
    }),
    createContact: async () => ({ data: { id: "existing" } }),
    queueWelcome: async () => {
      welcomed = true;
      return { data: { event: "keltner.subscribed" } };
    },
  });
  assert.equal(result.code, 200);
  assert.equal(result.body.alreadySubscribed, undefined);
  assert.equal(welcomed, true);
});
test("Membership lookup failures do not create contacts or send welcomes", async () => {
  const result = await request({
    env,
    getContact: async () => ({ data: { id: "existing" } }),
    listContactSegments: async () => ({ error: { name: "provider_error" } }),
    createContact: async () => assert.fail("Do not mutate on lookup failure"),
  });
  assert.equal(result.code, 502);
});
test("A failed profile update cannot queue a welcome", async () => {
  const result = await request({
    env,
    getContact: async () => ({ data: { id: "existing" } }),
    updateContact: async () => ({ error: { name: "validation_error" } }),
    createContact: async () => assert.fail("Stop after failed profile save"),
    queueWelcome: async () => assert.fail("Do not queue welcome"),
  });
  assert.equal(result.code, 502);
});

 test("A former member with a welcome marker can rejoin without a false duplicate message", async () => {
  let joined = false;
  const result = await request({
    env,
    getContact: async () => ({ data: {
      id: "former-member",
      properties: { keltner_welcome_queued: { value: "yes" } },
    } }),
    listContactSegments: async () => ({ data: { data: [], has_more: false } }),
    createContact: async () => { joined = true; return { data: { id: "former-member" } }; },
    queueWelcome: async () => assert.fail("Do not repeat an accepted welcome"),
  });
  assert.equal(joined, true);
  assert.deepEqual(result.body, { success: true });
});

test("A deleted contact is enrolled as new and receives a new welcome event", async () => {
  let welcomed = false;
  const result = await request({
    env,
    getContact: async () => ({ data: null, error: { name: "not_found" } }),
    listContactSegments: async () => assert.fail("Deleted contacts have no membership"),
    createContact: async () => ({ data: { id: "new-contact" } }),
    queueWelcome: async ({ contactId }) => { assert.equal(contactId, "new-contact"); welcomed = true; return { data: { id: "new-event" } }; },
  });
  assert.equal(welcomed, true);
  assert.deepEqual(result.body, { success: true });
});

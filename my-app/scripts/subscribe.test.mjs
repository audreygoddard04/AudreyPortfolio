import test from "node:test";
import assert from "node:assert/strict";
import { createSubscribeHandler } from "../pages/api/subscribe.js";
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
    queueWelcome: async () => ({ data: { event: "keltner.subscribed" } }),
    updateContact: async () => ({ data: { id: "contact-id" } }),
    ...options,
  })(
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: { email: "Reader@example.com" },
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
    { body: { email: "reader@example.com", firstName: " Audrey " } },
  );
  assert.equal(result.code, 200);
  assert.equal(sent.firstName, "Audrey");
  assert.equal(
    (
      await request(
        { env },
        { body: { email: "reader@example.com", firstName: "a".repeat(81) } },
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
    queueWelcome: async (payload) => { calls.push(payload); return { data: { event: payload.event } }; },
    updateContact: async (payload) => { calls.push(payload); return { data: { id: payload.id } }; },
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
    getContact: async () => ({ data: { properties: { keltner_welcome_queued: { value: "yes" } } } }),
    createContact: async () => ({ data: { id: "contact-id" } }),
    queueWelcome: async () => { assert.fail("Duplicate welcome"); },
  });
  assert.equal(result.code, 200);
});

test("Welcome queue failures can be retried and do not mark the welcome accepted", async () => {
  const result = await request({
    env,
    createContact: async () => ({ data: { id: "contact-id" } }),
    queueWelcome: async () => ({ error: { message: "secret" } }),
    updateContact: async () => { assert.fail("Must not mark a failed welcome"); },
  });
  assert.equal(result.code, 502);
  assert.ok(!JSON.stringify(result.body).includes("secret"));
});

test("Existing opt-outs and lookup failures cannot be overwritten", async () => {
  for (const [lookup, status] of [
    [{ data: { unsubscribed: true } }, 409],
    [{ error: { name: "invalid_api_key", message: "secret" } }, 502],
  ]) {
    const result = await request({ env,
      getContact: async () => lookup,
      createContact: async () => { assert.fail("Must not overwrite contact"); },
    });
    assert.equal(result.code, status);
  }
});

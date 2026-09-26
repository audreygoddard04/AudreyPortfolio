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
  await createSubscribeHandler(options)(
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

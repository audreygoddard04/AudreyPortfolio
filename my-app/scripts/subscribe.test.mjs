import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { createSubscribeHandler } from '../src/server/subscribe.mjs';

function setup(options = {}) {
  const calls = [], logs = [];
  const contacts = {
    get: async input => { calls.push(['get', input]); return { error: { statusCode: 404 } }; },
    create: async input => { calls.push(['create', input]); return { data: { id: 'test-contact' } }; },
    segments: { add: async input => { calls.push(['segment', input]); return { data: { id: 'segment' } }; } },
    ...options.contacts,
  };
  const handler = createSubscribeHandler({
    env: { RESEND_API_KEY: 'test-only-not-a-real-key', ...options.env },
    makeClient: () => ({ contacts }),
    logger: { error: (...args) => logs.push(args) },
    ...options.handler,
  });
  async function request(body = { email: ' reader@example.com ' }, opts = {}) {
    const req = Readable.from([opts.raw ?? JSON.stringify(body)]);
    req.method = opts.method || 'POST';
    req.headers = { host: 'example.com', origin: 'https://example.com', 'content-type': 'application/json', ...opts.headers };
    req.socket = { remoteAddress: '127.0.0.1' };
    const res = { statusCode: 200, headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(code) { this.statusCode = code; return this; }, json(value) { this.body = value; return this; } };
    await handler(req, res);
    return res;
  }
  return { request, calls, logs };
}

test('creates a normalized contact and returns only the public success message', async () => {
  const { request, calls } = setup();
  const res = await request({ email: ' Reader+News@Example.com ' });
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { success: true, message: "You're on the list." });
  assert.deepEqual(calls[1], ['create', { email: 'reader+news@example.com' }]);
  assert.equal(res.headers['Cache-Control'], 'no-store');
});
test('invalid emails and bodies never call Resend', async () => {
  for (const email of ['', null, 23, 'a', 'a@b', 'a..b@example.com', '.a@example.com', 'a@-example.com', 'a@x..com', 'a\nb@example.com', 'a'.repeat(65)+'@example.com']) {
    const { request, calls } = setup();
    assert.equal((await request({ email })).statusCode, 400);
    assert.equal(calls.length, 0);
  }
  for (const raw of ['{', 'null', '[]', '"text"']) assert.equal((await setup().request(null, { raw })).statusCode, 400);
});
test('method, origin, type, and bounded stream checks reject unsafe requests', async () => {
  for (const [opts, status] of [
    [{ method: 'GET' }, 405],
    [{ headers: { origin: 'https://elsewhere.test' } }, 403],
    [{ headers: { 'sec-fetch-site': 'cross-site' } }, 403],
    [{ headers: { 'content-type': 'text/plain' } }, 415],
    [{ raw: ' '.repeat(2049) }, 413],
    [{ headers: { 'content-length': '9999' } }, 413],
  ]) {
    const { request, calls } = setup();
    const res = await request(undefined, opts);
    assert.equal(res.statusCode, status);
    assert.equal(res.body.success, false);
    assert.equal(calls.length, 0);
  }
});
test('duplicates succeed without overwriting preferences or names', async () => {
  const { request, calls } = setup({ contacts: { get: async () => ({ data: { id: 'existing', unsubscribed: false } }) } });
  assert.equal((await request()).statusCode, 200);
  assert.equal(calls.length, 0);
});
test('existing opt-outs are preserved', async () => {
  const { request, calls } = setup({ contacts: { get: async () => ({ data: { id: 'existing', unsubscribed: true } }) } });
  assert.equal((await request()).statusCode, 409);
  assert.equal(calls.length, 0);
});
test('a concurrent duplicate is verified rather than blindly accepted', async () => {
  let lookups = 0;
  const { request } = setup({ contacts: {
    get: async () => ++lookups === 1 ? { error: { statusCode: 404 } } : { data: { id: 'existing', unsubscribed: false } },
    create: async () => ({ error: { statusCode: 409 } }),
  } });
  assert.equal((await request()).statusCode, 200);
  assert.equal(lookups, 2);
});
test('optional segment is applied to new and existing contacts', async () => {
  const fresh = setup({ env: { RESEND_KELTNER_SEGMENT_ID: 'keltner-segment' } });
  await fresh.request();
  assert.deepEqual(fresh.calls[1][1].segments, [{ id: 'keltner-segment' }]);
  const existing = setup({ env: { RESEND_KELTNER_SEGMENT_ID: 'keltner-segment' }, contacts: { get: async () => ({ data: { id: 'existing', unsubscribed: false } }) } });
  await existing.request();
  assert.deepEqual(existing.calls[0], ['segment', { email: 'reader@example.com', segmentId: 'keltner-segment' }]);
});
test('provider errors and exceptions do not leak emails or credentials', async () => {
  for (const get of [async () => ({ error: { statusCode: 403, message: 'private@example.com secret' } }), async () => { throw new Error('private@example.com secret'); }]) {
    const { request, logs } = setup({ contacts: { get } });
    const res = await request();
    assert.equal(res.statusCode, 503);
    assert.doesNotMatch(JSON.stringify([res.body, logs]), /private@example|secret|test-only/);
  }
});
test('provider throttling, missing configuration, honeypot, and local limit', async () => {
  const throttled = await setup({ contacts: { get: async () => ({ error: { statusCode: 429 } }) } }).request();
  assert.equal(throttled.statusCode, 429);
  assert.equal(throttled.headers['Retry-After'], '60');
  assert.equal((await setup({ env: { RESEND_API_KEY: '' } }).request()).statusCode, 503);
  const bot = setup();
  assert.equal((await bot.request({ email: 'bot@example.com', website: 'spam' })).statusCode, 200);
  assert.equal(bot.calls.length, 0);
  const limited = setup();
  for (let i = 0; i < 5; i++) await limited.request();
  assert.equal((await limited.request()).statusCode, 429);
});

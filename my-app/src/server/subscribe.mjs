import { createHash } from 'node:crypto';
import { Resend } from 'resend';

const SUCCESS = { success: true, message: "You're on the list." };
const UNAVAILABLE = 'Subscriptions are temporarily unavailable. Please try again shortly.';
const MAX_BYTES = 2048;

function normalizeEmail(value) {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  if (email.length > 254) return null;
  const [local, domain, extra] = email.split('@');
  if (!local || !domain || extra !== undefined || local.length > 64) return null;
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local) || /(^\.|\.$|\.\.)/.test(local)) return null;
  if (!domain.includes('.') || !domain.split('.').every(part => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(part))) return null;
  return email;
}

// Bounded, short-lived protection per server instance. Vercel WAF can enforce
// a shared limit across instances; never store or log raw IPs or email addresses.
function createLimiter() {
  const attempts = new Map();
  return (req) => {
    const now = Date.now();
    for (const [key, entry] of attempts) if (entry.until <= now) attempts.delete(key);
    const address = req.headers['x-vercel-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
    const key = createHash('sha256').update(String(address)).digest('hex');
    let entry = attempts.get(key);
    if (!entry) {
      if (attempts.size >= 1000) return false;
      entry = { count: 0, until: now + 60_000 };
      attempts.set(key, entry);
    }
    return ++entry.count <= 5;
  };
}

async function readBody(req) {
  let length = 0;
  const chunks = [];
  for await (const chunk of req) {
    length += Buffer.byteLength(chunk);
    if (length > MAX_BYTES) throw Object.assign(new Error(), { status: 413 });
    chunks.push(Buffer.from(chunk));
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw Object.assign(new Error(), { status: 400 }); }
}

async function capture(contacts, email, segmentId) {
  const existing = await contacts.get({ email });
  if (existing.error && existing.error.statusCode !== 404) return existing;
  if (existing.data) {
    // Public forms must not globally re-enable a contact who opted out.
    if (existing.data.unsubscribed) return { optedOut: true };
    return segmentId ? contacts.segments.add({ email, segmentId }) : existing;
  }
  // Omit unsubscribed so a simultaneous create cannot overwrite an opt-out.
  const result = await contacts.create({ email, ...(segmentId ? { segments: [{ id: segmentId }] } : {}) });
  if (result.error?.statusCode === 409) {
    const duplicate = await contacts.get({ email });
    if (duplicate.error || !duplicate.data) return duplicate;
    if (duplicate.data.unsubscribed) return { optedOut: true };
    return segmentId ? contacts.segments.add({ email, segmentId }) : duplicate;
  }
  return result;
}

export function createSubscribeHandler({ env = process.env, makeClient = key => new Resend(key), logger = console, allow = createLimiter() } = {}) {
  return async function subscribe(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    const fail = (status, error) => res.status(status).json({ success: false, error });
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return fail(405, 'Use POST to subscribe.');
    }
    const origin = req.headers.origin;
    const host = req.headers.host;
    if (req.headers['sec-fetch-site'] === 'cross-site') return fail(403, 'Please subscribe from the KELTNER website.');
    if (origin) {
      try {
        const url = new URL(origin);
        if (!['http:', 'https:'].includes(url.protocol) || url.host !== host) return fail(403, 'Please subscribe from the KELTNER website.');
      } catch { return fail(403, 'Please subscribe from the KELTNER website.'); }
    }
    if (req.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') return fail(415, 'Send the email address as JSON.');
    if (Number(req.headers['content-length']) > MAX_BYTES) return fail(413, 'The request is too large.');
    if (!allow(req)) {
      res.setHeader('Retry-After', '60');
      return fail(429, 'Too many attempts. Please wait a minute and try again.');
    }
    let body;
    try { body = await readBody(req); }
    catch (error) { return fail(error.status || 400, error.status === 413 ? 'The request is too large.' : 'Send valid JSON containing an email address.'); }
    const email = normalizeEmail(body?.email);
    if (!email) return fail(400, 'Please enter a valid email address.');
    if (body.website) return res.status(200).json(SUCCESS); // Honeypot: no provider call.
    if (!env.RESEND_API_KEY) {
      logger.error('newsletter_subscribe_failed', { code: 'missing_api_key' });
      return fail(503, UNAVAILABLE);
    }
    let timer;
    try {
      const result = await Promise.race([
        capture(makeClient(env.RESEND_API_KEY).contacts, email, env.RESEND_KELTNER_SEGMENT_ID),
        new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('timeout')), 15_000); }),
      ]);
      if (result.optedOut) return fail(409, 'This subscription cannot be completed here. Please contact Audrey to restore your newsletter preferences.');
      if (result.error || !result.data) {
        // Provider messages can contain emails: log only numeric status.
        const status = Number(result.error?.statusCode) || 502;
        logger.error('newsletter_subscribe_failed', { code: 'provider_error', status });
        if (status === 429) res.setHeader('Retry-After', '60');
        return fail(status === 429 ? 429 : 503, UNAVAILABLE);
      }
      return res.status(200).json(SUCCESS);
    } catch {
      logger.error('newsletter_subscribe_failed', { code: 'provider_unavailable' });
      return fail(503, UNAVAILABLE);
    } finally { clearTimeout(timer); }
  };
}

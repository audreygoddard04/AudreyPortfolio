import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
const base = process.env.TEST_BASE_URL || 'http://localhost:3360';
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
let mode = 'success', submissions = 0;
await page.setRequestInterception(true);
page.on('request', async request => {
  if (!request.url().endsWith('/api/subscribe')) return request.continue();
  submissions++;
  await new Promise(resolve => setTimeout(resolve, 200));
  if (mode === 'network') return request.abort('failed');
  await request.respond({ status: mode === 'error' ? 503 : 200, contentType: 'application/json', body: JSON.stringify(mode === 'error' ? { success: false, error: 'Please try again shortly.' } : { success: true, message: "You're on the list." }) });
});
try {
  for (const route of ['/keltner', '/keltner/newsletter', '/keltner/about']) {
    await page.goto(base + route, { waitUntil: 'networkidle2' });
    assert.ok(await page.$('footer form input[type="email"]'));
    const ids = await page.$$eval('[id]', nodes => nodes.map(node => node.id));
    assert.equal(new Set(ids).size, ids.length);
  }
  const input = 'main form input[type="email"]', button = 'main form button';
  await page.goto(base + '/keltner/newsletter');
  await page.click(button);
  assert.equal(submissions, 0);
  await page.type(input, 'reader@example.com');
  await page.focus(input);
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('main form button').disabled);
  assert.equal(await page.$eval(button, el => el.textContent), 'Subscribing…');
  await page.waitForFunction(() => document.querySelector('main [role="status"]').textContent === "You're on the list.");
  assert.equal(submissions, 1);
  await page.reload(); mode = 'error';
  await page.type(input, 'reader@example.com'); await page.click(button);
  await page.waitForFunction(() => document.querySelector('main [role="status"]').textContent === 'Please try again shortly.');
  assert.equal(await page.$eval(input, el => el.value), 'reader@example.com');
  assert.equal(await page.$eval(button, el => el.disabled), false);
  mode = 'network'; await page.click(button);
  await page.waitForFunction(() => document.querySelector('main [role="status"]').textContent !== 'Please try again shortly.' && !document.querySelector('main form button').disabled);
  for (const width of [390, 1280]) {
    await page.setViewport({ width, height: 900 });
    assert.ok(await page.$eval('main form', el => el.getBoundingClientRect().right <= innerWidth));
    assert.ok(await page.$eval(button, el => el.getBoundingClientRect().width >= 44));
  }
  assert.deepEqual(errors, []);
  // Valid subscriptions are mocked; only invalid requests reach the server.
  assert.equal((await fetch(base + '/api/subscribe')).status, 405);
  for (const body of ['{}', '{', '{"email":"invalid"}']) {
    const response = await fetch(base + '/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    assert.equal(response.status, 400);
    assert.equal((await response.json()).success, false);
  }
  console.log('PASS placements, unique labels, validation, loading, keyboard submit, success, retry, network failure, responsive layout, and invalid API requests. No real subscribers created.');
} finally { await browser.close(); }

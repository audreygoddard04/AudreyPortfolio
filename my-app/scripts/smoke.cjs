const assert = require('node:assert/strict');
const puppeteer = require('puppeteer');
const articles = require('../src/data/articles');
const routes = require('../src/data/routes');
const base = process.env.TEST_BASE_URL || 'http://localhost:3100';
(async () => {
  const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : puppeteer.executablePath()), headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    for (const route of [...routes.map(r => r.path), ...articles.map(a => `/articles/${a.slug}`), '/projects/fitness']) {
      const response = await fetch(base + route);
      assert.equal(response.status, 200, route);
      const html = await response.text();
      assert.match(html, /<h1[\s>]/, `${route}: server-rendered heading`);
      assert.match(html, /rel="canonical"/, `${route}: canonical`);
      assert.match(html, /name="description"/, `${route}: description`);
      await page.goto(base + route, {waitUntil: 'networkidle2'});
      const broken = await page.$$eval('img', imgs => imgs.filter(i => !i.complete || !i.naturalWidth).map(i => i.src));
      assert.deepEqual(broken, [], `${route}: images`);
      console.log(`PASS ${route}: HTML, metadata, browser, images`);
    }
    for (const route of ['/missing-page', '/articles/missing', '/projects/missing']) assert.equal((await fetch(base + route)).status, 404, route);
    const redirect = await fetch(base + '/projects/athletics', {redirect:'manual'});
    assert.equal(redirect.status, 307); assert.equal(redirect.headers.get('location'), '/fitness');
    await page.goto(base + '/books');
    await page.click('.book-row');
    assert.ok(await page.$('.book-modal-overlay'), 'Book modal opens');
    await page.setViewport({width:390,height:844});
    await page.goto(base);
    await page.click('.hamburger-menu');
    assert.ok(await page.$('.nav-open'), 'Mobile navigation opens');
    await page.click('.nav-center a[href="/about"]');
    await page.waitForFunction(() => location.pathname === '/about');
    assert.equal(await page.$('.nav-open'), null, 'Mobile navigation closes');
    assert.deepEqual(errors, [], 'No uncaught browser errors');
    assert.equal((await fetch(base+'/api/send-email')).status,405);
    assert.equal((await fetch(base+'/api/send-email',{method:'OPTIONS'})).status,200);
    assert.equal((await fetch(base+'/sitemap.xml')).status,200);
    assert.equal((await fetch(base+'/robots.txt')).status,200);
    console.log('PASS 404s, redirect, modal, mobile navigation, API methods, sitemap, robots');
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exit(1);});

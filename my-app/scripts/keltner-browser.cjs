const assert = require("node:assert/strict");
const fs = require("node:fs");
const puppeteer = require("puppeteer-core");
const base = process.env.TEST_BASE_URL || "http://localhost:3100";
(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  const page = await browser.newPage();
  // Popup behavior is covered separately by test:popup.
  await page.evaluateOnNewDocument(() => {
    try {
      sessionStorage.setItem("keltner-newsletter-popup-seen", "true");
    } catch {}
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  fs.mkdirSync("/tmp/keltner-review", { recursive: true });
  try {
    await page.goto(`${base}/keltner`, { waitUntil: "networkidle2" });
    const articleRoutes = await page.$$eval(
      'main a[href^="/keltner/articles/"]',
      (links) => [...new Set(links.map((a) => a.getAttribute("href")))],
    );
    const routes = [
      "/keltner",
      "/keltner/style",
      "/keltner/places",
      "/keltner/motoring",
      "/keltner/travel",
      "/keltner/estates",
      "/keltner/cars",
      "/keltner/newsletter",
      "/keltner/about",
      ...articleRoutes,
    ];
    for (const width of [1440, 820, 390, 320]) {
      await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
      for (const route of routes) {
        const response = await page.goto(base + route, {
          waitUntil: "networkidle2",
        });
        assert.equal(response.status(), 200, route);
        assert.equal(
          await page.$$eval("h1", (nodes) => nodes.length),
          1,
          `${route}: single h1`,
        );
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          true,
          `${route}: no overflow at ${width}`,
        );
        await page.$$eval("img", (imgs) =>
          imgs.forEach((img) => {
            img.loading = "eager";
          }),
        );
        await page.waitForFunction(
          () => Array.from(document.images).every((img) => img.complete),
          { timeout: 60000 },
        );
        assert.equal(
          await page.$$eval(
            'main input[name="email"]',
            (inputs) => inputs.length,
          ),
          1,
          `${route}: one persistent newsletter`,
        );
        const broken = await page.$$eval("img", (imgs) =>
          imgs.filter((i) => !i.complete || !i.naturalWidth).map((i) => i.src),
        );
        assert.deepEqual(broken, [], `${route}: images at ${width}`);
        if (width === 1440 || width === 390) {
          if (["/keltner", "/keltner/places", articleRoutes[0]].includes(route))
            await page.screenshot({
              path: `/tmp/keltner-review/${route.replaceAll("/", "-")}-${width}.png`,
              fullPage: true,
            });
        }
      }
      await page.goto(base, { waitUntil: "networkidle2" });
      for (const selector of [
        "#root",
        ".header-outer",
        ".hero-section-redesign",
        ".footer",
      ]) {
        assert.equal(
          await page.$eval(selector, (el) => {
            const box = el.getBoundingClientRect();
            return (
              Math.abs(box.left) < 1 && Math.abs(box.right - innerWidth) < 1
            );
          }),
          true,
          `Portfolio ${selector}: full width at ${width}`,
        );
      }
      if (width === 1440 || width === 390)
        await page.screenshot({
          path: `/tmp/keltner-review/portfolio-${width}.png`,
          fullPage: true,
        });
      console.log(
        `PASS ${routes.length} KELTNER routes and portfolio at ${width}px: content, images, full width, no overflow`,
      );
    }
    await page.goto(base + "/keltner");
    await page.click('button[aria-controls="publication-navigation"]');
    assert.equal(
      await page.$eval(
        'button[aria-controls="publication-navigation"]',
        (button) => button.getAttribute("aria-expanded"),
      ),
      "true",
    );
    await page.click('#publication-navigation a[href="/keltner/places"]');
    await page.waitForFunction(() => location.pathname === "/keltner/places");
    assert.equal(
      await page.$eval(
        'button[aria-controls="publication-navigation"]',
        (button) => button.getAttribute("aria-expanded"),
      ),
      "false",
    );
    assert.equal(
      await page.$eval(
        'link[rel="canonical"]',
        (el) => new URL(el.href).pathname,
      ),
      "/keltner/places",
    );
    await page.goto(base + "/keltner/estates");
    assert.equal(
      await page.$eval(
        'link[rel="canonical"]',
        (el) => new URL(el.href).pathname,
      ),
      "/keltner/places",
    );
    // Exercise the real UI against mocked responses; never enroll a test address.
    await page.goto(base + "/keltner/newsletter");
    await page.setRequestInterception(true);
    let succeed = false;
    page.on("request", (request) =>
      request.url().endsWith("/api/subscribe") && request.method() === "POST"
        ? request.respond({
            status: succeed ? 200 : 503,
            contentType: "application/json",
            body: JSON.stringify(
              succeed
                ? { success: true }
                : { error: "Please try again shortly." },
            ),
          })
        : request.continue(),
    );
    await page.type('input[name="email"]', "reader@example.com");
    await page.click('button[type="submit"]');
    await page.waitForFunction(() =>
      document
        .querySelector('[role="status"]')
        .textContent.includes("try again"),
    );
    succeed = true;
    await page.click('button[type="submit"]');
    await page.waitForFunction(() =>
      document
        .querySelector('[role="status"]')
        .textContent.includes("on the list"),
    );
    assert.equal(
      await page.$eval('button[type="submit"]', (button) => button.disabled),
      true,
    );
    assert.deepEqual(errors, [], "No browser errors");
    console.log(
      "PASS mobile menu, legacy canonical, newsletter error/retry/success, no browser errors",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

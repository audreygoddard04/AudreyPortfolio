const assert = require("node:assert/strict");
const puppeteer = require("puppeteer-core");
const base = process.env.TEST_BASE_URL || "http://localhost:3100";
(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    let reply = { status: 200, body: { success: true } };
    let submissions = 0;
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      // Do not send test traffic to GA or enroll test subscribers.
      if (/google-analytics\.com|googletagmanager\.com/.test(request.url()))
        return request.respond({ status: 200, body: "" });
      if (request.url().endsWith("/api/subscribe")) {
        submissions++;
        return request.respond({
          status: reply.status,
          contentType: "application/json",
          body: JSON.stringify(reply.body),
        });
      }
      return request.continue();
    });
    await page.setCacheEnabled(false);
    await page.goto(base + "/keltner", { waitUntil: "networkidle2" });
    const article = await page.$eval('a[href^="/keltner/articles/"]', (a) =>
      a.getAttribute("href"),
    );
    for (const [path, location, selector] of [
      ["/", "footer", "footer form"],
      ["/keltner", "homepage", "main form"],
      ["/keltner/style", "footer", "main form"],
      [article, "article_end", "main form"],
      ["/keltner/newsletter", "newsletter_page", "main form"],
      ["/keltner", "popup", "dialog form"],
    ]) {
      await page.goto(base + path, { waitUntil: "networkidle2" });
      await page.evaluate(() => {
        window.analyticsCalls = [];
        window.gtag = (...args) => window.analyticsCalls.push(args);
        sessionStorage.clear();
        localStorage.clear();
      });
      if (location === "popup") {
        await page.reload({ waitUntil: "networkidle2" });
        await page.evaluate(() => {
          window.analyticsCalls = [];
          window.gtag = (...args) => window.analyticsCalls.push(args);
          window.scrollTo(
            0,
            (document.documentElement.scrollHeight - innerHeight) * 0.5,
          );
        });
        await page.waitForFunction(() => document.querySelector("dialog").open);
      }
      assert.equal(
        await page.evaluate(() => window.analyticsCalls.length),
        0,
        "No event on render/popup open",
      );
      await page.$eval(selector, (form) => form.requestSubmit());
      assert.equal(
        await page.evaluate(() => window.analyticsCalls.length),
        0,
        "Invalid form cannot track",
      );
      await page.type(`${selector} input[name="email"]`, "reader@example.com");
      if (location === "footer" && path === "/") {
        for (const response of [
          { status: 503, body: { error: "Try again" } },
          { status: 200, body: { success: false } },
        ]) {
          reply = response;
          await page.$eval(selector, (form) => form.requestSubmit());
          await page.waitForFunction(
            (selector) =>
              document.querySelector(selector).getAttribute("aria-busy") ===
              "false",
            {},
            selector,
          );
          assert.equal(
            await page.evaluate(() => window.analyticsCalls.length),
            0,
            "API failure cannot track",
          );
        }
      }
      reply = { status: 200, body: { success: true } };
      const before = submissions;
      await page.$eval(selector, (form) => {
        form.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }),
        );
        form.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }),
        );
      });
      await page.waitForFunction(() => window.analyticsCalls.length === 1);
      assert.equal(
        submissions - before,
        1,
        "Rapid duplicate submits make one API call",
      );
      assert.deepEqual(await page.evaluate(() => window.analyticsCalls), [
        ["event", "newsletter_signup", { signup_location: location }],
      ]);
      await page.$eval(selector, (form) =>
        form.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }),
        ),
      );
      assert.equal(
        await page.evaluate(() => window.analyticsCalls.length),
        1,
        "Success rerender / repeat submit does not duplicate event",
      );
      console.log(
        `PASS ${path}: ${location}, success once, no PII, validation/duplicate submissions`,
      );
    }
    // Ordinary social outbound links must remain Enhanced Measurement only.
    await page.goto(base + "/keltner");
    await page.evaluate(() => {
      window.analyticsCalls = [];
      window.gtag = (...args) => window.analyticsCalls.push(args);
      const link = document.querySelector('a[href*="instagram.com"]');
      link.addEventListener("click", (event) => event.preventDefault());
      link.click();
    });
    assert.deepEqual(await page.evaluate(() => window.analyticsCalls), []);
    // The shared form survives client navigation; its location must update.
    await page.click('footer a[href="/keltner/newsletter"]');
    await page.waitForFunction(
      () => location.pathname === "/keltner/newsletter",
    );
    await page.type('main input[name="email"]', "reader@example.com");
    await page.$eval("main form", (form) => form.requestSubmit());
    await page.waitForFunction(() => window.analyticsCalls.length === 1);
    assert.deepEqual(await page.evaluate(() => window.analyticsCalls), [
      ["event", "newsletter_signup", { signup_location: "newsletter_page" }],
    ]);
    console.log(
      "PASS retained newsletter form uses updated location after client navigation.",
    );
    assert.deepEqual(errors, []);
    console.log(
      "PASS normal outbound link creates no affiliate event; no browser errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

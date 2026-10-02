const assert = require("node:assert/strict");
const puppeteer = require("puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  try {
    const page = await browser.newPage();
    await page.evaluateOnNewDocument(() => {
      localStorage.removeItem("keltner-newsletter-subscribed");
    });
    await page.setRequestInterception(true);
    let pending;
    page.on("request", (r) => {
      if (r.url().endsWith("/api/subscribe")) pending = r;
      else if (/google-analytics|googletagmanager/.test(r.url()))
        r.respond({ status: 200, body: "" });
      else r.continue();
    });
    for (const [path, form] of [
      ["/keltner/newsletter", "main form"],
      ["/keltner", "main form"],
      ["/", "footer form"],
    ]) {
      await page.setViewport({ width: 1440, height: 1000 });
      await page.goto("http://localhost:3100" + path, {
        waitUntil: "networkidle2",
      });
      await page.evaluate(() =>
        sessionStorage.setItem("keltner-newsletter-popup-seen", "true"),
      );
      await page.type(`${form} input[name=firstName]`, "Audrey");
      await page.type(`${form} input[name=lastName]`, "Goddard");
      assert.equal(
        await page.$eval(
          `${form} input[name=lastName]`,
          (e) => getComputedStyle(e).outlineStyle,
        ),
        "none",
      );
      await page.click(`${form} [role=combobox]`);
      await page.keyboard.press("End");
      await page.keyboard.press("Enter");
      assert.equal(
        await page.$eval(`${form} select[name=gender]`, (e) => e.value),
        "female",
      );
      await page.click(`${form} [role=combobox]`);
      await page.keyboard.press("Escape");
      assert.equal(
        await page.$eval(`${form} [role=combobox]`, (e) =>
          e.getAttribute("aria-expanded"),
        ),
        "false",
      );
      await page.type(`${form} input[name=email]`, "reader@example.com");
      assert.equal(
        await page.$eval(
          `${form} input[name=email]`,
          (e) => getComputedStyle(e).outlineStyle,
        ),
        "none",
      );
      const dimensions = () =>
        page.$eval(`${form} button[type=submit]`, (e) => ({
          width: e.getBoundingClientRect().width,
          height: e.getBoundingClientRect().height,
        }));
      const before = await dimensions();
      await page.click(`${form} button[type=submit]`);
      await page.waitForFunction(
        (selector) =>
          document.querySelector(selector).getAttribute("aria-busy") === "true",
        {},
        form,
      );
      assert.deepEqual(
        await dimensions(),
        before,
        "Pending button dimensions stable",
      );
      await pending.respond({
        status: 200,
        contentType: "application/json",
        body: '{"success":true}',
      });
      await page.waitForFunction(
        (selector) =>
          document
            .querySelector(selector)
            .textContent.includes("Thank you kindly, you'll stay caught up"),
        {},
        form,
      );
      assert.equal(
        await page.$$eval(
          `${form} input, ${form} select, ${form} button`,
          (elements) => elements.length,
        ),
        0,
        "Success removes all signup controls",
      );
      console.log(
        "PASS focus underline, keyboard dropdown, stable pending button and success-only message: " +
          path,
      );
    }
    await page.setViewport({ width: 390, height: 844 });
    await page.goto("http://localhost:3100/keltner/newsletter", {
      waitUntil: "networkidle2",
    });
    await page.click("main [role=combobox]");
    await page.click("main [role=option]:last-child");
    assert.equal(
      await page.$eval("main select[name=gender]", (e) => e.value),
      "female",
    );
    await page.click("main [role=combobox]");
    await page.screenshot({
      path: "/tmp/keltner-review/newsletter-dropdown-mobile.png",
      fullPage: true,
    });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
    );
    console.log("PASS mobile dropdown selection and no overflow");
    await page.evaluate(() =>
      localStorage.setItem("keltner-newsletter-subscribed", "true"),
    );
    const returning = await browser.newPage();
    await returning.setRequestInterception(true);
    returning.on("request", (request) => {
      if (request.url().endsWith("/api/subscribe"))
        return request.respond({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true, alreadySubscribed: true }),
        });
      if (/google-analytics|googletagmanager/.test(request.url()))
        return request.respond({ status: 200, body: "" });
      request.continue();
    });
    await returning.goto("http://localhost:3100/keltner/newsletter", {
      waitUntil: "domcontentloaded",
    });
    await returning.waitForSelector('main input[name="firstName"]');
    assert.equal(
      await returning.$$eval("main form [name]", (elements) => elements.length),
      4,
      "Stored subscriber flag does not hide form",
    );
    await returning.evaluate(() => {
      window.analyticsCalls = [];
      window.gtag = (...args) => window.analyticsCalls.push(args);
    });
    await returning.type('main input[name="firstName"]', "Audrey");
    await returning.type('main input[name="lastName"]', "Goddard");
    await returning.type('main input[name="email"]', "reader@example.com");
    await returning.click('main [role="combobox"]');
    await returning.keyboard.press("End");
    await returning.keyboard.press("Enter");
    await returning.click('main button[type="submit"]');
    const duplicateMessage =
      "You're already signed up for the KELTNER newsletter. Keep an eye on your inbox for your next read.";
    await returning.waitForFunction(
      (message) =>
        document.querySelector("main [role=status]")?.textContent === message,
      {},
      duplicateMessage,
    );
    assert.equal(
      await returning.$$eval("main form [name]", (elements) => elements.length),
      0,
    );
    assert.deepEqual(
      await returning.evaluate(() => window.analyticsCalls),
      [],
      "Existing subscriber is not tracked as a new signup",
    );
    await returning.reload({ waitUntil: "domcontentloaded" });
    await returning.waitForSelector('main input[name="firstName"]');
    assert.equal(
      await returning.$eval(
        'main input[name="email"]',
        (element) => element.value,
      ),
      "",
    );
    assert.equal(
      await returning.$eval(
        'main [role="status"]',
        (element) => element.textContent,
      ),
      "",
    );
    console.log(
      "PASS reload restores fields; duplicate signup shows friendly confirmation without a new analytics event",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

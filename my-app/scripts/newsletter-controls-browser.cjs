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
            .textContent.includes("Thank you, you'll stay caught up xx"),
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
    returning.on("request", request => /google-analytics|googletagmanager/.test(request.url()) ? request.respond({status:200,body:""}) : request.continue());
    await returning.goto("http://localhost:3100/keltner/newsletter", { waitUntil: "domcontentloaded" });
    await returning.waitForFunction(() => document.querySelector("main [role=status]")?.textContent === "Thank you, you'll stay caught up xx");
    assert.equal(
      await returning.$$eval(
        "main form input, main form button, main form select",
        (elements) => elements.length,
      ),
      0,
    );
    assert.equal(
      await returning.$eval(
        "main [role=status]",
        (element) => element.textContent,
      ),
      "Thank you, you'll stay caught up xx",
    );
    console.log("PASS returning subscribers see only their thank-you message");
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

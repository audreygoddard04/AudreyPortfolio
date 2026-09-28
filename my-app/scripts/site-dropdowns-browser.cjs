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
    await page.evaluateOnNewDocument(() =>
      sessionStorage.setItem("keltner-newsletter-popup-seen", "true"),
    );
    await page.setRequestInterception(true);
    page.on("request", (r) =>
      /google-analytics|googletagmanager/.test(r.url())
        ? r.respond({ status: 200, body: "" })
        : r.continue(),
    );
    for (const width of [1440, 390]) {
      await page.setViewport({ width, height: 1000 });
      await page.goto("http://localhost:3100/contact", {
        waitUntil: "networkidle2",
      });
      await page.click("#projectType");
      await page.keyboard.press("End");
      await page.keyboard.press("Enter");
      assert.equal(
        await page.$eval("select[name=projectType]", (e) => e.value),
        "other",
      );
      assert.ok(await page.$("#otherSpecify"));
      await page.click("#projectType");
      await page.keyboard.press("Home");
      await page.keyboard.press("Enter");
      assert.equal(await page.$("#otherSpecify"), null);
      await page.goto("http://localhost:3100/books", {
        waitUntil: "networkidle2",
      });
      await page.click('[aria-label="Sort books"]');
      await page.keyboard.press("End");
      await page.keyboard.press("Enter");
      assert.equal(
        await page.$eval(".bookshelf-controls select", (e) => e.value),
        "rating",
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
      );
      console.log(
        `PASS themed contact and book sorting dropdowns at ${width}px`,
      );
    }
    await page.goto("http://localhost:3100/nutrition", {
      waitUntil: "networkidle2",
    });
    if (await page.$("#sex")) {
      await page.click("#sex");
      await page.keyboard.press("End");
      await page.keyboard.press("Enter");
      assert.equal(
        await page.$eval("#sex", (e) => e.textContent.trim()),
        "Male",
      );
      await page.click("#activity");
      await page.keyboard.press("End");
      await page.keyboard.press("Enter");
      assert.equal(
        await page.$eval("#activity", (e) => e.getAttribute("aria-expanded")),
        "false",
      );
      console.log("PASS calculator dropdown changes");
    }
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

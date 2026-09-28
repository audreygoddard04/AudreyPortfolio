const assert = require("node:assert/strict");
const puppeteer = require("puppeteer-core");
const fs = require("node:fs");
(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  try {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on("request", (r) =>
      /google-analytics|googletagmanager/.test(r.url())
        ? r.respond({ status: 200, body: "" })
        : r.continue(),
    );
    fs.mkdirSync("/tmp/keltner-review", { recursive: true });
    for (const width of [1440, 820, 390, 320]) {
      await page.setViewport({ width, height: 1000 });
      await page.goto("http://localhost:3000/keltner/newsletter", {
        waitUntil: "networkidle2",
      });
      await page.evaluate(() =>
        sessionStorage.setItem("keltner-newsletter-popup-seen", "true"),
      );
      assert.equal(await page.$$eval("main form", (f) => f.length), 1);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
      );
      for (const name of ["firstName", "lastName", "gender", "email"])
        assert.equal(
          await page.$eval(`main [name="${name}"]`, (e) => e.required),
          true,
        );
      assert.deepEqual(
        await page.$$eval("main select option", (o) => o.map((x) => x.value)),
        ["", "male", "female"],
      );
      assert.equal(await page.$eval("main select", (e) => e.value), "");
      await page.screenshot({
        path: `/tmp/keltner-review/newsletter-${width}.png`,
        fullPage: true,
      });
      console.log(`PASS newsletter layout and required fields: ${width}px`);
    }
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

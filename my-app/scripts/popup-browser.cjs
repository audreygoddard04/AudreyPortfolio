const assert = require("node:assert/strict");
const puppeteer = require("puppeteer-core");
const fs = require("node:fs");
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  try {
    const page = await browser.newPage();
    fs.mkdirSync("/tmp/keltner-review", { recursive: true });
    for (const [width, height, route] of [
      [1440, 1000, "/keltner"],
      [390, 844, "/keltner"],
      [390, 600, "/"],
      [320, 480, "/keltner"],
    ]) {
      await page.setViewport({ width, height });
      await page.goto(base + route, { waitUntil: "networkidle2" });
      await page.evaluate(() => {
        sessionStorage.clear();
        localStorage.removeItem("keltner-newsletter-subscribed");
      });
      await page.reload({ waitUntil: "networkidle2" });
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      await page.evaluate(() =>
        window.scrollTo({
          top: 0.29 * (document.documentElement.scrollHeight - innerHeight),
          behavior: "instant",
        }),
      );
      await new Promise((r) => setTimeout(r, 150));
      assert.equal(
        await page.$eval("dialog", (el) => el.open),
        false,
        "No popup before 30%",
      );
      await page.evaluate(() =>
        window.scrollTo({
          top: 0.31 * (document.documentElement.scrollHeight - innerHeight),
          behavior: "instant",
        }),
      );
      await page.waitForFunction(() => document.querySelector("dialog").open);
      assert.equal(
        await page.evaluate(() =>
          document.activeElement.getAttribute("aria-label"),
        ),
        "Close newsletter popup",
        "Focus enters dialog",
      );
      assert.equal(
        await page.evaluate(() => document.body.style.overflow),
        "hidden",
      );
      assert.equal(
        await page.$eval("dialog", (el) => {
          const r = el.getBoundingClientRect();
          return (
            r.left >= 0 &&
            r.right <= innerWidth &&
            r.top >= 0 &&
            r.bottom <= innerHeight
          );
        }),
        true,
        "Dialog fits viewport",
      );
      if (height > 600)
        await page.screenshot({
          path: `/tmp/keltner-review/popup-${width}.png`,
        });
      await page.keyboard.press("Escape");
      await page.waitForFunction(() => !document.querySelector("dialog").open);
      await page.reload({ waitUntil: "networkidle2" });
      await page.evaluate(() =>
        window.scrollTo({
          top: 0.6 * (document.documentElement.scrollHeight - innerHeight),
          behavior: "instant",
        }),
      );
      await new Promise((r) => setTimeout(r, 150));
      assert.equal(
        await page.$eval("dialog", (el) => el.open),
        false,
        "Dismissed popup stays dismissed this session",
      );
      console.log(
        `PASS threshold, focus, viewport, Escape, session dismissal: ${route} ${width}×${height}`,
      );
    }
    await page.evaluate(() => sessionStorage.clear());
    await page.reload({ waitUntil: "networkidle2" });
    await page.evaluate(() =>
      window.scrollTo({
        top: 0.5 * (document.documentElement.scrollHeight - innerHeight),
        behavior: "instant",
      }),
    );
    await page.waitForFunction(() => document.querySelector("dialog").open);
    let payload;
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (request.url().endsWith("/api/subscribe")) {
        payload = JSON.parse(request.postData());
        request.respond({
          status: 200,
          contentType: "application/json",
          body: '{"success":true}',
        });
      } else request.continue();
    });
    await page.type("#classics-name", "Audrey");
    await page.type("#classics-email", "reader@example.com");
    assert.deepEqual(
      await page.$eval("#classics-email", (input) => ({
        outline: getComputedStyle(input).outlineStyle,
        shadow: getComputedStyle(input).boxShadow,
      })),
      { outline: "none", shadow: "none" },
      "Focused fields show no outline or box",
    );
    await page.click('dialog button[type="submit"]');
    await page.waitForFunction(() =>
      document
        .querySelector("#classics-status")
        .textContent.includes("on the list"),
    );
    assert.deepEqual(payload, {
      email: "reader@example.com",
      firstName: "Audrey",
    });
    assert.equal(
      await page.evaluate(() =>
        localStorage.getItem("keltner-newsletter-subscribed"),
      ),
      "true",
    );
    console.log(
      "PASS signup payload and subscriber suppression (mocked; no email sent)",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

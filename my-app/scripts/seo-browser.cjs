const assert = require("node:assert/strict");
const puppeteer = require("puppeteer-core");
const base = process.env.TEST_BASE_URL || "http://localhost:3100";
(async () => {
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  for (const bot of ["Googlebot", "Bingbot", "OAI-SearchBot"])
    assert.ok(robots.includes(`User-Agent: ${bot}`));
  assert.ok(robots.includes("Sitemap: https://audreygoddard.com/sitemap.xml"));
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.equal(urls.length, new Set(urls).size);
  for (const value of urls) {
    const url = new URL(value);
    assert.equal(url.origin, "https://audreygoddard.com");
    assert.equal(url.search, "");
    assert.ok(!/^\/(api|studio)(\/|$)/.test(url.pathname));
  }
  assert.ok(urls.includes("https://audreygoddard.com/keltner/travel"));
  assert.equal(
    (await fetch(`${base}/keltner/travel/nonexistent-destination`)).status,
    404,
  );
  const browser = await puppeteer.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  try {
    const page = await browser.newPage();
    const paths = urls
      .map((url) => new URL(url).pathname)
      .filter((path) => path.startsWith("/keltner"));
    const links = new Set();
    for (const path of paths) {
      const response = await page.goto(base + path);
      assert.equal(response.status(), 200, path);
      const data = await page.evaluate(() => ({
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        description: document.querySelector('meta[name="description"]')
          ?.content,
        title: document.title,
        graphs: [
          ...document.querySelectorAll('script[type="application/ld+json"]'),
        ].map((script) => JSON.parse(script.textContent)),
        links: [...document.querySelectorAll('main a[href^="/keltner"]')].map(
          (a) => a.getAttribute("href"),
        ),
        faq: document.querySelector("#faq")?.textContent,
      }));
      assert.equal(data.canonical, `https://audreygoddard.com${path}`, path);
      assert.ok(data.description);
      assert.ok(data.title.includes("KELTNER"));
      data.links.forEach((link) => links.add(link));
      if (path.startsWith("/keltner/articles/")) {
        const article = data.graphs.find((g) => g["@type"] === "Article");
        assert.ok(article.headline);
        assert.equal(article.mainEntityOfPage, data.canonical);
        if (article.image) assert.ok(article.image.startsWith("https://"));
        const identity = data.graphs.find((g) => g["@graph"])["@graph"];
        assert.ok(
          identity.some((entity) => entity["@id"] === article.publisher["@id"]),
        );
        const breadcrumbs = data.graphs.find(
          (g) => g["@type"] === "BreadcrumbList",
        );
        assert.equal(breadcrumbs.itemListElement.at(-1).item, data.canonical);
      }
      for (const faq of data.graphs.filter((g) => g["@type"] === "FAQPage")) {
        for (const question of faq.mainEntity) {
          assert.ok(data.faq.includes(question.name));
          assert.ok(data.faq.includes(question.acceptedAnswer.text));
        }
      }
    }
    for (const link of links)
      assert.equal((await fetch(base + link)).status, 200, link);
    console.log(
      `PASS robots, ${urls.length} unique sitemap URLs, ${paths.length} editorial canonicals/metadata/JSON-LD, ${links.size} internal links, missing destination 404`,
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

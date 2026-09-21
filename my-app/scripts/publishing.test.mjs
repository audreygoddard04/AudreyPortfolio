import test from "node:test";
import assert from "node:assert/strict";
import { parse, evaluate } from "groq-js";
import { articlesQuery, articleQuery } from "../src/keltner/queries.mjs";
import { safeHttpUrl, hasAffiliateLinks } from "../src/keltner/editorial.mjs";
const now = new Date("2026-09-21T12:00:00Z");
const article = {
  _id: "article-one",
  _type: "article",
  title: "An article",
  slug: { current: "an-article" },
  publishedAt: "2026-09-20T12:00:00Z",
  category: { _type: "reference", _ref: "style" },
  products: [{ _type: "reference", _ref: "product-one" }],
};
const dataset = [
  {
    _id: "style",
    _type: "category",
    title: "Style",
    slug: { current: "style" },
  },
  article,
  { ...article, _id: "drafts.article-one", title: "Private draft" },
  { ...article, _id: "future", publishedAt: "2030-01-01T00:00:00Z" },
  { ...article, _id: "undated", publishedAt: undefined },
  {
    _id: "product-one",
    _type: "product",
    name: "Example",
    url: "https://example.com/item",
    isAffiliate: true,
  },
];
async function query(source, params) {
  return (
    await evaluate(parse(source), { dataset, params, timestamp: now })
  ).get();
}
test("Public article list excludes drafts, future dates, and undated documents", async () => {
  const result = await query(articlesQuery, { category: "" });
  assert.deepEqual(
    result.map((a) => a._id),
    ["article-one"],
  );
});
test("Category filtering uses the referenced category slug", async () => {
  assert.equal((await query(articlesQuery, { category: "style" })).length, 1);
  assert.deepEqual(await query(articlesQuery, { category: "travel" }), []);
});
test("Article detail resolves product references and never selects the private draft", async () => {
  const result = await query(articleQuery, { slug: "an-article" });
  assert.equal(result.title, "An article");
  assert.equal(result.products[0].name, "Example");
  assert.equal(await query(articleQuery, { slug: "missing" }), null);
});
test("Unsafe outbound URL protocols are rejected", () => {
  for (const url of [
    "javascript:alert(1)",
    "data:text/html,abc",
    "//evil.example",
    "not a URL",
  ])
    assert.equal(safeHttpUrl(url), null);
  assert.equal(
    safeHttpUrl("https://example.com/item"),
    "https://example.com/item",
  );
});
test("Disclosure covers both product cards and inline affiliate links", () => {
  assert.equal(
    hasAffiliateLinks({
      products: [{ isAffiliate: true, url: "https://example.com" }],
    }),
    true,
  );
  assert.equal(
    hasAffiliateLinks({
      body: [
        {
          markDefs: [
            { _type: "link", isAffiliate: true, href: "https://example.com" },
          ],
        },
      ],
    }),
    true,
  );
  assert.equal(
    hasAffiliateLinks({
      products: [null, { isAffiliate: false, url: "https://example.com" }],
    }),
    false,
  );
});

import { serializeJsonLd } from "../src/lib/jsonLd.mjs";
test("JSON-LD cannot terminate its script element", () => {
  const text = serializeJsonLd({ title: "</script><script>alert(1)</script>" });
  assert.equal(text.includes("<"), false);
  assert.deepEqual(JSON.parse(text), {
    title: "</script><script>alert(1)</script>",
  });
});

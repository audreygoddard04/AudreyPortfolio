import test from "node:test";
import assert from "node:assert/strict";
import { parse, evaluate } from "groq-js";
import { articleQuery, destinationsQuery } from "../src/keltner/queries.mjs";
import {
  articleData,
  articleCrumbs,
  breadcrumbData,
  faqData,
  visibleFaqs,
  validTravelPath,
  identityGraph,
} from "../src/keltner/seo.mjs";
const article = {
  _id: "story",
  _type: "article",
  title: "A real title",
  slug: { current: "real-title" },
  publishedAt: "2026-09-20T00:00:00Z",
};
async function query(source, dataset, params = {}) {
  return (
    await evaluate(parse(source), {
      dataset,
      params,
      timestamp: new Date("2026-09-27T00:00:00Z"),
    })
  ).get();
}
test("Related guides exclude drafts, future articles, and deleted references", async () => {
  const result = await query(
    articleQuery,
    [
      {
        ...article,
        relatedGuides: ["published", "drafts.private", "future", "missing"].map(
          (_ref) => ({ _type: "reference", _ref }),
        ),
      },
      { ...article, _id: "published" },
      { ...article, _id: "drafts.private" },
      { ...article, _id: "future", publishedAt: "2030-01-01T00:00:00Z" },
    ],
    { slug: "real-title" },
  );
  assert.deepEqual(
    result.relatedGuides.map((a) => a._id),
    ["published"],
  );
});
test("Destination hubs exclude drafts, future and undated content", async () => {
  const hub = {
    _id: "hub",
    _type: "destination",
    title: "Astana",
    path: "kazakhstan/astana",
    publishedAt: article.publishedAt,
  };
  const result = await query(destinationsQuery, [
    hub,
    { ...hub, _id: "drafts.hub" },
    { ...hub, _id: "future", publishedAt: "2030-01-01T00:00:00Z" },
    { ...hub, _id: "undated", publishedAt: undefined },
  ]);
  assert.deepEqual(
    result.map((d) => d._id),
    ["hub"],
  );
});
test("Breadcrumbs use only real destination routes and canonical category names", () => {
  const story = {
    title: "Story",
    slug: "story",
    category: { slug: "travel" },
    destination: { path: "kazakhstan/astana" },
  };
  const crumbs = articleCrumbs(story, [
    { title: "Astana", path: "kazakhstan/astana" },
    { title: "Paris", path: "france/paris" },
  ]);
  assert.deepEqual(
    crumbs.map((c) => c.href),
    [
      "/keltner",
      "/keltner/travel",
      "/keltner/travel/kazakhstan/astana",
      "/keltner/articles/story",
    ],
  );
  assert.equal(breadcrumbData(crumbs).itemListElement[3].position, 4);
  assert.equal(
    articleCrumbs({ ...story, category: { slug: "estates" } })[1].href,
    "/keltner/places",
  );
});
test("Article identity uses absolute image URLs and never invents missing author data", () => {
  const data = articleData({
    title: "Real title",
    slug: "real-title",
    heroImage: { url: "/keltner/beautiful-estate-cover.png" },
  });
  assert.equal(
    data.image,
    "https://keltnerpress.com/keltner/beautiful-estate-cover.png",
  );
  assert.equal("author" in data, false);
  const authored = articleData({
    slug: "real-title",
    author: "Audrey Goddard",
    updatedAt: article.publishedAt,
  });
  assert.equal(authored.author["@id"], identityGraph["@graph"][0]["@id"]);
  assert.equal(authored.publisher["@id"], identityGraph["@graph"][1]["@id"]);
  assert.equal(authored.dateModified, article.publishedAt);
});
test("FAQ data exactly matches the visible complete question/answer pairs", () => {
  const faqs = [
    null,
    { question: "   ", answer: "Hidden" },
    { question: "Incomplete" },
    { question: "Question?", answer: "Editorial answer." },
  ];
  assert.equal(visibleFaqs(faqs).length, 1);
  assert.equal(
    faqData(faqs, "/keltner/articles/story").mainEntity[0].acceptedAnswer.text,
    "Editorial answer.",
  );
  assert.equal(faqData([], "/keltner"), null);
});
test("Travel paths reject query strings, traversal, external URLs and duplicate slashes", () => {
  for (const path of [
    "",
    "/astana",
    "../astana",
    "astana?x=y",
    "https://example.com",
    "a//b",
    "a#b",
  ])
    assert.equal(validTravelPath(path), false, path);
  assert.equal(validTravelPath("kazakhstan/astana/48-hours"), true);
});

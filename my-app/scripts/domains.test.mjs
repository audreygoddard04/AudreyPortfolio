import test from "node:test";
import assert from "node:assert/strict";
import { domainRoute, publicationPath } from "../src/keltner/urls.mjs";
import { publicationMetadata } from "../src/keltner/config.js";
import { articleData, person, publication } from "../src/keltner/seo.mjs";

test("Old portfolio and publication URLs permanently target clean publication URLs", () => {
  for (const host of ["audreygoddard.com", "www.audreygoddard.com", "keltnerpress.com"]) {
    for (const [oldPath, path] of [["/keltner", "/"], ["/keltner/articles/story", "/articles/story"], ["/keltner/travel/france/paris", "/travel/france/paris"]]) {
      assert.deepEqual(domainRoute(host, oldPath), { type: "redirect", destination: `https://keltnerpress.com${path}` });
    }
  }
});
test("Clean publication routes rewrite without hijacking portfolio, API, CMS or assets", () => {
  assert.deepEqual(domainRoute("keltnerpress.com", "/"), { type: "rewrite", destination: "/keltner" });
  assert.deepEqual(domainRoute("keltnerpress.com", "/about"), { type: "rewrite", destination: "/keltner/about" });
  for (const path of ["/", "/about", "/projects"]) assert.equal(domainRoute("audreygoddard.com", path), null);
  for (const path of ["/api/subscribe", "/studio", "/_next/image", "/keltner/lake-como.png", "/sitemap.xml", "/robots.txt"]) assert.equal(domainRoute("keltnerpress.com", path), null);
});
test("Canonical URLs use publication domain while author keeps portfolio identity", () => {
  assert.equal(publicationPath("/keltner#journal"), "/#journal");
  assert.equal(publicationMetadata("Story", "Description", "/keltner/articles/story").alternates.canonical, "https://keltnerpress.com/articles/story");
  assert.equal(articleData({slug:"story"}).mainEntityOfPage, "https://keltnerpress.com/articles/story");
  assert.equal(person.url, "https://audreygoddard.com/about");
  assert.equal(publication.url, "https://keltnerpress.com/");
});

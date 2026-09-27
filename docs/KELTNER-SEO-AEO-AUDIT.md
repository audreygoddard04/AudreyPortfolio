# KELTNER SEO / AEO audit

Implemented on 2026-09-27. After reviewing the changes, Audrey authorized committing and pushing them, and supplied social profile links for the KELTNER footer. No CMS content mutation or subscriber enrollment was performed.

## A. Existing implementation

- Next.js App Router serves the publication, portfolio, and embedded Sanity Studio. Pages Router remains for API handlers and the error page.
- KELTNER already had `/keltner`, four category pages, legacy category aliases, about/newsletter pages, and `/keltner/articles/[slug]`.
- Sanity stores articles, categories, products, Portable Text, SEO overrides, authors, publication dates, image dimensions/alt/captions, and affiliate disclosures. Queries exclude drafts, future-dated and undated articles.
- Dynamic article metadata, canonical URLs, OG/Twitter cards, XML sitemap, robots, escaped Article JSON-LD, and related stories already existed.
- Article content is server rendered; images use Next Image dimensions. Article bodies offer H2/H3, and templates supply the H1.
- Newsletter signup, Resend integration, popup behavior, and regression suites already existed. No GA4/gtag/GTM installation was found in tracked app source.

## B. Changes

- Explicit Googlebot, Bingbot, and OAI-SearchBot access with the same Studio/API exclusions. Wildcard search access and the production sitemap remain. No GPTBot-specific policy was added or changed.
- Sitemap includes published destination hubs, deduplicates URLs, and retains canonical article URLs and supported modification dates. Aliases, APIs, and Studio are omitted.
- Article OG metadata includes author, section, image dimensions/alt, and an editorial update date when supplied. Existing CMS SEO title/description overrides remain. An article without a hero no longer inherits an unrelated travel image.
- Reusable escaped JSON-LD with linked Person/Organization IDs, absolute article image URLs, canonical mainEntityOfPage, and article section. Audrey's name, about page, and social links come from existing site configuration. Other authors retain their actual names. No credentials or founder/editor job titles were inferred.
- Visible semantic breadcrumbs plus BreadcrumbList on category, article, and destination pages. Ancestors appear only when corresponding destination documents are published.
- Optional summary, Quick Guide facts, visible FAQ with matching FAQPage data, curated Related Guides, linked Audrey byline, and visible editorial update date.
- Reusable Related Stories and destination navigation. Only real, published referenced guides are rendered. Existing category-based related-story fallback remains.
- Destination hubs at `/keltner/travel/[...path]` use CMS titles/descriptions and link to existing articles, descendant hubs, and related destinations. Article travel aliases redirect to existing canonical article URLs. Unknown paths return 404.
- Explicit decorative-image support alongside meaningful-alt validation; existing image sizing retained.
- Added focused publishing/SEO tests and rendered SEO checks. Existing browser tests now disable cache to avoid treating valid 304 cache responses as route failures.
- No new runtime dependencies or SEO-only client scripts.
- Added Instagram (@audcast_), Pinterest (audreyannagoddard), Substack (@keltnerco), and YouTube (@audrey_goddard) to the footer on every KELTNER page, using the profile URLs Audrey supplied.

## C. Modified files

All paths below are relative to the repository root.

- `my-app/app/robots.js`
- `my-app/app/sitemap.js`
- `my-app/app/keltner/layout.jsx`
- `my-app/app/keltner/[category]/page.jsx`
- `my-app/app/keltner/articles/[slug]/page.jsx`
- `my-app/src/keltner/ArticleContent.jsx`
- `my-app/src/keltner/ArticleList.jsx`
- `my-app/src/keltner/content.js`
- `my-app/src/keltner/config.js`
- `my-app/src/keltner/queries.mjs`
- `my-app/src/keltner/publication.module.css`
- `my-app/src/sanity/schema.js`
- `my-app/eslint.config.mjs`
- `my-app/package.json`
- `my-app/scripts/keltner-browser.cjs`
- `my-app/scripts/smoke.cjs`
- `my-app/scripts/popup-browser.cjs`

## D. New files

- `my-app/src/keltner/seo.mjs`: identity, article, FAQ, breadcrumbs, and URL helpers.
- `my-app/src/keltner/EditorialSupport.jsx`: server-rendered optional editorial components.
- `my-app/app/keltner/travel/[...path]/page.jsx`: destination hubs and optional article alias resolution.
- `my-app/scripts/seo.test.mjs`: publication filtering, entity linking, safe paths, FAQ and breadcrumb tests.
- `my-app/scripts/seo-browser.cjs`: robots, sitemap, canonical, metadata, JSON-LD, links and destination 404 checks.
- `docs/KELTNER-SEO-AEO-AUDIT.md`: this report.

## E. Sanity schema additions

- New `destination` document: title, hierarchical path, description, publication date, FAQ, related destinations.
- Optional article fields: `updatedAt`, `summary`, `quickGuide` (`bestFor`, `location`, `whenToGo`, `priceRange`, `idealStay`, `keltnerPick`), `faqs`, `guideType`, `destination`, `travelPath`, `relatedGuides`.
- `guideType` supports guide, hotels, cafes, restaurants, itinerary, packing, style, and sourcebook. These remain articles with stable canonical URLs.
- Images support `decorative`; nondecorative images require alt text in Studio.
- Destination paths and article travel aliases validate format and uniqueness across both types. Keep published paths stable.
- `updatedAt` is an editorial date, validated between publication and now. Visible “Updated” appears only when an editor supplies it; machine metadata can still fall back to Sanity `_updatedAt` without implying a substantive editorial revision to readers.

## F. Migrations

None required. Existing documents and indexed article/category URLs remain valid. No bulk content rewrite or automatic population was performed. Optional travel aliases are new redirects, not URL migrations.

## G. Manual steps

1. The changes are authorized for commit and push. Deployment also updates the embedded Studio schema.
2. When ready, author real destination documents, such as a country and a city, and publish them with actual editorial descriptions. No example hubs or invented guides were seeded.
3. Assign Travel articles to destinations; optionally choose guide type, related guides, factual summary/Quick Guide, FAQ and a genuine update date. A `travelPath` is relative to `/keltner/travel` and resolves only for published Travel articles.
4. Publish ancestor hubs separately if they should appear in breadcrumbs. Related destinations must be published to appear. Confirm optional fields and nested alias redirects with actual new content in preview before publishing it.
5. After deployment, submit the production sitemap to Search Console/Bing Webmaster Tools; verify deployed structured data with Schema.org Validator and Google's Rich Results Test. Local parsing validates syntax and entity relationships, not eligibility for search features.
6. Confirm hosting/firewall rules permit the desired crawlers. Local robots changes cannot verify production edge access or guarantee indexing/citation.
7. No analytics installation was added. If GA4 is later enabled, retain referrers and use consistent `utm_source`, `utm_medium`, `utm_campaign` on owned newsletter/social links. Use source/medium reports to distinguish chatgpt.com, Google, Bing, Pinterest, Instagram and email; no attribution claims can be verified without an installed property.

## H. Intentionally unchanged

- Visual identity, existing layouts and editorial copy; only requested semantic navigation and optional authored sections are added.
- Existing article URLs, legacy category aliases, imagery filenames and branding in intentional “journal” copy.
- Resend/API implementation, signup UI, secrets, and existing affiliate behavior.
- GPTBot preferences: no explicit training preference existed; wildcard behavior was preserved.
- No fabricated author expertise, address, dates, awards, social profiles, travel advice or FAQ examples.
- No live email delivery test: API tests mock Resend and browser tests mock signup responses to avoid enrolling test subscribers.

## Test checklist and results

- [x] Robots: named crawler access, exclusions, production sitemap reference.
- [x] Sitemap: 18 unique production URLs; no query strings/API/Studio; current KELTNER routes included.
- [x] Canonicals and metadata: 9 currently published editorial routes checked.
- [x] JSON-LD: parseable emitted data, linked publisher identity, absolute article images, canonical article and breadcrumb URLs; malicious script closing is escaped.
- [x] FAQ visibility and draft/future/deleted related-reference filtering: focused unit tests.
- [x] Breadcrumbs and internal links: real-route construction tested; 6 current editorial link targets checked; missing destination returns 404.
- [x] Desktop/mobile: 11 KELTNER routes and portfolio at 1440, 820, 390 and 320px; one H1, no overflow, images, mobile navigation, legacy canonical, newsletter error/retry/success and no browser errors.
- [x] Production `npm run build`: passed with Sanity network access. Initial restricted-network build failed at DNS lookup; application compilation itself succeeded.
- [x] Lint and publishing/newsletter/SEO unit tests: passed (7 publishing, 9 subscription, 6 SEO tests).
- [x] Existing smoke suite: 19 routes plus 404s, redirect, modal, navigation, API methods and Studio noindex.
- [x] Popup browser suite: trigger threshold, focus, Escape, session dismissal, viewport fit, signup payload and subscriber suppression. The suite was pointed to port 3100 and browser caching disabled after a reload timeout.
- [ ] Optional new CMS content: publish/preview actual destination and FAQ content to exercise those paths against the live dataset; no existing content was altered for testing.
- [ ] Post-deployment crawler/firewall checks and external structured-data validators: manual.

## References

Implementation was checked against [Next.js robots metadata](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots), [Next.js sitemap metadata](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap), and [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots). OAI-SearchBot search access is distinct from GPTBot training access; allowing crawling is not a guarantee of a citation.

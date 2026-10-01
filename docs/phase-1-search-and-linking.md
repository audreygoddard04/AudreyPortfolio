# Phase 1: Search Console and internal linking

Verified October 1, 2026.

## Search Console

- Domain property: `sc-domain:audreygoddard.com`, verified under Audrey's Google account by a root TXT record in Vercel DNS. Keep the Google verification TXT record in place.
- Property: https://search.google.com/search-console?resource_id=sc-domain%3Aaudreygoddard.com
- Sitemap: https://audreygoddard.com/sitemap.xml — Google reports **Success**, last read October 1, 2026, **21 discovered pages**. The first fetch failed; one resubmission succeeded.
- Robots: https://audreygoddard.com/robots.txt — HTTP 200, allows public crawling, excludes `/studio` and `/api/`, declares the correct sitemap.
- Sitemap audit: 21 unique URLs, all HTTP 200, no noindex or X-Robots-Tag blocks. Includes publication homepage, seven canonical sections, important static pages, two published articles, and portfolio pages. No legacy category duplicates, admin/API routes, drafts, or unpublished stories. Root canonical differs only by the equivalent trailing slash.
- Inspected `/keltner` and `/keltner/articles/value-in-beautiful-estates`. Both were **Discovered — currently not indexed**; both **Request indexing** actions completed successfully after Google's live eligibility checks.
- Indexing requests are not confirmations that Google has indexed the pages.
- The Page indexing and Performance reports are still processing initial data. A complete coverage-error review cannot be signed off until those reports populate. No live-site crawl or canonical blocker was found in the URL audit.

## Internal linking

Implemented and deployed in commit `e10d13c`:
- Canonical parent-category links plus an explicit section-hub link on every article.
- Topic-cluster tags, curated related-article selections, commercial-guide and pillar-article fields in Studio.
- Ranked recommendations, reverse references, duplicate/self filtering and published-only resolution.
- Reciprocal recommendations preserved between the two launch stories; live HTML verified on both.
- Details and publishing workflow: [internal-linking.md](./internal-linking.md).

Validation: production build, lint, publishing tests (8), SEO tests (6), and linking tests (4) passed.

## Follow-up after data is available

Check Page indexing after a day or two: indexed/non-indexed counts, reasons, and whether the two requested URLs have been crawled. Reinspect errors before requesting validation; do not repeatedly request indexing for the same unchanged page.

For ongoing KELTNER reporting, use Performance with a page filter containing `/keltner`, and record impressions, clicks, CTR and average position over comparable periods. Track coverage separately in Page indexing. The domain property includes the portfolio too, so the KELTNER filter matters.

The technical setup is complete. Full indexing/coverage confirmation remains pending Google processing. The editorial goal of 2–4 close related stories plus a commercial guide per article remains a content gap: there are only two public articles and no commercial guides yet. Analytics and affiliate tracking were marked done in the supplied roadmap and were not re-audited in this task. No recurring automation was created.

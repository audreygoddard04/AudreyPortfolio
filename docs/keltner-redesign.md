# KELTNER editorial redesign

Implementation includes the subsequent compact-card, full-width, shared branding, and transparent newsletter artwork revisions. No Sanity documents were published or changed.

## Layout and components

- `PublicationLayout` supplies the full-width masthead, restored “By Audrey Goddard” portfolio link, navigation, persistent newsletter section, and footer. The newsletter occurs once on every KELTNER page and remains mounted during publication navigation. “Persistent” has been interpreted as shared across pages, not fixed over the viewport while scrolling.
- `PublicationNav` supplies desktop links and an accessible mobile toggle with expanded state and current-section indication. Navigation section names come from the section configuration; the masthead motto is “Timeless | Classic | Refined.”
- `EditorialHero` accepts a featured Sanity article, falling back to the requested temporary Lake Como introduction. It renders the supplied photograph as an optimized Next.js image; the reference mockup is not embedded as a screenshot. Mobile source sizing accounts for the tall crop.
- `StoryCard` and `ArticleList` supply flat, compact story rows: portrait photograph, category, headline, excerpt, and a quiet text link. The homepage has no oversized grid heading. Cards stack on smaller screens. Category features use the larger feature variant.
- `ArticleContent` retains Portable Text, images, captions/credits, product references, affiliate link attributes, and generated disclosure. The headline and hero have room to breathe; long-form body text remains constrained to 700px. Article routes add related stories.
- `Newsletter` posts to `/api/subscribe` and provides pending, success, and retryable error states. It is rendered from the layout rather than duplicated across routes.
- Portfolio changes are limited to the full-width page frame and consistent inner content spacing. Typography and page content remain intact.

## CMS content versus code defaults

**From Sanity:** all published story titles, slugs, categories, excerpts, author/date, images and their alt text/captions/credits, Portable Text, product recommendations, affiliate flags, SEO fields, and the optional featured selection. Category pages and related-story lists use the existing article query flow. Draft/future/undated content remains excluded.

**Code defaults:** the temporary “Beautiful Places / Still Worth Finding” hero, Lake Como/Italy label, supplied local photograph, introduction CTA, masthead/footer, section descriptions, empty states, and newsletter copy. Navigation labels come from `config.js`, including the preserved Cars, Luxury journeys, and “A more elegant life” edits.

At verification, Sanity had two published stories. The grid uses those actual stories; no invented bag or hotel articles were added. Sections without published stories use an editorial empty state.

## Routes and schema compatibility

The primary sections are `/keltner/style`, `/keltner/places`, `/keltner/cars`, and `/keltner/travel`. `/keltner/estates` and `/keltner/motoring` remain valid aliases, with canonical URLs pointing to Places and Cars respectively. Queries accept both aliases and current category slugs. No existing documents were migrated or overwritten.

Added one optional article field: `featured` (**Feature on the KELTNER cover**). The newest eligible published featured story with a hero image replaces the temporary introduction. Existing documents continue to work without the field.

Useful next Sanity additions:

1. A homepage settings singleton with a featured-article reference and ordered story references, for explicit editorial curation.
2. Optional cover headline/dek overrides and CTA label, while keeping the article title/excerpt as defaults.
3. Location and country fields for cover labels.
4. Optional ordered related-story references to override automatic suggestions.
5. Newsletter heading/description fields if that copy needs to be edited without a code change.

## Newsletter configuration

Set server-only `RESEND_API_KEY` with contacts permission and `RESEND_KELTNER_SEGMENT_ID` for a dedicated KELTNER segment. The segment ID is currently absent from the local environment. Until configured, the API returns 503 and the form accurately reports that signup is unavailable. Success is shown only after Resend returns a contact ID. Tests use mocks; no test subscriptions or emails were sent.

## Validation

- Production `npm run build`: passed (24 static pages generated).
- KELTNER `npm run lint --workspace=my-app`: passed.
- Publishing tests: 7 passed, including alias compatibility and unpublished-content exclusion.
- Subscription tests: 5 passed, including invalid input, missing configuration, provider errors, and successful contact payload.
- Browser checks: 11 KELTNER routes plus the portfolio at 1440, 820, 390, and 320px; image loading, single page heading, horizontal overflow, full-width portfolio frame, and one newsletter per page passed. Mobile navigation and mocked newsletter error/retry/success passed.
- Site smoke checks: portfolio/KELTNER routes, metadata, images, 404s, redirects, book modal, mobile navigation, API methods, sitemap, and robots passed.
- The shell currently uses Node 23.9; the repository’s declared deployment runtime remains Node 22.x. Existing Node module-type notices are non-fatal.

## Shared branding and photography revision

Both publications now use `src/brand-theme.css`: the reference background `#ebeae8`, current dark ink `#242720`, closely set Times serif mastheads, and coordinated muted colors. Portfolio color variables point to those shared tokens. KELTNER restores “Timeless | Classic | Refined” beneath a small rule.

Article photographs (cards, category features, cover, and article figures) receive a subtle, reversible CSS vintage grade. The architecture cover and its listings now use the supplied estate terrace photograph in `public/keltner/beautiful-estate-cover.png`, replacing the earlier collage. A display adapter matches that article’s original Sanity asset; choosing a different hero in Sanity takes precedence automatically. The estate photograph uses the shared vintage treatment. Source photos and Sanity documents were not modified.

## Gold frame and scroll signup

`GoldFrame` is a reusable wrapper around arbitrary children. Its default CSS border-image uses only the ornamental edges of the transparent reference, leaving the center free for accessible HTML content. Example: `<GoldFrame><YourContent /></GoldFrame>`. The `artwork` variant preserves the complete supplied `emailpop-up.png`, including its exact lettering and alpha transparency. The popup uses this variant with live transparent inputs aligned to the printed lines and screen-reader labels. Focused inputs have a caret without an outline or box; buttons retain keyboard focus indicators.

`NewsletterPopup` is mounted in the shared root layout, covers both portfolio and KELTNER, and excludes Studio. It opens after 30% of the available scroll distance, once per session. Escape, the close button, and backdrop dismiss it. A native dialog handles modal focus; scrolling behind it is locked. Successful subscribers are suppressed on later visits in the same browser. First name and email share the same subscription hook/API as the inline form; Resend configuration is still required. No test addresses were subscribed.

Publication credits now share an upper-left block. Both footers have reduced vertical spacing.

## Every changed or added file

- [docs/keltner-redesign.md](</Users/audreygoddard/Desktop/AudreyPortfolio/docs/keltner-redesign.md>)
- [docs/publishing.md](</Users/audreygoddard/Desktop/AudreyPortfolio/docs/publishing.md>)
- [my-app/.env.example](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/.env.example>)
- [my-app/app/keltner/[category]/page.jsx](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/app/keltner/[category]/page.jsx>)
- [my-app/app/keltner/about/page.jsx](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/app/keltner/about/page.jsx>)
- [my-app/app/keltner/articles/[slug]/page.jsx](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/app/keltner/articles/[slug]/page.jsx>)
- [my-app/app/keltner/layout.jsx](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/app/keltner/layout.jsx>)
- [my-app/app/keltner/newsletter/page.jsx](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/app/keltner/newsletter/page.jsx>)
- [my-app/app/keltner/page.jsx](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/app/keltner/page.jsx>)
- [my-app/app/layout.jsx](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/app/layout.jsx>)
- [my-app/eslint.config.mjs](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/eslint.config.mjs>)
- [my-app/package.json](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/package.json>)
- [my-app/pages/api/subscribe.js](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/pages/api/subscribe.js>)
- [my-app/public/brand/email-popup.png](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/public/brand/email-popup.png>)
- [my-app/public/keltner/beautiful-estate-cover.png](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/public/keltner/beautiful-estate-cover.png>)
- [my-app/public/keltner/collage-buildings.png](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/public/keltner/collage-buildings.png>)
- [my-app/public/keltner/lake-como.png](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/public/keltner/lake-como.png>)
- [my-app/scripts/keltner-browser.cjs](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/scripts/keltner-browser.cjs>)
- [my-app/scripts/popup-browser.cjs](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/scripts/popup-browser.cjs>)
- [my-app/scripts/publishing.test.mjs](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/scripts/publishing.test.mjs>)
- [my-app/scripts/smoke.cjs](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/scripts/smoke.cjs>)
- [my-app/scripts/subscribe.test.mjs](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/scripts/subscribe.test.mjs>)
- [my-app/src/App.css](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/App.css>)
- [my-app/src/brand-theme.css](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/brand-theme.css>)
- [my-app/src/components/Footer.css](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/components/Footer.css>)
- [my-app/src/components/GoldFrame.jsx](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/components/GoldFrame.jsx>)
- [my-app/src/components/GoldFrame.module.css](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/components/GoldFrame.module.css>)
- [my-app/src/components/Header.css](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/components/Header.css>)
- [my-app/src/components/NewsletterPopup.jsx](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/components/NewsletterPopup.jsx>)
- [my-app/src/components/NewsletterPopup.module.css](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/components/NewsletterPopup.module.css>)
- [my-app/src/components/useNewsletterSignup.js](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/components/useNewsletterSignup.js>)
- [my-app/src/keltner/ArticleContent.jsx](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/keltner/ArticleContent.jsx>)
- [my-app/src/keltner/ArticleList.jsx](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/keltner/ArticleList.jsx>)
- [my-app/src/keltner/EditorialHero.jsx](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/keltner/EditorialHero.jsx>)
- [my-app/src/keltner/Newsletter.jsx](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/keltner/Newsletter.jsx>)
- [my-app/src/keltner/PublicationNav.jsx](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/keltner/PublicationNav.jsx>)
- [my-app/src/keltner/config.js](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/keltner/config.js>)
- [my-app/src/keltner/content.js](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/keltner/content.js>)
- [my-app/src/keltner/publication.module.css](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/keltner/publication.module.css>)
- [my-app/src/keltner/queries.mjs](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/keltner/queries.mjs>)
- [my-app/src/portfolio-theme.css](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/portfolio-theme.css>)
- [my-app/src/sanity/schema.js](</Users/audreygoddard/Desktop/AudreyPortfolio/my-app/src/sanity/schema.js>)
- [package-lock.json](</Users/audreygoddard/Desktop/AudreyPortfolio/package-lock.json>)

# KELTNER publishing

The site connects to Audrey's **KELTNER** Sanity project (`ivnvhlvq`), public dataset `production`. Public identifiers live in `my-app/src/sanity/project.mjs`, shared by the website, Studio, and CLI. They are not credentials. No API token is required for published content; editing requires a Sanity account with access to this project.

## Open the editor

1. Run `npm run dev --workspace=my-app -- --port 3333` from the repository root and open http://localhost:3333/studio. Sanity already permits this local origin with credentials. Sign in with your Sanity account.
2. Before using Studio on a deployed website, open [Sanity → API → CORS origins](https://www.sanity.io/organizations/o90yi6a50/project/ivnvhlvq/api/cors-origins) and add the precise Vercel preview origin with credentials, then `https://audreygoddard.com` for production. Avoid wildcard origins with credentials. This authorizes the editor's browser requests; it does not grant new people access to the project.
3. The checked-in project identifiers work on Vercel without extra environment configuration. To intentionally use a different project or dataset, set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local` or the matching Vercel environment and rebuild. Preserve the existing Resend variables.

Draft documents require authenticated access even though the dataset is public. Only store editorial content intended for publication in published documents.

Node.js 22.13 or newer in the 22.x line is supported. Vercel should use Node.js 22.x.

## Review the first draft

The four categories and **“Things worth keeping: a beginning”** are already saved in the connected project. Open **Articles** in Studio to review the draft. Studio autosaves edits; only **Publish** makes an article public. The initial draft has no images, products, or affiliate links. Verify the prefilled publication date when you are ready to publish.

Authenticated editing and draft persistence have been verified. The public API returns all four categories and zero articles, and the draft's website URL returns 404.

### Optional import for a fresh dataset

The connected KELTNER dataset does not need an import. For a separate, fresh dataset, the starter source can be imported from `my-app/` after configuring its project identifiers:

```sh
npx sanity login
npx sanity dataset import content/starter.ndjson production
```

The import contains four category records and one unpublished draft. The source omits a publication date. Its fixed IDs match the initialized project; do not add `--replace` when rerunning it, so existing edits are not overwritten.

In Studio, choose **Articles** and open the draft. Edit the voice, title, body, excerpt, category, and publication date. Optional images need alternative text; use your own images or images you have permission to publish and record the credit. Review the text in Studio before publishing. A private on-site draft preview is deliberately outside this first version.

Click **Publish** when ready. Visit `/keltner/articles/things-worth-keeping`. The publication homepage, Style category, article page, and sitemap will use the published document. Cached content revalidates after 60 seconds on a subsequent request; allow another refresh for the updated response. Publishing content does not require changing code or redeploying the website.

## Create the next article

1. Create an article in Studio. Supply its title, slug, excerpt, author, category, publication date, and body.
2. For product recommendations, create reusable **Products** records. Include brand, retailer, description, image, and the verified retailer/affiliate URL. Mark affiliate links explicitly. An optional quoted price requires the date it was checked.
3. Publish referenced products and categories, then publish the article. Draft products do not appear in public queries.
4. Verify the published page on mobile, check every outbound link and image, and confirm the affiliate disclosure appears before recommendations.

Inline links can also be marked as affiliate links. Product and inline affiliate links receive `rel="sponsored nofollow noopener noreferrer"`. Disclosure is generated automatically when an article contains an affiliate product or inline link; ordinary articles do not get a false disclosure.

The starter draft is introductory copy for Audrey to review. For a first product article, research the products, verify claims and links, choose licensed images, then write the recommendations. No invented affiliate URLs or endorsements are included.

## Editing and unpublishing

Studio separates **Draft** and **Published** versions. An unpublished edit does not change the public article. Publish again to release it. Unpublish removes the published version; the article disappears from listings and its URL returns 404 after cached content expires and is revalidated. Keep a published slug stable to avoid breaking existing links.

The section slugs are `style`, `places`, `cars`, and `travel`. Existing `/keltner/estates` URLs remain available with Places canonical URLs; `/keltner/motoring` is also supported as an alias of Cars. Queries include both old and new CMS category slugs, so existing articles do not need migration. Adding another section is a code change; writing articles within these sections is a CMS task.

Use the optional **Feature on the KELTNER cover** article field to replace the temporary Lake Como introduction. The newest published, featured article with a hero image becomes the cover. Title, excerpt, category, image, and story link come from the existing article fields. Drafts and future publication dates remain excluded.

## What is intentionally small

There is no custom authentication, database, webhook service, or checkout. Studio handles editorial accounts. Sanity stores content and images. Next.js serves the pages and refreshes cached queries.

## Newsletter

A shared newsletter section appears once in the layout of every KELTNER page and stays mounted during navigation between publication pages. It is a normal page section, not a fixed overlay. The reusable form posts to `/api/subscribe`. Set server-only `RESEND_API_KEY` (with contacts permissions) and `RESEND_KELTNER_SEGMENT_ID` for the dedicated KELTNER segment in local and deployed environments. The endpoint validates input and creates a subscribed contact in that segment. Without configuration it returns 503 and the form shows an honest unavailable message. It only reports success after Resend returns a contact ID. No test addresses were enrolled; subscription tests use injected or intercepted responses.

## Checks

```sh
npm run lint --workspace=my-app
npm run test:publishing --workspace=my-app
npm run test:subscribe --workspace=my-app
npm run build
# With a local server running (defaults to port 3100):
TEST_BASE_URL=http://localhost:3000 npm run test:keltner --workspace=my-app
TEST_BASE_URL=http://localhost:3000 npm run test:smoke --workspace=my-app
```

The publishing tests exercise the actual article queries against published, draft, future, and undated fixtures; category/product references; unsafe URL rejection; and disclosure detection. A real publish/unpublish cycle remains a release checkpoint after Audrey reviews the draft. The draft has not been published as a test.

Implementation references: [Sanity Studio embedding](https://www.sanity.io/docs/nextjs/embedding-sanity-studio-in-nextjs), [Next.js CRA migration](https://nextjs.org/docs/app/guides/migrating/from-create-react-app).


## Custom GA4 events

The existing Google tag in `my-app/app/layout.jsx` remains the single GA4 installation. `src/lib/analytics.mjs` calls the existing browser `gtag` function; it does nothing during server rendering or when GA is unavailable, and catches analytics failures. No analytics provider, credentials, schema changes, or additional page-view events were added.

| Event | Parameters | Trigger |
| --- | --- | --- |
| `newsletter_signup` | `signup_location` | `/api/subscribe` returns a successful HTTP status **and** `{ success: true }`. |
| `affiliate_click` | `merchant`, `article_slug`, `category`, `destination`, `placement`, `link_url` (only when known) | Intentional click, keyboard activation, or middle-click on a CMS-marked affiliate link. |

Signup locations are injected into the shared `useNewsletterSignup({ location })` hook. The portfolio footer uses `footer`; the popup uses `popup`. The shared KELTNER section uses `homepage` on `/keltner`, `newsletter_page` on `/keltner/newsletter`, `article_end` on article routes, and `footer` on other publication pages. Its location updates during client navigation. `article_inline` is supported for a future form but no inline form was inserted. Submission guards prevent rapid duplicate API calls and events; renders, popup opens, validation failures and API failures do not emit signup events. The event counts successful API signups, not a guarantee that the contact is new to Resend.

`src/components/AffiliateLink.js` is a reusable client component; the article renderer selects it **only** when `isAffiliate` is set on an inline Portable Text link or referenced product. Ordinary editorial/social links remain ordinary anchors. Both affiliate paths existed before this work, but the currently published article has zero affiliate links; no example links or CMS content were published.

Products supply `merchant` from the actual retailer field and `placement: "product_card"`. Inline links use `placement: "article_inline"` and omit merchant because the current inline-link schema has no merchant field. Both receive `article_slug`, the existing category slug (normalized for established aliases), and the referenced destination path when available. No destination is guessed. The reusable component also accepts explicit editorial `merchant` and `placement` props for future templates.

```jsx
// For a real, CMS-marked affiliate product; never populate from subscriber data.
<AffiliateLink
  href={product.url}
  merchant={product.retailer}
  articleSlug={article.slug}
  category={article.category?.slug}
  destination={article.destination?.path}
  placement="product_card"
>
  View at {product.retailer}
</AffiliateLink>
```

Affiliate anchors retain navigation URLs and open normally, without timers or navigation interception. Their rel attributes include `sponsored nofollow noopener noreferrer`. The analytics copy of `link_url` strips credentials, query strings and fragments, and excludes email-bearing/obvious subscriber-ID paths. Only allowlisted event parameters are sent; email, first name, API responses, and subscriber IDs are never passed from forms. Editorial metadata must remain public content, never visitor-specific values. Do not put personal identifiers in editorial URLs. These protections apply to the custom events; the existing Enhanced Measurement setup is unchanged.

Generic outbound `click` events are already collected by Enhanced Measurement. `affiliate_click` is intentionally a richer business event; it does not replace those generic clicks. No custom scroll, read-more, internal-link or page-view events were added.

### Verify in Google Analytics

1. After deployment, verify the events on the live site. Audrey authorized committing and pushing the analytics changes and frame correction on September 28, 2026.
2. Open GA4 **Realtime**, then use a genuine intended signup or an existing affiliate link. Confirm the exact event name and parameter values above. A failed signup should not appear as `newsletter_signup`.
3. For **Admin → DebugView**, enable Google Analytics Debugger in your browser, or execute `gtag('set', { debug_mode: true })` in that test tab before interacting. Reload the tab afterward to clear the runtime setting. Debug mode is not enabled for ordinary visitors by this code.
4. If these parameters are needed in reports/explorations, register the useful ones as **event-scoped custom dimensions** under Admin → Custom definitions: `signup_location`, `merchant`, `article_slug`, `category`, `destination`, `placement`, and optionally `link_url`. URL and article dimensions can be high-cardinality; register only what you will use. No custom dimension setup is required merely to send events.
5. Optionally mark `newsletter_signup` as a key event if that matches your reporting goals. No GA property settings were changed automatically.

[Google event setup](https://developers.google.com/analytics/devguides/collection/ga4/events), [DebugView instructions](https://support.google.com/analytics/answer/7201382), and [PII guidance](https://support.google.com/analytics/answer/6366371).

### Analytics checks

```sh
npm --prefix my-app run test:analytics
npm --prefix my-app run test:analytics:browser # local production server on port 3100
```

Unit tests cover SSR/unavailable/throwing GA, parameter allowlisting, URL redaction, affiliate metadata, normal navigation attributes, rendering without events, middle-click and cancelled clicks. Browser tests cover all current signup locations, genuine success versus validation/API failures (including HTTP 200 with `success: false`), duplicate submission/render protection, location changes during client navigation, ordinary outbound links, and no PII in emitted payloads. Google requests are blocked and signup responses mocked: no test subscribers are enrolled and no test events reach the live property.

### Files and validation for this implementation

Modified: `my-app/src/components/useNewsletterSignup.js`, `FooterNewsletter.jsx`, `NewsletterPopup.jsx`; `my-app/src/keltner/Newsletter.jsx`, `ArticleContent.jsx`; `my-app/eslint.config.mjs`, `my-app/package.json`, and this publishing guide.

Created: `my-app/src/lib/analytics.mjs`, `my-app/src/components/AffiliateLink.js`, `my-app/scripts/analytics.test.mjs`, and `my-app/scripts/analytics-browser.cjs`.

Validation passed: production build, lint, 29 unit tests (7 analytics, 9 subscription, 7 publishing, 6 SEO), custom-event browser checks across all six current surface/route combinations plus client navigation, and existing KELTNER browser regressions across 11 routes and the portfolio at 1440/820/390/320px. Newsletter error/retry/success and no browser errors verified. The analytics implementation did not change styling, secrets, CMS data, or GA initialization. The accompanying popup correction adjusts the asymmetric gold-frame image slices to preserve the full inner trim; desktop/mobile previews, build, lint, and popup interaction checks passed.

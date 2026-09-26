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

Inline links can also be marked as affiliate links. Product and inline affiliate links receive `rel="sponsored noopener noreferrer"`. Disclosure is generated automatically when an article contains an affiliate product or inline link; ordinary articles do not get a false disclosure.

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

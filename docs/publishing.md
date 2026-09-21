# KELTNER publishing

The site and CMS integration are prepared. No Sanity account, dataset, or live article has been created by this migration.

## Connect Sanity once

1. Open https://www.sanity.io/manage and create a project named **KELTNER** with a **public** dataset named `production`. This site's server queries published content without an API token. Draft documents still require authenticated access; a public dataset does not make drafts public. Only store editorial content intended for publication in published documents.
2. Copy `my-app/.env.example` to `my-app/.env.local`. Add the project ID to `NEXT_PUBLIC_SANITY_PROJECT_ID`; keep `NEXT_PUBLIC_SANITY_DATASET=production`. The project ID is public, not a secret.
3. In Sanity → API → CORS origins, add `http://localhost:3000` with credentials for local Studio login. Add the precise Vercel preview origin when reviewing it, then `https://audreygoddard.com` for production. Avoid wildcard origins with credentials.
4. Run `npm run dev` from the repository root and open http://localhost:3000/studio. Sign in with your Sanity account. Sanity manages editor authentication; the website does not implement its own password system.
5. Add the same two public variables to the existing Vercel project’s Preview and Production environments, then redeploy. Preserve the existing Resend variables.

Node.js 22.13 or newer in the 22.x line is supported. Vercel should use Node.js 22.x.

## Import the first draft

From `my-app/`, after the project identifiers are configured:

```sh
npx sanity login
npx sanity dataset import content/starter.ndjson production
```

The import contains four category records and one draft, **“Things worth keeping: a beginning.”** The draft has no publication date, product claims, or affiliate links. It remains unpublished. The import uses fixed IDs; do not add `--replace` when rerunning it, so existing edits are not overwritten.

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

The four launch category slugs are `style`, `places`, `motoring`, and `travel`. Adding another category route is a code change; writing articles within these categories is a CMS task.

## What is intentionally small

There is no custom authentication, database, webhook service, checkout, or new mailing list. Studio handles editorial accounts. Sanity stores content and images. Next.js serves the pages and refreshes cached queries. The newsletter page points to Audrey’s existing Substack and clearly identifies it.

## Checks

```sh
npm run test:publishing --workspace=my-app
npm run build
```

The publishing tests exercise the actual article queries against published, draft, future, and undated fixtures; category/product references; unsafe URL rejection; and disclosure detection. A live publish/unpublish test still needs your Sanity project.

Implementation references: [Sanity Studio embedding](https://www.sanity.io/docs/nextjs/embedding-sanity-studio-in-nextjs), [Next.js CRA migration](https://nextjs.org/docs/app/guides/migrating/from-create-react-app).

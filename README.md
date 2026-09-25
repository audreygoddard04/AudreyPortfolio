# Audrey Portfolio

Next.js App Router, React, JavaScript, and the original portfolio CSS. Deployed on Vercel.

## Local development

Use Node.js 22.13 or newer in the 22.x line. From this repository's root:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production verification:

```sh
npm run build
npm run start
```

The application is in `my-app/`. npm workspaces keeps dependency installation in one root `package-lock.json`.

## Architecture

- `my-app/app/(portfolio)/`: file-based routes and shared portfolio header/footer. Parentheses organize routes without changing their URLs.
- `my-app/src/views/`: the existing page components, preserving content and design.
- `my-app/src/components/`: interactive UI, with `use client` where browser state or events are needed. Client Components still receive initial server-rendered HTML.
- `my-app/src/data/`: existing portfolio articles and site settings.
- `my-app/src/lib/metadata.js`: server-rendered titles, descriptions, canonical URLs, and social cards.
- `my-app/pages/api/`: existing Node API handlers supported by Next.js; these retain the contact form and Substack URLs.

Portfolio pages use static generation (SSG). Next.js renders their HTML during the build; the browser hydrates interactive controls. Server-side rendering (SSR) is available for request-specific data. We do not force every route to render again on every request.

The previous CRA/Puppeteer prerender build has been removed. Puppeteer is only a development test tool. Existing image markup and CSS dimensions are retained for visual parity; image optimization can be a separate change.

## Vercel

Keep the existing Vercel project and domain. Preview this branch before merging.

- Framework: **Next.js**.
- Recommended Root Directory: repository root (blank).
- Root `vercel.json` installs with `npm ci`, builds `my-app`, and uses `my-app/.next`.
- A project already using Root Directory `my-app` can use its nested `vercel.json`; include files outside the root so the workspace lockfile is available.
- Remove dashboard overrides that still refer to `react-scripts`, `build/`, or a catch-all rewrite to `index.html`.
- Preserve `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `RESEND_TO_EMAIL` in Vercel. Never prefix secrets with `NEXT_PUBLIC_`.
- Use Node.js 22.x on Vercel.

Do not use the old personal `push-to-main.sh` helper for this migration: it force-pushes. Use the pull request and its Vercel preview.

## Verification

Start a production server on port 3100 (`npm run start --workspace=my-app -- --port 3100`), then run:

```sh
npm run test:smoke --workspace=my-app
```

Set `TEST_BASE_URL` to test a deployment instead. Set `CHROME_PATH` if Chrome is installed elsewhere. The test checks all portfolio routes, server HTML, metadata, image loading, missing pages, legacy redirects, the bookshelf modal, mobile navigation, and API method handling. It never sends a real email.

See [migration checkpoints](docs/migration-checkpoints.md) for scope and release checks.

## KELTNER and Sanity

`/keltner` is the publication. `/studio` is its Sanity editor. Both connect to the KELTNER project (`ivnvhlvq`), dataset `production`, using shared public configuration. See [publishing setup and first-article workflow](docs/publishing.md). No demo products or articles are published.

## KELTNER newsletter subscriptions

The reusable `src/keltner/NewsletterSignup.jsx` form posts JSON to `/api/subscribe`, a Pages API handler alongside the existing APIs. The homepage, article endings, footer, and `/keltner/newsletter` use it. Sanity remains the article CMS; subscriber addresses are stored only in Resend Contacts. No welcome email or automation is created.

Server-only environment variables (configure in Vercel for Production and any Preview deployments you test, then redeploy):

- `RESEND_API_KEY` — already used by the contact form. It must have **Full access**, because a sending-only key cannot manage Contacts. Never use a `NEXT_PUBLIC_` prefix or commit its value. Local development can use ignored `my-app/.env.local`.
- `RESEND_KELTNER_SEGMENT_ID` — optional existing Resend segment ID. Create a segment named KELTNER in Resend and set this value if you want to isolate this publication from other lists. Without it, subscribers appear in the account-wide Contacts list. Configure the segment before collecting subscribers if the account serves multiple publications.
- No sender-address variable is needed for capture. Existing `RESEND_FROM_EMAIL` and `RESEND_TO_EMAIL` still serve the contact form.

Email addresses are trimmed/lowercased and validated. Existing subscribed contacts return the same success response without overwriting profile data; an optional segment is added. Existing global opt-outs are not silently re-enabled: the form directs the reader to contact Audrey. This is single opt-in capture, not proof of mailbox ownership. Use Resend Broadcasts with an unsubscribe link when sending future newsletters.

Protection: POST-only JSON, a 2 KB body limit, same-origin browser checks, a honeypot, provider timeouts, and a bounded five-attempts/minute limit per IP per server instance. The in-memory limit resets on cold starts and is **not a distributed abuse barrier**. For sustained public traffic, add a Vercel Firewall rate-limit rule matching POST `/api/subscribe` (for example five requests/IP/minute). No addresses, raw IPs, API keys, or provider error messages are written to application logs. The endpoint returns 400/403/405/413/415 for invalid requests, 409 for opted-out contacts, 429 for throttling, and 503 for service/configuration failures.

### Verification and one real signup

```sh
npm run lint --workspace=my-app
npm run test:subscribe --workspace=my-app
npm run test:publishing --workspace=my-app
npm run build
```

With a production preview running on port 3360, run `npm run test:newsletter-browser --workspace=my-app` to check loading, success, errors, retry, keyboard submission, and responsive form layout. Set `TEST_BASE_URL` to choose another local port.

The subscription tests mock Resend; they never create real subscribers or send email. Lint covers the new integration and App Router files, excluding legacy portfolio components and APIs to avoid unrelated rewrites.

After deploying:

1. Open `https://audreygoddard.com/keltner/newsletter` and submit an email address you own. Expect **You're on the list.** No welcome email is expected.
2. In Resend **Contacts**, search that address and confirm it appears once and is subscribed. If configured, check the KELTNER segment too.
3. Reload and submit the same address again: expect the same message and still one Contact.
4. If signup fails, inspect the `/api/subscribe` response and Vercel function logs. `missing_api_key` means the variable is missing for that deployment; provider 401/403 means check the key and Contacts permissions; 429 means wait a minute. Do not paste the key into the browser or a support message.

Resend API reference: https://resend.com/docs/api-reference/contacts/create-contact

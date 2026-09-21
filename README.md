# Audrey Portfolio

Next.js App Router, React, JavaScript, and the original portfolio CSS. Deployed on Vercel.

## Local development

Use Node.js 22.12 or newer (Node 22 LTS recommended). From this repository's root:

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

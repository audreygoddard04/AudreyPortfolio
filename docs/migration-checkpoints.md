# Migration checkpoints

## 1. Portfolio migration

Baseline: commit `9acdfd0`. CRA used React Router plus a Puppeteer postbuild renderer. The outer Vercel configuration rewrote every request to `index.html`.

Changes:
- Next.js 16 App Router, React 19, original JavaScript and CSS.
- File-based routes replace React Router; all existing valid URLs remain.
- Existing portfolio article data remains untouched.
- SEO and JSON-LD are present in the server HTML.
- Contact/Substack API URLs are preserved using Next's Node API support.
- Unknown pages return HTTP 404. `/projects/athletics` redirects to `/fitness`.
- Static image extensions are lowercase so the compiler handles them consistently.
- Font loading moves into the document head because CSS bundling invalidated the old stylesheet import position.
- npm workspaces provides one lockfile and root build commands.

Verified: production build; all 13 portfolio routes; server HTML, metadata, images, 404s, redirect, bookshelf modal, mobile navigation, API methods, sitemap, and robots. Ten screenshots (home, about, projects, books, fitness at 1440px and 390px) are pixel-identical to the original app. Test artifacts are local, outside the repository.

## Release checkpoint

Before merging, inspect the Vercel preview on desktop and mobile, ensure build settings select Next.js, preserve the Resend environment variables, and check contact submission with an authorized test message. Local tests do not send email. Production domain verification requires the existing Vercel account/project connection.

Rollback: revert the migration pull request, or restore the previous deployment from the existing Vercel project. Do not create a replacement project or change DNS for this migration.

## 2. KELTNER publication

Added `/keltner`, four category routes, About, and a newsletter entry point. The portfolio footer links to the journal. Publication styles are separate from portfolio styles; links between them load a fresh document so global legacy styles do not leak. Production build and all seven publication routes passed browser checks; desktop and mobile layouts have no horizontal overflow.

## 3. CMS and first-article workflow

Sanity Studio, article/category/product schemas, published-content queries, article templates, images, SEO, automatic affiliate disclosure, and 60-second cache revalidation are prepared. The starter import contains taxonomy and one private introductory draft. Six publishing tests pass, the schema extracts successfully, and a temporary local article fixture passed browser checks for layout, product rendering, and affiliate link markup. The fixture was removed before the final build. Live CMS login and publish/unpublish verification require Audrey’s Sanity project.

Final local verification: Node.js 22 production build, all 20 public portfolio/publication routes, Studio setup page, cross-publication navigation, server metadata, images, 404s, redirect, bookshelf modal, mobile menu, API method checks, sitemap/robots, and all six publishing tests pass. No test article route is included in the final build.

## 4. Connect the KELTNER project

The website, Studio, and CLI now share the public project ID `ivnvhlvq` and dataset `production`. Optional environment overrides remain available. Verified that the dataset is publicly readable and initially empty, the Node.js 22 production build succeeds against the real dataset, all six publishing tests pass, publication/category/Studio/sitemap responses succeed, and the unpublished starter article URL returns 404. Studio renders its login screen at `http://localhost:3333/studio`, using the project's existing allowed origin. Authenticated draft creation and a live publish/unpublish check remain pending.

## 5. Initialize editorial content

Verified authenticated Studio editing. Saved and published the four category records (Style, Estates, Cars, Travel), and saved the introductory article as a private draft with its title, slug, excerpt, author, Style reference, and formatted body. Reloading Studio preserved the draft. An unauthenticated API check returned four categories and zero articles; the draft URL returned 404. Vercel reported success for the connected-site commit `8203bef`. Article review, the first publish/unpublish cycle, and deployed Studio origin authorization remain release checkpoints.

## 6. Brand and domain release

Matched KELTNER to Audrey's supplied logo: original JPEG wordmark, sampled pale background (`#ebeae8`), taupe accents, serif typography, and “Timeless | Classic | Refined” tagline. Added KELTNER to the portfolio's main navigation and retained its footer link. The supplied asset also provides the publication's default social preview. Verified desktop and 390px mobile layouts, the homepage navigation link, Node.js 22 production build, all 20 public routes and existing smoke checks, and six publishing tests. Publishing the site does not publish the introductory Sanity draft.

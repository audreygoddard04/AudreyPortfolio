/**
 * app/sitemap.js
 *
 * Next.js App Router dynamic sitemap. Returns an array of URL entries that
 * Next.js serialises into /sitemap.xml at build time (and revalidates every
 * 60 seconds in production via the `revalidate` export below).
 *
 * The sitemap is split into three groups:
 *   1. Keltner static pages  — /keltner, /keltner/about, /keltner/newsletter, category pages
 *   2. Keltner articles      — fetched from Sanity via getArticles()
 *   3. Portfolio static pages — from src/data/routes.js
 */

// All imports at the top so the file is easy to scan
import { getArticles } from "@/keltner/content";
import { categories }  from "@/keltner/config";
import routes          from "@/data/routes";
import site            from "@/data/siteConfig";

/** Revalidate the sitemap every 60 seconds in production (ISR) */
export const revalidate = 60;

export default async function sitemap() {
  // Keltner articles are stored in Sanity CMS — fetch them at render time
  const publicationArticles = await getArticles();

  return [
    // --- 1. Keltner static pages ---
    ...[
      "/keltner",
      "/keltner/about",
      "/keltner/newsletter",
      ...categories.map((c) => `/keltner/${c.slug}`),
    ].map((path) => ({
      url: site.siteUrl + path,
      changeFrequency: "weekly",
      priority: 0.7,
    })),

    // --- 2. Keltner articles (from Sanity) ---
    ...publicationArticles.map((a) => ({
      url: `${site.siteUrl}/keltner/articles/${a.slug}`,
      lastModified: a._updatedAt || a.publishedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    })),

    // --- 3. Portfolio static pages ---
    ...routes.map((route) => ({
      url: site.siteUrl + route.path,
      changeFrequency: route.changefreq,
      priority: Number(route.priority),
    })),
  ];
}

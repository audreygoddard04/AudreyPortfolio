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
import { getArticles, getDestinations } from "@/keltner/content";
import { categories } from "@/keltner/config";
import routes from "@/data/routes";
import site from "@/data/siteConfig";
import { headers } from "next/headers";
import { publicationUrl } from "@/keltner/urls.mjs";

/** Revalidate the sitemap every 60 seconds in production (ISR) */
export const dynamic = "force-dynamic";

export default async function sitemap() {
  const host = (await headers()).get("host") || "";
  if (!["keltnerpress.com", "www.keltnerpress.com", "keltner.vercel.app"].includes(host.split(":")[0])) {
    return routes.map((route) => ({ url: site.siteUrl + route.path, changeFrequency: route.changefreq, priority: Number(route.priority) }));
  }
  // Keltner articles are stored in Sanity CMS — fetch them at render time
  const [publicationArticles, destinations] = await Promise.all([
    getArticles(),
    getDestinations(),
  ]);

  const entries = [
    // --- 1. Keltner static pages ---
    ...[
      "/keltner",
      "/keltner/about",
      "/keltner/newsletter",
      ...categories.map((c) => `/keltner/${c.slug}`),
    ].map((path) => ({
      url: publicationUrl(path),
      changeFrequency: "weekly",
      priority: 0.7,
    })),

    // --- 2. Keltner articles (from Sanity) ---
    ...publicationArticles.map((a) => ({
      url: publicationUrl(`/articles/${a.slug}`),
      lastModified: a.updatedAt || a._updatedAt || a.publishedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    })),

    ...destinations.map((d) => ({
      url: publicationUrl(`/travel/${d.path}`),
      lastModified: d._updatedAt || d.publishedAt,
    })),

  ];
  return [...new Map(entries.map((entry) => [entry.url, entry])).values()];
}

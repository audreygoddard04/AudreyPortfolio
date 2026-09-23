/**
 * routes.js
 *
 * Static route list consumed by app/sitemap.js to generate the XML sitemap.
 * Article URLs are added dynamically from articles.js — only add routes here
 * for pages that are NOT dynamically generated.
 *
 * Fields:
 *   path        — URL path (no domain), e.g. "/about"
 *   changefreq  — How often search engines should re-crawl ("weekly", "monthly", etc.)
 *   priority    — Crawl priority relative to other URLs (0.0–1.0 as a string)
 */

const staticRoutes = [
  { path: '/',                              changefreq: 'weekly',  priority: '1.0' },
  { path: '/about',                         changefreq: 'monthly', priority: '0.8' },
  { path: '/articles',                      changefreq: 'weekly',  priority: '0.9' },
  { path: '/projects',                      changefreq: 'monthly', priority: '0.8' },
  { path: '/projects/rhamm-breast-cancer',  changefreq: 'monthly', priority: '0.7' },
  { path: '/books',                         changefreq: 'monthly', priority: '0.6' },
  { path: '/nutrition',                     changefreq: 'monthly', priority: '0.6' },
  { path: '/fitness',                       changefreq: 'monthly', priority: '0.6' },
  { path: '/health',                        changefreq: 'monthly', priority: '0.5' },
  { path: '/contact',                       changefreq: 'yearly',  priority: '0.4' },
];

// ES module export — consistent with the rest of the codebase
export default staticRoutes;

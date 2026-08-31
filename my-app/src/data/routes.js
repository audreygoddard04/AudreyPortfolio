// Static route list — shared by scripts/generate-sitemap.js and
// scripts/prerender.js. Dynamic /articles/:slug routes are derived
// separately from src/data/articles.js.

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/articles', changefreq: 'weekly', priority: '0.9' },
  { path: '/projects', changefreq: 'monthly', priority: '0.8' },
  { path: '/projects/rhamm-breast-cancer', changefreq: 'monthly', priority: '0.7' },
  { path: '/books', changefreq: 'monthly', priority: '0.6' },
  { path: '/nutrition', changefreq: 'monthly', priority: '0.6' },
  { path: '/fitness', changefreq: 'monthly', priority: '0.6' },
  { path: '/health', changefreq: 'monthly', priority: '0.5' },
  { path: '/contact', changefreq: 'yearly', priority: '0.4' },
];

module.exports = staticRoutes;

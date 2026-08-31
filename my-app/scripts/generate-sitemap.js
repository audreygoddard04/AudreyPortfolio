// Regenerates public/sitemap.xml before every build (see "prebuild" in
// package.json) from the shared route list + article registry, so the
// sitemap always matches what's actually routed.

const fs = require('fs');
const path = require('path');

const siteConfig = require('../src/data/siteConfig');
const staticRoutes = require('../src/data/routes');
const articles = require('../src/data/articles');

const today = new Date().toISOString().slice(0, 10);

const urls = [
  ...staticRoutes.map((r) => ({ ...r, lastmod: today })),
  ...articles.map((a) => ({
    path: `/articles/${a.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: a.updatedDate,
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${siteConfig.siteUrl}${u.path}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml);
console.log(`Generated sitemap.xml with ${urls.length} URLs at ${outPath}`);

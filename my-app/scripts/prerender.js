// Prerenders every route into static HTML after `react-scripts build`.
//
// CRA ships one index.html with an empty <div id="root">; Googlebot and
// most social-card crawlers either don't run JS at all, or only do a
// delayed "second wave" render. This script boots a static file server
// on the built app, drives each route in headless Chrome, waits for
// react-helmet-async's tags to settle, and writes the fully-rendered
// HTML to build/<route>/index.html so the raw response already has the
// real title, meta tags, JSON-LD, and content.
//
// Uses the full `puppeteer` package (not puppeteer-core) so it downloads
// a matching Chromium for whatever machine runs `npm install` — local Mac
// or Vercel's Linux build containers alike. No hardcoded browser path.

const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const staticRoutes = require('../src/data/routes');
const articles = require('../src/data/articles');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const PORT = 45621;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.pdf': 'application/pdf',
};

function serveStatic() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    let filePath = path.join(BUILD_DIR, urlPath);

    if (urlPath === '/' || !path.extname(urlPath)) {
      const indexAttempt = path.join(filePath, 'index.html');
      filePath = fs.existsSync(indexAttempt) ? indexAttempt : path.join(BUILD_DIR, 'index.html');
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        fs.readFile(path.join(BUILD_DIR, 'index.html'), (fallbackErr, fallbackData) => {
          if (fallbackErr) {
            res.writeHead(404);
            res.end('Not found');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(fallbackData);
        });
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      res.end(data);
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

async function prerenderRoute(browser, routePath) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}${routePath}`, { waitUntil: 'networkidle0' });
  // Give react-helmet-async + JSON-LD script tags a beat to settle.
  await new Promise((r) => setTimeout(r, 150));
  const html = await page.content();
  await page.close();

  const outDir = routePath === '/' ? BUILD_DIR : path.join(BUILD_DIR, routePath);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log(`Prerendered ${routePath}`);
}

async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('build/ not found — run `react-scripts build` first.');
    process.exit(1);
  }

  const routes = [
    ...staticRoutes.map((r) => r.path),
    ...articles.map((a) => `/articles/${a.slug}`),
  ];

  const server = await serveStatic();
  const browser = await puppeteer.launch({ headless: true });

  try {
    for (const route of routes) {
      await prerenderRoute(browser, route);
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`Prerendered ${routes.length} routes.`);
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});

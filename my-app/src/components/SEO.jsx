import { useEffect } from 'react';
import siteConfig from '../data/siteConfig';

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(attr, key) {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.remove();
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  let el = document.head.querySelector(`script[data-seo-jsonld="${id}"]`);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-seo-jsonld', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id) {
  const el = document.head.querySelector(`script[data-seo-jsonld="${id}"]`);
  if (el) el.remove();
}

// Writes title/meta/canonical/OG/Twitter/JSON-LD tags directly onto
// document.head via a plain effect. Deliberately not using
// react-helmet-async: it wasn't committing tags to the DOM reliably in
// this app's React 18 setup, while direct DOM upserts are trivial and
// guaranteed to work the same in dev, production, and the puppeteer-driven
// prerender pass (scripts/prerender.js), which waits for the page to go
// network-idle — well after this effect has already run.
function SEO({ title, description, path, image, type = 'website', structuredData, noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.siteName}` : siteConfig.defaultTitle;
    const metaDescription = description || siteConfig.defaultDescription;
    const canonicalUrl = `${siteConfig.siteUrl}${path || ''}`;
    const imageUrl = image
      ? (image.startsWith('http') ? image : `${siteConfig.siteUrl}${image}`)
      : `${siteConfig.siteUrl}${siteConfig.defaultImage}`;

    document.title = fullTitle;
    upsertMeta('name', 'description', metaDescription);
    upsertLink('canonical', canonicalUrl);

    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, follow');
    } else {
      removeMeta('name', 'robots');
    }

    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', siteConfig.siteName);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', metaDescription);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', imageUrl);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', metaDescription);
    upsertMeta('name', 'twitter:image', imageUrl);

    if (structuredData) {
      upsertJsonLd('page', structuredData);
    } else {
      removeJsonLd('page');
    }
  }, [title, description, path, image, type, structuredData, noindex]);

  return null;
}

export default SEO;

/**
 * ArticlePage.jsx
 *
 * Renders a single article given an article object from src/data/articles.js.
 * Handles all block types that can appear in article.content[], emits
 * Article-type JSON-LD structured data for SEO, and shows related articles.
 *
 * This component is purely presentational — data fetching and slug resolution
 * happen in app/(portfolio)/articles/[slug]/page.jsx.
 */

import { serializeJsonLd } from '@/lib/jsonLd.mjs';
import React from 'react';
import Link from 'next/link';
import articles from '../data/articles';
import siteConfig from '../data/siteConfig';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Formats a YYYY-MM-DD date string into a human-readable long date,
 * e.g. "September 23, 2026". Appending T00:00:00 forces local midnight
 * so the displayed date is never off by one due to timezone offsets.
 */
function formatDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ---------------------------------------------------------------------------
// Content block renderer
// ---------------------------------------------------------------------------

/**
 * Renders a single content block from article.content[].
 * Each block has a `type` field that determines how it is displayed.
 *
 * Supported types:
 *   h2         — section heading
 *   p          — paragraph
 *   quote      — blockquote
 *   image      — figure with optional caption; supports contain layout
 *   list       — unordered list
 *   references — ordered reference list
 *   books      — 3-column book card grid
 *   buildings  — detailed building info cards with optional image
 */
function ContentBlock({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>;

    case 'p':
      return <p>{block.text}</p>;

    case 'quote':
      return <blockquote className="article-blockquote">{block.text}</blockquote>;

    case 'image':
      return (
        <figure className="article-image-figure">
          <img
            className={`article-image${block.contain ? ' article-image-contain' : ''}`}
            src={block.src}
            alt={block.alt}
          />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case 'list':
      return (
        <ul className="article-list">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );

    case 'references':
      return (
        <ol className="article-references">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ol>
      );

    case 'books':
      return (
        <div className="article-books-grid">
          {block.items.map((book) => (
            <div className="article-book-card" key={book.title}>
              <h4>{book.title}</h4>
              <p className="article-book-author">{book.author}</p>
              <p className="article-book-takeaway">{book.takeaway}</p>
            </div>
          ))}
        </div>
      );

    case 'buildings':
      return (
        <div className="article-buildings-grid">
          {block.items.map((b) => (
            <div className={`article-building-card${b.image ? ' has-image' : ''}`} key={b.name}>
              <h3>{b.name}</h3>
              <div className="article-building-row">
                {b.image && (
                  <div className="article-building-media">
                    <img className="article-building-image" src={b.image} alt={b.name} />
                    <p className="article-building-caption">{b.blurb}</p>
                  </div>
                )}
                <div className="article-building-content">
                  {!b.image && <p className="article-building-blurb">{b.blurb}</p>}
                  <dl>
                    <dt>Location</dt>       <dd>{b.location}</dd>
                    <dt>Architect</dt>      <dd>{b.architect}</dd>
                    <dt>Year</dt>           <dd>{b.year}</dd>
                    <dt>Original purpose</dt><dd>{b.originalPurpose}</dd>
                    <dt>Current use</dt>    <dd>{b.currentUse}</dd>
                    <dt>Land</dt>           <dd>{b.land}</dd>
                    <dt>Architecture</dt>   <dd>{b.architecture}</dd>
                    <dt>Ownership</dt>      <dd>{b.ownership}</dd>
                    <dt>Estimated value</dt><dd>{b.estimatedValue}</dd>
                    <dt>Revenue model</dt>  <dd>{b.revenueModel}</dd>
                  </dl>
                  <p className="article-building-why">
                    <strong>Why is it valuable?</strong> {b.whyValuable}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

function ArticlePage({ article }) {
  const path = `/articles/${article.slug}`;

  // Find related articles by matching slugs listed in the article's metadata
  const related = articles.filter((a) => article.relatedSlugs.includes(a.slug));

  // Article-type JSON-LD for search engine rich results
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    author: {
      '@type': 'Person',
      name: siteConfig.author,
      url: siteConfig.siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author,
    },
    datePublished: article.pubDate,
    dateModified: article.updatedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.siteUrl}${path}`,
    },
    articleSection: article.category,
  };

  return (
    <div className="articles-bg">
      {/* Article-specific structured data injected into <head> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />

      <div className="project-detail-container article-page-container">
        <Link href="/articles" className="article-back-to-all article-back-to-all-top">
          ← All articles
        </Link>

        {/* Article body */}
        <article className="main-section project-detail-section article-body">
          <h1>{article.title}</h1>
          <p className="article-byline">
            By {siteConfig.author} ·{' '}
            <time dateTime={article.pubDate}>{formatDate(article.pubDate)}</time>
            {/* Show "Updated" only when the updated date differs from the publish date */}
            {article.updatedDate !== article.pubDate && (
              <> · Updated <time dateTime={article.updatedDate}>{formatDate(article.updatedDate)}</time></>
            )}
          </p>

          {article.content.map((block, i) => (
            <ContentBlock block={block} key={i} />
          ))}
        </article>

        {/* Footer navigation */}
        <div className="article-footer-links">
          <a
            href={article.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="article-substack-secondary-link"
          >
            More on Substack →
          </a>
          <Link href="/articles" className="article-back-to-all">← All articles</Link>
        </div>

        {/* Related articles — only rendered when matches exist */}
        {related.length > 0 && (
          <section className="main-section project-detail-section">
            <h2>Related articles</h2>
            <div className="articles-list">
              {related.map((a) => (
                <Link key={a.slug} href={`/articles/${a.slug}`} className="article-card">
                  <h3>{a.title}</h3>
                  <p className="article-excerpt">{a.metaDescription}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ArticlePage;

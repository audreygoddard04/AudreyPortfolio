/**
 * Articles.jsx
 *
 * Lists all self-hosted articles (sourced from src/data/articles.js),
 * sorted newest-first, and embeds a Substack subscribe widget below.
 */

import React from 'react';
import Link from 'next/link';
import articles from '../data/articles';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Base URL for the Substack publication */
const SUBSTACK_URL = 'https://audreyannagoddard.substack.com/';

/**
 * Pre-sorted article list. Sorted once at module load time (not inside
 * the component) so the sort doesn't run on every render.
 */
const sortedArticles = [...articles].sort(
  (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function Articles() {
  return (
    <div className="articles-bg">
      <div className="project-detail-container">

        {/* Page header */}
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Articles</h1>
            <p className="project-detail-subtitle">
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="articles-substack-more-link"
              >
                More on Substack →
              </a>
            </p>
          </div>
        </header>

        {/* Article list */}
        <section className="main-section project-detail-section articles-category-section">
          {sortedArticles.length === 0 ? (
            <p className="articles-empty">New articles coming soon.</p>
          ) : (
            <div className="articles-list">
              {sortedArticles.map((article) => (
                <Link key={article.slug} href={`/articles/${article.slug}`} className="article-card">
                  <p className="article-category-eyebrow">{article.category}</p>
                  <h3>{article.title}</h3>
                  <p className="article-excerpt">{article.metaDescription}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Substack embed — lets visitors subscribe without leaving the page */}
        <section className="main-section project-detail-section articles-substack-section">
          <p className="section-intro">
            Browse recent Substack posts below, and subscribe by email to not miss out on new ones.
          </p>
          <div className="articles-substack-embed">
            <iframe
              src={`${SUBSTACK_URL}embed`}
              title="Audrey Anna Goddard on Substack"
              width="100%"
              height="200"
              style={{ border: 'none', background: '#f7f5f3' }}
              frameBorder="0"
              scrolling="no"
            />
          </div>
        </section>

      </div>
    </div>
  );
}

export default Articles;

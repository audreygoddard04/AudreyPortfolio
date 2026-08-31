import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import articles from '../data/articles';
import './ProjectDetail.css';
import './Articles.css';

const SUBSTACK_URL = 'https://audreyannagoddard.substack.com/';

const sortedArticles = [...articles].sort(
  (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
);

function Articles() {
  return (
    <div className="articles-bg">
      <SEO
        title="Articles"
        description="Original writing and research on science, business, economics, architecture, and real estate by Audrey Goddard."
        path="/articles"
      />
      <div className="project-detail-container">
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

        <section className="main-section project-detail-section articles-category-section">
          {sortedArticles.length === 0 ? (
            <p className="articles-empty">New articles coming soon.</p>
          ) : (
            <div className="articles-list">
              {sortedArticles.map((article) => (
                <Link key={article.slug} to={`/articles/${article.slug}`} className="article-card">
                  <p className="article-category-eyebrow">{article.category}</p>
                  <h3>{article.title}</h3>
                  <p className="article-excerpt">{article.metaDescription}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

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

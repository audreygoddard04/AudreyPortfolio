import React from 'react';
import './ProjectDetail.css';
import './Articles.css';

const SUBSTACK_URL = 'https://audreyannagoddard.substack.com/';

const CATEGORIES = [
  { id: 'business-entrepreneurship', title: 'Business & Entrepreneurship', description: 'Notes on building things.' },
  { id: 'books-ideas', title: 'Books & Ideas', description: 'Reflections on what I\'m reading & thinking about.' },
  { id: 'health-science', title: 'Health & Science', description: 'Nutrition, fitness, genetics, and everything I\'m learning about living well.' },
];

// Add new articles here as they're written, linking out to the Substack post.
const articles = [
  {
    title: 'Does Beauty Increase The Value Of Real Estate?',
    category: 'business-entrepreneurship',
    date: 'Aug 29, 2026',
    excerpt: 'Real estate: The physical land and any permanent buildings or natural things attached to it. Land, architecture, and value.',
    url: 'https://audreyannagoddard.substack.com/p/does-beauty-increase-the-value-of',
  },
  {
    title: 'Non-Fiction Fanatic',
    category: 'books-ideas',
    date: 'Aug 7, 2026',
    excerpt: 'The 10 non-fiction books that changed how I think.',
    url: 'https://audreyannagoddard.substack.com/p/non-fiction-fanatic',
  },
];

function Articles() {
  return (
    <div className="articles-bg">
      <div className="project-detail-container">
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Articles</h1>
            <p className="project-detail-subtitle">Writing on the things I care about, on Substack.</p>
          </div>
        </header>

        {/* Article Categories */}
        {CATEGORIES.map((category) => {
          const categoryArticles = articles.filter((article) => article.category === category.id);
          return (
            <section key={category.id} className="main-section project-detail-section articles-category-section">
              <h2>{category.title}</h2>
              <p className="section-intro">{category.description}</p>

              {categoryArticles.length > 0 ? (
                <div className="articles-grid">
                  {categoryArticles.map((article) => (
                    <a
                      key={article.title}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-card"
                    >
                      <h3>{article.title}</h3>
                      {article.date && <p className="article-date">{article.date}</p>}
                      {article.excerpt && <p className="article-excerpt">{article.excerpt}</p>}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="articles-empty">New articles coming soon.</p>
              )}
            </section>
          );
        })}

        <section className="main-section project-detail-section articles-substack-section">
          <p className="section-intro">
            Browse recent Substack posts below, and subscribe by email to not miss out on new ones.
          </p>
          <div className="articles-substack-embed">
            <iframe
              src={`${SUBSTACK_URL}embed`}
              title="Audrey Anna Goddard on Substack"
              width="100%"
              height="320"
              style={{ border: '1px solid #e6d7b9', background: 'white' }}
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

import React from 'react';
import './ProjectDetail.css';
import './Articles.css';

const CATEGORIES = [
  { id: 'health-longevity', title: 'Health & Longevity', description: 'Nutrition, fitness, fasting, and everything I learn about living well.' },
  { id: 'genetics-science', title: 'Genetics & Science', description: 'Research, genomics, and ideas from the lab and beyond.' },
  { id: 'business-money', title: 'Business & Money', description: 'Notes on entrepreneurship, investing, and building things.' },
  { id: 'books-ideas', title: 'Books & Ideas', description: 'Reflections on what I\'m reading and thinking about.' },
];

// Add new articles here as they're written, e.g.:
// { title: 'Why I Started Lifting', category: 'health-longevity', date: '2026-01-10', excerpt: '...' }
const articles = [];

function Articles() {
  return (
    <div className="articles-bg">
      <div className="project-detail-container">
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Articles</h1>
            <p className="project-detail-subtitle">Writing on the things I care about.</p>
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
                    <article key={article.title} className="article-card">
                      <h3>{article.title}</h3>
                      {article.date && <p className="article-date">{article.date}</p>}
                      {article.excerpt && <p className="article-excerpt">{article.excerpt}</p>}
                    </article>
                  ))}
                </div>
              ) : (
                <p className="articles-empty">New articles coming soon.</p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Articles;

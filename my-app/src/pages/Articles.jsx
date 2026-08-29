import React, { useEffect, useState } from 'react';
import './ProjectDetail.css';
import './Articles.css';

const SUBSTACK_URL = 'https://audreyannagoddard.substack.com/';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'

  useEffect(() => {
    let cancelled = false;

    fetch('/api/substack-feed')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Substack feed');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setArticles(data.articles || []);
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="articles-bg">
      <div className="project-detail-container">
        <header className="project-detail-header">
          <div className="project-detail-title-section">
            <h1>Articles</h1>
          </div>
        </header>

        <section className="main-section project-detail-section articles-category-section">
          {status === 'loading' && <p className="articles-empty">Loading articles…</p>}

          {status === 'error' && (
            <p className="articles-empty">
              Couldn't load articles right now — read them directly on{' '}
              <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">Substack</a>.
            </p>
          )}

          {status === 'ready' && articles.length === 0 && (
            <p className="articles-empty">New articles coming soon.</p>
          )}

          {status === 'ready' && articles.length > 0 && (
            <div className="articles-list">
              {articles.map((article) => (
                <a
                  key={article.link}
                  href={article.link}
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

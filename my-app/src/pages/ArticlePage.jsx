import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import articles from '../data/articles';
import siteConfig from '../data/siteConfig';
import './ProjectDetail.css';
import './Articles.css';
import './ArticlePage.css';

function formatDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

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
                    <dt>Location</dt><dd>{b.location}</dd>
                    <dt>Architect</dt><dd>{b.architect}</dd>
                    <dt>Year</dt><dd>{b.year}</dd>
                    <dt>Original purpose</dt><dd>{b.originalPurpose}</dd>
                    <dt>Current use</dt><dd>{b.currentUse}</dd>
                    <dt>Land</dt><dd>{b.land}</dd>
                    <dt>Architecture</dt><dd>{b.architecture}</dd>
                    <dt>Ownership</dt><dd>{b.ownership}</dd>
                    <dt>Estimated value</dt><dd>{b.estimatedValue}</dd>
                    <dt>Revenue model</dt><dd>{b.revenueModel}</dd>
                  </dl>
                  <p className="article-building-why"><strong>Why is it valuable?</strong> {b.whyValuable}</p>
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

function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const path = `/articles/${article.slug}`;
  const related = articles.filter((a) => article.relatedSlugs.includes(a.slug));

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
      <SEO
        title={article.title}
        description={article.metaDescription}
        path={path}
        type="article"
        structuredData={structuredData}
      />
      <div className="project-detail-container article-page-container">
        <Link to="/articles" className="article-back-to-all article-back-to-all-top">← All articles</Link>

        <article className="main-section project-detail-section article-body">
          <h1>{article.title}</h1>
          <p className="article-byline">
            By {siteConfig.author} · <time dateTime={article.pubDate}>{formatDate(article.pubDate)}</time>
            {article.updatedDate !== article.pubDate && (
              <> · Updated <time dateTime={article.updatedDate}>{formatDate(article.updatedDate)}</time></>
            )}
          </p>

          {article.content.map((block, i) => (
            <ContentBlock block={block} key={i} />
          ))}
        </article>

        <div className="article-footer-links">
          <a
            href={article.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="article-substack-secondary-link"
          >
            More on Substack →
          </a>
          <Link to="/articles" className="article-back-to-all">← All articles</Link>
        </div>

        {related.length > 0 && (
          <section className="main-section project-detail-section">
            <h2>Related articles</h2>
            <div className="articles-list">
              {related.map((a) => (
                <Link key={a.slug} to={`/articles/${a.slug}`} className="article-card">
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

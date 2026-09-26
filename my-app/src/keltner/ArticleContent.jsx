import { serializeJsonLd } from "@/lib/jsonLd.mjs";
import Link from "next/link";
import { categoryTitle, getCategory } from "./config";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { safeHttpUrl, hasAffiliateLinks, formatDate } from "./editorial.mjs";
import styles from "./publication.module.css";
function EditorialImage({ image, wide = false }) {
  if (!image?.url) return null;
  return (
    <figure className={styles.editorialFigure}>
      <Image
        src={image.url}
        alt={image.alt || ""}
        width={image.width || 1200}
        height={image.height || 900}
        sizes={
          wide
            ? "(max-width: 1120px) 100vw, 1120px"
            : "(max-width: 740px) 100vw, 700px"
        }
        priority={wide}
        className={styles.heroImage}
      />
      {(image.caption || image.credit) && (
        <figcaption>
          {image.caption}
          {image.credit && `${image.caption ? " — " : ""}${image.credit}`}
        </figcaption>
      )}
    </figure>
  );
}
const portableComponents = {
  types: { image: ({ value }) => <EditorialImage image={value} /> },
  marks: {
    link: ({ value, children }) => {
      const href = safeHttpUrl(value.href);
      return href ? (
        <a
          href={href}
          target="_blank"
          rel={
            value.isAffiliate
              ? "sponsored noopener noreferrer"
              : "noopener noreferrer"
          }
        >
          {children}
        </a>
      ) : (
        <span>{children}</span>
      );
    },
  },
};
export default function ArticleContent({ article }) {
  const affiliate = hasAffiliateLinks(article);
  const products = (article.products || []).filter(
    (p) => p && safeHttpUrl(p.url),
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article._updatedAt || article.publishedAt,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: "KELTNER" },
    mainEntityOfPage: `https://audreygoddard.com/keltner/articles/${article.slug}`,
    ...(article.heroImage?.url ? { image: article.heroImage.url } : {}),
  };
  return (
    <article className={styles.article}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <header className={styles.articleHeader}>
        <p className={styles.eyebrow}>
          {getCategory(article.category?.slug) ? (
            <Link href={`/keltner/${getCategory(article.category.slug).slug}`}>
              {categoryTitle(article.category)}
            </Link>
          ) : (
            categoryTitle(article.category)
          )}
        </p>
        <h1>{article.title}</h1>
        {article.excerpt && (
          <p className={styles.articleDek}>{article.excerpt}</p>
        )}
        <p className={styles.articleByline}>
          {article.author && <span>By {article.author}</span>}
          {article.publishedAt && (
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          )}
        </p>
      </header>
      {affiliate && (
        <p className={styles.notice}>
          This article contains affiliate links. If you buy through these links,
          KELTNER may earn a commission.
        </p>
      )}
      <EditorialImage image={article.heroImage} wide />
      <div className={styles.prose}>
        <PortableText
          value={article.body || []}
          components={portableComponents}
        />
        {products.length > 0 && (
          <section>
            <h2>Featured in this story</h2>
            <div className={styles.products}>
              {products.map((product) => (
                <section className={styles.product} key={product._id}>
                  <EditorialImage image={product.image} />
                  <p className={styles.eyebrow}>{product.brand}</p>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  {product.price != null && product.priceCheckedAt && (
                    <p>
                      {product.currency} {product.price.toFixed(2)} · Checked{" "}
                      {formatDate(product.priceCheckedAt)}. Prices may change.
                    </p>
                  )}
                  <a
                    href={safeHttpUrl(product.url)}
                    target="_blank"
                    rel={
                      product.isAffiliate
                        ? "sponsored noopener noreferrer"
                        : "noopener noreferrer"
                    }
                  >
                    View at {product.retailer} ↗
                  </a>
                </section>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

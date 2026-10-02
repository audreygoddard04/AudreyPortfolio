import AffiliateLink from "../components/AffiliateLink";
import { JsonLd, AnswerSections, EditorialFaq } from "./EditorialSupport";
import { articleData, articlePath } from "./seo.mjs";
import Link from "@/keltner/PublicationLink";
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
        alt={image.decorative ? "" : image.alt || ""}
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
function EditorialLink({
  href,
  isAffiliate,
  context,
  merchant,
  placement,
  children,
}) {
  const url = safeHttpUrl(href);
  if (!url) return <span>{children}</span>;
  return isAffiliate ? (
    <AffiliateLink
      href={url}
      {...context}
      merchant={merchant}
      placement={placement}
    >
      {children}
    </AffiliateLink>
  ) : (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
export default function ArticleContent({ article }) {
  const context = {
    articleSlug: article.slug,
    category:
      getCategory(article.category?.slug)?.slug || article.category?.slug,
    destination: article.destination?.path,
  };
  const portableComponents = {
    types: { image: ({ value }) => <EditorialImage image={value} /> },
    marks: {
      link: ({ value, children }) => (
        <EditorialLink
          href={value.href}
          isAffiliate={value.isAffiliate}
          context={context}
          placement="article_inline"
        >
          {children}
        </EditorialLink>
      ),
    },
  };
  const affiliate = hasAffiliateLinks(article);
  const products = (article.products || []).filter(
    (p) => p && safeHttpUrl(p.url),
  );
  return (
    <article className={styles.article}>
      <JsonLd data={articleData(article)} />
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
          {article.author && (
            <span>
              By{" "}
              {article.author === "Audrey Goddard" ? (
                <Link href="https://audreygoddard.com/about">{article.author}</Link>
              ) : (
                article.author
              )}
            </span>
          )}
          {article.publishedAt && (
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          )}
          {article.updatedAt && (
            <span>
              Updated{" "}
              <time dateTime={article.updatedAt}>
                {formatDate(article.updatedAt)}
              </time>
            </span>
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
        <AnswerSections article={article} />
        <PortableText
          value={article.body || []}
          components={portableComponents}
        />
        <EditorialFaq faqs={article.faqs} path={articlePath(article)} />
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
                  <EditorialLink
                    href={product.url}
                    isAffiliate={product.isAffiliate}
                    context={context}
                    merchant={product.retailer}
                    placement="product_card"
                  >
                    View at {product.retailer} ↗
                  </EditorialLink>
                </section>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

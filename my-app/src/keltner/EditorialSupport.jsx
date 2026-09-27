import Link from "next/link";
import { serializeJsonLd } from "../lib/jsonLd.mjs";
import {
  breadcrumbData,
  destinationPath,
  faqData,
  visibleFaqs,
} from "./seo.mjs";
import ArticleList from "./ArticleList";
import styles from "./publication.module.css";
export function JsonLd({ data }) {
  return data ? (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  ) : null;
}
export function Breadcrumbs({ items }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <ol>
          {items.map((item, i) => (
            <li key={item.href}>
              {i === items.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.href}>{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbData(items)} />
    </>
  );
}
export function AnswerSections({ article }) {
  const labels = {
    bestFor: "Best for",
    location: "Location",
    whenToGo: "When to go",
    priceRange: "Price range",
    idealStay: "Ideal stay",
    keltnerPick: "KELTNER pick",
  };
  const facts = Object.entries(labels).filter(([key]) =>
    article.quickGuide?.[key]?.trim(),
  );
  return (
    <>
      {article.summary && (
        <section aria-label="Summary">
          <p>{article.summary}</p>
        </section>
      )}
      {facts.length > 0 && (
        <section>
          <h2>Quick Guide</h2>
          <dl>
            {facts.map(([key, label]) => (
              <div key={key}>
                <dt>
                  <strong>{label}</strong>
                </dt>
                <dd>{article.quickGuide[key]}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </>
  );
}
export function EditorialFaq({ faqs, path }) {
  const visible = visibleFaqs(faqs);
  return visible.length ? (
    <section id="faq">
      <h2>Frequently asked questions</h2>
      {visible.map((faq, i) => (
        <section key={faq._key || i}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </section>
      ))}
      <JsonLd data={faqData(visible, path)} />
    </section>
  ) : null;
}
export function RelatedStories({
  articles,
  title = "Keep reading",
  id = "related-title",
}) {
  return articles.length ? (
    <section aria-labelledby={id}>
      <div className={styles.sectionHeading}>
        <h2 id={id}>{title}</h2>
        <p className={styles.eyebrow}>From the journal</p>
      </div>
      <ArticleList articles={articles} />
    </section>
  ) : null;
}
export function DestinationNavigation({
  destinations,
  title = "Explore destinations",
}) {
  return destinations.length ? (
    <nav aria-label={title} className={styles.prose}>
      <h2>{title}</h2>
      <ul>
        {destinations.map((destination) => (
          <li key={destination.path}>
            <Link href={destinationPath(destination)}>{destination.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  ) : null;
}

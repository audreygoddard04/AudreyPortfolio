import site from "../data/siteConfig.js";
import { getCategory, categoryTitle } from "./config.js";
export const absoluteUrl = (path) => new URL(path, site.siteUrl).href;
export const articlePath = (article) => `/keltner/articles/${article.slug}`;
export const destinationPath = (destination) =>
  `/keltner/travel/${destination.path}`;
export const validTravelPath = (path) =>
  typeof path === "string" &&
  /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(path);
export const person = {
  "@type": "Person",
  "@id": absoluteUrl("/about#person"),
  name: site.author,
  url: absoluteUrl("/about"),
  sameAs: site.sameAs,
};
export const publication = {
  "@type": "Organization",
  "@id": absoluteUrl("/keltner#publication"),
  name: "KELTNER",
  url: absoluteUrl("/keltner"),
};
export const identityGraph = {
  "@context": "https://schema.org",
  "@graph": [person, publication],
};
export function visibleFaqs(faqs = []) {
  return (faqs || []).filter(
    (faq) => faq?.question?.trim() && faq?.answer?.trim(),
  );
}
export function faqData(faqs, path) {
  const visible = visibleFaqs(faqs);
  return visible.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": absoluteUrl(`${path}#faq`),
        isPartOf: { "@id": absoluteUrl(path) },
        mainEntity: visible.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }
    : null;
}
export function articleData(article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": absoluteUrl(`${articlePath(article)}#article`),
    headline: article.title,
    description: article.seoDescription || article.excerpt,
    datePublished: article.publishedAt,
    dateModified:
      article.updatedAt || article._updatedAt || article.publishedAt,
    ...(article.author
      ? {
          author:
            article.author === site.author
              ? { "@id": person["@id"] }
              : { "@type": "Person", name: article.author },
        }
      : {}),
    publisher: { "@id": publication["@id"] },
    mainEntityOfPage: absoluteUrl(articlePath(article)),
    ...(article.category
      ? { articleSection: categoryTitle(article.category) }
      : {}),
    ...(article.heroImage?.url
      ? { image: absoluteUrl(article.heroImage.url) }
      : {}),
  };
}
export function destinationCrumbs(path, destinations) {
  return destinations
    .filter((d) => path === d.path || path.startsWith(`${d.path}/`))
    .sort((a, b) => a.path.split("/").length - b.path.split("/").length)
    .map((d) => ({ name: d.title, href: destinationPath(d) }));
}
export function articleCrumbs(article, destinations = []) {
  const section = getCategory(article.category?.slug);
  return [
    { name: "KELTNER", href: "/keltner" },
    ...(section
      ? [{ name: section.title, href: `/keltner/${section.slug}` }]
      : []),
    ...(section?.slug === "travel" && article.destination?.path
      ? destinationCrumbs(article.destination.path, destinations)
      : []),
    { name: article.title, href: articlePath(article) },
  ];
}
export function breadcrumbData(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

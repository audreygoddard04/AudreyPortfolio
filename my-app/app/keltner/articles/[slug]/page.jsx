import { notFound } from "next/navigation";
import { getArticle, getArticles, getDestinations } from "@/keltner/content";
import Link from "next/link";
import { editorialLinks } from "@/keltner/linking.mjs";
import styles from "@/keltner/publication.module.css";
import { publicationMetadata, categoryTitle } from "@/keltner/config";
import ArticleContent from "@/keltner/ArticleContent";
import { Breadcrumbs, RelatedStories } from "@/keltner/EditorialSupport";
import { articleCrumbs } from "@/keltner/seo.mjs";
export const revalidate = 60;
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  const metadata = publicationMetadata(
    article.seoTitle || article.title,
    article.seoDescription || article.excerpt,
    `/keltner/articles/${slug}`,
    article.heroImage?.url || null,
  );
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      ...(article.heroImage?.url
        ? {
            images: [
              {
                url: article.heroImage.url,
                width: article.heroImage.width,
                height: article.heroImage.height,
                alt: article.heroImage.decorative
                  ? ""
                  : article.heroImage.alt || "",
              },
            ],
          }
        : {}),
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article._updatedAt,
      authors: article.author ? [article.author] : undefined,
      section: categoryTitle(article.category),
    },
  };
}
export default async function Page({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const [stories, destinations] = await Promise.all([
    getArticles(),
    getDestinations(),
  ]);
  const links = editorialLinks(article, stories);
  return (
    <>
      <Breadcrumbs items={articleCrumbs(article, destinations)} />
      <ArticleContent article={article} />
      <RelatedStories articles={links.related} />
      {links.commercial && <RelatedStories articles={[links.commercial]} title="A guide for your next step" id="commercial-guide" />}
      {links.pillar && <RelatedStories articles={[links.pillar]} title="The broader picture" id="pillar-guide" />}
      {links.section && (
        <nav aria-label="Explore this section" className={styles.prose}>
          <Link href={`/keltner/${links.section.slug}`}>Explore more {links.section.title} →</Link>
        </nav>
      )}
    </>
  );
}

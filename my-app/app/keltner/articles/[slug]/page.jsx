import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/keltner/content";
import { publicationMetadata } from "@/keltner/config";
import ArticleContent from "@/keltner/ArticleContent";
import ArticleList from "@/keltner/ArticleList";
import styles from "@/keltner/publication.module.css";
export const revalidate = 60;
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  const metadata = publicationMetadata(
    article.seoTitle || article.title,
    article.seoDescription || article.excerpt,
    `/keltner/articles/${slug}`,
    article.heroImage?.url,
  );
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article._updatedAt,
    },
  };
}
export default async function Page({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const stories = await getArticles();
  const related = stories
    .filter((story) => story._id !== article._id)
    .sort(
      (a, b) =>
        Number(b.category?.slug === article.category?.slug) -
        Number(a.category?.slug === article.category?.slug),
    )
    .slice(0, 3);
  return (
    <>
      <ArticleContent article={article} />
      {related.length > 0 && (
        <section aria-labelledby="related-title">
          <div className={styles.sectionHeading}>
            <h2 id="related-title">Keep reading</h2>
            <p className={styles.eyebrow}>From the journal</p>
          </div>
          <ArticleList articles={related} />
        </section>
      )}
    </>
  );
}

import { notFound } from "next/navigation";
import { categories, getCategory, publicationMetadata } from "@/keltner/config";
import { getArticles } from "@/keltner/content";
import ArticleList, { StoryCard } from "@/keltner/ArticleList";
import styles from "@/keltner/publication.module.css";
export const revalidate = 60;
export function generateStaticParams() {
  return categories.flatMap(({ slug, aliases = [] }) =>
    [slug, ...aliases].map((category) => ({ category })),
  );
}
export async function generateMetadata({ params }) {
  const { category } = await params;
  const section = getCategory(category);
  return section
    ? publicationMetadata(
        section.title,
        section.description,
        `/keltner/${section.slug}`,
      )
    : {};
}
export default async function Page({ params }) {
  const { category } = await params;
  const section = getCategory(category);
  if (!section) notFound();
  const articles = await getArticles(section.slug);
  const featured =
    articles.find((article) => article.heroImage?.url) || articles[0];
  const remaining = articles.filter((article) => article._id !== featured?._id);
  return (
    <>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>The KELTNER journal</p>
        <h1>{section.title}</h1>
        <p>{section.description}</p>
      </section>
      {featured ? (
        <>
          <StoryCard article={featured} featured />
          {remaining.length > 0 && (
            <section aria-labelledby="more-stories">
              <div className={styles.sectionHeading}>
                <h2 id="more-stories">More in {section.title}</h2>
              </div>
              <ArticleList articles={remaining} />
            </section>
          )}
        </>
      ) : (
        <ArticleList articles={[]} category={section.title} />
      )}
    </>
  );
}

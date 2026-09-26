import { publicationMetadata } from "@/keltner/config";
import { getArticles } from "@/keltner/content";
import ArticleList from "@/keltner/ArticleList";
import EditorialHero from "@/keltner/EditorialHero";
import styles from "@/keltner/publication.module.css";
export const revalidate = 60;
export const metadata = publicationMetadata();
export default async function Page() {
  const articles = await getArticles();
  const featured = articles.find(
    (article) => article.featured && article.heroImage?.url,
  );
  return (
    <>
      <EditorialHero article={featured} />
      <section
        id="journal"
        className={styles.journal}
        aria-labelledby="journal-title"
      >
        <h2 id="journal-title" className={styles.srOnly}>
          From the journal
        </h2>
        <ArticleList
          articles={
            articles.length > 1
              ? articles.filter((article) => article._id !== featured?._id)
              : articles
          }
        />
      </section>
    </>
  );
}

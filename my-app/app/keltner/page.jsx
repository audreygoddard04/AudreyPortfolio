export const revalidate = 60;
import Link from "next/link";
import { categories, publicationMetadata } from "@/keltner/config";
import { getArticles } from "@/keltner/content";
import ArticleList from "@/keltner/ArticleList";
import styles from "@/keltner/publication.module.css";
export const metadata = publicationMetadata();
export default async function Page() {
  const articles = await getArticles();
  return (
    <>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Style · Estates · Cars · Travel</p>
        <h1>
          Things that endure.
        </h1>
        <p>Timeless style, beautiful estates, and things worth keeping.</p>
      </section>
      <div className={styles.sectionHeading}>
        <h2>The journal</h2>
      </div>
      <ArticleList articles={articles} />
      <div className={styles.categories}>
        {categories.map((category, index) => (
          <section className={styles.category} key={category.slug}>
            <span>0{index + 1}</span>
            <h2>
              <Link href={`/keltner/${category.slug}`}>{category.title} ↗</Link>
            </h2>
            <p>{category.description}</p>
          </section>
        ))}
      </div>
    </>
  );
}

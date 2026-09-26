import Link from "next/link";
import Image from "next/image";
import { categoryTitle } from "./config";
import styles from "./publication.module.css";
export function StoryCard({ article, featured = false }) {
  const Heading = featured ? "h2" : "h3";
  return (
    <article className={featured ? styles.featuredStory : styles.card}>
      {article.heroImage?.url && (
        <Link
          className={styles.storyImageLink}
          href={`/keltner/articles/${article.slug}`}
          aria-label={`Read ${article.title}`}
          tabIndex={-1}
        >
          <Image
            src={article.heroImage.url}
            alt={article.heroImage.alt || ""}
            width={article.heroImage.width || 1200}
            height={article.heroImage.height || 900}
            sizes={
              featured
                ? "(max-width: 700px) 100vw, 60vw"
                : "(max-width: 700px) 70vw, 400px"
            }
            priority={featured}
          />
        </Link>
      )}
      <div className={styles.storyCopy}>
        <p className={styles.eyebrow}>{categoryTitle(article.category)}</p>
        <Heading>
          <Link href={`/keltner/articles/${article.slug}`}>
            {article.title}
          </Link>
        </Heading>
        {article.excerpt && (
          <p className={styles.storyExcerpt}>{article.excerpt}</p>
        )}
        <Link
          className={styles.textLink}
          href={`/keltner/articles/${article.slug}`}
        >
          Read the story <span aria-hidden="true">→</span>
          <span className={styles.srOnly}>: {article.title}</span>
        </Link>
      </div>
    </article>
  );
}
export default function ArticleList({ articles, category }) {
  if (!articles.length)
    return (
      <div className={styles.empty}>
        <p className={styles.eyebrow}>In the making</p>
        <h2>
          {category
            ? `A considered look at ${category.toLowerCase()}.`
            : "Good stories take time."}
        </h2>
        <p>
          {category
            ? `Our first ${category.toLowerCase()} stories are in the works.`
            : "The first issue is in the works."}{" "}
          Come back for stories, guides, and things worth keeping.
        </p>
        <Link className={styles.textLink} href="/keltner/newsletter">
          Stay in touch <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  return (
    <div className={styles.cards}>
      {articles.map((article) => (
        <StoryCard key={article._id} article={article} />
      ))}
    </div>
  );
}

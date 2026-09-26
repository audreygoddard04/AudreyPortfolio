import Image from "next/image";
import Link from "next/link";
import { categoryTitle } from "./config";
import styles from "./publication.module.css";
const introduction = {
  title: (
    <>
      Beautiful Places
      <br />
      Still Worth Finding
    </>
  ),
  excerpt:
    "Considered guides to the world's most remarkable stays, towns and landscapes.",
  category: "Travel",
  href: "/keltner/places",
  cta: "Explore Places",
  image: {
    url: "/keltner/lake-como.png",
    alt: "Golden evening light over lakeside villas, cypress trees, and the mountains of Lake Como",
  },
  location: (
    <>
      Lake Como
      <br />
      Italy
    </>
  ),
};
// An optional featured Sanity article replaces the temporary editorial introduction.
export default function EditorialHero({ article }) {
  const story = article
    ? {
        title: article.title,
        excerpt: article.excerpt,
        category: categoryTitle(article.category),
        href: `/keltner/articles/${article.slug}`,
        cta: "Read the story",
        image: article.heroImage,
      }
    : introduction;
  return (
    <section className={styles.editorialHero} aria-labelledby="cover-title">
      <Image
        src={story.image.url}
        alt={story.image.alt || ""}
        fill
        priority
        sizes="(max-width: 700px) 1600px, 100vw"
        className={styles.coverImage}
      />
      <div className={styles.coverShade} aria-hidden="true" />
      <div className={styles.coverCopy}>
        <p className={styles.eyebrow}>{story.category}</p>
        <h1 id="cover-title">{story.title}</h1>
        <p className={styles.coverDek}>{story.excerpt}</p>
        <Link className={styles.coverLink} href={story.href}>
          {story.cta} <span aria-hidden="true">→</span>
        </Link>
      </div>
      {story.location && <p className={styles.location}>{story.location}</p>}
    </section>
  );
}

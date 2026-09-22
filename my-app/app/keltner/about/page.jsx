import styles from "@/keltner/publication.module.css";
import { publicationMetadata } from "@/keltner/config";
export const metadata = publicationMetadata(
  "About",
  "A journal of timeless style, remarkable places, and things worth keeping.",
  "/keltner/about",
);
export default function Page() {
  return (
    <article className={styles.prose}>
      <p className={styles.eyebrow}>About the journal</p>
      <h1>Things worth keeping.</h1>
      <p>
        KELTNER is a publication by Audrey Goddard, exploring style,
        architecture, motoring, and travel through an interest in things that
        endure.
      </p>
      <p>
        The name comes from my father’s middle name. It is a personal starting
        point for a journal about the places, objects, and ideas we choose to
        keep close.
      </p>
      <h2>Our approach</h2>
      <p>
        Considered stories, thoughtful details, and a preference for lasting
        interest over passing trends.
      </p>
      <h2>Product links</h2>
      <p>
        Some articles may include affiliate links. When they do, the article
        will say so before the recommendations. If you buy through one of those
        links, KELTNER may earn a commission.
      </p>
    </article>
  );
}

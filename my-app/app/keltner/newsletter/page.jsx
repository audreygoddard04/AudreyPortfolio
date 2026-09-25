import styles from "@/keltner/publication.module.css";
import { publicationMetadata } from "@/keltner/config";
import NewsletterSignup from "@/keltner/NewsletterSignup";
export const metadata = publicationMetadata(
  "Newsletter",
  "Stories, places, and things worth keeping, delivered to your inbox.",
  "/keltner/newsletter",
);
export default function Page() {
  return (
    <article className={styles.prose}>
      <NewsletterSignup headingLevel="h1" />
    </article>
  );
}

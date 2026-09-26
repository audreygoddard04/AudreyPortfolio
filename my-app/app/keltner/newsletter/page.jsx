import styles from "@/keltner/publication.module.css";
import { publicationMetadata } from "@/keltner/config";
export const metadata = publicationMetadata(
  "Newsletter",
  "Stories, places, and things worth keeping, delivered to your inbox.",
  "/keltner/newsletter",
);
export default function Page() {
  return (
    <>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>A letter from KELTNER</p>
        <h1>Something worth opening.</h1>
        <p>A moment to pause. A place to discover. A story to keep.</p>
      </header>
    </>
  );
}

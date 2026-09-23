import Link from "next/link";
import styles from "@/keltner/publication.module.css";
import { categories, tagline } from "@/keltner/config";
export default function PublicationLayout({ children }) {
  return (
    <div className={styles.shell}>
      <div className={styles.wrap}>
        <header>
          <div className={styles.topline}>
            <a href="/">By Audrey Goddard</a>
            <Link href="/keltner/about">An independent journal</Link>
          </div>
          <Link
            href="/keltner"
            className={styles.masthead}
            aria-label="KELTNER home"
          >
            <span className={styles.wordmark}>
              <img
                src="/keltner/logo.jpg"
                alt="KELTNER"
                width="1920"
                height="1080"
                fetchPriority="high"
              />
            </span>
          </Link>
          <div className={styles.brandRule} aria-hidden="true" />
          <p className={styles.tagline}>{tagline}</p>
          <nav className={styles.nav} aria-label="Publication">
            {categories.map((c) => (
              <Link href={`/keltner/${c.slug}`} key={c.slug}>
                {c.title}
              </Link>
            ))}
            <Link href="/keltner/about">About</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className={styles.footer}>
          <div className={styles.footerTop}>
            <p>{tagline}</p>
            <nav aria-label="Footer">
              <Link href="/keltner/newsletter">Newsletter</Link>
              <Link href="/keltner/about">About</Link>
              <a href="/">Audrey Goddard</a>
            </nav>
          </div>
          <p className={styles.disclosure}>
            <strong>Product links</strong><br />
            Some articles may include affiliate links. When they do, the article will say so before the recommendations. If you buy through one of those links, KELTNER may earn a commission.
          </p>
        </footer>
      </div>
    </div>
  );
}

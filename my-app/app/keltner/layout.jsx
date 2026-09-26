import Link from "next/link";
import styles from "@/keltner/publication.module.css";
import { tagline } from "@/keltner/config";
import PublicationNav from "@/keltner/PublicationNav";
import Newsletter from "@/keltner/Newsletter";
export default function PublicationLayout({ children }) {
  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#publication-content">
        Skip to content
      </a>
      <div className={styles.wrap}>
        <header>
          <div className={styles.mastheadRow}>
            <div className={styles.publicationCredits}>
              <a className={styles.portfolioLink} href="/">
                By Audrey Goddard
              </a>
              <Link className={styles.publicationCredit} href="/keltner/about">
                An independent publication
              </Link>
            </div>
            <div className={styles.brand}>
              <Link
                href="/keltner"
                className={styles.masthead}
                aria-label="KELTNER home"
              >
                KELTNER
              </Link>
              <div className={styles.brandRule} aria-hidden="true" />
              <p className={styles.tagline}>Timeless | Classic | Refined</p>
            </div>
          </div>
          <PublicationNav />
        </header>
        <main id="publication-content" tabIndex={-1}>
          {children}
          <Newsletter />
        </main>
        <footer className={styles.footer}>
          <div className={styles.footerTop}>
            <div>
              <Link className={styles.footerBrand} href="/keltner">
                KELTNER
              </Link>
              <p>{tagline}</p>
            </div>
            <nav aria-label="Footer">
              <Link href="/keltner/newsletter">Newsletter</Link>
              <Link href="/keltner/about">About</Link>
              <a href="/">Audrey Goddard ↗</a>
            </nav>
          </div>
          <p className={styles.disclosure}>
            Some stories include affiliate links, identified before the
            recommendations. If you buy through those links, KELTNER may earn a
            commission.
          </p>
        </footer>
      </div>
    </div>
  );
}

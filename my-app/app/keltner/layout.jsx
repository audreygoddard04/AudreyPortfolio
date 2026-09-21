import Link from 'next/link';
import styles from '@/keltner/publication.module.css';
import { categories, tagline } from '@/keltner/config';
export default function PublicationLayout({ children }) {
 return <div className={styles.shell}><div className={styles.wrap}>
  <header><div className={styles.topline}><a href="/">By Audrey Goddard</a><Link href="/keltner/about">An independent journal</Link></div>
   <Link href="/keltner" className={styles.masthead} aria-label="KELTNER home">KELTNER</Link>
   <nav className={styles.nav} aria-label="Publication">{categories.map(c => <Link href={`/keltner/${c.slug}`} key={c.slug}>{c.title}</Link>)}<Link href="/keltner/about">About</Link></nav>
  </header>
  <main>{children}</main>
  <footer className={styles.footer}><p>{tagline}</p><nav aria-label="Footer"><Link href="/keltner/newsletter">Newsletter</Link><Link href="/keltner/about">About</Link><a href="/">Audrey Goddard</a></nav></footer>
 </div></div>;
}

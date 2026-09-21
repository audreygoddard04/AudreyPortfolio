import styles from '@/keltner/publication.module.css';
import {publicationMetadata} from '@/keltner/config';
export const metadata=publicationMetadata('Newsletter','Follow Audrey’s writing while the KELTNER newsletter takes shape.','/keltner/newsletter');
export default function Page(){return <article className={styles.prose}><p className={styles.eyebrow}>Stay in touch</p><h1>More to come.</h1><p>The KELTNER newsletter is still taking shape. In the meantime, you can follow Audrey’s existing writing on Substack.</p><p><a href="https://audreyannagoddard.substack.com/" target="_blank" rel="noopener noreferrer">Visit Audrey’s Substack ↗</a></p></article>}

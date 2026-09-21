import Link from 'next/link';
import styles from './publication.module.css';
export default function ArticleList({ articles, category }) {
 if (!articles.length) return <p className={styles.empty}>{category ? `Our first ${category.toLowerCase()} stories are in the works.` : 'The first issue is in the works.'} Come back soon for considered stories, useful guides, and things worth keeping.</p>;
 return <div className={styles.cards}>{articles.map(article => <article className={styles.card} key={article._id}><p className={styles.eyebrow}>{article.category?.title}</p><h2><Link href={`/keltner/articles/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p></article>)}</div>;
}

import { notFound } from 'next/navigation';
import { categories, publicationMetadata } from '@/keltner/config';
import { getArticles } from '@/keltner/content';
import ArticleList from '@/keltner/ArticleList';
import styles from '@/keltner/publication.module.css';
export function generateStaticParams() { return categories.map(({slug})=>({category:slug})); }
export async function generateMetadata({params}) { const {category}=await params;const c=categories.find(c=>c.slug===category);return c?publicationMetadata(c.title,c.description,`/keltner/${category}`):{}; }
export default async function Page({params}) {
 const {category}=await params;const c=categories.find(c=>c.slug===category);if(!c)notFound();
 const articles=await getArticles(category);
 return <><section className={styles.hero}><p className={styles.eyebrow}>The KELTNER journal</p><h1>{c.title}</h1><p>{c.description}</p></section><ArticleList articles={articles} category={c.title}/></>;
}

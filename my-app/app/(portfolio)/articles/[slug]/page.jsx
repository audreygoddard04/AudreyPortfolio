import { notFound } from "next/navigation";
import articles from "@/data/articles";
import ArticlePage from "@/views/ArticlePage";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.metaDescription,
    path: `/articles/${slug}`,
    type: "article",
  });
}
export default async function Page({ params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}

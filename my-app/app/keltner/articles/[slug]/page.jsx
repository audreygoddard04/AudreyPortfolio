import NewsletterSignup from "@/keltner/NewsletterSignup";
import { notFound } from "next/navigation";
import { getArticle } from "@/keltner/content";
import { publicationMetadata } from "@/keltner/config";
import ArticleContent from "@/keltner/ArticleContent";
export const revalidate = 60;
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  const metadata = publicationMetadata(
    article.seoTitle || article.title,
    article.seoDescription || article.excerpt,
    `/keltner/articles/${slug}`,
    article.heroImage?.url,
  );
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article._updatedAt,
    },
  };
}
export default async function Page({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  return <><ArticleContent article={article} /><NewsletterSignup /></>;
}

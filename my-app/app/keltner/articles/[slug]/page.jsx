import { notFound } from "next/navigation";
import { getArticle, getArticles, getDestinations } from "@/keltner/content";
import { publicationMetadata } from "@/keltner/config";
import ArticleContent from "@/keltner/ArticleContent";
import { Breadcrumbs, RelatedStories } from "@/keltner/EditorialSupport";
import { articleCrumbs } from "@/keltner/seo.mjs";
export const revalidate = 60;
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  const metadata = publicationMetadata(
    article.seoTitle || article.title,
    article.seoDescription || article.excerpt,
    `/keltner/articles/${slug}`,
    article.heroImage?.url || null,
  );
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      ...(article.heroImage?.url
        ? {
            images: [
              {
                url: article.heroImage.url,
                width: article.heroImage.width,
                height: article.heroImage.height,
                alt: article.heroImage.decorative
                  ? ""
                  : article.heroImage.alt || "",
              },
            ],
          }
        : {}),
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article._updatedAt,
      authors: article.author ? [article.author] : undefined,
      section: article.category?.title,
    },
  };
}
export default async function Page({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const [stories, destinations] = await Promise.all([
    getArticles(),
    getDestinations(),
  ]);
  const guides = (article.relatedGuides || []).filter(
    (guide) => guide && guide._id !== article._id,
  );
  const related = stories
    .filter(
      (story) =>
        story._id !== article._id &&
        !guides.some((guide) => guide._id === story._id),
    )
    .sort(
      (a, b) =>
        Number(b.category?.slug === article.category?.slug) -
        Number(a.category?.slug === article.category?.slug),
    )
    .slice(0, 3);
  return (
    <>
      <Breadcrumbs items={articleCrumbs(article, destinations)} />
      <ArticleContent article={article} />
      <RelatedStories
        articles={guides}
        title="Related Guides"
        id="related-guides"
      />
      <RelatedStories articles={related} />
    </>
  );
}

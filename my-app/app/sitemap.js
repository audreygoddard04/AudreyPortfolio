import { getArticles } from "@/keltner/content";
import { categories } from "@/keltner/config";
export const revalidate = 60;
import routes from "@/data/routes";
import articles from "@/data/articles";
import site from "@/data/siteConfig";
export default async function sitemap() {
  const publicationArticles = await getArticles();
  return [
    ...[
      "/keltner",
      "/keltner/about",
      "/keltner/newsletter",
      ...categories.map((c) => `/keltner/${c.slug}`),
    ].map((path) => ({
      url: site.siteUrl + path,
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...publicationArticles.map((a) => ({
      url: `${site.siteUrl}/keltner/articles/${a.slug}`,
      lastModified: a._updatedAt || a.publishedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...routes.map((route) => ({
      url: site.siteUrl + route.path,
      changeFrequency: route.changefreq,
      priority: Number(route.priority),
    })),
    ...articles.map((article) => ({
      url: `${site.siteUrl}/articles/${article.slug}`,
      lastModified: article.updatedDate,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}

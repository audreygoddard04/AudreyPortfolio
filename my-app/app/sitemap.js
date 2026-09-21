import routes from '@/data/routes';
import articles from '@/data/articles';
import site from '@/data/siteConfig';
export default function sitemap() { return [
 ...routes.map(route => ({ url: site.siteUrl + route.path, changeFrequency: route.changefreq, priority: Number(route.priority) })),
 ...articles.map(article => ({ url: `${site.siteUrl}/articles/${article.slug}`, lastModified: article.updatedDate, changeFrequency: 'monthly', priority: 0.8 }))
]; }

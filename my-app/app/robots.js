import site from '@/data/siteConfig';
export default function robots() { return { rules: { userAgent: '*', allow: '/' }, sitemap: `${site.siteUrl}/sitemap.xml` }; }

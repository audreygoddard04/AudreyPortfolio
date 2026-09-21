import site from "@/data/siteConfig";
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio"] },
    sitemap: `${site.siteUrl}/sitemap.xml`,
  };
}

import site from "@/data/siteConfig";
export default function robots() {
  return {
    rules: ["*", "Googlebot", "Bingbot", "OAI-SearchBot"].map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow: ["/studio", "/api/"],
    })),
    sitemap: `${site.siteUrl}/sitemap.xml`,
  };
}

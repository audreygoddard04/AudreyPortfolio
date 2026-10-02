import site from "@/data/siteConfig";
import { headers } from "next/headers";
import { publicationOrigin } from "@/keltner/urls.mjs";
export const dynamic = "force-dynamic";
export default async function robots() {
  const host = (await headers()).get("host") || "";
  const origin = ["keltnerpress.com", "www.keltnerpress.com", "keltner.vercel.app"].includes(host.split(":")[0]) ? publicationOrigin : site.siteUrl;
  return {
    rules: ["*", "Googlebot", "Bingbot", "OAI-SearchBot"].map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow: ["/studio", "/api/"],
    })),
    sitemap: `${origin}/sitemap.xml`,
  };
}

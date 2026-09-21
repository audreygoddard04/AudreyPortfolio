import site from '@/data/siteConfig';
export function pageMetadata({ title, description = site.defaultDescription, path = '/', type = 'website', image = site.defaultImage } = {}) {
  const fullTitle = title ? `${title} | ${site.siteName}` : site.defaultTitle;
  return { title: { absolute: fullTitle }, description, alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: site.siteName, type, images: [image] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image] } };
}

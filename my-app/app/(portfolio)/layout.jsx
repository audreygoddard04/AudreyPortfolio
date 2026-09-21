import Header from '@/components/Header';
import Footer from '@/components/Footer';
import site from '@/data/siteConfig';
const structuredData = [
 { '@context':'https://schema.org', '@type':'Person', name:site.author, url:site.siteUrl, sameAs:site.sameAs, description:site.defaultDescription },
 { '@context':'https://schema.org', '@type':'WebSite', name:site.siteName, url:site.siteUrl }
];
export default function PortfolioLayout({ children }) {
 return <div id="root"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\u003c') }} /><Header /><main>{children}</main><Footer /></div>;
}

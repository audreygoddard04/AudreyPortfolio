import '../../src/index.css';
import '../../src/App.css';
import '../../src/components/Header.css';
import '../../src/components/Footer.css';
import '../../src/views/Home.css';
import '../../src/views/Health.css';
import '../../src/components/TDEECalculator.css';
import '../../src/views/Books.css';
import '../../src/views/ProjectDetail.css';
import '../../src/components/BookModal.css';
import '../../src/views/Projects.css';
import '../../src/views/Thesis.css';
import '../../src/components/RecipeModal.css';
import '../../src/components/MealPlanGenerator.css';
import '../../src/views/Nutrition.css';
import '../../src/views/Contact.css';
import '../../src/views/Articles.css';
import '../../src/views/ArticlePage.css';
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

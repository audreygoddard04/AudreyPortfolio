import '../src/index.css';
import '../src/App.css';
import '../src/components/Header.css';
import '../src/components/Footer.css';
import '../src/views/Home.css';
import '../src/views/Health.css';
import '../src/components/TDEECalculator.css';
import '../src/views/Books.css';
import '../src/views/ProjectDetail.css';
import '../src/components/BookModal.css';
import '../src/views/Projects.css';
import '../src/views/Thesis.css';
import '../src/components/RecipeModal.css';
import '../src/components/MealPlanGenerator.css';
import '../src/views/Nutrition.css';
import '../src/views/Contact.css';
import '../src/views/Articles.css';
import '../src/views/ArticlePage.css';
import site from '@/data/siteConfig';
export const metadata = { metadataBase: new URL(site.siteUrl), icons: { icon: '/favicon.png' } };
export const viewport = { themeColor: '#ffffff' };
export default function RootLayout({ children }) {
  return <html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet" />
  </head><body>{children}</body></html>;
}

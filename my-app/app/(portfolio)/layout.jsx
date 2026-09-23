/**
 * app/(portfolio)/layout.jsx
 *
 * Layout wrapper for all portfolio routes (everything under /).
 * Renders the shared Header and Footer around the page content.
 *
 * CSS is imported here rather than in individual page files because
 * Next.js App Router requires stylesheets to be imported in a
 * layout or page component — not in shared components themselves.
 * Importing them all here keeps CSS loading centralised and predictable.
 *
 * JSON-LD structured data (Person + WebSite schema) is injected once
 * at the layout level so every portfolio page benefits from it.
 */

import { serializeJsonLd } from "@/lib/jsonLd.mjs";

// --- Global styles ---
// Base resets and design tokens
import "../../src/index.css";
import "../../src/App.css";

// Component styles
import "../../src/components/Header.css";
import "../../src/components/Footer.css";
import "../../src/components/TDEECalculator.css";
import "../../src/components/BookModal.css";
import "../../src/components/RecipeModal.css";
import "../../src/components/MealPlanGenerator.css";

// View (page) styles
import "../../src/views/Home.css";
import "../../src/views/Health.css";
import "../../src/views/Books.css";
import "../../src/views/ProjectDetail.css";
import "../../src/views/Projects.css";
import "../../src/views/Thesis.css";
import "../../src/views/Nutrition.css";
import "../../src/views/Contact.css";
import "../../src/views/Articles.css";

// Editorial theme overrides — loaded last so they win over the above
import "../../src/portfolio-theme.css";

// --- Components + data ---
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import site from "@/data/siteConfig";

// Build the structured data array once at module load time.
// Person + WebSite schemas tell search engines who owns this site.
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.author,
    url: site.siteUrl,
    sameAs: site.sameAs,
    description: site.defaultDescription,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.siteName,
    url: site.siteUrl,
  },
];

export default function PortfolioLayout({ children }) {
  return (
    <div id="root">
      {/* Inject structured data into the page as an inline <script> tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

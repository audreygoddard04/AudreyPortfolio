import "@/brand-theme.css";
import { Analytics } from "@vercel/analytics/next";
import NewsletterPopup from "@/components/NewsletterPopup";
import site from "@/data/siteConfig";
export const metadata = {
  metadataBase: new URL(site.siteUrl),
  icons: { icon: "/favicon.png" },
};
export const viewport = { themeColor: "#ebeae8" };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/brand/email-popup.png" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HSZM1LJV5D" />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-HSZM1LJV5D');`,
          }}
        />
      </head>
      <body style={{ margin: 0 }}>
        {children}
        <NewsletterPopup />
        <Analytics />
      </body>
    </html>
  );
}

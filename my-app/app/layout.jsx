import site from "@/data/siteConfig";
export const metadata = {
  metadataBase: new URL(site.siteUrl),
  icons: { icon: "/favicon.png" },
};
export const viewport = { themeColor: "#ebeae8" };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

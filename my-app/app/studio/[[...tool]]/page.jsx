import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
export const dynamic = "force-static";
export const metadata = {
  title: "KELTNER Studio",
  robots: { index: false, follow: false },
};
export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
    return (
      <main
        style={{
          maxWidth: 680,
          margin: "80px auto",
          padding: 24,
          fontFamily: "Arial,sans-serif",
          lineHeight: 1.7,
        }}
      >
        <h1>KELTNER Studio</h1>
        <p>The editor is ready to connect to your Sanity project.</p>
        <p>
          Follow the setup guide in <code>docs/publishing.md</code>, add your
          project ID and dataset, then restart or redeploy the app.
        </p>
        <a href="/keltner">Back to KELTNER</a>
      </main>
    );
  return <NextStudio config={config} />;
}

import NewsletterLanding from "@/keltner/NewsletterLanding";
import { publicationMetadata } from "@/keltner/config";
export const metadata = publicationMetadata(
  "Newsletter",
  "Stories, places, and things worth keeping, delivered to your inbox.",
  "/keltner/newsletter",
);
export default function Page() {
  return <NewsletterLanding />;
}

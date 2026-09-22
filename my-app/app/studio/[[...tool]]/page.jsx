import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
export const dynamic = "force-static";
export const metadata = {
  title: "KELTNER Studio",
  robots: { index: false, follow: false },
};
export default function StudioPage() {
  return <NextStudio config={config} />;
}

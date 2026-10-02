import Link from "next/link";
import { publicationPath } from "./urls.mjs";

export default function PublicationLink({ href, ...props }) {
  return <Link href={typeof href === "string" ? publicationPath(href) : href} {...props} />;
}

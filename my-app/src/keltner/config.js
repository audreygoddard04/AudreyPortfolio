import { publicationOrigin, publicationUrl } from "./urls.mjs";
export const categories = [
  {
    slug: "style",
    title: "Style",
    description: "Clothes, craftsmanship, and a wardrobe built to last.",
  },
  {
    slug: "places",
    title: "Places",
    aliases: ["estates"],
    description:
      "Architecture, landscapes, and remarkable places with a sense of history.",
  },
  {
    slug: "motors",
    title: "Motors",
    aliases: ["cars", "motoring"],
    description: "Design, engineering, and the pleasure of the journey.",
  },
  {
    slug: "travel",
    title: "Travel",
    description:
      "Luxury journeys. Extraordinary stays. A world worth discovering.",
  },
  { slug: "the-home", title: "The Home", description: "Interiors, objects, and the art of living well at home." },
  { slug: "music", title: "Music", description: "Artists, recordings, and sounds worth returning to." },
  { slug: "culture", title: "Culture", description: "Art, books, and ideas that shape the way we live." },
];
export function getCategory(slug) {
  return categories.find(
    (category) => category.slug === slug || category.aliases?.includes(slug),
  );
}
export function categoryTitle(category) {
  return getCategory(category?.slug)?.title || category?.title || "The journal";
}
export const tagline = "A more elegant life.";
export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/audcast_/" },
  { label: "Pinterest", href: "https://ca.pinterest.com/audreyannagoddard/" },
  { label: "Substack", href: "https://substack.com/@keltnerco" },
  { label: "YouTube", href: "https://www.youtube.com/@audrey_goddard" },
];
export function publicationMetadata(
  title = "KELTNER",
  description = "An independent publication on style, places, motors, travel, the home, music, and culture. Stories, places, and things worth keeping.",
  path = "/keltner",
  image = "/keltner/lake-como.png",
) {
  const fullTitle = title === "KELTNER" ? title : `${title} | KELTNER`;
  return {
    metadataBase: new URL(publicationOrigin),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: publicationUrl(path) },
    openGraph: {
      title: fullTitle,
      description,
      url: publicationUrl(path),
      siteName: "KELTNER",
      type: "website",
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

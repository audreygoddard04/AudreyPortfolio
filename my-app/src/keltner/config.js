export const categories = [
  {
    slug: "style",
    title: "Style",
    description: "Clothes, craftsmanship, and a wardrobe built to last.",
  },
  {
    slug: "estates",
    title: "Estates",
    description:
      "Architecture, landscapes, and estates with a sense of history.",
  },
  {
    slug: "cars",
    title: "Cars",
    description: "Design, engineering, and the pleasure of the journey.",
  },
  {
    slug: "travel",
    title: "Travel",
    description: "Thoughtful journeys and the details worth remembering.",
  },
];
export const tagline = "Timeless | Classic | Refined";
export function publicationMetadata(
  title = "KELTNER",
  description = "Timeless style, remarkable estates, and things worth keeping. An independent journal by Audrey Goddard.",
  path = "/keltner",
  image = "/keltner/logo.jpg",
) {
  const fullTitle = title === "KELTNER" ? title : `${title} | KELTNER`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
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

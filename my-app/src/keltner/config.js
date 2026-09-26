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
    slug: "cars",
    title: "Cars",
    aliases: ["motoring"],
    description: "Design, engineering, and the pleasure of the journey.",
  },
  {
    slug: "travel",
    title: "Travel",
    description:
      "Luxury journeys. Extraordinary stays. A world worth discovering.",
  },
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
export function publicationMetadata(
  title = "KELTNER",
  description = "An independent publication on style, places, cars, and travel. Stories, places, and things worth keeping.",
  path = "/keltner",
  image = "/keltner/lake-como.png",
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

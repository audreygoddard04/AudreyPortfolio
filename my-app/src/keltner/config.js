export const categories = [
 { slug: 'style', title: 'Style', description: 'Clothes, craftsmanship, and a wardrobe built to last.' },
 { slug: 'places', title: 'Places', description: 'Architecture, landscapes, and places with a sense of history.' },
 { slug: 'motoring', title: 'Motoring', description: 'Design, engineering, and the pleasure of the journey.' },
 { slug: 'travel', title: 'Travel', description: 'Thoughtful journeys and the details worth remembering.' },
];
export const tagline = 'Timeless style, remarkable places, and things worth keeping.';
export function publicationMetadata(title = 'KELTNER', description = tagline, path = '/keltner', image) {
 const fullTitle = title === 'KELTNER' ? title : `${title} | KELTNER`;
 return { title: { absolute: fullTitle }, description, alternates: { canonical: path },
  openGraph: { title: fullTitle, description, url: path, siteName: 'KELTNER', type: 'website', ...(image ? {images:[image]} : {}) },
  twitter: {card: image ? 'summary_large_image' : 'summary', title:fullTitle, description, ...(image ? {images:[image]} : {})} };
}

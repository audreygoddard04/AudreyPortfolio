import { notFound, permanentRedirect } from "next/navigation";
import { getDestinations, getArticles } from "@/keltner/content";
import { publicationMetadata } from "@/keltner/config";
import {
  articlePath,
  destinationPath,
  destinationCrumbs,
  validTravelPath,
} from "@/keltner/seo.mjs";
import {
  Breadcrumbs,
  DestinationNavigation,
  EditorialFaq,
  RelatedStories,
} from "@/keltner/EditorialSupport";
import styles from "@/keltner/publication.module.css";
export const revalidate = 60;
async function resolve(params) {
  const { path } = await params;
  const key = path.join("/");
  if (!validTravelPath(key)) notFound();
  const [destinations, articles] = await Promise.all([
    getDestinations(),
    getArticles("travel"),
  ]);
  const destination = destinations.find((d) => d.path === key);
  if (!destination) {
    const article = articles.find((a) => a.travelPath === key);
    if (article) permanentRedirect(articlePath(article));
    notFound();
  }
  return { destination, destinations, articles };
}
export async function generateMetadata({ params }) {
  const { destination } = await resolve(params);
  return publicationMetadata(
    destination.title,
    destination.description,
    destinationPath(destination),
  );
}
export default async function Page({ params }) {
  const { destination, destinations, articles } = await resolve(params);
  const descendants = destinations.filter((d) =>
    d.path.startsWith(`${destination.path}/`),
  );
  const stories = articles.filter(
    (a) =>
      a.destination?.path === destination.path ||
      descendants.some((d) => d._id === a.destination?._id),
  );
  const related = destinations.filter(
    (d) =>
      d._id !== destination._id &&
      destination.relatedDestinations?.includes(d._id),
  );
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "KELTNER", href: "/keltner" },
          { name: "Travel", href: "/keltner/travel" },
          ...destinationCrumbs(destination.path, destinations),
        ]}
      />
      <section className={styles.hero}>
        <p className={styles.eyebrow}>KELTNER Travel</p>
        <h1>{destination.title}</h1>
        <p>{destination.description}</p>
      </section>
      <DestinationNavigation destinations={descendants} />
      <RelatedStories
        articles={stories}
        title={`Stories and guides: ${destination.title}`}
      />
      <div className={styles.prose}>
        <EditorialFaq
          faqs={destination.faqs}
          path={destinationPath(destination)}
        />
      </div>
      <DestinationNavigation
        destinations={related}
        title="Related destinations"
      />
    </>
  );
}

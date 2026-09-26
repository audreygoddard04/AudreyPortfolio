import "server-only";
import { cache } from "react";
import { createClient } from "next-sanity";
import { articlesQuery, articleQuery } from "./queries.mjs";
import { projectId, dataset } from "../sanity/project.mjs";
const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-02-19",
  useCdn: false,
  perspective: "published",
});
const options = {
  cache: "force-cache",
  next: { revalidate: 60, tags: ["keltner"] },
};
// The supplied estate cover replaces only the original Sanity collage asset.
// A new hero chosen in Sanity takes precedence automatically.
function withEditorialImage(article) {
  if (
    !article ||
    article.slug !== "value-in-beautiful-estates" ||
    !article.heroImage?.url?.includes(
      "d38d2a35df85d9d64bb3461a8f5405c8dd0a984f-1456x976.png",
    )
  )
    return article;
  return {
    ...article,
    heroImage: {
      ...article.heroImage,
      url: "/keltner/beautiful-estate-cover.png",
      width: 906,
      height: 870,
      alt: "Classical estate with arched colonnades, stone steps, and a garden terrace",
      caption: null,
      credit: null,
    },
  };
}
export const getArticles = cache(async (category = "") =>
  (await client.fetch(articlesQuery, { category }, options)).map(
    withEditorialImage,
  ),
);
export const getArticle = cache(async (slug) =>
  withEditorialImage(await client.fetch(articleQuery, { slug }, options)),
);

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
export const getArticles = cache(async (category = "") =>
  client.fetch(articlesQuery, { category }, options),
);
export const getArticle = cache(async (slug) =>
  client.fetch(articleQuery, { slug }, options),
);

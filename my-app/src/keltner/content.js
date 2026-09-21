import "server-only";
import { cache } from "react";
import { createClient } from "next-sanity";
import { articlesQuery, articleQuery } from "./queries.mjs";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const client = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2025-02-19",
      useCdn: false,
      perspective: "published",
    })
  : null;
const options = {
  cache: "force-cache",
  next: { revalidate: 60, tags: ["keltner"] },
};
export const getArticles = cache(async (category = "") =>
  client ? client.fetch(articlesQuery, { category }, options) : [],
);
export const getArticle = cache(async (slug) =>
  client ? client.fetch(articleQuery, { slug }, options) : null,
);

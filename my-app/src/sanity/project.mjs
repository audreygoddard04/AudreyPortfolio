// Public identifiers shared by the website, Studio, and Sanity CLI.
// Environment overrides let a separate deployment use another dataset.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ivnvhlvq";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

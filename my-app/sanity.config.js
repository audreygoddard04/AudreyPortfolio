"use client";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema";
export default defineConfig({
  name: "keltner",
  title: "KELTNER",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "unconfigured",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});

"use client";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema";
import { projectId, dataset } from "./src/sanity/project.mjs";
export default defineConfig({
  name: "keltner",
  title: "KELTNER",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});

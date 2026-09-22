import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./src/sanity/project.mjs";
export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});

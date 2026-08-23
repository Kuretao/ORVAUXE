import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;

if (!projectId) {
  throw new Error("Missing required Studio environment variable: SANITY_STUDIO_PROJECT_ID");
}

if (!dataset) {
  throw new Error("Missing required Studio environment variable: SANITY_STUDIO_DATASET");
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  typegen: {
    path: "../web/src/**/*.query.ts",
    schema: "./schema.json",
    generates: "../web/src/generated/sanity.types.ts",
    overloadClientMethods: true,
  },
});

import { defineCliConfig } from "sanity/cli";

function requireEnvironmentValue(name: "SANITY_STUDIO_PROJECT_ID" | "SANITY_STUDIO_DATASET") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required Studio environment variable: ${name}`);
  }

  return value;
}

export default defineCliConfig({
  api: {
    projectId: requireEnvironmentValue("SANITY_STUDIO_PROJECT_ID"),
    dataset: requireEnvironmentValue("SANITY_STUDIO_DATASET"),
  },
  typegen: {
    path: "../web/src/**/*.query.ts",
    schema: "./schema.json",
    generates: "../web/src/generated/sanity.types.ts",
    overloadClientMethods: true,
  },
});

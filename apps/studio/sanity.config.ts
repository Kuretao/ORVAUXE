import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/schema-types";
import {
  deskStructure,
  singletonDocumentActions,
  singletonTypeNames,
} from "./src/structure/desk-structure";

function requireEnvironmentValue(name: "SANITY_STUDIO_PROJECT_ID" | "SANITY_STUDIO_DATASET") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required Studio environment variable: ${name}`);
  }

  return value;
}

export default defineConfig({
  name: "default",
  title: "ORVAUXE",
  projectId: requireEnvironmentValue("SANITY_STUDIO_PROJECT_ID"),
  dataset: requireEnvironmentValue("SANITY_STUDIO_DATASET"),
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((template) => !singletonTypeNames.has(template.schemaType)),
  },
  document: {
    actions: (actions, context) =>
      singletonTypeNames.has(context.schemaType)
        ? actions.filter(
            (documentAction) =>
              documentAction.action !== undefined &&
              singletonDocumentActions.has(documentAction.action),
          )
        : actions,
  },
});

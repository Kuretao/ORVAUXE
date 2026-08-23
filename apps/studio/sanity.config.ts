import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/schema-types";
import {
  deskStructure,
  singletonDocumentActions,
  singletonTypeNames,
} from "./src/structure/desk-structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;

if (!projectId) {
  throw new Error("Missing required Studio environment variable: SANITY_STUDIO_PROJECT_ID");
}

if (!dataset) {
  throw new Error("Missing required Studio environment variable: SANITY_STUDIO_DATASET");
}

export default defineConfig({
  name: "default",
  title: "ORVAUXE",
  projectId,
  dataset,
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

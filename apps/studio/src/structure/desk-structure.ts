import type { StructureBuilder, StructureResolver } from "sanity/structure";

export const singletonTypeNames = new Set([
  "siteSettings",
  "homePage",
  "atelierPage",
  "studioPage",
]);

export const singletonDocumentActions = new Set([
  "publish",
  "unpublish",
  "discardChanges",
  "restore",
]);

function singletonListItem(structure: StructureBuilder, schemaType: string, title: string) {
  return structure
    .listItem()
    .id(schemaType)
    .title(title)
    .child(structure.document().schemaType(schemaType).documentId(schemaType));
}

export const deskStructure: StructureResolver = (structure) =>
  structure
    .list()
    .title("Content")
    .items([
      singletonListItem(structure, "siteSettings", "Site settings"),
      singletonListItem(structure, "homePage", "Home page"),
      singletonListItem(structure, "atelierPage", "Atelier page"),
      singletonListItem(structure, "studioPage", "Studio page"),
      structure.divider(),
      structure.documentTypeListItem("edition").title("Editions"),
      structure.documentTypeListItem("legalPage").title("Legal Pages"),
    ]);

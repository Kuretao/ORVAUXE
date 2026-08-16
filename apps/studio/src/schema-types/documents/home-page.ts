import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "heroHeading",
      title: "Hero heading",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "heroCopy",
      title: "Hero copy",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: "heroMedia",
      title: "Hero media",
      type: "imageWithAlt",
    }),
    defineField({
      name: "serviceIntroduction",
      title: "Service introduction",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().max(800),
    }),
    defineField({
      name: "selectedEditions",
      title: "Selected Editions",
      type: "array",
      of: [{ type: "reference", to: [{ type: "edition" }] }],
      validation: (rule) => rule.unique().max(4),
    }),
    defineField({
      name: "atelierIntroduction",
      title: "Atelier introduction",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().max(800),
    }),
    defineField({
      name: "closingCta",
      title: "Closing call to action",
      type: "cta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home page" }),
  },
});

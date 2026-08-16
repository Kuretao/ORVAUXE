import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "shareImage",
      title: "Share image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "noIndex",
      title: "Exclude from search engines",
      description: "Enable only when the approved indexing policy requires it.",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

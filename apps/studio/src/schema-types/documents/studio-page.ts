import { defineField, defineType } from "sanity";

export const studioPage = defineType({
  name: "studioPage",
  title: "Studio page",
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
      name: "pointOfView",
      title: "Point of view",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required().max(1_200),
    }),
    defineField({
      name: "origin",
      title: "Origin",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required().max(1_200),
    }),
    defineField({
      name: "operatingModel",
      title: "Operating model",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required().max(1_200),
    }),
    defineField({
      name: "trustContent",
      title: "Trust content",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().max(800),
    }),
    defineField({
      name: "contactCta",
      title: "Contact call to action",
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
    prepare: () => ({ title: "Studio page" }),
  },
});

import { defineArrayMember, defineField, defineType } from "sanity";

export const atelierPage = defineType({
  name: "atelierPage",
  title: "Atelier page",
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
      name: "serviceExplanation",
      title: "Service explanation",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required().max(1_200),
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1).max(12).unique(),
    }),
    defineField({
      name: "processSteps",
      title: "Process steps",
      type: "array",
      of: [
        defineArrayMember({
          name: "processStep",
          title: "Process step",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required().max(100),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required().max(600),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).max(8),
    }),
    defineField({
      name: "commercialCopy",
      title: "Commercial copy",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().max(800),
    }),
    defineField({
      name: "cta",
      title: "Call to action",
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
    prepare: () => ({ title: "Atelier page" }),
  },
});

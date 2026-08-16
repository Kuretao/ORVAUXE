import { defineArrayMember, defineField, defineType } from "sanity";

const legalSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 80,
      },
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            !value?.current || legalSlugPattern.test(value.current)
              ? true
              : "Use lowercase letters, numbers, and single hyphens only.",
          ),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "effectiveDate",
      title: "Effective date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updatedDate",
      title: "Updated date",
      type: "date",
      validation: (rule) =>
        rule.required().custom((value, context) => {
          const effectiveDate = context.document?.effectiveDate;

          if (!value || typeof effectiveDate !== "string") {
            return true;
          }

          return value >= effectiveDate || "Updated date cannot be before the effective date.";
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});

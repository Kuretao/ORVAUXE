import { defineArrayMember, defineField, defineType, getPublishedId } from "sanity";

export const edition = defineType({
  name: "edition",
  title: "Edition",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "editionNumber",
      title: "Edition number",
      type: "number",
      validation: (rule) =>
        rule
          .required()
          .integer()
          .positive()
          .custom(async (value, context) => {
            if (value === undefined || !context.document?._id) {
              return true;
            }

            const publishedId = getPublishedId(context.document._id);
            const client = context.getClient({ apiVersion: "2025-02-19" });
            const isUnique = await client.fetch<boolean>(
              `!defined(*[
                _type == "edition" &&
                editionNumber == $editionNumber &&
                !sanity::versionOf($publishedId)
              ][0]._id)`,
              { editionNumber: value, publishedId },
            );

            return isUnique || "Edition number must be unique.";
          }),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "draft",
      options: {
        layout: "radio",
        list: [
          { title: "Draft", value: "draft" },
          { title: "Available", value: "available" },
          { title: "Retired", value: "retired" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hero",
      title: "Hero image",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1).max(16).unique(),
    }),
    defineField({
      name: "startingPrice",
      title: "Starting price copy",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "launchEstimate",
      title: "Launch estimate copy",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "demoUrl",
      title: "Approved demo URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
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
  orderings: [
    {
      title: "Edition number",
      name: "editionNumberAscending",
      by: [{ field: "editionNumber", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      editionNumber: "editionNumber",
      status: "status",
      media: "hero.image",
    },
    prepare: ({ title, editionNumber, status, media }) => ({
      title,
      subtitle: `Edition ${String(editionNumber ?? "—")} · ${String(status ?? "unset")}`,
      media,
    }),
  },
});

import { defineField, defineType } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image with alternative text",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "decorative",
      title: "Decorative image",
      description: "Enable only when the image adds no information for assistive technology.",
      type: "boolean",
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { decorative?: boolean } | undefined;

          if (parent?.decorative) {
            return true;
          }

          return value?.trim() ? true : "Alternative text is required for informative images.";
        }),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: "credit",
      title: "Credit",
      type: "string",
      validation: (rule) => rule.max(160),
    }),
  ],
});

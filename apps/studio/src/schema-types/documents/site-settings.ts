import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "siteDescription",
      title: "Site description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "verifiedSocialProfiles",
      title: "Verified social profiles",
      type: "array",
      of: [
        defineArrayMember({
          name: "socialProfile",
          title: "Social profile",
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Other", value: "other" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required().uri({ scheme: ["https"] }),
            }),
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        }),
      ],
      validation: (rule) => rule.unique().max(8),
    }),
    defineField({
      name: "defaultSeoImage",
      title: "Default SEO image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "footerLegalCopy",
      title: "Footer legal copy",
      type: "string",
      validation: (rule) => rule.required().max(240),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});

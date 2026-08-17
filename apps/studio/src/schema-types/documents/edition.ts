import { defineArrayMember, defineField, defineType, getPublishedId } from "sanity";

const requiredStorefrontViewKinds = ["home", "collection", "product", "mobile"] as const;

interface StorefrontViewValue {
  kind?: string;
}

function validateStorefrontViews(value: StorefrontViewValue[] | undefined): true | string {
  if (!value) {
    return true;
  }

  const kinds = value.map((view) => view.kind).filter((kind): kind is string => Boolean(kind));
  const allowedKinds = new Set(["home", "collection", "product", "cart", "editorial", "mobile"]);
  if (kinds.some((kind) => !allowedKinds.has(kind))) {
    return "Storefront views contain an unsupported view kind.";
  }

  if (new Set(kinds).size !== kinds.length) {
    return "Each storefront view kind can be used only once.";
  }

  const missingKinds = requiredStorefrontViewKinds.filter((kind) => !kinds.includes(kind));
  if (missingKinds.length > 0) {
    return `Storefront views must include: ${missingKinds.join(", ")}.`;
  }

  return true;
}

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
      description:
        "Concept Editions may be published truthfully before commercial availability. Retired Editions are excluded from public routes.",
      type: "string",
      initialValue: "draft",
      options: {
        layout: "radio",
        list: [
          { title: "Concept", value: "draft" },
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
      name: "storefrontViews",
      title: "Storefront views",
      description:
        "Approved product-interface media for Home, Collection, Product and Mobile, with optional Cart and Editorial views.",
      type: "array",
      of: [
        defineArrayMember({
          name: "storefrontView",
          title: "Storefront view",
          type: "object",
          fields: [
            defineField({
              name: "kind",
              title: "View kind",
              type: "string",
              options: {
                list: [
                  { title: "Home", value: "home" },
                  { title: "Collection", value: "collection" },
                  { title: "Product", value: "product" },
                  { title: "Cart", value: "cart" },
                  { title: "Editorial", value: "editorial" },
                  { title: "Mobile", value: "mobile" },
                ],
              },
              validation: (rule) =>
                rule
                  .required()
                  .custom((value) =>
                    !value ||
                    ["home", "collection", "product", "cart", "editorial", "mobile"].includes(value)
                      ? true
                      : "Select one of the approved storefront view kinds.",
                  ),
            }),
            defineField({
              name: "media",
              title: "Media",
              type: "imageWithAlt",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "kind", media: "media.image" },
          },
        }),
      ],
      validation: (rule) =>
        rule
          .required()
          .min(4)
          .max(6)
          .custom((value) => validateStorefrontViews(value as StorefrontViewValue[] | undefined)),
    }),
    defineField({
      name: "features",
      title: "Technical foundation",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          validation: (rule) => rule.required().max(160),
        }),
      ],
      validation: (rule) => rule.required().min(1).max(16).unique(),
    }),
    defineField({
      name: "designDna",
      title: "Design DNA",
      description: "The defining visual and commerce characteristics of this Edition.",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          validation: (rule) => rule.required().max(160),
        }),
      ],
      validation: (rule) => rule.required().min(4).max(10).unique(),
    }),
    defineField({
      name: "systemStays",
      title: "The system stays",
      description: "Edition characteristics that remain stable across client adaptations.",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          validation: (rule) => rule.required().max(160),
        }),
      ],
      validation: (rule) => rule.required().min(4).max(10).unique(),
    }),
    defineField({
      name: "brandCanAdapt",
      title: "The brand can adapt",
      description: "Brand inputs that may change inside the Edition's approved boundaries.",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          validation: (rule) => rule.required().max(160),
        }),
      ],
      validation: (rule) => rule.required().min(4).max(10).unique(),
    }),
    defineField({
      name: "startingPrice",
      title: "Starting price copy",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "launchEstimate",
      title: "Delivery target from Ready to Build",
      description:
        "State the target only from Ready to Build; do not promise a calendar date from first contact.",
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

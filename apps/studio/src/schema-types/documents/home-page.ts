import { defineArrayMember, defineField, defineType } from "sanity";

interface InternalCtaValue {
  analyticsId?: string;
  destination?: string;
  destinationKind?: string;
}

function requireInternalDestination(
  value: InternalCtaValue | undefined,
  destination: string,
  analyticsId: "startProject" | null,
): true | string {
  if (!value) {
    return true;
  }

  if (value.destinationKind !== "internalPath" || value.destination !== destination) {
    return `This call to action must use the internal destination ${destination}.`;
  }

  if (value.analyticsId !== (analyticsId ?? undefined)) {
    return analyticsId
      ? `This call to action must use the ${analyticsId} analytics identifier.`
      : "This call to action must not set an analytics identifier.";
  }

  return true;
}

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
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
      name: "heroPrimaryCta",
      title: "Hero primary call to action",
      type: "cta",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            requireInternalDestination(
              value as InternalCtaValue | undefined,
              "/start-a-project",
              "startProject",
            ),
          ),
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Hero secondary call to action",
      type: "cta",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            requireInternalDestination(value as InternalCtaValue | undefined, "/editions", null),
          ),
    }),
    defineField({
      name: "heroMedia",
      title: "Editorial hero media",
      description:
        "Optional approved media for the editorial interlude. Leave empty until usage rights are confirmed.",
      type: "imageWithAlt",
    }),
    defineField({
      name: "statementHeading",
      title: "Brand statement heading",
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "serviceIntroduction",
      title: "Brand statement body",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().max(800),
    }),
    defineField({
      name: "editionsHeading",
      title: "Editions heading",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "editionsIntroduction",
      title: "Editions introduction",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().max(800),
    }),
    defineField({
      name: "editionsPrice",
      title: "Editions price copy",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "selectedEditions",
      title: "Featured Edition",
      description: "Select the single Edition featured on the home page.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "edition" }] })],
      validation: (rule) => rule.required().unique().length(1),
    }),
    defineField({
      name: "atelierHeading",
      title: "Atelier heading",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "atelierIntroduction",
      title: "Atelier introduction",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().max(800),
    }),
    defineField({
      name: "atelierPrice",
      title: "Atelier price copy",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "atelierCapabilities",
      title: "Atelier capabilities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1).max(8).unique(),
    }),
    defineField({
      name: "atelierCta",
      title: "Atelier call to action",
      type: "cta",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            requireInternalDestination(value as InternalCtaValue | undefined, "/atelier", null),
          ),
    }),
    defineField({
      name: "studioHeading",
      title: "Studio heading",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "studioDescriptor",
      title: "Studio descriptor",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "studioOrigin",
      title: "Studio origin",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "studioBody",
      title: "Studio body",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().max(800),
    }),
    defineField({
      name: "finalCtaEyebrow",
      title: "Final call to action eyebrow",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "finalCtaHeading",
      title: "Final call to action heading",
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "finalCtaBody",
      title: "Final call to action body",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: "closingCta",
      title: "Closing call to action",
      type: "cta",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            requireInternalDestination(
              value as InternalCtaValue | undefined,
              "/start-a-project",
              "startProject",
            ),
          ),
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

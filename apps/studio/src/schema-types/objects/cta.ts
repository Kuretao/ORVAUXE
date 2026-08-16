import { defineField, defineType } from "sanity";

type DestinationKind = "internalPath" | "externalUrl" | "email";

function validateDestination(
  value: string | undefined,
  parent: { destinationKind?: DestinationKind } | undefined,
) {
  if (!value) {
    return true;
  }

  switch (parent?.destinationKind) {
    case "internalPath":
      return /^\/(?!\/)/.test(value) || "Internal destinations must begin with a single slash.";
    case "externalUrl": {
      try {
        return new URL(value).protocol === "https:" || "External destinations must use HTTPS.";
      } catch {
        return "Enter a valid external URL.";
      }
    }
    case "email":
      return (
        /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(value) || "Enter a valid mailto: destination."
      );
    default:
      return "Choose a destination kind first.";
  }
}

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "destinationKind",
      title: "Destination kind",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Internal path", value: "internalPath" },
          { title: "External URL", value: "externalUrl" },
          { title: "Email", value: "email" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "destination",
      title: "Destination",
      description: "Use /path, an HTTPS URL, or a mailto: address to match the selected kind.",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .custom((value, context) =>
            validateDestination(
              value,
              context.parent as { destinationKind?: DestinationKind } | undefined,
            ),
          ),
    }),
    defineField({
      name: "analyticsId",
      title: "Analytics identifier",
      description: "Optional approved identifier for the typed CTA analytics event.",
      type: "string",
      options: {
        list: [
          { title: "Start a Project", value: "startProject" },
          { title: "Contact", value: "contact" },
        ],
      },
    }),
  ],
});

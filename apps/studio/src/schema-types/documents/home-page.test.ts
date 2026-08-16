import { describe, expect, it } from "vitest";

import { homePage } from "./home-page";

const expectedFieldNames = [
  "heroHeading",
  "heroCopy",
  "heroPrimaryCta",
  "heroSecondaryCta",
  "heroMedia",
  "statementHeading",
  "serviceIntroduction",
  "whatWeBuildHeading",
  "whatWeBuildIntroduction",
  "whatWeBuildSignals",
  "editionsHeading",
  "editionsIntroduction",
  "editionsPrice",
  "selectedEditions",
  "atelierHeading",
  "atelierIntroduction",
  "atelierPrice",
  "atelierCapabilities",
  "atelierCta",
  "atelierCampaignMedia",
  "processHeading",
  "processSteps",
  "studioHeading",
  "studioDescriptor",
  "studioOrigin",
  "studioBody",
  "studioMedia",
  "finalCtaEyebrow",
  "finalCtaHeading",
  "finalCtaBody",
  "closingCta",
  "seo",
];

describe("Home page schema", () => {
  it("uses explicit narrative fields without a generic page builder", () => {
    const fieldNames = homePage.fields.map((field) => field.name);

    expect(fieldNames).toEqual(expectedFieldNames);
    expect(fieldNames).not.toContain("sections");
  });

  it("keeps a single featured Edition reference", () => {
    const selectedEditions = homePage.fields.find((field) => field.name === "selectedEditions");

    expect(selectedEditions).toMatchObject({
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "edition" }],
          options: {
            filter: 'slug.current == "nocturne" && editionNumber == 1 && status == "draft"',
          },
        },
      ],
    });
  });

  it("models the expanded narrative as constrained fields", () => {
    const whatWeBuildSignals = homePage.fields.find((field) => field.name === "whatWeBuildSignals");
    const processSteps = homePage.fields.find((field) => field.name === "processSteps");

    expect(whatWeBuildSignals).toMatchObject({
      type: "array",
      of: [{ type: "string" }],
    });
    expect(processSteps).toMatchObject({
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "description", type: "text" },
          ],
        },
      ],
    });
  });
});

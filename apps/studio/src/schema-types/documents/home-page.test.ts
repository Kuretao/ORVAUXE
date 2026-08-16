import { describe, expect, it } from "vitest";

import { homePage } from "./home-page";

const expectedFieldNames = [
  "heroEyebrow",
  "heroHeading",
  "heroCopy",
  "heroPrimaryCta",
  "heroSecondaryCta",
  "heroMedia",
  "statementHeading",
  "serviceIntroduction",
  "editionsHeading",
  "editionsIntroduction",
  "editionsPrice",
  "selectedEditions",
  "atelierHeading",
  "atelierIntroduction",
  "atelierPrice",
  "atelierCapabilities",
  "atelierCta",
  "studioHeading",
  "studioDescriptor",
  "studioOrigin",
  "studioBody",
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
      of: [{ type: "reference", to: [{ type: "edition" }] }],
    });
  });
});

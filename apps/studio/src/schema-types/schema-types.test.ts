import { describe, expect, it } from "vitest";

import { schemaTypes } from ".";

const expectedSchemaTypeNames = [
  "siteSettings",
  "homePage",
  "atelierPage",
  "studioPage",
  "edition",
  "legalPage",
  "seo",
  "cta",
  "imageWithAlt",
];

describe("Studio schema registry", () => {
  it("registers exactly the approved launch schema types once", () => {
    const names = schemaTypes.map((schemaType) => schemaType.name);

    expect(names).toEqual(expectedSchemaTypeNames);
    expect(new Set(names).size).toBe(expectedSchemaTypeNames.length);
  });
});

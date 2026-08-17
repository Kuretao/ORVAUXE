import { describe, expect, it } from "vitest";

import { editionQuery, editionsQuery } from "./editions.query";

describe("Edition queries", () => {
  it.each([editionQuery, editionsQuery])(
    "includes published concept and available products while excluding retired products",
    (query) => {
      expect(query).toContain('status in ["draft", "available"]');
      expect(query).not.toContain('status == "available"');
    },
  );

  it("projects the constrained product fields used by both routes", () => {
    for (const field of [
      "storefrontViews",
      "features",
      "startingPrice",
      "launchEstimate",
      "designDna",
      "systemStays",
      "brandCanAdapt",
      "cta",
      "seo",
    ]) {
      expect(editionsQuery).toContain(field);
    }
  });
});

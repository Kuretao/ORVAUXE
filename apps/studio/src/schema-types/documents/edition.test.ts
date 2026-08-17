import { describe, expect, it } from "vitest";

import { edition } from "./edition";

describe("Edition schema", () => {
  it("publishes concept status explicitly without exposing retired Editions", () => {
    const status = edition.fields.find((field) => field.name === "status");

    expect(status).toMatchObject({
      type: "string",
      initialValue: "draft",
      options: {
        list: [
          { title: "Concept", value: "draft" },
          { title: "Available", value: "available" },
          { title: "Retired", value: "retired" },
        ],
      },
    });
  });

  it("keeps storefront proof constrained to the six approved view kinds", () => {
    const storefrontViews = edition.fields.find((field) => field.name === "storefrontViews");

    expect(storefrontViews).toMatchObject({
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "kind",
              type: "string",
              options: {
                list: [
                  { value: "home" },
                  { value: "collection" },
                  { value: "product" },
                  { value: "cart" },
                  { value: "editorial" },
                  { value: "mobile" },
                ],
              },
            },
            { name: "media", type: "imageWithAlt" },
          ],
        },
      ],
    });
  });

  it("models only the product-specific design and adaptation boundaries used by the site", () => {
    expect(
      edition.fields
        .filter((field) => ["designDna", "systemStays", "brandCanAdapt"].includes(field.name))
        .map(({ name, type }) => ({ name, type })),
    ).toEqual([
      { name: "designDna", type: "array" },
      { name: "systemStays", type: "array" },
      { name: "brandCanAdapt", type: "array" },
    ]);

    expect(edition.fields.map(({ name }) => name)).not.toContain("sections");
  });

  it("keeps every rendered product-list item length constrained", () => {
    for (const name of ["features", "designDna", "systemStays", "brandCanAdapt"]) {
      const field = edition.fields.find((candidate) => candidate.name === name);

      expect(field).toMatchObject({
        type: "array",
        of: [{ type: "string", validation: expect.any(Function) }],
      });
    }
  });

  it("defines delivery timing relative to Ready to Build", () => {
    expect(edition.fields.find((field) => field.name === "launchEstimate")).toMatchObject({
      title: "Delivery target from Ready to Build",
    });
  });
});

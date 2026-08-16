import { describe, expect, it } from "vitest";

import { edition } from "./edition";

describe("Edition schema", () => {
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
});

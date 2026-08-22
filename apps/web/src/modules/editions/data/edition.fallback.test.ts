import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  nocturneEditionFallback,
  nocturneProofMedia,
  nocturneStorefrontProofViews,
} from "./edition.fallback";

describe("Nocturne public product proof", () => {
  it("keeps the approved product truth while exposing real Storefront v1 captures", () => {
    expect(nocturneEditionFallback).toMatchObject({
      name: "Nocturne",
      originLabel: "ORVAUXE Original",
      status: "draft",
      statusLabel: "Concept Edition",
      demoUrl: null,
    });
    expect(nocturneStorefrontProofViews.map((view) => view.kind)).toEqual([
      "home",
      "collection",
      "product",
      "cart",
      "editorial",
      "mobile",
    ]);
  });

  it("references seven optimized, local, public-safe proof derivatives", () => {
    const media = Object.values(nocturneProofMedia);
    expect(media).toHaveLength(7);

    for (const item of media) {
      expect(item.src).toMatch(/^\/media\/editions\/nocturne\/proof\/.+\.webp$/);
      expect(item.alt).not.toBe("");
      expect(item.credit).toBe("ORVAUXE Nocturne Storefront v1");
      expect(existsSync(join(process.cwd(), "public", item.src))).toBe(true);
      expect(item.src).not.toMatch(/github|myshopify|localhost|theme_id/i);
    }
  });
});

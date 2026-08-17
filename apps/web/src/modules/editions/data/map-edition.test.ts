import { describe, expect, it } from "vitest";

import { isNocturneEdition } from "../model/edition";
import { createEditionRecord } from "./__fixtures__/edition-record";
import { nocturneEditionFallback } from "./edition.fallback";
import { mapEdition } from "./map-edition";

describe("mapEdition", () => {
  it("maps the constrained Nocturne product contract", () => {
    const edition = mapEdition(createEditionRecord());

    expect(edition).toMatchObject({
      name: "Nocturne",
      slug: "nocturne",
      editionNumber: 1,
      numberLabel: "Edition 001",
      category: "Fashion / Accessories",
      status: "draft",
      statusLabel: "Concept Edition",
      originLabel: "ORVAUXE Original",
      startingPrice: "From $2,490",
      deliveryTarget: "7–10 business days from Ready to Build",
      platform: "Shopify",
      revisionRounds: 2,
      defectCorrectionDays: 14,
      cta: { href: "/start-a-project?edition=nocturne" },
      seo: { noIndex: false },
    });
    expect(edition?.storefrontViews.map(({ kind }) => kind)).toEqual([
      "home",
      "collection",
      "product",
      "cart",
      "editorial",
      "mobile",
    ]);
    expect(edition?.includedExperiences).toHaveLength(6);
    expect(edition && isNocturneEdition(edition)).toBe(true);
  });

  it.each([
    ["starting price", { startingPrice: "From $2,499" }],
    ["delivery target", { launchEstimate: "10 business days" }],
    ["concept status", { status: "available" as const }],
    [
      "CTA route",
      {
        cta: {
          label: "Start with Nocturne",
          destinationKind: "internalPath" as const,
          destination: "/start-a-project",
        },
      },
    ],
    [
      "indexability",
      {
        seo: {
          metaTitle: "Nocturne — Fashion Shopify Edition | ORVAUXE",
          metaDescription: "Truthful Nocturne concept Edition description.",
          shareImage: null,
          noIndex: true,
        },
      },
    ],
  ])("rejects Nocturne when its approved %s invariant changes", (_label, overrides) => {
    expect(mapEdition(createEditionRecord(overrides))).toBeNull();
  });

  it("rejects incomplete or duplicated storefront proof", () => {
    const valid = createEditionRecord();
    const storefrontViews = valid.storefrontViews ?? [];

    expect(
      mapEdition(
        createEditionRecord({
          storefrontViews: storefrontViews.filter(({ kind }) => kind !== "mobile"),
        }),
      ),
    ).toBeNull();
    expect(
      mapEdition(
        createEditionRecord({
          storefrontViews: [
            ...storefrontViews,
            { kind: "home", media: storefrontViews[0]?.media ?? null },
          ],
        }),
      ),
    ).toBeNull();
  });

  it("keeps future public Editions commercially flexible", () => {
    const edition = mapEdition(
      createEditionRecord({
        id: "edition-002-lumen",
        name: "Lumen",
        slug: "lumen",
        editionNumber: 2,
        category: "Jewelry",
        status: "available",
        startingPrice: "From $3,200",
        launchEstimate: "8–12 business days from Ready to Build",
        cta: {
          label: "Start with Lumen",
          destinationKind: "internalPath",
          destination: "/start-a-project?edition=lumen",
        },
      }),
    );

    expect(edition).toMatchObject({
      name: "Lumen",
      numberLabel: "Edition 002",
      statusLabel: "Available Edition",
      startingPrice: "From $3,200",
    });
  });

  it("keeps the deterministic Nocturne fallback public, truthful and complete", () => {
    expect(isNocturneEdition(nocturneEditionFallback)).toBe(true);
    expect(nocturneEditionFallback.demoUrl).toBeNull();
    expect(nocturneEditionFallback.designDna.length).toBeGreaterThanOrEqual(4);
    expect(nocturneEditionFallback.adaptation.systemStays.length).toBeGreaterThanOrEqual(4);
    expect(nocturneEditionFallback.adaptation.brandCanAdapt.length).toBeGreaterThanOrEqual(4);
  });
});

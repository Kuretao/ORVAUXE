import { describe, expect, it } from "vitest";

import type { HomePageQueryResult } from "@/generated/sanity.types";

import { homePageFallback } from "./home-page.fallback";
import { mapHomeMedia, mapHomePage } from "./map-home-page";

const validPage = {
  heroEyebrow: "Studio",
  heroHeading: "Commerce for the distinctive.",
  heroCopy: "Premium Shopify storefronts.",
  heroPrimaryCta: {
    label: "Start a Project",
    destinationKind: "internalPath",
    destination: "/start-a-project",
    analyticsId: "startProject",
  },
  heroSecondaryCta: {
    label: "Explore Editions",
    destinationKind: "internalPath",
    destination: "/editions",
    analyticsId: null,
  },
  heroMedia: null,
  statementHeading: "Built to be desired.",
  serviceIntroduction: "Designed to be bought.",
  editionsHeading: "Editions",
  editionsIntroduction: "Curated storefront systems.",
  editionsPrice: "From $2,490",
  featuredEdition: {
    name: "Nocturne",
    editionNumber: 1,
    category: "Fashion",
    status: "draft",
    intro: "For fashion brands with a cinematic point of view.",
    startingPrice: "From $2,490",
    hero: null,
  },
  atelierHeading: "Atelier",
  atelierIntroduction: "A bespoke engagement.",
  atelierPrice: "Projects from $6,000",
  atelierCapabilities: ["Strategy", "Art direction"],
  atelierCta: {
    label: "Discover Atelier",
    destinationKind: "internalPath",
    destination: "/atelier",
    analyticsId: null,
  },
  studioHeading: "ORVAUXE",
  studioDescriptor: "Commerce Atelier",
  studioOrigin: "Chengdu · Worldwide",
  studioBody: "An independent digital commerce studio.",
  finalCtaEyebrow: "Start a project",
  finalCtaHeading: "Have a brand worth building for?",
  finalCtaBody: "Tell us what you are building.",
  closingCta: {
    label: "Start a Project",
    destinationKind: "internalPath",
    destination: "/start-a-project",
    analyticsId: "startProject",
  },
  seo: {
    metaTitle: "ORVAUXE — Premium Commerce",
    metaDescription: "Premium Shopify storefronts for design-led brands.",
    shareImage: null,
    noIndex: false,
  },
} as const satisfies NonNullable<HomePageQueryResult>;

describe("Home page content mapping", () => {
  it("maps a complete singleton into the vendor-neutral public model", () => {
    const result = mapHomePage(validPage);

    expect(result).toMatchObject({
      contentSource: "sanity",
      hero: {
        heading: "Commerce for the distinctive.",
        primaryCta: { href: "/start-a-project", analyticsId: "startProject" },
      },
      editions: {
        indexHref: "/editions",
        featured: {
          numberLabel: "Edition 001",
          statusLabel: "Concept Edition",
          href: "/editions",
        },
      },
      studio: { descriptor: "Commerce Atelier", origin: "Chengdu · Worldwide" },
    });
  });

  it("rejects incomplete or incorrectly routed production content", () => {
    expect(mapHomePage({ ...validPage, statementHeading: " " })).toBeNull();
    expect(
      mapHomePage({
        ...validPage,
        heroPrimaryCta: { ...validPage.heroPrimaryCta, destination: "/contact" },
      }),
    ).toBeNull();
    expect(
      mapHomePage({
        ...validPage,
        closingCta: { ...validPage.closingCta, analyticsId: "contact" },
      }),
    ).toBeNull();
  });

  it("maps crop, hotspot and accessibility metadata for UI-safe media", () => {
    const result = mapHomeMedia({
      decorative: false,
      alt: "A considered editorial composition",
      caption: "Approved campaign image",
      credit: "ORVAUXE",
      image: {
        asset: { _ref: "image-test-3000x2000-jpg" },
        assetId: "image-test-3000x2000-jpg",
        assetUrl: "https://cdn.sanity.io/images/test/production/test-3000x2000.jpg",
        dimensions: { width: 3000, height: 2000, aspectRatio: 1.5 },
        crop: { top: 0.1, bottom: 0.2, left: 0.2, right: 0.1 },
        hotspot: { x: 0.34, y: 0.52, width: 0.5, height: 0.5 },
      },
    });

    expect(result).toMatchObject({
      alt: "A considered editorial composition",
      decorative: false,
      width: 2100,
      height: 1400,
      objectPosition: "20.00% 60.00%",
    });
  });

  it("keeps all deterministic fallback content in one typed source", () => {
    expect(homePageFallback.contentSource).toBe("fallback");
    expect(homePageFallback.editions.featured).toMatchObject({
      name: "Nocturne",
      statusLabel: "Concept Edition",
      href: "/editions",
    });
    expect(homePageFallback.editorialMedia).toBeNull();
  });
});

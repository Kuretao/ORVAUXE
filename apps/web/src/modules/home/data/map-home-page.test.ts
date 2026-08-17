import { describe, expect, it } from "vitest";

import type { HomePageQueryResult } from "@/generated/sanity.types";

import { homePageFallback } from "./home-page.fallback";
import { mapHomeMedia, mapHomePage } from "./map-home-page";

const validMedia = {
  decorative: false,
  alt: "A Nocturne storefront view",
  caption: null,
  credit: "ORVAUXE",
  image: {
    asset: { _ref: "image-nocturne-1536x1024-webp" },
    assetId: "image-nocturne-1536x1024-webp",
    assetUrl: "https://cdn.sanity.io/images/test/production/nocturne-1536x1024.webp",
    dimensions: { width: 1536, height: 1024, aspectRatio: 1.5 },
    crop: null,
    hotspot: null,
  },
} as const;

const validPage = {
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
  whatWeBuildHeading: "Commerce shaped around the brand.",
  whatWeBuildIntroduction: "Art direction, UX and implementation in one system.",
  whatWeBuildSignals: ["Brand-led UX", "Commerce architecture", "Shopify implementation"],
  editionsHeading: "Editions",
  editionsIntroduction: "Curated storefront systems.",
  featuredEdition: {
    name: "Nocturne",
    slug: "nocturne",
    editionNumber: 1,
    category: "Fashion / Accessories",
    status: "draft",
    startingPrice: "From $2,490",
    intro: "For fashion brands with a cinematic point of view.",
    hero: null,
    storefrontViews: [
      { kind: "home", media: validMedia },
      { kind: "collection", media: validMedia },
      { kind: "product", media: validMedia },
      { kind: "cart", media: validMedia },
      { kind: "editorial", media: validMedia },
      { kind: "mobile", media: validMedia },
    ],
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
  atelierCampaignMedia: null,
  processHeading: "From direction to launch.",
  processSteps: [
    { title: "Direction", description: "Define the direction." },
    { title: "Adaptation", description: "Adapt the system." },
    { title: "Build", description: "Implement the storefront." },
    { title: "Launch", description: "Prepare the launch." },
  ],
  studioHeading: "ORVAUXE",
  studioDescriptor: "Commerce Atelier",
  studioOrigin: "Chengdu · Worldwide",
  studioBody: "An independent commerce atelier.",
  studioMedia: null,
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
          category: "Fashion",
          numberLabel: "Edition 001",
          statusLabel: "Concept Edition",
          startingPrice: "From $2,490",
          platform: "Shopify",
          storefrontViews: expect.arrayContaining([
            expect.objectContaining({ kind: "home" }),
            expect.objectContaining({ kind: "mobile" }),
          ]),
        },
      },
      whatWeBuild: {
        signals: ["Brand-led UX", "Commerce architecture", "Shopify implementation"],
      },
      process: { steps: expect.arrayContaining([expect.objectContaining({ title: "Build" })]) },
      studio: { descriptor: "Commerce Atelier", origin: "Chengdu · Worldwide" },
    });
  });

  it("rejects incomplete or incorrectly routed production content", () => {
    expect(mapHomePage({ ...validPage, statementHeading: " " })).toBeNull();
    expect(
      mapHomePage({
        ...validPage,
        featuredEdition: { ...validPage.featuredEdition, category: "Fashion" },
      }),
    ).toBeNull();
    expect(
      mapHomePage({
        ...validPage,
        heroPrimaryCta: { ...validPage.heroPrimaryCta, destination: "/contact" },
      }),
    ).toBeNull();
    expect(mapHomePage({ ...validPage, whatWeBuildSignals: ["One", "Two"] })).toBeNull();
    expect(mapHomePage({ ...validPage, whatWeBuildSignals: ["One", " One ", "Three"] })).toBeNull();
    expect(
      mapHomePage({ ...validPage, processSteps: validPage.processSteps.slice(0, 3) }),
    ).toBeNull();
    expect(
      mapHomePage({
        ...validPage,
        closingCta: { ...validPage.closingCta, analyticsId: "contact" },
      }),
    ).toBeNull();
  });

  it("rejects incomplete, duplicate or malformed required Edition storefront proof", () => {
    expect(
      mapHomePage({
        ...validPage,
        featuredEdition: { ...validPage.featuredEdition, startingPrice: " " },
      }),
    ).toBeNull();
    expect(
      mapHomePage({
        ...validPage,
        featuredEdition: {
          ...validPage.featuredEdition,
          storefrontViews: validPage.featuredEdition.storefrontViews.filter(
            (view) => view.kind !== "mobile",
          ),
        },
      }),
    ).toBeNull();
    expect(
      mapHomePage({
        ...validPage,
        featuredEdition: {
          ...validPage.featuredEdition,
          storefrontViews: [
            ...validPage.featuredEdition.storefrontViews.slice(0, 5),
            { kind: "home", media: validMedia },
          ],
        },
      }),
    ).toBeNull();
    expect(
      mapHomePage({
        ...validPage,
        featuredEdition: {
          ...validPage.featuredEdition,
          storefrontViews: validPage.featuredEdition.storefrontViews.map((view) =>
            view.kind === "product" ? { ...view, media: { ...validMedia, alt: " " } } : view,
          ),
        },
      }),
    ).toBeNull();
  });

  it("rejects an Edition that violates the constrained Nocturne product-story identity", () => {
    for (const featuredEdition of [
      { ...validPage.featuredEdition, name: "Aperture" },
      { ...validPage.featuredEdition, slug: "aperture" },
      { ...validPage.featuredEdition, editionNumber: 2 },
      { ...validPage.featuredEdition, category: "Fashion" },
      { ...validPage.featuredEdition, status: "available" as const },
    ]) {
      expect(mapHomePage({ ...validPage, featuredEdition })).toBeNull();
    }
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
      startingPrice: "From $2,490",
      platform: "Shopify",
    });
    expect(homePageFallback.editions.featured.storefrontViews).toHaveLength(6);
    expect(
      new Set(homePageFallback.editions.featured.storefrontViews.map(({ kind }) => kind)).size,
    ).toBe(6);
    expect(homePageFallback.heroMedia).toBeNull();
    expect(homePageFallback.atelier.media).toBeNull();
    expect(homePageFallback.studio.media).toBeNull();
  });
});

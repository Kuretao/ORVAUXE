import type { HomePageData } from "../model/home-page";

export const homePageFallback = {
  contentSource: "fallback",
  hero: {
    heading: "Commerce for the distinctive.",
    copy: "Premium Shopify storefronts for fashion, jewelry and design-led brands.",
    primaryCta: {
      label: "Start a Project",
      href: "/start-a-project",
      analyticsId: "startProject",
    },
    secondaryCta: {
      label: "Explore Editions",
      href: "/editions",
      analyticsId: null,
    },
  },
  heroMedia: null,
  statement: {
    heading: "Built to be desired. Designed to be bought.",
    body: "ORVAUXE treats brand expression and commerce usability as one system—so the storefront feels distinctive and remains clear to use.",
  },
  editions: {
    heading: "Editions",
    introduction:
      "Curated premium storefront systems, adapted to each brand and prepared for a considered launch.",
    price: "From $2,490",
    indexHref: "/editions",
    featured: {
      numberLabel: "Edition 001",
      name: "Nocturne",
      statusLabel: "Concept Edition",
      category: "Fashion",
      copy: "For fashion brands with a cinematic point of view.",
      media: null,
    },
  },
  atelier: {
    heading: "Atelier",
    introduction:
      "For brands requiring something entirely their own. Semi-custom and bespoke commerce strategy, design and development.",
    price: "Projects from $6,000",
    capabilities: [
      "Strategy",
      "Art direction",
      "UX / UI",
      "Commerce development",
      "Integrations",
      "Launch",
    ],
    cta: {
      label: "Discover Atelier",
      href: "/atelier",
      analyticsId: null,
    },
    media: null,
  },
  studio: {
    heading: "ORVAUXE",
    descriptor: "Commerce Atelier",
    origin: "Chengdu · Worldwide",
    body: "An independent commerce atelier for brands that refuse to look interchangeable.",
  },
  finalCta: {
    eyebrow: "START A PROJECT",
    heading: "Have a brand worth building for?",
    body: "Tell us what you are building, where the storefront is today and what the next stage needs to accomplish.",
    cta: {
      label: "Start a Project",
      href: "/start-a-project",
      analyticsId: "startProject",
    },
  },
  seo: {
    title: "ORVAUXE — Premium Commerce for Fashion & Design-Led Brands",
    description:
      "ORVAUXE creates premium Shopify storefronts for fashion, jewelry and design-led brands worldwide, combining brand expression with commerce usability.",
    shareImage: null,
    noIndex: false,
  },
} as const satisfies HomePageData;

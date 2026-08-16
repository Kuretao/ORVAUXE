import type { HomeMedia, HomePageData } from "../model/home-page";

const nocturneCampaignMedia = {
  src: "/media/home-campaign-nocturne-temporary.webp",
  alt: "Dark sculptural fabric study for Nocturne.",
  decorative: false,
  width: 1536,
  height: 1024,
  objectPosition: "50% 50%",
  caption: null,
  credit: "ORVAUXE original concept imagery",
} as const satisfies HomeMedia;

const nocturneProductMedia = {
  src: "/media/editions/nocturne/nocturne-product-study-temporary.webp",
  alt: "Black tailored garment presented as a Nocturne product study.",
  decorative: false,
  width: 1536,
  height: 1024,
  objectPosition: "50% 50%",
  caption: null,
  credit: "ORVAUXE original concept imagery",
} as const satisfies HomeMedia;

const nocturneDetailMedia = {
  src: "/media/editions/nocturne/nocturne-detail-study-temporary.webp",
  alt: "Close material detail from the Nocturne concept study.",
  decorative: false,
  width: 1536,
  height: 1024,
  objectPosition: "50% 50%",
  caption: null,
  credit: "ORVAUXE original concept imagery",
} as const satisfies HomeMedia;

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
  whatWeBuild: {
    heading: "Commerce shaped around the brand.",
    introduction:
      "ORVAUXE combines art direction, UX and Shopify implementation into one storefront system.",
    signals: ["Brand-led UX", "Commerce architecture", "Shopify implementation"],
  },
  editions: {
    heading: "Editions",
    introduction:
      "Curated premium storefront systems, adapted to each brand and prepared for a considered launch.",
    indexHref: "/editions",
    featured: {
      numberLabel: "Edition 001",
      name: "Nocturne",
      statusLabel: "Concept Edition",
      category: "Fashion",
      copy: "For fashion brands with a cinematic point of view.",
      startingPrice: "From $2,490",
      platform: "Shopify",
      media: null,
      storefrontViews: [
        { kind: "home", media: nocturneCampaignMedia },
        { kind: "collection", media: nocturneProductMedia },
        { kind: "product", media: nocturneProductMedia },
        { kind: "cart", media: nocturneDetailMedia },
        { kind: "editorial", media: nocturneDetailMedia },
        { kind: "mobile", media: nocturneProductMedia },
      ],
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
  process: {
    heading: "From direction to launch.",
    steps: [
      {
        title: "Direction",
        description: "Define the visual and commercial direction.",
      },
      {
        title: "Adaptation",
        description: "Adapt the selected system around the brand.",
      },
      {
        title: "Build",
        description: "Implement the storefront in Shopify.",
      },
      {
        title: "Launch",
        description: "Prepare the storefront for a considered launch.",
      },
    ],
  },
  studio: {
    heading: "ORVAUXE",
    descriptor: "Commerce Atelier",
    origin: "Chengdu · Worldwide",
    body: "An independent commerce atelier for brands that refuse to look interchangeable.",
    media: null,
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

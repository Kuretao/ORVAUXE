import type { Edition, EditionMedia } from "../model/edition";
import { editionIncludedExperiences, editionMarketScope } from "../model/edition";

const nocturneCampaignMedia = {
  src: "/media/home-campaign-nocturne-temporary.webp",
  alt: "Dark sculptural fabric study for the Nocturne campaign.",
  decorative: false,
  width: 1536,
  height: 1024,
  objectPosition: "50% 50%",
  caption: null,
  credit: "ORVAUXE original concept imagery",
} as const satisfies EditionMedia;

const nocturneProductMedia = {
  src: "/media/editions/nocturne/nocturne-product-study-temporary.webp",
  alt: "Black tailored garment presented in the Nocturne product system.",
  decorative: false,
  width: 1536,
  height: 1024,
  objectPosition: "50% 50%",
  caption: null,
  credit: "ORVAUXE original concept imagery",
} as const satisfies EditionMedia;

const nocturneDetailMedia = {
  src: "/media/editions/nocturne/nocturne-detail-study-temporary.webp",
  alt: "Close material study from the Nocturne product world.",
  decorative: false,
  width: 1536,
  height: 1024,
  objectPosition: "50% 50%",
  caption: null,
  credit: "ORVAUXE original concept imagery",
} as const satisfies EditionMedia;

export const nocturneEditionFallback = {
  id: "edition-001-nocturne",
  name: "Nocturne",
  slug: "nocturne",
  editionNumber: 1,
  numberLabel: "Edition 001",
  category: "Fashion / Accessories",
  status: "draft",
  statusLabel: "Concept Edition",
  originLabel: "ORVAUXE Original",
  intro:
    "A cinematic Shopify storefront system for fashion and accessories, built around editorial pacing, precise merchandising and premium mobile commerce.",
  startingPrice: "From $2,490",
  deliveryTarget: "7–10 business days from Ready to Build",
  platform: "Shopify",
  heroMedia: nocturneCampaignMedia,
  gallery: [nocturneProductMedia, nocturneDetailMedia],
  storefrontViews: [
    { kind: "home", media: nocturneCampaignMedia },
    { kind: "collection", media: nocturneProductMedia },
    { kind: "product", media: nocturneProductMedia },
    { kind: "cart", media: nocturneDetailMedia },
    { kind: "editorial", media: nocturneDetailMedia },
    { kind: "mobile", media: nocturneProductMedia },
  ],
  includedExperiences: editionIncludedExperiences,
  technicalFoundation: [
    "Native responsive Shopify theme",
    "JSON templates with constrained sections and blocks",
    "Native product and cart flows",
    "Theme Editor-compatible content controls",
    "Baseline accessibility and technical SEO",
    "Responsive images and performance-oriented implementation",
  ],
  designDna: [
    "Cinematic campaign hierarchy",
    "Fashion-editorial pacing",
    "Dark materiality",
    "High typography contrast",
    "Precise product merchandising",
    "Restrained interaction",
    "Structured responsive grid",
    "Premium mobile commerce",
  ],
  adaptation: {
    systemStays: [
      "Underlying layout logic",
      "Editorial pacing",
      "Hero and campaign hierarchy",
      "Collection merchandising philosophy",
      "Product-page structure",
      "Typography scale relationships",
      "Transition language",
      "Responsive grid and mobile philosophy",
    ],
    brandCanAdapt: [
      "Approved logo",
      "Brand color system",
      "Approved, licensed typography",
      "Photography and product imagery",
      "Supplied copy and brand information",
      "Product and collection data",
      "Selected theme settings",
      "Merchandising and content arrangement within approved boundaries",
    ],
  },
  revisionRounds: 2,
  marketScope: editionMarketScope,
  defectCorrectionDays: 14,
  demoUrl: null,
  cta: {
    label: "Start with Nocturne",
    href: "/start-a-project?edition=nocturne",
  },
  seo: {
    title: "Nocturne — Fashion Shopify Edition | ORVAUXE",
    description:
      "Explore Nocturne, an ORVAUXE concept Edition for fashion and accessories on Shopify, presented for controlled brand adaptation.",
    shareImage: nocturneCampaignMedia,
    noIndex: false,
  },
} as const satisfies Edition;

export const e2eEdition = {
  ...nocturneEditionFallback,
  id: "e2e-edition",
  name: "E2E Edition",
  slug: "e2e-edition",
  editionNumber: 999,
  numberLabel: "Edition 999",
  category: "Test fixture",
  intro: "Deterministic Edition fixture for end-to-end route coverage.",
  cta: {
    label: "Start a Project",
    href: "/start-a-project?edition=e2e-edition",
  },
  seo: {
    ...nocturneEditionFallback.seo,
    title: "E2E Edition | ORVAUXE",
    description: "Deterministic Edition fixture for end-to-end route coverage.",
    noIndex: true,
  },
} as const satisfies Edition;

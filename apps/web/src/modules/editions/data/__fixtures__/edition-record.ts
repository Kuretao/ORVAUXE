import type { EditionQueryResult } from "@/generated/sanity.types";

type EditionRecord = NonNullable<EditionQueryResult>;
type EditionMediaRecord = NonNullable<EditionRecord["hero"]>;

export const editionMediaRecord = {
  decorative: false,
  alt: "Nocturne garment study.",
  caption: null,
  credit: "ORVAUXE original concept imagery",
  image: {
    asset: { _ref: "image-nocturne-1536x1024-webp" },
    assetId: "image-nocturne-1536x1024-webp",
    assetUrl: "https://cdn.sanity.io/images/aaaaaaaa/production/nocturne.webp",
    dimensions: { width: 1536, height: 1024, aspectRatio: 1.5 },
    crop: null,
    hotspot: null,
  },
} as const satisfies EditionMediaRecord;

export function createEditionRecord(overrides: Partial<EditionRecord> = {}): EditionRecord {
  return {
    id: "edition-001-nocturne",
    name: "Nocturne",
    slug: "nocturne",
    editionNumber: 1,
    category: "Fashion / Accessories",
    status: "draft",
    intro:
      "A cinematic Shopify storefront system for fashion and accessories, shaped around editorial pacing.",
    hero: editionMediaRecord,
    gallery: [editionMediaRecord],
    storefrontViews: [
      { kind: "home", media: editionMediaRecord },
      { kind: "collection", media: editionMediaRecord },
      { kind: "product", media: editionMediaRecord },
      { kind: "cart", media: editionMediaRecord },
      { kind: "editorial", media: editionMediaRecord },
      { kind: "mobile", media: editionMediaRecord },
    ],
    features: [
      "Native responsive Shopify theme",
      "JSON templates with constrained sections and blocks",
    ],
    startingPrice: "From $2,490",
    launchEstimate: "7–10 business days from Ready to Build",
    demoUrl: null,
    designDna: [
      "Cinematic campaign hierarchy",
      "Fashion-editorial pacing",
      "Precise product merchandising",
      "Premium mobile commerce",
    ],
    systemStays: [
      "Underlying layout logic",
      "Editorial pacing",
      "Product-page structure",
      "Responsive grid and mobile philosophy",
    ],
    brandCanAdapt: [
      "Approved logo",
      "Brand color system",
      "Approved, licensed typography",
      "Photography and product imagery",
    ],
    cta: {
      label: "Start with Nocturne",
      destinationKind: "internalPath",
      destination: "/start-a-project?edition=nocturne",
    },
    seo: {
      metaTitle: "Nocturne — Fashion Shopify Edition | ORVAUXE",
      metaDescription:
        "Explore Nocturne, an ORVAUXE concept Edition for fashion and accessories on Shopify.",
      shareImage: editionMediaRecord,
      noIndex: false,
    },
    ...overrides,
  };
}

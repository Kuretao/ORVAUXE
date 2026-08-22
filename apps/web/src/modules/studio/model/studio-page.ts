export interface StudioPage {
  readonly contentSource: "fallback" | "sanity";
  readonly heroHeading: string;
  readonly heroCopy: string;
  readonly pointOfView: string;
  readonly origin: string;
  readonly operatingModel: string;
  readonly trustContent: string;
  readonly contactCta: { label: string; href: "/start-a-project" };
  readonly seo: {
    readonly metaTitle: string;
    readonly metaDescription: string;
    readonly shareImageUrl: string | null;
    readonly noIndex: boolean;
  };
}

export const studioPageFallback = {
  contentSource: "fallback",
  heroHeading: "Independent commerce atelier for distinctive brands.",
  heroCopy:
    "ORVAUXE works from Chengdu with brands worldwide, bringing art direction, commerce thinking and implementation into one quiet operating system.",
  pointOfView:
    "The storefront should carry the same conviction as the product. Brand expression and purchase clarity are treated as one design problem, not competing layers.",
  origin:
    "Chengdu · Worldwide. A grounded base for independent work, with collaboration structured around the brand, its market and the people who operate the storefront.",
  operatingModel:
    "Editions provide a directed foundation for controlled adaptation. Atelier creates a new system when the brief requires custom architecture, logic or integration depth.",
  trustContent:
    "Selected commerce experience includes custom storefront engineering across Next.js and Laravel, checkout and order flows, payment handling and fiscal commerce integration.",
  contactCta: { label: "Start a Project", href: "/start-a-project" },
  seo: {
    metaTitle: "Studio — Independent Commerce Atelier | ORVAUXE",
    metaDescription:
      "Meet ORVAUXE, an independent commerce atelier in Chengdu working worldwide across Editions, bespoke storefronts and commerce engineering.",
    shareImageUrl: "/media/studio/studio-architecture-study-temporary.webp",
    noIndex: false,
  },
} as const satisfies StudioPage;

export type HomeContentSource = "fallback" | "sanity";
export type HomeAnalyticsId = "contact" | "startProject";

export interface HomeCta {
  readonly label: string;
  readonly href: string;
  readonly analyticsId: HomeAnalyticsId | null;
}

export interface HomeMedia {
  readonly src: string;
  readonly alt: string;
  readonly decorative: boolean;
  readonly width: number;
  readonly height: number;
  readonly objectPosition: string;
  readonly caption: string | null;
  readonly credit: string | null;
}

export type StorefrontViewKind =
  "home" | "collection" | "product" | "cart" | "editorial" | "mobile";

export interface HomeStorefrontView {
  readonly kind: StorefrontViewKind;
  readonly media: HomeMedia;
}

export interface FeaturedHomeEdition {
  readonly numberLabel: "Edition 001";
  readonly name: "Nocturne";
  readonly statusLabel: "Concept Edition";
  readonly category: "Fashion";
  readonly copy: string;
  readonly startingPrice: string;
  readonly platform: "Shopify";
  readonly media: HomeMedia | null;
  readonly storefrontViews: readonly HomeStorefrontView[];
}

export interface HomeProcessStep {
  readonly title: string;
  readonly description: string;
}

export interface HomePageData {
  readonly contentSource: HomeContentSource;
  readonly hero: {
    readonly heading: string;
    readonly copy: string;
    readonly primaryCta: HomeCta;
    readonly secondaryCta: HomeCta;
  };
  readonly heroMedia: HomeMedia | null;
  readonly statement: {
    readonly heading: string;
    readonly body: string;
  };
  readonly whatWeBuild: {
    readonly heading: string;
    readonly introduction: string;
    readonly signals: readonly string[];
  };
  readonly editions: {
    readonly heading: string;
    readonly introduction: string;
    readonly indexHref: "/editions";
    readonly featured: FeaturedHomeEdition;
  };
  readonly atelier: {
    readonly heading: string;
    readonly introduction: string;
    readonly price: string;
    readonly capabilities: readonly string[];
    readonly cta: HomeCta;
    readonly media: HomeMedia | null;
  };
  readonly process: {
    readonly heading: string;
    readonly steps: readonly HomeProcessStep[];
  };
  readonly studio: {
    readonly heading: string;
    readonly descriptor: string;
    readonly origin: string;
    readonly body: string;
    readonly media: HomeMedia | null;
  };
  readonly finalCta: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly body: string;
    readonly cta: HomeCta;
  };
  readonly seo: {
    readonly title: string;
    readonly description: string;
    readonly shareImage: HomeMedia | null;
    readonly noIndex: boolean;
  };
}

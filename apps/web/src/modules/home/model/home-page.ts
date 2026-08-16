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

export interface FeaturedHomeEdition {
  readonly numberLabel: string;
  readonly name: string;
  readonly statusLabel: string;
  readonly category: string;
  readonly copy: string;
  readonly price: string;
  readonly href: "/editions";
  readonly media: HomeMedia | null;
}

export interface HomePageData {
  readonly contentSource: HomeContentSource;
  readonly hero: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly copy: string;
    readonly primaryCta: HomeCta;
    readonly secondaryCta: HomeCta;
  };
  readonly editorialMedia: HomeMedia | null;
  readonly statement: {
    readonly heading: string;
    readonly body: string;
  };
  readonly editions: {
    readonly heading: string;
    readonly introduction: string;
    readonly price: string;
    readonly indexHref: "/editions";
    readonly featured: FeaturedHomeEdition;
  };
  readonly atelier: {
    readonly heading: string;
    readonly introduction: string;
    readonly price: string;
    readonly capabilities: readonly string[];
    readonly cta: HomeCta;
  };
  readonly studio: {
    readonly heading: string;
    readonly descriptor: string;
    readonly origin: string;
    readonly body: string;
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

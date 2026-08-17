export const storefrontViewKinds = [
  "home",
  "collection",
  "product",
  "cart",
  "editorial",
  "mobile",
] as const;

export const requiredStorefrontViewKinds = ["home", "collection", "product", "mobile"] as const;

export const editionIncludedExperiences = [
  "Home",
  "Collection",
  "Product",
  "Cart",
  "Editorial / About",
  "Intentional mobile experience",
] as const;

export const editionMarketScope = [
  "One primary language",
  "One initial market configuration",
  "One core currency / store setup",
] as const;

export type EditionStatus = "available" | "draft" | "retired";
export type StorefrontViewKind = (typeof storefrontViewKinds)[number];

export interface EditionMedia {
  readonly src: string;
  readonly alt: string;
  readonly decorative: boolean;
  readonly width: number;
  readonly height: number;
  readonly objectPosition: string;
  readonly caption: string | null;
  readonly credit: string | null;
}

export interface EditionStorefrontView {
  readonly kind: StorefrontViewKind;
  readonly media: EditionMedia;
}

export interface EditionCta {
  readonly label: string;
  readonly href: string;
}

export interface EditionSeo {
  readonly title: string;
  readonly description: string;
  readonly shareImage: EditionMedia | null;
  readonly noIndex: boolean;
}

export interface Edition {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly editionNumber: number;
  readonly numberLabel: string;
  readonly category: string;
  readonly status: EditionStatus;
  readonly statusLabel: string;
  readonly originLabel: "ORVAUXE Original";
  readonly intro: string;
  readonly startingPrice: string;
  readonly deliveryTarget: string;
  readonly platform: "Shopify";
  readonly heroMedia: EditionMedia;
  readonly gallery: readonly EditionMedia[];
  readonly storefrontViews: readonly EditionStorefrontView[];
  readonly includedExperiences: typeof editionIncludedExperiences;
  readonly technicalFoundation: readonly string[];
  readonly designDna: readonly string[];
  readonly adaptation: {
    readonly systemStays: readonly string[];
    readonly brandCanAdapt: readonly string[];
  };
  readonly revisionRounds: 2;
  readonly marketScope: typeof editionMarketScope;
  readonly defectCorrectionDays: 14;
  readonly demoUrl: string | null;
  readonly cta: EditionCta;
  readonly seo: EditionSeo;
}

export function getEditionStatusLabel(status: EditionStatus): string {
  switch (status) {
    case "draft":
      return "Concept Edition";
    case "available":
      return "Available Edition";
    case "retired":
      return "Retired Edition";
  }
}

export function isPublicEditionStatus(
  status: EditionStatus | null | undefined,
): status is Exclude<EditionStatus, "retired"> {
  return status === "draft" || status === "available";
}

export function isNocturneEdition(edition: Edition): boolean {
  return (
    edition.name === "Nocturne" &&
    edition.slug === "nocturne" &&
    edition.editionNumber === 1 &&
    edition.category === "Fashion / Accessories" &&
    edition.status === "draft" &&
    edition.statusLabel === "Concept Edition" &&
    edition.originLabel === "ORVAUXE Original" &&
    edition.startingPrice === "From $2,490" &&
    edition.deliveryTarget === "7–10 business days from Ready to Build" &&
    edition.platform === "Shopify" &&
    edition.cta.href === "/start-a-project?edition=nocturne" &&
    edition.seo.noIndex === false
  );
}

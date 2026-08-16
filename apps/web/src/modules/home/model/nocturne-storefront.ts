import type { StorefrontViewKind } from "./home-page";

export interface NocturneStorefrontStage {
  readonly description: string;
  readonly index: string;
  readonly kind: StorefrontViewKind;
  readonly label: string;
}

export const nocturneStorefrontStages = [
  {
    kind: "home",
    index: "01",
    label: "Home",
    description: "Campaign-led entry.",
  },
  {
    kind: "collection",
    index: "02",
    label: "Collection",
    description: "Editorial merchandising.",
  },
  {
    kind: "product",
    index: "03",
    label: "Product",
    description: "Clear product storytelling.",
  },
  {
    kind: "cart",
    index: "04",
    label: "Cart",
    description: "A focused purchase flow.",
  },
  {
    kind: "editorial",
    index: "05",
    label: "Editorial",
    description: "Content without breaking commerce.",
  },
  {
    kind: "mobile",
    index: "06",
    label: "Mobile",
    description: "Designed as a primary experience.",
  },
] as const satisfies readonly NocturneStorefrontStage[];

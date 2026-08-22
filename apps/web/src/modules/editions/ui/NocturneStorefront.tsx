import Image from "next/image";

import type { EditionMedia, EditionStorefrontView, StorefrontViewKind } from "../model/edition";
import styles from "./NocturneStorefront.module.css";

export interface NocturneStorefrontSource {
  readonly heroMedia?: EditionMedia | null;
  readonly media?: EditionMedia | null;
  readonly name: string;
  readonly numberLabel: string;
  readonly originLabel?: string;
  readonly statusLabel: string;
  readonly storefrontViews: readonly EditionStorefrontView[];
}

export interface NocturneStorefrontProps {
  readonly context?: "homepage-v1-2";
  readonly edition: NocturneStorefrontSource;
  readonly kind: StorefrontViewKind;
  readonly mediaOverride?: EditionMedia;
  readonly mobileSizes?: string;
  readonly showCaption?: boolean;
  readonly sizes: string;
  readonly viewport?: "desktop" | "mobile";
}

export interface NocturneStorefrontStage {
  readonly description: string;
  readonly index: string;
  readonly kind: StorefrontViewKind;
  readonly label: string;
}

export const nocturneStorefrontStages = [
  { kind: "home", index: "01", label: "Home", description: "Campaign-led entry." },
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
  { kind: "cart", index: "04", label: "Cart", description: "A focused purchase flow." },
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

const fallbackKindOrder = {
  cart: ["product", "collection", "home", "mobile", "editorial"],
  collection: ["home", "product", "mobile", "editorial", "cart"],
  editorial: ["home", "product", "collection", "mobile", "cart"],
  home: ["collection", "product", "mobile", "editorial", "cart"],
  mobile: ["product", "home", "collection", "editorial", "cart"],
  product: ["collection", "home", "mobile", "editorial", "cart"],
} as const satisfies Record<StorefrontViewKind, readonly StorefrontViewKind[]>;

function mediaFor(edition: NocturneStorefrontSource, kind: StorefrontViewKind) {
  const direct = edition.storefrontViews.find((view) => view.kind === kind)?.media;
  if (direct) return direct;

  for (const fallbackKind of fallbackKindOrder[kind]) {
    const fallback = edition.storefrontViews.find((view) => view.kind === fallbackKind)?.media;
    if (fallback) return fallback;
  }

  return edition.heroMedia ?? edition.media ?? null;
}

function publicStatus(edition: NocturneStorefrontSource) {
  if (edition.originLabel) return `${edition.originLabel} · ${edition.statusLabel}`;

  return edition.statusLabel === "Concept Edition"
    ? `ORVAUXE Original · ${edition.statusLabel}`
    : edition.statusLabel;
}

export function NocturneStorefront({
  context,
  edition,
  kind,
  mediaOverride,
  mobileSizes,
  showCaption = true,
  sizes,
  viewport,
}: NocturneStorefrontProps) {
  const media = mediaOverride ?? mediaFor(edition, kind);
  const stage = nocturneStorefrontStages.find((item) => item.kind === kind);
  const viewportMode = viewport ?? (kind === "mobile" ? "mobile" : "desktop");
  const responsiveSizes = viewportMode === "mobile" ? (mobileSizes ?? sizes) : sizes;

  return (
    <figure
      className={styles.figure}
      data-proof-source="shopify-theme-capture"
      data-storefront-context={context}
      data-storefront-view={kind}
      data-storefront-viewport-mode={viewportMode}
    >
      <div className={styles.viewport} data-storefront-viewport>
        {media ? (
          <Image
            alt={media.decorative ? "" : media.alt}
            className={styles.proofImage}
            height={media.height}
            loading="lazy"
            sizes={responsiveSizes}
            src={media.src}
            style={{ objectPosition: media.objectPosition }}
            width={media.width}
          />
        ) : (
          <span aria-hidden="true" className={styles.imageFallback} />
        )}
      </div>
      {showCaption ? (
        <figcaption className={styles.caption} data-storefront-caption>
          <span>
            {stage?.index} / {stage?.label} · Theme capture
          </span>
          <span>{publicStatus(edition)}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

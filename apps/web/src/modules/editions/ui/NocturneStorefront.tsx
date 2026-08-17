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
  readonly mobileSizes?: string;
  readonly showCaption?: boolean;
  readonly sizes: string;
}

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

const collectionImageSizes =
  "(min-width: 96rem) 20rem, (min-width: 64rem) 21vw, (min-width: 48rem) 23vw, 30vw";
const cartThumbnailSizes =
  "(min-width: 96rem) 8rem, (min-width: 64rem) 9vw, (min-width: 48rem) 12vw, 16vw";
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
  if (edition.originLabel) {
    return `${edition.originLabel} · ${edition.statusLabel}`;
  }

  return edition.statusLabel === "Concept Edition"
    ? `ORVAUXE Original · ${edition.statusLabel}`
    : edition.statusLabel;
}

function StorefrontImage({
  className,
  edition,
  kind,
  sizes,
}: {
  readonly className?: string;
  readonly edition: NocturneStorefrontSource;
  readonly kind: StorefrontViewKind;
  readonly sizes: string;
}) {
  const media = mediaFor(edition, kind);
  if (!media) return <span aria-hidden="true" className={styles.imageFallback} />;

  return (
    <Image
      alt=""
      className={[styles.image, className].filter(Boolean).join(" ")}
      height={media.height}
      loading="lazy"
      sizes={sizes}
      src={media.src}
      style={{ objectPosition: media.objectPosition }}
      width={media.width}
    />
  );
}

function StorefrontHeader({
  compact = false,
  name,
}: {
  readonly compact?: boolean;
  readonly name: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={styles.header}
      data-compact={compact || undefined}
      data-storefront-header
    >
      <span>{name}</span>
      <span>{compact ? "Menu" : "Collection / Editorial / Bag 0"}</span>
    </div>
  );
}

function HomeView({ edition, sizes }: Pick<NocturneStorefrontProps, "edition" | "sizes">) {
  return (
    <div className={styles.home}>
      <StorefrontImage edition={edition} kind="home" sizes={sizes} />
      <StorefrontHeader name={edition.name} />
      <div aria-hidden="true" className={styles.homeCopy}>
        <span>{edition.numberLabel} / ORVAUXE Original</span>
        <strong>Form after dark</strong>
        <span>Explore the collection →</span>
      </div>
    </div>
  );
}

function CollectionView({ edition }: Pick<NocturneStorefrontProps, "edition">) {
  return (
    <div className={styles.collection}>
      <StorefrontHeader name={edition.name} />
      <div aria-hidden="true" className={styles.sectionTitle}>
        <span>Collection 01</span>
        <strong>Nocturne objects</strong>
        <span>03 studies</span>
      </div>
      <div className={styles.productGrid}>
        {(["collection", "product", "editorial"] as const).map((kind, index) => (
          <div className={styles.product} key={kind}>
            <div className={styles.productImage}>
              <StorefrontImage edition={edition} kind={kind} sizes={collectionImageSizes} />
            </div>
            <div aria-hidden="true" className={styles.productLabel}>
              <span>Form {String(index + 1).padStart(2, "0")}</span>
              <span>Study</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductView({ edition, sizes }: Pick<NocturneStorefrontProps, "edition" | "sizes">) {
  return (
    <div className={styles.productPage}>
      <StorefrontHeader name={edition.name} />
      <div className={styles.productHero}>
        <StorefrontImage edition={edition} kind="product" sizes={sizes} />
      </div>
      <div aria-hidden="true" className={styles.productDetails}>
        <span>Nocturne / Form 01</span>
        <strong>Sculpted in shadow.</strong>
        <p>Black silk structure, brushed hardware and a restrained oxblood detail.</p>
        <span className={styles.rule}>Select / 01 02 03</span>
        <span className={styles.action}>Add to bag</span>
      </div>
    </div>
  );
}

function CartView({ edition, sizes }: Pick<NocturneStorefrontProps, "edition" | "sizes">) {
  return (
    <div className={styles.cart}>
      <div className={styles.cartBackdrop}>
        <StorefrontImage edition={edition} kind="home" sizes={sizes} />
        <StorefrontHeader name={edition.name} />
      </div>
      <div aria-hidden="true" className={styles.cartSheet}>
        <div className={styles.cartTitle}>
          <strong>Bag</strong>
          <span>01 item</span>
        </div>
        <div className={styles.cartItem}>
          <div className={styles.cartThumb}>
            <StorefrontImage edition={edition} kind="cart" sizes={cartThumbnailSizes} />
          </div>
          <div>
            <strong>Form 01</strong>
            <span>Black / 01</span>
            <span>Quantity 1</span>
          </div>
        </div>
        <span className={styles.action}>Review order</span>
      </div>
    </div>
  );
}

function EditorialView({ edition, sizes }: Pick<NocturneStorefrontProps, "edition" | "sizes">) {
  return (
    <div className={styles.editorial}>
      <StorefrontImage edition={edition} kind="editorial" sizes={sizes} />
      <StorefrontHeader name={edition.name} />
      <div aria-hidden="true" className={styles.editorialCopy}>
        <span>Nocturne notes / 01</span>
        <strong>
          Night.
          <br />
          Structure.
          <br />
          Movement.
        </strong>
      </div>
    </div>
  );
}

function MobileView({ edition, sizes }: Pick<NocturneStorefrontProps, "edition" | "sizes">) {
  return (
    <div className={styles.mobileShell}>
      <div className={styles.mobile} data-storefront-mobile>
        <div className={styles.mobileImage}>
          <StorefrontImage edition={edition} kind="mobile" sizes={sizes} />
        </div>
        <StorefrontHeader compact name={edition.name} />
        <div aria-hidden="true" className={styles.mobileCopy}>
          <span>{edition.numberLabel}</span>
          <strong>{edition.name}</strong>
          <span>Shop the study →</span>
        </div>
      </div>
    </div>
  );
}

const storefrontViews = {
  cart: CartView,
  collection: CollectionView,
  editorial: EditorialView,
  home: HomeView,
  mobile: MobileView,
  product: ProductView,
} satisfies Record<StorefrontViewKind, typeof HomeView>;

export function NocturneStorefront({
  context,
  edition,
  kind,
  mobileSizes,
  showCaption = true,
  sizes,
}: NocturneStorefrontProps) {
  const View = storefrontViews[kind];
  const stage = nocturneStorefrontStages.find((item) => item.kind === kind);
  const responsiveSizes = kind === "mobile" ? (mobileSizes ?? sizes) : sizes;

  return (
    <figure className={styles.figure} data-storefront-context={context} data-storefront-view={kind}>
      <div
        aria-label={`${edition.name} storefront preview, ${stage?.label.toLowerCase()} view.`}
        className={styles.viewport}
        data-storefront-viewport
        role="img"
      >
        <View edition={edition} sizes={responsiveSizes} />
      </div>
      {showCaption ? (
        <figcaption className={styles.caption} data-storefront-caption>
          <span>
            {stage?.index} / {stage?.label}
          </span>
          <span>{publicStatus(edition)}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

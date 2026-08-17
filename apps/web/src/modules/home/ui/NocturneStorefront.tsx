import Image from "next/image";

import type { StorefrontViewKind } from "../model/home-page";
import type { HomePageData } from "../model/home-page";
import { nocturneStorefrontStages } from "../model/nocturne-storefront";
import styles from "./HomeProductStory.module.css";

interface NocturneStorefrontProps {
  edition: HomePageData["editions"]["featured"];
  kind: StorefrontViewKind;
  mobileSizes?: string;
  sizes: string;
  showCaption?: boolean;
}

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

function mediaFor(edition: HomePageData["editions"]["featured"], kind: StorefrontViewKind) {
  const direct = edition.storefrontViews.find((view) => view.kind === kind)?.media;
  if (direct) return direct;

  for (const fallbackKind of fallbackKindOrder[kind]) {
    const fallback = edition.storefrontViews.find((view) => view.kind === fallbackKind)?.media;
    if (fallback) return fallback;
  }

  return edition.media;
}

function StorefrontImage({
  alt,
  className,
  edition,
  kind,
  sizes,
}: {
  alt?: string;
  className?: string;
  edition: HomePageData["editions"]["featured"];
  kind: StorefrontViewKind;
  sizes: string;
}) {
  const media = mediaFor(edition, kind);
  if (!media) return <span aria-hidden="true" className={styles.storefrontImageFallback} />;

  return (
    <Image
      alt={alt ?? media.alt}
      className={[styles.storefrontImage, className].filter(Boolean).join(" ")}
      height={media.height}
      loading="lazy"
      sizes={sizes}
      src={media.src}
      style={{ objectPosition: media.objectPosition }}
      width={media.width}
    />
  );
}

function StorefrontHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={styles.storefrontHeader}
      data-compact={compact || undefined}
      data-storefront-header
    >
      <span>NOCTURNE</span>
      <span>{compact ? "MENU" : "COLLECTION / EDITORIAL / BAG 0"}</span>
    </div>
  );
}

function HomeView({ edition, sizes }: Pick<NocturneStorefrontProps, "edition" | "sizes">) {
  return (
    <div className={styles.storefrontHome}>
      <StorefrontImage edition={edition} kind="home" sizes={sizes} />
      <StorefrontHeader />
      <div aria-hidden="true" className={styles.storefrontHomeCopy}>
        <span>EDITION 001 / ORVAUXE ORIGINAL</span>
        <strong>FORM AFTER DARK</strong>
        <span>EXPLORE THE COLLECTION →</span>
      </div>
    </div>
  );
}

function CollectionView({ edition }: Pick<NocturneStorefrontProps, "edition" | "sizes">) {
  return (
    <div className={styles.storefrontCollection}>
      <StorefrontHeader />
      <div aria-hidden="true" className={styles.storefrontSectionTitle}>
        <span>COLLECTION 01</span>
        <strong>NOCTURNE OBJECTS</strong>
        <span>03 STUDIES</span>
      </div>
      <div className={styles.storefrontProductGrid}>
        {(["collection", "product", "editorial"] as const).map((kind, index) => (
          <div className={styles.storefrontProduct} key={kind}>
            <div className={styles.storefrontProductImage}>
              <StorefrontImage
                alt={`${edition.name} concept collection view ${index + 1}.`}
                edition={edition}
                kind={kind}
                sizes={collectionImageSizes}
              />
            </div>
            <div aria-hidden="true" className={styles.storefrontProductLabel}>
              <span>FORM {String(index + 1).padStart(2, "0")}</span>
              <span>STUDY</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductView({ edition, sizes }: Pick<NocturneStorefrontProps, "edition" | "sizes">) {
  return (
    <div className={styles.storefrontProductPage}>
      <StorefrontHeader />
      <div className={styles.storefrontProductHero}>
        <StorefrontImage edition={edition} kind="product" sizes={sizes} />
      </div>
      <div aria-hidden="true" className={styles.storefrontProductDetails}>
        <span>NOCTURNE / FORM 01</span>
        <strong>SCULPTED IN SHADOW.</strong>
        <p>Black silk structure, brushed hardware and a restrained oxblood detail.</p>
        <span className={styles.storefrontRule}>SELECT / 01 02 03</span>
        <span className={styles.storefrontAction}>ADD TO BAG</span>
      </div>
    </div>
  );
}

function CartView({ edition, sizes }: Pick<NocturneStorefrontProps, "edition" | "sizes">) {
  return (
    <div className={styles.storefrontCart}>
      <div className={styles.storefrontCartBackdrop}>
        <StorefrontImage edition={edition} kind="home" sizes={sizes} />
        <StorefrontHeader />
      </div>
      <div aria-hidden="true" className={styles.storefrontCartSheet}>
        <div className={styles.storefrontCartTitle}>
          <strong>BAG</strong>
          <span>01 ITEM</span>
        </div>
        <div className={styles.storefrontCartItem}>
          <div className={styles.storefrontCartThumb}>
            <StorefrontImage edition={edition} kind="cart" sizes={cartThumbnailSizes} />
          </div>
          <div>
            <strong>FORM 01</strong>
            <span>BLACK / 01</span>
            <span>QUANTITY 1</span>
          </div>
        </div>
        <span className={styles.storefrontAction}>REVIEW ORDER</span>
      </div>
    </div>
  );
}

function EditorialView({ edition, sizes }: Pick<NocturneStorefrontProps, "edition" | "sizes">) {
  return (
    <div className={styles.storefrontEditorial}>
      <StorefrontImage edition={edition} kind="editorial" sizes={sizes} />
      <StorefrontHeader />
      <div aria-hidden="true" className={styles.storefrontEditorialCopy}>
        <span>NOCTURNE NOTES / 01</span>
        <strong>
          NIGHT.
          <br />
          STRUCTURE.
          <br />
          MOVEMENT.
        </strong>
      </div>
    </div>
  );
}

function MobileView({ edition, sizes }: Pick<NocturneStorefrontProps, "edition" | "sizes">) {
  return (
    <div className={styles.storefrontMobileShell}>
      <div className={styles.storefrontMobile}>
        <div className={styles.storefrontMobileImage}>
          <StorefrontImage edition={edition} kind="mobile" sizes={sizes} />
        </div>
        <StorefrontHeader compact />
        <div aria-hidden="true" className={styles.storefrontMobileCopy}>
          <span>EDITION 001</span>
          <strong>NOCTURNE</strong>
          <span>SHOP THE STUDY →</span>
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
    <figure className={styles.storefrontFigure} data-storefront-view={kind}>
      <div className={styles.storefrontViewport}>
        <View edition={edition} sizes={responsiveSizes} />
      </div>
      {showCaption ? (
        <figcaption className={styles.storefrontCaption}>
          <span>
            {stage?.index} / {stage?.label}
          </span>
          <span>ORVAUXE Original · Concept Edition</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

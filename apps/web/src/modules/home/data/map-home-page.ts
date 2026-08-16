import type { HomePageQueryResult } from "@/generated/sanity.types";
import { getSanityImageUrl } from "@/infrastructure/sanity/image";

import type {
  FeaturedHomeEdition,
  HomeAnalyticsId,
  HomeCta,
  HomeMedia,
  HomePageData,
} from "../model/home-page";

type HomePageRecord = NonNullable<HomePageQueryResult>;
type RawCta = HomePageRecord["heroPrimaryCta"];
type RawMedia = HomePageRecord["heroMedia"];
type RawImage = NonNullable<NonNullable<RawMedia>["image"]>;
type RawCrop = RawImage["crop"];
type RawHotspot = RawImage["hotspot"];

const analyticsIds = new Set<HomeAnalyticsId>(["contact", "startProject"]);

function cleanText(value: string | null | undefined): string | null {
  const text = value?.trim();
  return text ? text : null;
}

function finiteNumber(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function clampPercentage(value: number): number {
  return Math.max(0, Math.min(100, value * 100));
}

function normalizeCrop(crop: RawCrop | null | undefined) {
  if (!crop) return null;

  const top = finiteNumber(crop.top);
  const bottom = finiteNumber(crop.bottom);
  const left = finiteNumber(crop.left);
  const right = finiteNumber(crop.right);

  if (top === null || bottom === null || left === null || right === null) return null;
  if (top < 0 || bottom < 0 || left < 0 || right < 0) return null;
  if (top + bottom >= 1 || left + right >= 1) return null;

  return { top, bottom, left, right };
}

function normalizeHotspot(hotspot: RawHotspot | null | undefined) {
  if (!hotspot) return null;

  const x = finiteNumber(hotspot.x);
  const y = finiteNumber(hotspot.y);
  const width = finiteNumber(hotspot.width);
  const height = finiteNumber(hotspot.height);

  if (x === null || y === null || width === null || height === null) return null;

  return { x, y, width, height };
}

export function mapHomeMedia(media: RawMedia | null | undefined): HomeMedia | null {
  const image = media?.image;
  const assetId = cleanText(image?.assetId) ?? cleanText(image?.asset?._ref);
  const assetUrl = cleanText(image?.assetUrl);
  const originalWidth = finiteNumber(image?.dimensions?.width);
  const originalHeight = finiteNumber(image?.dimensions?.height);

  if (!media || !image || !assetId || !assetUrl || !originalWidth || !originalHeight) {
    return null;
  }

  const decorative = media.decorative === true;
  const alt = cleanText(media.alt) ?? "";
  if (!decorative && !alt) return null;

  const crop = normalizeCrop(image.crop);
  const hotspot = normalizeHotspot(image.hotspot);
  const croppedWidth = originalWidth * (1 - (crop?.left ?? 0) - (crop?.right ?? 0));
  const croppedHeight = originalHeight * (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0));
  const width = Math.max(1, Math.min(2400, Math.round(croppedWidth)));
  const height = Math.max(1, Math.round(width * (croppedHeight / croppedWidth)));

  const source = {
    asset: { _ref: assetId, _type: "reference" as const },
    ...(crop ? { crop } : {}),
    ...(hotspot ? { hotspot } : {}),
  };
  const src = getSanityImageUrl(source, { quality: 85, width }) ?? assetUrl;
  const hotspotX = hotspot
    ? (hotspot.x - (crop?.left ?? 0)) / (1 - (crop?.left ?? 0) - (crop?.right ?? 0))
    : null;
  const hotspotY = hotspot
    ? (hotspot.y - (crop?.top ?? 0)) / (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0))
    : null;
  const objectPosition = hotspot
    ? `${clampPercentage(hotspotX ?? hotspot.x).toFixed(2)}% ${clampPercentage(
        hotspotY ?? hotspot.y,
      ).toFixed(2)}%`
    : "50% 50%";

  return {
    src,
    alt: decorative ? "" : alt,
    decorative,
    width,
    height,
    objectPosition,
    caption: cleanText(media.caption),
    credit: cleanText(media.credit),
  };
}

function mapCta(
  value: RawCta | null | undefined,
  expectedHref: string,
  expectedAnalyticsId: HomeAnalyticsId | null,
): HomeCta | null {
  const label = cleanText(value?.label);
  const href = cleanText(value?.destination);

  if (!label || value?.destinationKind !== "internalPath" || href !== expectedHref) {
    return null;
  }

  const analyticsId = value.analyticsId;
  if (analyticsId && !analyticsIds.has(analyticsId as HomeAnalyticsId)) return null;
  if ((analyticsId ?? null) !== expectedAnalyticsId) return null;

  return {
    label,
    href,
    analyticsId: analyticsId ? (analyticsId as HomeAnalyticsId) : null,
  };
}

function mapFeaturedEdition(
  edition: NonNullable<NonNullable<HomePageQueryResult>["featuredEdition"]> | null | undefined,
): FeaturedHomeEdition | null {
  const name = cleanText(edition?.name);
  const category = cleanText(edition?.category);
  const copy = cleanText(edition?.intro);
  const editionNumber = finiteNumber(edition?.editionNumber);

  if (
    !edition ||
    !name ||
    !category ||
    !copy ||
    !editionNumber ||
    !Number.isInteger(editionNumber) ||
    editionNumber < 1
  ) {
    return null;
  }

  const statusLabels = {
    available: "ORVAUXE Original",
    draft: "Concept Edition",
    retired: "Archive Edition",
  } as const;
  const statusLabel = edition.status ? statusLabels[edition.status] : undefined;
  if (!statusLabel) return null;

  return {
    numberLabel: `Edition ${String(editionNumber).padStart(3, "0")}`,
    name,
    statusLabel,
    category,
    copy,
    media: mapHomeMedia(edition.hero),
  };
}

export function mapHomePage(page: HomePageQueryResult): HomePageData | null {
  if (!page) return null;

  const heroHeading = cleanText(page.heroHeading);
  const heroCopy = cleanText(page.heroCopy);
  const heroPrimaryCta = mapCta(page.heroPrimaryCta, "/start-a-project", "startProject");
  const heroSecondaryCta = mapCta(page.heroSecondaryCta, "/editions", null);
  const statementHeading = cleanText(page.statementHeading);
  const statementBody = cleanText(page.serviceIntroduction);
  const editionsHeading = cleanText(page.editionsHeading);
  const editionsIntroduction = cleanText(page.editionsIntroduction);
  const editionsPrice = cleanText(page.editionsPrice);
  const featuredEdition = mapFeaturedEdition(page.featuredEdition);
  const atelierHeading = cleanText(page.atelierHeading);
  const atelierIntroduction = cleanText(page.atelierIntroduction);
  const atelierPrice = cleanText(page.atelierPrice);
  const atelierCapabilities = (page.atelierCapabilities ?? [])
    .map(cleanText)
    .filter((capability): capability is string => capability !== null)
    .filter((capability, index, capabilities) => capabilities.indexOf(capability) === index);
  const atelierCta = mapCta(page.atelierCta, "/atelier", null);
  const studioHeading = cleanText(page.studioHeading);
  const studioDescriptor = cleanText(page.studioDescriptor);
  const studioOrigin = cleanText(page.studioOrigin);
  const studioBody = cleanText(page.studioBody);
  const finalCtaEyebrow = cleanText(page.finalCtaEyebrow);
  const finalCtaHeading = cleanText(page.finalCtaHeading);
  const finalCtaBody = cleanText(page.finalCtaBody);
  const finalCta = mapCta(page.closingCta, "/start-a-project", "startProject");
  const seoTitle = cleanText(page.seo?.metaTitle);
  const seoDescription = cleanText(page.seo?.metaDescription);

  if (
    !heroHeading ||
    !heroCopy ||
    !heroPrimaryCta ||
    !heroSecondaryCta ||
    !statementHeading ||
    !statementBody ||
    !editionsHeading ||
    !editionsIntroduction ||
    !editionsPrice ||
    !featuredEdition ||
    !atelierHeading ||
    !atelierIntroduction ||
    !atelierPrice ||
    atelierCapabilities.length === 0 ||
    !atelierCta ||
    !studioHeading ||
    !studioDescriptor ||
    !studioOrigin ||
    !studioBody ||
    !finalCtaEyebrow ||
    !finalCtaHeading ||
    !finalCtaBody ||
    !finalCta ||
    !seoTitle ||
    !seoDescription
  ) {
    return null;
  }

  return {
    contentSource: "sanity",
    hero: {
      heading: heroHeading,
      copy: heroCopy,
      primaryCta: heroPrimaryCta,
      secondaryCta: heroSecondaryCta,
    },
    heroMedia: mapHomeMedia(page.heroMedia),
    statement: {
      heading: statementHeading,
      body: statementBody,
    },
    editions: {
      heading: editionsHeading,
      introduction: editionsIntroduction,
      price: editionsPrice,
      indexHref: "/editions",
      featured: featuredEdition,
    },
    atelier: {
      heading: atelierHeading,
      introduction: atelierIntroduction,
      price: atelierPrice,
      capabilities: atelierCapabilities,
      cta: atelierCta,
      media: mapHomeMedia(page.atelierCampaignMedia),
    },
    studio: {
      heading: studioHeading,
      descriptor: studioDescriptor,
      origin: studioOrigin,
      body: studioBody,
    },
    finalCta: {
      eyebrow: finalCtaEyebrow,
      heading: finalCtaHeading,
      body: finalCtaBody,
      cta: finalCta,
    },
    seo: {
      title: seoTitle,
      description: seoDescription,
      shareImage: mapHomeMedia(page.seo?.shareImage),
      noIndex: page.seo?.noIndex === true,
    },
  };
}

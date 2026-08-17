import type { EditionQueryResult } from "@/generated/sanity.types";
import { getSanityImageUrl } from "@/infrastructure/sanity/image";

import type {
  Edition,
  EditionCta,
  EditionMedia,
  EditionSeo,
  EditionStorefrontView,
  StorefrontViewKind,
} from "../model/edition";
import {
  editionIncludedExperiences,
  editionMarketScope,
  getEditionStatusLabel,
  isNocturneEdition,
  isPublicEditionStatus,
  requiredStorefrontViewKinds,
  storefrontViewKinds,
} from "../model/edition";

type EditionRecord = NonNullable<EditionQueryResult>;
type RawMedia = EditionRecord["hero"];
type RawImage = NonNullable<NonNullable<RawMedia>["image"]>;
type RawCrop = RawImage["crop"];
type RawHotspot = RawImage["hotspot"];

const storefrontViewKindSet = new Set<StorefrontViewKind>(storefrontViewKinds);

function cleanText(value: string | null | undefined): string | null {
  const text = value?.trim();
  return text ? text : null;
}

function finiteNumber(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function uniqueTextList(
  values: readonly (string | null)[] | null | undefined,
  minimum: number,
  maximum: number,
): readonly string[] | null {
  if (!values || values.length < minimum || values.length > maximum) return null;

  const normalized = values.map(cleanText);
  if (normalized.some((value) => value === null)) return null;

  const text = normalized.filter((value): value is string => value !== null);
  return new Set(text).size === text.length ? text : null;
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

function clampPercentage(value: number): number {
  return Math.max(0, Math.min(100, value * 100));
}

export function mapEditionMedia(media: RawMedia | null | undefined): EditionMedia | null {
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

function mapStorefrontViews(
  views: EditionRecord["storefrontViews"],
): readonly EditionStorefrontView[] | null {
  if (!views || views.length < 4 || views.length > storefrontViewKinds.length) return null;

  const mappedViews: EditionStorefrontView[] = [];
  const seenKinds = new Set<StorefrontViewKind>();

  for (const view of views) {
    const kind = view.kind;
    if (!kind || !storefrontViewKindSet.has(kind) || seenKinds.has(kind)) return null;

    const media = mapEditionMedia(view.media);
    if (!media) return null;

    seenKinds.add(kind);
    mappedViews.push({ kind, media });
  }

  if (requiredStorefrontViewKinds.some((kind) => !seenKinds.has(kind))) return null;

  return mappedViews;
}

function mapGallery(gallery: EditionRecord["gallery"]): readonly EditionMedia[] | null {
  if (!gallery) return [];
  if (gallery.length > 12) return null;

  const media = gallery.map(mapEditionMedia);
  return media.some((item) => item === null)
    ? null
    : media.filter((item): item is EditionMedia => item !== null);
}

function mapCta(cta: EditionRecord["cta"], slug: string): EditionCta | null {
  const label = cleanText(cta?.label);
  const href = cleanText(cta?.destination);
  const expectedHref = `/start-a-project?edition=${encodeURIComponent(slug)}`;

  if (!label || cta?.destinationKind !== "internalPath" || href !== expectedHref) return null;

  return { label, href };
}

function mapSeo(seo: EditionRecord["seo"]): EditionSeo | null {
  const title = cleanText(seo?.metaTitle);
  const description = cleanText(seo?.metaDescription);
  if (!title || !description) return null;

  return {
    title,
    description,
    shareImage: mapEditionMedia(seo?.shareImage),
    noIndex: seo?.noIndex === true,
  };
}

function mapHttpsUrl(value: string | null | undefined): string | null {
  const url = cleanText(value);
  if (!url) return null;

  try {
    return new URL(url).protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

export function mapEdition(edition: EditionQueryResult): Edition | null {
  if (!edition) return null;

  const category = cleanText(edition.category);
  const name = cleanText(edition.name);
  const slug = cleanText(edition.slug);
  const intro = cleanText(edition.intro);
  const startingPrice = cleanText(edition.startingPrice);
  const deliveryTarget = cleanText(edition.launchEstimate);
  const editionNumber = finiteNumber(edition.editionNumber);
  const heroMedia = mapEditionMedia(edition.hero);
  const gallery = mapGallery(edition.gallery);
  const storefrontViews = mapStorefrontViews(edition.storefrontViews);
  const technicalFoundation = uniqueTextList(edition.features, 1, 16);
  const designDna = uniqueTextList(edition.designDna, 4, 10);
  const systemStays = uniqueTextList(edition.systemStays, 4, 10);
  const brandCanAdapt = uniqueTextList(edition.brandCanAdapt, 4, 10);

  if (
    !category ||
    !name ||
    !slug ||
    !intro ||
    !startingPrice ||
    !deliveryTarget ||
    !editionNumber ||
    !Number.isInteger(editionNumber) ||
    editionNumber < 1 ||
    !isPublicEditionStatus(edition.status) ||
    !heroMedia ||
    !gallery ||
    !storefrontViews ||
    !technicalFoundation ||
    !designDna ||
    !systemStays ||
    !brandCanAdapt
  ) {
    return null;
  }

  const cta = mapCta(edition.cta, slug);
  const seo = mapSeo(edition.seo);
  if (!cta || !seo) return null;

  const mappedEdition: Edition = {
    id: edition.id,
    name,
    slug,
    editionNumber,
    numberLabel: `Edition ${String(editionNumber).padStart(3, "0")}`,
    category,
    status: edition.status,
    statusLabel: getEditionStatusLabel(edition.status),
    originLabel: "ORVAUXE Original",
    intro,
    startingPrice,
    deliveryTarget,
    platform: "Shopify",
    heroMedia,
    gallery,
    storefrontViews,
    includedExperiences: editionIncludedExperiences,
    technicalFoundation,
    designDna,
    adaptation: { systemStays, brandCanAdapt },
    revisionRounds: 2,
    marketScope: editionMarketScope,
    defectCorrectionDays: 14,
    demoUrl: mapHttpsUrl(edition.demoUrl),
    cta,
    seo,
  };

  return slug === "nocturne" && !isNocturneEdition(mappedEdition) ? null : mappedEdition;
}

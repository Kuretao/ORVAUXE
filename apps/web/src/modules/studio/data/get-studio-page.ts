import type { StudioPageQueryResult } from "@/generated/sanity.types";
import { CMSReadError, sanityFetch } from "@/infrastructure/sanity/client.server";

import { studioPageFallback } from "../model/studio-page";
import type { StudioPage } from "../model/studio-page";
import { studioPageQuery } from "./studio-page.query";

function cleanText(value: string | null | undefined): string | null {
  const text = value?.trim();
  return text ? text : null;
}

export function mapStudioPage(page: NonNullable<StudioPageQueryResult>): StudioPage | null {
  const heroCopy = cleanText(page.heroCopy);
  const heroHeading = cleanText(page.heroHeading);
  const pointOfView = cleanText(page.pointOfView);
  const origin = cleanText(page.origin);
  const operatingModel = cleanText(page.operatingModel);
  const trustContent = cleanText(page.trustContent);
  const ctaLabel = cleanText(page.contactCta?.label);
  const ctaDestination = cleanText(page.contactCta?.destination);
  const metaTitle = cleanText(page.seo?.metaTitle);
  const metaDescription = cleanText(page.seo?.metaDescription);

  if (
    !heroCopy ||
    !heroHeading ||
    !pointOfView ||
    !origin ||
    !operatingModel ||
    !trustContent ||
    !ctaLabel ||
    page.contactCta?.destinationKind !== "internalPath" ||
    ctaDestination !== "/start-a-project" ||
    !metaTitle ||
    !metaDescription
  ) {
    return null;
  }

  return {
    contentSource: "sanity",
    heroHeading,
    heroCopy,
    pointOfView,
    origin,
    operatingModel,
    trustContent,
    contactCta: { label: ctaLabel, href: "/start-a-project" },
    seo: {
      metaTitle,
      metaDescription,
      shareImageUrl: cleanText(page.seo?.shareImageUrl),
      noIndex: page.seo?.noIndex === true,
    },
  };
}

export async function getStudioPage(): Promise<StudioPage> {
  let page: StudioPageQueryResult;

  try {
    page = await sanityFetch<StudioPageQueryResult>({
      query: studioPageQuery,
      tags: ["studio-page"],
    });
  } catch (error) {
    if (error instanceof CMSReadError && error.message.includes("configuration is not available")) {
      return studioPageFallback;
    }

    throw error;
  }

  return (page ? mapStudioPage(page) : null) ?? studioPageFallback;
}

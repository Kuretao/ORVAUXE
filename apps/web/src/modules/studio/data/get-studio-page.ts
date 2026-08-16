import type { StudioPageQueryResult } from "@/generated/sanity.types";
import { CMSReadError, sanityFetch } from "@/infrastructure/sanity/client.server";

import { studioPageQuery } from "./studio-page.query";

export interface StudioPage {
  heroHeading: string;
  heroCopy: string;
  pointOfView?: string | null;
  origin?: string | null;
  operatingModel?: string | null;
  trustContent?: string | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    shareImageUrl?: string | null;
    noIndex?: boolean | null;
  } | null;
}

function mapStudioPage(page: NonNullable<StudioPageQueryResult>): StudioPage | null {
  const heroCopy = page.heroCopy?.trim();
  const heroHeading = page.heroHeading?.trim();

  if (!heroCopy || !heroHeading) {
    return null;
  }

  return {
    heroHeading,
    heroCopy,
    pointOfView: page.pointOfView,
    origin: page.origin,
    operatingModel: page.operatingModel,
    trustContent: page.trustContent,
    seo: page.seo,
  };
}

export async function getStudioPage(): Promise<StudioPage | null> {
  let page: StudioPageQueryResult;

  try {
    page = await sanityFetch<StudioPageQueryResult>({
      query: studioPageQuery,
      tags: ["studio-page"],
    });
  } catch (error) {
    if (error instanceof CMSReadError && error.message.includes("configuration is not available")) {
      return null;
    }

    throw error;
  }

  return page ? mapStudioPage(page) : null;
}

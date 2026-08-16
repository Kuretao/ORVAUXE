import type { AtelierPageQueryResult } from "@/generated/sanity.types";
import { CMSReadError, sanityFetch } from "@/infrastructure/sanity/client.server";

import { atelierPageQuery } from "./atelier-page.query";

export interface AtelierPage {
  heroHeading: string;
  heroCopy: string;
  serviceExplanation?: string | null;
  capabilities: string[];
  processSteps: Array<{ title: string; description: string }>;
  commercialCopy?: string | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    shareImageUrl?: string | null;
    noIndex?: boolean | null;
  } | null;
}

function mapAtelierPage(page: NonNullable<AtelierPageQueryResult>): AtelierPage | null {
  const heroCopy = page.heroCopy?.trim();
  const heroHeading = page.heroHeading?.trim();

  if (!heroCopy || !heroHeading) {
    return null;
  }

  return {
    heroHeading,
    heroCopy,
    serviceExplanation: page.serviceExplanation,
    capabilities: page.capabilities ?? [],
    processSteps: (page.processSteps ?? []).flatMap((step) =>
      step.title && step.description
        ? [{ title: step.title.trim(), description: step.description.trim() }]
        : [],
    ),
    commercialCopy: page.commercialCopy,
    seo: page.seo,
  };
}

export async function getAtelierPage(): Promise<AtelierPage | null> {
  let page: AtelierPageQueryResult;

  try {
    page = await sanityFetch<AtelierPageQueryResult>({
      query: atelierPageQuery,
      tags: ["atelier-page"],
    });
  } catch (error) {
    if (error instanceof CMSReadError && error.message.includes("configuration is not available")) {
      return null;
    }

    throw error;
  }

  return page ? mapAtelierPage(page) : null;
}

import type { AtelierPageQueryResult } from "@/generated/sanity.types";
import { CMSReadError, sanityFetch } from "@/infrastructure/sanity/client.server";

import { atelierPageFallback } from "../model/atelier-page";
import type { AtelierPage } from "../model/atelier-page";
import { atelierPageQuery } from "./atelier-page.query";

function cleanText(value: string | null | undefined): string | null {
  const text = value?.trim();
  return text ? text : null;
}

export function mapAtelierPage(page: NonNullable<AtelierPageQueryResult>): AtelierPage | null {
  const heroCopy = cleanText(page.heroCopy);
  const heroHeading = cleanText(page.heroHeading);
  const serviceExplanation = cleanText(page.serviceExplanation);
  const commercialCopy = cleanText(page.commercialCopy);
  const capabilities = (page.capabilities ?? []).flatMap((item) => {
    const value = cleanText(item);
    return value ? [value] : [];
  });
  const processSteps = (page.processSteps ?? []).flatMap((step) => {
    const title = cleanText(step.title);
    const description = cleanText(step.description);
    return title && description ? [{ title, description }] : [];
  });
  const ctaLabel = cleanText(page.cta?.label);
  const ctaDestination = cleanText(page.cta?.destination);
  const metaTitle = cleanText(page.seo?.metaTitle);
  const metaDescription = cleanText(page.seo?.metaDescription);

  if (
    !heroCopy ||
    !heroHeading ||
    !serviceExplanation ||
    !commercialCopy ||
    capabilities.length < 1 ||
    processSteps.length < 1 ||
    !ctaLabel ||
    page.cta?.destinationKind !== "internalPath" ||
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
    serviceExplanation,
    capabilities,
    processSteps,
    commercialCopy,
    cta: { label: ctaLabel, href: "/start-a-project" },
    seo: {
      metaTitle,
      metaDescription,
      shareImageUrl: cleanText(page.seo?.shareImageUrl),
      noIndex: page.seo?.noIndex === true,
    },
  };
}

export async function getAtelierPage(): Promise<AtelierPage> {
  let page: AtelierPageQueryResult;

  try {
    page = await sanityFetch<AtelierPageQueryResult>({
      query: atelierPageQuery,
      tags: ["atelier-page"],
    });
  } catch (error) {
    if (error instanceof CMSReadError && error.message.includes("configuration is not available")) {
      return atelierPageFallback;
    }

    throw error;
  }

  return (page ? mapAtelierPage(page) : null) ?? atelierPageFallback;
}

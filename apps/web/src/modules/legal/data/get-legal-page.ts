import { getServerEnv } from "@/config/env.server";
import type { LegalPageQueryResult, LegalPageSlugsQueryResult } from "@/generated/sanity.types";
import { CMSReadError, sanityFetch } from "@/infrastructure/sanity/client.server";

import { legalPageQuery, legalPageSlugsQuery } from "./legal-page.query";

export interface LegalPage {
  title: string;
  slug: string;
  bodyText: string;
  effectiveDate?: string | null;
  updatedDate?: string | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    shareImageUrl?: string | null;
    noIndex?: boolean | null;
  } | null;
}

const e2eLegalPage: LegalPage = {
  bodyText: "Deterministic legal-page fixture for end-to-end tests.",
  effectiveDate: "2026-01-01",
  slug: "privacy",
  title: "Privacy",
};

function mapLegalPage(page: NonNullable<LegalPageQueryResult>): LegalPage | null {
  const slug = page.slug?.trim();
  const title = page.title?.trim();

  if (!slug || !title) {
    return null;
  }

  return {
    title,
    slug,
    bodyText: page.bodyText.trim(),
    effectiveDate: page.effectiveDate,
    updatedDate: page.updatedDate,
    seo: page.seo,
  };
}

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  if (getServerEnv().ORVAUXE_E2E_MODE === "stub") {
    return normalizedSlug === e2eLegalPage.slug ? e2eLegalPage : null;
  }

  let page: LegalPageQueryResult;

  try {
    page = await sanityFetch<LegalPageQueryResult>({
      query: legalPageQuery,
      params: { slug: normalizedSlug },
      tags: [`legal-page:${normalizedSlug}`, "legal-pages"],
    });
  } catch (error) {
    if (error instanceof CMSReadError && error.message.includes("configuration is not available")) {
      return null;
    }

    throw error;
  }

  return page ? mapLegalPage(page) : null;
}

export async function getLegalPageSlugs(): Promise<string[]> {
  if (getServerEnv().ORVAUXE_E2E_MODE === "stub") {
    return [e2eLegalPage.slug];
  }

  let results: LegalPageSlugsQueryResult;

  try {
    results = await sanityFetch<LegalPageSlugsQueryResult>({
      query: legalPageSlugsQuery,
      tags: ["legal-pages"],
    });
  } catch (error) {
    if (error instanceof CMSReadError && error.message.includes("configuration is not available")) {
      return [];
    }

    throw error;
  }

  return results
    .map(({ slug }) => slug?.trim() ?? "")
    .filter((slug, index, slugs) => slug.length > 0 && slugs.indexOf(slug) === index);
}

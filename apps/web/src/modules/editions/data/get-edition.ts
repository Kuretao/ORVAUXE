import "server-only";

import { cache } from "react";

import { getClientEnv } from "@/config/env.client";
import { getServerEnv } from "@/config/env.server";
import type { EditionQueryResult } from "@/generated/sanity.types";
import { CMSReadError, sanityFetch } from "@/infrastructure/sanity/client.server";

import type { Edition } from "../model/edition";
import { e2eEdition, nocturneEditionFallback } from "./edition.fallback";
import { editionQuery } from "./editions.query";
import { mapEdition } from "./map-edition";

function sanityIsConfigured(): boolean {
  const clientEnv = getClientEnv();
  return Boolean(clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID && clientEnv.NEXT_PUBLIC_SANITY_DATASET);
}

export async function loadEdition(slug: string): Promise<Edition | null> {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  if (getServerEnv().ORVAUXE_E2E_MODE === "stub") {
    if (normalizedSlug === nocturneEditionFallback.slug) return nocturneEditionFallback;
    return normalizedSlug === e2eEdition.slug ? e2eEdition : null;
  }

  if (!sanityIsConfigured()) {
    return normalizedSlug === nocturneEditionFallback.slug ? nocturneEditionFallback : null;
  }

  const edition = await sanityFetch<EditionQueryResult>({
    query: editionQuery,
    params: { slug: normalizedSlug },
    tags: [`edition:${normalizedSlug}`, "editions"],
  });
  const mappedEdition = mapEdition(edition);

  if (normalizedSlug === nocturneEditionFallback.slug && !mappedEdition) {
    throw new CMSReadError("The published Nocturne Edition is missing or incomplete.");
  }

  return mappedEdition;
}

export const getEdition = cache(loadEdition);

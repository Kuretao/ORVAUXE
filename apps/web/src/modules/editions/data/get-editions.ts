import "server-only";

import { cache } from "react";

import { getClientEnv } from "@/config/env.client";
import { getServerEnv } from "@/config/env.server";
import type { EditionsQueryResult } from "@/generated/sanity.types";
import { CMSReadError, sanityFetch } from "@/infrastructure/sanity/client.server";

import type { Edition } from "../model/edition";
import { isNocturneEdition } from "../model/edition";
import { nocturneEditionFallback } from "./edition.fallback";
import { editionsQuery } from "./editions.query";
import { mapEdition } from "./map-edition";

function sanityIsConfigured(): boolean {
  const clientEnv = getClientEnv();
  return Boolean(clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID && clientEnv.NEXT_PUBLIC_SANITY_DATASET);
}

export async function loadEditions(): Promise<Edition[]> {
  if (getServerEnv().ORVAUXE_E2E_MODE === "stub") {
    return [nocturneEditionFallback];
  }

  if (!sanityIsConfigured()) {
    return [nocturneEditionFallback];
  }

  const editions = await sanityFetch<EditionsQueryResult>({
    query: editionsQuery,
    tags: ["editions"],
  });
  const mappedEditions = editions
    .map((edition) => mapEdition(edition))
    .filter((edition): edition is Edition => edition !== null);

  if (!mappedEditions.some(isNocturneEdition)) {
    throw new CMSReadError("The published Nocturne Edition is missing or incomplete.");
  }

  return mappedEditions;
}

export const getEditions = cache(loadEditions);

export async function getEditionSlugs(): Promise<string[]> {
  if (getServerEnv().ORVAUXE_E2E_MODE === "stub") {
    return [nocturneEditionFallback.slug];
  }

  if (!sanityIsConfigured()) {
    return [nocturneEditionFallback.slug];
  }

  return (await getEditions()).filter((edition) => !edition.seo.noIndex).map(({ slug }) => slug);
}

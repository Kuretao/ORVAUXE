import { getServerEnv } from "@/config/env.server";
import type { EditionSlugsQueryResult, EditionsQueryResult } from "@/generated/sanity.types";
import { CMSReadError, sanityFetch } from "@/infrastructure/sanity/client.server";

import type { Edition } from "../model/edition";
import { editionsQuery, editionSlugsQuery } from "./editions.query";
import { e2eEdition, mapEdition } from "./get-edition";

export async function getEditions(): Promise<Edition[]> {
  if (getServerEnv().ORVAUXE_E2E_MODE === "stub") {
    return [e2eEdition];
  }

  let editions: EditionsQueryResult;

  try {
    editions = await sanityFetch<EditionsQueryResult>({
      query: editionsQuery,
      tags: ["editions"],
    });
  } catch (error) {
    if (error instanceof CMSReadError && error.message.includes("configuration is not available")) {
      return [];
    }

    throw error;
  }

  return editions.map(mapEdition).filter((edition): edition is Edition => edition !== null);
}

export async function getEditionSlugs(): Promise<string[]> {
  if (getServerEnv().ORVAUXE_E2E_MODE === "stub") {
    return [e2eEdition.slug];
  }

  let results: EditionSlugsQueryResult;

  try {
    results = await sanityFetch<EditionSlugsQueryResult>({
      query: editionSlugsQuery,
      tags: ["editions"],
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

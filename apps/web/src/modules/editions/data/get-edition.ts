import { getServerEnv } from "@/config/env.server";
import type { EditionQueryResult } from "@/generated/sanity.types";
import { CMSReadError, sanityFetch } from "@/infrastructure/sanity/client.server";

import type { Edition } from "../model/edition";
import { editionQuery } from "./edition.query";

export const e2eEdition: Edition = {
  category: "Test fixture",
  editionNumber: 0,
  id: "e2e-edition",
  intro: "Deterministic Edition fixture for end-to-end tests.",
  name: "E2E Edition",
  slug: "e2e-edition",
  status: "available",
};

type EditionRecord = NonNullable<EditionQueryResult>;

function mapEdition(edition: EditionRecord): Edition | null {
  if (
    !edition.name ||
    !edition.slug ||
    edition.editionNumber === null ||
    !edition.category ||
    !edition.status
  ) {
    return null;
  }

  const category = edition.category.trim();
  const name = edition.name.trim();
  const slug = edition.slug.trim();

  if (!category || !name || !slug) {
    return null;
  }

  return {
    category,
    editionNumber: edition.editionNumber,
    id: edition.id,
    intro: edition.intro.trim(),
    name,
    slug,
    status: edition.status,
  };
}

export async function getEdition(slug: string): Promise<Edition | null> {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  if (getServerEnv().ORVAUXE_E2E_MODE === "stub") {
    return normalizedSlug === e2eEdition.slug ? e2eEdition : null;
  }

  let edition: EditionQueryResult;

  try {
    edition = await sanityFetch<EditionQueryResult>({
      query: editionQuery,
      params: { slug: normalizedSlug },
      tags: [`edition:${normalizedSlug}`, "editions"],
    });
  } catch (error) {
    if (error instanceof CMSReadError && error.message.includes("configuration is not available")) {
      return null;
    }

    throw error;
  }

  return edition ? mapEdition(edition) : null;
}

export { mapEdition };

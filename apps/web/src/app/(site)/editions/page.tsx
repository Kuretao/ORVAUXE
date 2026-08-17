import type { Metadata } from "next";

import { EditionIndexScreen, getEditions } from "@/modules/editions/server";
import { buildMetadata } from "@/seo/metadata/build-metadata";

export const metadata: Metadata = buildMetadata({
  title: "Premium Shopify Editions | ORVAUXE",
  description:
    "Explore ORVAUXE Editions: curated premium Shopify storefront systems adapted to distinctive fashion and design-led brands.",
  pathname: "/editions",
});

export default async function EditionsPage() {
  const editions = await getEditions();

  return <EditionIndexScreen editions={editions} />;
}

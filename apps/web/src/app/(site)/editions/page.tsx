import type { Metadata } from "next";

import { EditionIndexScreen, getEditions } from "@/modules/editions";
import { buildMetadata } from "@/seo/metadata/build-metadata";

export const metadata: Metadata = buildMetadata({
  title: "Editions",
  description: "Neutral Editions route skeleton.",
  pathname: "/editions",
});

export default async function EditionsPage() {
  const editions = await getEditions();

  return <EditionIndexScreen editions={editions} />;
}

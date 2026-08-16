import type { Metadata } from "next";

import { AtelierScreen, getAtelierPage } from "@/modules/atelier";
import { buildMetadata } from "@/seo/metadata/build-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAtelierPage();

  return buildMetadata({
    title: page?.seo?.metaTitle || "Atelier",
    description: page?.seo?.metaDescription || "Neutral Atelier route skeleton.",
    pathname: "/atelier",
    image: page?.seo?.shareImageUrl,
    noIndex: Boolean(page?.seo?.noIndex),
  });
}

export default async function AtelierPage() {
  const page = await getAtelierPage();

  return <AtelierScreen page={page} />;
}

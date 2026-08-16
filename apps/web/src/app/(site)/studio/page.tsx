import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { getStudioPage, StudioScreen } from "@/modules/studio";
import { buildMetadata } from "@/seo/metadata/build-metadata";
import { JsonLd } from "@/seo/structured-data/JsonLd";
import { buildOrganizationStructuredData } from "@/seo/structured-data/organization";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudioPage();

  return buildMetadata({
    title: page?.seo?.metaTitle || "Studio",
    description: page?.seo?.metaDescription || "Neutral Studio route skeleton.",
    pathname: "/studio",
    image: page?.seo?.shareImageUrl,
    noIndex: Boolean(page?.seo?.noIndex),
  });
}

export default async function StudioPage() {
  const page = await getStudioPage();
  const organization = buildOrganizationStructuredData({
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: siteConfig.organization.sameAs,
  });

  return (
    <>
      <JsonLd data={organization} />
      <StudioScreen page={page} />
    </>
  );
}

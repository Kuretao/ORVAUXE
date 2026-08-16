import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { getHomePage, HomeScreen } from "@/modules/home";
import { buildMetadata } from "@/seo/metadata/build-metadata";
import { JsonLd } from "@/seo/structured-data/JsonLd";
import { buildOrganizationStructuredData } from "@/seo/structured-data/organization";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage();

  return buildMetadata({
    title: page.seo.title,
    description: page.seo.description,
    pathname: "/",
    image: page.seo.shareImage?.src,
    noIndex: page.seo.noIndex,
  });
}

export default async function HomePage() {
  const page = await getHomePage();
  const organization = buildOrganizationStructuredData({
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: siteConfig.organization.sameAs,
  });

  return (
    <>
      <JsonLd data={organization} />
      <HomeScreen page={page} />
    </>
  );
}

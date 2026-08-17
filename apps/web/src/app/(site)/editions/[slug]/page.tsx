import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EditionScreen, getEdition } from "@/modules/editions/server";
import { buildMetadata } from "@/seo/metadata/build-metadata";
import { buildBreadcrumbStructuredData } from "@/seo/structured-data/breadcrumbs";
import { JsonLd } from "@/seo/structured-data/JsonLd";
import { siteConfig } from "@/config/site";

interface EditionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EditionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const edition = await getEdition(slug);

  if (!edition) {
    return buildMetadata({
      title: "Edition not found",
      description: "The requested Edition is not available.",
      pathname: `/editions/${encodeURIComponent(slug)}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: edition.seo.title,
    description: edition.seo.description,
    image: edition.seo.shareImage?.src,
    pathname: `/editions/${encodeURIComponent(edition.slug)}`,
    noIndex: edition.seo.noIndex,
  });
}

export default async function EditionPage({ params }: EditionPageProps) {
  const { slug } = await params;
  const edition = await getEdition(slug);

  if (!edition) {
    notFound();
  }

  const breadcrumbs = buildBreadcrumbStructuredData([
    { name: "Home", url: new URL("/", siteConfig.url) },
    { name: "Editions", url: new URL("/editions", siteConfig.url) },
    {
      name: edition.name,
      url: new URL(`/editions/${encodeURIComponent(edition.slug)}`, siteConfig.url),
    },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <EditionScreen edition={edition} />
    </>
  );
}

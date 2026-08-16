import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getLegalPage, LegalPageScreen } from "@/modules/legal";
import { buildMetadata } from "@/seo/metadata/build-metadata";

interface LegalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPage(slug);

  if (!page) {
    return buildMetadata({
      title: "Legal page not found",
      description: "The requested legal page is not available.",
      pathname: `/legal/${encodeURIComponent(slug)}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || "ORVAUXE legal information.",
    pathname: `/legal/${encodeURIComponent(page.slug)}`,
    image: page.seo?.shareImageUrl,
    noIndex: Boolean(page.seo?.noIndex),
  });
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const page = await getLegalPage(slug);

  if (!page) {
    notFound();
  }

  return <LegalPageScreen page={page} />;
}

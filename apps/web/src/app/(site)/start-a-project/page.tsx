import type { Metadata } from "next";
import { Container, Heading } from "@orvauxe/ui";

import { StartProjectForm } from "@/modules/project-inquiry";
import { buildMetadata } from "@/seo/metadata/build-metadata";

export const metadata: Metadata = buildMetadata({
  title: "Start a project",
  description: "Share your Shopify storefront, brand and project goals with ORVAUXE.",
  pathname: "/start-a-project",
});

interface StartProjectPageProps {
  searchParams: Promise<{
    edition?: string | string[];
  }>;
}

export default async function StartProjectPage({ searchParams }: StartProjectPageProps) {
  const requestedEdition = (await searchParams).edition;
  const initialEditionSlug = requestedEdition === "nocturne" ? "nocturne" : undefined;

  return (
    <main className="screen-stack" id="main-content" tabIndex={-1}>
      <Container>
        <Heading level={1}>Start a project</Heading>
        <StartProjectForm {...(initialEditionSlug ? { initialEditionSlug } : {})} />
      </Container>
    </main>
  );
}

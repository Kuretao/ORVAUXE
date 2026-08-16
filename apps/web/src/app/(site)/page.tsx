import { Container, Heading, Text } from "@orvauxe/ui";

import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/seo/metadata/build-metadata";
import { JsonLd } from "@/seo/structured-data/JsonLd";
import { buildOrganizationStructuredData } from "@/seo/structured-data/organization";

export const metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  pathname: "/",
});

export default function HomePage() {
  const organization = buildOrganizationStructuredData({
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: siteConfig.organization.sameAs,
  });

  return (
    <>
      <JsonLd data={organization} />
      <main className="screen-stack" id="main-content" tabIndex={-1}>
        <Container>
          <Heading level={1}>ORVAUXE</Heading>
          <Text data-skeleton-marker>Web application skeleton.</Text>
        </Container>
      </main>
    </>
  );
}

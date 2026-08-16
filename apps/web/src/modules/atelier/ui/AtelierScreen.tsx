import { Container, Heading, Text } from "@orvauxe/ui";

import type { AtelierPage } from "../data/get-atelier-page";

export interface AtelierScreenProps {
  page: AtelierPage | null;
}

export function AtelierScreen({ page }: AtelierScreenProps) {
  return (
    <main className="screen-stack" id="main-content" tabIndex={-1}>
      <Container>
        <Heading level={1}>{page?.heroHeading || "Atelier"}</Heading>
        {page?.heroCopy ? (
          <Text>{page.heroCopy}</Text>
        ) : (
          <Text data-skeleton-marker>Atelier content is not configured.</Text>
        )}
      </Container>
    </main>
  );
}

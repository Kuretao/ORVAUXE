import { Container, Heading, Text } from "@orvauxe/ui";

import type { StudioPage } from "../data/get-studio-page";

export interface StudioScreenProps {
  page: StudioPage | null;
}

export function StudioScreen({ page }: StudioScreenProps) {
  return (
    <main className="screen-stack" id="main-content" tabIndex={-1}>
      <Container>
        <Heading level={1}>{page?.heroHeading || "Studio"}</Heading>
        {page?.heroCopy ? (
          <Text>{page.heroCopy}</Text>
        ) : (
          <Text data-skeleton-marker>Studio content is not configured.</Text>
        )}
      </Container>
    </main>
  );
}

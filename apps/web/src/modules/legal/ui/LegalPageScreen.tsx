import { Container, Heading, Text } from "@orvauxe/ui";

import type { LegalPage } from "../data/get-legal-page";

export interface LegalPageScreenProps {
  page: LegalPage;
}

export function LegalPageScreen({ page }: LegalPageScreenProps) {
  return (
    <main className="screen-stack" id="main-content" tabIndex={-1}>
      <Container>
        <Heading level={1}>{page.title}</Heading>
        {page.effectiveDate ? <Text>Effective {page.effectiveDate}</Text> : null}
        {page.bodyText ? <Text>{page.bodyText}</Text> : null}
      </Container>
    </main>
  );
}

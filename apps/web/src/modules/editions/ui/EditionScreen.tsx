import { Container, Heading, Link, Text } from "@orvauxe/ui";

import type { Edition } from "../model/edition";

export interface EditionScreenProps {
  edition: Edition;
}

export function EditionScreen({ edition }: EditionScreenProps) {
  return (
    <main className="screen-stack" id="main-content" tabIndex={-1}>
      <Container>
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumbs">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/editions">Editions</Link>
            </li>
            <li aria-current="page">{edition.name}</li>
          </ol>
        </nav>
        <Heading level={1}>{edition.name}</Heading>
        <Text>
          Edition {edition.editionNumber} · {edition.category}
        </Text>
        {edition.intro ? <Text>{edition.intro}</Text> : null}
      </Container>
    </main>
  );
}

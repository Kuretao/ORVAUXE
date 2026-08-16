import { Container, Heading, Link, Text } from "@orvauxe/ui";

import type { Edition } from "../model/edition";

export interface EditionIndexScreenProps {
  editions: Edition[];
}

export function EditionIndexScreen({ editions }: EditionIndexScreenProps) {
  return (
    <main className="screen-stack" id="main-content" tabIndex={-1}>
      <Container>
        <Heading level={1}>Editions</Heading>
        {editions.length === 0 ? (
          <Text data-skeleton-marker>Edition content is not configured.</Text>
        ) : (
          <ul className="content-list">
            {editions.map((edition) => (
              <li key={edition.id}>
                <Link href={`/editions/${encodeURIComponent(edition.slug)}`}>{edition.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}

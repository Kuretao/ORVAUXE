import { Container, Grid, Heading, Link, Text } from "@orvauxe/ui";

import type { Edition } from "../model/edition";
import { isNocturneEdition } from "../model/edition";
import { EditionViewTracker, TrackedEditionStartLink } from "./EditionAnalytics.client";
import styles from "./Editions.module.css";
import { NocturneEditionScreen } from "./NocturneEditionScreen";

export interface EditionScreenProps {
  edition: Edition;
}

function GenericEditionScreen({ edition }: EditionScreenProps) {
  return (
    <main className={styles.screen} id="main-content" tabIndex={-1}>
      <EditionViewTracker
        category={edition.category}
        editionNumber={edition.editionNumber}
        slug={edition.slug}
      />
      <section className={styles.generic} data-theme="light">
        <Container>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/editions">Editions</Link>
              </li>
              <li aria-current="page">{edition.name}</li>
            </ol>
          </nav>
          <Grid className={styles.genericGrid}>
            <div className={styles.genericIdentity}>
              <Text className={styles.kicker} variant="label">
                {edition.numberLabel} / {edition.category}
              </Text>
              <Heading level={1} variant="display-lg">
                {edition.name}
              </Heading>
            </div>
            <div className={styles.genericCopy}>
              <Text variant="body-lg">{edition.intro}</Text>
              <dl className={styles.metadata}>
                <div>
                  <dt>Status</dt>
                  <dd>{edition.statusLabel}</dd>
                </div>
                <div>
                  <dt>Platform</dt>
                  <dd>{edition.platform}</dd>
                </div>
                <div>
                  <dt>Starting price</dt>
                  <dd>{edition.startingPrice}</dd>
                </div>
              </dl>
              <TrackedEditionStartLink
                className={styles.editorialAction}
                data-arrow="project"
                editionSlug={edition.slug}
                href={edition.cta.href}
                placement="edition_generic"
                variant="navigation"
              >
                {edition.cta.label}
              </TrackedEditionStartLink>
            </div>
          </Grid>
        </Container>
      </section>
    </main>
  );
}

export function EditionScreen({ edition }: EditionScreenProps) {
  return isNocturneEdition(edition) ? (
    <NocturneEditionScreen edition={edition} />
  ) : (
    <GenericEditionScreen edition={edition} />
  );
}

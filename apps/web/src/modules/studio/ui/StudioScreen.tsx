import { Container, Grid, Heading, Link, Text } from "@orvauxe/ui";
import Image from "next/image";

import type { StudioPage } from "../model/studio-page";
import { StudioViewTracker } from "./StudioAnalytics.client";
import styles from "./StudioScreen.module.css";

export interface StudioScreenProps {
  readonly page: StudioPage;
}

const principles = [
  "Brand before template",
  "Commerce without visual compromise",
  "Technology should stay quiet",
  "Mobile is part of the art direction",
  "Systems should remain operable",
] as const;

function publicTrustContent(value: string) {
  return value.replace(/\bfiscal commerce(?: integration)?\b/gi, "fiscal receipt support");
}

export function StudioScreen({ page }: StudioScreenProps) {
  return (
    <main
      className={styles.screen}
      data-content-source={page.contentSource}
      id="main-content"
      tabIndex={-1}
    >
      <StudioViewTracker />

      <section aria-labelledby="studio-heading" className={styles.hero} data-theme="dark">
        <Container>
          <Grid className={styles.heroGrid} data-motion-hero>
            <Text className={styles.index} data-motion-part="eyebrow" variant="label">
              01 / ORVAUXE
            </Text>
            <div className={styles.heroIdentity} data-motion-part="heading">
              <Text variant="label">Commerce Atelier</Text>
              <Heading id="studio-heading" level={1} variant="display-lg">
                {page.heroHeading}
              </Heading>
              <Text className={styles.originLabel} variant="caption">
                Chengdu · Worldwide
              </Text>
            </div>
            <Text className={styles.heroCopy} data-motion-part="body" variant="body-lg">
              {page.heroCopy}
            </Text>
          </Grid>
        </Container>
      </section>

      <section aria-labelledby="studio-view-heading" className={styles.section} data-theme="light">
        <Container>
          <Grid className={styles.sectionHeader}>
            <Text className={styles.index} variant="label">
              02 / Point of view
            </Text>
            <Heading id="studio-view-heading" level={2} variant="heading-xl">
              The storefront should carry the same conviction as the product.
            </Heading>
            <Text className={styles.sectionCopy} variant="body-lg">
              {page.pointOfView}
            </Text>
          </Grid>
        </Container>
      </section>

      <section aria-labelledby="studio-work-heading" className={styles.section} data-theme="dark">
        <Container>
          <Grid className={styles.sectionHeader}>
            <Text className={styles.index} variant="label">
              03 / What we do
            </Text>
            <Heading id="studio-work-heading" level={2} variant="heading-xl">
              Two ways to build with ORVAUXE.
            </Heading>
          </Grid>
          <Grid className={styles.offerGrid}>
            <article>
              <Text variant="label">Editions</Text>
              <Heading level={3} variant="heading-md">
                Curated storefront systems.
              </Heading>
              <Text variant="body-md">
                A defined art-direction and commerce foundation, adapted to the brand and
                implemented in Shopify.
              </Text>
              <Link className={styles.editorialAction} href="/editions" variant="navigation">
                Explore Editions
              </Link>
            </article>
            <article>
              <Text variant="label">Atelier</Text>
              <Heading level={3} variant="heading-md">
                Bespoke commerce systems.
              </Heading>
              <Text variant="body-md">{page.operatingModel}</Text>
              <Link className={styles.editorialAction} href="/atelier" variant="navigation">
                Discover Atelier
              </Link>
            </article>
          </Grid>
        </Container>
      </section>

      <section
        aria-labelledby="studio-proof-heading"
        className={`${styles.section} ${styles.commerceProof}`}
        data-theme="light"
      >
        <Container>
          <Grid className={styles.proofGrid} data-motion-reveal data-motion-variant="composition">
            <div className={styles.proofIdentity} data-motion-part="heading">
              <Text className={styles.index} variant="label">
                04 / Selected commerce experience
              </Text>
              <Heading id="studio-proof-heading" level={2} variant="heading-xl">
                Retail Commerce Platform
              </Heading>
              <Text variant="label">Custom commerce</Text>
            </div>
            <div className={styles.proofCopy} data-motion-part="body">
              <Text variant="body-lg">{publicTrustContent(page.trustContent)}</Text>
              <Text variant="body-sm">
                An anonymous technical proof of engineering range—not a Nocturne client case or a
                luxury art-direction claim.
              </Text>
            </div>
          </Grid>
          <ul
            aria-label="Verified commerce platform capabilities"
            className={styles.technologyList}
          >
            <li>Next.js</li>
            <li>Laravel</li>
            <li>Payments / checkout</li>
            <li>Receipt / fiscal support</li>
          </ul>
        </Container>
      </section>

      <section aria-labelledby="studio-origin-heading" className={styles.origin} data-theme="dark">
        <Container>
          <Grid className={styles.originGrid}>
            <figure className={styles.originMedia} data-motion-reveal data-motion-variant="proof">
              <Image
                alt="Contemporary concrete and glass architecture reflected after rain."
                fill
                loading="lazy"
                sizes="(min-width: 96rem) 60rem, (min-width: 64rem) 62vw, 100vw"
                src="/media/studio/studio-architecture-study-temporary.webp"
              />
            </figure>
            <div className={styles.originCopy}>
              <Text className={styles.index} variant="label">
                05 / Origin
              </Text>
              <Heading id="studio-origin-heading" level={2} variant="heading-xl">
                Chengdu · Worldwide
              </Heading>
              <Text variant="body-lg">{page.origin}</Text>
            </div>
          </Grid>
        </Container>
      </section>

      <section
        aria-labelledby="studio-principles-heading"
        className={styles.section}
        data-theme="light"
      >
        <Container>
          <Grid className={styles.sectionHeader}>
            <Text className={styles.index} variant="label">
              06 / Principles
            </Text>
            <Heading id="studio-principles-heading" level={2} variant="heading-xl">
              A quiet technology, a distinct result.
            </Heading>
          </Grid>
          <ol className={styles.principleList}>
            {principles.map((principle, index) => (
              <li key={principle}>
                <Text as="span" variant="caption">
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Text as="span" variant="body-lg">
                  {principle}
                </Text>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="studio-final-heading" className={styles.finalCta} data-theme="dark">
        <Container>
          <Grid className={styles.finalGrid} data-motion-reveal data-motion-variant="composition">
            <Heading
              data-motion-part="heading"
              id="studio-final-heading"
              level={2}
              variant="display-lg"
            >
              Have a brand worth building for?
            </Heading>
            <div className={styles.finalCopy} data-motion-part="body">
              <Text variant="body-lg">
                Tell us what the storefront needs to express, sell and make easier to operate.
              </Text>
              <Link
                className={styles.editorialAction}
                data-arrow="project"
                href={page.contactCta.href}
                variant="navigation"
              >
                {page.contactCta.label}
              </Link>
            </div>
          </Grid>
        </Container>
      </section>
    </main>
  );
}

import { Container, Grid, Heading, Link, Text } from "@orvauxe/ui";
import Image from "next/image";

import type { AtelierPage } from "../model/atelier-page";
import { AtelierViewTracker } from "./AtelierAnalytics.client";
import styles from "./AtelierScreen.module.css";

export interface AtelierScreenProps {
  readonly page: AtelierPage;
}

export function AtelierScreen({ page }: AtelierScreenProps) {
  return (
    <main
      className={styles.screen}
      data-content-source={page.contentSource}
      id="main-content"
      tabIndex={-1}
    >
      <AtelierViewTracker />

      <section aria-labelledby="atelier-heading" className={styles.hero} data-theme="dark">
        <Container>
          <Grid className={styles.heroGrid}>
            <Text className={styles.index} variant="label">
              01 / Atelier
            </Text>
            <div className={styles.heroIdentity}>
              <Text variant="label">Bespoke commerce</Text>
              <Heading id="atelier-heading" level={1} variant="display-lg">
                {page.heroHeading}
              </Heading>
            </div>
            <div className={styles.heroCopy}>
              <Text variant="body-lg">{page.heroCopy}</Text>
              <Text className={styles.price} variant="label">
                From $6,000
              </Text>
              <Link
                className={styles.editorialAction}
                data-arrow="project"
                href={page.cta.href}
                variant="navigation"
              >
                Start a Project
              </Link>
            </div>
          </Grid>
        </Container>
      </section>

      <section aria-labelledby="atelier-fit-heading" className={styles.section} data-theme="light">
        <Container>
          <Grid className={styles.sectionHeader}>
            <Text className={styles.index} variant="label">
              02 / When Atelier
            </Text>
            <Heading id="atelier-fit-heading" level={2} variant="heading-xl">
              The system follows the brief.
            </Heading>
            <Text className={styles.sectionCopy} variant="body-lg">
              {page.serviceExplanation}
            </Text>
          </Grid>
        </Container>
      </section>

      <section
        aria-labelledby="atelier-capabilities-heading"
        className={styles.section}
        data-theme="dark"
      >
        <Container>
          <Grid className={styles.sectionHeader}>
            <Text className={styles.index} variant="label">
              03 / What changes
            </Text>
            <Heading id="atelier-capabilities-heading" level={2} variant="heading-xl">
              Built around what makes the business distinct.
            </Heading>
          </Grid>
          <ol className={styles.capabilityList}>
            {page.capabilities.map((capability, index) => (
              <li key={capability}>
                <Text as="span" variant="caption">
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Text as="span" variant="body-lg">
                  {capability}
                </Text>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        aria-labelledby="atelier-process-heading"
        className={styles.section}
        data-theme="light"
      >
        <Container>
          <Grid className={styles.sectionHeader}>
            <Text className={styles.index} variant="label">
              04 / Process
            </Text>
            <Heading id="atelier-process-heading" level={2} variant="heading-xl">
              From direction to launch.
            </Heading>
          </Grid>
          <ol className={styles.processList}>
            {page.processSteps.map((step, index) => (
              <li key={step.title}>
                <Text className={styles.processIndex} variant="caption">
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Heading level={3} variant="heading-md">
                  {step.title}
                </Heading>
                <Text variant="body-sm">{step.description}</Text>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        aria-labelledby="atelier-choice-heading"
        className={styles.section}
        data-theme="dark"
      >
        <Container>
          <Grid className={styles.sectionHeader}>
            <Text className={styles.index} variant="label">
              05 / Editions or Atelier
            </Text>
            <Heading id="atelier-choice-heading" level={2} variant="heading-xl">
              Choose the right degree of authorship.
            </Heading>
          </Grid>
          <Grid className={styles.comparisonGrid}>
            <article>
              <Text variant="label">Editions</Text>
              <Heading level={3} variant="heading-md">
                A directed foundation, adapted.
              </Heading>
              <Text variant="body-md">
                For brands aligned with an existing art direction and a defined Shopify system.
              </Text>
              <Link className={styles.editorialAction} href="/editions" variant="navigation">
                Explore Editions
              </Link>
            </article>
            <article>
              <Text variant="label">Atelier</Text>
              <Heading level={3} variant="heading-md">
                A new system, created for the brief.
              </Heading>
              <Text variant="body-md">
                For custom direction, information architecture, product logic and integration depth.
              </Text>
            </article>
          </Grid>
        </Container>
      </section>

      <section className={styles.material} data-theme="light">
        <Container>
          <figure className={styles.materialFigure}>
            <Image
              alt="Ivory tailoring material and black structural forms arranged as an atelier study."
              fill
              loading="lazy"
              sizes="(min-width: 96rem) 96rem, 100vw"
              src="/media/home-campaign-atelier-temporary.webp"
            />
            <figcaption>
              <Text as="span" variant="caption">
                06 / Material direction
              </Text>
              <Text as="span" variant="caption">
                Original ORVAUXE study
              </Text>
            </figcaption>
          </figure>
        </Container>
      </section>

      <section
        aria-labelledby="atelier-final-heading"
        className={styles.finalCta}
        data-theme="light"
      >
        <Container>
          <Grid className={styles.finalGrid}>
            <Heading id="atelier-final-heading" level={2} variant="display-lg">
              Build with the Atelier.
            </Heading>
            <div className={styles.finalCopy}>
              <Text variant="body-lg">{page.commercialCopy}</Text>
              <Link
                className={styles.editorialAction}
                data-arrow="project"
                href={page.cta.href}
                variant="navigation"
              >
                {page.cta.label}
              </Link>
            </div>
          </Grid>
        </Container>
      </section>
    </main>
  );
}

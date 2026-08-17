import { Container, Grid, Heading, Link, Text } from "@orvauxe/ui";

import type { Edition } from "../model/edition";
import { isNocturneEdition } from "../model/edition";
import { TrackedEditionStartLink } from "./EditionAnalytics.client";
import styles from "./Editions.module.css";
import { NocturneStorefront } from "./NocturneStorefront";

export interface EditionIndexScreenProps {
  editions: Edition[];
}

const deliveryStages = ["Ready to Build", "Adapt", "Build", "Review", "Launch"] as const;

export function EditionIndexScreen({ editions }: EditionIndexScreenProps) {
  const featured = editions.find(isNocturneEdition) ?? editions[0] ?? null;
  const remainingEditions = featured
    ? editions.filter((edition) => edition.id !== featured.id)
    : editions;

  return (
    <main className={styles.screen} id="main-content" tabIndex={-1}>
      <section aria-labelledby="editions-heading" className={styles.indexHero} data-theme="light">
        <Container>
          <Grid className={styles.indexHeroGrid}>
            <Text className={styles.eyebrow} variant="label">
              01 / Editions
            </Text>
            <Heading
              className={styles.indexHeading}
              id="editions-heading"
              level={1}
              variant="display-lg"
            >
              Curated commerce, ready to become yours.
            </Heading>
            <div className={styles.indexLead}>
              <Text variant="body-lg">
                Premium Shopify storefront systems adapted to your brand and launched on a defined
                foundation.
              </Text>
              {featured ? (
                <Text className={styles.price} variant="label">
                  {featured.startingPrice}
                </Text>
              ) : null}
              <div className={styles.actionRow}>
                {featured ? (
                  <Link
                    className={styles.editorialAction}
                    href={`/editions/${encodeURIComponent(featured.slug)}`}
                    variant="navigation"
                  >
                    Explore {featured.name}
                  </Link>
                ) : null}
                <TrackedEditionStartLink
                  className={styles.editorialAction}
                  data-arrow="project"
                  href="/start-a-project"
                  placement="editions_hero"
                  variant="navigation"
                >
                  Start a Project
                </TrackedEditionStartLink>
              </div>
            </div>
          </Grid>

          {featured ? (
            <div className={styles.indexProof}>
              <NocturneStorefront
                edition={featured}
                kind="home"
                sizes="(min-width: 96rem) 96rem, (min-width: 64rem) 92vw, 100vw"
              />
            </div>
          ) : null}
        </Container>
      </section>

      <section
        aria-labelledby="edition-definition-heading"
        className={`${styles.sectionMajor} ${styles.definition}`}
        data-theme="dark"
      >
        <Container>
          <Grid className={styles.sectionHeader}>
            <Text className={styles.sectionIndex} variant="label">
              02 / What an Edition is
            </Text>
            <Heading
              className={styles.sectionHeading}
              id="edition-definition-heading"
              level={2}
              variant="heading-xl"
            >
              A directed system, adapted to the brand.
            </Heading>
            <div className={styles.sectionCopy}>
              <Text variant="body-lg">
                An ORVAUXE Edition is a curated premium Shopify storefront with a fixed
                art-direction foundation, shaped around approved brand assets and launched as a
                functioning native theme implementation.
              </Text>
              <Text variant="body-sm">
                It is not a downloadable template, a cosmetic off-the-shelf theme installation or an
                unrestricted custom design project.
              </Text>
            </div>
          </Grid>
          <ol className={styles.signalList}>
            <li>
              <Text className={styles.listNumber} variant="caption">
                01
              </Text>
              <strong>Named foundation</strong>
              <Text variant="body-sm">A defined product system with its own point of view.</Text>
            </li>
            <li>
              <Text className={styles.listNumber} variant="caption">
                02
              </Text>
              <strong>Controlled adaptation</strong>
              <Text variant="body-sm">Your identity enters without dissolving the Edition.</Text>
            </li>
            <li>
              <Text className={styles.listNumber} variant="caption">
                03
              </Text>
              <strong>Native Shopify</strong>
              <Text variant="body-sm">
                Merchant-editable, operationally direct and built to hand off.
              </Text>
            </li>
          </ol>
        </Container>
      </section>

      {featured ? (
        <section
          aria-labelledby="featured-edition-heading"
          className={`${styles.sectionMajor} ${styles.featured}`}
          data-theme="light"
        >
          <Container>
            <Grid className={styles.sectionHeader}>
              <Text className={styles.sectionIndex} variant="label">
                03 / Featured Edition
              </Text>
              <Heading
                className={styles.sectionHeading}
                id="featured-edition-heading"
                level={2}
                variant="heading-xl"
              >
                {featured.name}
              </Heading>
              <Text className={styles.sectionCopy} variant="body-lg">
                {featured.intro}
              </Text>
            </Grid>
            <Grid className={styles.featuredGrid}>
              <div className={styles.featuredVisual}>
                <NocturneStorefront
                  edition={featured}
                  kind="product"
                  sizes="(min-width: 96rem) 64rem, (min-width: 64rem) 66vw, (min-width: 48rem) 62vw, 100vw"
                />
              </div>
              <div className={styles.featuredDetails}>
                <dl className={styles.metadata}>
                  <div>
                    <dt>Edition</dt>
                    <dd>{featured.numberLabel}</dd>
                  </div>
                  <div>
                    <dt>Category</dt>
                    <dd>{featured.category}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>
                      {featured.originLabel} · {featured.statusLabel}
                    </dd>
                  </div>
                  <div>
                    <dt>Platform</dt>
                    <dd>{featured.platform}</dd>
                  </div>
                </dl>
                <Heading className={styles.featuredName} level={3} variant="heading-lg">
                  Edition 001 / {featured.name}
                </Heading>
                <Text variant="body-md">
                  A cinematic storefront system for fashion and accessories with editorial pacing,
                  precise merchandising and premium mobile commerce.
                </Text>
                <Text className={styles.price} variant="label">
                  {featured.startingPrice}
                </Text>
                <Link
                  className={styles.editorialAction}
                  href={`/editions/${encodeURIComponent(featured.slug)}`}
                  variant="navigation"
                >
                  Explore {featured.name}
                </Link>
              </div>
            </Grid>

            {remainingEditions.length > 0 ? (
              <ul aria-label="Other Editions" className={styles.catalogueList}>
                {remainingEditions.map((edition) => (
                  <li key={edition.id}>
                    <Link
                      className={styles.catalogueLink}
                      href={`/editions/${encodeURIComponent(edition.slug)}`}
                    >
                      <Text as="span" variant="caption">
                        {edition.numberLabel}
                      </Text>
                      <Text as="span" variant="body-lg">
                        {edition.name}
                      </Text>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </Container>
        </section>
      ) : (
        <section className={styles.section} data-theme="light">
          <Container>
            <Text className={styles.emptyState} variant="body-lg">
              For a bespoke commerce system, explore ORVAUXE Atelier.
            </Text>
          </Container>
        </section>
      )}

      {featured ? (
        <section
          aria-labelledby="included-heading"
          className={`${styles.sectionMajor} ${styles.included}`}
          data-theme="dark"
        >
          <Container>
            <Grid className={styles.sectionHeader}>
              <Text className={styles.sectionIndex} variant="label">
                04 / What is included
              </Text>
              <Heading
                className={styles.sectionHeading}
                id="included-heading"
                level={2}
                variant="heading-xl"
              >
                What an Edition includes.
              </Heading>
              <Text className={styles.sectionCopy} variant="body-lg">
                The essential storefront experiences arrive as one directed commerce system, not a
                collection of unrelated page designs.
              </Text>
            </Grid>
            <Grid className={styles.includedGrid}>
              <div className={styles.includedPreview}>
                <NocturneStorefront
                  edition={featured}
                  kind="collection"
                  sizes="(min-width: 96rem) 64rem, (min-width: 64rem) 66vw, (min-width: 48rem) 62vw, 100vw"
                />
              </div>
              <div className={styles.includedContent}>
                <ol className={styles.experienceList}>
                  {featured.includedExperiences.map((experience, index) => (
                    <li key={experience}>
                      <Text className={styles.listNumber} variant="caption">
                        {String(index + 1).padStart(2, "0")}
                      </Text>
                      <Text variant="body-md">{experience}</Text>
                    </li>
                  ))}
                </ol>
                <Heading className={styles.foundationHeading} level={3} variant="heading-md">
                  Native foundation.
                </Heading>
                <ul className={styles.foundationList}>
                  {featured.technicalFoundation.slice(0, 4).map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </div>
            </Grid>
          </Container>
        </section>
      ) : null}

      {featured ? (
        <section
          aria-labelledby="adaptation-heading"
          className={`${styles.sectionMajor} ${styles.adaptation}`}
          data-theme="light"
        >
          <Container>
            <Grid className={styles.sectionHeader}>
              <Text className={styles.sectionIndex} variant="label">
                05 / Adaptation
              </Text>
              <Heading
                className={styles.sectionHeading}
                id="adaptation-heading"
                level={2}
                variant="heading-xl"
              >
                The system stays. Your brand enters.
              </Heading>
              <Text className={styles.sectionCopy} variant="body-lg">
                Adaptation gives the Edition a brand-specific expression while protecting the
                architecture and product experience that make it coherent.
              </Text>
            </Grid>
            <Grid className={styles.adaptationGrid}>
              <article className={styles.adaptationColumn}>
                <Text variant="label">The system stays</Text>
                <Heading level={3} variant="heading-md">
                  Recognizably the Edition.
                </Heading>
                <ul className={styles.adaptationList}>
                  {featured.adaptation.systemStays.slice(0, 6).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className={styles.adaptationColumn}>
                <Text variant="label">Your brand enters</Text>
                <Heading level={3} variant="heading-md">
                  Distinctly yours.
                </Heading>
                <ul className={styles.adaptationList}>
                  {featured.adaptation.brandCanAdapt.slice(0, 6).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </Grid>
          </Container>
        </section>
      ) : null}

      {featured ? (
        <section aria-labelledby="delivery-heading" className={styles.delivery} data-theme="light">
          <div aria-hidden="true" className={styles.deliveryBand} />
          <Container className={styles.sectionMajor}>
            <Grid className={styles.sectionHeader}>
              <Text className={styles.sectionIndex} variant="label">
                06 / Delivery
              </Text>
              <Heading
                className={styles.sectionHeading}
                id="delivery-heading"
                level={2}
                variant="heading-xl"
              >
                From Ready to Build to launch.
              </Heading>
              <div className={styles.sectionCopy}>
                <Text variant="body-lg">
                  The target begins when approved scope, access, brand assets, content and product
                  data are ready for implementation.
                </Text>
                <Text className={styles.deliveryTarget} variant="label">
                  Target {featured.deliveryTarget}
                </Text>
                <Text variant="body-sm">
                  Includes {featured.revisionRounds} consolidated revision rounds and a{" "}
                  {featured.defectCorrectionDays}-day implementation-defect correction window.
                </Text>
              </div>
            </Grid>
            <ol className={styles.deliveryStages}>
              {deliveryStages.map((stage, index) => (
                <li key={stage}>
                  <Text className={styles.listNumber} variant="caption">
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <Text variant="label">{stage}</Text>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      ) : null}

      <section
        aria-labelledby="comparison-heading"
        className={`${styles.sectionMajor} ${styles.comparison}`}
        data-theme="dark"
      >
        <Container>
          <Grid className={styles.sectionHeader}>
            <Text className={styles.sectionIndex} variant="label">
              07 / Product fit
            </Text>
            <Heading
              className={styles.sectionHeading}
              id="comparison-heading"
              level={2}
              variant="heading-xl"
            >
              Editions or Atelier.
            </Heading>
            <Text className={styles.sectionCopy} variant="body-lg">
              Two considered ways to build. The difference is whether the right foundation already
              exists.
            </Text>
          </Grid>
          <Grid className={styles.comparisonGrid}>
            <article className={styles.comparisonColumn}>
              <Text variant="label">Editions</Text>
              <Heading level={3} variant="heading-md">
                A selected system, adapted.
              </Heading>
              <Text variant="body-md">
                Fixed art direction, defined architecture, controlled customization and a faster
                path to launch.
              </Text>
              <Text className={styles.price} variant="label">
                From $2,490
              </Text>
            </article>
            <article className={styles.comparisonColumn}>
              <Text variant="label">Atelier</Text>
              <Heading level={3} variant="heading-md">
                A new system, created for the brief.
              </Heading>
              <Text variant="body-md">
                Bespoke direction, custom information architecture, unusual commerce logic and
                expanded integrations.
              </Text>
              <Text className={styles.price} variant="label">
                From $6,000
              </Text>
              <Link className={styles.editorialAction} href="/atelier" variant="navigation">
                Discover Atelier
              </Link>
            </article>
          </Grid>
        </Container>
      </section>

      <section
        aria-labelledby="editions-final-heading"
        className={styles.finalCta}
        data-theme="light"
      >
        <Container>
          <Grid className={styles.finalGrid}>
            <Heading
              className={styles.finalHeading}
              id="editions-final-heading"
              level={2}
              variant="display-lg"
            >
              Choose the foundation. Bring the brand.
            </Heading>
            <div className={styles.finalCopy}>
              <Text variant="body-lg">
                Tell us what you are building and whether a named Edition already feels like the
                right place to begin.
              </Text>
              <TrackedEditionStartLink
                className={styles.editorialAction}
                data-arrow="project"
                href="/start-a-project"
                placement="editions_final"
                variant="navigation"
              >
                Start a Project
              </TrackedEditionStartLink>
            </div>
          </Grid>
        </Container>
      </section>
    </main>
  );
}

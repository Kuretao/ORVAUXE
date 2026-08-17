import { Container, Grid, Heading, Link, Text } from "@orvauxe/ui";
import Image from "next/image";

import type { Edition } from "../model/edition";
import { EditionViewTracker, TrackedEditionStartLink } from "./EditionAnalytics.client";
import styles from "./Editions.module.css";
import { NocturneStorefront } from "./NocturneStorefront";

interface NocturneEditionScreenProps {
  readonly edition: Edition;
}

export function NocturneEditionScreen({ edition }: NocturneEditionScreenProps) {
  return (
    <main className={styles.screen} id="main-content" tabIndex={-1}>
      <EditionViewTracker
        category={edition.category}
        editionNumber={edition.editionNumber}
        slug={edition.slug}
      />

      <section aria-labelledby="nocturne-heading" className={styles.nocturneHero} data-theme="dark">
        <div className={styles.nocturneHeroMedia}>
          <Image
            alt={edition.heroMedia.decorative ? "" : edition.heroMedia.alt}
            fill
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
            src={edition.heroMedia.src}
            style={{ objectPosition: edition.heroMedia.objectPosition }}
          />
        </div>
        <Container className={styles.nocturneHeroFrame}>
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
          <Grid className={styles.nocturneHeroGrid}>
            <div className={styles.nocturneHeroIdentity}>
              <Text className={styles.kicker} variant="label">
                {edition.numberLabel} / {edition.originLabel}
              </Text>
              <Heading
                className={styles.nocturneHeroTitle}
                id="nocturne-heading"
                level={1}
                variant="display-xl"
              >
                {edition.name}
              </Heading>
            </div>
            <div className={styles.nocturneHeroCopy}>
              <dl className={styles.metadata}>
                <div>
                  <dt>Category</dt>
                  <dd>{edition.category}</dd>
                </div>
                <div>
                  <dt>Platform</dt>
                  <dd>{edition.platform}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{edition.statusLabel}</dd>
                </div>
              </dl>
              <Text variant="body-lg">{edition.intro}</Text>
              <Text className={styles.price} variant="label">
                {edition.startingPrice}
              </Text>
              <TrackedEditionStartLink
                className={styles.editorialAction}
                data-arrow="project"
                editionSlug={edition.slug}
                href={edition.cta.href}
                placement="nocturne_hero"
                variant="navigation"
              >
                {edition.cta.label}
              </TrackedEditionStartLink>
            </div>
          </Grid>
        </Container>
      </section>

      <section
        aria-labelledby="nocturne-position-heading"
        className={`${styles.sectionMajor} ${styles.productPosition}`}
        data-theme="light"
      >
        <Container>
          <Grid className={styles.sectionHeader}>
            <Text className={styles.sectionIndex} variant="label">
              02 / Product position
            </Text>
            <Heading
              className={`${styles.sectionHeading} ${styles.productPositionHeading}`}
              id="nocturne-position-heading"
              level={2}
              variant="heading-xl"
            >
              A fashion storefront built in shadow and structure.
            </Heading>
            <div className={styles.sectionCopy}>
              <Text variant="body-lg">
                Nocturne brings campaign hierarchy, exact product merchandising and a focused
                purchase path into one native Shopify system.
              </Text>
              <Text variant="body-sm">
                Presented as an ORVAUXE Original and Concept Edition: a coherent product study for
                controlled brand adaptation.
              </Text>
            </div>
          </Grid>
        </Container>
      </section>

      <section
        aria-labelledby="nocturne-experience-heading"
        className={`${styles.sectionMajor} ${styles.experience}`}
        data-theme="light"
      >
        <Container>
          <Grid className={styles.sectionHeader}>
            <Text className={styles.sectionIndex} variant="label">
              03 / Storefront experience
            </Text>
            <Heading
              className={styles.sectionHeading}
              id="nocturne-experience-heading"
              level={2}
              variant="heading-xl"
            >
              The storefront experience.
            </Heading>
            <Text className={styles.sectionCopy} variant="body-lg">
              From campaign entry to product choice, each view belongs to the same visual and
              commercial system.
            </Text>
          </Grid>

          <div className={styles.experiencePrimary}>
            <NocturneStorefront
              edition={edition}
              kind="home"
              sizes="(min-width: 96rem) 96rem, (min-width: 64rem) 92vw, 100vw"
            />
          </div>

          <div className={styles.experienceCollection}>
            <NocturneStorefront
              edition={edition}
              kind="collection"
              sizes="(min-width: 96rem) 72rem, (min-width: 64rem) 72vw, (min-width: 48rem) 84vw, 100vw"
            />
          </div>

          <Grid className={styles.experiencePair}>
            <div className={styles.experienceProduct}>
              <NocturneStorefront
                edition={edition}
                kind="product"
                sizes="(min-width: 96rem) 64rem, (min-width: 64rem) 66vw, (min-width: 48rem) 62vw, 100vw"
              />
            </div>
            <div className={styles.experienceMobile}>
              <NocturneStorefront
                edition={edition}
                kind="mobile"
                sizes="(min-width: 96rem) 20rem, (min-width: 64rem) 22vw, (min-width: 48rem) 32vw, 72vw"
              />
            </div>
          </Grid>
        </Container>
      </section>

      <section
        aria-labelledby="nocturne-dna-heading"
        className={`${styles.sectionMajor} ${styles.designDna}`}
        data-theme="dark"
      >
        <Container>
          <Grid className={styles.sectionHeader}>
            <Text className={styles.sectionIndex} variant="label">
              04 / Design DNA
            </Text>
            <Heading
              className={styles.sectionHeading}
              id="nocturne-dna-heading"
              level={2}
              variant="heading-xl"
            >
              What remains Nocturne.
            </Heading>
            <Text className={styles.sectionCopy} variant="body-lg">
              The Edition stays recognizable because its hierarchy, pacing and commerce logic are
              product decisions rather than optional styling.
            </Text>
          </Grid>
          <ol className={styles.dnaList}>
            {edition.designDna.map((item, index) => (
              <li key={item}>
                <Text className={styles.listNumber} variant="caption">
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Text variant="body-md">{item}</Text>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        aria-labelledby="nocturne-adaptation-heading"
        className={`${styles.sectionMajor} ${styles.adaptation}`}
        data-theme="light"
      >
        <Container>
          <Grid className={styles.sectionHeader}>
            <Text className={styles.sectionIndex} variant="label">
              05 / Controlled adaptation
            </Text>
            <Heading
              className={styles.sectionHeading}
              id="nocturne-adaptation-heading"
              level={2}
              variant="heading-xl"
            >
              What can change.
            </Heading>
            <Text className={styles.sectionCopy} variant="body-lg">
              Approved identity, imagery and content enter through a controlled adaptation. A new
              art direction belongs to Atelier.
            </Text>
          </Grid>
          <Grid className={styles.adaptationGrid}>
            <article className={styles.adaptationColumn}>
              <Text variant="label">The system stays</Text>
              <Heading level={3} variant="heading-md">
                Structure and product logic.
              </Heading>
              <ul className={styles.adaptationList}>
                {edition.adaptation.systemStays.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className={styles.adaptationColumn}>
              <Text variant="label">The brand adapts</Text>
              <Heading level={3} variant="heading-md">
                Identity and product world.
              </Heading>
              <ul className={styles.adaptationList}>
                {edition.adaptation.brandCanAdapt.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </Grid>
        </Container>
      </section>

      <section
        aria-labelledby="nocturne-scope-heading"
        className={`${styles.sectionMajor} ${styles.scope}`}
        data-theme="dark"
      >
        <Container>
          <Grid className={styles.scopeGrid}>
            <div className={styles.scopeIntroduction}>
              <Text className={styles.sectionIndex} variant="label">
                06 / Delivery and scope
              </Text>
              <Heading id="nocturne-scope-heading" level={2} variant="heading-xl">
                A defined route to launch.
              </Heading>
              <Text variant="body-lg">
                The clock begins at Ready to Build, after scope, access, brand assets, content,
                product data and required approvals are complete.
              </Text>
            </div>
            <div className={styles.scopeFacts}>
              <ul className={styles.scopeList}>
                <li>
                  <Text className={styles.factLabel} variant="caption">
                    Starting price
                  </Text>
                  <Text as="span" variant="body-md">
                    {edition.startingPrice}
                  </Text>
                </li>
                <li>
                  <Text className={styles.factLabel} variant="caption">
                    Target
                  </Text>
                  <Text as="span" variant="body-md">
                    {edition.deliveryTarget}
                  </Text>
                </li>
                <li>
                  <Text className={styles.factLabel} variant="caption">
                    Revisions
                  </Text>
                  <Text as="span" variant="body-md">
                    {edition.revisionRounds} consolidated rounds
                  </Text>
                </li>
                <li>
                  <Text className={styles.factLabel} variant="caption">
                    Defect window
                  </Text>
                  <Text as="span" variant="body-md">
                    {edition.defectCorrectionDays} days
                  </Text>
                </li>
                <li>
                  <Text className={styles.factLabel} variant="caption">
                    Initial market
                  </Text>
                  <Text as="span" variant="body-md">
                    One language, one market, one core currency/store setup
                  </Text>
                </li>
              </ul>
            </div>
          </Grid>
        </Container>
      </section>

      <section
        aria-labelledby="nocturne-final-heading"
        className={`${styles.sectionMajor} ${styles.nocturneFinal}`}
        data-theme="light"
      >
        <Container>
          <Grid className={styles.finalGrid}>
            <Heading
              className={styles.finalHeading}
              id="nocturne-final-heading"
              level={2}
              variant="display-lg"
            >
              Start with Nocturne.
            </Heading>
            <div className={styles.finalCopy}>
              <Text variant="body-lg">
                Tell us about the brand, the current Shopify store and what needs to be ready for
                launch.
              </Text>
              <TrackedEditionStartLink
                className={styles.editorialAction}
                data-arrow="project"
                editionSlug={edition.slug}
                href={edition.cta.href}
                placement="nocturne_final"
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

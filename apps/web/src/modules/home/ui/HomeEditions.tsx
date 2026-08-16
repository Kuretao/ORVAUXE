import { Container, Grid, Heading, Link, Text } from "@orvauxe/ui";

import type { HomePageData } from "../model/home-page";
import styles from "./Home.module.css";
import { HomeMediaFigure } from "./HomeMediaFigure";

interface HomeEditionsProps {
  editions: HomePageData["editions"];
}

export function HomeEditions({ editions }: HomeEditionsProps) {
  const featured = editions.featured;

  return (
    <section aria-labelledby="home-editions-heading" className={styles.editions} data-theme="light">
      <Container>
        <Grid className={styles.editionsIntroduction}>
          <Text className={styles.editionsKicker} variant="label">
            02 / Editions
          </Text>
          <Heading
            className={styles.editionsHeading}
            id="home-editions-heading"
            level={2}
            variant="heading-xl"
          >
            {editions.heading}
          </Heading>
          <div className={styles.editionsCopy}>
            <Text variant="body-lg">{editions.introduction}</Text>
            <Text className={styles.price} variant="label">
              {editions.price}
            </Text>
            <Link
              className={styles.editorialAction}
              data-arrow="forward"
              href={editions.indexHref}
              variant="navigation"
            >
              Explore Editions
            </Link>
          </div>
        </Grid>

        <article aria-labelledby="home-featured-edition-heading" className={styles.featuredEdition}>
          <Grid className={styles.featuredEditionGrid}>
            <div className={styles.featuredMediaColumn}>
              <HomeMediaFigure media={featured.media} />
            </div>
            <div className={styles.featuredEditionDetails}>
              <dl className={styles.editionMetadata}>
                <div>
                  <dt>Edition</dt>
                  <dd>{featured.numberLabel}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{featured.statusLabel}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{featured.category}</dd>
                </div>
              </dl>
              <Heading id="home-featured-edition-heading" level={3} variant="heading-lg">
                {featured.name}
              </Heading>
              <Text variant="body-md">{featured.copy}</Text>
            </div>
          </Grid>
        </article>
      </Container>
    </section>
  );
}

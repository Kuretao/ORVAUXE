import { Container, Grid, Heading, Link, Text } from "@orvauxe/ui";

import type { HomePageData } from "../model/home-page";
import styles from "./Home.module.css";

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
            03 / Editions
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
              {featured.startingPrice}
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

        <div className={styles.editionsCatalogue}>
          <Text as="span" variant="caption">
            {featured.numberLabel}
          </Text>
          <Heading level={3} variant="heading-lg">
            {featured.name}
          </Heading>
          <Text as="span" variant="label">
            {featured.category}
          </Text>
          <Text as="span" className={styles.editionsStatus} variant="caption">
            {featured.statusLabel}
          </Text>
        </div>
      </Container>
    </section>
  );
}

import { Container, Grid, Heading, Text } from "@orvauxe/ui";

import type { HomePageData } from "../model/home-page";
import styles from "./HomeProductStory.module.css";
import { HomeStorefrontSystemClient } from "./HomeStorefrontSystem.client";

interface HomeStorefrontSystemProps {
  edition: HomePageData["editions"]["featured"];
}

export function HomeStorefrontSystem({ edition }: HomeStorefrontSystemProps) {
  return (
    <section
      aria-labelledby="home-storefront-system-heading"
      className={styles.storefrontSystem}
      data-theme="light"
    >
      <Container>
        <Grid className={styles.storyHeader}>
          <Text className={styles.storyIndex} variant="label">
            05 / Storefront system
          </Text>
          <Heading
            className={styles.storyHeading}
            id="home-storefront-system-heading"
            level={2}
            variant="heading-xl"
          >
            A complete storefront system.
          </Heading>
          <div className={styles.storyCopy}>
            <Text className={styles.storyIntroduction} variant="body-lg">
              An Edition brings the essential commerce views into one directed system—adapted to the
              brand, coherent from campaign entry to purchase flow.
            </Text>
          </div>
        </Grid>

        <HomeStorefrontSystemClient edition={edition} />
      </Container>
    </section>
  );
}

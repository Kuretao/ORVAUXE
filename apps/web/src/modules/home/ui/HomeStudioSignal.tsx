import { Container, Divider, Grid, Heading, Text } from "@orvauxe/ui";

import type { HomePageData } from "../model/home-page";
import styles from "./Home.module.css";

interface HomeStudioSignalProps {
  studio: HomePageData["studio"];
}

export function HomeStudioSignal({ studio }: HomeStudioSignalProps) {
  return (
    <section aria-labelledby="home-studio-heading" className={styles.studio} data-theme="dark">
      <Container>
        <Divider className={styles.studioDivider} />
        <Grid className={styles.studioGrid}>
          <div className={styles.studioIdentity}>
            <Heading
              className={styles.studioHeading}
              id="home-studio-heading"
              level={2}
              variant="display-lg"
            >
              {studio.heading}
            </Heading>
            <Text variant="label">{studio.descriptor}</Text>
            <Text className={styles.studioOrigin} variant="caption">
              {studio.origin}
            </Text>
          </div>
          <Text className={styles.studioBody} variant="body-lg">
            {studio.body}
          </Text>
        </Grid>
      </Container>
    </section>
  );
}

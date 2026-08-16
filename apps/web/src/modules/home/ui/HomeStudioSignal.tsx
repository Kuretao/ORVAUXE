import { Container, Divider, Grid, Heading, Text } from "@orvauxe/ui";
import Image from "next/image";

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
        <Text className={styles.sectionIndex} variant="label">
          08 / Studio
        </Text>
        <Grid className={styles.studioGrid}>
          <figure className={styles.studioMedia}>
            <Image
              alt={
                studio.media?.alt ??
                "Contemporary concrete and glass architectural study reflected after rain."
              }
              fill
              loading="lazy"
              sizes="(min-width: 96rem) 62rem, (min-width: 64rem) 66vw, (min-width: 48rem) 62vw, 100vw"
              src={studio.media?.src ?? "/media/studio/studio-architecture-study-temporary.webp"}
              style={{ objectPosition: studio.media?.objectPosition ?? "48% 52%" }}
            />
          </figure>
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
          <div className={styles.studioCopy}>
            <Text className={styles.studioBody} variant="body-lg">
              {studio.body}
            </Text>
            <Text className={styles.studioSupporting} variant="caption">
              Based in Chengdu. Working worldwide.
            </Text>
          </div>
        </Grid>
      </Container>
    </section>
  );
}

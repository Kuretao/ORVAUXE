import { Container, Grid, Heading, Text } from "@orvauxe/ui";

import type { HomePageData } from "../model/home-page";
import styles from "./HomeProductStory.module.css";
import { NocturneStorefront } from "./NocturneStorefront";

interface HomeWhatWeBuildProps {
  edition: HomePageData["editions"]["featured"];
  content: HomePageData["whatWeBuild"];
}

export function HomeWhatWeBuild({ content, edition }: HomeWhatWeBuildProps) {
  return (
    <section
      aria-labelledby="home-what-we-build-heading"
      className={styles.whatWeBuild}
      data-theme="light"
    >
      <Container>
        <Grid className={styles.storyHeader}>
          <Text className={styles.storyIndex} variant="label">
            02 / Commerce systems
          </Text>
          <Heading
            className={styles.storyHeading}
            id="home-what-we-build-heading"
            level={2}
            variant="heading-xl"
          >
            {content.heading}
          </Heading>
          <div className={styles.storyCopy}>
            <Text className={styles.storyIntroduction} variant="body-lg">
              {content.introduction}
            </Text>
            <ul aria-label="Core storefront capabilities" className={styles.signalList}>
              {content.signals.map((signal) => (
                <li key={signal}>
                  <Text as="span" variant="label">
                    {signal}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </Grid>

        <div className={styles.productComposition}>
          <div className={styles.productCompositionDesktop}>
            <NocturneStorefront
              edition={edition}
              kind="home"
              sizes="(min-width: 96rem) 67rem, (min-width: 64rem) 72vw, (min-width: 48rem) 75vw, 100vw"
            />
          </div>
          <div className={styles.productCompositionMobile}>
            <NocturneStorefront
              edition={edition}
              kind="mobile"
              sizes="(min-width: 96rem) 18rem, (min-width: 64rem) 18vw, (min-width: 48rem) 26vw, 40vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

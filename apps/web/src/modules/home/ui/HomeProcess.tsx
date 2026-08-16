import { Container, Grid, Heading, Text } from "@orvauxe/ui";

import type { HomePageData } from "../model/home-page";
import styles from "./HomeProductStory.module.css";

interface HomeProcessProps {
  process: HomePageData["process"];
}

export function HomeProcess({ process }: HomeProcessProps) {
  return (
    <section aria-labelledby="home-process-heading" className={styles.process} data-theme="light">
      <Container>
        <Grid className={styles.storyHeader}>
          <Text className={styles.storyIndex} variant="label">
            07 / Process
          </Text>
          <Heading
            className={styles.storyHeading}
            id="home-process-heading"
            level={2}
            variant="heading-xl"
          >
            {process.heading}
          </Heading>
          <div className={styles.storyCopy}>
            <Text className={styles.storyIntroduction} variant="body-lg">
              A controlled path from the first direction to a considered Shopify launch.
            </Text>
          </div>
        </Grid>

        <ol className={styles.processDocument}>
          {process.steps.map((step, index) => (
            <li className={styles.processStage} key={`${index}-${step.title}`}>
              <Text aria-hidden="true" as="span" variant="caption">
                {String(index + 1).padStart(2, "0")}
              </Text>
              <div className={styles.processStageBody}>
                <Heading level={3} variant="heading-md">
                  {step.title}
                </Heading>
                <Text className={styles.processStageDescription} variant="body-md">
                  {step.description}
                </Text>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

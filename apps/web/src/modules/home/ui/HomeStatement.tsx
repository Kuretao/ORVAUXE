import { Container, Grid, Heading, Text } from "@orvauxe/ui";

import type { HomePageData } from "../model/home-page";
import styles from "./Home.module.css";

interface HomeStatementProps {
  statement: HomePageData["statement"];
}

export function HomeStatement({ statement }: HomeStatementProps) {
  return (
    <section
      aria-labelledby="home-statement-heading"
      className={styles.statement}
      data-theme="dark"
    >
      <Container>
        <Text className={styles.sectionIndex} variant="label">
          01 / Point of view
        </Text>
        <Grid className={styles.statementGrid}>
          <Heading
            className={styles.statementHeading}
            id="home-statement-heading"
            level={2}
            variant="display-lg"
          >
            {statement.heading}
          </Heading>
          <Text className={styles.statementBody} variant="body-lg">
            {statement.body}
          </Text>
        </Grid>
      </Container>
    </section>
  );
}

import { Container, Divider, Grid, Heading, Link, Text } from "@orvauxe/ui";

import type { HomePageData } from "../model/home-page";
import styles from "./Home.module.css";

interface HomeAtelierProps {
  atelier: HomePageData["atelier"];
}

export function HomeAtelier({ atelier }: HomeAtelierProps) {
  return (
    <section aria-labelledby="home-atelier-heading" className={styles.atelier} data-theme="dark">
      <Container>
        <Text className={styles.sectionIndex} variant="label">
          03 / Bespoke commerce
        </Text>
        <Grid className={styles.atelierIntroduction}>
          <Heading id="home-atelier-heading" level={2} variant="heading-xl">
            {atelier.heading}
          </Heading>
          <div className={styles.atelierCopy}>
            <Text variant="body-lg">{atelier.introduction}</Text>
            <Text className={styles.price} variant="label">
              {atelier.price}
            </Text>
            <Link href={atelier.cta.href} variant="navigation">
              {atelier.cta.label}
            </Link>
          </div>
        </Grid>

        <ol className={styles.capabilityList}>
          {atelier.capabilities.map((capability, index) => (
            <li key={`${index}-${capability}`}>
              <div className={styles.capabilityRow}>
                <Text
                  aria-hidden="true"
                  as="span"
                  className={styles.capabilityNumber}
                  variant="caption"
                >
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Text as="span" className={styles.capabilityName} variant="body-lg">
                  {capability}
                </Text>
              </div>
              {index < atelier.capabilities.length - 1 ? <Divider aria-hidden="true" /> : null}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

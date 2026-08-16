import { Container, Grid, Heading, Link, Text } from "@orvauxe/ui";

import type { HomePageData } from "../model/home-page";
import styles from "./Home.module.css";
import { TrackedHomeLink } from "./TrackedHomeLink.client";

interface HomeHeroProps {
  hero: HomePageData["hero"];
}

function heroHeadingLines(heading: string): readonly string[] {
  if (/^commerce\s+for\s+the\s+distinctive\.?$/i.test(heading.trim())) {
    return ["Commerce", "for the", "distinctive."];
  }

  const authoredLines = heading
    .split(/\r?\n|\s+\/\s+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return authoredLines.length > 0 ? authoredLines : [heading];
}

export function HomeHero({ hero }: HomeHeroProps) {
  const headingLines = heroHeadingLines(hero.heading);

  return (
    <div className={styles.hero} data-theme="light">
      <Container className={styles.heroFrame}>
        <div className={styles.heroMeta}>
          <Text as="span" variant="label">
            {hero.eyebrow}
          </Text>
        </div>

        <Heading
          aria-label={headingLines.join(" ")}
          className={styles.heroHeading}
          level={1}
          variant="display-lg"
        >
          {headingLines.map((line, index) => (
            <span aria-hidden="true" className={styles.heroHeadingLine} key={`${line}-${index}`}>
              {line}
            </span>
          ))}
        </Heading>

        <Grid className={styles.heroFooter}>
          <Text className={styles.heroCopy} variant="body-lg">
            {hero.copy}
          </Text>
          <div className={styles.heroActions}>
            <TrackedHomeLink
              className={styles.primaryLink}
              href={hero.primaryCta.href}
              placement="hero"
              variant="navigation"
            >
              {hero.primaryCta.label}
            </TrackedHomeLink>
            <Link href={hero.secondaryCta.href} variant="navigation">
              {hero.secondaryCta.label}
            </Link>
          </div>
        </Grid>
      </Container>
    </div>
  );
}

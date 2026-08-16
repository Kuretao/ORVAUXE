import { Container, Grid, Heading, Text } from "@orvauxe/ui";

import type { HomePageData } from "../model/home-page";
import styles from "./Home.module.css";
import { TrackedHomeLink } from "./TrackedHomeLink.client";

interface HomeProjectCtaProps {
  content: HomePageData["finalCta"];
}

function finalHeadingLines(heading: string): readonly string[] {
  if (/^have\s+a\s+brand\s+worth\s+building\s+for\?$/i.test(heading.trim())) {
    return ["Have a brand", "worth building for?"];
  }

  const authoredLines = heading
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return authoredLines.length > 0 ? authoredLines : [heading];
}

export function HomeProjectCta({ content }: HomeProjectCtaProps) {
  const headingLines = finalHeadingLines(content.heading);

  return (
    <section
      aria-labelledby="home-project-cta-heading"
      className={styles.projectCta}
      data-theme="light"
    >
      <Container className={styles.projectCtaFrame}>
        <Text variant="label">{content.eyebrow}</Text>
        <Heading
          aria-label={headingLines.join(" ")}
          className={styles.projectCtaHeading}
          id="home-project-cta-heading"
          level={2}
          variant="display-lg"
        >
          {headingLines.map((line, index) => (
            <span
              aria-hidden="true"
              className={styles.projectCtaHeadingLine}
              key={`${line}-${index}`}
            >
              {line}
            </span>
          ))}
        </Heading>
        <Grid className={styles.projectCtaFooter}>
          <Text className={styles.projectCtaBody} variant="body-lg">
            {content.body}
          </Text>
          <div className={styles.projectCtaAction}>
            <TrackedHomeLink
              className={`${styles.primaryLink} ${styles.editorialAction}`}
              data-arrow="project"
              href={content.cta.href}
              placement="final"
              variant="navigation"
            >
              {content.cta.label}
            </TrackedHomeLink>
          </div>
        </Grid>
      </Container>
    </section>
  );
}

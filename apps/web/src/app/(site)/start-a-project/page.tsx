import { Container, Grid, Heading, Text } from "@orvauxe/ui";
import type { Metadata } from "next";

import { StartProjectForm } from "@/modules/project-inquiry";
import { buildMetadata } from "@/seo/metadata/build-metadata";

import styles from "./StartProjectPage.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Start a Project",
  description:
    "Tell ORVAUXE about your brand, storefront and goals for an Edition or bespoke Atelier engagement.",
  pathname: "/start-a-project",
});

interface StartProjectPageProps {
  searchParams: Promise<{
    edition?: string | string[];
  }>;
}

export default async function StartProjectPage({ searchParams }: StartProjectPageProps) {
  const requestedEdition = (await searchParams).edition;
  const initialEditionSlug = requestedEdition === "nocturne" ? "nocturne" : undefined;

  return (
    <main className={styles.screen} id="main-content" tabIndex={-1}>
      <section aria-labelledby="project-heading" className={styles.hero} data-theme="dark">
        <Container>
          <Grid className={styles.heroGrid}>
            <Text className={styles.index} variant="label">
              Project inquiry
            </Text>
            <Heading id="project-heading" level={1} variant="display-lg">
              Tell us what you are building.
            </Heading>
            <div className={styles.heroCopy}>
              <Text variant="body-lg">
                Share the brand, the current storefront and what the next stage needs to accomplish.
              </Text>
              <Text variant="body-sm">
                A focused brief is enough. Do not send passwords, payment information, customer data
                or store access credentials through this form.
              </Text>
            </div>
          </Grid>
        </Container>
      </section>

      <section aria-labelledby="project-route-heading" className={styles.intake} data-theme="light">
        <Container>
          <Grid className={styles.routeHeader}>
            <Text className={styles.index} variant="label">
              Edition or Atelier
            </Text>
            <Heading id="project-route-heading" level={2} variant="heading-xl">
              Start from the right foundation.
            </Heading>
          </Grid>
          <Grid className={styles.routeGrid}>
            <article>
              <Text variant="label">Edition</Text>
              <Heading level={3} variant="heading-md">
                Adapt a directed system.
              </Heading>
              <Text variant="body-sm">
                Best when a named ORVAUXE Edition already aligns with the brand and launch needs.
              </Text>
            </article>
            <article>
              <Text variant="label">Atelier</Text>
              <Heading level={3} variant="heading-md">
                Create a bespoke system.
              </Heading>
              <Text variant="body-sm">
                Best for custom direction, architecture, product logic or deeper integrations.
              </Text>
            </article>
          </Grid>

          <Grid className={styles.formGrid}>
            <div className={styles.formIntroduction}>
              <Text variant="label">Your project</Text>
              <Heading level={2} variant="heading-lg">
                A calm first conversation.
              </Heading>
              <Text variant="body-md">
                Required fields are marked. Once the inquiry is accepted, ORVAUXE will review the
                fit and respond through the email you provide.
              </Text>
            </div>
            <div className={styles.formPanel}>
              <StartProjectForm {...(initialEditionSlug ? { initialEditionSlug } : {})} />
            </div>
          </Grid>
        </Container>
      </section>
    </main>
  );
}

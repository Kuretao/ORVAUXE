import { Container, Grid, Heading, Link, Text } from "@orvauxe/ui";
import Image from "next/image";

import type { HomeMedia, HomePageData, StorefrontViewKind } from "../model/home-page";
import actionStyles from "./Home.module.css";
import styles from "./HomeProductStory.module.css";
import { NocturneStorefront } from "./NocturneStorefront";

interface HomeNocturneShowcaseProps {
  edition: HomePageData["editions"]["featured"];
  indexHref: HomePageData["editions"]["indexHref"];
}

function viewMedia(
  edition: HomePageData["editions"]["featured"],
  kinds: readonly StorefrontViewKind[],
): HomeMedia | null {
  for (const kind of kinds) {
    const media = edition.storefrontViews.find((view) => view.kind === kind)?.media;
    if (media) return media;
  }

  return edition.media;
}

function ProofImage({
  className,
  media,
  sizes,
}: {
  className: string | undefined;
  media: HomeMedia | null;
  sizes: string;
}) {
  return (
    <div className={className}>
      {media ? (
        <Image
          alt={media.alt}
          fill
          loading="lazy"
          sizes={sizes}
          src={media.src}
          style={{ objectPosition: media.objectPosition }}
        />
      ) : null}
    </div>
  );
}

export function HomeNocturneShowcase({ edition, indexHref }: HomeNocturneShowcaseProps) {
  const campaignMedia = edition.media ?? viewMedia(edition, ["home", "collection"]);
  const productMedia = viewMedia(edition, ["product", "mobile", "collection"]);
  const detailMedia = viewMedia(edition, ["editorial", "cart", "product"]);
  const status =
    edition.statusLabel === "Concept Edition"
      ? "Concept Edition / ORVAUXE Original"
      : edition.statusLabel;

  return (
    <section aria-labelledby="home-nocturne-heading" className={styles.nocturne} data-theme="dark">
      <Container>
        <Grid className={styles.storyHeader}>
          <Text className={styles.storyIndex} variant="label">
            04 / {edition.numberLabel}
          </Text>
          <Heading
            className={`${styles.storyHeading} ${styles.nocturneTitle}`}
            id="home-nocturne-heading"
            level={2}
            variant="display-lg"
          >
            {edition.name}
          </Heading>
          <div className={styles.storyCopy}>
            <Text className={styles.storyIntroduction} variant="body-lg">
              {edition.copy}
            </Text>
            <Link
              className={actionStyles.editorialAction}
              data-arrow="forward"
              href={indexHref}
              variant="navigation"
            >
              Explore Editions
            </Link>
          </div>
        </Grid>

        <div className={styles.nocturneCampaign}>
          {campaignMedia ? (
            <Image
              alt={campaignMedia.alt}
              fill
              loading="lazy"
              sizes="100vw"
              src={campaignMedia.src}
              style={{ objectPosition: campaignMedia.objectPosition }}
            />
          ) : null}
          <div className={styles.nocturneCampaignLabel}>
            <Text as="span" variant="label">
              ORVAUXE Original
            </Text>
            <Text as="span" variant="caption">
              Concept product study
            </Text>
          </div>
        </div>

        <dl className={styles.nocturneMetadata}>
          <div>
            <dt>Edition</dt>
            <dd>{edition.numberLabel.replace("Edition ", "")}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{edition.category}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{status}</dd>
          </div>
          <div>
            <dt>Platform</dt>
            <dd>{edition.platform}</dd>
          </div>
        </dl>

        <Grid className={styles.nocturneProofGrid}>
          <div className={`${styles.nocturneStorefront} ${styles.nocturneStorefrontReveal}`}>
            <NocturneStorefront
              edition={edition}
              kind="product"
              sizes="(min-width: 96rem) 64rem, (min-width: 64rem) 66vw, (min-width: 48rem) 62vw, 100vw"
            />
          </div>
          <div className={styles.nocturneProductStory}>
            <Text className={styles.nocturnePositioning} variant="body-md">
              A brand-first fashion storefront study, carried from campaign entry to focused product
              detail and mobile commerce.
            </Text>
            <ProofImage
              className={styles.nocturneProductPhoto}
              media={productMedia}
              sizes="(min-width: 96rem) 24rem, (min-width: 64rem) 28vw, (min-width: 48rem) 36vw, 100vw"
            />
          </div>
        </Grid>

        <ProofImage
          className={styles.nocturneDetail}
          media={detailMedia}
          sizes="(min-width: 96rem) 96rem, 100vw"
        />
        <div className={styles.nocturneDetailCaption}>
          <Text as="span" variant="caption">
            Material detail / Nocturne study
          </Text>
          <Text as="span" variant="caption">
            Black silk · Brushed metal · Oxblood stitch
          </Text>
        </div>
      </Container>
    </section>
  );
}

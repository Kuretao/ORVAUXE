import { defineQuery } from "next-sanity";

const imageProjection = `
  decorative,
  alt,
  caption,
  credit,
  image {
    asset {
      _ref
    },
    "assetId": asset->_id,
    "assetUrl": asset->url,
    "dimensions": asset->metadata.dimensions {
      width,
      height,
      aspectRatio
    },
    crop {
      top,
      bottom,
      left,
      right
    },
    hotspot {
      x,
      y,
      width,
      height
    }
  }
`;

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    heroHeading,
    heroCopy,
    heroPrimaryCta {
      label,
      destinationKind,
      destination,
      analyticsId
    },
    heroSecondaryCta {
      label,
      destinationKind,
      destination,
      analyticsId
    },
    heroMedia {
      ${imageProjection}
    },
    statementHeading,
    serviceIntroduction,
    whatWeBuildHeading,
    whatWeBuildIntroduction,
    whatWeBuildSignals,
    editionsHeading,
    editionsIntroduction,
    "featuredEdition": selectedEditions[0]-> {
      name,
      "slug": slug.current,
      editionNumber,
      category,
      status,
      startingPrice,
      "intro": pt::text(intro),
      hero {
        ${imageProjection}
      },
      storefrontViews[] {
        kind,
        media {
          ${imageProjection}
        }
      }
    },
    atelierHeading,
    atelierIntroduction,
    atelierPrice,
    atelierCapabilities,
    atelierCta {
      label,
      destinationKind,
      destination,
      analyticsId
    },
    atelierCampaignMedia {
      ${imageProjection}
    },
    processHeading,
    processSteps[] {
      title,
      description
    },
    studioHeading,
    studioDescriptor,
    studioOrigin,
    studioBody,
    studioMedia {
      ${imageProjection}
    },
    finalCtaEyebrow,
    finalCtaHeading,
    finalCtaBody,
    closingCta {
      label,
      destinationKind,
      destination,
      analyticsId
    },
    seo {
      metaTitle,
      metaDescription,
      shareImage {
        ${imageProjection}
      },
      noIndex
    }
  }
`);

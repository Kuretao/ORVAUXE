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
    editionsHeading,
    editionsIntroduction,
    editionsPrice,
    "featuredEdition": selectedEditions[0]-> {
      name,
      editionNumber,
      category,
      status,
      "intro": pt::text(intro),
      hero {
        ${imageProjection}
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
    studioHeading,
    studioDescriptor,
    studioOrigin,
    studioBody,
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

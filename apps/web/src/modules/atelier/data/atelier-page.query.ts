import { defineQuery } from "next-sanity";

export const atelierPageQuery = defineQuery(`
  *[_type == "atelierPage"][0] {
    heroHeading,
    heroCopy,
    serviceExplanation,
    capabilities,
    processSteps[] {
      title,
      description
    },
    commercialCopy,
    cta {
      label,
      destinationKind,
      destination,
      analyticsId
    },
    seo {
      metaTitle,
      metaDescription,
      "shareImageUrl": shareImage.image.asset->url,
      noIndex
    }
  }
`);

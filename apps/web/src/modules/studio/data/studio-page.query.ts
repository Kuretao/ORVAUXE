import { defineQuery } from "next-sanity";

export const studioPageQuery = defineQuery(`
  *[_type == "studioPage"][0] {
    heroHeading,
    heroCopy,
    pointOfView,
    origin,
    operatingModel,
    trustContent,
    contactCta {
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

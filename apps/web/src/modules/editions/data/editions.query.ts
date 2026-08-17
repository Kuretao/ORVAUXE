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

const editionProjection = `
  "id": _id,
  name,
  "slug": slug.current,
  editionNumber,
  category,
  status,
  "intro": pt::text(intro),
  hero {
    ${imageProjection}
  },
  gallery[] {
    ${imageProjection}
  },
  storefrontViews[] {
    kind,
    media {
      ${imageProjection}
    }
  },
  features,
  startingPrice,
  launchEstimate,
  demoUrl,
  designDna,
  systemStays,
  brandCanAdapt,
  cta {
    label,
    destinationKind,
    destination
  },
  seo {
    metaTitle,
    metaDescription,
    shareImage {
      ${imageProjection}
    },
    noIndex
  }
`;

export const editionQuery = defineQuery(`
  *[
    _type == "edition" &&
    slug.current == $slug &&
    status in ["draft", "available"]
  ][0] {
    ${editionProjection}
  }
`);

export const editionsQuery = defineQuery(`
  *[
    _type == "edition" &&
    defined(slug.current) &&
    status in ["draft", "available"]
  ] | order(editionNumber asc) {
    ${editionProjection}
  }
`);

import { defineQuery } from "next-sanity";

export const legalPageQuery = defineQuery(`
  *[_type == "legalPage" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    "bodyText": pt::text(body),
    effectiveDate,
    updatedDate,
    seo {
      metaTitle,
      metaDescription,
      "shareImageUrl": shareImage.image.asset->url,
      noIndex
    }
  }
`);

export const legalPageSlugsQuery = defineQuery(`
  *[_type == "legalPage" && defined(slug.current) && coalesce(seo.noIndex, false) != true] | order(slug.current asc) {
    "slug": slug.current
  }
`);

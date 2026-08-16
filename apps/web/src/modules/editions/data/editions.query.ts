import { defineQuery } from "next-sanity";

export const editionsQuery = defineQuery(`
  *[
    _type == "edition" &&
    defined(slug.current) &&
    status == "available"
  ] | order(editionNumber asc) {
    "id": _id,
    name,
    "slug": slug.current,
    editionNumber,
    category,
    status,
    "intro": pt::text(intro)
  }
`);

export const editionSlugsQuery = defineQuery(`
  *[
    _type == "edition" &&
    defined(slug.current) &&
    status == "available"
  ] | order(slug.current asc) {
    "slug": slug.current
  }
`);

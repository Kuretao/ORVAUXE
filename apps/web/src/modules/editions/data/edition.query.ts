import { defineQuery } from "next-sanity";

export const editionQuery = defineQuery(`
  *[_type == "edition" && slug.current == $slug][0] {
    "id": _id,
    name,
    "slug": slug.current,
    editionNumber,
    category,
    status,
    "intro": pt::text(intro)
  }
`);

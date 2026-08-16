const localUrl = "http://localhost:3000";

export const siteConfig = {
  name: "ORVAUXE",
  description:
    "ORVAUXE creates premium Shopify storefronts for fashion, jewelry and design-led brands worldwide.",
  url: process.env.ORVAUXE_SITE_URL ?? localUrl,
  locale: "en",
  organization: {
    sameAs: [] as string[],
  },
} as const;

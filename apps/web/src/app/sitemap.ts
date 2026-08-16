import type { MetadataRoute } from "next";

import { getServerEnv } from "@/config/env.server";
import { siteConfig } from "@/config/site";
import { getEditionSlugs } from "@/modules/editions";
import { getLegalPageSlugs } from "@/modules/legal";

const staticPaths = ["/", "/editions", "/atelier", "/studio", "/start-a-project"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (getServerEnv().VERCEL_ENV !== "production") {
    return [];
  }

  const [editionSlugs, legalPageSlugs] = await Promise.all([
    getEditionSlugs(),
    getLegalPageSlugs(),
  ]);

  const dynamicPaths = [
    ...editionSlugs.map((slug) => `/editions/${encodeURIComponent(slug)}` as const),
    ...legalPageSlugs.map((slug) => `/legal/${encodeURIComponent(slug)}` as const),
  ];

  return [...staticPaths, ...dynamicPaths].map((pathname) => ({
    url: new URL(pathname, siteConfig.url).toString(),
  }));
}

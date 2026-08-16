import type { MetadataRoute } from "next";

import { getServerEnv } from "@/config/env.server";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const isProduction = getServerEnv().VERCEL_ENV === "production";

  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    host: new URL(siteConfig.url).origin,
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}

import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export interface BuildMetadataInput {
  title: string;
  description: string;
  pathname: `/${string}` | "/";
  image?: string | null | undefined;
  noIndex?: boolean;
  baseUrl?: string | URL;
  siteName?: string;
  locale?: string;
}

function absoluteUrl(value: string, baseUrl: string | URL): string {
  return new URL(value, baseUrl).toString();
}

export function buildMetadata({
  title,
  description,
  pathname,
  image,
  noIndex = false,
  baseUrl = siteConfig.url,
  siteName = siteConfig.name,
  locale = siteConfig.locale,
}: BuildMetadataInput): Metadata {
  const canonical = absoluteUrl(pathname, baseUrl);
  const socialImage = image ? absoluteUrl(image, baseUrl) : undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title,
      description,
      locale,
      siteName,
      url: canonical,
      ...(socialImage ? { images: [{ url: socialImage }] } : {}),
    },
    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
    ...(noIndex
      ? {
          robots: {
            follow: false,
            index: false,
            nocache: true,
            googleBot: {
              follow: false,
              index: false,
              noimageindex: true,
            },
          },
        }
      : {}),
  };
}

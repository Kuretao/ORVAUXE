import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { getClientEnv } from "@/config/env.client";

export interface SanityImageUrlOptions {
  readonly width?: number;
  readonly height?: number;
  readonly quality?: number;
}

export function getSanityImageUrl(
  source: SanityImageSource,
  options: SanityImageUrlOptions | number = {},
): string | null {
  const env = getClientEnv();
  if (!env.NEXT_PUBLIC_SANITY_PROJECT_ID || !env.NEXT_PUBLIC_SANITY_DATASET) return null;

  let builder = imageUrlBuilder({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  }).image(source);

  const normalizedOptions = typeof options === "number" ? { width: options } : options;

  if (normalizedOptions.width) builder = builder.width(normalizedOptions.width);
  if (normalizedOptions.height) builder = builder.height(normalizedOptions.height);
  if (normalizedOptions.quality) builder = builder.quality(normalizedOptions.quality);

  return builder.auto("format").url();
}

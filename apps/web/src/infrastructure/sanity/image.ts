import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { getClientEnv } from "@/config/env.client";

export function getSanityImageUrl(source: SanityImageSource, width?: number): string | null {
  const env = getClientEnv();
  if (!env.NEXT_PUBLIC_SANITY_PROJECT_ID || !env.NEXT_PUBLIC_SANITY_DATASET) return null;

  let builder = imageUrlBuilder({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  }).image(source);

  if (width) builder = builder.width(width);
  return builder.auto("format").url();
}

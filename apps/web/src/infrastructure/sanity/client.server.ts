import "server-only";

import { draftMode } from "next/headers";
import { createClient } from "next-sanity";

import { getClientEnv } from "@/config/env.client";
import { getServerEnv } from "@/config/env.server";

const apiVersion = "2026-08-16";

export class CMSReadError extends Error {
  readonly code = "CMS_READ_FAILED";
  readonly retryable = true;
  readonly severity = "error" as const;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "CMSReadError";
  }
}

export interface SanityFetchOptions {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}

export async function sanityFetch<Result>({
  query,
  params = {},
  tags = [],
}: SanityFetchOptions): Promise<Result> {
  const publicEnv = getClientEnv();
  if (!publicEnv.NEXT_PUBLIC_SANITY_PROJECT_ID || !publicEnv.NEXT_PUBLIC_SANITY_DATASET) {
    throw new CMSReadError("Sanity public configuration is not available.");
  }

  const preview = (await draftMode()).isEnabled;
  const serverEnv = getServerEnv();
  const previewToken = serverEnv.SANITY_API_TOKEN;
  if (preview && !previewToken) {
    throw new CMSReadError("Sanity preview configuration is not available.");
  }

  const client = createClient({
    projectId: publicEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: publicEnv.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion,
    useCdn: !preview,
    perspective: preview ? "drafts" : "published",
    ...(preview && previewToken ? { token: previewToken } : {}),
  });

  try {
    return await client.fetch<Result>(query, params, {
      next: { tags },
    });
  } catch (cause) {
    throw new CMSReadError("Sanity content could not be read.", { cause });
  }
}

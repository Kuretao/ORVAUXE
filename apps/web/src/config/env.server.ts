import "server-only";

import { z } from "zod";

import { parseClientEnv } from "./env.client";

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);
const optionalText = z.preprocess(emptyToUndefined, z.string().min(1).optional());
const optionalUrl = z.preprocess(emptyToUndefined, z.string().url().optional());

const serverEnvSchema = z.object({
  ORVAUXE_SITE_URL: optionalUrl,
  SANITY_API_TOKEN: optionalText,
  SANITY_PREVIEW_SECRET: optionalText,
  ATTIO_API_KEY: optionalText,
  ATTIO_DEFAULT_DEAL_OWNER: optionalText,
  ATTIO_DEFAULT_DEAL_STAGE: optionalText,
  RESEND_API_KEY: optionalText,
  RESEND_FROM_EMAIL: z.preprocess(emptyToUndefined, z.string().email().optional()),
  PROJECT_INQUIRY_RECIPIENT_EMAIL: z.preprocess(emptyToUndefined, z.string().email().optional()),
  TURNSTILE_SECRET_KEY: optionalText,
  ORVAUXE_E2E_MODE: z.preprocess(emptyToUndefined, z.literal("stub").optional()),
  VERCEL_ENV: z.preprocess(
    emptyToUndefined,
    z.enum(["development", "preview", "production"]).optional(),
  ),
  NODE_ENV: z.preprocess(
    emptyToUndefined,
    z.enum(["development", "production", "test"]).optional(),
  ),
  CI: z.preprocess(emptyToUndefined, z.enum(["true", "false", "1", "0"]).optional()),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

const deploymentRequired = [
  "ORVAUXE_SITE_URL",
  "SANITY_API_TOKEN",
  "SANITY_PREVIEW_SECRET",
  "ATTIO_API_KEY",
  "ATTIO_DEFAULT_DEAL_OWNER",
  "ATTIO_DEFAULT_DEAL_STAGE",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "PROJECT_INQUIRY_RECIPIENT_EMAIL",
  "TURNSTILE_SECRET_KEY",
] as const;

const deploymentPublicRequired = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
] as const;

const productionPublicRequired = [
  "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN",
  "NEXT_PUBLIC_POSTHOG_HOST",
  "NEXT_PUBLIC_SENTRY_DSN",
] as const;

export function parseServerEnv(input: Record<string, string | undefined>): ServerEnv {
  const parsed = serverEnvSchema.parse(input);

  if (parsed.ORVAUXE_E2E_MODE === "stub") {
    const siteHostname = parsed.ORVAUXE_SITE_URL
      ? new URL(parsed.ORVAUXE_SITE_URL).hostname
      : undefined;
    const isLoopback =
      siteHostname === "localhost" || siteHostname === "127.0.0.1" || siteHostname === "[::1]";
    const isTestRuntime =
      parsed.CI === "true" ||
      parsed.CI === "1" ||
      parsed.NODE_ENV === "test" ||
      parsed.NODE_ENV === "development" ||
      isLoopback;

    if (parsed.VERCEL_ENV === "production" || !isTestRuntime) {
      throw new Error("ORVAUXE_E2E_MODE=stub is forbidden in production.");
    }
  }

  if (parsed.VERCEL_ENV === "preview" || parsed.VERCEL_ENV === "production") {
    const publicEnv = parseClientEnv(input);
    const missing = [
      ...deploymentRequired.filter((name) => !parsed[name]),
      ...deploymentPublicRequired.filter((name) => !publicEnv[name]),
      ...(parsed.VERCEL_ENV === "production"
        ? productionPublicRequired.filter((name) => !publicEnv[name])
        : []),
    ];
    if (missing.length > 0) {
      throw new Error(`Missing ${parsed.VERCEL_ENV} environment variables: ${missing.join(", ")}`);
    }
  }

  return parsed;
}

export function getServerEnv(): ServerEnv {
  return parseServerEnv({
    ORVAUXE_SITE_URL: process.env.ORVAUXE_SITE_URL,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
    SANITY_PREVIEW_SECRET: process.env.SANITY_PREVIEW_SECRET,
    ATTIO_API_KEY: process.env.ATTIO_API_KEY,
    ATTIO_DEFAULT_DEAL_OWNER: process.env.ATTIO_DEFAULT_DEAL_OWNER,
    ATTIO_DEFAULT_DEAL_STAGE: process.env.ATTIO_DEFAULT_DEAL_STAGE,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    PROJECT_INQUIRY_RECIPIENT_EMAIL: process.env.PROJECT_INQUIRY_RECIPIENT_EMAIL,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    ORVAUXE_E2E_MODE: process.env.ORVAUXE_E2E_MODE,
    VERCEL_ENV: process.env.VERCEL_ENV,
    NODE_ENV: process.env.NODE_ENV,
    CI: process.env.CI,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

import { describe, expect, it, vi } from "vitest";
import type { Event } from "@sentry/nextjs";

vi.mock("server-only", () => ({}));

import { parseServerEnv } from "./env.server";
import { scrubSentryEvent } from "@/infrastructure/observability/report-error.server";

const productionEnv = {
  VERCEL_ENV: "production",
  ORVAUXE_SITE_URL: "https://example.test",
  SANITY_API_TOKEN: "sanity-api-test",
  SANITY_PREVIEW_SECRET: "preview-secret",
  ATTIO_API_KEY: "attio-test",
  ATTIO_DEFAULT_DEAL_OWNER: "owner-test",
  ATTIO_DEFAULT_DEAL_STAGE: "stage-test",
  RESEND_API_KEY: "resend-test",
  RESEND_FROM_EMAIL: "sender@example.test",
  PROJECT_INQUIRY_RECIPIENT_EMAIL: "recipient@example.test",
  TURNSTILE_SECRET_KEY: "turnstile-test",
  NEXT_PUBLIC_SANITY_PROJECT_ID: "production-project",
  NEXT_PUBLIC_SANITY_DATASET: "production",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: "turnstile-site-test",
  NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: "posthog-test",
  NEXT_PUBLIC_POSTHOG_HOST: "https://posthog.example.test",
  NEXT_PUBLIC_SENTRY_DSN: "https://public@example.test/1",
} as const;

describe("server environment", () => {
  it("parses the two Attio operational defaults", () => {
    const env = parseServerEnv(productionEnv);
    expect(env.ATTIO_DEFAULT_DEAL_OWNER).toBe("owner-test");
    expect(env.ATTIO_DEFAULT_DEAL_STAGE).toBe("stage-test");
  });

  it("accepts the Vercel CI=1 system marker", () => {
    expect(parseServerEnv({ ...productionEnv, CI: "1" }).CI).toBe("1");
  });

  it("rejects stub adapters in production", () => {
    expect(() => parseServerEnv({ ...productionEnv, ORVAUXE_E2E_MODE: "stub" })).toThrow(
      "forbidden in production",
    );
  });

  it("rejects stub adapters in an unmarked self-hosted production runtime", () => {
    expect(() =>
      parseServerEnv({
        ORVAUXE_E2E_MODE: "stub",
        NODE_ENV: "production",
        ORVAUXE_SITE_URL: "https://example.test",
      }),
    ).toThrow("forbidden in production");
  });

  it("allows stub adapters only in an explicit CI, test, development, or loopback context", () => {
    expect(
      parseServerEnv({
        ORVAUXE_E2E_MODE: "stub",
        NODE_ENV: "production",
        CI: "true",
      }).ORVAUXE_E2E_MODE,
    ).toBe("stub");
  });

  it("names missing production configuration", () => {
    expect(() => parseServerEnv({ ...productionEnv, ATTIO_DEFAULT_DEAL_STAGE: undefined })).toThrow(
      "ATTIO_DEFAULT_DEAL_STAGE",
    );
  });

  it("names missing production browser configuration", () => {
    expect(() =>
      parseServerEnv({ ...productionEnv, NEXT_PUBLIC_TURNSTILE_SITE_KEY: undefined }),
    ).toThrow("NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  });

  it("requires the non-production integration configuration in Preview", () => {
    expect(() =>
      parseServerEnv({
        ...productionEnv,
        VERCEL_ENV: "preview",
        ATTIO_API_KEY: undefined,
        NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: undefined,
        NEXT_PUBLIC_POSTHOG_HOST: undefined,
        NEXT_PUBLIC_SENTRY_DSN: undefined,
      }),
    ).toThrow("ATTIO_API_KEY");
  });

  it("allows Preview to omit production-only telemetry configuration", () => {
    expect(
      parseServerEnv({
        ...productionEnv,
        VERCEL_ENV: "preview",
        NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: undefined,
        NEXT_PUBLIC_POSTHOG_HOST: undefined,
        NEXT_PUBLIC_SENTRY_DSN: undefined,
      }).VERCEL_ENV,
    ).toBe("preview");
  });
});

describe("Sentry data scrubbing", () => {
  it("removes request secrets, lead data, breadcrumbs, and exception values", () => {
    const event: Event = {
      message: "ada@example.test",
      request: {
        url: "https://example.test/api/draft-mode/enable?secret=preview-secret",
        headers: { authorization: "Bearer secret" },
        data: { inquiryMessage: "private inquiry" },
      },
      user: { email: "ada@example.test" },
      breadcrumbs: [{ message: "private inquiry" }],
      contexts: { lead: { name: "Ada" } },
      extra: { vendorResponse: "private response" },
      tags: { error_code: "CRM_UNAVAILABLE", email: "ada@example.test" },
      exception: {
        values: [
          {
            type: "Error",
            value: "CRM failed for ada@example.test",
            mechanism: {
              type: "generic",
              handled: true,
              data: { vendorResponse: "private response" },
            },
            stacktrace: {
              frames: [{ filename: "route.ts", vars: { secret: "preview-secret" } }],
            },
          },
        ],
      },
    };

    const scrubbed = scrubSentryEvent(event);

    expect(scrubbed.request).toBeUndefined();
    expect(scrubbed.user).toBeUndefined();
    expect(scrubbed.breadcrumbs).toBeUndefined();
    expect(scrubbed.contexts).toBeUndefined();
    expect(scrubbed.extra).toBeUndefined();
    expect(scrubbed.message).toBeUndefined();
    expect(scrubbed.tags).toEqual({ error_code: "CRM_UNAVAILABLE" });
    expect(scrubbed.exception?.values?.[0]?.value).toBe("Redacted application error");
    expect(scrubbed.exception?.values?.[0]?.mechanism?.data).toBeUndefined();
    expect(scrubbed.exception?.values?.[0]?.stacktrace?.frames?.[0]?.vars).toBeUndefined();
  });
});

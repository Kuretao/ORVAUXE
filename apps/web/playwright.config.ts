import { defineConfig, devices } from "@playwright/test";

const testServerEnv = { ...process.env };
const isolatedVendorVariables = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN",
  "NEXT_PUBLIC_POSTHOG_HOST",
  "NEXT_PUBLIC_SENTRY_DSN",
  "SANITY_API_TOKEN",
  "SANITY_PREVIEW_SECRET",
  "ATTIO_API_KEY",
  "ATTIO_DEFAULT_DEAL_OWNER",
  "ATTIO_DEFAULT_DEAL_STAGE",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "PROJECT_INQUIRY_RECIPIENT_EMAIL",
  "TURNSTILE_SECRET_KEY",
  "SENTRY_AUTH_TOKEN",
  "SENTRY_ORG",
  "SENTRY_PROJECT",
  "VERCEL_ENV",
] as const;

for (const name of isolatedVendorVariables) {
  testServerEnv[name] = "";
}

export default defineConfig({
  testDir: "./tests/e2e",
  snapshotPathTemplate: "{testDir}/{testFilePath}-snapshots/{arg}{-projectName}{ext}",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["html", { open: "never" }], ["line"]] : "line",
  use: {
    baseURL: "http://127.0.0.1:43871",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "pnpm exec next start -p 43871",
    env: {
      ...testServerEnv,
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
      ORVAUXE_E2E_MODE: "stub",
      ORVAUXE_SITE_URL: "http://127.0.0.1:43871",
      TURNSTILE_SECRET_KEY: "1x0000000000000000000000000000000AA",
    },
    reuseExistingServer: false,
    timeout: 120_000,
    url: "http://127.0.0.1:43871",
  },
});

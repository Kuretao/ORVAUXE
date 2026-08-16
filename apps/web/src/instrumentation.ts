import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./infrastructure/observability/sentry.server");
  }
}

export const onRequestError = Sentry.captureRequestError;

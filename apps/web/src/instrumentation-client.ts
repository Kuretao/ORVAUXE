import * as Sentry from "@sentry/nextjs";
import type { Event } from "@sentry/nextjs";
import { initAnalyticsClient } from "@orvauxe/analytics/client";

import { getClientEnv } from "@/config/env.client";

const env = getClientEnv();
const hostname = window.location.hostname;
const environment =
  hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]"
    ? "local"
    : hostname.endsWith(".vercel.app")
      ? "preview"
      : "production";
const vendorTelemetryEnabled = environment !== "local";

const allowedSentryTags = new Set([
  "error_code",
  "environment",
  "integration",
  "retryable",
  "route",
  "submission_id",
]);

function scrubSentryEvent<SentryEvent extends Event>(event: SentryEvent): SentryEvent {
  delete event.breadcrumbs;
  delete event.contexts;
  delete event.extra;
  delete event.fingerprint;
  delete event.logentry;
  delete event.message;
  delete event.request;
  delete event.spans;
  delete event.user;

  if (event.tags) {
    event.tags = Object.fromEntries(
      Object.entries(event.tags).filter(([name]) => allowedSentryTags.has(name)),
    );
  }

  if (event.exception?.values) {
    event.exception.values = event.exception.values.map((value) => {
      const safeValue = { ...value, value: "Redacted application error" };
      if (safeValue.mechanism) {
        safeValue.mechanism = { ...safeValue.mechanism };
        delete safeValue.mechanism.data;
      }
      if (safeValue.stacktrace?.frames) {
        safeValue.stacktrace = {
          ...safeValue.stacktrace,
          frames: safeValue.stacktrace.frames.map((frame) => {
            const safeFrame = { ...frame };
            delete safeFrame.vars;
            return safeFrame;
          }),
        };
      }
      return safeValue;
    });
  }

  return event;
}

Sentry.init({
  dsn: vendorTelemetryEnabled ? env.NEXT_PUBLIC_SENTRY_DSN : undefined,
  enabled: vendorTelemetryEnabled && Boolean(env.NEXT_PUBLIC_SENTRY_DSN),
  environment,
  sendDefaultPii: false,
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpHeaders: { request: false, response: false },
    httpBodies: [],
    urlQueryParams: false,
    graphQL: { document: false, variables: false },
    genAI: { inputs: false, outputs: false },
    databaseQueryData: false,
    stackFrameVariables: false,
    frameContextLines: 0,
  },
  tracesSampleRate: 0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  beforeSend: scrubSentryEvent,
});

initAnalyticsClient({
  environment,
  ...(vendorTelemetryEnabled && env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
    ? { token: env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN }
    : {}),
  ...(vendorTelemetryEnabled && env.NEXT_PUBLIC_POSTHOG_HOST
    ? { host: env.NEXT_PUBLIC_POSTHOG_HOST }
    : {}),
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

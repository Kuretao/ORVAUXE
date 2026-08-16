import "server-only";

import * as Sentry from "@sentry/nextjs";

import { getClientEnv } from "@/config/env.client";
import { getServerEnv } from "@/config/env.server";

import { scrubSentryEvent } from "./report-error.server";

const clientEnv = getClientEnv();
const serverEnv = getServerEnv();
const vendorTelemetryEnabled =
  serverEnv.ORVAUXE_E2E_MODE !== "stub" &&
  (serverEnv.VERCEL_ENV === "preview" || serverEnv.VERCEL_ENV === "production");

Sentry.init({
  dsn: vendorTelemetryEnabled ? clientEnv.NEXT_PUBLIC_SENTRY_DSN : undefined,
  enabled: vendorTelemetryEnabled && Boolean(clientEnv.NEXT_PUBLIC_SENTRY_DSN),
  environment: serverEnv.VERCEL_ENV ?? "local",
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
  tracesSampleRate: serverEnv.VERCEL_ENV === "production" ? 0.01 : 0,
  beforeSend: scrubSentryEvent,
  beforeSendTransaction: scrubSentryEvent,
});

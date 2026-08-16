import "server-only";

import * as Sentry from "@sentry/nextjs";
import type { Event } from "@sentry/nextjs";

const allowedTags = new Set([
  "error_code",
  "environment",
  "integration",
  "retryable",
  "route",
  "submission_id",
]);

export function scrubSentryEvent<SentryEvent extends Event>(event: SentryEvent): SentryEvent {
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
      Object.entries(event.tags).filter(([name]) => allowedTags.has(name)),
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

export interface SafeErrorContext {
  errorCode: string;
  integration?: "attio" | "resend" | "turnstile" | "sanity" | "posthog";
  retryable: boolean;
  severity: "info" | "warning" | "error" | "fatal";
  submissionId?: string;
  route?: string;
}

export function reportError(error: unknown, context: SafeErrorContext): void {
  try {
    Sentry.withScope((scope) => {
      scope.setTag("error_code", context.errorCode);
      scope.setTag("retryable", context.retryable);
      scope.setLevel(context.severity);
      if (context.integration) scope.setTag("integration", context.integration);
      if (context.submissionId) scope.setTag("submission_id", context.submissionId);
      if (context.route) scope.setTag("route", context.route);
      Sentry.captureException(error);
    });
  } catch {
    // Observability failure never replaces the original application behavior.
  }
}

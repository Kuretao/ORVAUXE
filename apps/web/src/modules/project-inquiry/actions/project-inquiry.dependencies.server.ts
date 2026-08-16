import "server-only";

import { initAnalyticsServer, trackServer } from "@orvauxe/analytics/server";

import { getClientEnv } from "@/config/env.client";
import { getServerEnv } from "@/config/env.server";
import { upsertLeadRecords } from "@/infrastructure/attio/lead-records.server";
import { reportError } from "@/infrastructure/observability/report-error.server";
import { sendProjectInquiryEmails } from "@/infrastructure/resend/project-inquiry-email.server";

import type { SubmitProjectInquiryDependencies } from "../application/submit-project-inquiry";

export function createProjectInquiryDependencies(): SubmitProjectInquiryDependencies {
  const clientEnv = getClientEnv();
  const serverEnv = getServerEnv();
  const environment =
    serverEnv.VERCEL_ENV === "production"
      ? "production"
      : serverEnv.VERCEL_ENV === "preview"
        ? "preview"
        : "local";
  return {
    crm: {
      async acceptInquiry(input) {
        const deal = await upsertLeadRecords(input);
        return { dealId: deal.dealId };
      },
    },
    email: {
      async sendAcceptedInquiry(input) {
        await sendProjectInquiryEmails(input);
      },
    },
    analytics: {
      async trackAcceptedInquiry(input) {
        if (serverEnv.ORVAUXE_E2E_MODE === "stub") return;

        initAnalyticsServer({
          environment,
          ...(clientEnv.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
            ? { token: clientEnv.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN }
            : {}),
          ...(clientEnv.NEXT_PUBLIC_POSTHOG_HOST
            ? { host: clientEnv.NEXT_PUBLIC_POSTHOG_HOST }
            : {}),
        });
        const status = await trackServer("project_form_submitted", {
          form_version: "1",
          service_interest: input.serviceInterest,
          ...(input.editionSlug ? { edition_slug: input.editionSlug } : {}),
          ...(input.budgetRange ? { budget_range: input.budgetRange } : {}),
          submission_id: input.submissionId,
        });
        if (status !== "sent") {
          throw new Error("ANALYTICS_DELIVERY_FAILED");
        }
      },
    },
    errors: {
      report(error, applicationError, submissionId) {
        const integration =
          applicationError.kind === "CRMIntegrationError"
            ? "attio"
            : applicationError.kind === "EmailDeliveryError"
              ? "resend"
              : applicationError.kind === "AnalyticsError"
                ? "posthog"
                : undefined;
        reportError(error, {
          errorCode: applicationError.code,
          ...(integration ? { integration } : {}),
          retryable: applicationError.retryable,
          severity: applicationError.severity,
          submissionId,
          route: "/start-a-project",
        });
      },
    },
  };
}

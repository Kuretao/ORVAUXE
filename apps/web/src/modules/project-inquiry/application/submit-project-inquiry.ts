import type {
  ApplicationError,
  ProjectInquiryApplicationInput,
} from "../model/project-inquiry.types";

export interface CRMPort {
  acceptInquiry(input: ProjectInquiryApplicationInput): Promise<{ dealId: string }>;
}

export interface EmailPort {
  sendAcceptedInquiry(input: ProjectInquiryApplicationInput): Promise<void>;
}

export interface AnalyticsPort {
  trackAcceptedInquiry(input: ProjectInquiryApplicationInput): Promise<void>;
}

export interface ErrorReporterPort {
  report(error: unknown, applicationError: ApplicationError, submissionId: string): void;
}

export interface SubmitProjectInquiryDependencies {
  crm: CRMPort;
  email: EmailPort;
  analytics: AnalyticsPort;
  errors: ErrorReporterPort;
}

export type SubmitProjectInquiryResult =
  | {
      status: "accepted";
      submissionId: string;
      sideEffects: { email: "sent" | "failed"; analytics: "sent" | "failed" };
    }
  | { status: "not_accepted"; submissionId: string; error: ApplicationError };

const crmError: ApplicationError = {
  kind: "CRMIntegrationError",
  code: "CRM_UNAVAILABLE",
  retryable: true,
  severity: "error",
  safeMessage: "The inquiry could not be accepted. Please retry.",
};

const emailError: ApplicationError = {
  kind: "EmailDeliveryError",
  code: "EMAIL_DELIVERY_FAILED",
  retryable: true,
  severity: "warning",
  safeMessage: "The inquiry was accepted, but email delivery could not be confirmed.",
};

const analyticsError: ApplicationError = {
  kind: "AnalyticsError",
  code: "ANALYTICS_FAILED",
  retryable: false,
  severity: "warning",
  safeMessage: "Analytics capture failed without affecting the inquiry.",
};

function safelyReport(
  reporter: ErrorReporterPort,
  error: unknown,
  applicationError: ApplicationError,
  submissionId: string,
): void {
  try {
    reporter.report(error, applicationError, submissionId);
  } catch {
    // Telemetry is best-effort and cannot replace the application result.
  }
}

export async function submitProjectInquiry(
  input: ProjectInquiryApplicationInput,
  dependencies: SubmitProjectInquiryDependencies,
): Promise<SubmitProjectInquiryResult> {
  try {
    await dependencies.crm.acceptInquiry(input);
  } catch (error) {
    safelyReport(dependencies.errors, error, crmError, input.submissionId);
    return { status: "not_accepted", submissionId: input.submissionId, error: crmError };
  }

  let email: "sent" | "failed" = "sent";
  try {
    await dependencies.email.sendAcceptedInquiry(input);
  } catch (error) {
    email = "failed";
    safelyReport(dependencies.errors, error, emailError, input.submissionId);
  }

  let analytics: "sent" | "failed" = "sent";
  try {
    await dependencies.analytics.trackAcceptedInquiry(input);
  } catch (error) {
    analytics = "failed";
    safelyReport(dependencies.errors, error, analyticsError, input.submissionId);
  }

  return {
    status: "accepted",
    submissionId: input.submissionId,
    sideEffects: { email, analytics },
  };
}

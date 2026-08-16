export type ServiceInterest = "edition" | "atelier";
export type BudgetRange = "under_10k" | "10k_25k" | "25k_50k" | "50k_plus" | "undecided";

export interface ProjectInquiryInput {
  submissionId: string;
  turnstileVerificationId: string;
  turnstileToken: string;
  name: string;
  email: string;
  companyName?: string;
  companyWebsite?: string;
  serviceInterest: ServiceInterest;
  editionSlug?: string;
  budgetRange?: BudgetRange;
  inquiryMessage: string;
  sourceContext: string;
}

export type ProjectInquiryApplicationInput = Omit<
  ProjectInquiryInput,
  "turnstileToken" | "turnstileVerificationId"
>;

export type ApplicationErrorCode =
  | "VALIDATION_FAILED"
  | "BOT_VERIFICATION_FAILED"
  | "CRM_UNAVAILABLE"
  | "EMAIL_DELIVERY_FAILED"
  | "CMS_READ_FAILED"
  | "ANALYTICS_FAILED"
  | "UNKNOWN_APPLICATION_ERROR";

export type ApplicationErrorKind =
  | "ValidationError"
  | "BotVerificationError"
  | "CRMIntegrationError"
  | "EmailDeliveryError"
  | "CMSReadError"
  | "AnalyticsError"
  | "UnknownApplicationError";

export interface ApplicationError {
  kind: ApplicationErrorKind;
  code: ApplicationErrorCode;
  retryable: boolean;
  severity: "info" | "warning" | "error" | "fatal";
  safeMessage: string;
}

export type InquiryActionState =
  | { status: "idle" }
  | { status: "invalid"; fieldErrors: Record<string, string[]> }
  | { status: "verification_failed"; message: string }
  | { status: "retryable_error"; message: string; submissionId: string }
  | { status: "accepted"; submissionId: string };

export interface TurnstileIdentityState {
  submissionId: string;
  token?: string;
  turnstileVerificationId?: string;
}

export function bindTurnstileToken(
  state: TurnstileIdentityState,
  token: string,
  createUuid: () => string = () => crypto.randomUUID(),
): TurnstileIdentityState {
  if (state.token === token && state.turnstileVerificationId) return state;
  return {
    submissionId: state.submissionId,
    token,
    turnstileVerificationId: createUuid(),
  };
}

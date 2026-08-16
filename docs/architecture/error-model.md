# Error Model

## Shape

Application errors expose a stable code and safe behavior, not vendor internals.

Illustrative contract:

~~~ts
type ApplicationErrorCode =
  | "VALIDATION_FAILED"
  | "BOT_VERIFICATION_FAILED"
  | "CRM_UNAVAILABLE"
  | "EMAIL_DELIVERY_FAILED"
  | "CMS_READ_FAILED"
  | "ANALYTICS_FAILED"
  | "UNKNOWN_APPLICATION_ERROR"

type ApplicationError = {
  code: ApplicationErrorCode
  retryable: boolean
  severity: "info" | "warning" | "error" | "fatal"
  safeMessage: string
  cause?: unknown
}
~~~

cause is server/internal only and is never serialized to a user.

## Taxonomy

| Error | User-facing behavior | Retryable | Severity | Sentry |
|---|---|---:|---|---|
| ValidationError | field/global validation message | after correction | info | normally no |
| BotVerificationError | verification retry/reset | yes | info/warning | only outage/anomaly |
| CRMIntegrationError | inquiry not accepted; safe retry | yes for transient | error | yes |
| EmailDeliveryError | success remains visible | operator retry | warning/error | yes |
| CMSReadError | not-found or branded error per route | route-dependent | error | yes |
| AnalyticsError | invisible to user | best effort only | warning | sampled |
| UnknownApplicationError | generic recoverable error | usually yes | error/fatal | yes |

## Safe action states

The project-inquiry action returns a discriminated serializable result:

~~~ts
type InquiryActionState =
  | { status: "idle" }
  | { status: "invalid"; fieldErrors: Record<string, string[]> }
  | { status: "verification_failed"; message: string }
  | { status: "retryable_error"; message: string; submissionId: string }
  | { status: "accepted"; submissionId: string }
~~~

Do not send error classes, stacks, vendor codes or raw exception messages to the client.

## Reporting policy

Sentry tags:

- error_code;
- integration;
- environment;
- retryable;
- submission_id when relevant;
- route.

Sentry must not receive:

- name, email or phone;
- inquiry message;
- raw FormData;
- authorization headers or tokens;
- Attio/Resend response bodies containing lead data.

Structured logs follow the same policy. Log a safe vendor status/code only when it has operational value.

## Severity and escalation

- Fatal: secret/PII exposure, widespread inability to serve or capture leads.
- Error: CRM write failure, persistent CMS failure, unhandled request exception.
- Warning: accepted lead email failed, analytics adapter degraded, repeated Turnstile provider errors.
- Info: expected validation/retry state.

SEV mapping follows the Planning Package incident runbook. A single rejected invalid form is not an incident; a sustained inability to accept valid leads is.

## Retry discipline

Retryability is declared by error mapping, never inferred from every exception:

- timeouts, selected 429 and provider 5xx may be retryable;
- authentication/configuration failures are not user-retryable;
- validation and malformed provider requests are not transient;
- partial CRM writes remain safe because subsequent operations upsert;
- accepted email failure is an operations retry, not a full form retry.

## UI boundaries

Expected action failures render inside the form with focus moved to the summary or first invalid field. Unexpected render errors use App Router error.tsx/global-error.tsx. not-found.tsx is for valid absence, not a generic exception handler.

Sentry reporting must itself be wrapped so telemetry failure never replaces the original application behavior.


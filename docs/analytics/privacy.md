# Analytics Privacy

## Classification

- Public: page path, content category, Edition slug.
- Internal: CTA identifiers, funnel state, experiment/version identifiers.
- Confidential: lead/contact details, free text, budget and CRM notes — prohibited from PostHog by default.

## Rules

- Define the lawful/privacy basis and consent behavior before implementation for target jurisdictions.
- Disable or restrict autocapture if it risks capturing form values or uncontrolled UI details.
- Mask sensitive elements in session replay if enabled.
- Use retention settings appropriate to the business purpose.
- Document deletion and access procedures.
- Do not identify anonymous visitors unless the use case is approved.

PostHog provides product analytics event capture and privacy controls, but configuration remains ORVAUXE’s responsibility: [event capture](https://posthog.com/docs/product-analytics/capture-events) and [privacy compliance](https://posthog.com/docs/privacy).


# Funnel Definitions

## Behavioral funnel — PostHog

```text
page_viewed
→ edition_viewed or atelier_viewed
→ start_project_clicked
→ project_form_started
→ project_form_submitted
```

Recommended initial window: 30 days, reviewed after real buying-cycle evidence. Segment by service interest, Edition and source category without creating tiny unreliable cohorts.

## Sales funnel — Attio

```text
NEW
→ QUALIFIED
→ CONVERSATION
→ DISCOVERY
→ PROPOSAL
→ NEGOTIATION
→ WON

LOST is separate.
```

## Ownership boundary

PostHog conversion ends when the server accepts the project submission. Attio becomes authoritative for qualification, conversations, discovery, proposals and outcomes. A dashboard joining both tools is a future data-design task; do not imply that PostHog alone contains revenue truth.


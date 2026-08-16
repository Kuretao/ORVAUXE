# Event Dictionary v1.0

All events are `internal` unless stated otherwise. No event contains direct PII.

| Event | Trigger | Event-specific properties | Purpose | Owner | Destination |
|---|---|---|---|---|---|
| `page_viewed` | Meaningful route view after consent/config decision | `page_type`, `page_path` | Reach and navigation | Analytics | PostHog |
| `edition_viewed` | Edition detail becomes primary route | `edition_slug`, `edition_category` | Edition interest | Product | PostHog |
| `edition_demo_opened` | Visitor explicitly opens a demo | `edition_slug`, `demo_id`, `cta_location` | High-intent engagement | Product | PostHog |
| `atelier_viewed` | Atelier route view | `page_path` | Bespoke-service interest | Product | PostHog |
| `start_project_clicked` | Start Project CTA activated | `cta_id`, `cta_location`, optional `edition_slug` | CTA effectiveness | Product | PostHog |
| `project_form_started` | First meaningful form interaction | `form_version`, `entry_context` | Form entry | Product | PostHog |
| `project_form_submitted` | Server confirms accepted lead workflow | `form_version`, `service_interest`, optional `edition_slug` | Behavioral conversion | Product | PostHog |
| `contact_link_clicked` | Email/social/contact link activated | `contact_method`, `cta_location` | Alternative contact route | Marketing | PostHog |

## Later CRM/business events

| Event / state | System of record | Note |
|---|---|---|
| `discovery_call_booked` | Attio / scheduling integration | Send to analytics only if a defined cross-system model is approved. |
| `proposal_sent` | Attio | Sales pipeline state, not a browser event. |
| `deal_won` | Attio | Principal business outcome; access restricted. |


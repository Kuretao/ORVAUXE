# Tracking Plan

## Naming

Approved project convention: `object_verb` in lowercase snake case, for example `edition_viewed` and `project_form_submitted`. PostHog’s current documentation recommends object/verb naming and supports typed event schemas; ORVAUXE uses underscores for a stable code-facing API: [PostHog capturing events](https://posthog.com/docs/product-analytics/capture-events).

## Required common properties

- `event_version`
- `page_path`
- `page_type`
- `locale`
- `environment`
- `referrer_type` where reliably derived

## Optional context

- `edition_slug`
- `edition_category`
- `cta_id`
- `cta_location`
- `form_step`
- `contact_method`

## Restrictions

Never send email, name, free-text form responses, budget notes, company confidential information or full URLs containing sensitive query strings. Identification requires an approved purpose and privacy review.

## Ownership

- Product/analytics owner approves event meaning.
- Engineering owns typed implementation and duplicate prevention.
- Marketing/SEO consumes reports but does not redefine events in dashboards.
- CRM owner defines Attio stages and stage transitions.

Breaking meaning changes require a new `event_version` or new event; spelling changes alone do not happen silently.


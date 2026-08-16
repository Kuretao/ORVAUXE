export type AnalyticsEnvironment = "local" | "preview" | "production";
export type BudgetRange = "under_10k" | "10k_25k" | "25k_50k" | "50k_plus" | "undecided";

export interface CommonProperties {
  event_version: 1;
  environment: AnalyticsEnvironment;
}

export interface AnalyticsEvents {
  page_viewed: {
    page_path: string;
    page_type:
      | "home"
      | "editions"
      | "edition"
      | "atelier"
      | "studio"
      | "project_inquiry"
      | "legal"
      | "not_found";
    locale: string;
    referrer_type?: string;
  };
  edition_viewed: {
    edition_slug: string;
    edition_category: string;
    edition_number?: number;
  };
  edition_demo_opened: {
    edition_slug: string;
    demo_id: string;
    cta_location: string;
  };
  atelier_viewed: {
    page_path: string;
  };
  start_project_clicked: {
    cta_id: string;
    cta_location: string;
    edition_slug?: string;
  };
  project_form_started: {
    form_version: string;
    entry_context: string;
  };
  project_form_submitted: {
    form_version: string;
    service_interest: "edition" | "atelier";
    edition_slug?: string;
    budget_range?: BudgetRange;
    submission_id: string;
  };
  contact_link_clicked: {
    contact_method: "email" | "instagram" | "linkedin" | "other";
    cta_location: string;
  };
}

export type AnalyticsEventName = keyof AnalyticsEvents;
export type AnalyticsEventProperties<Event extends AnalyticsEventName> = AnalyticsEvents[Event];

export function enrichProperties<Event extends AnalyticsEventName>(
  properties: AnalyticsEventProperties<Event>,
  environment: AnalyticsEnvironment,
): AnalyticsEventProperties<Event> & CommonProperties {
  return {
    ...properties,
    event_version: 1,
    environment,
  };
}

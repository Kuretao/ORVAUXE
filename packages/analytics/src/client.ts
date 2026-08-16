import posthog from "posthog-js";
import type { CaptureResult } from "posthog-js";

import { enrichProperties } from "./events";
import type { AnalyticsEnvironment, AnalyticsEventName, AnalyticsEventProperties } from "./events";

export interface AnalyticsClientConfig {
  token?: string;
  host?: string;
  environment: AnalyticsEnvironment;
}

let analyticsEnvironment: AnalyticsEnvironment = "local";
let initialized = false;

type ClientAnalyticsEventName = Exclude<AnalyticsEventName, "project_form_submitted">;

const eventPropertyAllowlist: Record<ClientAnalyticsEventName, readonly string[]> = {
  page_viewed: ["page_path", "page_type", "locale", "referrer_type"],
  edition_viewed: ["edition_slug", "edition_category", "edition_number"],
  edition_demo_opened: ["edition_slug", "demo_id", "cta_location"],
  atelier_viewed: ["page_path"],
  start_project_clicked: ["cta_id", "cta_location", "edition_slug"],
  project_form_started: ["form_version", "entry_context"],
  contact_link_clicked: ["contact_method", "cta_location"],
};

const transportPropertyAllowlist = new Set([
  "token",
  "distinct_id",
  "$device_id",
  "$session_id",
  "$window_id",
  "$lib",
  "$lib_version",
  "$process_person_profile",
]);

const implicitPropertyDenylist = [
  "$current_url",
  "$referrer",
  "$referring_domain",
  "$initial_current_url",
  "$initial_referrer",
  "$initial_referring_domain",
  "$session_entry_url",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gad_source",
  "dclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
];

function safePagePath(value: unknown): unknown {
  if (typeof value !== "string") return value;
  try {
    return new URL(value, "https://path.invalid").pathname;
  } catch {
    return value.split(/[?#]/, 1)[0];
  }
}

export function scrubPostHogEvent(event: CaptureResult | null): CaptureResult | null {
  if (!event || !(event.event in eventPropertyAllowlist)) return null;

  const eventName = event.event as ClientAnalyticsEventName;
  const allowed = new Set([
    ...transportPropertyAllowlist,
    ...eventPropertyAllowlist[eventName],
    "event_version",
    "environment",
  ]);
  const properties = Object.fromEntries(
    Object.entries(event.properties)
      .filter(([name]) => allowed.has(name))
      .map(([name, value]) => [name, name === "page_path" ? safePagePath(value) : value]),
  );
  const scrubbed = { ...event, properties };
  delete scrubbed.$set;
  delete scrubbed.$set_once;
  delete scrubbed.$unset;
  return scrubbed;
}

export function initAnalyticsClient(config: AnalyticsClientConfig): boolean {
  analyticsEnvironment = config.environment;
  if (!config.token) {
    initialized = false;
    return false;
  }

  try {
    posthog.init(config.token, {
      ...(config.host ? { api_host: config.host } : {}),
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      disable_session_recording: true,
      capture_heatmaps: false,
      capture_dead_clicks: false,
      capture_exceptions: false,
      capture_performance: false,
      advanced_disable_flags: true,
      disable_surveys: true,
      disable_web_experiments: true,
      disable_conversations: true,
      disable_product_tours: true,
      disable_external_dependency_loading: true,
      save_campaign_params: false,
      save_referrer: false,
      property_denylist: implicitPropertyDenylist,
      before_send: scrubPostHogEvent,
      person_profiles: "never",
      ip: false,
    });
    initialized = true;
    return true;
  } catch {
    initialized = false;
    return false;
  }
}

export function trackClient<Event extends ClientAnalyticsEventName>(
  event: Event,
  properties: AnalyticsEventProperties<Event>,
): void {
  if (!initialized) return;

  try {
    posthog.capture(event, enrichProperties(properties, analyticsEnvironment));
  } catch {
    // Analytics is deliberately best effort and cannot interrupt application behavior.
  }
}

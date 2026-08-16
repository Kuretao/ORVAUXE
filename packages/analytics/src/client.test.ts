import { beforeEach, describe, expect, it, vi } from "vitest";

const posthog = vi.hoisted(() => ({
  capture: vi.fn(),
  init: vi.fn(),
}));

vi.mock("posthog-js", () => ({ default: posthog }));

import { initAnalyticsClient, scrubPostHogEvent, trackClient } from "./client";

describe("browser analytics adapter", () => {
  beforeEach(() => {
    posthog.capture.mockReset();
    posthog.init.mockReset();
  });

  it("explicitly disables collection outside the typed contract", () => {
    expect(
      initAnalyticsClient({
        token: "phc_test",
        host: "https://example.test",
        environment: "local",
      }),
    ).toBe(true);

    expect(posthog.init).toHaveBeenCalledWith(
      "phc_test",
      expect.objectContaining({
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
        property_denylist: expect.arrayContaining([
          "$current_url",
          "$referrer",
          "$initial_referrer",
          "utm_source",
        ]),
        before_send: scrubPostHogEvent,
        person_profiles: "never",
        ip: false,
      }),
    );
  });

  it("drops implicit URL, referrer, campaign, and arbitrary properties before transport", () => {
    const scrubbed = scrubPostHogEvent({
      uuid: "00000000-0000-4000-8000-000000000001",
      event: "page_viewed",
      properties: {
        token: "phc_test",
        distinct_id: "anonymous-test",
        page_path: "/start-a-project?email=person@example.test#private",
        page_type: "project_inquiry",
        locale: "en",
        event_version: 1,
        environment: "preview",
        $current_url: "https://example.test/start-a-project?email=person@example.test",
        $referrer: "https://search.example/?q=private",
        utm_campaign: "private-campaign",
        email: "person@example.test",
      },
      $set_once: { $initial_current_url: "https://example.test/?email=person@example.test" },
    });

    expect(scrubbed?.properties).toEqual({
      token: "phc_test",
      distinct_id: "anonymous-test",
      page_path: "/start-a-project",
      page_type: "project_inquiry",
      locale: "en",
      event_version: 1,
      environment: "preview",
    });
    expect(scrubbed?.$set_once).toBeUndefined();
  });

  it("drops any vendor-generated event outside the typed browser contract", () => {
    expect(
      scrubPostHogEvent({
        uuid: "00000000-0000-4000-8000-000000000001",
        event: "$exception",
        properties: { token: "phc_test", $exception_message: "private" },
      }),
    ).toBeNull();
  });

  it("does not throw when PostHog capture fails", () => {
    initAnalyticsClient({ token: "phc_test", environment: "preview" });
    posthog.capture.mockImplementation(() => {
      throw new Error("provider unavailable");
    });

    expect(() => trackClient("atelier_viewed", { page_path: "/atelier" })).not.toThrow();
  });

  it("fails closed when PostHog initialization throws", () => {
    posthog.init.mockImplementationOnce(() => {
      throw new Error("provider initialization failed");
    });

    expect(initAnalyticsClient({ token: "phc_test", environment: "preview" })).toBe(false);
    expect(() => trackClient("atelier_viewed", { page_path: "/atelier" })).not.toThrow();
    expect(posthog.capture).not.toHaveBeenCalled();
  });

  it("keeps the accepted submission event on the server entrypoint", () => {
    const compileTimeContract = () => {
      // @ts-expect-error accepted submissions are server-only analytics events.
      trackClient("project_form_submitted", {
        form_version: "1",
        service_interest: "atelier",
        submission_id: "00000000-0000-4000-8000-000000000000",
      });
    };

    expect(compileTimeContract).toBeTypeOf("function");
  });
});

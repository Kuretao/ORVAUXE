import { beforeEach, describe, expect, it, vi } from "vitest";

const postHogConstructor = vi.hoisted(() => vi.fn());

vi.mock("server-only", () => ({}));
vi.mock("posthog-node", () => ({ PostHog: postHogConstructor }));

import { initAnalyticsServer, trackServer } from "./server";
import type { AnalyticsServerSink } from "./server";

describe("server analytics adapter", () => {
  beforeEach(() => {
    postHogConstructor.mockReset();
    initAnalyticsServer({ environment: "local" });
  });

  it("adds common properties, flushes, and does not use submission_id as distinctId", async () => {
    initAnalyticsServer({ environment: "production" });
    const sink: AnalyticsServerSink = {
      capture: vi.fn(),
      flush: vi.fn().mockResolvedValue(undefined),
    };

    const status = await trackServer(
      "project_form_submitted",
      {
        form_version: "1",
        service_interest: "atelier",
        submission_id: "00000000-0000-4000-8000-000000000000",
      },
      sink,
    );

    expect(status).toBe("sent");
    expect(sink.capture).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "project_form_submitted",
        properties: expect.objectContaining({ event_version: 1, environment: "production" }),
      }),
    );
    const capture = vi.mocked(sink.capture).mock.calls[0]?.[0];
    expect(capture?.distinctId).not.toBe("00000000-0000-4000-8000-000000000000");
    expect(sink.flush).toHaveBeenCalledOnce();
  });

  it("returns a safe outcome instead of throwing capture and flush failures", async () => {
    const sink: AnalyticsServerSink = {
      capture: vi.fn(() => {
        throw new Error("provider unavailable");
      }),
      flush: vi.fn().mockResolvedValue(undefined),
    };

    await expect(
      trackServer(
        "contact_link_clicked",
        { contact_method: "email", cta_location: "footer" },
        sink,
      ),
    ).resolves.toBe("failed");
  });

  it("fails closed when PostHog construction throws", async () => {
    postHogConstructor.mockImplementationOnce(function throwOnConstruction() {
      throw new Error("provider initialization failed");
    });

    expect(initAnalyticsServer({ token: "phc_test", environment: "preview" })).toBe(false);
    await expect(
      trackServer("contact_link_clicked", {
        contact_method: "email",
        cta_location: "footer",
      }),
    ).resolves.toBe("disabled");
  });
});

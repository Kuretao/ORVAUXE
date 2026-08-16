import { describe, expect, expectTypeOf, it } from "vitest";

import { enrichProperties } from "./events";
import type { AnalyticsEventProperties } from "./events";

describe("analytics event contract", () => {
  it("enriches caller properties with immutable common fields", () => {
    const event = enrichProperties(
      { page_path: "/atelier", page_type: "atelier", locale: "en" },
      "preview",
    );

    expect(event).toEqual({
      page_path: "/atelier",
      page_type: "atelier",
      locale: "en",
      event_version: 1,
      environment: "preview",
    });
  });

  it("keeps event-specific property types closed", () => {
    expectTypeOf<AnalyticsEventProperties<"edition_viewed">>().toMatchTypeOf<{
      edition_slug: string;
      edition_category: string;
      edition_number?: number;
    }>();

    const compileTimeContract = () => {
      // @ts-expect-error project_form_submitted requires service_interest.
      const missingProperty: AnalyticsEventProperties<"project_form_submitted"> = {
        form_version: "1",
        submission_id: "00000000-0000-4000-8000-000000000000",
      };
      const pii: AnalyticsEventProperties<"project_form_started"> = {
        form_version: "1",
        entry_context: "route",
        // @ts-expect-error direct PII is not part of the contract.
        email: "person@example.test",
      };
      const invalidBudget: AnalyticsEventProperties<"project_form_submitted"> = {
        form_version: "1",
        service_interest: "atelier",
        submission_id: "00000000-0000-4000-8000-000000000000",
        // @ts-expect-error budget_range is a controlled, non-free-text dimension.
        budget_range: "person@example.test",
      };
      return { invalidBudget, missingProperty, pii };
    };
    expectTypeOf(compileTimeContract).toBeFunction();
  });
});

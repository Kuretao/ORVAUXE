import { describe, expect, it, vi } from "vitest";

import { submitProjectInquiry } from "./submit-project-inquiry";
import type { ProjectInquiryApplicationInput } from "../model/project-inquiry.types";

const input: ProjectInquiryApplicationInput = {
  submissionId: "00000000-0000-4000-8000-000000000001",
  name: "Ada Lovelace",
  email: "ada@example.test",
  serviceInterest: "atelier",
  budgetRange: "undecided",
  inquiryMessage: "A deterministic and privacy-safe test inquiry.",
  sourceContext: "unit-test",
};

function createDependencies() {
  const order: string[] = [];
  return {
    order,
    dependencies: {
      crm: {
        acceptInquiry: vi.fn(async () => {
          order.push("crm");
          return { dealId: "deal-test" };
        }),
      },
      email: {
        sendAcceptedInquiry: vi.fn(async () => {
          order.push("email");
        }),
      },
      analytics: {
        trackAcceptedInquiry: vi.fn(async () => {
          order.push("analytics");
        }),
      },
      errors: { report: vi.fn() },
    },
  };
}

describe("submitProjectInquiry", () => {
  it("accepts only after CRM, then invokes email and analytics in order", async () => {
    const { order, dependencies } = createDependencies();
    const result = await submitProjectInquiry(input, dependencies);
    expect(result.status).toBe("accepted");
    expect(order).toEqual(["crm", "email", "analytics"]);
  });

  it("keeps acceptance when email fails and still invokes analytics", async () => {
    const { order, dependencies } = createDependencies();
    dependencies.email.sendAcceptedInquiry.mockImplementation(async () => {
      order.push("email");
      throw new Error("email unavailable");
    });
    const result = await submitProjectInquiry(input, dependencies);
    expect(result).toMatchObject({
      status: "accepted",
      sideEffects: { email: "failed", analytics: "sent" },
    });
    expect(order).toEqual(["crm", "email", "analytics"]);
  });

  it("keeps acceptance when analytics fails", async () => {
    const { dependencies } = createDependencies();
    dependencies.analytics.trackAcceptedInquiry.mockRejectedValue(
      new Error("analytics unavailable"),
    );
    const result = await submitProjectInquiry(input, dependencies);
    expect(result).toMatchObject({
      status: "accepted",
      sideEffects: { email: "sent", analytics: "failed" },
    });
  });

  it("keeps the application result when error reporting itself fails", async () => {
    const { dependencies } = createDependencies();
    dependencies.analytics.trackAcceptedInquiry.mockRejectedValue(
      new Error("analytics unavailable"),
    );
    dependencies.errors.report.mockImplementation(() => {
      throw new Error("telemetry unavailable");
    });

    await expect(submitProjectInquiry(input, dependencies)).resolves.toMatchObject({
      status: "accepted",
      sideEffects: { email: "sent", analytics: "failed" },
    });
  });

  it("does not accept or call side effects when CRM fails", async () => {
    const { dependencies } = createDependencies();
    dependencies.crm.acceptInquiry.mockRejectedValue(new Error("crm unavailable"));
    const result = await submitProjectInquiry(input, dependencies);
    expect(result).toMatchObject({ status: "not_accepted", error: { code: "CRM_UNAVAILABLE" } });
    expect(dependencies.email.sendAcceptedInquiry).not.toHaveBeenCalled();
    expect(dependencies.analytics.trackAcceptedInquiry).not.toHaveBeenCalled();
  });
});

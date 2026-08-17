import { describe, expect, it } from "vitest";

import { projectInquirySchema } from "./project-inquiry.schema";
import { bindTurnstileToken } from "./project-inquiry.types";

const submissionId = "00000000-0000-4000-8000-000000000001";
const firstVerificationId = "00000000-0000-4000-8000-000000000002";
const secondVerificationId = "00000000-0000-4000-8000-000000000003";

describe("project inquiry model", () => {
  it("accepts and normalizes a valid inquiry", () => {
    const result = projectInquirySchema.parse({
      submissionId,
      turnstileVerificationId: firstVerificationId,
      turnstileToken: "test-token",
      name: "  Ada Lovelace  ",
      email: "  ADA@EXAMPLE.TEST ",
      companyName: "",
      companyWebsite: "",
      serviceInterest: "atelier",
      editionSlug: "",
      budgetRange: "undecided",
      inquiryMessage: "  A sufficiently detailed project inquiry.  ",
      sourceContext: "start-a-project",
    });

    expect(result.name).toBe("Ada Lovelace");
    expect(result.email).toBe("ada@example.test");
    expect(result.companyName).toBeUndefined();
  });

  it("rejects invalid UUIDs and bounded free text", () => {
    const result = projectInquirySchema.safeParse({
      submissionId: "not-a-uuid",
      turnstileVerificationId: "not-a-uuid",
      turnstileToken: "",
      name: "A",
      email: "not-email",
      serviceInterest: "other",
      inquiryMessage: "short",
      sourceContext: "",
    });
    expect(result.success).toBe(false);
  });

  it("drops Edition context when the selected project type is Atelier", () => {
    const result = projectInquirySchema.parse({
      submissionId,
      turnstileVerificationId: firstVerificationId,
      turnstileToken: "test-token",
      name: "Ada Lovelace",
      email: "ada@example.test",
      serviceInterest: "atelier",
      editionSlug: "nocturne",
      inquiryMessage: "A sufficiently detailed project inquiry.",
      sourceContext: "start-a-project",
    });

    expect(result.editionSlug).toBeUndefined();
  });

  it("rejects an unapproved source context", () => {
    const result = projectInquirySchema.safeParse({
      submissionId,
      turnstileVerificationId: firstVerificationId,
      turnstileToken: "test-token",
      name: "Ada Lovelace",
      email: "ada@example.test",
      serviceInterest: "atelier",
      inquiryMessage: "A sufficiently detailed project inquiry.",
      sourceContext: "untrusted-campaign-value",
    });

    expect(result.success).toBe(false);
  });

  it("reuses a verification ID for a network retry of the same token", () => {
    const initial = {
      submissionId,
      token: "token-a",
      turnstileVerificationId: firstVerificationId,
    };
    expect(bindTurnstileToken(initial, "token-a", () => secondVerificationId)).toBe(initial);
  });

  it("creates a new verification ID for a fresh token without changing submissionId", () => {
    const next = bindTurnstileToken(
      { submissionId, token: "token-a", turnstileVerificationId: firstVerificationId },
      "token-b",
      () => secondVerificationId,
    );
    expect(next).toEqual({
      submissionId,
      token: "token-b",
      turnstileVerificationId: secondVerificationId,
    });
  });
});

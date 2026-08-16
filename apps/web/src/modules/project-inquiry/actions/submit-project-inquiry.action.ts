"use server";

import { verifyTurnstile } from "@/infrastructure/turnstile/verify-turnstile.server";

import { submitProjectInquiry } from "../application/submit-project-inquiry";
import { projectInquirySchema } from "../model/project-inquiry.schema";
import type { InquiryActionState } from "../model/project-inquiry.types";
import { createProjectInquiryDependencies } from "./project-inquiry.dependencies.server";

export async function submitProjectInquiryAction(
  _previousState: InquiryActionState,
  formData: FormData,
): Promise<InquiryActionState> {
  const parsed = projectInquirySchema.safeParse({
    submissionId: formData.get("submissionId"),
    turnstileVerificationId: formData.get("turnstileVerificationId"),
    turnstileToken: formData.get("turnstileToken"),
    name: formData.get("name"),
    email: formData.get("email"),
    companyName: formData.get("companyName"),
    companyWebsite: formData.get("companyWebsite"),
    serviceInterest: formData.get("serviceInterest"),
    editionSlug: formData.get("editionSlug"),
    budgetRange: formData.get("budgetRange"),
    inquiryMessage: formData.get("inquiryMessage"),
    sourceContext: formData.get("sourceContext"),
  });

  if (!parsed.success) {
    return { status: "invalid", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  let verification: Awaited<ReturnType<typeof verifyTurnstile>>;
  try {
    verification = await verifyTurnstile({
      token: parsed.data.turnstileToken,
      turnstileVerificationId: parsed.data.turnstileVerificationId,
      submissionId: parsed.data.submissionId,
    });
  } catch {
    return { status: "verification_failed", message: "Verification is unavailable." };
  }
  if (!verification.success) {
    return { status: "verification_failed", message: "Verification must be refreshed." };
  }

  const data = parsed.data;
  const input = {
    submissionId: data.submissionId,
    name: data.name,
    email: data.email,
    serviceInterest: data.serviceInterest,
    inquiryMessage: data.inquiryMessage,
    sourceContext: data.sourceContext,
    ...(data.companyName ? { companyName: data.companyName } : {}),
    ...(data.companyWebsite ? { companyWebsite: data.companyWebsite } : {}),
    ...(data.editionSlug ? { editionSlug: data.editionSlug } : {}),
    ...(data.budgetRange ? { budgetRange: data.budgetRange } : {}),
  };
  const result = await submitProjectInquiry(input, createProjectInquiryDependencies());
  if (result.status === "not_accepted") {
    return {
      status: "retryable_error",
      message: result.error.safeMessage,
      submissionId: result.submissionId,
    };
  }
  return { status: "accepted", submissionId: result.submissionId };
}

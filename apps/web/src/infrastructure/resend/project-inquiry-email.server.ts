import "server-only";

import { getServerEnv } from "@/config/env.server";

import { getResendConfiguration } from "./client.server";

export interface ProjectInquiryEmailInput {
  submissionId: string;
  name: string;
  email: string;
  serviceInterest: "edition" | "atelier";
}

export function projectInquiryEmailKeys(submissionId: string) {
  return {
    confirmation: `project-inquiry-confirmation/${submissionId}`,
    internal: `project-inquiry-internal/${submissionId}`,
  } as const;
}

export async function sendProjectInquiryEmails(input: ProjectInquiryEmailInput): Promise<void> {
  const env = getServerEnv();
  if (env.ORVAUXE_E2E_MODE === "stub") return;

  getResendConfiguration();
  projectInquiryEmailKeys(input.submissionId);
  throw new Error("RESEND_ADAPTER_NOT_IMPLEMENTED");
}

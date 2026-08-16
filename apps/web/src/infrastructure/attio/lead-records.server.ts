import "server-only";

import { getServerEnv } from "@/config/env.server";

import { getAttioConfiguration } from "./client.server";

export interface AttioLeadInput {
  submissionId: string;
  name: string;
  email: string;
  companyName?: string;
  companyWebsite?: string;
  serviceInterest: "edition" | "atelier";
  editionSlug?: string;
  budgetRange?: "under_10k" | "10k_25k" | "25k_50k" | "50k_plus" | "undecided";
  inquiryMessage: string;
  sourceContext: string;
}

export interface AttioAcceptedDeal {
  dealId: string;
  submissionId: string;
}

export async function upsertLeadRecords(input: AttioLeadInput): Promise<AttioAcceptedDeal> {
  const env = getServerEnv();
  if (env.ORVAUXE_E2E_MODE === "stub") {
    return { dealId: `stub-deal-${input.submissionId}`, submissionId: input.submissionId };
  }

  getAttioConfiguration();
  throw new Error("ATTIO_ADAPTER_NOT_IMPLEMENTED");
}

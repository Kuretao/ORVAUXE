import "server-only";

import { getServerEnv } from "@/config/env.server";

export interface TurnstileVerificationInput {
  token: string;
  turnstileVerificationId: string;
  submissionId: string;
  remoteIp?: string;
}

export type TurnstileVerificationResult =
  { success: true } | { success: false; reason: "missing" | "rejected" | "unavailable" };

export async function verifyTurnstile(
  input: TurnstileVerificationInput,
): Promise<TurnstileVerificationResult> {
  const env = getServerEnv();
  if (env.ORVAUXE_E2E_MODE === "stub") {
    return input.token ? { success: true } : { success: false, reason: "missing" };
  }

  if (!env.TURNSTILE_SECRET_KEY) return { success: false, reason: "unavailable" };
  throw new Error("TURNSTILE_ADAPTER_NOT_IMPLEMENTED");
}

import "server-only";

import { getServerEnv } from "@/config/env.server";

export interface ResendConfiguration {
  apiKey: string;
  from: string;
  recipient: string;
}

export function getResendConfiguration(): ResendConfiguration {
  const env = getServerEnv();
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL || !env.PROJECT_INQUIRY_RECIPIENT_EMAIL) {
    throw new Error("RESEND_CONFIGURATION_MISSING");
  }
  return {
    apiKey: env.RESEND_API_KEY,
    from: env.RESEND_FROM_EMAIL,
    recipient: env.PROJECT_INQUIRY_RECIPIENT_EMAIL,
  };
}

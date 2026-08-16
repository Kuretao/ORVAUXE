import "server-only";

import { getServerEnv } from "@/config/env.server";

export interface AttioConfiguration {
  apiKey: string;
  defaultDealOwner: string;
  defaultDealStage: string;
}

export function getAttioConfiguration(): AttioConfiguration {
  const env = getServerEnv();
  if (!env.ATTIO_API_KEY || !env.ATTIO_DEFAULT_DEAL_OWNER || !env.ATTIO_DEFAULT_DEAL_STAGE) {
    throw new Error("ATTIO_CONFIGURATION_MISSING");
  }

  return {
    apiKey: env.ATTIO_API_KEY,
    defaultDealOwner: env.ATTIO_DEFAULT_DEAL_OWNER,
    defaultDealStage: env.ATTIO_DEFAULT_DEAL_STAGE,
  };
}

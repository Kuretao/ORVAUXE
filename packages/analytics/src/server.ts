import "server-only";

import { randomUUID } from "node:crypto";
import { PostHog } from "posthog-node";

import { enrichProperties } from "./events";
import type { AnalyticsEnvironment, AnalyticsEventName, AnalyticsEventProperties } from "./events";

export interface AnalyticsServerConfig {
  token?: string;
  host?: string;
  environment: AnalyticsEnvironment;
}

export interface AnalyticsServerSink {
  capture(input: { distinctId: string; event: string; properties: object }): void;
  flush(): Promise<void>;
}

export type AnalyticsDeliveryStatus = "sent" | "disabled" | "failed";

let serverClient: AnalyticsServerSink | undefined;
let serverEnvironment: AnalyticsEnvironment = "local";

export function initAnalyticsServer(config: AnalyticsServerConfig): boolean {
  serverEnvironment = config.environment;
  if (!config.token) {
    serverClient = undefined;
    return false;
  }

  try {
    serverClient = new PostHog(config.token, {
      ...(config.host ? { host: config.host } : {}),
      flushAt: 1,
      flushInterval: 0,
    });
    return true;
  } catch {
    serverClient = undefined;
    return false;
  }
}

export async function trackServer<Event extends AnalyticsEventName>(
  event: Event,
  properties: AnalyticsEventProperties<Event>,
  sink: AnalyticsServerSink | undefined = serverClient,
): Promise<AnalyticsDeliveryStatus> {
  if (!sink) return "disabled";

  try {
    sink.capture({
      distinctId: randomUUID(),
      event,
      properties: enrichProperties(properties, serverEnvironment),
    });
    await sink.flush();
    return "sent";
  } catch {
    // An analytics failure must never revoke an accepted inquiry or break rendering.
    return "failed";
  }
}

import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

import { buildContentSecurityPolicy } from "./src/config/content-security-policy";

const contentSecurityPolicy = buildContentSecurityPolicy(process.env.NODE_ENV);

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  transpilePackages: ["@orvauxe/ui", "@orvauxe/tokens", "@orvauxe/analytics"],
  experimental: {
    serverActions: {
      bodySizeLimit: "256kb",
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

const sentryBuildOptions = {
  silent: true,
  ...(process.env.SENTRY_AUTH_TOKEN ? { authToken: process.env.SENTRY_AUTH_TOKEN } : {}),
  ...(process.env.SENTRY_ORG ? { org: process.env.SENTRY_ORG } : {}),
  ...(process.env.SENTRY_PROJECT ? { project: process.env.SENTRY_PROJECT } : {}),
};

export default withSentryConfig(nextConfig, sentryBuildOptions);

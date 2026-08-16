export function buildContentSecurityPolicy(environment: string | undefined): string {
  const developmentScriptSource = environment === "development" ? " 'unsafe-eval'" : "";

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    `script-src 'self' 'unsafe-inline'${developmentScriptSource} https://challenges.cloudflare.com https://*.posthog.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https://cdn.sanity.io https://*.posthog.com",
    "font-src 'self' data:",
    "connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io https://*.posthog.com https://*.sentry.io https://challenges.cloudflare.com",
    "frame-src https://challenges.cloudflare.com",
    "worker-src 'self' blob:",
    "upgrade-insecure-requests",
  ].join("; ");
}

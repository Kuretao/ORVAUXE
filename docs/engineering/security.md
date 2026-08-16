# Security Baseline

- Keep API tokens and webhook secrets server-only.
- Validate and normalize all untrusted input with Zod.
- Validate Turnstile tokens on the server; Cloudflare states server validation is mandatory and tokens expire after five minutes: [Turnstile documentation](https://developers.cloudflare.com/turnstile/get-started/).
- Verify webhook signatures where providers support them; Attio signs webhook bodies with HMAC SHA-256: [Attio webhooks](https://docs.attio.com/rest-api/guides/webhooks).
- Apply practical security headers and a content security policy compatible with required vendors.
- Use minimal scopes and separate credentials by environment.
- Enable dependency monitoring and secret scanning.
- Restrict Sanity roles by editorial need.
- Do not send form content or direct identifiers to PostHog without an explicit approved requirement.
- Maintain `.env.example` with names and owners, never values.

Avoid heavyweight compliance theater. Protect the actual risks: public forms, third-party credentials, CMS publishing and lead data.


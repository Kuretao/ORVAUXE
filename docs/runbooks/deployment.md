# Deployment Runbook — Direction

Environments: local, preview and production. Add staging only if a persistent integration or editorial rehearsal need cannot be met by protected previews.

Vercel documents separate Production, Preview and Development environment variables: [Vercel environment variables](https://vercel.com/docs/environment-variables).

Deployment steps in the implementation phase should include: green CI, approved preview, production promotion/deploy, smoke test, release annotation and owner confirmation. Environment variables have named owners and are updated through the platform, never committed.


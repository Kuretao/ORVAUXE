# ORVAUXE Documentation

This directory contains the implementation-facing architecture, engineering, product, analytics, SEO, and operations documentation for the ORVAUXE monorepo. Keep it with the code and update it in the same pull request when a change affects a documented contract.

## Start here

- [Normative Architecture Specification](./architecture/ORVAUXE_Architecture_Specification_v1.0.md) — system boundaries, ownership, and launch architecture.
- [Architecture overview](./architecture/overview.md) — concise placement and dependency guide.
- [Repository map](./architecture/repository-map.md) — intended monorepo shape and responsibilities.
- [SKELETON_READY](../SKELETON_READY.md) — exact initial repository tree, implementation policy, and acceptance contract.
- [Official sources](./architecture/official-sources.md) — primary vendor and standards documentation reviewed for the architecture.

## Documentation areas

- [Architecture](./architecture/) — application boundaries, data flow, integrations, CMS, errors, dependencies, and server/client rules.
- [Architecture decisions](./adr/) — accepted ADRs for durable technical decisions.
- [Engineering](./engineering/) — environment, imports, naming, quality gates, testing, security, accessibility, performance, and definition of done.
- [Analytics](./analytics/) — typed event contract, event dictionary, funnels, tracking, and privacy.
- [Product](./product/) — launch product and CRM models.
- [SEO](./seo/) — search strategy, intent map, metadata, and structured data.
- [Runbooks](./runbooks/) — deployment, rollback, incidents, and lead-integration failures.

## Decision precedence

1. Explicitly approved amendments incorporated into the current specification and `SKELETON_READY.md` override the older packaged wording they amend.
2. For the initial repository-generation phase, [SKELETON_READY](../SKELETON_READY.md) controls the exact tree, scope, and implementation-versus-placeholder policy.
3. Outside that narrow generation contract, the [normative specification](./architecture/ORVAUXE_Architecture_Specification_v1.0.md) and accepted [ADRs](./adr/) govern durable architecture. A later accepted ADR supersedes the earlier decision it explicitly replaces.
4. Supporting architecture, engineering, analytics, product, SEO, and runbook documents explain the approved contracts and operating practice.
5. Planning Package v1.1 remains provenance for brand, product, SEO, analytics, and launch intent; the repository copies listed above are the implementation-facing references.

If documents still appear to conflict, do not resolve the conflict silently in code. Record it and obtain an explicit specification amendment or accepted ADR.

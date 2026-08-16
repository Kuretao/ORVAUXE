# Rollback Runbook — Direction

Rollback triggers: material outage, exposed secret, broken lead capture, wrong production content with legal/reputation impact, or severe rendering failure on primary traffic.

1. Launch owner declares rollback.
2. Engineering restores the last verified deployment or disables the failing integration behind a safe fallback.
3. Re-run domain, routes, form and analytics smoke tests.
4. Record timeline, user impact and follow-up owner.
5. Fix forward in preview; do not patch production without review unless the incident procedure requires it.


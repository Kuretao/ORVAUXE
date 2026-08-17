# Edition Unit Economics Template

Use this template after each real Edition delivery. It defines measurement fields and formulas; it contains no forecast, target margin or fabricated result.

## Measurement rules

- Record actual amounts in one stated currency and identify whether taxes are included or excluded consistently.
- Record actual time from the team’s time source rather than reconstructing an optimistic estimate.
- Use internal loaded hourly cost rates, not client billing rates, when calculating labor cost.
- Developer, design, founder/sales and QA hours are mutually exclusive primary categories.
- Revision and support hours are diagnostic subsets of those primary role hours; do not add them to labor cost a second time.
- Measure delivery duration from Ready to Build to launch/handoff and record documented client-pause days separately.
- Keep third-party pass-through costs separate from ORVAUXE labor.

## Engagement record

| Field                                 | Actual value | Source/notes |
| ------------------------------------- | ------------ | ------------ |
| Client/project identifier             | —            |              |
| Edition and base version              | —            |              |
| Client implementation version         | —            |              |
| Currency                              | —            |              |
| Ready to Build date                   | —            |              |
| Launch/handoff date                   | —            |              |
| Documented client-pause business days | —            |              |

The em dashes indicate unmeasured fields, not zero values.

## Revenue and cash costs

| Input                            | Symbol | Actual value | Evidence                   |
| -------------------------------- | ------ | ------------ | -------------------------- |
| Sale price                       | `S`    | —            | Executed commercial record |
| Payment processing cost          | `P`    | —            | Processor statement        |
| Third-party cost paid by ORVAUXE | `T`    | —            | Receipts/invoices          |

Third-party costs paid directly by the client are noted for scope learning but are not included in ORVAUXE cost or revenue.

## Labor inputs

| Input         | Hours       | Internal loaded cost rate | Labor cost              |
| ------------- | ----------- | ------------------------- | ----------------------- |
| Developer     | `H_dev`     | `R_dev`                   | `H_dev × R_dev`         |
| Design        | `H_design`  | `R_design`                | `H_design × R_design`   |
| Founder/sales | `H_founder` | `R_founder`               | `H_founder × R_founder` |
| QA            | `H_qa`      | `R_qa`                    | `H_qa × R_qa`           |

Loaded rates are internal inputs established from real compensation/overhead policy. This template intentionally supplies no rate.

## Delivery and support observations

| Input                                 | Symbol       | Actual value | Counting rule                                                                                |
| ------------------------------------- | ------------ | ------------ | -------------------------------------------------------------------------------------------- |
| Revision hours                        | `H_revision` | —            | Subset of the four primary role categories attributable to revision rounds                   |
| Support hours                         | `H_support`  | —            | Subset of primary role hours during handoff and the 14-day defect window                     |
| Delivery duration                     | `D_business` | —            | Business days from Ready to Build through launch/handoff, excluding documented client pauses |
| Revision rounds used                  | —            | —            | Count consolidated packages implemented                                                      |
| Add-on revenue included in sale price | —            | —            | Identify approved change orders; do not add twice                                            |

## Formulas

```text
Total labor hours (H_total)
  = H_dev + H_design + H_founder + H_qa

Developer labor cost (C_dev)
  = H_dev × R_dev

Design labor cost (C_design)
  = H_design × R_design

Founder/sales labor cost (C_founder)
  = H_founder × R_founder

QA labor cost (C_qa)
  = H_qa × R_qa

Total labor cost (C_labor)
  = C_dev + C_design + C_founder + C_qa

Total measured delivery cost (C_total)
  = P + T + C_labor

Gross profit, internal management view (GP)
  = S - C_total

Gross margin, internal management view (GM%)
  = GP ÷ S × 100

Cash contribution before labor
  = S - P - T

Realized contribution per labor hour
  = GP ÷ H_total

Revision load
  = H_revision ÷ H_total × 100

Support load
  = H_support ÷ H_total × 100
```

If `S` or `H_total` is zero or unknown, the corresponding ratio is **not measurable**; do not report it as zero. The internal gross-margin definition above is a management metric for comparing Edition deliveries, not audited accounting guidance.

## Result record

| Metric                         | Formula                              | Actual result |
| ------------------------------ | ------------------------------------ | ------------- |
| Sale price                     | `S`                                  | —             |
| Total labor hours              | `H_total`                            | —             |
| Total labor cost               | `C_labor`                            | —             |
| Payment processing cost        | `P`                                  | —             |
| Third-party cost               | `T`                                  | —             |
| Total measured delivery cost   | `C_total`                            | —             |
| Gross profit                   | `GP`                                 | —             |
| Gross margin                   | `GM%`                                | —             |
| Cash contribution before labor | `S - P - T`                          | —             |
| Revision hours/load            | `H_revision`; `H_revision ÷ H_total` | —             |
| Support hours/load             | `H_support`; `H_support ÷ H_total`   | —             |
| Delivery duration              | `D_business`                         | —             |

## Post-delivery review

Record concise evidence-backed answers:

1. Which work exceeded the base Edition assumption and why?
2. Which client-readiness gaps created pauses or rework?
3. How much time belonged to adaptation, implementation, QA, revisions and support?
4. Did an add-on remain profitable under the same measurement method?
5. Is any improvement truly reusable in the base Edition, or is it client-specific?
6. What should change in qualification, readiness, scope or the next base version?

Do not publish client unit economics or use one delivery as a universal profitability claim.

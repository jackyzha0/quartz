# Selective Conformal Triage for Medical VLMs

[← Safety Index](Index.md) | [Paraphrase Robustness →](../Evaluation/Paraphrase%20Robustness.md)

---

## Objective

Guarantee user‑set error rates on auto‑accepted cases by combining:
- Post‑hoc calibration (e.g., temperature scaling)
- Dispersion‑based risk from paraphrase ensembles (entropy/variance)
- Conformal risk control for coverage‑aware guarantees

## Workflow

1) Generate k paraphrases per item; collect predictions + confidences
2) Compute dispersion and calibrated scores
3) Fit conformal thresholds on validation to meet error budget
4) Deploy triage policy: auto‑accept if below threshold; otherwise abstain/route

## Subgroup‑Aware Coverage

- Maintain fairness by calibrating thresholds within strata (e.g., sentinel findings)
- Monitor coverage and error by subgroup with confidence intervals

## Outputs

- Selective risk vs coverage curves
- Error guarantees for auto‑accepted cases
- Audit logs for clinical traceability

See also: [[Evaluation/MedPhr-Rad|MedPhr‑Rad Benchmark]], [[Evaluation/Paraphrase Robustness|Metrics]]


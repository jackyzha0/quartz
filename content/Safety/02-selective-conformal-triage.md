# Selective Conformal Triage for Medical VLMs

> A key component of RQ5 in the [[../Evaluation/robustness-gauntlet|Robustness Gauntlet Framework]], providing mathematical guarantees for safe clinical deployment

[← Safety Index](index.md) | [Paraphrase Robustness →](../Evaluation/02-paraphrase-robustness.md)

---

## Objective

Guarantee user‑set error rates on auto‑accepted cases by implementing the triage system described in the Robustness Gauntlet. This component addresses **RQ5**: "How can we integrate a triage mechanism into the VQA system to ensure safe clinical deployment?"

### Key Goals
- **Error Detection**: Catch >80% of incorrect/hallucinated answers
- **Selective Answering**: Achieve ~90% safe accuracy with 15-20% deferral
- **Mathematical Guarantees**: Provide conformal coverage for error bounds

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

## Implementation in Robustness Gauntlet

### Multi-Signal Integration
The triage system combines multiple uncertainty signals:
- **Paraphrase Consistency**: Agreement across linguistic variants
- **Confidence Scores**: Model's self-reported certainty
- **Attention Focus**: Entropy of attention distributions
- **Question Complexity**: Risk assessment by question type

### Expected Performance
Based on the Robustness Gauntlet hypothesis:
- Triage precision: >80% for catching errors
- Deferral rate: 15-20% of all queries
- Safe accuracy: ~90% on auto-accepted cases
- Clinical utility: Maintains high throughput for routine cases

## Integration with Other Components
- **Input**: Results from [[../Evaluation/01-medphr-rad|MedPhr-Rad]] paraphrase testing
- **Analysis**: Uses attention metrics from interpretability toolkit
- **Output**: Safety decisions for clinical deployment
- **Validation**: Part of RQ5 experimental validation

See also: [[../Evaluation/robustness-gauntlet|Robustness Gauntlet Framework]], [[../Evaluation/01-medphr-rad|MedPhr‑Rad Benchmark]], [[../Evaluation/02-paraphrase-robustness|Metrics]]


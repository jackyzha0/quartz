# Selective Conformal Triage for Medical VLMs

> Providing mathematical guarantees for safe clinical deployment of phrasing-robust medical VLMs

[← Safety Index](index.md) | [Paraphrase Robustness →](../Evaluation/02-paraphrase-robustness.md)

---

## Objective

Guarantee user-set error rates on auto-accepted cases by implementing an uncertainty-aware triage system. This component addresses **RQ4**: "In what ways can a vision-language model be integrated into the radiology workflow as a triage tool that safely prioritizes or automates cases without missing critical findings?"

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

## Implementation with Phrasing Robustness

### Multi-Signal Integration
The triage system combines multiple uncertainty signals:
- **Paraphrase Consistency**: Agreement across linguistic variants (primary signal)
- **Confidence Scores**: Model's self-reported certainty calibrated via temperature scaling
- **Attention Stability**: Consistency of attention maps across paraphrases
- **Clinical Risk**: Stratification based on finding criticality

### Expected Performance
Based on the phrasing robustness research:
- **Sensitivity**: Near-100% for critical findings
- **Specificity**: 85-90% for non-urgent findings 
- **Auto-clearance**: ~30-40% of normal exams
- **Flip-rate threshold**: Defer if >10% disagreement across paraphrases

## Integration with Other Components
- **Input**: Results from [[../Evaluation/01-medphr-rad|MedPhr-Rad]] paraphrase testing
- **Analysis**: Uses attention metrics from interpretability toolkit
- **Output**: Safety decisions for clinical deployment
- **Validation**: Part of RQ5 experimental validation

See also: [[../Evaluation/phrasing-robustness-framework|Phrasing Robustness Framework]], [[../Evaluation/01-medphr-rad|MedPhr-Rad Benchmark]], [[../Evaluation/02-paraphrase-robustness|Metrics]]


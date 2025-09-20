# Paraphrase Robustness and Metrics (MedPhr‑Rad)

[← Evaluation Index](Index.md) | [Benchmark →](MedPhr-Rad.md)

---

## Taxonomy of Paraphrase Variation

- Synonymy and lexical choice
- Negation and polarity flips
- Hedging and uncertainty markers
- Temporality (prior vs current; onset)
- Quantifiers and numeric ranges
- Units and measurement formats
- Reading level and clinician style

## Core Metrics

- Paraphrase consistency rate: fraction of a paraphrase group matching modal answer
- Flip rate: share of items where any paraphrase changes the decision
- Robust accuracy: accuracy aggregated over paraphrase sets
- ECE (Expected Calibration Error): base calibration quality
- Selective risk at coverage c%: risk under an abstention policy at target coverage

## Risk Score and Triage Signal

- Dispersion across paraphrases (vote entropy/variance)
- Combine with confidence for selective automation
- Use conformal risk control for guaranteed error rates on auto‑accept cases

## Dataset Scope

- Radiology VQA (VQA‑RAD, PMC‑VQA, SLAKE)
- Extensions with standardized paraphrase sets per item
- Clinician spot checks + NLI + concept‑equivalence filters

## Implementation Notes

- Group paraphrases per item; report per‑group metrics
- Paired tests across paraphrase groups; bootstrap CIs
- Fairness slices across subgroups and sentinel findings

---

See also: [[Safety/Selective Conformal Triage|Selective Conformal Triage]], [[Healthcare/MedGemma|MedGemma]], [[Healthcare/LLaVA-Rad|LLaVA‑Rad]]


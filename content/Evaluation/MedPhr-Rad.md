# MedPhr‑Rad: Paraphrase‑Robustness Benchmark for Radiology VLMs

[← Paraphrase Metrics](Paraphrase%20Robustness.md) | [← Evaluation Index](Index.md)

---

## Goal

Standardize paraphrase‑first robustness evaluation in radiology VQA by releasing:
- A taxonomy of paraphrase categories
- Generators with NLI + concept‑equivalence filters
- Evaluation harness and metrics

## Scope

- Base datasets: VQA‑RAD, PMC‑VQA, SLAKE
- Items extended with semantically equivalent rephrasings per taxonomy
- Baselines: LLaVA‑Rad, MedGemma, LLaVA‑Med

## Metrics (per paraphrase group)

- Consistency rate, flip rate, robust accuracy
- ECE for calibration
- Selective risk at target coverage using paraphrase dispersion

## Release Artifacts

- Templates and generators (release synthetic prompts when raw text is restricted)
- Scoring scripts and plots (paired tests, bootstrap CIs)
- Leaderboard for new model submissions

## Integration

- Pairs with [[Safety/Selective Conformal Triage|Selective Conformal Triage]] for safe deployment
- Links to concept resources: RadLex, UMLS, RadGraph (for concept mapping and entity alignment)


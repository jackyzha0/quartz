# VSF Med: Vulnerability Scoring Framework for Medical VLMs

> Core benchmark from my paper [[https://arxiv.org/pdf/2507.00052.pdf|VSF Med: Vulnerability Scoring Framework for Medical Vision-Language Models]], focusing on linguistic robustness and clinical risk

[← Paraphrase Metrics](02-paraphrase-robustness.md) | [← Evaluation Index](index.md) | [Robustness Gauntlet →](robustness-gauntlet.md)

---

## Overview

VSF Med is the **linguistic robustness component** of the comprehensive Robustness Gauntlet framework. It specifically addresses how medical VLMs handle semantically equivalent phrasings of clinical questions, which is critical for real-world deployment where radiologists may phrase the same question in various ways.

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

## Paraphrase Taxonomy

1. **Synonymy**: Medical term variations
   - "pneumonia" ↔ "lung infection" ↔ "pulmonary consolidation"
   - "cardiomegaly" ↔ "enlarged heart" ↔ "cardiac enlargement"

2. **Negation Handling**: Positive/negative formulations
   - "Is there pneumonia?" ↔ "Is there no pneumonia?"
   - "Any abnormalities?" ↔ "All normal?"

3. **Hedging & Certainty**: Confidence modifiers
   - "definite pneumonia" ↔ "possible pneumonia" ↔ "likely pneumonia"
   - "clear evidence" ↔ "suggestive of" ↔ "consistent with"

4. **Temporality**: Time-based variations
   - "new finding" ↔ "recent change" ↔ "acute process"
   - "chronic" ↔ "longstanding" ↔ "old"

5. **Quantifiers**: Amount descriptors
   - "any fluid" ↔ "some fluid" ↔ "significant fluid"
   - "mild" ↔ "moderate" ↔ "severe"

6. **Clinical Style**: Formal vs conversational
   - "What is your differential?" ↔ "What could this be?"
   - "Describe findings" ↔ "What do you see?"

## Integration with Robustness Gauntlet

MedPhr-Rad serves as the **linguistic robustness module** within the larger framework:

- **Input to Visual Testing**: Paraphrased questions tested across visual perturbations
- **Attribution Analysis**: How attention changes with different phrasings
- **Triage Decisions**: Consistency across paraphrases informs deferral
- **Enhancement Target**: Paraphrase-based training improves overall robustness

## Relationship to Other Components

- Part of [[robustness-gauntlet|Robustness Gauntlet Framework]]
- Pairs with [[../Safety/02-selective-conformal-triage|Selective Conformal Triage]] for safe deployment
- Metrics detailed in [[02-paraphrase-robustness|Paraphrase Robustness Metrics]]
- Links to concept resources: RadLex, UMLS, RadGraph

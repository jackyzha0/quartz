# Dissertation Proposal: Phrasing‑Robust Medical VLMs for Radiology

> Working Title: Phrasing‑Robust Medical Vision‑Language Models for Radiology: Measurement, Causality, Mitigation, and Safe Triage

[← Site Index](../Index.md) | [Timeline →](Timeline.md)

---

## Central Thesis

Semantically equivalent phrasings of clinical questions can flip predictions of medical VLMs. This work measures the effect, identifies causes, reduces it with training and concept grounding, and wraps models with selective, risk‑controlled triage for safe use.

## Specific Aims

1) Measure phrasing sensitivity in medical VLMs.
- Build a radiology benchmark of semantically equivalent prompts per image and task (synonymy, negation, hedging, temporality, quantifiers, units, reading level, clinician style).
- Report robust accuracy, paraphrase consistency, flip rate, calibration error, and selective risk at coverage.
- Baselines: LLaVA‑Rad, MedGemma, LLaVA‑Med. See [[Healthcare/LLaVA-Rad|LLaVA‑Rad]] and [[Healthcare/MedGemma|MedGemma]].

2) Explain why phrasings flip predictions.
- Attribution and grounding analyses to separate text‑to‑concept parsing vs image‑region grounding.
- Explanation shift via attention rollout, Integrated Gradients, and ViT relevance propagation; link tokens to RadLex/UMLS concepts and answers to RadGraph entities.

3) Reduce phrasing sensitivity with training and grounding.
- Paraphrase‑consistency losses; constrained paraphrase augmentation; concept normalization to RadLex or UMLS before verbalization.
- Prompt‑ensembles with dispersion‑aware abstention.

4) Calibrate uncertainty and add selective, conformal triage.
- Post‑hoc calibration; conformal risk control to guarantee error rates on auto‑accept cases; subgroup‑aware coverage on sentinel findings.

5) Validate safety and generalization.
- External validation across sites and modalities; reader‑in‑the‑loop study; fairness across subgroups; include multi‑image reasoning when feasible.

See also: [[Evaluation/Paraphrase Robustness|Paraphrase Robustness Metrics]], [[Safety/Selective Conformal Triage|Selective Conformal Triage]].

## Novelty

- Paraphrase‑first evaluation for medical VLMs with a standardized taxonomy across modalities.
- Causal decomposition of flips into linguistic parsing vs visual grounding using concept linking and region‑level relevance alignment.
- Concept‑normalized querying to RadLex/UMLS before inference at scale for radiology VLMs.
- Dispersion‑driven abstention with conformal guarantees for safe automation.
- End‑to‑end safety layer fusing robustness, calibration, and conformal coverage.

## Methods by Aim (Condensed)

- Tasks: radiology VQA, abnormality tagging, short justification.
- Data: VQA‑RAD, PMC‑VQA, SLAKE, plus approved internal sets. [[Evaluation/MedPhr-Rad|MedPhr‑Rad benchmark]] collects paraphrase sets.
- Models: LLaVA‑Rad, MedGemma, LLaVA‑Med and a light baseline.
- Metrics: paraphrase consistency, flip rate, robust accuracy, ECE, selective risk at coverage c%.
- Explanations: attention rollout, IG on text tokens, ViT relevance; token deletion tests.
- Alignment: explanation shift index, concept‑token stability (RadLex/UMLS), RadGraph entity alignment.
- Mitigation: paraphrase‑consistency loss; constrained augmentation with NLI and concept‑equivalence gates; concept normalization and prompt‑ensembles with abstention; temperature scaling.
- Triage: dispersion‑based risk score with conformal risk control and subgroup‑aware coverage.

## Experimental Details

- Attribution tools: attention rollout, Chefer relevance propagation, IG; Grad‑CAM for CNN backbones.
- Statistics: paired tests over paraphrase sets, bootstrap CIs, effect sizes.
- Ablations: paraphrase types/count, loss strengths, normalization on/off, ensemble size vs latency, calibration variants.

## Success Criteria

- +15 points paraphrase consistency vs baseline on ≥2 tasks.
- Robust accuracy within 2 points of non‑robust accuracy after mitigation.
- ECE ≤ 5% after calibration.
- Conformal triage meets risk targets at ≥80% coverage with zero critical errors on sentinel findings.

## Risks & Mitigations

- Meaning drift in paraphrases → NLI + concept‑equivalence gates; clinician review.
- Over‑regularization → ramp loss weights; early stop on robust metrics.
- Compute limits → stage by modality; prioritize radiography first.
- IRB delays → submit amendment early for annotation/reader study.

## Expected Artifacts

- MedPhr‑Rad benchmark with taxonomy, generators, and evaluation harness.
- Robust configs for LLaVA‑Rad, MedGemma, LLaVA‑Med.
- Safety wrapper with conformal triage and abstention policy.
- Papers: measurement, mitigation, triage, and dissertation deliverables.

---

## Immediate Next Actions

1) Write one‑sentence thesis + aims into proposal shell.  
2) Build a 100‑case pilot with 6 paraphrase categories; report flips, consistency, and ECE per model.  
3) Implement paraphrase generator with NLI and concept‑equivalence filters.  
4) Draft IRB text for annotation and reader study.  
5) Prepare a 15‑slide deck (problem, gaps, aims, methods, pilot, risks, timeline).  


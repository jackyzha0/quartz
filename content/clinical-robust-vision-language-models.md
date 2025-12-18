---
title: Clinically Robust Vision-Language Models
date: 2025-12-07
tags:
  - medical-ai
  - vision-language-models
  - robustness
  - radiology
---

# Clinically Robust Vision-Language Models for Diagnostic Applications

**PhD Proposal Defense** | Binesh Sadanandan | Advisor: Dr. Vahid Behzadan

---

## Clinical Motivation

Healthcare faces a structural workforce crisis. By 2033, projections show a shortage of 17,000–42,000 diagnostic specialists including radiologists. Imaging volumes grow ~5% annually while residency positions increase only ~2%. AI tools like Gleamer's ChestView are already FDA-cleared and deployed—but when these systems influence clinical decisions, **how robust are they to natural variation in how clinicians phrase questions?**

## The Core Problem

We identified two coupled failure modes threatening safe clinical deployment:

### Phrasing-Sensitive Failure (PSF)
Semantically equivalent clinical questions yield **contradictory diagnoses**. For example, asking about lung "volumes" vs. "capacity" on the same X-ray produces entirely different findings—one correctly identifies pleural effusion, the other suggests pneumonia.

### Misleading Explanation Effect (MEE)
When models fail, their explanations (attention maps, confidence scores) still appear **highly faithful and anatomically correct**. Standard faithfulness metrics can't distinguish correct from incorrect predictions—creating false confidence exactly when vigilance is needed most.

> **The dangerous interaction**: A model can produce a wrong answer with stable attention on correct anatomical regions, and metrics will rate this as highly faithful.

## Central Research Question

> How can we make medical vision-language models reliable across natural linguistic variation, while ensuring their explanations faithfully reflect the evidence used for decisions?

**Hypothesis**: PSF and MEE arise from specific interactions between language, vision, and fusion components. Targeted interventions guided by causal analysis can reduce these failures without degrading accuracy.

---

## Research Approach: Four Thrusts

### Thrust 1: Measuring PSF & MEE
Build the **VSF-Med benchmark**: 2,000 base questions → 16,000 question-image pairs through expert-validated paraphrases.

**Key Metrics:**
- **Paraphrase Flip Rate (PFR)**: Proportion of paraphrase pairs yielding clinically inconsistent answers
- **Attention Stability Index (ASI)**: Cosine similarity of visual attention across paraphrases
- **MEE Coefficient (MEEC)**: Faithfulness difference between correct vs. incorrect predictions

*Pilot results*: Up to 17% flip rate; 100% of flips occur with stable attention (ASI > 0.80); both models show positive MEEC indicating MEE is present.

### Thrust 2: Causal Analysis
Trace failures to specific model components using mechanistic interpretability.

**Methods:**
- Activation patching for layer-wise intervention
- Causal mediation to decompose direct vs. indirect effects
- Region-constrained evaluation using Chest ImaGenome annotations

**Hypothesis**: Natural indirect effects through the fusion layers account for most phrasing sensitivity, while vision encoders remain stable.

### Thrust 3: Robustness Interventions
Parameter-efficient fine-tuning using **LoRA adapters** (< 1% trainable parameters) targeted at failure-causing components identified in Thrust 2.

**Training Objective:**
- Task loss (cross-entropy for correct predictions)
- Consistency loss (penalize divergent distributions across paraphrases)
- Representation loss (align embeddings at fusion point)

### Thrust 4: Clinical Safety Framework
Integrate adapted models into deployment workflows with human oversight.

**Components:**
- Selective prediction with calibrated abstention thresholds
- Multi-signal uncertainty fusion (confidence, paraphrase agreement, faithfulness)
- Human-in-the-loop escalation pathways
- Coverage-risk trade-offs for different scenarios (rule-out triage vs. rule-in alerting)

---

## Target Models

| Aspect | LLaVA-Rad | MedGemma-4B-it |
|--------|-----------|----------------|
| Base | Vicuna-7B | Gemma 3 |
| Vision Encoder | BiomedCLIP-CXR | SigLIP (medical) |
| Parameters | 7B | 4B |
| Training | LoRA fine-tuning on MIMIC-CXR | Continued pre-training + instruction tuning |

Both achieve clinician-level performance on standard benchmarks—but benchmarks don't test whether models remain correct when questions are rephrased.

---

## Expected Contributions

1. **VSF-Med Benchmark**: First paraphrase robustness benchmark for medical VQA
2. **Novel Metrics**: PFR, ASI, MEEC for joint characterization of failures
3. **Causal Attribution Atlas**: Layer and head-level sensitivity maps
4. **PEFT Framework**: Causally-guided LoRA placement for robustness
5. **Safety Architecture**: Multi-signal fusion with human-in-the-loop workflows

---

## Publication Targets

- ISBI 2026: Measuring paraphrase flip rate (abstract)
- NeurIPS 2026: VSF-Med benchmark
- ICML 2026: Paraphrase-consistent fine-tuning
- MICCAI 2026: Human-in-the-loop robustness
- CHIL 2026: Clinically aware robustness

---

## Broader Impact

- **Clinical**: Safer AI-assisted radiology with models that know when to defer
- **Research**: New evaluation paradigm beyond single-question accuracy
- **Accessibility**: Parameter-efficient methods feasible for resource-constrained institutions
- **Responsible AI**: Framework for evaluating failures before deployment

---

*All experiments conducted on publicly available datasets (MIMIC-CXR, Chest ImaGenome) following established ethical guidelines for AI safety research.*

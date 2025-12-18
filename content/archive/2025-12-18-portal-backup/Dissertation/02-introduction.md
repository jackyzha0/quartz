# Introduction

Medical vision-language models combine deep visual encoders with large language models to interpret medical images and answer clinical questions. Systems like CheXagent, LLaVA-Rad, and MedGemma show impressive performance on chest X-rays, CT scans, and MRI.

However, high overall accuracy doesn't guarantee safe deployment. Robustness studies reveal systematic problems that only become visible under specific stress conditions.

## The Problem: Phrasing Meets Visual Reasoning

Large language models exhibit robustness failures beyond simple accuracy drops. Simple paraphrases can cause models to produce inconsistent outputs, suggesting that apparent competence masks underlying brittleness.

This sensitivity becomes particularly concerning in medical contexts where terminology varies across hospitals, specialties, and regions.

## Coupled Failure Modes

This dissertation investigates two coupled failure modes:

### Phrasing-Sensitive Failure
Models sometimes change their answers under clinically equivalent paraphrasing while maintaining stable visual attention. This creates silent risks where clinicians may trust explanations that appear reliable but would produce different predictions with slight rewording.

### Misleading Explanation Effect
Standard faithfulness metrics may show higher scores for incorrect predictions than correct ones, potentially creating miscalibrated trust.

## Research Approach

This dissertation addresses these coupled failures through four interconnected parts:

1. **Measurement**: Construct a paraphrase benchmark with expert-validated semantic equivalence
2. **Causal Analysis**: Perform mechanistic interventions to identify which model components drive linguistic sensitivity
3. **Mitigation**: Develop mitigation strategies using parameter-efficient fine-tuning
4. **Deployment**: Integrate adapted models with selective prediction and calibration

The goal is to advance safe and reliable deployment of medical vision-language models in settings where linguistic variation and explanation quality directly affect patient care.

*Specific quantitative findings, examples, and detailed methodology reserved for publication.*

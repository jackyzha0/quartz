# Dissertation Proposal: Clinically Robust Vision-Language Models for Diagnostic Reasoning

> Measurement, Causality, Mitigation, and Safe Triage

[← Site Index](../Index.md) | [Timeline →](03-timeline.md)

---

## Background and Motivation

Medical vision-language models (VLMs) hold promise for assisting radiologists by interpreting imaging studies and answering clinical questions. However, current medical VLMs exhibit **brittle behavior under subtle input changes**, especially in phrasing of questions.

### The Clinical Safety Challenge

These failure modes create concerning scenarios in clinical practice where models may provide inconsistent outputs despite appropriate visual attention. This undermines the fundamental promise of explainable medical AI.

### Research Thrusts

This dissertation addresses these challenges through four interconnected thrusts:

1. **Measurement (Thrust 1)**: Establish benchmarks quantifying phrasing sensitivity in medical VLMs
2. **Causal Analysis (Thrust 2)**: Identify which model components drive phrasing sensitivity
3. **Mitigation (Thrust 3)**: Develop parameter-efficient interventions targeting identified components
4. **Safe Deployment (Thrust 4)**: Integrate adapted models into selective prediction frameworks for clinical triage

## Research Questions

1. How do medical VLMs respond to phrasing variations in clinical questions?
2. What are the causal mechanisms driving phrasing sensitivity?
3. Can parameter-efficient methods improve robustness?
4. How can selective prediction enable safe clinical deployment?

## Research Approach

This research investigates phrasing robustness in medical VLMs through systematic measurement, causal analysis, targeted mitigation, and deployment frameworks. Specific hypotheses, methodologies, and expected quantitative results are reserved for publication.

## Deliverables

### 1. Interpretability Toolkit
Open-source tools for analyzing medical VLM behavior, including visualization and debugging capabilities.

### 2. Robust VLM Checkpoints
Fine-tuned models with improved phrasing robustness.

### 3. Benchmark Dataset
A curated dataset for evaluating phrasing robustness in medical VQA.

### 4. Evaluation Metrics
Novel metrics for measuring robustness and clinical safety.

### 5. Publications and Dissertation
Conference and journal publications with doctoral dissertation.

## Publication Timeline

Target venues include top medical imaging (MICCAI), machine learning (NeurIPS), and clinical informatics (npj Digital Medicine, JAMIA) conferences and journals. Specific submission details reserved.

## Research Significance

This work addresses critical gaps in medical AI deployment:

1. **Clinical Safety**: Reducing phrasing brittleness prevents dangerous inconsistencies
2. **Trust Building**: Interpretable failures and uncertainty awareness increase clinician confidence
3. **Efficiency Gains**: Safe triage reduces radiologist workload without compromising care
4. **Methodological Advances**: Causal analysis techniques for multimodal medical AI
5. **Open Science**: Toolkit and datasets enable reproducible research

# Dissertation Proposal: A Robustness Gauntlet for Medical Vision-Language Models

> Working Title: A Robustness Gauntlet for Medical Vision-Language Models: Evaluating and Enhancing State-of-the-Art Systems on Chest X-ray Visual Question Answering

[← Site Index](../Index.md) | [Timeline →](timeline.md)

---

## Executive Summary

This PhD project develops a **"Robustness Gauntlet"** – a rigorous evaluation and training framework to stress-test medical Vision-Language Models (VLMs) and enhance their reliability for chest X-ray Q&A. Building upon an open-source toolkit, we address three critical challenges: **robustness** (to linguistic and visual variations), **interpretability** (attention grounding and attribution), and **safety** (triage mechanisms for clinical deployment). The work spans comprehensive evaluation methodology, model enhancement techniques, and practical deployment strategies for trustworthy medical AI.

## Introduction & Motivation

Medical Vision-Language Models hold promise for assisting radiologists by answering free-form questions about imaging studies. Despite advances with models like LLaVA-Rad (7B) and MedGemma (4B/27B), critical challenges remain:

### 1. Robustness Challenges
- **Linguistic brittleness**: Small variations in phrasing can derail model answers
- **Visual sensitivity**: Distribution shifts and minor perturbations degrade performance
- **Limited training data**: VQA-RAD has only ~3,000 QA pairs, leading to generalization issues

### 2. Interpretability Gaps
- **Black-box behavior**: Unclear if models "look" at correct pathology
- **Attribution failures**: Attention maps may be diffuse or mislocalized
- **Clinical trust**: Radiologists need explanations to validate AI outputs

### 3. Safety Requirements
- **Overconfident errors**: Models lack mechanisms to express uncertainty
- **No triage logic**: Cannot defer difficult cases to human experts
- **Hallucination risks**: Unacceptable for patient care decisions

## Research Questions

### RQ1: Linguistic Robustness
**How robust are current chest X-ray VQA models to linguistic variations in questions?**

**Hypothesis**: State-of-the-art medical VLMs exhibit sensitivity to question phrasing. Meaning-preserving paraphrases will cause answer "flips" and confidence shifts in 30%+ of cases.

**Expected Results**: 
- Baseline models show 60-70% consistency on paraphrased variants
- Negations and complex phrasings particularly confound models
- Instruction-tuned models (MedGemma) may handle synonyms better than smaller fine-tuned models

### RQ2: Visual Robustness
**How do VLMs perform under visual perturbations and distribution shifts in chest X-ray data?**

**Hypothesis**: Models show fragility to visual variations outside training distribution. Minor perturbations or dataset shifts will cause significant performance degradation.

**Expected Results**:
- 10-20% absolute accuracy drop on out-of-distribution datasets
- Small noise/rotation causes several percentage points drop
- Models become more uncertain or generic under unfamiliar visuals

### RQ3: Attention Grounding
**Do current VLMs ground their answers in the correct image regions, and how can attribution analysis reveal spurious reasoning?**

**Hypothesis**: Attribution analysis will reveal that models often fail to fully ground answers in clinically relevant regions, indicating potential spurious reasoning.

**Expected Results**:
- Average focus metric in mid-range (diffuse attention)
- Correct ROI in top-attended regions ~70% for straightforward cases
- Evidence of spurious correlations (e.g., always looking at heart border for pneumonia)

### RQ4: Robustness Enhancement
**Can we improve robustness and consistency through targeted training or architectural enhancements?**

**Hypothesis**: Targeted interventions (paraphrase training, consistency regularization, attention supervision) will significantly enhance robustness without sacrificing accuracy.

**Expected Results**:
- Flip-rate reduction to <20% (from >30%)
- Improved focus metrics and ROI alignment
- Better performance under distribution shifts
- Maintained or improved standard accuracy

### RQ5: Clinical Triage
**How can we integrate a triage mechanism into the VQA system to ensure safe clinical deployment?**

**Hypothesis**: A triage logic monitoring outputs and internal signals can catch 80%+ of errors while deferring only 15-20% of queries.

**Expected Results**:
- Triage catches >80% of incorrect/hallucinated answers
- System achieves ~90% "safe accuracy" with selective answering
- Minimal impact on utility (most confident answers remain correct)

## Methods

### Evaluation Framework
1. **Linguistic Testing**
   - Paraphrase generation (synonymy, negation, hedging, temporality)
   - Answer flip-rate and consistency metrics
   - Question type analysis (factual vs. complex reasoning)

2. **Visual Testing**
   - Controlled perturbations (noise, rotation, brightness)
   - Cross-dataset evaluation (MIMIC → CheXpert, NIH)
   - Robustness indices and calibration shifts

3. **Attribution Analysis**
   - Unified attention extraction across architectures
   - Focus metrics (entropy-based concentration)
   - ROI support evaluation with ground truth
   - Spurious correlation detection

### Enhancement Techniques
1. **Training Improvements**
   - Paraphrase-based data augmentation
   - Consistency losses between semantic variants
   - Attention supervision with known ROIs
   - Chain-of-thought prompting integration

2. **Architecture Modifications**
   - Consistency regularizers
   - Multi-task training for attention prediction
   - Ensemble methods with dispersion awareness

### Triage System Design
1. **Uncertainty Detection**
   - Multi-prompt consistency checking
   - Confidence score analysis
   - Attention diffusion detection

2. **Error Prediction**
   - Neural classifier on internal features
   - Question type risk assessment
   - Selective answering thresholds

## Key Deliverables

### 1. Enhanced Medical VLM Interpretability & Robustness Toolkit
- Expanded open-source framework for comprehensive VLM evaluation
- Modules for batch robustness auditing, attribution analysis, paraphrase visualization
- Integrated triage capabilities with uncertainty detection
- Documentation, example notebooks, and web demos

### 2. Robust Chest X-ray VQA Benchmark Datasets
- **Paraphrase Benchmark Set**: Multiple variants per question with ground truth
- **Visual Perturbation Test Set**: Modified images with controlled changes
- **Hard Cases & OOD Set**: Rare findings and cross-dataset challenges
- **Region Ground Truth Annotations**: Expert-annotated ROIs for grounding evaluation

### 3. Improved Vision-Language Models
- Fine-tuned robust versions of LLaVA-Rad and MedGemma
- Model variants: single-image QA and multi-image comparison
- Open-source weights on HuggingFace with performance reports
- Interactive demos via Gradio web applications

### 4. Publications & Dissemination
- Conference papers at MICCAI, NeurIPS, and potentially CVPR/ICLR
- Comprehensive journal article in Nature npj Digital Medicine
- Workshop presentations and technical reports
- Clinical outreach at RSNA and medical AI forums

### 5. Clinical Integration Artifacts
- User guide for clinicians on interpreting model outputs
- Pilot study design for radiology workflow integration
- Human factors analysis with radiologist collaborators
- Best practices for safe deployment

## Publication Timeline

### 2025
- **Q1-Q2**: MICCAI 2025 submission on evaluation methodology (RQ1-3)
- **Mid-year**: NeurIPS 2025 submission on robustness enhancement (RQ4)
- **Late 2025**: RSNA 2025 demonstration for clinical feedback
- **Ongoing**: Workshop papers at MIDL, ML4H

### 2026
- **Early**: Nature npj Digital Medicine comprehensive article
- **Mid-year**: MICCAI 2026 on triage systems (RQ5) or extensions
- **Late**: NeurIPS 2026 follow-up or workshop organization
- **End**: Dissertation defense and final toolkit release

## Expected Impact

This work will establish new evaluation standards for medical VLMs through:
- Comprehensive robustness testing methodology
- Practical enhancement techniques with proven results
- Safe deployment strategies with clinical viability
- Open-source tools enabling community-wide adoption
- Foundation for trustworthy medical vision-language AI

The "Robustness Gauntlet" framework will become an essential component in developing and validating medical VQA systems, ensuring they meet the reliability requirements for clinical deployment.

## References

Key foundational works:
- LLaVA-Rad: [arXiv:2403.08002](https://arxiv.org/abs/2403.08002)
- MedGemma: [arXiv:2507.05201](https://arxiv.org/abs/2507.05201)
- GEMeX Dataset: [arXiv:2411.16778](https://arxiv.org/html/2411.16778v2)
- Medical VLM Interpretability Toolkit: [GitHub](https://github.com/thedatasense/medical-vlm-intepret)

See also: 
- [[Evaluation/robustness-gauntlet|Robustness Gauntlet Framework]]
- [[Safety/02-selective-conformal-triage|Selective Conformal Triage]]
- [[Healthcare/03-llava-rad|LLaVA-RAD]]
- [[Healthcare/02-medgemma|MedGemma]]
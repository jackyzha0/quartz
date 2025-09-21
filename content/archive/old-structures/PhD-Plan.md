# PhD Research Plan: Robust Medical Vision-Language Models for Clinical Decision Support

> A comprehensive framework for quantifying and improving the robustness, safety, and evidence alignment of medical VLMs in chest X-ray visual question answering, while preserving clinical utility

> Note: VSF‑Med‑VQA framework is now implemented. The current dissertation direction focuses on phrasing‑robust medical VLMs with selective conformal triage. See [[01-proposal|Dissertation Proposal]].

## Executive Summary (Archived Plan)

This page documents the earlier **VSF‑Med‑VQA** (Vision‑Safety Framework for Medical Visual Question Answering) work: a unified evaluation and defense system that quantifies vulnerabilities, validates visual evidence alignment, and provides practical defenses. In the current dissertation, VSF‑Med‑VQA serves as background infrastructure; the core contribution is a paraphrase‑robustness baselining framework with selective conformal triage. See [[01-proposal|current proposal]].

## Thesis Statement

Medical vision-language models deployed for chest X-ray visual question answering must balance three competing objectives: answer reliability, resilience to adversarial manipulation, and faithfulness to radiographic evidence. This dissertation delivers a comprehensive framework that:
1. Quantifies multi-dimensional vulnerabilities in medical VLMs
2. Validates model attention against clinical anatomy
3. Provides lightweight defenses that preserve diagnostic utility

## Prior Framework: VSF‑Med‑VQA

**What it provided**: A benchmarked evaluation pipeline that:
- Jointly measures answer reliability, attack susceptibility, and visual-evidence consistency
- Targets state-of-the-art models (MedGemma-4B and LLaVA-RAD)
- Couples vulnerability scoring with practical test-time defenses
- Maintains clinical usefulness through risk-aware evaluation

## Research Questions & Workstreams

### RQ1: Comprehensive Vulnerability Assessment

**Research Question**  
How vulnerable are state-of-the-art medical VLMs (MedGemma and LLaVA-RAD) to multimodal attacks on MIMIC-CXR VQA, and what are the trade-offs between robustness and clinical utility?

**Methodology**
1. **Multi-Axis Vulnerability Framework**
   - Prompt-based attacks: injection, role manipulation, context hijacking
   - Visual perturbations: adversarial patches, imperceptible noise, medical artifacts
   - Multimodal attacks: synchronized image-text manipulations
   - Clinical relevance: impact on diagnostic accuracy

2. **Evaluation Infrastructure**
   - Automated test harness for systematic perturbation sweeps
   - SSIM-constrained adversarial generation
   - Cross-model transferability analysis
   - Clinical risk-weighted scoring

3. **Deliverables**
   - VSF-Med-VQA vulnerability scores across attack dimensions
   - Public benchmark leaderboard for medical VLM robustness
   - Risk@Utility trade-off analysis

**Hypotheses**
- H1.1: LLaVA-RAD exhibits superior robustness to natural corruptions but remains vulnerable to targeted prompt injections
- H1.2: Medical-specific training (MedGemma) provides limited adversarial robustness without explicit defense mechanisms
- H1.3: Vulnerability severity correlates with clinical risk categories (critical > urgent > routine findings)

**Related Work**: [[Attacks/vlm-attacks|VLM Attack Taxonomy]], [[Evaluation/HELM Framework|Evaluation Methodology]]

### RQ2: Visual Evidence Alignment & Hallucination Detection

**Research Question**  
Do medical VLMs attend to clinically relevant anatomical regions when generating answers, and how does attention alignment correlate with answer correctness and hallucination rates?

**Methodology**
1. **Attention Extraction Pipeline**
   - Decoder self-attention maps from final answer tokens
   - 16×16 token grid upsampling to full resolution
   - Grad-CAM as fallback for models without accessible attention
   - Multi-layer attention aggregation strategies

2. **Evidence Alignment Metrics (EAS)**
   - Anatomical overlap: lung fields, heart, mediastinum coverage
   - Clinical relevance: pathology-specific attention patterns
   - Stability metrics: attention consistency across paraphrases
   - Hallucination indicators: attention to non-existent features

3. **Clinical Validation**
   - Expert radiologist attention map validation
   - Correlation with diagnostic accuracy
   - Error case analysis

**Hypotheses**
- H2.1: Correct diagnoses show 40% higher anatomical alignment than incorrect answers
- H2.2: Adversarial perturbations shift attention to image borders and artifacts
- H2.3: Hallucinated findings correlate with diffuse, unfocused attention patterns

**Related Work**: [[Architecture/Foundations/VLM Basics|Attention Mechanisms]], [[Healthcare/Medical Vision-Language Models|Clinical Validation]]

### RQ3 — Prompt Robustness & Safety Guards
**Question.** Which prompt-guarding strategies withstand injection and role-swap tricks without degrading clean MIMIC-CXR VQA accuracy?

**Planned Work.**
- Compare: (a) instruction prefixing, (b) answer-only + abstain protocols, (c) reflection prompts requiring evidence citation, (d) context scrubbing, and (e) paraphrase-majority voting.
- Score each combination with VSF-Med-VQA plus standard utility metrics (balanced accuracy, abstention-aware AUROC).

**Hypotheses.**
- Answer-only + abstain improves safety with minimal utility loss.
- Reflection prompts enhance alignment but increase latency.

### RQ4 — Visual Robustness & Test-time Defenses
**Question.** Which lightweight test-time defenses curb vulnerability without major utility loss?

**Planned Work.**
- Evaluate input randomization (resize/crop/flip), CLAHE, bit-depth squeezing, token dropout on low-mass visual tokens, and vote-by-augmentation (Raleigh smoothing).
- Report Robust Utility Curves: accuracy vs distortion/attack SSIM and Risk@Utility deltas.

**Hypothesis.** Token dropout plus vote-by-augmentation reduces adversarial success and paraphrase instability, improving VSF-Med-VQA scores.

### RQ5 — Robustness–Interpretability Pareto & Clinical Risk
**Question.** Is there a Pareto frontier between robustness (VSF-Med-VQA) and evidence alignment (EAS), and how does it map to pathology-specific risk weights?

**Planned Work.**
- Build risk-weighted utility metrics (e.g., pneumothorax > atelectasis typos).
- Plot defense and prompt configurations on a Robustness–Alignment Pareto chart; identify per-model sweet spots.

**Hypotheses.**
- LLaVA-RAD dominates utility/alignment on infection and opacity cases.
- MedGemma variants match performance once defenses are enabled on perturbations.

## Technical Infrastructure

### Datasets
- **Primary**: MIMIC-CXR-JPG (377,110 images, 227,827 studies)
  - Train/validation/test splits following official protocol
  - Curated 1,000-sample VQA subset for rapid iteration
  - Pathology-balanced evaluation sets
- **Secondary**: CheXpert for external validation
- **Annotations**: Expert-validated VQA pairs with clinical relevance labels

### Models Under Study
1. **MedGemma Family**
   - MedGemma-4B-VQA: Specialized for medical visual QA
   - MedGemma-4B-Report: Report generation variant
   - Architecture details: [[Healthcare/MedGemma|MedGemma Overview]]

2. **LLaVA Medical Variants**
   - LLaVA-RAD: Radiology-specific fine-tuning
   - LLaVA-Med: General medical adaptation
   - Comparison baseline: Original LLaVA

### Evaluation Infrastructure
- **VSF-Med-VQA Harness**: Automated evaluation pipeline
  - Multi-GPU parallel attack generation
  - Real-time attention extraction
  - Clinical risk-weighted scoring
  - Defense mechanism integration
- **Metrics Dashboard**: Interactive visualization of results
- **Reproducibility**: Docker containers with fixed seeds

## Deliverables & Artifacts

### 1. VSF-Med-VQA Framework
- Open-source evaluation toolkit
- Standardized vulnerability metrics
- Public leaderboard for medical VLM robustness
- Integration guides for new models

### 2. Attention Analysis Suite
- EAS (Evidence Alignment Score) implementation
- Anatomical mask overlays
- Clinical correlation tools
- Visualization notebooks

### 3. Defense Toolkit
- Prompt engineering templates
- Test-time augmentation library
- Ensemble voting implementations
- Deployment best practices

### 4. Research Publications
- Main paper: "VSF-Med-VQA: A Comprehensive Framework for Medical VLM Robustness"
- Technical report: Implementation details and extended results
- Clinical study: Radiologist validation of attention alignment

## Implementation Timeline

### Phase 1: Foundation (Weeks 1-3)
- Environment setup and baseline reproduction
- Model access and computational resource allocation
- Initial MIMIC-CXR VQA subset curation
- Clean performance benchmarking

### Phase 2: Vulnerability Assessment (Weeks 4-6)
- VSF-Med-VQA implementation
- Attack generation pipeline
- Cross-model transferability studies
- Initial vulnerability scoring

### Phase 3: Attention Analysis (Weeks 7-9)
- Attention extraction infrastructure
- EAS metric development
- Anatomical alignment validation
- Hallucination detection mechanisms

### Phase 4: Defense Development (Weeks 10-12)
- Prompt engineering experiments
- Test-time defense implementation
- Ensemble strategy optimization
- Robustness-utility trade-off analysis

### Phase 5: Clinical Integration (Weeks 13-15)
- Risk-weighted evaluation
- Radiologist validation studies
- Deployment guidelines
- Final artifact preparation

## Expected Impact

### Scientific Contributions
1. **First comprehensive robustness benchmark** for medical VLMs
2. **Novel attention-anatomy alignment metrics** for clinical AI
3. **Practical defense strategies** maintaining diagnostic utility
4. **Risk-aware evaluation framework** for medical AI deployment

### Clinical Applications
- Safer deployment of AI in radiology departments
- Evidence-based trust calibration for clinicians
- Reduced risk of adversarial manipulation
- Improved diagnostic support reliability

### Broader Implications
- Standards for medical AI evaluation
- Regulatory guidance for robust AI systems
- Foundation for multi-institutional validation
- Open science in medical AI safety

## Related Resources
- [[Attacks/vlm-attacks|Adversarial Attack Methods]]
- [[Safety/MLLMGuard Framework|Safety Implementation]]
- [[Evaluation/HELM Framework|Evaluation Standards]]
- [[Healthcare/Medical Vision-Language Models|Medical VLM Landscape]]

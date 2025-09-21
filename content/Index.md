# Medical Vision-Language Model Robustness Research

> **Binesh Kumar** — PhD Candidate, Secure and Assured Intelligent Learning (SAIL) Lab, University of New Haven  
> Research Focus: Phrasing-Robust Medical Vision-Language Models for Radiology: Measurement, Causality, Mitigation, and Safe Triage

## Research Overview

This digital garden documents my dissertation research on making medical Vision-Language Models robust to phrasing variations in radiology. Current medical VLMs exhibit brittle behavior where paraphrasing a question can flip answers or change confidence unpredictably – a critical safety risk. Building upon an open-source interpretability toolkit, this work measures phrasing effects, identifies causal factors behind failures, develops mitigation strategies, and integrates uncertainty-aware triage for safe clinical deployment.

### Core Research Questions
1. **Phrasing Robustness**: How can we quantify and improve medical VLM robustness to question phrasing variations?
2. **Causal Attribution**: What causal factors drive VLM failures under paraphrased inputs?
3. **Uncertainty & Reliability**: How can we quantify uncertainty so models know when they're unsure?
4. **Safe Triage Integration**: How can VLMs be integrated as safe triage tools without missing critical findings?
5. **Generalization**: Do robustness improvements generalize across datasets and modalities?

## 🚀 Quick Navigation

### Start Here
- [[01-proposal|Dissertation Proposal]] — Phrasing-Robust Medical VLMs
- [[03-timeline|Timeline to Aug 2026]] — Detailed monthly milestones
- [[Evaluation/phrasing-robustness-framework|Phrasing Robustness Framework]] — Core methodology
- [[Evaluation/interpretability-toolkit|Interpretability Toolkit]] — Open-source deliverable
- [[Healthcare/01-medical-vision-language-models|Medical VLMs Overview]]

## 📚 Research Areas

### 🏗️ Architecture Foundations
- [[01-transformer-architecture|Transformer Architecture]] — Self-attention mechanisms and positional encodings
- [[02-large-language-models|LLM Fundamentals]] — Scaling laws, training dynamics, and emergence
- [[03-vlm-basics|Vision-Language Integration]] — Cross-modal alignment and fusion strategies
- [[04-byte-pair-encoding|Tokenization Methods]] — BPE and multimodal tokenization
- [[05-gemma-3-architecture|Modern Architecture Designs]] — State-of-the-art model architectures

### 🏥 Healthcare Applications
- [[Healthcare/02-medgemma|MedGemma]] — Google's clinical language models
- [[Healthcare/03-llava-rad|LLaVA-RAD]] — Primary evaluation target for paraphrase robustness
- [[Healthcare/04-ehr-and-temporal-models|Temporal Clinical Modeling]] — Sequential patient data analysis
- [[Healthcare/05-validation-and-datasets|Clinical Datasets]] — VQA-RAD, PMC-VQA, SLAKE
- [[Healthcare/01-medical-vision-language-models|Medical VLM Landscape]] — Current models and capabilities

### 🛡️ Robustness & Safety
- [[Evaluation/02-paraphrase-robustness|Paraphrase Robustness]] — Core metrics and methodology
- [[Safety/02-selective-conformal-triage|Selective Conformal Triage]] — Safe deployment with guarantees
- [[Attacks/index|Adversarial Robustness]] — Background on general attacks
- [[Safety/01-mllmguard-framework|MLLMGuard Framework]] — Comprehensive protection system

### 📊 Evaluation & Metrics
- [[Evaluation/01-medphr-rad|MedPhr-Rad Benchmark]] — Paraphrase robustness evaluation
- [[Evaluation/03-metrics-and-calibration|Calibration & Uncertainty]] — Confidence estimation
- [[Evaluation/04-helm-framework|HELM Benchmark]] — Holistic evaluation methodology
- [[Evaluation/05-pretraining-comparison|Model Comparison Studies]] — Performance across architectures

## 🔬 Current Research Focus

### Active Work Streams

1. **Phrasing Robustness Measurement (H1)**
   - Flip-rate quantification across paraphrases (target: >20% → <5%)
   - Attention consistency metrics under rephrasing
   - Paraphrase dataset creation from MIMIC-CXR
   - Baseline evaluation: LLaVA-Rad, MedGemma

2. **Causal Attribution Analysis (H2)**
   - Causal mediation analysis of phrasing → attention → answers
   - Intervention experiments on attention distributions
   - Identifying linguistic constructs causing failures
   - Quantifying mediation effects

3. **Uncertainty & Mitigation (H3)**
   - Calibrated confidence scores and "I don't know" options
   - Consistency loss training with paraphrase augmentation
   - Brier score optimization
   - Target: 95% sensitivity with 5-10% abstention

4. **Safe Triage System (H4)**
   - Confidence thresholds for auto-clearance
   - Near-100% sensitivity for critical findings
   - 30-40% workload reduction on normal cases
   - OOD detection integration

## 🛠️ Technical Stack

### Models Under Study
- **[[Healthcare/03-llava-rad|LLaVA-RAD]]**: Primary target for paraphrase robustness
- **[[Healthcare/02-medgemma|MedGemma]]**: Secondary comparison model
- **GPT-5**: Closed-source baseline for state-of-the-art comparison
- **LLaVA-Med**: Baseline medical VLM
- **BiomedCLIP**: Domain-adapted foundation model

### Evaluation Datasets
- **MIMIC-CXR**: Base for paraphrase dataset creation
- **VQA-RAD**: Radiology visual question answering
- **NEJM Image Challenge**: External validation set
- **Radiology Paraphrase QA**: New dataset with multiple rephrasings (deliverable)

### Key Metrics
- **Flip-Rate**: Answer changes across paraphrases (baseline >20%, target <5%)
- **Attention Consistency**: JS divergence between paraphrase attention maps
- **Calibration**: Brier score and reliability diagrams
- **Triage Sensitivity**: Detection of critical findings (target: ~100%)
- **Workload Reduction**: % of normal cases auto-cleared (target: 30-40%)
- **Generalization Gap**: Performance drop on external datasets

## 📈 Expected Impact

- **<5% flip-rate** on paraphrased questions (vs >20% baseline)
- **Causal evidence** linking phrasing to attention shifts and errors
- **95% sensitivity** at 5-10% abstention rate
- **30-40% workload reduction** with near-zero missed critical findings
- **Generalization** to external datasets and modalities
- **Open-source toolkit** with debugging, visualization, and safety analysis

## 🤝 Collaboration & Contact

I welcome collaborations on:
- Medical VLM robustness evaluation
- Interpretability and attention analysis
- Clinical triage and safety mechanisms
- Chest X-ray VQA datasets and benchmarks
- Clinical validation and deployment studies

Connect via the SAIL Lab or university email.

---

### Quick Links to Key Sections
- [[Evaluation/index|Evaluation Methods]]
- [[Healthcare/index|Medical Models]]
- [[Architecture/index|Technical Foundations]]
- [[Safety/index|Safety Frameworks]]

### Archived Content
- [[archive/old-structures/PhD-Plan|VSF-Med-VQA (prior framework)]]
- [[archive/old-structures/About|About (old version)]]
- [[archive/old-structures/medphr-rad-original|MedPhr-Rad (original paraphrase focus)]]
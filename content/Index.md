# Medical Vision-Language Model Robustness Research

> **Binesh Kumar** — PhD Candidate, Secure and Assured Intelligent Learning (SAIL) Lab, University of New Haven  
> Research Focus: Phrasing-robust medical VLMs with selective conformal triage for safe clinical deployment

## Research Overview

This digital garden documents my dissertation research on developing robust, evidence-grounded medical Vision-Language Models (VLMs) for clinical decision support. The central contribution is **MedPhr-Rad**: a paraphrase-robustness baselining framework for radiology VLMs with standardized taxonomy, generators, and metrics to measure phrasing sensitivity, plus selective conformal triage for safe deployment.

### Core Research Questions
1. How do semantically equivalent phrasings affect medical VLM predictions?
2. What causes medical VLMs to flip predictions on paraphrased questions?
3. How can we mitigate paraphrase sensitivity while maintaining clinical accuracy?
4. Can we provide mathematical safety guarantees for automated clinical decisions?

## 🚀 Quick Navigation

### Start Here
- [[Dissertation/proposal|Current Dissertation Proposal]] — Phrasing-robust medical VLMs
- [[Dissertation/timeline|Timeline to Aug 2026]]
- [[Evaluation/medphr-rad|MedPhr-Rad Framework]] — Core contribution
- [[Healthcare/medical-vision-language-models|Medical VLMs Overview]]

## 📚 Research Areas

### 🏗️ Architecture Foundations
- [[Architecture/Foundations/transformer-architecture|Transformer Architecture]] — Self-attention mechanisms and positional encodings
- [[Architecture/Foundations/large-language-models|LLM Fundamentals]] — Scaling laws, training dynamics, and emergence
- [[Architecture/Foundations/vlm-basics|Vision-Language Integration]] — Cross-modal alignment and fusion strategies
- [[Architecture/Foundations/byte-pair-encoding|Tokenization Methods]] — BPE and multimodal tokenization
- [[Architecture/Foundations/gemma3-architecture|Modern Architecture Designs]] — State-of-the-art model architectures

### 🏥 Healthcare Applications
- [[Healthcare/medgemma|MedGemma]] — Google's clinical language models
- [[Healthcare/llava-rad|LLaVA-RAD]] — Primary evaluation target for paraphrase robustness
- [[Healthcare/ehr-and-temporal-models|Temporal Clinical Modeling]] — Sequential patient data analysis
- [[Healthcare/validation-and-datasets|Clinical Datasets]] — VQA-RAD, PMC-VQA, SLAKE
- [[Healthcare/medical-vision-language-models|Medical VLM Landscape]] — Current models and capabilities

### 🛡️ Robustness & Safety
- [[Evaluation/paraphrase-robustness|Paraphrase Robustness]] — Core metrics and methodology
- [[Safety/selective-conformal-triage|Selective Conformal Triage]] — Safe deployment with guarantees
- [[Attacks/index|Adversarial Robustness]] — Background on general attacks
- [[Safety/mllmguard-framework|MLLMGuard Framework]] — Comprehensive protection system

### 📊 Evaluation & Metrics
- [[Evaluation/medphr-rad|MedPhr-Rad Benchmark]] — Paraphrase robustness evaluation
- [[Evaluation/metrics-and-calibration|Calibration & Uncertainty]] — Confidence estimation
- [[Evaluation/helm-framework|HELM Benchmark]] — Holistic evaluation methodology
- [[Evaluation/pretraining-comparison|Model Comparison Studies]] — Performance across architectures

## 🔬 Current Research Focus

### Active Work Streams

1. **Paraphrase Robustness Measurement (MedPhr-Rad)**
   - Taxonomy: synonymy, negation, hedging, temporality, quantifiers, units, style
   - Metrics: consistency rate, flip rate, robust accuracy, selective risk
   - Baselines: LLaVA-Rad, MedGemma, LLaVA-Med

2. **Causal Analysis of Prediction Flips**
   - Text-to-concept parsing vs image-region grounding
   - Attention rollout, Integrated Gradients, ViT relevance
   - RadLex/UMLS concept linking, RadGraph entity alignment

3. **Mitigation Strategies**
   - Paraphrase-consistency losses
   - Constrained augmentation with NLI gates
   - Concept normalization before verbalization
   - Prompt ensembles with dispersion-aware abstention

4. **Selective Conformal Triage**
   - Post-hoc calibration (temperature scaling)
   - Conformal risk control with coverage guarantees
   - Subgroup-aware coverage for sentinel findings
   - Zero critical errors at 80% automation rate

## 🛠️ Technical Stack

### Models Under Study
- **[[Healthcare/llava-rad|LLaVA-RAD]]**: Primary target for paraphrase robustness
- **[[Healthcare/medgemma|MedGemma]]**: Secondary comparison model
- **LLaVA-Med**: Baseline medical VLM
- **BiomedCLIP**: Domain-adapted foundation model

### Evaluation Datasets
- **VQA-RAD**: Core radiology VQA dataset
- **PMC-VQA**: Diverse medical imaging VQA
- **SLAKE**: Bilingual medical VQA
- **MedPhr-Rad**: Our paraphrase benchmark (in development)

### Key Metrics
- **Paraphrase Consistency Rate (PCR)**: Agreement across paraphrases
- **Flip Rate**: Frequency of prediction changes
- **Robust Accuracy**: Worst-case performance
- **Selective Risk@Coverage**: Error rate on auto-accepted cases

## 📈 Expected Impact

- **+15 points** paraphrase consistency vs baseline
- **Robust accuracy** within 2 points of standard accuracy
- **ECE ≤ 5%** after calibration
- **80% automation** with mathematical safety guarantees
- **Zero sentinel errors** through selective triage

## 🤝 Collaboration & Contact

I welcome collaborations on:
- Paraphrase robustness in medical AI
- Selective prediction with safety guarantees
- Clinical validation studies
- Medical concept grounding
- Conformal prediction for healthcare

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
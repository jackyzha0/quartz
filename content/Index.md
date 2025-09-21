# Medical Vision-Language Model Robustness Research

> **Binesh Kumar** — PhD Candidate, Secure and Assured Intelligent Learning (SAIL) Lab, University of New Haven  
> Research Focus: A Robustness Gauntlet for Medical Vision-Language Models in Chest X-ray Visual Question Answering

## Research Overview

This digital garden documents my dissertation research on developing a **"Robustness Gauntlet"** – a rigorous evaluation and training framework to stress-test medical VLMs and enhance their reliability for chest X-ray Q&A. Building upon an open-source toolkit, this comprehensive platform addresses robustness (linguistic and visual), interpretability (attention grounding), and safety (triage mechanisms) for clinical deployment.

### Core Research Questions
1. **RQ1**: How robust are current chest X-ray VQA models to linguistic variations?
2. **RQ2**: How do VLMs perform under visual perturbations and distribution shifts?
3. **RQ3**: Do VLMs ground their answers in correct image regions?
4. **RQ4**: Can we improve robustness through targeted training?
5. **RQ5**: How can we integrate triage mechanisms for safe clinical deployment?

## 🚀 Quick Navigation

### Start Here
- [[Dissertation/proposal|Current Dissertation Proposal]] — Robustness Gauntlet for Medical VLMs
- [[Dissertation/timeline|Timeline to Aug 2026]] — Publications 2025-2026
- [[Evaluation/robustness-gauntlet|Robustness Gauntlet Framework]] — Core contribution
- [[Healthcare/01-medical-vision-language-models|Medical VLMs Overview]]

## 📚 Research Areas

### 🏗️ Architecture Foundations
- [[Architecture/Foundations/01-transformer-architecture|Transformer Architecture]] — Self-attention mechanisms and positional encodings
- [[Architecture/Foundations/02-large-language-models|LLM Fundamentals]] — Scaling laws, training dynamics, and emergence
- [[Architecture/Foundations/03-vlm-basics|Vision-Language Integration]] — Cross-modal alignment and fusion strategies
- [[Architecture/Foundations/04-byte-pair-encoding|Tokenization Methods]] — BPE and multimodal tokenization
- [[Architecture/Foundations/05-gemma-3-architecture|Modern Architecture Designs]] — State-of-the-art model architectures

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

1. **Robustness Evaluation Framework**
   - Linguistic robustness: paraphrase testing, negation handling, synonym variation
   - Visual robustness: noise perturbations, distribution shifts, OOD detection
   - Comprehensive metrics: flip-rate, consistency scores, calibration drift
   - Baseline models: LLaVA-Rad (7B), MedGemma (4B/27B), GPT-4V

2. **Attribution & Interpretability Analysis**
   - Unified attention extraction across architectures
   - Focus metrics: attention entropy, ROI alignment accuracy
   - Spurious reasoning detection via attention mislocalization
   - Integration with GEMeX groundings and Chest ImaGenome

3. **Robustness Enhancement Methods**
   - Paraphrase-based data augmentation
   - Consistency training with semantic invariance losses
   - Attention supervision for better grounding
   - Chain-of-thought prompting for factual accuracy

4. **Clinical Triage & Safety System**
   - Multi-prompt consistency checking
   - Confidence-based deferral mechanisms
   - Learned error prediction from internal signals
   - Safe deployment with 80%+ error detection at 15-20% deferral

## 🛠️ Technical Stack

### Models Under Study
- **[[Healthcare/03-llava-rad|LLaVA-RAD]]**: Primary target for paraphrase robustness
- **[[Healthcare/02-medgemma|MedGemma]]**: Secondary comparison model
- **LLaVA-Med**: Baseline medical VLM
- **BiomedCLIP**: Domain-adapted foundation model

### Evaluation Datasets
- **VQA-RAD**: Core radiology VQA dataset (~3K QA pairs)
- **MIMIC-CXR-VQA**: Large-scale chest X-ray QA
- **GEMeX**: Grounded medical VQA with region annotations
- **Robustness Gauntlet Sets**: Paraphrase variants, visual perturbations, hard cases

### Key Metrics
- **Answer Flip-Rate**: Frequency of answer changes on paraphrases
- **Consistency Score**: Agreement across linguistic variants
- **Focus Metric**: Attention concentration (entropy-based)
- **ROI Support**: Overlap with ground-truth regions
- **Triage Precision/Recall**: Error detection performance
- **Safe Accuracy**: Performance after triage deferral

## 📈 Expected Impact

- **<20% flip-rate** on paraphrased questions (vs >30% baseline)
- **~70% ROI alignment** for attention maps on key findings
- **>80% error detection** by triage module
- **~90% safe accuracy** with selective answering
- **Robust performance** under visual perturbations and distribution shifts
- **Open-source toolkit** for community-wide robustness evaluation

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
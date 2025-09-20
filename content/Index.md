# Medical Vision-Language Model Robustness Research

> **Binesh Kumar** — PhD Candidate, Secure and Assured Intelligent Learning (SAIL) Lab, University of New Haven  
> Research Focus: Trustworthy multimodal systems for high-stakes healthcare environments

## Research Overview

This digital garden documents my dissertation research on developing robust, evidence-grounded medical Vision-Language Models (VLMs) for clinical decision support. The central contribution is **VSF-Med-VQA** (Vision-Safety Framework for Medical Visual Question Answering), a comprehensive evaluation and defense pipeline designed to ensure reliability of multimodal AI in healthcare settings.

### Core Research Questions
1. How can we systematically evaluate adversarial robustness in medical VLMs?
2. What defense mechanisms effectively mitigate attacks while preserving clinical utility?
3. How do we balance model robustness with alignment to medical expertise?

## Quick Navigation

### 🎯 Start Here
- [[PhD-Plan|PhD Research Plan & Timeline]]
- [[About|About This Research]]
- [[Healthcare/Medical Vision-Language Models|Medical VLMs Overview]]
- [[Attacks/vlm-attacks|Adversarial Attack Taxonomy]]
- [[Evaluation/HELM Framework|Evaluation Framework]]

## Research Areas

### 🏗️ Foundational Architecture
- [[Architecture/Foundations/Transformer Architecture|Transformer Architecture]] — Self-attention mechanisms and positional encodings
- [[Architecture/Foundations/Large Language Models|LLM Fundamentals]] — Scaling laws, training dynamics, and emergence
- [[Architecture/Foundations/VLM Basics|Vision-Language Integration]] — Cross-modal alignment and fusion strategies
- [[Architecture/Foundations/Byte Pair Encoding|Tokenization Methods]] — BPE and multimodal tokenization
- [[Architecture/Foundations/Gemma 3 Architecture|Modern Architecture Designs]] — State-of-the-art model architectures

### 🏥 Healthcare Applications
- [[Healthcare/MedGemma|MedGemma]] — Google's clinical language models
- [[Healthcare/EHR and Temporal Models|Temporal Clinical Modeling]] — Sequential patient data analysis
- [[Healthcare/Validation and Datasets|Clinical Datasets]] — MIMIC-CXR, CheXpert, and validation protocols
- [[Healthcare/Medical Vision-Language Models|Medical VLM Landscape]] — Current models and capabilities

### 🛡️ Security & Robustness
- [[Attacks/vlm-attacks|Attack Vectors]] — Prompt injection, adversarial patches, multimodal attacks
- [[Attacks/On Evaluating Adversarial Robustness of Large Vision-Language Models|Robustness Evaluation]] — Systematic assessment methodologies
- [[Attacks/Robust-LLaVA - On the Effectiveness of Large-Scale Robust Image Encoders for Multi-modal Large Language Models|Defense Mechanisms]] — Robust encoders and training strategies
- [[Attacks/Toward a Holistic Evaluation of Robustness in CLIP Models|CLIP Robustness]] — Foundation model vulnerabilities
- [[Safety/MLLMGuard Framework|Safety Frameworks]] — Comprehensive protection systems

### 📊 Evaluation & Metrics
- [[Evaluation/Metrics and Calibration|Calibration & Uncertainty]] — Confidence estimation in medical AI
- [[Evaluation/HELM Framework|HELM Benchmark]] — Holistic evaluation methodology
- [[Evaluation/Pretraining Comparison|Model Comparison Studies]] — Performance across architectures

## Current Research Focus

### 🔬 Active Experiments
1. **VSF-Med-VQA Development**
   - Comprehensive scoring framework for medical VLM robustness
   - Attack surface analysis: prompt injections, visual distortions, multimodal adversarial overlays
   - Integration with MIMIC-CXR for real-world clinical validation

2. **Interpretability Analysis**
   - Attention map extraction under adversarial perturbations
   - Effective Attention Score (EAS) metrics for MedGemma and LLaVA-RAD
   - Cross-modal attention pattern analysis during attacks

3. **Defense Prototyping**
   - Lightweight prompt guards for medical contexts
   - Vote-by-augmentation ensemble methods
   - Selective token dropout for robustness
   - Adversarial training with medical constraints

4. **Clinical Alignment Studies**
   - Robustness–accuracy Pareto frontier mapping
   - Clinical risk-weighted evaluation metrics
   - Expert annotation integration for ground truth

## Technical Stack

### Models Under Study
- **MedGemma** (Google): Specialized medical language models
- [[Healthcare/LLaVA-Rad|LLaVA-RAD]]: Radiology-focused vision-language model
- **CLIP-based architectures**: Foundation model analysis
- **BiomedCLIP**: Domain-adapted vision-language models

### Datasets
- **MIMIC-CXR**: Large-scale chest X-ray dataset with reports
- **CheXpert**: Multi-label chest radiograph dataset
- **Custom adversarial benchmarks**: VSF-Med-VQA test suite

## Collaboration & Contact
I welcome collaborations on trustworthy multimodal AI for healthcare. Particularly interested in:
- Clinical validation partnerships
- Adversarial robustness techniques
- Medical AI safety standards
- Multimodal model interpretability

Connect via the links below or through the University of New Haven SAIL Lab.

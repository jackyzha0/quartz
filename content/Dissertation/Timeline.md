# Dissertation Timeline: Phrasing-Robust Medical VLMs for Radiology

> Measurement, Causality, Mitigation, and Safe Triage — Timeline to August 2026

[← Proposal](proposal.md) | [Site Index →](../Index.md)

---

## Overview

This timeline outlines the development of phrasing-robust medical vision-language models for radiology, addressing the critical issue of VLM brittleness to question paraphrasing. The research spans from September 2025 to August 2026, focusing on measurement, causal analysis, mitigation strategies, and safe clinical deployment.

## Timeline (September 2025 – August 2026)

### 2025 September: Project kick-off and literature update
- **Updated Literature Review**: Focus on post-2024 VLM robustness, medical VLM interpretability, and clinical deployment studies
- **Codebase Refinement**: Enhance medical-vlm-interpret toolkit with latest model support
- **Dataset Access**: Secure MIMIC-CXR, VQA-RAD, and additional radiology datasets
- **Compute Setup**: Configure GPU cluster (8× A100s) for experiments
- **Baseline Evaluation**: Run initial robustness tests on LLaVA-Rad and MedGemma
- **Paraphrase Dataset Design**: Create annotation guidelines for medical paraphrases

### 2025 October: Paraphrase dataset and baseline
- **Paraphrase Generation**: Deploy GPT-4 and Claude for generating 10 paraphrases per VQA-RAD question
- **Medical Validation**: Radiologist review of paraphrases for semantic equivalence
- **Baseline Metrics**: Document flip-rates (expect >20%) across models
- **Attention Analysis**: Extract and visualize attention patterns for original vs paraphrased questions
- **Statistical Framework**: Design significance tests for robustness metrics
- **Toolkit Enhancement**: Add paraphrase testing module to interpretability toolkit

### 2025 November: Robustness measurement
- **Comprehensive Evaluation**: Test 5+ medical VLMs on paraphrase dataset
- **Metric Development**: Refine consistency scores, attention divergence metrics
- **Failure Analysis**: Categorize linguistic patterns causing failures
- **Cross-Dataset Testing**: Validate on SLAKE, PMC-VQA datasets
- **Visualization Tools**: Create interactive dashboard for robustness analysis
- **Early Findings Report**: Document initial robustness measurements

### 2025 December: Causal mediation analysis
- **Causal Framework Implementation**: Build intervention experiments for attention manipulation
- **Mediation Analysis**: Quantify phrasing → attention → answer causal paths
- **Attention Fixing Experiments**: Test answer stability with frozen attention
- **Linguistic Feature Analysis**: Identify specific constructs (negations, synonyms) causing failures
- **Statistical Modeling**: Fit structural equation models for causal relationships
- **Interpretability Module**: Add causal analysis to toolkit

### 2026 January: Fine-tuning experiments
- **Training Infrastructure**: Set up distributed training for model fine-tuning
- **Consistency Loss Implementation**: Develop KL-divergence based consistency training
- **Paraphrase Augmentation**: Create training pipeline with dynamic paraphrasing
- **Ablation Studies**: Test different loss weights and augmentation strategies
- **Performance Monitoring**: Track flip-rate reduction during training
- **Model Checkpointing**: Save best models at different flip-rate thresholds

### 2026 February: Uncertainty and MICCAI submission
- **Confidence Calibration**: Implement temperature scaling and isotonic regression
- **Uncertainty Metrics**: Add entropy-based and ensemble uncertainty
- **MICCAI Paper Writing**: "Measuring and Mitigating Phrasing Brittleness in Medical VLMs"
- **Experimental Results**: Complete main experiments for paper
- **Supplementary Material**: Prepare detailed appendices and code release
- **Internal Review**: Get feedback from advisors and collaborators

### 2026 March: Improved models and testing
- **Model Release Preparation**: Package fine-tuned checkpoints
- **Comprehensive Testing**: Evaluate on held-out test sets
- **Clinical Relevance**: Test on radiologist-curated important questions
- **Robustness Certification**: Develop formal guarantees where possible
- **Documentation**: Write model cards and usage guidelines
- **Beta Testing**: Deploy to select research partners

### 2026 April: Triage system development
- **Triage Architecture**: Build confidence-based routing system
- **Threshold Optimization**: Find optimal confidence cutoffs for safety
- **OOD Detection**: Integrate out-of-distribution detection methods
- **Workflow Integration**: Design PACS-compatible interfaces
- **Safety Protocols**: Implement fail-safe mechanisms
- **Simulation Studies**: Test triage decisions on historical cases

### 2026 May: Clinical evaluation and NeurIPS
- **IRB Approval**: Finalize protocols for reader studies
- **Radiologist Recruitment**: Engage 5-10 radiologists for evaluation
- **Reader Study Design**: Prepare balanced test cases
- **NeurIPS Paper**: "Uncertainty-Aware Triage for Robust Medical VLMs"
- **Safety Analysis**: Quantify missed findings and false negatives
- **User Interface**: Refine clinical deployment interface

### 2026 June: Reader studies and journals
- **Reader Study Execution**: Conduct formal clinical evaluation
- **Performance Metrics**: Measure sensitivity, specificity, efficiency gains
- **Radiologist Feedback**: Collect qualitative assessments
- **Journal Preparation**: Draft papers for JBI and npj Digital Medicine
- **Statistical Analysis**: Complete clinical trial statistics
- **Regulatory Documentation**: Prepare FDA 510(k) pathway analysis

### 2026 July: Thesis writing
- **Chapter 1**: Introduction and motivation for phrasing robustness
- **Chapter 2**: Background on medical VLMs and robustness challenges
- **Chapter 3**: MedPhr-Rad dataset and measurement methodology
- **Chapter 4**: Causal analysis of phrasing effects
- **Chapter 5**: Mitigation strategies and robust training
- **Chapter 6**: Clinical triage system and evaluation
- **Chapter 7**: Conclusions and future directions

### 2026 August: Defense and dissemination
- **Dissertation Finalization**: Incorporate committee feedback
- **Defense Preparation**: Create presentation and practice talk
- **PhD Defense**: Public defense presentation
- **Code Release**: Open-source complete toolkit and models
- **Workshop Planning**: AMIA/MICCAI workshop proposals
- **Industry Outreach**: Connect with medical AI companies
- **Next Steps**: Postdoc or industry position planning

## Key Deliverables & Milestones

### Publications Timeline
1. **MICCAI 2026** (Feb): Phrasing robustness measurement and mitigation
2. **NeurIPS 2026** (May): Uncertainty-aware triage framework  
3. **JBI** (June): Comprehensive toolkit and benchmark paper
4. **npj Digital Medicine** (June): Clinical safety and deployment study
5. **AMIA Workshop** (Fall 2025): Medical AI interpretability

### Software Releases
1. **Paraphrase Test Suite** (Oct 2025): VQA-RAD paraphrases
2. **Robustness Toolkit v2** (Nov 2025): Enhanced medical-vlm-interpret
3. **Causal Analysis Module** (Dec 2025): Mediation analysis tools
4. **Fine-tuned Models** (Mar 2026): Robust LLaVA-Rad/MedGemma
5. **Triage System** (May 2026): Complete clinical deployment package

### Expected Outcomes
- **Flip-rate**: Reduce from >20% to <5% across paraphrases
- **Causal Evidence**: Quantify attention mediation effects
- **Clinical Safety**: Near-100% sensitivity for critical findings
- **Efficiency**: 30-40% auto-clearance of normal cases
- **Open Science**: All code, data, and models publicly available

## Risk Management

### Technical Risks
- **Robustness Resistance**: Models may not improve sufficiently
  - *Mitigation*: Try multiple architectures and training strategies
- **Compute Limitations**: Training large models expensive
  - *Mitigation*: Focus on efficient 4B-7B models first

### Clinical Risks  
- **Adoption Barriers**: Radiologists skeptical of AI triage
  - *Mitigation*: Early engagement and co-design
- **Safety Concerns**: Missing critical findings
  - *Mitigation*: Conservative thresholds, extensive testing

### Timeline Risks
- **Paper Rejections**: May delay publication schedule
  - *Mitigation*: Target multiple venues, preprint early
- **IRB Delays**: Clinical studies may take longer
  - *Mitigation*: Submit IRB early, have backup sites

## Resource Planning

### Computational Resources
- 8× NVIDIA A100 GPUs (12 months)
- 100TB storage for datasets and models
- $50K cloud compute budget
- Local workstation with 4× RTX 4090

### Collaborations
- 2-3 partner hospitals for clinical evaluation
- 5-10 radiologist validators
- Statistical consultant for clinical trials
- Medical informaticist for workflow integration

### Funding & Support
- PhD fellowship covering stipend
- NSF grant pending ($200K)
- Industry partnership discussions (Microsoft/Google)
- Conference travel budget ($10K)
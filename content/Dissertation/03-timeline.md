# Dissertation Timeline: Phrasing-Robust Medical VLMs for Radiology

> Measurement, Causality, Mitigation, and Safe Triage — Timeline to August 2026

[← Proposal](01-proposal.md) | [Site Index →](../Index.md)

---

## Overview

This timeline outlines the development of phrasing-robust medical vision-language models for radiology, addressing the critical issue of VLM brittleness to question paraphrasing. The research spans from September 2025 to August 2026, focusing on measurement, causal analysis, mitigation strategies, and safe clinical deployment.

## Timeline (September 2025 – August 2026)

### 2025 September: Project kick-off and VSF Med foundation
- **Literature Update**: Document FSF and EFG phenomena across recent medical VLMs
- **VSF Med Design**: Finalize 5 question categories (binary, localization, severity, differential, temporal)
- **Paraphrase Protocol**: Establish 3-stage validation (linguistic generation, clinical filtering, semantic validation)
- **Compute Setup**: Configure 8× A100 GPUs with deterministic inference settings
- **Pilot Validation**: Confirm 12-18% FSF rates on 200-question pilot
- **ROI Guidelines**: Create annotation protocol for primary, contextual, and negative regions

### 2025 October: VSF Med construction and baseline metrics
- **Paraphrase Generation**: Create 8-10 variants per question across 5 linguistic dimensions
- **Clinical Validation**: Radiology resident review (expect 15% rejection), board-certified validation (8% additional)
- **FSF Quantification**: Document 12.7% (MedGemma) and 15.6% (LLaVA-Rad) flip rates
- **EFG Measurement**: Confirm deletion AUC 0.34-0.39 higher for incorrect predictions
- **Attention Stability**: Verify SSIM 0.876 ± 0.082 across paraphrases
- **Dataset Release**: Publish VSF Med to HuggingFace with 16,847 validated paraphrases

### 2025 November: Robustness measurement
- **Comprehensive Evaluation**: Test 5+ medical VLMs on paraphrase dataset (including GPT-5 baseline)
- **Metric Development**: Refine consistency scores, attention divergence metrics
- **Failure Analysis**: Categorize linguistic patterns causing failures
- **Cross-Dataset Testing**: Validate on SLAKE, PMC-VQA datasets
- **Visualization Tools**: Create interactive dashboard for robustness analysis
- **Early Findings Report**: Document initial robustness measurements

### 2025 December: Causal analysis of FSF mechanisms
- **Layer-wise Analysis**: Track representation similarity degradation (sharp drops at layers 12-16)
- **Cross-Attention Interchange**: K,V swapping reduces flips by 38-43%
- **Token Importance**: Quantify 2.8× importance for negation tokens
- **Mediation Quantification**: 41% of flips mediated through cross-attention
- **Causal Pathway Mapping**: Document text encoding → query formation → answer divergence
- **Toolkit Release**: Open-source causal analysis modules

### 2026 January: Parameter-efficient mitigation
- **LoRA Configuration**: Target layers 12-16 (MedGemma) with rank-16 adapters
- **Multi-Objective Loss**: Implement λ₁L_task + λ₂L_consistency + λ₃L_attention
- **Efficient Training**: <1% parameters modified (50M of 4B total)
- **Convergence Tracking**: Achieve <5% FSF in 8-12 epochs
- **Ablation Studies**: Compare full fine-tuning vs targeted LoRA
- **Checkpoint Release**: Publish robust model weights

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

### 2026 April: Selective conformal triage system
- **Uncertainty Sources**: Integrate paraphrase variance, MC dropout, attention stability
- **Decision Logic**: Implement defer/auto-clear/review triage with consensus checking
- **Safety Thresholds**: Calibrate for >99% critical finding sensitivity
- **PACS Integration**: Real-time inference (<2 seconds) with audit trails
- **Efficiency Validation**: Confirm 30-40% auto-clearance of normal cases
- **Fallback Mechanisms**: Design graceful degradation for system failures

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
- **Industry Outreach**: Connect with medical technology companies
- **Next Steps**: Postdoc or industry position planning

## Key Deliverables & Milestones

### Publications Timeline
1. **MICCAI 2026** (Feb): Phrasing robustness measurement and mitigation
2. **NeurIPS 2026** (May): Uncertainty-aware triage framework  
3. **JBI** (June): Comprehensive toolkit and benchmark paper
4. **npj Digital Medicine** (June): Clinical safety and deployment study
5. **AMIA Workshop** (Fall 2025): Medical LLM interpretability

### Software Releases
1. **Paraphrase Test Suite** (Oct 2025): VQA-RAD paraphrases
2. **Robustness Toolkit v2** (Nov 2025): Enhanced medical-vlm-interpret
3. **Causal Analysis Module** (Dec 2025): Mediation analysis tools
4. **Fine-tuned Models** (Mar 2026): Robust LLaVA-Rad/MedGemma (compared against GPT-5)
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
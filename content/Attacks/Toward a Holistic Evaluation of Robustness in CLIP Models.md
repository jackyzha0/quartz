


## 1. Metadata

- Title: **Toward a Holistic Evaluation of Robustness in CLIP Models**
    
- Authors: **Weijie Tu; Weijian Deng; Tom Gedeon**
    
- Venue: **arXiv preprint (arXiv:2410.01534v1), posted 2 Oct 2024**
    
- Year: **2024**
    

## 2. Plain-English Abstract

For VLM architecture background, see [[VLM Basics]].

This paper delivers a multi-angle robustness audit of CLIP models beyond just zero-shot accuracy. It measures sensitivity to ten visual factors (pose, lighting, scale, etc.), out-of-distribution (OOD) detection, predictive uncertainty, zero-shot retrieval, 3D awareness (both correspondence and corruption robustness), and the interplay between CLIP’s vision encoder and language model backbones (e.g., in LLaVA). Across 84 zero-shot and 44 fine-tuned CLIP variants—spanning ResNet, ConvNeXt, ViT, EVA backbones, diverse pre-training sets (LAION, WIT, DATACOMP) and sizes—the authors uncover that architecture, data source, fine-tuning method, and prompts each leave distinct robustness fingerprints. These findings offer practical guidance to build more reliable multimodal systems.

## 3. Paper in 10 Bullet Points

1. **Motivation**: CLIP’s zero-shot strength and observed robustness under natural shifts lack nuanced, factor-level, safety, and 3D evaluations.
    
2. **Scope**: Assesses six dimensions—visual-factor robustness, OOD detection, calibration, retrieval, 3D awareness, encoder interactions—across six influencing factors (architecture, data, size, fine-tuning, loss, prompts).
    
3. **Models**: 84 zero-shot CLIP; 44 CLIP-FT; 127 ImageNet-trained baselines; 6 LLaVA variants (CLIP vision + LLM).
    
4. **Visual Factors**: CLIP beats ImageNet models on 6/10 factors but underperforms on pose/partial views; training source (LAION vs WIT) shifts factor-level trends .
    
5. **Shape Bias**: Zero-shot CLIP favors shape over texture; bias shrinks after standard fine-tuning but persists under contrastive or parameter-efficient FT .
    
6. **OOD & Calibration**: ID accuracy correlates with OOD AUROC within the same CLIP source; CLIP is not uniformly better calibrated than baselines, but temperature scaling yields strong calibration transfer to OOD .
    
7. **Retrieval**: Zero-shot classification accuracy predicts image/text retrieval performance; training source/data augmentations induce deviations .
    
8. **3D Awareness**: CNN-based CLIPs outperform ViT-based on geometric/semantic correspondence (ScanNet, NAVI, SPair-71K) and under 3DCC corruptions, especially at high severity .
    
9. **Encoder Interaction**: In difficult ImageNet-D splits, LLaVA (CLIP visual + strong LLM) outperforms CLIP alone by 20%+, but adds no gain when CLIP already excels .
    
10. **Data Curation & Prompts**: Filtering pre-training data (MetaCLIP, DFN-2B, CommonPool) consistently boosts classification, OOD, factor and 3D robustness; reducing prompts improves OOD & calibration but not factor-level robustness .
    

## 4. Deep-Dive Analysis

### 4.1 Methods & Assumptions

- **Visual-Factor Robustness** uses ImageNet-X relabelled by 10 factors, measuring “effective robustness” via robust linear fits between factor subset and overall accuracy .
    
- **OOD Detection** employs Maximum Concept Matching for zero-shot CLIP, Max-Softmax post-FT, across five standard OOD sets plus NINCO (ID-free aggregation) .
    
- **Calibration** is measured by ECE/NLL on ID (ImageNet-Val) and six OOD shifts, with and without temperature scaling .
    
- **3D Evaluations** split into correspondence (ScanNet, NAVI, SPair-71K recall) and 3DCC corruptions (6 types × 5 severities) .
    
- **Encoder Interaction** tests CLIP vs LLaVA on ImageNet-D via VQA-style multiple-choice prompting with failure categories chosen by CLIP or ResNet-50 .
    
- **Assumptions/Limits**: Linear trend analyses presuppose monotonic relationships; no statistical significance tests or confidence intervals reported; code and random-seed details are not publicly released.
    

### 4.2 Data & Code Availability

- **Data**: All benchmarks (ImageNet variants, ImageNet-X, NINCO, 3DCC, SPair-71K, ScanNet, NAVI, COCO, Flick30K) are publicly available.
    
- **Models**: CLIP variants via TIMM/OpenCLIP; LLaVA on HuggingFace; baseline models via TIMM .
    
- **Code**: No dedicated repository for experiments; relies on publicly released libraries (OpenCLIP, TIMM). Reproducibility hinges on re-implementing extensive pipelines.
    

### 4.3 Robustness & Reproducibility

- **Scale**: Very large model pool (215+ variants) enhances generality.
    
- **Analyses**: Robust linear regression lends resilience to outliers but lacks confidence bounds.
    
- **Ablations**: Detailed ablations on fine-tuning methods (standard vs contrastive vs PEFT), prompt sizes, data curation.
    
- **Missing**: No error bars or random-seed information; no explicit runtime/resource reporting.
    

## 5. Fit to Dissertation Agenda

- **SVT-AD Detector**: The visual-factor breakdown (Sec IV) highlights failure modes (e.g., pose) that self-supervised transformers should target.
    
- **Purifier Insights**: Shape vs texture bias (Sec IV-B) suggests designing adaptive denoisers that respect shape features to avoid texture over-correction.
    
- **Transformer vs CNN Stability**: Sec VIII shows CNN-based CLIP excel in 3D and correspondence tasks, guiding backbone choices for robust detectors.
    
- **Clinical Deployment Pitfalls**: Calibration trade-offs after fine-tuning (Sec VI) warn that standard ImageNet FT may worsen uncertainty estimates in high-stakes settings. See [[Robustness Notes]] for medical domain considerations.
    

## 6. Comparative Context

- **Miller _et al._ "Accuracy on the Line"** [53]: Introduces effective robustness; this work extends to factor-level and multimodal settings.
- **Attack Methods**: See [[vlm-attacks]] and [[On Evaluating Adversarial Robustness of Large Vision-Language Models]] for attack implementations.
    
- **Gadre _et al._ DATACOMP** [21]: Proposes data curation; here, curation is shown to boost not only accuracy but also diverse robustness axes.
    
- **Ming & Li (2023)** [32]: Studied FT impact on OOD; this paper broadens to multiple FT strategies and additional tasks (3D, retrieval, calibration).
    

## 7. Strengths vs. Weaknesses

**Strengths**

- ✓ **Breadth**: Covers six robustness dimensions across 200+ models.
    
- ✓ **Practical**: Yields actionable guidance on architecture, data filtering, FT methods.
    
- ✓ **3D & Multimodal**: Novel 3D corruption and LLaVA interaction studies.
    

**Weaknesses**

- ✗ **Reproducibility**: No public code; missing statistics on variance.
    
- ✗ **Depth**: Trends shown, but causal mechanisms (e.g. why CNNs resist 3D blur) remain hypothesized.
    
- ✗ **Clinical Angle**: Limited discussion on domain-specific (e.g. medical) perturbations.
    

## 8. Follow-Up Ideas (Ranked)

1. **Implement SVT-AD** using shape-bias and factor-robustness as training objectives.
    
2. **Score-Based Denoiser**: Condition on factor-detection confidence to adaptively clean images.
    
3. **3D-Augmented FT**: Fine-tune CLIP with synthetic multiview data to improve pose robustness.
    
4. **Prompt-Learner**: Train prompts to optimize joint classification + calibration.
    
5. **Clinical Shift Benchmark**: Evaluate on radiology-specific perturbations (e.g., noise, artifacts).
    

## 9. Quick-Reference Table

|Section|Takeaway|Caveat|
|---|---|---|
|**Introduction**|Argues need for holistic CLIP robustness beyond accuracy|Overviews six axes, but depth varies per axis|
|**Methods**|Defines clear protocols for factor, OOD, calibration, retrieval, 3D, LLaVA|No random seeds or code release|
|**Results**|Identifies architecture/data/FT/prompt effects; CNNs excel in 3D; prompts FT|Lacks confidence intervals; causality left for future|

## 10. Action Items for Me

- 🔧 **Prototype** a transformer-based anomaly detector (SVT-AD) that leverages shape-bias metrics.
    
- 📥 **Add** this paper and key related works (Miller ’21, Gadre ’23, Ming ’23) to my Zotero library.
    
- 🗒 **Design** an experiment to test adaptive purifier governed by factor-level detector signals.
    

## 11. Quality Scores (1–5)

- **Clarity**: 4 – Well-organized, but heavy on acronyms.
    
- **Rigor**: 4 – Extensive evaluations, missing statistical bounds.
    
- **Novelty**: 4 – First to unite 3D, prompts, calibration, retrieval in CLIP analysis.
    
- **Impact**: 4 – Practical guidance for robust multimodal systems.
    
- **Clinical Reliability**: 3 – Needs domain-specific validation for medical imaging.
    

---

_Prepared in GitHub-flavored Markdown as requested._
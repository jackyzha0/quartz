# On Evaluating Adversarial Robustness of Large Vision-Language Models

## Metadata

- **Title**: On Evaluating Adversarial Robustness of Large Vision-Language Models
    
- **Authors**: Yunqing Zhao*¹, Tianyu Pang*², Chao Du², Xiao Yang³, Chongxuan Li⁴, Ngai-Man Cheung¹, Min Lin²
    
    - ¹Singapore University of Technology and Design
        
    - ²Sea AI Lab, Singapore
        
    - ³Tsinghua University
        
    - ⁴Renmin University of China
        
- **Venue**: 37th Conference on Neural Information Processing Systems (NeurIPS 2023)
    
- **Year**: 2023
    

---

## Abstract 

This paper investigates how susceptible state-of-the-art open-source vision–language models (e.g., BLIP-2, MiniGPT-4, LLaVA) are to small, targeted image perturbations when attackers have only black-box access. For background on VLM architectures, see [[VLM Basics]]. The authors craft adversarial images using transfer-based (via surrogate CLIP/BLIP encoders or text-to-image generation) and query-based (random gradient-free) methods, then evaluate transferability and success rates on image-grounded text generation tasks. They report high fooling rates—measured by similarity between generated captions and attacker-specified targets—and analyze trade-offs between perceptual imperceptibility and attack efficacy. The work quantifies vulnerabilities in multimodal systems and underscores the need for robust detection and defense before deployment.

---

## Paper in 10 

1. **Motivation**: Multimodal VLMs (e.g., GPT-4 with images) may be stealthily evaded by perturbing only the vision input under black-box conditions.
    
2. **Threat Model**: Attackers have only API-level access (input image → output text), aim for targeted captions/answers, and are restricted by a small ℓ∞ budget (ϵ=8).
    
3. **Transfer-Based Attacks**:
    
    - **MF-it**: Align adversarial image with target text embedding via surrogate CLIP/BLIP.
        
    - **MF-ii**: Align image–image features by generating a “target image” (e.g., via Stable Diffusion) and matching its CLIP-ViT encoding.
        
4. **Query-Based Attacks**: Use random gradient-free (RGF) estimation to iteratively refine the adversarial image toward maximizing text–text similarity between model output and target text.
    
5. **Combined Strategy**: Initialize with transfer-based (MF-ii) perturbations then apply query-based tuning (MF-tt) for highest success under fixed budget.
    
6. **Evaluation Suite**: Six open-source VLMs tested—BLIP, UniDiffuser, Img2Prompt, BLIP-2, LLaVA, MiniGPT-4—on ImageNet-1K + MS-COCO captions. Success measured by CLIP similarity between generated and target text.
    
7. **Results**: Transfer-based MF-ii already yields high targeted-caption rates (average CLIP ensemble ≈ 0.75), and combined MF-ii+MF-tt boosts this to ≈ 0.85 on BLIP.
    
8. **Perceptual Trade-off**: Larger ϵ → stronger attacks but more visible noise; ϵ = 8 (LPIPS≈0.05) balances stealth and efficacy.
    
9. **Interpretability**: GradCAM shows that adversarial images shift model attention from original to attacker-desired regions.
    
10. **Implication**: Highlights critical safety gap in multimodal APIs: visual inputs alone can be automated to fully compromise downstream text generation.
    

---

## 4. Deep-Dive Analysis

### 4.1 Methods & Assumptions

- **Black-Box Setting**: No access to model internals; only image→text queries allowed.
- **Attack Theory**: Based on [[linear-hypothesis-explanation]] which explains vulnerability through high-dimensional accumulation.
    
- **Perturbation Constraint**: ℓ∞ ≤ ϵ ensures human-imperceptibility; default ϵ=8/255.
    
- **Surrogates**: CLIP and BLIP image/text encoders for transfer-based attacks; Stable Diffusion, Midjourney, DALL-E for generating proxy target images.
    
- **Optimization**: 100-step PGD for transfer; 8-step PGD with 100 RGF queries for querying.
    
- **Limitations**:
    
    - Evaluation on fixed prompt (“what is the content of this image?”) may not reflect conversational use.
        
    - No physical-world or end-to-end robotic/clinical deployment scenarios.
        
    - Reliance on CLIP-based similarity may not capture nuanced semantic failures.
        

### 4.2 Data & Code Availability

- **Data**:
    
    - Clean images: ImageNet-1K validation set.
        
    - Target texts: Random MS-COCO captions.
        
- **Code/Project Page**: Available at [https://yunqing-me.github.io/AttackVLM/](https://yunqing-me.github.io/AttackVLM/).
    
- **Environments**: Experiments on single NVIDIA A100 GPU with public checkpoints for all tested VLMs.
    

### 4.3 Robustness & Reproducibility

- **Reported Metrics**: Mean CLIP scores across five CLIP backbones; no standard deviations or confidence intervals provided.
    
- **Ablations**:
    
    - Varying ϵ to study quality vs. success.
        
    - Interpolation between pure transfer/query budgets.
        
- **Reproducibility**: Full attack pipelines and model weights are public; hyperparameters (PGD steps, σ, N) are specified.
    

---

## 5. Fit to Dissertation Agenda

- **Anomaly Detector (SVT-AD)**:
    
    - **Insight**: Attacks exploit subtle, distributed perturbations invisible to humans but potent to VLM encoders—motivates self-supervised anomaly scores at multiple transformer layers.
        
    - **Technique**: Contrast adversarial vs. clean features in ViT attention maps for detector training.
        
- **Score-Based Purifier**:
    
    - **Lesson**: Combining cross-modality priors with query feedback could inform adaptive denoising steps.
        
- **Transformer vs. CNN Stability**:
    
    - Attacks transfer across CLIP-RN50 (CNN) and CLIP-ViT (transformer) surrogates with similar success, indicating brittleness is architecture-agnostic.
        
- **Clinical Deployment Pitfalls**:
    
    - In CXR-LLM systems (e.g., LLaVA-Rad), adversarial noise could trigger dangerous misdiagnoses without clinician oversight.
    - See [[Robustness Notes]] for medical domain-specific robustness considerations.
        

---

## 6. Comparative Context

1. **Chen et al. (2017), “Attacking Visual Language Grounding”**: Early white-box adversarial attacks on CNN-RNN captioners; this work extends to large, black-box VLMs with targeted goals.
    
2. **Li et al. (2021), “Adversarial VQA”**: Focused on untargeted, white-box attacks on VQA models; here we see high-success targeted evasion under strict black-box constraints.
    
3. **Dong et al. (2023), "How Robust Is Google's Bard to Adversarial Image Attacks?"**: Concurrent red-teaming of proprietary multimodal API; our paper provides systematic open-source benchmarks and attack strategies.

4. **Related Resources**: See [[vlm-attacks]] for practical implementation guide and [[Robust-LLaVA - On the Effectiveness of Large-Scale Robust Image Encoders for Multi-modal Large Language Models]] for defense mechanisms.
    

---

## 7. Strengths vs. Weaknesses

- **Strengths**
    
    - Comprehensive evaluation across six modern VLMs under realistic black-box, targeted threat model.
        
    - Clear methodology combining transfer and query attacks, with ablations on budget allocation.
        
    - Public code and data promote reproducibility.
        
- **Weaknesses**
    
    - Limited to digital-domain attacks; no physical-world validation.
        
    - Single generic prompt may understate or overstate vulnerabilities in varied contexts.
        
    - Lack of statistical uncertainty measures (e.g., error bars) in reported metrics.
        

---

## 8. Follow-Up Ideas (Ranked)

1. **Prototype SVT-AD**: Train a self-supervised transformer-based detector on clean vs. adversarial embeddings from CLIP and BLIP.
    
2. **Adaptive Purifier**: Integrate query-feedback (MF-tt) to guide iterative denoising on suspicious inputs.
    
3. **Physical-World Tests**: Print adversarial examples and photograph under varying lighting to assess real-world feasibility.
    
4. **Medical VLM Evaluation**: Apply attacks to LLaVA-Rad or ChexAgent on CXR+report generation.
    
5. **Prompt Robustness**: Test whether richer instruction templates (beyond fixed prompt) alleviate or worsen attack success.
    

---

## 9. Quick-Reference Table

|Section|Takeaway|Caveat|
|---|---|---|
|**Introduction**|Black-box targeted attacks can compromise VLMs with subtle noise.|Real-world pipelines use richer prompts than fixed queries.|
|**Methods**|Combines transfer-based (MF-ii) and query-based (MF-tt) strategies.|Surrogate alignment assumes similar feature spaces across models.|
|**Results**|High CLIP-score success (≈ 0.85) on BLIP; consistent transfer across architectures.|No error bars; uses single random seed per image/text pair.|

---

## 10. Action Items for Me

    
-  Replicate MF-ii + MF-tt attack on LLaVA-Rad using Symile-MIMIC chest X-rays.
    
-  Develop a lightweight SVT-AD module to flag high-confidence adversarial queries.
    
-  Benchmark purifier performance (e.g., diffusion-based denoiser) on adversarial VLM inputs.
    

---

## 11. Quality Scores

|Metric|Score (1–5)|Rationale|
|---|---|---|
|**Clarity**|4|Well-structured; methods clearly described.|
|**Rigor**|4|Thorough ablations; uses standard adversarial protocols.|
|**Novelty**|3|Builds on existing attack frameworks; extends to VLMs.|
|**Impact**|4|Highlights urgent safety concerns for multimodal APIs.|
|**Clinical Reliability**|2|No evaluation on medical datasets or physical settings.|
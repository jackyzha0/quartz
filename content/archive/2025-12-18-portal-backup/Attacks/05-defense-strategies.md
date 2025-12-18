
## 1. Auto-Extracted Metadata

- **Title**  
    Robust-LLaVA: On the Effectiveness of Large-Scale Robust Image Encoders for Multi-modal Large Language Models
    
- **Authors**  
    Hashmat Shadab Malik; Fahad Shamshad; Muzammal Naseer; Karthik Nandakumar; Fahad Khan; Salman Khan
    
- **Affiliations**  
    • Mohamed bin Zayed University of AI (Malik, Shamshad, Khan)  
    • Khalifa University (Naseer)  
    • Michigan State University (Nandakumar)  
    • Linköping University (Khan)  
    • Australian National University (Khan)
    
- **Venue & Year**  
    Under Review (arXiv preprint, Feb 2025)
    

## 2.Abstract

For VLM architecture basics, see [[VLM Basics]]. 

This paper shows that instead of adversarially fine-tuning CLIP on ImageNet, one can plug in off-the-shelf vision encoders adversarially pre-trained at web scale (e.g. ViT-H, ViT-G). By aligning these robust backbones end-to-end in an MLLM (LLaVA) they attain 2× the captioning robustness and 1.5× VQA robustness under ℓ∞ attacks—all while preserving clean accuracy—and cut jailbreak success by >10 points. They evaluate on COCO, Flickr30k, VQAv2, TextVQA, VizWiz, OKVQA, white-box VisualAdv, black-box HADES, common corruptions, hallucination benchmarks, and show that large-scale adversarial pretraining yields both stronger defenses and semantic alignment without extra adversarial training .

## 3. Paper in 10 Bullet Points

1. **Motivation**
    
    - MLLMs (e.g. LLaVA) excel at vision-language tasks but are highly vulnerable to visual adversarial perturbations (hallucinations, jailbreaks).
        
2. **Limitation of Prior Defenses**
    
    - Constrained adversarial fine-tuning (FARE, Sim-CLIP) on ImageNet yields only modest robustness gains at the cost of reduced semantic alignment.
        
3. **Key Idea**
    
    - Leverage large-scale adversarially pre-trained vision encoders (ViT-H/14, ViT-G/14 from Wang et al. 2024b) already robust on billion-scale web data.
        
4. **Alignment Strategy**
    
    - Learn a linear projector to align robust encoder features to CLIP’s embedding space, preserving robustness under PGD attacks (ε=1/255).
        
5. **End-to-End Training**
    
    - Integrate aligned encoders into LLaVA and fine-tune image-to-text MLP plus LLM on multimodal instruction data.
        
6. **Benchmarks & Metrics**
    
    - Image captioning (COCO, Flickr30k; CIDEr), VQA (VQAv2, TextVQA, VizWiz, OKVQA; accuracy), jailbreak attacks (VisualAdv toxicity, HADES ASR).
        
7. **Untargeted Attack Results**
    
    - At ε=4/255, Robust-LLaVAG achieves CIDEr 76.6 (vs 35.1 for FARE4) on COCO and 49.3% VQAv2 accuracy (vs 31.9% for Sim-CLIP4) .
        
8. **Targeted Attack Results**
    
    - Robust-LLaVAG maintains 0% attack success and high CIDEr even at ε=8/255, while baselines break down (100% success, 0 CIDEr) .
        
9. **Jailbreak Defenses**
    
    - White-box VisualAdv: Robust-LLaVAG reduces toxic outputs from 503→137; Black-box HADES: lowers ASR from 62%→48% average .
        
10. **Additional Robustness**
    
    - Outperforms baselines on natural corruptions, object hallucination (POPE F1), prompt-formatting robustness; ensembling shown to be limited by weakest encoder.
        

## 4. Deep-Dive Analysis

### 4.1 Methods & Assumptions

- **Adversarial Pretraining Scale**: Assumes that web-scale adversarial pretraining (Wang et al. 2024b) yields richer robust features than ImageNet-only fine-tuning.
    
- **Linear Alignment**: Uses a simple linear projector between robust features and CLIP space; assumes this suffices for semantic alignment without non-linear losses.
    
- **Attack Coverage**: Evaluates ℓ∞ APGD and PGD attacks, both untargeted and targeted, plus sophisticated jailbreaks (VisualAdv, HADES). Does not explore ℓ2 or geometric distortions.
    
- **Limitations**:
    
    - Reliance on availability of billion-scale robust vision models.
        
    - Potential domain shift if medical or other specialized images differ from web-scale pretraining.
        

### 4.2 Data & Code Availability

- **Code & Models**: Released on GitHub: [https://github.com/HashmatShadab/Robust-LLaVA](https://github.com/HashmatShadab/Robust-LLaVA) .
    
- **Data**: Uses public benchmarks (COCO, Flickr30k, VQAv2, etc.). All evaluation data are standard and open.
    

### 4.3 Robustness & Reproducibility

- **Statistical Soundness**: Reports results on 500 random samples per dataset; includes multiple ε budgets and attack types.
    
- **Ablations**: Appendix shows medium- vs large-scale encoder comparisons, ensembling experiments, prompt ablation, corruption severities.
    
- **Error Bars**: None reported; robustness gains are large but without confidence intervals.
    

## 5. Fit to Dissertation Agenda

- **Detector Stability**: Highlights that large-scale adversarial pretraining produces self-supervised features robust across unseen perturbations—valuable insight for SVT-AD design.
    
- **Purifier Guidance**: Strong robust features may reduce purifier reliance, suggesting adaptive denoiser strength could be tuned based on encoder confidence.
    
- **Transformer vs. CNN**: Large ViT-based encoders outperform ResNet-based ones in robustness preservation post-alignment—directly informs choice of transformer detectors.
    
- **Clinical Deployment Pitfalls**:
    
    - Web-scale pretraining may not transfer to medical imaging modalities (CXR, ultrasound).
        
    - Jailbreak analogues (e.g., malicious radiology overlays) need domain-specific evaluation.
        

## 6. Comparative Context

- **Schlarmann et al. (2024), FARE**: Unsupervised adversarial tuning of CLIP on ImageNet; yields modest robustness (∼35 CIDEr) but impaired semantic alignment.
- **Attack Methods Context**: See [[On Evaluating Adversarial Robustness of Large Vision-Language Models]] for the attacks this paper defends against.
    
- **Hossain & Imteaj (2024), Sim-CLIP**: Siamese adversarial fine-tuning; slightly better but still limited by ImageNet scale.
    
- **Mao et al. (2022), TeCoA**: Supervised adversarial CLIP fine-tuning for vision tasks; not evaluated in MLLMs.
    
- **This work** outperforms all by leveraging billion-scale adversarial pretraining, avoiding additional adversarial tuning in the MLLM pipeline.
- **CLIP Robustness Evaluation**: See [[Toward a Holistic Evaluation of Robustness in CLIP Models]] for comprehensive evaluation framework.
    

## 7. Strengths vs. Weaknesses

- **Strengths**
    
    - Leverages existing robust backbones—computationally efficient.
        
    - End-to-end integration yields both high clean and adversarial performance.
        
    - Comprehensive evaluation across tasks and attack modes.
        
- **Weaknesses**
    
    - Relies on non-medical, web-scale pretraining—transfer to clinical imaging uncertain.
        
    - No confidence intervals or statistical significance testing.
        
    - Linear alignment may fail on modality gaps beyond natural images.
        

## 8. Follow-Up Ideas (ranked)

1. **Medical Pretraining Study**: Pretrain a robust ViT on medical images (CXR, fundus) then align in MedVLM-Shield. See [[Robustness Notes]] for medical considerations.
    
2. **Nonlinear Alignment**: Explore gated or transformer-based adapters instead of linear projection for tighter feature fusion.
    
3. **Purifier Synergy**: Couple robust encoder confidence with score-based denoiser strength to adaptively filter perturbations.
    
4. **Multimodal Detector**: Combine visual robust features with ECG/lab embeddings for joint anomaly detection.
    
5. **Prompt-Freezer Defense**: Integrate XAI-guided region repair on top of Robust-LLaVA to patch identified adversarial regions.
    

## 9. Quick-Reference Table

|Section|Takeaway|Caveat|
|---|---|---|
|**Intro**|Large-scale adversarial pretraining beats ImageNet fine-tuning|Needs adaptation for medical domains|
|**Methods**|Linear alignment + end-to-end MLLM training preserves semantics|Alignment tested only on natural images|
|**Results**|2× captioning & 1.5× VQA robustness gains; >10% jail-break drop|No error bars; performance on unseen medical shifts untested|

## 10. Action Items for Me

- Prototype SVT-AD variant pre-trained on Symile-MIMIC images.
    
- Add Robust-LLaVA GitHub repo to Zotero under “Adversarial Pretraining” tag.
    
- Run linear vs transformer adapter alignment comparisons on ChexAgent embeddings.
    
- Evaluate Robust-LLaVA on CXR + ECG multimodal prompts.
    

## 11. Quality Scores (1–5 + one-line reasons)

- **Clarity**: 4 – Well-written, but dense in experimental details.
    
- **Rigor**: 4 – Broad evaluation, lacks error bars.
    
- **Novelty**: 5 – First to integrate billion-scale robust vision encoders in MLLMs.
    
- **Impact**: 4 – Strong for natural images; clinical transfer needs study.
- **Theory**: Based on principles in [[linear-hypothesis-explanation]].
    
- **Clinical Reliability**: 3 – Promising robustness, but domain shift unaddressed.
    

---

Let me know if you’d like me to expand any section or focus on a different paper!
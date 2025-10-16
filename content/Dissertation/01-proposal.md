# Dissertation Proposal: Phrasing-Robust Medical Vision-Language Models for Radiology

> Measurement, Causality, Mitigation, and Safe Triage

[← Site Index](../Index.md) | [Timeline →](03-timeline.md)

---

## Background and Motivation

Medical vision-language models (VLMs) hold promise for assisting radiologists by interpreting imaging studies and answering clinical questions. However, current medical VLMs exhibit **brittle behavior under subtle input changes**, especially in phrasing of questions. During pilot evaluation on MIMIC-CXR data, we discovered two alarming failure modes:

### Flip-with-Stable-Focus (FSF)
When a question is paraphrased, models sometimes flip their answers while maintaining stable visual attention patterns. For instance:
- Original: "Is there evidence of pleural effusion?"
- Paraphrase: "Can you see any fluid in the pleural space?"

The model might answer "Yes" to one and "No" to the other, yet attention maps remain focused on the same anatomical regions (SSIM > 0.85). This disconnect between linguistic processing and visual grounding affects 12-18% of paraphrase pairs in our pilot studies.

### Error-Faithfulness Gap (EFG)
Even more concerning, standard faithfulness metrics like deletion and insertion AUC paradoxically show **higher scores for incorrect predictions**. When models are wrong, their explanations appear more "faithful" by conventional metrics—deletion AUC averages 0.34-0.39 points higher for incorrect versus correct predictions. This could lead clinicians to trust the model most when it's most likely to be wrong.

### The Clinical Safety Crisis

These coupled failure modes create a particularly dangerous scenario in clinical practice:

1. **Silent Failures**: A radiologist queries the model with natural language variation and receives contradictory answers
2. **False Reassurance**: The model's attention maps correctly highlight relevant anatomy, suggesting proper visual understanding
3. **Misleading Explanations**: Standard interpretability tools show stronger "faithfulness" precisely when the model is wrong

Consider a pneumothorax case where the model correctly attends to the lung periphery but provides inconsistent answers across phrasings. The radiologist sees appropriate visual focus and high faithfulness scores, yet receives an incorrect diagnosis. This undermines the fundamental promise of explainable medical AI. 

### The Path Forward: From Discovery to Deployment

This dissertation addresses these critical failures through four interconnected thrusts:

1. **Measurement (Thrust 1)**: Establish the VSF Med dataset with 2,000+ radiology questions and 8-10 validated paraphrases each, quantifying FSF and EFG across MedGemma-4b-it and LLaVA-Rad

2. **Causal Analysis (Thrust 2)**: Use activation patching and cross-attention interventions to identify which model components drive sensitivity, revealing that failures originate in layers 12-16 (MedGemma) and 8-12 (LLaVA-Rad)

3. **Mitigation (Thrust 3)**: Develop parameter-efficient interventions using LoRA adapters on language attention blocks, targeting components identified by causal analysis

4. **Safe Deployment (Thrust 4)**: Integrate adapted models into a selective prediction framework with calibrated abstention for clinical triage

Our work demonstrates that meaningful progress in medical AI robustness is achievable even with modest computational resources (8 shared A100 GPUs), democratizing participation in this critical area.

## Research Questions

### 1. Measuring FSF and EFG (Thrust 1)
**How frequently do MedGemma-4b-it and LLaVA-Rad exhibit flip-with-stable-focus (FSF) and error-faithfulness gap (EFG) when processing MIMIC-CXR images, and which linguistic phenomena trigger these failures most reliably?**

### 2. Causal Analysis (Thrust 2)
**What are the causal mechanisms through which linguistic variation propagates to affect model decisions, and which specific layers and attention heads are responsible for FSF and EFG phenomena?**

### 3. Targeted Mitigation (Thrust 3)
**Can parameter-efficient fine-tuning methods that target causally-identified components reduce FSF rates from >12% to <5% while maintaining diagnostic accuracy?**

### 4. Safe Clinical Deployment (Thrust 4)
**How can uncertainty quantification and selective prediction based on paraphrase consistency enable safe triage systems that achieve near-100% sensitivity for critical findings while auto-clearing 30-40% of normal cases?**

## Hypotheses

### H1: FSF Prevalence and Patterns
MedGemma-4b-it and LLaVA-Rad will exhibit FSF in **12-18% of paraphrase pairs**, with >68% of flips occurring despite stable visual attention (SSIM > 0.85). Negation patterns and scope ambiguities will trigger the highest flip rates (>20%).

### H2: Causal Localization
Causal analysis will reveal that FSF originates primarily in **cross-attention layers** (layers 12-16 for MedGemma, 8-12 for LLaVA-Rad) where linguistic encoding guides visual processing. Swapping attention components will reduce flip rates by 38-43%, confirming that text understanding rather than vision-language alignment drives failures.

### H3: Parameter-Efficient Mitigation
Targeted LoRA adaptation of language attention blocks identified by causal analysis, combined with consistency losses on paraphrase pairs, will reduce FSF rates to **<5%** while maintaining or improving diagnostic accuracy. The intervention will require <1% of model parameters to be trainable.

### H4: EFG-Aware Deployment
Incorporating inverted faithfulness metrics (where lower deletion AUC indicates higher confidence) and paraphrase ensemble voting will enable a triage system achieving **>99% sensitivity for critical findings** while safely auto-clearing 30-40% of normal cases with <0.1% false negative rate.

### H5: Generalization Beyond Chest X-rays
The FSF and EFG phenomena will manifest across imaging modalities (CT, MRI) with similar prevalence (±5%), and our mitigation strategies will transfer with minimal adaptation, maintaining <7% FSF rates on new modalities without modality-specific training.

## Expected Results

### Thrust 1: VSF Med Dataset and Measurement
- **Dataset**: 2,000+ base questions with 16,847 validated paraphrases across 5 clinical categories
- **FSF Rates**: Document 12-18% baseline FSF in medical VLMs (68-71% with stable attention)
- **EFG Quantification**: Deletion AUC 0.34-0.39 points higher for incorrect predictions
- **Linguistic Patterns**: Negation (>22% flip rate) and scope ambiguity (18-20%) as primary triggers
- **Attention Stability**: Average SSIM of 0.876 ± 0.082 across paraphrase pairs

### Thrust 2: Causal Analysis Results
- **Layer-wise Divergence**: Sharp representation divergence at layers 12-16 (MedGemma) and 8-12 (LLaVA-Rad)
- **Attention Interchange**: 38-43% flip reduction through cross-attention component swapping
- **Token Importance**: Negation tokens show 2.8× higher gradient importance than average
- **Visual Stability**: Image patch importance uniform (SD < 0.12) confirming linguistic origin
- **Mediation Analysis**: 65-70% of answer changes mediated through cross-attention pathways

### Thrust 3: Mitigation Effectiveness
- **FSF Reduction**: From 12-18% baseline to <5% post-intervention
- **Parameter Efficiency**: <1% of model parameters modified via LoRA (rank 16-32)
- **Accuracy Preservation**: Maintain or improve diagnostic accuracy (±2%)
- **Training Efficiency**: Convergence in 8-12 epochs on 8× A100 GPUs
- **Robustness Transfer**: <7% FSF on held-out linguistic phenomena

### Thrust 4: Clinical Deployment Metrics
- **Triage Performance**: 30-40% auto-clearance of normal cases
- **Safety Guarantees**: >99% sensitivity for critical findings (pneumothorax, tension pneumothorax)
- **Calibration**: ECE < 0.05 after temperature scaling and isotonic regression
- **Radiologist Agreement**: 85% concordance with expert decisions on triage
- **Efficiency Gains**: 25-30% reduction in radiologist workload in simulation

## Deliverables

### 1. Expanded Interpretability Toolkit
Building on the existing medical-vlm-interpret repository:
- **Debugging modules** for failure analysis
- **Concept grounding visualization** highlighting relevant image regions
- **Attention shift measurement** under paraphrase variation
- **Clinical safety analysis** with uncertainty metrics
- **Documentation** with examples and Colab notebooks

### 2. Robust VLM Checkpoints
- Fine-tuned versions of LLaVA-Rad, MedGemma, or similar VLMs
- Baseline comparisons with GPT-5 (closed-source state-of-the-art)
- Models robust to phrasing variation
- Training scripts and configurations
- Performance benchmarks showing improved consistency

### 3. VSF Med Dataset
- **Comprehensive Benchmark**: 2,000+ radiological questions from MIMIC-CXR
- **Validated Paraphrases**: 8-10 clinically validated paraphrases per question (16,847 total)
- **Linguistic Annotations**: Tagged with primary variation type (lexical, syntactic, pragmatic, negation, scope)
- **ROI Annotations**: 1,500 images with expert-annotated regions of interest
- **Open Release**: Available at https://huggingface.co/datasets/saillab/medical-vqa-robustness-analysis

### 4. Novel Evaluation Metrics
- **FSF Index**: Proportion of flips with stable attention (SSIM > 0.85)
- **EFG Coefficient**: Stratified faithfulness metrics by correctness
- **Attention-Answer Coupling (AAC)**: Correlation between visual stability and answer consistency
- **Phenomenon-Stratified Flip Rate**: Performance breakdown by linguistic variation type
- **Clinical Safety Score**: Weighted metric prioritizing critical finding sensitivity

### 5. Publications and Dissertation
- Multiple conference and journal papers
- Preprints for early dissemination
- Doctoral dissertation manuscript
- Defense by August 2026

## Publishing Roadmap

### 1. MICCAI 2026 - Phrasing Robustness & Mitigation
- **Focus**: Methods to measure and improve robustness
- **Content**: Paraphrase dataset, training strategies, flip-rate reduction
- **Submission**: February 2026
- **Target**: Medical imaging methodology audience

### 2. NeurIPS 2026 - Uncertainty & Safe Triage
- **Focus**: Uncertainty-aware triage framework
- **Content**: Confidence thresholds, OOD detection, workflow simulation
- **Submission**: May 2026
- **Target**: AI/ML technical audience

### 3. Journal of Biomedical Informatics - Robust VLM Benchmark
- **Focus**: Comprehensive evaluation and toolkit
- **Content**: Interpretability features, robustness metrics, model comparisons
- **Submission**: Mid-2026
- **Target**: Biomedical informatics community

### 4. npj Digital Medicine - Clinical Safety and Deployment
- **Focus**: Safety implications and clinical evaluation
- **Content**: Reader study results, deployment guidelines, regulatory considerations
- **Submission**: Late Spring 2026
- **Target**: Clinical and informatics audience

### 5. Auxiliary Outputs
- AMIA 2025 workshop on medical LLM interpretability
- MIDL 2026 demo of visualization tool
- Blog posts and community engagement

## Core Technical Approach

### Phrasing Robustness Pipeline
```python
# Paraphrase generation with semantic preservation
def generate_paraphrases(question, n_variants=10):
    strategies = [
        synonym_replacement,
        negation_handling,
        formality_variation,
        medical_term_substitution
    ]
    return validated_paraphrases

# Consistency loss for training
def consistency_loss(model, image, question_variants):
    outputs = [model(image, q) for q in question_variants]
    return mean_kl_divergence(outputs)
```

### Causal Attribution Framework
```python
# Mediation analysis: phrasing → attention → answer
def causal_mediation_analysis(model, data):
    # Measure total effect
    total_effect = measure_answer_change(original, paraphrase)
    
    # Intervene on attention
    controlled_attention = fix_attention(original_attention)
    direct_effect = measure_with_intervention(controlled_attention)
    
    # Compute mediation
    mediation_effect = total_effect - direct_effect
    return mediation_percentage
```

### Triage System Architecture
```python
class SafeTriageSystem:
    def __init__(self, sensitivity_target=0.99):
        self.confidence_threshold = self.calibrate_threshold()
        self.ood_detector = self.train_ood_model()
        
    def triage_decision(self, image, question):
        prediction = self.model(image, question)
        confidence = self.get_calibrated_confidence(prediction)
        
        if self.is_ood(image, question):
            return "defer", "out-of-distribution"
        
        if confidence < self.confidence_threshold:
            return "defer", "low_confidence"
            
        if prediction == "normal" and confidence > 0.95:
            return "auto_clear", prediction
        else:
            return "radiologist_review", prediction
```

## Research Significance

This work addresses critical gaps in medical AI deployment:

1. **Clinical Safety**: Reducing phrasing brittleness prevents dangerous inconsistencies
2. **Trust Building**: Interpretable failures and uncertainty awareness increase clinician confidence
3. **Efficiency Gains**: Safe triage reduces radiologist workload without compromising care
4. **Methodological Advances**: Causal analysis techniques for multimodal medical AI
5. **Open Science**: Toolkit and datasets enable reproducible research

By August 2026, this dissertation will have demonstrated how to make medical VLMs reliable enough for real-world radiology workflows, with measurable improvements in robustness, interpretability, and clinical safety.
# Dissertation Proposal: Phrasing-Robust Medical Vision-Language Models for Radiology

> Measurement, Causality, Mitigation, and Safe Triage

[← Site Index](../Index.md) | [Timeline →](03-timeline.md)

---

## Background and Motivation

Medical vision-language models (VLMs) hold promise for assisting radiologists by interpreting imaging studies and answering clinical questions. However, current medical VLMs exhibit **brittle behavior under subtle input changes**, especially in phrasing of questions. Prior studies show that paraphrasing a question can significantly degrade a QA model's accuracy. For example, rewording a radiology question with the same intent may cause a model's answer to flip or its confidence to change unpredictably. Such sensitivity poses a **safety risk in clinical settings**, where inconsistent answers from an AI could erode clinician trust or lead to missed findings.

Moreover, small open-source VLMs still lag far behind expert performance on diagnostic tasks (often <40% accuracy vs >75% for GPT-5 in benchmarks), underscoring the need for domain-specific training and robustness improvements.

### The Interpretability Gap

Clinicians and researchers need tools to:
- **Debug model failures** systematically
- **Visualize what the model "sees"** in the image (concept grounding)
- **Measure how attention shifts** under different phrasings

An open-source toolkit has been developed to interrogate attention patterns and robustness in medical VLMs. This toolkit provides attention extraction and robustness analysis for chest X-ray VQA, including metrics like attention focus and flip-rate (how often answers flip across paraphrases). 

### The Path Forward

Integrating and expanding this toolkit will enable:
1. **Systematic measurement** of phrasing effects
2. **Causal attribution** – identifying whether phrasing or image features caused an output change
3. **Mitigation** through training or model design
4. **Uncertainty handling** so systems know when to defer to humans (safe triage)

A safe triage mechanism could automatically handle obvious normal cases while flagging uncertain or critical cases for radiologist review, but only if the AI's decisions are highly reliable (near-zero false negatives for critical findings).

## Research Questions

### 1. Phrasing Robustness
**How can we quantify and improve the robustness of medical VLMs to variations in question phrasing in radiology?**

### 2. Causal Attribution
**What are the causal factors behind VLM failures or answer changes under paraphrased inputs, and how can we attribute errors to input phrasing versus image features or model internals?**

### 3. Uncertainty and Reliability
**How can we quantify the uncertainty in a VLM's answers and incorporate it so the model knows when it is unsure, thereby improving reliability for high-stakes clinical decisions?**

### 4. Safe Triage Integration
**In what ways can a vision-language model be integrated into the radiology workflow as a triage tool that safely prioritizes or automates cases (e.g. normal vs abnormal exams) without missing critical findings?**

### 5. Generalization
**Do the robustness and interpretability improvements generalize across different datasets, imaging modalities, and clinical settings beyond the initial chest X-ray QA domain?**

## Hypotheses

### H1: Phrasing Robustness
Training and evaluation with diverse paraphrased queries will significantly reduce answer variability. We hypothesize that a fine-tuned VLM with paraphrase augmentation and a consistency loss will exhibit a **lower flip-rate (<5%)** across question rephrasings, compared to baseline models that might flip answers >20% of the time. The model's attention maps will likewise be more stable (high inter-prompt similarity).

### H2: Causal Attribution
Model failures under paraphrase changes can be causally attributed to shifts in attention and hidden representations induced by specific wording. Using causal analysis (e.g. intervention experiments or causal mediation analysis), we will find that certain phrasing elements (e.g. negations or uncommon synonyms) cause disproportionate changes in the model's attention distribution, which in turn mediates answer errors.

### H3: Uncertainty Quantification
Introducing an uncertainty estimation mechanism will allow the model to detect when it is likely to be wrong. Equipping the VLM with calibrated confidence scores or an "I don't know" option will yield well-calibrated predictions. We expect the model can achieve a target operating point (e.g. **95% sensitivity**) by abstaining on the most uncertain 5–10% of cases.

### H4: Safe Triage Efficacy
A VLM-based triage system with uncertainty guardrails can safely automate the triaging of normal cases. In a simulated radiology workflow, our system will correctly auto-clear ~30–40% of obviously normal studies while referring all ambiguous or abnormal cases to radiologists. With appropriate thresholds and OOD detection, the triage model should achieve **near-100% sensitivity for critical abnormalities**.

### H5: Generalization
The methods for robustness and safety developed on chest X-ray VQA will generalize to other scenarios. Our phrasing-robust training and interpretability toolkit will transfer to new imaging modalities (e.g. CT scans) or new datasets. In cross-dataset evaluations, the robust model will maintain superior consistency and accuracy compared to baseline.

## Expected Results

### For H1 (Robustness)
- Flip-rate reduction from >20% to <5% across paraphrases
- Maintained or improved overall QA accuracy
- More concentrated and consistent attention maps
- Quantified by higher attention overlap scores

### For H2 (Causal Analysis)
- Causal evidence isolating how phrasing affects model internals
- Mediation analysis showing X% of performance variation explained by attention changes
- Demonstration that guided attention maintains answer consistency
- Identification of specific linguistic constructs causing failures

### For H3 (Uncertainty)
- Well-calibrated reliability diagrams
- 5-10% abstention rate achieving 95% precision on remaining answers
- Nearly 100% of critical findings caught
- Low false negative rate for "normal" predictions

### For H4 (Safe Triage)
- Auto-clearance of ~30% of normal exams
- 100% sensitivity for critical abnormalities
- 85-90% specificity for non-urgent findings
- Measurable efficiency gains in simulated workflows
- Positive radiologist feedback on trust and utility

### For H5 (Generalization)
- Smaller performance degradation on external datasets
- Consistency maintained across question styles/languages
- Toolkit functionality across multiple model architectures
- Documentation of failure modes and limitations

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

### 3. Paraphrase & Triage Datasets
- **Radiology Paraphrase QA dataset**: Multiple paraphrased versions per question
- **Triage evaluation data**: Cases with AI decisions and outcomes
- Privacy-compliant release strategies
- Evaluation code and metrics

### 4. Benchmark Metrics and Leaderboard
- Clear metrics for robustness and safety
- Flip-rate, consistency score, calibrated risk score
- Triage sensitivity/specificity standards
- Community benchmark for comparison

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
- AMIA 2025 workshop on medical AI interpretability
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
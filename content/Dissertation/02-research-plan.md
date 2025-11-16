# Comprehensive PhD Research Plan: The Robustness Gauntlet

> A detailed implementation plan for developing and validating a comprehensive robustness evaluation framework for medical Vision-Language Models

> Note: This page reflects an earlier planning snapshot. For the current proposal and terminology (Phrasing-Sensitive Failure and Misleading Explanation Effect), see [[01-proposal|Dissertation Proposal]] and [[04-research-thrusts|Research Thrusts]].

[← Dissertation Index](../index.md) | [Proposal →](01-proposal.md) | [Timeline →](03-timeline.md)

---

## Research Overview

### Title
**A Robustness Gauntlet for Medical Vision-Language Models: Evaluating and Enhancing State-of-the-Art Systems on Chest X-ray Visual Question Answering**

### Core Contribution
Development of the **Robustness Gauntlet Framework** – a comprehensive evaluation and enhancement platform that:
1. **Tests** robustness across linguistic and visual dimensions
2. **Analyzes** model interpretability through attention grounding
3. **Enhances** performance via targeted training strategies
4. **Ensures** safety through clinical triage mechanisms

### Target Models
- **LLaVA-Rad (7B)**: Lightweight radiology-specific model
- **MedGemma (4B/27B)**: Google's instruction-tuned medical models
- **GPT-4V**: Closed-source baseline for comparison

## Research Questions & Methodology

### RQ1: Linguistic Robustness (Q1 2025)

**Question**: How robust are current chest X-ray VQA models to linguistic variations?

**Hypothesis**: Models exhibit >30% flip rate on semantically equivalent paraphrases.

**Methods**:
```python
# Paraphrase generation pipeline
paraphrase_categories = {
    "synonymy": ["pneumonia", "lung infection", "consolidation"],
    "negation": ["is there", "is there no", "absence of"],
    "hedging": ["definite", "probable", "possible"],
    "temporality": ["new", "recent", "acute"],
    "quantifiers": ["any", "some", "significant"],
    "clinical_style": ["formal", "conversational"]
}

# Evaluation metrics
metrics = {
    "flip_rate": "% answers changing",
    "consistency_score": "agreement across variants",
    "confidence_stability": "confidence score variance"
}
```

**Expected Results**: 
- Baseline consistency: 60-70%
- Negations cause highest flip rates
- Instruction-tuned models (MedGemma) more robust

### RQ2: Visual Robustness (Q1-Q2 2025)

**Question**: How do VLMs perform under visual perturbations and distribution shifts?

**Methods**:
- Gaussian noise (σ = 0.01, 0.05, 0.1)
- Rotations (±5°, ±10°, ±15°)
- Brightness/contrast variations
- Cross-dataset evaluation (MIMIC → CheXpert)

**Expected Results**:
- 10-20% accuracy drop on OOD data
- Small perturbations cause 3-5% degradation
- Models become more uncertain/generic

### RQ3: Attention Grounding (Q1-Q2 2025)

**Question**: Do VLMs ground answers in correct image regions?

**Methods**:
```python
class GroundingAnalysis:
    def extract_attention(self, model, image, question):
        # Unified extraction across architectures
        if isinstance(model, LLaVARad):
            return self.extract_decoder_attention()
        elif isinstance(model, MedGemma):
            return self.extract_cross_attention()
    
    def compute_metrics(self, attention_map, roi_mask):
        focus = -np.sum(attention * np.log(attention + 1e-8))
        roi_overlap = IoU(attention > threshold, roi_mask)
        return focus, roi_overlap
```

**Expected Results**:
- ROI alignment: ~70% for clear findings
- Evidence of spurious correlations
- MedGemma may have sharper attention than LLaVA-Rad

### RQ4: Robustness Enhancement (Q2-Q3 2025)

**Question**: Can targeted training improve robustness?

**Methods**:
1. **Paraphrase Augmentation**
   ```python
   def augment_with_paraphrases(dataset):
       for item in dataset:
           paraphrases = generate_paraphrases(item.question)
           for p in paraphrases:
               yield (item.image, p, item.answer)
   ```

2. **Consistency Loss**
   ```python
   def consistency_loss(model, image, questions):
       outputs = [model(image, q) for q in questions]
       return KL_divergence(outputs)
   ```

3. **Attention Supervision**
   ```python
   def attention_loss(predicted_attention, roi_mask):
       return BCE(predicted_attention, roi_mask)
   ```

**Expected Results**:
- Flip rate: >30% → <20%
- ROI alignment improvement
- Maintained standard accuracy

### RQ5: Clinical Triage (Q4 2025 - Q1 2026)

**Question**: How to integrate triage for safe deployment?

**Methods**:
```python
class TriageSystem:
    def __init__(self, error_threshold=0.2):
        self.error_predictor = self.train_error_model()
        self.threshold = error_threshold
    
    def should_defer(self, prediction_bundle):
        # Multi-signal decision
        signals = {
            'paraphrase_consistency': self.check_consistency(),
            'confidence': prediction_bundle.confidence,
            'attention_entropy': self.compute_attention_entropy(),
            'question_risk': self.assess_question_type()
        }
        
        error_prob = self.error_predictor(signals)
        return error_prob > self.threshold
```

**Expected Results**:
- Error detection: >80%
- Deferral rate: 15-20%
- Safe accuracy: ~90%

## Implementation Timeline

### Phase 1: Foundation (Jan-Mar 2025)
**Month 1 (January)**
- Set up evaluation infrastructure
- Implement paraphrase generation pipeline
- Begin RQ1 linguistic robustness experiments

**Month 2 (February)**
- Complete RQ1 experiments and analysis
- Implement visual perturbation suite
- Start RQ2 visual robustness testing

**Month 3 (March)**
- Implement attention extraction toolkit
- Complete RQ3 grounding analysis
- **Deliverable**: MICCAI 2025 paper submission

### Phase 2: Enhancement (Apr-Jun 2025)
**Month 4 (April)**
- Design training enhancements (RQ4)
- Create augmented training datasets
- **Deliverable**: Toolkit v1.0 release

**Month 5 (May)**
- Implement consistency training
- Fine-tune robust models
- Validate improvements

**Month 6 (June)**
- Complete enhancement experiments
- **Deliverable**: NeurIPS 2025 paper submission

### Phase 3: Clinical Integration (Jul-Sep 2025)
**Month 7 (July)**
- Design triage system architecture
- Implement error prediction models
- **Deliverable**: Model weights on HuggingFace

**Month 8 (August)**
- Integrate triage with VQA system
- Conduct initial validation
- Prepare workshop submissions

**Month 9 (September)**
- Complete triage evaluation
- Gather clinical feedback
- Refine based on results

### Phase 4: Validation & Dissemination (Oct-Dec 2025)
**Month 10 (October)**
- Present at MICCAI 2025
- Incorporate conference feedback
- Design user studies

**Month 11 (November)**
- RSNA 2025 demonstration
- Clinical collaborator meetings
- Begin journal paper draft

**Month 12 (December)**
- Present at NeurIPS 2025
- Complete 2025 milestones
- Plan 2026 activities

### Phase 5: Final Year (2026)
**Q1 2026**
- Journal submission (Nature npj Digital Medicine)
- User studies with radiologists
- Toolkit v2.0 development

**Q2 2026**
- MICCAI 2026 submission (triage focus)
- Clinical validation studies
- Integration guidelines

**Q3 2026**
- Dissertation writing
- Final experiments
- Documentation completion

**Q4 2026**
- Workshop/tutorial at major conference
- Dissertation defense (November)
- Project handover and sustainability

## Key Deliverables

### 1. Software Artifacts
**Robustness Gauntlet Toolkit**
- GitHub: Extended medical-vlm-interpret
- Features: Batch evaluation, visualization, metrics
- Documentation: Tutorials, API reference, examples

**Enhanced Models**
- Fine-tuned LLaVA-Rad with robustness improvements
- Enhanced MedGemma variants
- Training code and configurations

### 2. Datasets
**Paraphrase Benchmark**
- 500+ questions × 7-10 variants
- Expert-verified equivalence
- Public release on HuggingFace

**Robustness Test Suite**
- Visual perturbations
- OOD test cases
- Hard negatives collection

### 3. Publications
**2025**
- MICCAI: Evaluation methodology (RQ1-3)
- NeurIPS: Enhancement techniques (RQ4)
- Workshops: MIDL, ML4H

**2026**
- npj Digital Medicine: Comprehensive framework
- MICCAI: Triage systems (RQ5)
- Technical reports and preprints

### 4. Clinical Resources
- Deployment guidelines
- Safety checklists
- Training materials
- Best practices documentation

## Success Metrics

### Technical Metrics
- Flip rate reduction: >30% → <20%
- ROI alignment: ~70% → >85%
- Triage precision: >80%
- Safe accuracy: ~90%

### Impact Metrics
- Toolkit adoption (>100 users)
- Model downloads (>1000)
- Citations (>50 within 2 years)
- Clinical pilots (2-3 institutions)

## Risk Mitigation

### Technical Risks
- **Model access**: Use open-source alternatives
- **Computation**: Leverage academic clusters
- **Data access**: Use public datasets, seek collaborations

### Timeline Risks
- **Publication delays**: Maintain preprints
- **Scope creep**: Focus on chest X-ray VQA
- **Integration challenges**: Early prototyping

### Clinical Risks
- **IRB delays**: Start applications early
- **Collaborator availability**: Multiple partnerships
- **Validation complexity**: Phased approach

## Sustainability Plan

### Open Source Strategy
- Comprehensive documentation
- Community contribution guidelines
- Regular maintenance schedule
- Transfer to established organization

### Academic Integration
- Teaching materials development
- Workshop/tutorial creation
- Student project opportunities
- Conference presence

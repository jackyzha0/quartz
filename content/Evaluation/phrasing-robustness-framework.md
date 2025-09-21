# Phrasing Robustness Framework

> Core methodology for measuring and improving medical VLM robustness to question paraphrasing

[� Evaluation Index](index.md) | [MedPhr-Rad �](01-medphr-rad.md) | [Metrics �](02-paraphrase-robustness.md)

---

## Overview

The Phrasing Robustness Framework addresses a critical safety issue in medical vision-language models: their brittleness to subtle changes in question phrasing. When a radiologist asks "Is there pneumonia?" versus "Any lung infection present?", the model should provide consistent answers. Our framework provides comprehensive methods to measure, understand, and mitigate this phrasing sensitivity.

## Framework Components

### 1. Measurement Pipeline

```python
class PhrasingRobustnessEvaluator:
    def __init__(self, model, paraphrase_generator):
        self.model = model
        self.generator = paraphrase_generator
        self.metrics = RobustnessMetrics()
    
    def evaluate_question(self, image, original_question):
        # Generate semantically equivalent paraphrases
        paraphrases = self.generator.generate(
            original_question,
            n_variants=10,
            preserve_medical_concepts=True
        )
        
        # Collect predictions
        predictions = []
        attention_maps = []
        
        for question in [original_question] + paraphrases:
            pred, attn = self.model.predict_with_attention(image, question)
            predictions.append(pred)
            attention_maps.append(attn)
        
        # Compute robustness metrics
        metrics = {
            'flip_rate': self.metrics.compute_flip_rate(predictions),
            'consistency': self.metrics.compute_consistency(predictions),
            'attention_divergence': self.metrics.attention_js_divergence(attention_maps),
            'confidence_variance': self.metrics.confidence_variance(predictions)
        }
        
        return metrics, predictions, paraphrases
```

### 2. Paraphrase Generation

Our framework uses a multi-strategy approach to generate clinically valid paraphrases:

```python
class MedicalParaphraseGenerator:
    def __init__(self):
        self.strategies = [
            SynonymReplacer(medical_dict='UMLS'),
            NegationHandler(),
            FormalityVariator(),
            TemporalReformulator(),
            QuantifierModifier(),
            ClinicalStyleAdapter()
        ]
        
        self.validator = MedicalSemanticValidator()
    
    def generate(self, question, n_variants=10):
        candidates = []
        
        for strategy in self.strategies:
            variants = strategy.apply(question)
            candidates.extend(variants)
        
        # Validate semantic equivalence
        valid_paraphrases = []
        for candidate in candidates:
            if self.validator.is_equivalent(question, candidate):
                valid_paraphrases.append(candidate)
        
        return valid_paraphrases[:n_variants]
```

### 3. Causal Analysis

Understanding WHY models fail on paraphrases is crucial:

```python
class CausalMediationAnalyzer:
    """
    Analyzes causal pathway: phrasing � attention � answer
    """
    def analyze_phrasing_effect(self, model, image, original, paraphrase):
        # Total effect: change in answer
        total_effect = self.measure_answer_change(
            model(image, original),
            model(image, paraphrase)
        )
        
        # Get attention patterns
        attn_original = model.get_attention(image, original)
        attn_paraphrase = model.get_attention(image, paraphrase)
        
        # Intervention: fix attention to original
        with model.fix_attention(attn_original):
            answer_fixed_attn = model(image, paraphrase)
        
        # Direct effect (phrasing � answer, bypassing attention)
        direct_effect = self.measure_answer_change(
            model(image, original),
            answer_fixed_attn
        )
        
        # Mediation effect (through attention)
        mediation_effect = total_effect - direct_effect
        mediation_percentage = mediation_effect / total_effect * 100
        
        return {
            'total_effect': total_effect,
            'direct_effect': direct_effect,
            'mediation_effect': mediation_effect,
            'mediation_percentage': mediation_percentage
        }
```

### 4. Mitigation Strategies

#### A. Consistency Training

```python
def consistency_loss(model, image, question_variants, alpha=0.5):
    """
    Encourages consistent predictions across paraphrases
    """
    outputs = []
    for q in question_variants:
        output = model(image, q)
        outputs.append(output)
    
    # KL divergence between all pairs
    consistency_term = 0
    n = len(outputs)
    for i in range(n):
        for j in range(i+1, n):
            consistency_term += kl_divergence(outputs[i], outputs[j])
    
    # Combine with standard loss
    base_loss = cross_entropy(outputs[0], ground_truth)
    total_loss = base_loss + alpha * consistency_term
    
    return total_loss
```

#### B. Paraphrase Augmentation

```python
class ParaphraseAugmentedTraining:
    def __init__(self, base_dataset):
        self.dataset = base_dataset
        self.generator = MedicalParaphraseGenerator()
    
    def __getitem__(self, idx):
        image, question, answer = self.dataset[idx]
        
        # Dynamically generate paraphrases
        if random.random() < 0.5:  # 50% augmentation rate
            paraphrases = self.generator.generate(question, n=1)
            if paraphrases:
                question = paraphrases[0]
        
        return image, question, answer
```

### 5. Uncertainty-Aware Triage

```python
class PhrasingRobustTriage:
    def __init__(self, model, confidence_threshold=0.95):
        self.model = model
        self.threshold = confidence_threshold
        self.evaluator = PhrasingRobustnessEvaluator(model)
    
    def triage_decision(self, image, question):
        # Test with paraphrases
        metrics, predictions, _ = self.evaluator.evaluate_question(
            image, question
        )
        
        # Check consistency
        if metrics['flip_rate'] > 0.1:  # >10% disagreement
            return 'defer', 'inconsistent_across_phrasings'
        
        # Check confidence
        avg_confidence = np.mean([p.confidence for p in predictions])
        if avg_confidence < self.threshold:
            return 'defer', 'low_confidence'
        
        # Check for critical findings
        if self.is_critical_finding(predictions[0]):
            return 'radiologist_review', 'critical_finding'
        
        # Safe to auto-clear
        return 'auto_clear', predictions[0]
```

## Evaluation Metrics

### Core Robustness Metrics

1. **Flip-Rate**: Percentage of paraphrases yielding different answers
   - Baseline: >20% for current open models (GPT-5 shows ~12%)
   - Target: <5% after mitigation

2. **Consistency Score**: Average agreement across paraphrases
   - Uses exact match and semantic similarity
   - Weighted by clinical importance

3. **Attention Stability**: JS divergence of attention maps
   - Measures visual grounding consistency
   - Lower values indicate more stable attention

4. **Confidence Variance**: Standard deviation of confidence scores
   - High variance indicates uncertainty about phrasing
   - Used for triage decisions

### Clinical Relevance Metrics

- **Critical Finding Consistency**: 100% agreement required for urgent findings
- **Normal Case Stability**: High consistency for auto-clearance
- **Diagnostic Agreement**: Cohen's kappa with radiologist consensus

## Integration Guidelines

### For Researchers

1. **Benchmarking**: Use our paraphrase test sets to evaluate any medical VLM
2. **Training**: Incorporate consistency loss and augmentation
3. **Analysis**: Apply causal mediation to understand failures
4. **Publication**: Report flip-rate and consistency metrics

### For Developers

1. **API Integration**: Simple interface for robustness testing
2. **Model Cards**: Include phrasing robustness scores
3. **Monitoring**: Track consistency in production
4. **Alerts**: Flag inconsistent predictions for review

### For Clinicians

1. **Trust Indicators**: Visual cues for prediction consistency
2. **Explanation**: Show how different phrasings affect the model
3. **Override Options**: Easy correction for inconsistent cases
4. **Feedback Loop**: Report phrasing-related failures

## Expected Impact

### Short-term (3-6 months)
- Reduce flip-rate from >20% to <10%
- Release benchmark datasets and toolkit
- Publish initial findings at MICCAI 2026

### Medium-term (6-12 months)
- Achieve <5% flip-rate on enhanced models
- Deploy triage system in pilot hospitals
- Establish industry standards for robustness

### Long-term (12+ months)
- Near-zero critical finding inconsistencies
- Regulatory guidance on phrasing robustness
- Widespread adoption of robust medical VLMs

## Related Resources

- [[01-medphr-rad|MedPhr-Rad Benchmark]]: Paraphrase datasets
- [[02-paraphrase-robustness|Robustness Metrics]]: Detailed metric definitions
- [[interpretability-toolkit|Interpretability Toolkit]]: Attention analysis tools
- [[../Safety/02-selective-conformal-triage|Conformal Triage]]: Safety deployment
- [[../Healthcare/03-llava-rad|LLaVA-RAD]]: Primary evaluation model

## Code and Data

- **GitHub**: [medical-vlm-robustness](https://github.com/sail-lab/medical-vlm-robustness)
- **Models**: [HuggingFace Hub](https://huggingface.co/sail-med)
- **Datasets**: Available with DUA for MIMIC-CXR access
- **Colab Demo**: [Interactive robustness testing](https://colab.research.google.com/drive/xxx)
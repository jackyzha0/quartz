# Medical VLM Interpretability Toolkit

> Open-source tools for debugging, visualizing, and understanding medical vision-language models

[ Evaluation Index](index.md) | [Phrasing Framework ’](phrasing-robustness-framework.md)

---

## Overview

The Medical VLM Interpretability Toolkit provides researchers and clinicians with essential tools to understand how medical vision-language models make decisions. Building on the existing medical-vlm-interpret repository, this expanded toolkit enables systematic debugging of model failures, visualization of attention patterns, and measurement of robustness under various conditions.

## Key Features

### 1. Attention Visualization

```python
class AttentionVisualizer:
    def __init__(self, model):
        self.model = model
        self.hook_manager = AttentionHookManager(model)
    
    def visualize_attention(self, image, question, layer=-1):
        """
        Extract and visualize cross-modal attention patterns
        """
        # Forward pass with hooks
        with self.hook_manager:
            output = self.model(image, question)
        
        # Get attention maps
        attention_maps = self.hook_manager.get_attention(layer)
        
        # Create visualization
        fig, axes = plt.subplots(2, 2, figsize=(12, 12))
        
        # Original image
        axes[0, 0].imshow(image)
        axes[0, 0].set_title("Original Image")
        
        # Attention heatmap
        heatmap = self.process_attention_for_visualization(attention_maps)
        axes[0, 1].imshow(image)
        axes[0, 1].imshow(heatmap, alpha=0.5, cmap='hot')
        axes[0, 1].set_title("Attention Overlay")
        
        # Top attended regions
        top_regions = self.extract_top_regions(attention_maps, n=5)
        axes[1, 0].imshow(self.highlight_regions(image, top_regions))
        axes[1, 0].set_title("Top 5 Attended Regions")
        
        # Attention distribution
        self.plot_attention_distribution(axes[1, 1], attention_maps)
        
        return fig, attention_maps
```

### 2. Robustness Analysis

```python
class RobustnessAnalyzer:
    def __init__(self, model):
        self.model = model
        self.metrics = RobustnessMetrics()
    
    def analyze_phrasing_robustness(self, image, question_variants):
        """
        Measure model consistency across paraphrases
        """
        results = {
            'predictions': [],
            'confidences': [],
            'attention_maps': []
        }
        
        for question in question_variants:
            pred, conf, attn = self.model.predict_with_details(image, question)
            results['predictions'].append(pred)
            results['confidences'].append(conf)
            results['attention_maps'].append(attn)
        
        # Compute metrics
        metrics = {
            'flip_rate': self.metrics.flip_rate(results['predictions']),
            'consistency': self.metrics.consistency_score(results['predictions']),
            'attention_divergence': self.metrics.attention_js_divergence(
                results['attention_maps']
            ),
            'confidence_variance': np.std(results['confidences'])
        }
        
        # Generate report
        report = self.generate_robustness_report(
            question_variants, results, metrics
        )
        
        return metrics, report
```

### 3. Concept Grounding

```python
class ConceptGroundingAnalyzer:
    def __init__(self, model, medical_concepts):
        self.model = model
        self.concepts = medical_concepts  # RadLex, UMLS mappings
    
    def ground_medical_concepts(self, image, question, answer):
        """
        Map model attention to medical concepts
        """
        # Extract medical terms from question/answer
        medical_terms = self.extract_medical_terms(question, answer)
        
        # Get attention for each term
        grounding_results = {}
        
        for term in medical_terms:
            # Create targeted question
            probe_question = f"Where is the {term} in this image?"
            
            # Get attention
            _, attn_map = self.model.predict_with_attention(image, probe_question)
            
            # Localize concept
            bbox, confidence = self.localize_from_attention(attn_map)
            
            grounding_results[term] = {
                'bbox': bbox,
                'confidence': confidence,
                'attention_map': attn_map,
                'umls_code': self.concepts.get_umls(term),
                'radlex_id': self.concepts.get_radlex(term)
            }
        
        return grounding_results
```

### 4. Failure Mode Analysis

```python
class FailureModeDetector:
    def __init__(self, model):
        self.model = model
        self.failure_patterns = self.load_failure_patterns()
    
    def analyze_failure(self, image, question, expected, predicted):
        """
        Identify why the model made an incorrect prediction
        """
        failure_analysis = {
            'failure_type': None,
            'confidence': 0.0,
            'evidence': [],
            'suggestions': []
        }
        
        # Check attention patterns
        _, attention = self.model.predict_with_attention(image, question)
        
        # Pattern 1: Attention on wrong region
        if self.is_mislocalized_attention(attention, expected):
            failure_analysis['failure_type'] = 'mislocalized_attention'
            failure_analysis['evidence'].append({
                'type': 'attention_analysis',
                'description': 'Model attending to incorrect image regions'
            })
            failure_analysis['suggestions'].append(
                'Consider attention regularization during training'
            )
        
        # Pattern 2: Linguistic confusion
        if self.has_linguistic_confusion(question, predicted):
            failure_analysis['failure_type'] = 'linguistic_confusion'
            failure_analysis['evidence'].append({
                'type': 'linguistic_analysis',
                'description': 'Model confused by question phrasing'
            })
            failure_analysis['suggestions'].append(
                'Train with paraphrase augmentation'
            )
        
        # Pattern 3: Visual ambiguity
        if self.has_visual_ambiguity(image, attention):
            failure_analysis['failure_type'] = 'visual_ambiguity'
            failure_analysis['evidence'].append({
                'type': 'visual_analysis',
                'description': 'Image quality or ambiguous findings'
            })
        
        return failure_analysis
```

### 5. Clinical Safety Analysis

```python
class ClinicalSafetyAnalyzer:
    def __init__(self, model, critical_findings_db):
        self.model = model
        self.critical_findings = critical_findings_db
    
    def assess_clinical_safety(self, image, question, prediction):
        """
        Evaluate safety implications of model predictions
        """
        safety_assessment = {
            'risk_level': 'low',  # low, medium, high, critical
            'missed_findings': [],
            'false_positives': [],
            'confidence_calibration': None,
            'recommendation': 'proceed'
        }
        
        # Check for critical finding mentions
        critical_terms = self.extract_critical_terms(question, prediction)
        
        # Analyze prediction consistency
        paraphrases = self.generate_clinical_paraphrases(question)
        consistency_metrics = self.analyze_consistency(image, paraphrases)
        
        # Assess risk
        if consistency_metrics['flip_rate'] > 0.1:
            safety_assessment['risk_level'] = 'high'
            safety_assessment['recommendation'] = 'radiologist_review'
        
        # Check for known critical patterns
        for finding in self.critical_findings:
            if self.is_finding_missed(image, finding, prediction):
                safety_assessment['missed_findings'].append(finding)
                safety_assessment['risk_level'] = 'critical'
        
        return safety_assessment
```

## Usage Examples

### Basic Attention Visualization

```python
# Load model and toolkit
model = load_medical_vlm('llava-rad')
toolkit = MedicalVLMInterpretabilityToolkit(model)

# Load image and question
image = load_chest_xray('patient_001.jpg')
question = "Is there evidence of pneumonia?"

# Visualize attention
viz = toolkit.attention_visualizer
fig, attention_maps = viz.visualize_attention(image, question)
plt.show()

# Save for clinical review
fig.savefig('attention_analysis_patient_001.png', dpi=300)
```

### Robustness Testing

```python
# Generate paraphrases
paraphrases = [
    "Is there evidence of pneumonia?",
    "Any signs of lung infection?",
    "Do you see pneumonia?",
    "Is pneumonia present?",
    "Are there pneumonic changes?"
]

# Analyze robustness
analyzer = toolkit.robustness_analyzer
metrics, report = analyzer.analyze_phrasing_robustness(image, paraphrases)

print(f"Flip-rate: {metrics['flip_rate']:.2%}")
print(f"Consistency: {metrics['consistency']:.2%}")
print(f"Attention stability: {metrics['attention_divergence']:.3f}")

# Generate detailed report
report.save_html('robustness_report.html')
```

### Clinical Integration

```python
# Clinical safety check
safety_analyzer = toolkit.clinical_safety_analyzer

# Analyze prediction
prediction = model.predict(image, question)
safety = safety_analyzer.assess_clinical_safety(image, question, prediction)

if safety['risk_level'] in ['high', 'critical']:
    print(f"  Safety Alert: {safety['recommendation']}")
    print(f"Reason: {safety['missed_findings']}")
else:
    print(f" Safe to proceed with: {prediction}")
```

## Toolkit Components

### Core Modules

1. **attention_extraction.py**: Hook-based attention extraction for various architectures
2. **visualization.py**: Advanced plotting and heatmap generation
3. **robustness_metrics.py**: Comprehensive robustness measurements
4. **concept_grounding.py**: Medical concept localization
5. **failure_analysis.py**: Systematic failure mode detection
6. **clinical_safety.py**: Safety assessment and risk scoring

### Supported Models

- LLaVA-Rad (all variants)
- MedGemma (4B, 27B)
- LLaVA-Med
- BiomedCLIP
- Custom models with compatible architectures

### Output Formats

- Interactive HTML reports
- Publication-ready figures
- JSON metrics for integration
- DICOM-compatible annotations
- Clinical summary PDFs

## Installation

```bash
pip install medical-vlm-interpretability

# For development
git clone https://github.com/sail-lab/medical-vlm-interpret
cd medical-vlm-interpret
pip install -e ".[dev]"
```

## Documentation

- [API Reference](https://medical-vlm-interpret.readthedocs.io)
- [Colab Tutorials](https://github.com/sail-lab/medical-vlm-interpret/notebooks)
- [Clinical User Guide](https://github.com/sail-lab/medical-vlm-interpret/docs/clinical_guide.pdf)

## Contributing

We welcome contributions! Please see our [contribution guidelines](https://github.com/sail-lab/medical-vlm-interpret/CONTRIBUTING.md).

## Related Resources

- [[phrasing-robustness-framework|Phrasing Robustness Framework]]
- [[01-medphr-rad|MedPhr-Rad Benchmark]]
- [[../Healthcare/03-llava-rad|LLaVA-RAD Model]]
- [[../Safety/02-selective-conformal-triage|Conformal Triage]]
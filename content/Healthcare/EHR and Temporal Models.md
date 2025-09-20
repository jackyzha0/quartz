# Chapter 5: EHR and Temporal Models

> Large language models for electronic health records, clinical time series, and longitudinal patient data analysis.

[← Medical Vision-Language Models](Medical%20Vision-Language%20Models.md) | [Back to Index](../Index.md) | [Next: Validation and Datasets →](Validation%20and%20Datasets.md)

---

## Executive Summary

Electronic Health Records (EHRs) contain rich, longitudinal patient data combining structured fields, unstructured clinical notes, and temporal measurements. This chapter explores how LLMs are being adapted to process this complex, multimodal healthcare data for clinical decision support, risk prediction, and automated documentation.

## 5.1 The EHR Challenge

### 5.1.1 Data Complexity

EHRs present unique challenges:

| Data Type | Volume | Challenges |
|-----------|--------|------------|
| **Clinical Notes** | 80% of EHR | Unstructured, medical jargon |
| **Lab Results** | Thousands/patient | Temporal, missing values |
| **Medications** | Complex histories | Interactions, discontinuations |
| **Vital Signs** | Continuous streams | Irregular sampling |
| **Diagnoses** | ICD codes | Hierarchical, evolving |

### 5.1.2 Why Standard LLMs Fail

- **Medical Terminology**: 100,000+ specialized terms
- **Temporal Reasoning**: Disease progression over time
- **Multi-scale Time**: Minutes (ICU) to years (chronic)
- **Sparse Data**: Irregular observations
- **Privacy Requirements**: Can't use cloud APIs

## 5.2 GatorTron: Large Clinical Language Model

### 5.2.1 Architecture and Scale

Breaking barriers in clinical NLP:

```python
class GatorTron(nn.Module):
    def __init__(self, size='8.9B'):
        super().__init__()
        configs = {
            '345M': {'layers': 24, 'hidden': 1024, 'heads': 16},
            '3.9B': {'layers': 48, 'hidden': 2560, 'heads': 40},
            '8.9B': {'layers': 48, 'hidden': 4096, 'heads': 64}
        }
        
        config = configs[size]
        self.transformer = MegatronBERT(
            num_layers=config['layers'],
            hidden_size=config['hidden'],
            num_attention_heads=config['heads'],
            max_position_embeddings=512,
            vocab_size=50265  # Extended medical vocabulary
        )
```

### 5.2.2 Training Data

**Unprecedented clinical corpus:**

| Source | Size | Content |
|--------|------|---------|
| **UF Health** | 50B words | 126M notes, 2M patients |
| **PubMed** | 16B words | Biomedical literature |
| **Wikipedia** | 3B words | Medical articles |
| **MIMIC-III** | 500M words | Public ICU data |
| **Clinical Trials** | 1B words | Protocol descriptions |

**Total**: >90B words of text (>82B clinical)

### 5.2.3 Clinical NLP Tasks

Performance improvements:

| Task | Metric | GatorTron-3.9B | BioBERT | Improvement |
|------|--------|----------------|---------|-------------|
| **Clinical NER** | F1 | 92.4% | 87.8% | +5.2% |
| **Relation Extraction** | F1 | 89.1% | 83.2% | +7.1% |
| **Text Similarity** | Pearson | 0.84 | 0.76 | +10.5% |
| **Natural Language Inference** | Acc | 88.5% | 82.3% | +7.5% |
| **Medical QA** | EM | 78.9% | 71.4% | +10.5% |

### 5.2.4 Clinical Applications

```python
# Example: Automated ICD coding
def extract_diagnoses(clinical_note):
    # Tokenize and encode
    inputs = gatortron_tokenizer(clinical_note, return_tensors='pt')
    
    # Extract representations
    with torch.no_grad():
        outputs = gatortron_model(**inputs)
        hidden_states = outputs.last_hidden_state
    
    # Multi-label classification head
    icd_logits = icd_classifier(hidden_states.mean(dim=1))
    
    # Threshold and decode
    predicted_codes = (torch.sigmoid(icd_logits) > 0.5)
    return decode_icd_codes(predicted_codes)
```

## 5.3 Few-Shot Health Learners: Time Series with LLMs

### 5.3.1 Grounding Numerical Data

Adapting text-based LLMs for physiological signals:

```python
class TimeSeriesLLM:
    def __init__(self, base_model='PaLM-24B'):
        self.llm = load_model(base_model)
        self.tokenizer = NumericTokenizer()
        
    def encode_timeseries(self, values, timestamps):
        # Convert to text representation
        text_repr = []
        for t, v in zip(timestamps, values):
            # Format: [TIME: HH:MM] METRIC: VALUE
            text_repr.append(f"[{t}] HR: {v} bpm")
        
        return " ".join(text_repr)
```

### 5.3.2 Applications Demonstrated

**Diverse health monitoring tasks:**

| Task | Input | Output | Performance |
|------|-------|--------|-------------|
| **Cardiac Analysis** | ECG waveform | Arrhythmia detection | 91% accuracy |
| **Activity Recognition** | Accelerometer | Activity type | 87% F1 |
| **Metabolic Calculation** | Motion + demographics | Calories burned | ±50 kcal/day |
| **Stress Detection** | HRV + EDA | Stress level | 0.78 correlation |
| **Mental Health** | Multi-sensor | PHQ-9 score | ±2 points |

### 5.3.3 Few-Shot Adaptation

```python
# Example: 5-shot learning for new vital sign
few_shot_prompt = """
Given these examples of respiratory patterns:
1. [09:00] RR: 12, SpO2: 98% → Status: Normal
2. [09:15] RR: 24, SpO2: 94% → Status: Mild distress
3. [09:30] RR: 8, SpO2: 99% → Status: Bradypnea
4. [09:45] RR: 30, SpO2: 91% → Status: Severe distress
5. [10:00] RR: 16, SpO2: 96% → Status: Normal

Now classify: [10:15] RR: 28, SpO2: 92% → Status: ?
"""

response = model.generate(few_shot_prompt)
# Output: "Moderate to severe distress"
```

## 5.4 Temporal Modeling Strategies

### 5.4.1 Handling Irregular Sampling

Clinical data arrives irregularly:

```python
class IrregularTimeSeriesEncoder:
    def __init__(self):
        self.time_encoder = TimePositionalEncoding()
        self.value_encoder = ValueEmbedding()
        self.missing_token = nn.Parameter(torch.randn(768))
    
    def encode(self, times, values, mask):
        # Handle missing values
        encoded_values = torch.where(
            mask,
            self.value_encoder(values),
            self.missing_token
        )
        
        # Add time information
        time_features = self.time_encoder(times)
        
        # Combine
        return encoded_values + time_features
```

### 5.4.2 Multi-Scale Temporal Attention

Different timescales for different signals:

```python
class MultiScaleTemporalAttention(nn.Module):
    def __init__(self):
        super().__init__()
        self.minute_attention = TemporalAttention(window=60)
        self.hour_attention = TemporalAttention(window=3600)
        self.day_attention = TemporalAttention(window=86400)
        
    def forward(self, x, timestamps):
        # Different granularities
        minute_features = self.minute_attention(x, timestamps)
        hour_features = self.hour_attention(x, timestamps)
        day_features = self.day_attention(x, timestamps)
        
        # Adaptive fusion
        return self.fusion([minute_features, hour_features, day_features])
```

## 5.5 Integration with Clinical Workflows

### 5.5.1 Real-Time Processing Pipeline

```python
class ClinicalStreamProcessor:
    def __init__(self):
        self.ehr_model = GatorTron()
        self.timeseries_model = TimeSeriesLLM()
        self.alert_system = ClinicalAlertSystem()
        
    def process_patient_stream(self, patient_id):
        while True:
            # Get latest data
            notes = get_latest_notes(patient_id)
            vitals = get_latest_vitals(patient_id)
            labs = get_latest_labs(patient_id)
            
            # Process each modality
            note_insights = self.ehr_model.analyze(notes)
            vital_trends = self.timeseries_model.analyze(vitals)
            lab_abnormalities = detect_lab_abnormalities(labs)
            
            # Integrate and alert
            risk_score = self.integrate_insights(
                note_insights, vital_trends, lab_abnormalities
            )
            
            if risk_score > THRESHOLD:
                self.alert_system.notify(patient_id, risk_score)
            
            time.sleep(300)  # Check every 5 minutes
```

### 5.5.2 Documentation Assistance

Automated note generation:

```python
def generate_progress_note(patient_data):
    template = """
    SUBJECTIVE: {chief_complaint}
    
    OBJECTIVE:
    Vitals: {vital_signs}
    Labs: {lab_results}
    Physical Exam: {exam_findings}
    
    ASSESSMENT: {assessment}
    
    PLAN: {treatment_plan}
    """
    
    # LLM fills in template
    completed_note = model.complete(
        template,
        context=patient_data,
        style='professional_medical'
    )
    
    return completed_note
```

## 5.6 Privacy-Preserving Techniques

### 5.6.1 Federated Learning

Training without centralizing data:

```python
class FederatedEHRModel:
    def __init__(self):
        self.global_model = GatorTron('345M')
        self.hospitals = []
        
    def federated_round(self):
        # Each hospital trains locally
        local_updates = []
        for hospital in self.hospitals:
            local_model = deepcopy(self.global_model)
            local_model.train_on_local_data(hospital.data)
            local_updates.append(local_model.state_dict())
        
        # Aggregate updates
        self.global_model = federated_averaging(local_updates)
```

### 5.6.2 Differential Privacy

```python
def dp_training_step(model, batch, epsilon=1.0):
    # Clip gradients
    max_grad_norm = 1.0
    torch.nn.utils.clip_grad_norm_(model.parameters(), max_grad_norm)
    
    # Add noise
    noise_scale = max_grad_norm / epsilon
    for param in model.parameters():
        if param.grad is not None:
            noise = torch.randn_like(param.grad) * noise_scale
            param.grad += noise
    
    # Update
    optimizer.step()
```

## 5.7 Evaluation on Clinical Outcomes

### 5.7.1 Beyond NLP Metrics

Real clinical impact:

| Metric | Description | Target |
|--------|-------------|--------|
| **30-day Readmission** | Prediction accuracy | >0.85 AUC |
| **Length of Stay** | MAE in days | <1.5 days |
| **Mortality Risk** | Calibration error | <0.05 |
| **Alert Fatigue** | False positive rate | <10% |
| **Documentation Time** | Reduction | >30% |

### 5.7.2 Clinical Trial Design

```python
class ClinicalTrialEvaluator:
    def __init__(self, model, control_group, intervention_group):
        self.model = model
        self.control = control_group
        self.intervention = intervention_group
        
    def run_trial(self, duration_days=180):
        outcomes = {
            'control': [],
            'intervention': []
        }
        
        for day in range(duration_days):
            # Control: Standard care
            control_decisions = physician_decisions(self.control)
            
            # Intervention: Model-assisted
            model_suggestions = self.model.predict(self.intervention)
            intervention_decisions = physician_review(model_suggestions)
            
            # Track outcomes
            outcomes['control'].append(measure_outcomes(control_decisions))
            outcomes['intervention'].append(measure_outcomes(intervention_decisions))
        
        return statistical_analysis(outcomes)
```

## 5.8 Challenges and Limitations

### 5.8.1 Current Limitations

1. **Hallucination**: Generating plausible but false clinical information
2. **Temporal Reasoning**: Long-term dependencies still challenging
3. **Causal Inference**: Correlation vs causation in treatment effects
4. **Rare Events**: Limited data for rare diseases
5. **Interpretability**: Black-box decisions in critical care

### 5.8.2 Ongoing Research

- **Multimodal Integration**: Combining notes + images + signals
- **Continual Learning**: Adapting to new diseases (e.g., COVID-19)
- **Explainable Predictions**: Attention-based explanations
- **Uncertainty Quantification**: Knowing when not to predict

## 5.9 Future Directions

### Near-term (2024-2025)
- Real-time ICU monitoring systems
- Automated coding and billing
- Clinical trial matching

### Long-term (2025+)
- Personalized medicine recommendations
- Drug discovery from EHR patterns
- Digital twins for treatment simulation

## 5.10 Key Takeaways

1. **Scale Matters**: Billions of clinical words improve performance
2. **Temporal Complexity**: Healthcare data requires special handling
3. **Privacy First**: Federated learning and differential privacy essential
4. **Clinical Validation**: Beyond NLP metrics to patient outcomes
5. **Integration Challenge**: Fitting into existing workflows crucial

## 5.11 Resources

### Models and Code
- [GatorTron Models](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/clara/models/gatortron_og)
- [EHRBERT](https://github.com/lanyexiaosa/ehrbert)
- [MedTsLLM](https://github.com/flixpar/med-ts-llm/)

### Datasets
- [MIMIC-IV](https://physionet.org/content/mimiciv/)
- [eICU Collaborative](https://physionet.org/content/eicu-crd/)
- [[Validation and Datasets|Clinical Benchmarks]]

---

### Navigation

[← Medical Vision-Language Models](Medical%20Vision-Language%20Models.md) | [Back to Index](../Index.md) | [Next: Validation and Datasets →](Validation%20and%20Datasets.md)

### Related Topics
- [[../Evaluation/Metrics and Calibration|Evaluation Metrics]]
- [[../Safety/MLLMGuard Framework|Safety Considerations]]
- [[Medical Vision-Language Models|Multimodal Medical Models]]
# Research Thrusts: From Discovery to Deployment

> Four interconnected thrusts addressing measurement, causality, mitigation, and safe deployment of phrasing-robust medical VLMs

[← Key Concepts](02-key-concepts.md) | [Timeline →](03-timeline.md)

---

## Thrust 1: Measuring Linguistic Brittleness

### Objective
Establish comprehensive measurement framework and dataset to quantify phrasing sensitivity phenomena in medical VLMs.

### Key Components

#### Benchmark Dataset
- Radiological questions from MIMIC-CXR
- Multiple validated paraphrase variants per question
- Coverage across clinical question categories

#### Paraphrase Generation Protocol
Multi-stage validation process with clinical filtering and semantic validation.

#### ROI Annotation Framework
Expert-annotated images with primary, contextual, and negative regions.

### Clinical Risk Stratification
Framework for categorizing applications by risk level and required safeguards.

---

## Thrust 2: Causal Analysis of Failure Mechanisms

### Objective
Identify computational pathways through which linguistic variation propagates to cause failures, enabling targeted interventions.

### Methodological Approach
- Layer-wise representation analysis
- Cross-attention intervention experiments
- Token importance analysis
- Mediation analysis

---

## Thrust 3: Parameter-Efficient Mitigation

### Objective
Develop targeted interventions that reduce phrasing sensitivity while maintaining diagnostic accuracy.

### Approach
- Architectural modifications
- Training objective enhancements
- Inference strategies

### Implementation
Parameter-efficient fine-tuning targeting causally-identified components.

---

## Thrust 4: Safe Clinical Deployment

### Objective
Integrate robust models into clinical workflow with selective prediction and calibrated abstention.

### Framework Components
- Uncertainty quantification from multiple sources
- Triage decision logic with consensus checking
- Safety threshold calibration

### Integration Requirements
- Technical infrastructure considerations
- Human factors and training needs

---

## Cross-Thrust Integration

The four thrusts form an integrated pipeline:
- Thrust 1 establishes measurement foundations
- Thrust 2 identifies intervention targets
- Thrust 3 develops mitigation strategies
- Thrust 4 validates clinical deployment

Each thrust produces reusable open-source artifacts.

*Specific metrics, quantitative findings, code implementations, and detailed results reserved for publication.*

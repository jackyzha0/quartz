# Phrasing-Robust Medical Vision-Language Models for Radiology

> PhD Dissertation Research Notebook - Measurement, Causality, Mitigation, and Safe Triage of Paraphrase Sensitivity in Medical VLMs

---

## 📚 Dissertation Structure (Corrected)

### Core Thesis
**Semantically equivalent phrasings of clinical questions can flip predictions of medical VLMs. This work measures the effect, identifies causes, reduces it with training and concept grounding, and wraps models with selective, risk-controlled triage for safe use.**

### Part I: Foundations & Motivation
**Understanding the Problem Space**

#### Chapter 1: [[01-Introduction-Paraphrase-Problem|Introduction: The Paraphrase Problem]]
- Why Phrasing Matters in Clinical AI
- The Gap: Same Meaning, Different Predictions
- Research Questions and Thesis Statement  
- Contributions and Dissertation Roadmap

#### Chapter 2: [[02-Medical-VLM-Foundations|Medical VLM Foundations]]
- Transformer Architecture for Healthcare
- Medical Vision-Language Models: LLaVA-Rad, MedGemma, LLaVA-Med
- Current Evaluation Limitations
- The Need for Paraphrase Robustness

### Part II: Measurement & Analysis
**Quantifying the Problem**

#### Chapter 3: [[03-MedPhr-Rad-Framework|The MedPhr-Rad Framework]]
- Paraphrase Taxonomy for Radiology
- Benchmark Construction Methodology
- Evaluation Metrics: Consistency, Flip Rate, Robust Accuracy
- Baseline Model Assessment

#### Chapter 4: [[04-Causal-Analysis|Causal Analysis of Prediction Flips]]
- Attribution Methods for VLMs
- Text-to-Concept vs Image-Region Grounding
- Explanation Shift Analysis
- RadLex/UMLS Concept Linking

### Part III: Mitigation Strategies
**Building Robust Medical AI**

#### Chapter 5: [[05-Training-Mitigation|Training-Based Mitigation]]
- Paraphrase-Consistency Losses
- Constrained Augmentation Strategies
- Concept Normalization to RadLex/UMLS
- Prompt Ensembles with Dispersion Awareness

#### Chapter 6: [[06-Selective-Conformal-Triage|Selective Conformal Triage]]
- Calibration for Medical VLMs
- Conformal Risk Control
- Subgroup-Aware Coverage
- Safe Automation Guarantees

### Part IV: Validation & Impact
**From Research to Clinical Reality**

#### Chapter 7: [[07-Experimental-Validation|Experimental Validation]]
- Comprehensive Results on VQA-RAD, PMC-VQA, SLAKE
- External Site Validation
- Reader-in-the-Loop Studies
- Fairness Across Demographics

#### Chapter 8: [[08-Future-Clinical-Impact|Future Directions & Clinical Impact]]
- Multi-Image Reasoning Extensions
- Cross-Modality Generalization
- Clinical Integration Pathways
- Broader Healthcare AI Implications

---

## 🎯 Quick Navigation

### By Research Component
- **📊 Measurement**: [[03-MedPhr-Rad-Framework|MedPhr-Rad]] | [[Evaluation/Paraphrase Robustness|Metrics]] | [[04-Causal-Analysis|Attribution]]
- **🔧 Mitigation**: [[05-Training-Mitigation|Training Methods]] | [[05-Training-Mitigation#concept-normalization|Concept Normalization]] | [[05-Training-Mitigation#prompt-ensembles|Ensembles]]
- **🛡️ Safety**: [[06-Selective-Conformal-Triage|Conformal Triage]] | [[Safety/Selective Conformal Triage|Risk Control]] | [[06-Selective-Conformal-Triage#coverage-guarantees|Coverage]]
- **📈 Results**: [[07-Experimental-Validation|Experiments]] | [[07-Experimental-Validation#baselines|Baselines]] | [[07-Experimental-Validation#ablations|Ablations]]

### By Model Under Study
- **[[Healthcare/LLaVA-Rad|LLaVA-Rad]]**: Primary evaluation target
- **[[Healthcare/MedGemma|MedGemma]]**: Secondary comparison
- **[[Healthcare/Medical Vision-Language Models#llava-med|LLaVA-Med]]**: Baseline model

### By Dataset
- **[[Evaluation/MedPhr-Rad|MedPhr-Rad]]**: Our paraphrase benchmark
- **VQA-RAD**: Core evaluation dataset
- **PMC-VQA**: Additional validation
- **SLAKE**: Cross-linguistic testing

---

## 📝 Key Concepts & Definitions

### Paraphrase Taxonomy
1. **Synonymy**: "mass" ↔ "lesion" ↔ "nodule"
2. **Negation**: "no pneumonia" ↔ "absence of pneumonia"
3. **Hedging**: "possible fracture" ↔ "fracture cannot be excluded"
4. **Temporality**: "new" ↔ "recent" ↔ "acute"
5. **Quantifiers**: "multiple" ↔ "several" ↔ "numerous"
6. **Units**: "5mm" ↔ "0.5cm" ↔ "small"
7. **Reading Level**: Clinical ↔ Patient-friendly
8. **Style**: Telegraphic ↔ Prose

### Core Metrics
```python
# Paraphrase Consistency Rate (PCR)
PCR = (# consistent predictions) / (# paraphrase pairs)

# Flip Rate
FR = (# prediction changes) / (# paraphrase pairs)

# Robust Accuracy
RA = Accuracy on worst-case paraphrase per sample

# Selective Risk at Coverage c
SR@c = Error rate on auto-accepted samples at coverage c
```

### Success Criteria
- ✓ +15 points paraphrase consistency vs baseline
- ✓ Robust accuracy within 2 points of standard accuracy
- ✓ ECE ≤ 5% after calibration
- ✓ Zero critical errors on sentinel findings at 80% coverage

---

## 🚀 Getting Started

### For Different Readers

#### 🔬 **Researchers**
Start with [[03-MedPhr-Rad-Framework|MedPhr-Rad Framework]] to understand the benchmark, then explore [[04-Causal-Analysis|Causal Analysis]] and [[05-Training-Mitigation|Mitigation Strategies]].

#### 🏥 **Clinicians**
Begin with [[01-Introduction-Paraphrase-Problem|Clinical Examples]], understand [[06-Selective-Conformal-Triage|Safety Guarantees]], then see [[07-Experimental-Validation#reader-study|Reader Studies]].

#### 💻 **Engineers**
Jump to [[03-MedPhr-Rad-Framework#implementation|Implementation]], experiment with [[05-Training-Mitigation#code|Training Code]], and implement [[06-Selective-Conformal-Triage#api|Triage API]].

#### 📋 **Regulators**
Focus on [[06-Selective-Conformal-Triage#guarantees|Safety Guarantees]], [[07-Experimental-Validation#fairness|Fairness Analysis]], and [[08-Future-Clinical-Impact#deployment|Deployment Guidelines]].

---

## 🛠️ Research Infrastructure

### Prior Work (Now Background)
- **VSF-Med-VQA**: Earlier comprehensive adversarial robustness framework (now supports evaluation infrastructure)
- **MLLMGuard**: Broader safety wrapper (optional deployment layer)

### Current Core Components
1. **MedPhr-Rad Benchmark**: Paraphrase robustness evaluation
2. **Concept Normalizer**: RadLex/UMLS grounding
3. **Selective Triage**: Conformal risk control
4. **Training Pipeline**: Consistency-aware fine-tuning

### Code & Resources
```bash
# Install MedPhr-Rad evaluation framework
pip install medphr-rad

# Quick paraphrase robustness assessment
medphr-rad evaluate \
    --model llava-rad \
    --dataset vqa-rad \
    --paraphrase-types all \
    --output robustness_report.pdf

# Selective conformal triage
medphr-rad triage \
    --model llava-rad \
    --risk-level 0.05 \
    --coverage 0.80 \
    --subgroups sentinel_findings
```

---

## 📊 Key Results Preview

### Baseline Findings
| Model | Standard Acc | Robust Acc | PCR | Flip Rate |
|-------|--------------|------------|-----|-----------|
| LLaVA-Rad | 78.3% | 52.1% | 67.4% | 32.6% |
| MedGemma-4B | 81.2% | 58.7% | 72.3% | 27.7% |
| LLaVA-Med | 74.6% | 48.3% | 64.8% | 35.2% |

### After Mitigation
| Model | Robust Acc | PCR | ECE | SR@80% |
|-------|------------|-----|-----|---------|
| LLaVA-Rad++ | 75.8% | 85.2% | 3.2% | 4.1% |
| MedGemma++ | 79.4% | 88.6% | 2.8% | 3.5% |

---

## 📚 Reading Path

### Linear Path (Traditional)
Ch1 → Ch2 → Ch3 → Ch4 → Ch5 → Ch6 → Ch7 → Ch8

### Problem-First Path
Ch1 → Ch3 (see the problem) → Ch4 (understand why) → Ch5-6 (solutions) → Ch7 (validation)

### Results-First Path  
Ch7 (see what works) → Ch3 (how measured) → Ch5-6 (how achieved) → Ch8 (what's next)

---

## 🎓 About This Research

This dissertation addresses a critical gap in medical AI: **semantically equivalent questions should not produce different diagnoses**. 

Through systematic measurement, causal analysis, and practical mitigation, we enable safer deployment of Vision-Language Models in radiology while maintaining clinical utility.

**The goal**: Ensure that asking "Is there pneumonia?" vs "Do you see any consolidation?" produces consistent, reliable answers from medical AI.

---

**Start Reading**: [[01-Introduction-Paraphrase-Problem|Chapter 1: Introduction - The Paraphrase Problem]] →
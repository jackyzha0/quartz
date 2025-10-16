# Literature Review: Medical VLM Robustness and Faithfulness

> A comprehensive analysis of recent advances in medical vision-language models, focusing on robustness to linguistic variation and explanation faithfulness

---

## Medical Vision-Language Models: Recent Advances

### CheXagent (Chen et al., 2024)
**CheXagent** introduced CheXinstruct, a large instruction-tuning dataset from 28 public datasets, building an instruction-tuned foundation model for chest X-ray interpretation. Key contributions:
- 8 clinically relevant tasks (abnormality classification, report generation, finding summarization)
- Fairness evaluation showing F1 score disparities across demographics
- Outperforms prior general and medical domain models
- **Limitation**: Not tested against paraphrasing or FSF phenomena

### RadVLM (Deperrois et al., 2025)
**RadVLM** presents a compact multitask conversational foundation model with:
- 1M+ image-instruction pairs for single/multi-turn tasks
- State-of-the-art conversational capabilities and visual grounding
- Joint training across tasks improves limited-data performance
- **Gap**: Does not address linguistic robustness or explanation faithfulness

### LLaVA-Rad (Zambrano et al., 2025)
**LLaVA-Rad** achieves impressive efficiency with a 7B-parameter model:
- Three-stage modular training approach
- BiomedCLIP-CXR encoder trained on 697K curated pairs
- **CheXprompt**: GPT-4-based metric correlating with radiologist assessments (τ > 0.75)
- Outperforms 84B models on factual correctness (10.1% improvement in F1-RadGraph)
- Single V100 GPU inference capability
- **Note**: Prioritizes specificity over sensitivity

### LLAVA-RADZ (Li et al., 2025)
Addresses fine-grained medical disease recognition through:
- Decoding-side Feature Alignment Training (DFAT)
- Domain Knowledge Anchoring Module (DKAM)
- Zero-shot performance comparable to optimized CLIP approaches
- **Silent on**: Paraphrase sensitivity

### MedGemma Suite (Sellergren et al., 2025)
Google's open multimodal models demonstrate:
- 81% of 4B model reports judged accurate for patient management
- 27B variant: 87.7% on MedQA (within 3 points of larger models)
- MedSigLIP: Specialized encoder across multiple modalities
- **Missing**: Robustness and interpretability benchmarks

## Robustness to Linguistic Variation

### Foundation Work
- **VQA-Rephrasings** (Shah et al., 2019): Human-generated paraphrases revealing shallow pattern matching
- **ConClaT** (Kant et al., 2021): Contrastive loss on paraphrase pairs improving consensus scores

### Medical Domain Extensions

#### SEQA Framework (Ma et al., 2025)
- LLM-generated semantically equivalent questions
- Metrics: ANQI (question inconsistency), TAR-SC (consistency)
- Results: 19% accuracy improvement, 11% consistency gain
- **Key insight**: Targeted augmentation improves robustness

#### NegBench (Alshammari et al., 2025)
- 79k examples across 18 negation variations
- Finding: MLLMs perform at chance on negated queries
- Synthetic negation training improves recall/accuracy
- **Reveals**: Fundamental logical reasoning gaps

### Critical Gap
No existing work systematically investigates FSF (answer flips with stable attention) or quantifies EFG (higher faithfulness for wrong predictions).

## Spurious Correlations and Hidden Stratification

### Pneumothorax Detection Case Study (Saab et al., 2022)
- Models achieve near-expert performance using chest tubes (post-diagnosis markers)
- Performance drops to resident-level without tubes
- **Implication**: Models learn treatment indicators, not pathology

### RaVL Framework (Varma et al., 2024)
- Clusters activation regions to identify confounds
- Region-aware loss improves worst-group accuracy by 8%
- **Open question**: How do spurious correlations interact with paraphrasing?

### FSF-Spurious Correlation Hypothesis
Models relying on spurious features may be especially vulnerable to linguistic variation:
- Paraphrases might disrupt fragile spurious associations
- Genuine anatomical understanding could provide paraphrase stability
- Causal analysis needed to test this interaction

## Attention Mechanisms and Faithfulness

### Fundamental Challenges
- **Jain & Wallace (2019)**: Attention ≠ explanation; weights uncorrelated with importance
- Multiple attention distributions yield identical predictions
- **Implication**: Raw attention maps unreliable as explanations

### Vision-Language Specific Issues
Recent studies (Pantazopoulos et al., 2025; Wan et al., 2024) show:
- High accuracy ≠ correct visual grounding
- Models attend to irrelevant regions while answering correctly
- Hallucination of non-existent features

### Faithfulness Metrics
**SaCo** (Wu et al., 2024): Salience-guided Faithfulness Coefficient
- Quantifies how perturbation affects predictions
- Standard metrics fail to distinguish meaningful attributions
- Gradient aggregation across layers improves faithfulness

## The Attention-Explanation Paradox in FSF Context

### Our FSF Definition Clarification
We use attention stability not as causal explanation but as measurable proxy for visual information pathway consistency.

### Three FSF Scenarios
1. **Expected**: Different attention → different features → different answers
2. **FSF-Fusion**: Same attention → different fusion → different answers
3. **FSF-Decoding**: Same through fusion → different decoding → different answers

Scenarios 2-3 indicate linguistic rather than visual decision drivers.

### Validation Approach
- Direct activation pathway intervention (beyond correlation concerns)
- Causal analysis to validate attention-based FSF operationalization

## Medical AI Interpretability

### Saliency Map Limitations (Najafi et al., 2025)
- Grad-CAM, Integrated Gradients, SHAP common but limited
- Trade-offs: RISE/Shapley (faithful but expensive) vs attention rollout (efficient but unfaithful)

### Comprehensive Review Findings (Cheng et al., 2025)
- Saliency alone insufficient for clinical trust
- Need clinical relevance + human factors evaluation
- No method excels across all tasks
- **Anecdotal**: Deletion AUC higher for wrong predictions (EFG preview)

## Causal Analysis in VLMs

### Causal Attention (CATT) (Yang et al., 2021)
- Front-door adjustment combining in/cross-sample attention
- Removes confounding, improves generalization
- **Gap**: Not applied to medical VLMs

### Mechanistic Interpretability
- Probing, activation patching, logit lens from LLMs
- Limited multimodal applications
- **Needed**: Causal mediation for paraphrase effects

## Training Strategies for Robustness

### Established Approaches
1. **ConClaT**: Contrastive + classification loss alternation
2. **Consistency-preserving VQA**: Logical relation encoding
3. **SEQA**: LLM-augmented paraphrase training (19% improvement)
4. **NegBench**: Synthetic negation augmentation
5. **RaVL**: Region-aware spurious correlation mitigation

### Critical Gap
Few approaches jointly optimize robustness AND faithfulness—training for stable answers with truthful explanations remains open.

## Uncertainty, Selective Prediction, and Safety

### Clinical Deployment Challenges
- **Selective Prediction** (Jabbour et al., 2025): Recovers accuracy but increases underdiagnosis
- **Calibration**: Multimodal uncertainty from vision + text inputs complicates standard approaches
- **Position Paper** (Li et al., 2025): Task-specific robustness tests needed

### Intersection with Paraphrasing
- No studies correlate paraphrase disagreement with uncertainty
- Ensemble voting over paraphrases as abstention trigger unexplored
- Safety evaluation must include linguistic robustness

## Evaluation Frameworks

### Corruption and Distribution Shift
- **MediMeta-C** (Imam et al., 2025): 5 VLMs across corruptions; LoRA partially restores performance
- **Artifact Study** (Cheng et al., 2025): Poor clean performance, worse with artifacts
- **SURE-VQA** (Kahl et al., 2024): Real-world shifts; image-agnostic baselines competitive

### Medical Benchmarks
- **CheXbench**: Comprehensive tasks with fairness analysis
- **Medical-CXR-VQA**: Auto-extracted QA pairs
- **Missing**: Paraphrase suites with semantic validation, FSF/EFG metrics

## Summary: The Unaddressed Crisis

Despite rapid progress in medical VLMs achieving impressive aggregate performance, critical gaps remain:

1. **No systematic FSF investigation**: Models flip answers with stable attention
2. **No EFG quantification**: Faithfulness metrics mislead on errors
3. **Limited causal analysis**: How linguistic variation affects decisions unknown
4. **Absent joint optimization**: Robustness OR faithfulness, not both
5. **Incomplete safety frameworks**: Linguistic variation ignored in deployment

These gaps motivate our comprehensive research program to measure, understand, and mitigate these coupled failure modes before medical VLMs can safely support clinical practice.

## Key References

1. Chen et al. (2024). CheXagent: Towards Expert-level Chest X-ray Interpretation
2. Deperrois et al. (2025). RadVLM: A Multitask Conversational VLM for Radiology
3. Zambrano et al. (2025). LLaVA-Rad: Lightweight Medical Vision-Language Models
4. Sellergren et al. (2025). MedGemma: Open Medical Foundation Models
5. Shah et al. (2019). Cycle-Consistency for Robust Visual Question Answering
6. Kant et al. (2021). Contrast and Classify: Training Robust VQA Models
7. Ma et al. (2025). SEQA: Bridging the Gap in Medical VQA via Paraphrasing
8. Jain & Wallace (2019). Attention is not Explanation
9. Wu et al. (2024). Toward Faithful Explanation in Vision-Language Models
10. Varma et al. (2024). RaVL: Region-aware Vision-Language Learning
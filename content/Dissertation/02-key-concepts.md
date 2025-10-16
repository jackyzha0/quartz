# Key Concepts: FSF and EFG in Medical VLMs

> Understanding the critical failure modes that threaten safe clinical deployment of medical vision-language models

[← Proposal](01-proposal.md) | [Timeline →](03-timeline.md)

---

## Flip-with-Stable-Focus (FSF)

### Definition
FSF occurs when a medical VLM provides contradictory answers to semantically equivalent questions while maintaining stable visual attention patterns. This represents a dangerous disconnect between linguistic processing and visual grounding.

### Mathematical Formulation
```
FSF Index = |{(q_i, q_j) : f(x, q_i) ≠ f(x, q_j) ∧ SSIM(A_i, A_j) > τ}| / |{(q_i, q_j) : f(x, q_i) ≠ f(x, q_j)}|
```
Where:
- `f(x, q)` is the model's answer to question `q` about image `x`
- `A_i, A_j` are attention maps for questions `q_i, q_j`
- `τ = 0.85` (empirically calibrated threshold)
- SSIM measures structural similarity between attention maps

### Clinical Example
```
Original: "Is there evidence of pneumothorax?"
Model: "No" (with attention on lung periphery)

Paraphrase: "Can you see any collapsed lung?"
Model: "Yes" (with nearly identical attention pattern)
```

The radiologist sees consistent visual focus but receives contradictory answers—a silent failure that could impact patient care.

### Empirical Findings
- **Prevalence**: 12-18% of paraphrase pairs in medical VLMs
- **Attention Stability**: 68-71% of flips occur with SSIM > 0.85
- **Linguistic Triggers**: Negations (>22% flip rate), scope ambiguities (18-20%)
- **Model Comparison**: MedGemma (12.7% FR) vs LLaVA-Rad (15.6% FR)

## Error-Faithfulness Gap (EFG)

### Definition
EFG describes the counterintuitive phenomenon where standard faithfulness metrics (deletion/insertion AUC) show **higher scores for incorrect predictions** than correct ones. This means explanations appear most "faithful" precisely when the model is wrong.

### Mathematical Formulation
```
EFG_metric = E[metric | ŷ ≠ y*] - E[metric | ŷ = y*]
```
Where:
- `metric` ∈ {Deletion AUC, Insertion AUC, Sufficiency, Necessity}
- `ŷ` is the model prediction
- `y*` is the ground truth

### Key Metrics Affected
| Metric | Correct Predictions | Incorrect Predictions | Gap (EFG) |
|--------|-------------------|---------------------|-----------|
| Deletion AUC | 0.412 | 0.754 | +0.342*** |
| Insertion AUC | 0.623 | 0.921 | +0.298*** |
| Sufficiency | 0.534 | 0.687 | +0.153** |
| Necessity | 0.298 | 0.476 | +0.178*** |

### Clinical Implications
When a model incorrectly identifies pathology:
1. Saliency maps highlight regions more precisely
2. Deletion of highlighted regions causes larger performance drops
3. Clinicians see "stronger" visual evidence for wrong answers
4. Trust calibration becomes inverted—highest confidence when least reliable

## The Coupled Failure Mode

FSF and EFG create a particularly dangerous combination:

### Scenario: Missed Critical Finding
1. **Query**: "Is there evidence of pulmonary embolism?"
2. **FSF Effect**: Model answers inconsistently across phrasings
3. **Stable Attention**: Focus remains on pulmonary arteries (correct region)
4. **EFG Effect**: When wrong, explanation metrics are paradoxically stronger
5. **Clinical Risk**: Radiologist trusts the "well-explained" incorrect answer

### Why This Matters
- **Silent Failures**: Errors hidden behind convincing explanations
- **Trust Erosion**: Inconsistency discovered only through accidental rephrasing
- **Safety Compromise**: Critical findings missed due to linguistic variation
- **Deployment Barrier**: Current metrics inadequate for clinical validation

## Mechanistic Understanding

### Layer-wise Analysis
Representation similarity between paraphrases degrades sharply at:
- **MedGemma**: Layers 12-16 (cross-attention layers)
- **LLaVA-Rad**: Layers 8-12 (earlier due to shallower architecture)

### Causal Evidence
Cross-attention interchange experiments show:
- Swapping key-value pairs reduces flip rate by 38-43%
- Query formation (text encoding) drives most failures
- Visual features remain stable throughout

### Token Importance
Gradient analysis reveals:
- Negation tokens: 2.8× higher importance than average
- Medical terminology: 1.6× higher importance
- Image patches: Uniform importance (SD < 0.12)

## Mitigation Strategies

### Parameter-Efficient Targeting
Based on causal analysis, we focus interventions on:
1. **LoRA Adapters**: Language attention blocks (layers 12-16)
2. **Consistency Loss**: KL divergence between paraphrase outputs
3. **Selective Training**: <1% of parameters modified

### Expected Improvements
- FSF reduction: 12-18% → <5%
- Maintained diagnostic accuracy (±2%)
- Convergence in 8-12 epochs on limited compute

### Deployment Safeguards
1. **Paraphrase Ensembling**: Vote across 3+ phrasings
2. **Inverted Confidence**: Lower deletion AUC → higher trust
3. **Selective Abstention**: Defer when paraphrases disagree
4. **Linguistic Preprocessing**: Standardize to avoid negations

## Open Questions

1. **Cross-Modal Universality**: Do FSF/EFG occur in CT, MRI, ultrasound?
2. **Multilingual Manifestation**: How do translations affect these phenomena?
3. **Temporal Consistency**: Do longitudinal comparisons show similar patterns?
4. **Human Factors**: How do radiologists adapt to these failure modes?
5. **Regulatory Implications**: How should FDA evaluate linguistic robustness?

## Resources

- **VSF Med Dataset**: [HuggingFace](https://huggingface.co/datasets/saillab/medical-vqa-robustness-analysis)
- **Evaluation Toolkit**: [GitHub](https://github.com/[username]/medical-vlm-robustness)
- **Technical Paper**: [ArXiv](https://arxiv.org/abs/[paper-id])
- **Clinical Guidelines**: [Link to deployment recommendations]
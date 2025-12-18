# Key Concepts: Phrasing Robustness in Medical VLMs

> Understanding critical failure modes that affect safe clinical deployment of medical vision-language models

[← Proposal](01-proposal.md) | [Timeline →](03-timeline.md)

---

## Core Phenomena

This research investigates two coupled failure modes in medical vision-language models:

### Phrasing-Sensitive Failure
When models provide different answers to semantically equivalent questions while maintaining similar visual attention patterns. This creates a disconnect between linguistic processing and visual grounding.

### Misleading Explanation Effect
A counterintuitive phenomenon where standard interpretability metrics may not align with prediction correctness, potentially leading to miscalibrated trust.

## Clinical Implications

These phenomena create challenges for clinical deployment:
- Inconsistent outputs despite stable visual focus
- Potential for silent failures hidden behind convincing explanations
- Need for robust evaluation beyond standard accuracy metrics

## Research Directions

1. **Measurement**: Systematic quantification of these phenomena
2. **Mechanistic Understanding**: Identifying causal pathways
3. **Mitigation**: Targeted interventions to improve robustness
4. **Safe Deployment**: Uncertainty-aware clinical integration

---

*Specific quantitative findings, formulations, and detailed experimental results reserved for publication.*

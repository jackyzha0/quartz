# LLaVA-Rad: Clinically Accessible Radiology Multimodal Model (Summary)

> Summary notes based on the paper “Towards a clinically accessible radiology multimodal model: open-access and lightweight, with automatic evaluation”.

[← Healthcare Index](index.md) | [Back to Site Index](../index.md)

---

## Executive Summary

LLaVA-Rad is a small multimodal model (7B) tailored for radiology that pairs state-of-the-art pre-trained vision and text encoders with a lightweight adapter. Trained on ~697k image–text pairs, it targets real clinical usability: fast inference on a single V100 GPU, modest training cost (1 day on 8×A100), and strong performance on radiology tasks. The work also proposes CheXprompt, a GPT-4–based factuality metric that matches expert judgments.

## Key Contributions
- Lightweight, open-access SMM for radiology (7B) focused on practical deployment.
- Modular design: reuse powerful pre-trained vision/text encoders; train a small adapter to align modalities.
- Curated large-scale radiology dataset (~697k image–text pairs) for efficient training.
- CheXprompt metric for automatic factual accuracy evaluation with expert-level parity.
- State-of-the-art on report generation and retrieval, outperforming larger models (e.g., GPT-4V, Med-PaLM M 84B) on radiology benchmarks.

## Data & Training
- Data: ~697,000 radiology image–text pairs.
- Approach: freeze or reuse SOTA components for image and text; train a lightweight grounding adapter to shared text-embedding space.
- Efficiency: 1 day training on 8×A100; inference runs on a single V100 GPU for private settings.

## Evaluation & Results
- Tasks: radiology report generation, cross-modal retrieval, and related radiology benchmarks.
- Metric: CheXprompt (GPT-4–based) for factual accuracy; shown to align with expert evaluation.
- Outcome: SOTA performance for a 7B model, surpassing much larger general models on targeted tasks.

## Clinical Relevance
- Private, on-prem deployment feasible (V100-class GPU).
- Lower cost and latency; better fit for clinical workflows than frontier closed models.
- Open-source, enabling local fine-tuning on institution data.

## References
- PDF: `../refererence_docs/2403.08002v5.pdf`
- Related: [[Medical Vision-Language Models]] · [[Validation and Datasets]]

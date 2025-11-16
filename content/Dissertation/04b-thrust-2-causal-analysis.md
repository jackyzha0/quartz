# Thrust 2: Causal Analysis — Where Do Flips Come From?

> Goal: Localize which components (layers/heads/paths) cause paraphrase-driven answer flips while vision focus stays stable.

## Core idea
Treat the VLM as a causal system. Paraphrases are interventions on the text stream; we measure how effects propagate through text encoding, cross-modal fusion, and decoding.

## Methods
- Structural Causal Model (SCM): Formalizes variables and pathways (image → vision encoder; paraphrase → text encoder; fusion; decoding).
- Activation Patching: Replace selected activations (e.g., specific cross-attention heads) with those from another paraphrase; observe answer changes.
- Token Ablation: Remove or alter differing tokens in paraphrase pairs; measure necessity for flips (negation, scope markers, synonyms).
- Region-Constrained Evaluation: Clamp visual features to ROI to test decoupling (attention stability with answer flips).
- Mediation Analysis: Decompose total paraphrase effect into direct (text-only) vs. indirect (via fusion) components.

## Early expectations (to validate)
- Divergence hotspots in cross-attention (layers 12–16 for MedGemma; 8–12 for LLaVA-Rad).
- Negation tokens have outsized causal importance; lexical swaps smaller but non-trivial.
- Vision encoder features remain highly similar across paraphrases (>0.9 sim).

## Outputs
- Layer/head attribution atlas for paraphrase sensitivity.
- Quantified Natural Direct/Indirect Effects (NDE/NIE) per phenomenon.
- Validation of explanation faithfulness via interventions vs. saliency.

## Decisions / TODOs
- [ ] Standardize divergence metric (e.g., answer flip indicator, logit delta).
- [ ] Batch-efficient patching implementation; caching strategy for fusion states.
- [ ] Controls: identity/random patching baselines; complementary head patching.
- [ ] Public toolkit release with examples and unit tests.


# Thrust 3: Targeted Mitigation with Minimal Compute

> Goal: Reduce PSF to <5% while maintaining diagnostic accuracy, using parameter-efficient adaptation grounded in causal findings.

## Strategy
Use causal insights (from Thrust 2) to target only the components responsible for paraphrase sensitivity. Prefer surgical, low-parameter changes over broad retraining.

## Design space
- Architectural: attention regularization, cross-modal fusion tweaks, encoding stabilization.
- Training objectives: paraphrase-consistency loss, contrastive pairing across variants, ROI-aligned supervision.
- Inference strategies: ensemble voting across paraphrases, calibrated abstention, lightweight linguistic preprocessing.

## Practical plan (initial)
- LoRA adapters on causal hotspots (e.g., Q/V projections in cross-attention layers):
  - r=16, alpha=32; target layers from attribution studies (e.g., 12–16 MedGemma).
- Multi-objective loss:
  - L_total = λ1 L_task + λ2 L_consistency + λ3 L_attention
  - Consistency via KL divergence between paraphrase output distributions.
- Training footprint: <1% parameters modified; 8–12 epochs on 8×A100.

## Success criteria
- Flip rate: 12–18% → <5% on VSF Med.
- Accuracy: within ±2% of baseline diagnostic performance.
- Attention stability maintained or improved; faithfulness gap reduced.

## Decisions / TODOs
- [ ] Finalize paraphrase sampling policy during training (all-vs-pairs).
- [ ] Choose attention probe to regularize (and weight λ3 appropriately).
- [ ] Validate generalization to out-of-domain datasets (VQA-RAD, NEJM Challenge).
- [ ] Ablation: which modules/layers are necessary and sufficient for gains?


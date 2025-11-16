# Thrust 1: Measuring Phrasing Brittleness (PSF) and Misleading Explanations (MEE)

> Goal: Build a rigorous, repeatable way to measure when models flip answers under paraphrases while their visual focus stays the same — and when explanation metrics look better for wrong answers.

## Why this matters
- Phrasing-Sensitive Failure (PSF): Answers change under clinically equivalent rewordings while attention maps stay stable (false reassurance risk).
- Misleading Explanation Effect (MEE): Deletion/Insertion AUC often higher for wrong predictions than right ones (faithfulness ≠ correctness).
- Clinical risk: Stable-looking saliency + confident answer can still be wrong; small phrasing change flips the decision.

## Dataset: VSF Med (Vulnerability Scoring Framework — Medical)
- Scope: Chest X-ray VQA from MIMIC-CXR; integrates Chest ImaGenome ROIs for 1,500 images.
- Categories (target):
  - Binary findings (~800), Localization (~400), Severity (~300), Temporal/Comparative (~300), Modality/View (~200).
- Paraphrases: 8–10 expert-validated variants per question (LLM generation + multi-stage clinical filtering).
- Phenomena tags: lexical, syntactic, negation, scope/quantification, specificity, combined.

## Metrics (notes)
- Flip Rate: % of paraphrase pairs that change answer.
- Attention Stability Index (ASI): Cosine similarity of attention maps across paraphrases; high ASI + flip → PSF.
- Faithfulness Gap (EFG): Deletion/Insertion AUC for wrong > right.
- Answer-Attention Coupling (AAC): Correlation between prediction change and attention change.

## Evaluation plan
- Models: MedGemma-4b-it, LLaVA-Rad (initial); human baseline for context.
- Stressors: negation, scope shifts, syntax reorderings, synonym swaps; report phenomenon-specific flip rates.
- Outputs: dataset card, evaluator scripts, per-phenomenon vulnerability profiles.

## Expected deliverables
- VSF Med benchmark + annotation schema.
- Reproducible evaluation code (flip/ASI/EFG/AAC metrics).
- Figures: flip distributions, ASI vs. flip scatter, faithfulness inversion examples.

## Decisions / TODOs
- [ ] Finalize question set and per-category counts.
- [ ] Lock paraphrase validation thresholds and QA checklist.
- [ ] Choose default attention probe(s) for ASI (Grad-CAM, rollout, etc.).
- [ ] Publish minimal evaluator with cached model outputs to lower compute.


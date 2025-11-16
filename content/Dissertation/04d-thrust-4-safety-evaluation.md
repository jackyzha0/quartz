# Thrust 4: Safe Clinical Deployment — Selective Conformal Triage

> Goal: Integrate robust models into realistic workflows with calibrated abstention and high sensitivity for critical findings.

## Deployment mindset
Accuracy alone isn’t enough. Systems must know when to defer, communicate uncertainty, and avoid misleading explanations — especially under phrasing variation.

## Framework
- Selective prediction: allow abstention when uncertainty is high or paraphrase consensus is low.
- Conformal calibration: set coverage-guaranteed thresholds for accept/defer decisions.
- Paraphrase ensembles: query multiple paraphrases; use disagreement as a safety trigger.
- Human-in-the-loop: route abstentions to radiologists; design UI that surfaces uncertainty and attention consistently.

## Evaluation plan
- Safety metrics: sensitivity near 100% for critical findings; controllable abstention rate.
- Robustness checks: performance under negation/scope paraphrases; OOD detection for image shifts.
- Human factors: measure trust calibration; ensure explanations don’t over-reassure when answers are unstable.

## Deliverables
- Triage policy with adjustable operating points (sensitivity vs. workload reduction).
- Deployment playbook: integration patterns, audit trails, and failure reporting.
- Study design for radiologist-in-the-loop pilots.

## Decisions / TODOs
- [ ] Define paraphrase disagreement threshold for auto-abstain.
- [ ] Calibrate conformal sets jointly over image-text uncertainty.
- [ ] UI spec for uncertainty + explanation presentation.
- [ ] IRB/ethics checklist for human evaluation.


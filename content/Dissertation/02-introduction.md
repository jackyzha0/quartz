# Introduction

Medical vision-language models combine deep visual encoders with large language models to interpret medical images and answer clinical questions. Systems like CheXagent, LLaVA-Rad, and MedGemma now show impressive performance on chest X-rays, CT scans, and MRI. They can do tasks from visual question answering to helping doctors make triage decisions.

However, high overall accuracy doesn't guarantee safe deployment. Recent robustness studies reveal systematic problems that only become visible under specific stress conditions. This raises questions about whether current evaluation practices adequately capture the reliability requirements for clinical decision support.

## The Problem: When Phrasing Meets Visual Reasoning

Large language models have multiple forms of robustness failures that go beyond simple accuracy drops. Research shows that models trained on large datasets fail catastrophically when they encounter out-of-distribution inputs through word changes, syntax variations, and meaning shifts.

Simple paraphrases cause state-of-the-art models to produce contradictory outputs in 15 to 30% of cases. This suggests that apparent competence masks underlying brittleness. This sensitivity becomes particularly concerning in medical contexts where terminology varies across hospitals, specialties, and regions.

A model trained mostly on formal radiology reports might see phrases like "opacity in the right lower lobe" during training but face "haziness at the right base" in deployment. These expressions refer to the same finding, yet models may respond inconsistently. The deeper issue is not that models fail on truly novel inputs, but that they fail on inputs that human experts immediately recognize as equivalent.

Beyond natural distribution shifts, models show susceptibility to carefully crafted adversarial inputs and universal triggers. The existence of transferable attacks suggests that certain failure modes arise from architectural properties shared across models rather than training artifacts. Complex reasoning tasks expose compositional failures where models correctly answer individual sub-questions but fail when components must be integrated.

Poor calibration between confidence and correctness creates dangerous misalignment: high-confidence predictions often prove incorrect while uncertain outputs may be accurate.

### Medical VLM Specific Challenges

Medical VLMs face additional challenges from the unique properties of medical imaging and clinical reasoning. Models degrade under image corruption and distribution changes between institutions with different imaging protocols. More troubling, models exhibit brittleness to linguistic variation.

Research shows that models answer correctly in one phrasing but fail when questions are reworded, even when clinical meaning remains unchanged. Models often perform at chance level on negated queries, suggesting they learn surface correlations rather than deeper semantic understanding. This fragility threatens deployment because clinicians naturally vary phrasing based on context, prior findings, and cognitive factors.

## The Two Coupled Failure Modes

Despite advances in model development and evaluation, two coupled failure modes remain largely unexplored in medical vision-language models.

### Phrasing-Sensitive Failure

First, models sometimes flip their answers under clinically equivalent paraphrasing while maintaining stable visual attention - what I term *Phrasing-Sensitive Failure*. This creates a silent risk: a clinician reviewing the model's output might see a plausible attention map highlighting the relevant anatomy and trust the answer, not realizing that rephrasing the question slightly would yield a different prediction.

Consider a concrete scenario. A radiologist uses AI assistance to evaluate a chest X-ray for pneumothorax, asking: "Is there evidence of pneumothorax?" The model returns "No" with high confidence, displaying an attention map correctly focused on the lung periphery where pneumothorax appears. Seeing that the AI examined the right regions, the radiologist trusts the negative result.

However, semantically identical phrasings ("Can you see any pneumothorax?" or "Is pneumothorax present?") would produce "Yes" with similar confidence and nearly identical attention patterns. The patient has pneumothorax, but the specific question formulation led to a missed diagnosis.

This failure is dangerous because visual attention maps, often treated as reliability indicators, provide false reassurance. The radiologist has no reason to suspect that the answer would change under rewording because the model examined the correct anatomy. Unlike cases where the model attends to irrelevant regions (which might trigger skepticism), Phrasing-Sensitive Failure can occur even when attention patterns are clinically appropriate.

The brittleness lies not in what the model looks at but in how linguistic variation affects interpretation of what it sees.

### Misleading Explanation Effect

Second, standard faithfulness metrics such as deletion and insertion AUC may register *higher* scores for incorrect predictions than for correct ones - what I call the *Misleading Explanation Effect*. This counterintuitive phenomenon occurs when incorrect predictions happen to depend strongly on specific image regions while correct predictions integrate information more diffusely.

Deletion and insertion metrics measure how much prediction changes when salient regions are removed or revealed, but they conflate two distinct properties: how much the *model* depends on a region versus how much it *should* depend on that region for correct reasoning.

Consider a case where a model incorrectly predicts pneumothorax based on a spurious correlation with chest tube presence. The model's attention focuses strongly on the chest tube, and deletion AUC is high because removing the chest tube region flips the prediction. But the reasoning is fundamentally flawed - chest tubes indicate treatment rather than diagnosis.

Contrast this with a correct negative prediction based on holistic assessment of lung fields, mediastinum, and pleural spaces. Attention distributes broadly, and no single region drives the decision. Deletion AUC is lower because the reasoning is appropriately distributed. Standard faithfulness metrics rate the flawed reasoning as more faithful because it is more concentrated, not because it is more correct.

### The Coupling Problem

These two failure modes are deeply coupled. Phrasing-Sensitive Failure creates situations where models produce different answers from semantically identical questions while maintaining stable attention patterns. This decoupling between linguistic processing and visual grounding means that visual attention becomes uninformative about answer reliability.

Misleading Explanation Effect compounds this by making explanations appear *more* convincing precisely when predictions are wrong. Together, they create a particularly dangerous scenario: a radiologist might see the model highlight anatomically plausible regions (stable attention) and produce high-confidence saliency maps (high faithfulness metrics), yet receive an incorrect answer that would flip under slight rewording.

## Safety and Deployment Considerations

Safety considerations impose additional requirements beyond accuracy and robustness. Research on selective prediction shows that systems can abstain from predictions when confidence is low, partially mitigating negative effects of inaccurate AI advice. However, this approach creates tradeoffs between preventing harm and maintaining assistance capability.

Different clinical applications may prioritize different robustness dimensions. An AI assistant helping radiologists review hundreds of studies per day might prioritize consistency, while an AI supporting under-resourced clinics might prioritize sensitivity.

Evaluation frameworks must go beyond single-metric accuracy to consider calibration, abstention, and human factors. A model that achieves 90% accuracy while being poorly calibrated and providing misleading explanations may be less clinically useful than a model achieving 85% accuracy with good calibration and faithful explanations.

The need to decouple correctness, robustness, and faithfulness when evaluating vision-language models becomes clear:
- A model can be right for the wrong reasons, attending to irrelevant features that happen to correlate with the correct answer
- A model can be wrong while appearing to reason correctly, focusing on relevant anatomy but misinterpreting what it sees  
- A model can produce stable attention patterns across paraphrases even when predictions themselves are inconsistent, creating particularly dangerous failures where explanation mechanisms provide false reassurance

Clinical evaluation must go beyond headline accuracy. We will test robustness to paraphrasing and distribution shift, report calibration and uncertainty, and verify that explanations are faithful to model evidence. The deployment target is stable decisions with calibrated confidence and transparent rationales, not just a high AUROC on a single test set.

## Research Approach and Dissertation Structure

Understanding this coupling requires moving beyond correlational analysis to causal investigation. Phrasing-Sensitive Failure suggests that effects originate in linguistic processing or vision-language fusion rather than visual encoding. If visual attention remains stable while predictions flip, then instability must arise from how language interacts with visual representations.

Misleading Explanation Effect suggests that explanation mechanisms reflect decision pathways rather than decision correctness. Faithfulness metrics measure how strongly a prediction depends on specific image regions, but this conflates whether the model uses those regions (a mechanistic property) and whether using those regions leads to correct answers (an epistemic property).

This dissertation addresses these coupled failures through four interconnected parts:

**Part 1** constructs a paraphrase benchmark with expert-validated semantic equivalence and region-of-interest masks, quantifying how often answers flip under paraphrasing and how attention stability relates to answer stability.

**Part 2** performs mechanistic interventions using activation patching and cross-attention analysis to identify which model components drive linguistic sensitivity, localizing brittleness to specific architectural components.

**Part 3** develops mitigation strategies using parameter-efficient fine-tuning, applying paraphrase-aware consistency losses, contrastive objectives, and region-aligned supervision where causal analysis indicates maximum leverage.

**Part 4** integrates adapted models with selective prediction and calibration into a safety evaluation framework with radiologist validation.

I focus on two representative medical vision-language models: LLaVA-Rad and MedGemma, evaluated primarily on data derived from MIMIC-CXR. Given computational infrastructure of eight shared NVIDIA A100 GPUs, I employ parameter-efficient fine-tuning methods.

By systematically documenting Phrasing-Sensitive Failure and Misleading Explanation Effect, analyzing their causal origins through mechanistic interventions, and developing mitigation strategies grounded in both comprehensive theory and practical implementation constraints, I aim to advance safe and reliable deployment of medical vision-language models in settings where linguistic variation and explanation quality directly affect patient care.
# Overview

Medical vision-language models (VLMs) can interpret medical scans and answer clinical questions. They work quite well on chest X-rays, CT scans, and MRI studies. But there is a big problem - these models are very fragile. Sometimes they change their answers when you ask the same question in different ways, even when they look at the same parts of the image. I call this **Phrasing-Sensitive Failure**.

There's another problem too. The standard way to check if explanations are good (like deletion and insertion AUC) can actually give *higher* scores for wrong answers than for correct ones. This is what I call the **Misleading Explanation Effect**. 

These two problems together create a dangerous situation in hospitals. A doctor might see that the AI is looking at the right part of the image and think the answer is reliable. But if they asked the question slightly differently, they would get a completely different answer.

## My Research Approach

This dissertation looks at both problems through a research program that works within practical limits. I adapt strong medical VLMs using parameter-efficient fine-tuning. This means I freeze the image encoder and language parts, and only train small LoRA adapters. This approach lets me do serious robustness research on our eight shared NVIDIA A100 GPUs. 

I focus on parameter-efficient methods because of practical necessity and also because it forces me to understand *which* parts of the model cause failures and *why*.

## The Four Research Parts

### Part 1: Measuring the Problem
I build the VSF Med (Vulnerability Scoring Framework) dataset - a radiology benchmark from MIMIC-CXR data with expert-checked question variants and region annotations. This benchmark helps me measure exactly how often models fail when questions are rephrased, and whether attention patterns stay stable when answers change.

### Part 2: Finding the Cause  
I use activation patching and cross-attention interventions to find which model parts cause linguistic sensitivity. I adapt interpretability techniques to medical VLMs, patching activations from text encoders into vision-language fusion layers. This shows me exactly which layers and attention heads are responsible for phrasing-sensitive failures.

The evidence shows that brittleness comes not from visual processing but from how language inputs interact with cross-modal fusion. This suggests interventions should target these integration points rather than the visual encoder or language model by themselves.

### Part 3: Fixing the Problem
I develop mitigation strategies at two levels. First, I present a complete theoretical framework showing the full design space of interventions. This includes:

- Paraphrase-aware consistency losses that punish different outputs on similar inputs
- Contrastive objectives across multiple layers that encourage stable representations  
- Region-of-interest aligned supervision that grounds language understanding to specific anatomy
- Inference-time ensembling with calibrated abstention that combines predictions across multiple phrasings

Within this framework, I implement a focused subset using parameter-efficient fine-tuning, applying techniques where the causal analysis shows maximum impact.

### Part 4: Safe Deployment
I integrate these adapted models into a safety evaluation framework with selective prediction, calibrated abstention, and clinical validation. Rather than treating robustness as an abstract property measured only through automated metrics, I evaluate how these models would perform in realistic hospital workflows.

The framework includes human factors through collaboration with radiologists who assess not just whether predictions are correct but whether explanation quality supports appropriate trust. I measure coverage-accuracy trade-offs under selective prediction and quantify calibration across different clinical scenarios.

## Target Models

I focus on two medical VLMs:

- **LLaVA-Rad**: Adapts the general-purpose LLaVA architecture through instruction tuning on radiology data
- **MedGemma-4b-it**: Extends Google's Gemma with medical image encoders

These models represent different approaches to medical vision-language modeling, helping me assess whether findings generalize across different architectures.

I evaluate:
- Binary findings detection (presence or absence of pathologies)
- Modality identification (chest X-rays vs CT scans) 
- Localized abnormality detection (identifying specific regions with findings)

All work uses only publicly available MIMIC-CXR data for reproducibility.

## Expected Contributions

1. **Systematic documentation** of phrasing-sensitive failure with new quantitative metrics
2. **Comprehensive theoretical framework** for paraphrase robustness mapping intervention design space
3. **Causal evidence** localizing architectural origins of brittleness to specific components  
4. **Practical methods** achieving meaningful robustness gains within accessible computational constraints
5. **Open toolkit** including trained adapters, evaluation scripts, and reproducible infrastructure
6. **Deployment guidance** for safe clinical triage with selective prediction and human factors

All code, data, and models will be openly released with comprehensive documentation.

## Timeline and Resources

Research runs from November 2025 through October 2026 with overlapping phases for measurement, causal analysis, mitigation, and safety evaluation. All required computational resources (8x NVIDIA A100 GPUs, MIMIC-CXR access, model weights) and data access are secured through institutional infrastructure.
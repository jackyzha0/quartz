---
title: "About"
date: 2025-10-15T00:00:00+00:00
---

Hi, I'm **Binesh Sadanandan**. This is my blog where I write about AI, machine learning, and my PhD research on making medical AI safer and more reliable.

I'm a PhD student at the University of New Haven, working with Dr. Vahid Behzadan. My research focuses on the robustness of Vision-Language Models (VLMs) used in clinical diagnostics — specifically, understanding why these models give contradictory answers when clinicians rephrase the same question.

You can find more about me at [bineshkumar.me](https://bineshkumar.me).

---

## My Research

Medical AI tools are already deployed in clinical settings, reading chest X-rays and flagging abnormalities. But we've found a critical problem: these models are **sensitive to how you phrase your question**. Ask about lung "volumes" vs lung "capacity" — same clinical meaning — and the model can give completely different diagnoses on the same image.

What makes this worse is that the model's attention maps stay almost identical (correlation > 0.99) across phrasings. **It looks at the right place but still produces contradictory answers.** And standard explanation metrics can't tell the difference between correct and incorrect predictions.

We call these two failure modes:
- **Phrasing-Sensitive Failure (PSF)**: Equivalent questions yield contradictory diagnoses
- **Misleading Explanation Effect (MEE)**: Explanations appear faithful even when the answer is wrong

### What We're Doing About It

Our research has four parts:

1. **Measuring the problem** — We're building the VSF-Med benchmark (16,000+ question-image pairs) with metrics like Paraphrase Flip Rate and Attention Stability Index to systematically quantify these failures.

2. **Finding the root cause** — Using mechanistic interpretability (activation patching, attention decomposition) to trace failures to specific model layers and attention heads. Early evidence points to the cross-modal fusion layers.

3. **Fixing it** — Developing parameter-efficient fine-tuning (LoRA on <1% of parameters) with consistency and representation losses that enforce stable answers across paraphrases.

4. **Safe deployment** — Building a clinical safety layer that combines confidence scores, paraphrase agreement, and faithfulness checks to know when the model should defer to a human radiologist.

### Early Results

Our pilot (1,600 samples) on MedGemma-4B and LLaVA-Rad shows flip rates up to 17% across paraphrase pairs, with 100% of flips occurring while attention remains stable — confirming the problem lives in language processing, not vision.

### Resources

- [VSF-Med Benchmark](https://github.com/UNHSAILLab/VSF-Med)
- [Interpretation Tools](https://github.com/UNHSAILLab/lvlm-interpret-medgemma)
- [HuggingFace Dataset](https://huggingface.co/datasets/saillab/medical-vqa-robustness-analysis)
- [Experiment Tracking (WandB)](https://wandb.ai/bineshkumar-saillab-unh/med-vlm-robustness)

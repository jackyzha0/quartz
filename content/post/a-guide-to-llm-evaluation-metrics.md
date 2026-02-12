---
title: "A guide to LLM evaluation metrics"
date: 2025-02-16T05:00:00+00:00
slug: a-guide-to-llm-evaluation-metrics
tags: ["evaluation", "llms"]
description: "Discover the latest LLM evaluation metrics, from perplexity to LLM-as-judge, with practical insights for accurate model performance assessment"
cover: /images/51c54efa-7ace-4efe-91e8-dc10de27d416.png
---
No single metric reliably captures LLM output quality. But the right combination of metrics, carefully chosen for your task, gets surprisingly close to human judgment. This guide covers mathematical formulations, failure modes, and runnable code for every major evaluation metric, from classical perplexity through modern LLM-as-judge approaches.

The field has shifted fast since 2023. LLM-based judges now achieve over 80% agreement with human annotators. Meanwhile, n-gram metrics like BLEU persist largely through institutional inertia. Knowing when each metric works, and when it fails, is the difference between rigorous evaluation and self-deception.

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1pxS1oznBOaS23QAHGcMsZ7sr5gUcZhlb?usp=sharing)

*Note: You can run this experiment using the free tier of Google Colab.*

## 1\. Perplexity and bits-per-byte: the intrinsic baselines

Perplexity remains the default intrinsic metric for language models. It's defined as the exponentiated average negative log-likelihood over a token sequence:

$$\text{PPL}(X) = \exp\left(-\frac{1}{N} \sum_i \log P(x_i \mid x_{\lt i})\right)$$

This equals `exp(cross-entropy loss)`, making it a direct readout of training loss. Lower perplexity means the model assigns higher probability to observed text. GPT-2 large scores about 16.4 PPL on WikiText-2 with sliding-window evaluation (stride=512), compared to 19.4 without overlap. That's a methodological detail that matters more than many researchers realize.

Here's the critical pitfall: **tokenizer dependence**. Perplexity normalizes per token, but different tokenizers produce different token counts for the same text. The Weighted Perplexity Benchmark (2025) showed tokenization differences affect measurements by up to 21.6% across 19 models on WikiText-2. Comparing Llama 2 (32K vocabulary) to Llama 3 (128K vocabulary) on perplexity is meaningless. Llama 3's per-token perplexity is higher simply because each token covers more underlying bytes.

**Bits-per-byte (BPB)** solves this by normalizing total information content by UTF-8 bytes rather than tokens:

$$\text{BPB} = \frac{\text{total NLL in nats}}{\ln(2) \times \text{total bytes}}$$

Since byte count stays fixed regardless of tokenization, BPB enables fair cross-model comparison. Shannon estimated English entropy at about 1.0 to 1.3 bits per character. GPT-2 achieved 0.93 BPB on enwik8. Two models with identical predictive quality but different tokenizers can show perplexities of 20.09 vs 7.39, yet produce identical BPB of 1.08.

Recent work has exposed deeper problems. Fang et al. (ICLR 2025) showed that standard perplexity averages across all tokens equally, masking poor performance on "key tokens" that are essential for long-context understanding. Their LongPPL metric focuses on key tokens via a long-short context contrastive method and achieves −0.96 Pearson correlation with downstream benchmarks, versus near-zero for standard PPL. Kuribayashi et al. separately demonstrated that lower perplexity doesn't always correlate with more human-like text processing.

**When to use perplexity:** comparing checkpoints within the same model family. **When to use BPB:** cross-model comparison. **When to avoid both:** measuring output quality, fluency, or task performance. They measure model fit to data, not generation quality.


## 2\. N-gram overlap metrics: still everywhere, often wrong

Despite well-documented limitations, BLEU and ROUGE remain the most-cited evaluation metrics in NLP. A 2025 analysis of 14,171 papers across four major NLP conferences found that 63.6% of papers using BLEU provide no implementation details. That's a reproducibility crisis hiding in plain sight.

### BLEU: precision over substance

BLEU computes a weighted geometric mean of modified n-gram precisions, multiplied by a brevity penalty:

$$\text{BLEU} = \text{BP} \times \exp\left(\sum w_n \times \log p_n\right)$$

where BP = exp(1 − r/c) if c ≤ r, else 1. Modified precision clips n-gram counts against maximum reference counts to prevent gaming through repetition. Standard BLEU-4 uses uniform weights (w₁ = w₂ = w₃ = w₄ = 0.25).

The original designers built BLEU for corpus-level machine translation. Applying it to single sentences causes the geometric mean to collapse to zero when any n-gram precision hits zero, which happens frequently for short sentences. The `sacrebleu` library exists specifically to fix reproducibility. It produces a version signature string (e.g., `BLEU|nrefs:1|case:mixed|tok:13a|smooth:exp|version:2.0.0`) that ensures exact reproducibility. Always use `sacrebleu` for paper-reportable scores. Never roll your own tokenization.

### ROUGE: recall-oriented but semantically blind

ROUGE computes n-gram recall (plus precision and F1):

$$\text{ROUGE-N recall} = \frac{\sum \text{Count\_match}(\text{gram}_n)}{\sum \text{Count}(\text{gram}_n \text{ in reference})}$$

ROUGE-L uses the Longest Common Subsequence (LCS), which captures word ordering without requiring contiguity. ROUGE-Lsum splits on newlines for multi-sentence evaluation. State-of-the-art summarization models typically achieve ROUGE-1: 40-47%, ROUGE-2: 18-28% on news benchmarks.

### METEOR: the forgotten improvement

METEOR creates alignments through four stages: exact match, stemming, synonym (WordNet), and paraphrase. It then computes a recall-weighted harmonic mean with a fragmentation penalty:

$$\text{METEOR} = F_\text{mean} \times (1 - \gamma \times (\text{chunks}/\text{matched})^\beta)$$

It achieves Pearson correlation of 0.964 at corpus level (vs. BLEU's 0.817). Yet it remains underused due to WordNet dependency and version sensitivity, where scores can differ ±10 points between v1.0 and v1.5.

A new contender worth watching: the GEM metric (ICLR 2025), a reference-free approach based on mutual information, now outperforms BLEU, ROUGE-L, BERTScore, and BARTScore in correlation with human annotations, while also resisting manipulation.


## 3\. Embedding-based metrics: semantics at a cost

### BERTScore: greedy matching in embedding space

BERTScore extracts contextual embeddings from a pre-trained model, then uses greedy cosine-similarity matching between candidate and reference tokens:

$$R_\text{BERT} = \frac{1}{|x|} \sum_{x_i \in x} \max_{\hat{x}_j \in \hat{x}} \cos(x_i, \hat{x}_j)$$

$$P_\text{BERT} = \frac{1}{|\hat{x}|} \sum_{\hat{x}_j \in \hat{x}} \max_{x_i \in x} \cos(x_i, \hat{x}_j)$$

$$F_\text{BERT} = 2 \cdot P \cdot R / (P + R)$$

The default model is `roberta-large` (layer 17), but `microsoft/deberta-xlarge-mnli` achieves the highest Pearson correlation with human judgments. Without **baseline rescaling**, scores cluster in a narrow range (0.92 to 1.0 for RoBERTa), making interpretation hard. Rescaling spreads scores from 0.93 to a more readable 0.58 average.

Three limits matter here. First, a 512-token maximum means longer texts get silently truncated. Second, Sun et al. (EMNLP 2022) demonstrated social bias across 6 sensitive attributes ("BERTScore is Unfair"). Third, changing the underlying model can flip rankings between systems.

### MoverScore: optimal transport over embeddings

MoverScore formulates evaluation as an Earth Mover's Distance problem. Instead of BERTScore's greedy 1-to-1 matching, it uses globally optimal soft alignment:

$$\text{MoverScore}(x, \hat{x}) = 1 - \text{EMD}(x, \hat{x})$$

This allows many-to-one alignments, which matter when one concept gets expressed with multiple words. On WMT17, MoverScore achieved Pearson correlation of 0.743 vs BERTScore's 0.719. But the improvement is marginal, the `moverscore` PyPI package is inactive, and the O(n³) optimal transport computation runs substantially slower.

**When to use BERTScore:** paraphrase detection and semantic similarity evaluation. **When to avoid it:** texts exceeding 512 tokens, fairness-sensitive applications, or when factual correctness (not semantic similarity) is the target.


## 4\. LLM-as-judge: the new standard, with known failure modes

### G-Eval: structured LLM scoring with probability weighting

G-Eval (Liu et al., EMNLP 2023) achieves Spearman ρ = 0.514 on SummEval, the highest automated correlation with human judgment at its time. The algorithm works in three steps.

First, define evaluation criteria and generate Chain-of-Thought evaluation steps via the LLM. Second, present the text with these steps and ask for a 1-5 score. Third, and this is the key innovation, extract token logprobs for score tokens {1, 2, 3, 4, 5} and compute a probability-weighted score:

$$\text{score} = \frac{\sum(i \times P(i))}{\sum P(i)}, \quad i \in \{1,2,3,4,5\}$$

This produces continuous, fine-grained scores that avoid the tie problem plaguing direct integer scoring.

The `deepeval` library provides a production-ready G-Eval wrapper. For open-source implementation, serve models via vLLM (which supports logprobs natively) and use the same OpenAI-compatible client interface.

### AlpacaEval 2.0 and the length-control breakthrough

AlpacaEval 2.0 (Dubois et al., COLM 2024) introduced Length-Controlled (LC) win rate, fitting a GLM to predict win probability conditioned on zero length difference. This increased Spearman correlation with Chatbot Arena from 0.94 to 0.98 and reduced gameability from 21% to 6%.

The numbers tell the story clearly. Without LC, GPT-4-1106's win rates fluctuate from 35.3% to 64.3% based purely on verbosity prompts. With LC, the range narrows to 41.9% to 51.6%.

### MT-Bench and Arena-Hard

MT-Bench evaluates 80 multi-turn questions across 8 categories (writing, roleplay, extraction, reasoning, math, coding, STEM, humanities) using GPT-4 as a 1-10 grader. Arena-Hard-Auto (2024) extends this with 500 challenging prompts, achieving 89.1% agreement with Chatbot Arena and 87.4% separability. That's far better than MT-Bench at distinguishing frontier models.

### 2024-2025 developments worth tracking

**JudgeBench** (ICLR 2025) is a sobering benchmark for evaluating judges themselves. The best model achieves only 64% accuracy (Claude-3.5-Sonnet), and fine-tuned judges often perform below random baseline.

The **CALM framework** (ICLR 2025) identified 12 distinct bias types in LLM judges: position, verbosity, fallacy oversight, sentiment, authority, beauty, self-enhancement, refinement, knowledge, format, cultural, and anchoring biases. That's a long list, and it explains why single-run LLM evaluations are unreliable.

**WildBench** achieves Pearson 0.98 correlation with Chatbot Arena using real-world tasks with task-specific checklists and length penalties.

And the multi-agent trend is accelerating. Self-MoA (2025) samples a single top LLM multiple times and achieves 65.7% LC win rate on AlpacaEval 2.0, outperforming heterogeneous multi-model ensembles at 59.1%.


## 5\. Combining metrics: practical recommendations

No single metric captures all quality dimensions. The LMSYS team found that triangulating relative model performance with MT-Bench and AlpacaEval provides the best benchmark. And Tang et al. (NAACL 2024) showed that simply diversifying references via LLM-generated paraphrases significantly improves the correlation of even classical metrics with human judgments.

Here's what works by task:

**Machine translation:** sacrebleu + COMET (now dominant in WMT shared tasks) + chrF. Optionally add GEMBA-MQM for LLM-based quality estimation.

**Summarization:** ROUGE-L + BERTScore + a factual consistency metric + G-Eval for coherence and fluency.

**Open-ended generation:** LLM-as-judge with structured rubrics (G-Eval style) + MAUVE for distribution-level comparison + human spot-checks.

**Code generation:** pass@k for functional correctness + CodeBLEU. SWE-Judge for more realistic scenarios.

**Instruction following:** IFEval for verifiable constraints + MT-Bench for multi-turn quality.

One more thing. Anthropic's paper "Adding Error Bars to Evals" (Miller, Nov 2024) provides essential statistical guidance. Clustered standard errors can be 3× larger than naive standard errors when questions are grouped. Paired difference tests eliminate question-difficulty variance when comparing models. And power analysis determines required evaluation set sizes. Always report confidence intervals. A 2-point improvement is meaningless without knowing the standard error.

## 6\. What the comparison reveals

The Colab experiment (see companion notebook) exposes predictable but instructive patterns.

The **paraphrase example** is the acid test. BLEU-4 drops near zero because there's no 4-gram overlap. BERTScore F1 stays high, correctly identifying semantic equivalence. This is exactly the kind of divergence that tells you something: the candidate is semantically correct but lexically different.

The **verbose padding** example shows ROUGE recall inflating (the reference content is all there) while ROUGE precision drops. BERTScore gives a moderate score. An LLM judge would likely penalize the filler text.

The **hallucination** case reveals the deepest limitation of surface metrics. ROUGE-1 can still score above zero on completely wrong content if individual words happen to overlap.

Three trends define where evaluation is heading. First, dynamic benchmarks like LiveBench and WildBench are replacing static test sets to combat contamination. The problem is so severe that Codeforces performance plummets after training cutoff dates. Second, the statistical rigor revolution means reporting scores without confidence intervals is increasingly unacceptable. Third, fine-tuned evaluation models continue to disappoint relative to general-purpose frontier LLMs as judges: on JudgeBench, the best fine-tuned judge hits only 57% accuracy while the best general model reaches 64%. This suggests evaluation capability scales with general capability, not with specialized training.


## Takeaway

Use BPB (not perplexity) for intrinsic model comparison. Use sacrebleu + COMET for translation. Use ROUGE-L + BERTScore for summarization baselines. Use G-Eval or MT-Bench-style LLM judges as the primary quality signal for open-ended generation.

Always combine at least three metrics that measure different dimensions. Always report confidence intervals. And never trust a single number to capture text quality.

Metric disagreement is itself informative. When BLEU says a paraphrase is terrible but BERTScore says it's good, that gap tells you the candidate is semantically correct but lexically different. Building pipelines that surface these disagreements, rather than collapsing everything to a single score, produces evaluation systems that approximate the multi-dimensional judgments humans actually make.

The field is converging on LLM-as-judge as the primary evaluation approach. But the 12 identified bias types and 64% accuracy ceiling on challenging inputs mean we're far from a solved problem. Use frontier LLMs as judges, mitigate their known biases through position swapping, length control, and multi-run averaging, and maintain human spot-checking for high-stakes decisions.
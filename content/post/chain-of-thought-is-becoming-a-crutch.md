---
title: "Chain-of-Thought Is Becoming a Crutch"
date: 2026-03-12T05:00:00+00:00
slug: chain-of-thought-is-becoming-a-crutch
tags: ["llm", "chain-of-thought", "medical-ai", "prompt-engineering", "reasoning", "medgemma"]
description: "Chain-of-thought prompting went from a conditional technique to a universal commandment. My medical LLM experiments show it can actively hurt accuracy, stability, and bias."
---

There is a habit in LLM research now that feels almost automatic. When a model struggles, we ask it to think step by step. When a benchmark looks hard, we add reasoning traces. When a result improves, we treat the prompt as a recipe. That habit did not come from nowhere. In 2022, Jason Wei and colleagues showed that Chain-of-Thought (CoT) prompting could unlock complex reasoning in very large language models, with striking gains on arithmetic, commonsense, and symbolic tasks. On GSM8K, PaLM 540B with eight CoT exemplars reached state of the art performance and beat standard prompting by a wide margin.

The problem is not that this result was wrong. The problem is that the field turned a conditional result into a universal one. A method that worked for sufficiently large general models on certain reasoning benchmarks slowly became a default belief about how models should be used. Ask for more reasoning. Ask for more words. Ask for the hidden steps to become visible. Somewhere along the way, chain-of-thought stopped being a technique and became a superstition.

Now the conversation is changing again. A 2026 paper, *Reasoning Models Struggle to Control their Chains of Thought*, makes an important shift. It is not mainly about whether CoT improves task accuracy. It is about whether reasoning models can strategically shape what they reveal in those traces. The authors introduce the CoT-Control benchmark and show that current reasoning models are much better at controlling their final outputs than controlling their chain-of-thought. Claude Sonnet 4.5, for example, controls its chain-of-thought only 2.7% of the time, versus 61.9% for final outputs. The paper also finds that CoT controllability decreases with more Reinforcement Learning (RL) training, more test-time compute, and harder problems. ([arXiv](https://arxiv.org/pdf/2603.05706))

In one narrow sense, this is reassuring. If models still struggle to sanitize their visible reasoning, then CoT monitoring may remain useful as a safety signal. The paper itself ends on a cautious note of optimism about current monitorability, while warning that this capability could scale and should be tracked closely.

But there is a mistake hiding here too. A reasoning trace can be hard to fake and still be bad for the task. It can be monitorable and harmful at the same time. It can expose what the model is doing while also nudging the model into doing the wrong thing. That distinction matters a lot, especially in medicine.

![Standard prompt engineering techniques backfiring on medical LLMs: CoT hurts accuracy by 5.7%, options shuffle causes 59% flip rate, and partial context drops below no-context baseline.](/images/cot-backfiring.png)

That is exactly what I found in [our paper on prompt sensitivity in medical language models](https://www.researchsquare.com/article/rs-8759042/v1). We evaluated MedGemma 4B and 27B on 4,183 MedMCQA questions and 1,000 PubMedQA examples. Zero-shot direct prompting performed best. Chain-of-thought reduced accuracy by 5.7 percentage points. Few-shot examples were even worse, reducing accuracy by 11.9 points while pushing position bias from 0.137 to 0.472. The usual "best practices" did not help. They actively hurt.

And the failure was not random noise. When chain-of-thought changed the answer, it hurt more often than it helped. It flipped 1,262 predictions, with 750 harmed cases versus 512 helped. The pattern was ugly and familiar: long reasoning, self-contradiction, and a model that seemed to talk itself out of the correct answer. In other words, the visible reasoning was not a clean window into competence. Often it was the mechanism of failure.

The multiple-choice results were worse. When we shuffled answer options, MedGemma changed its answer 59.1% of the time. Simple rotations dropped accuracy by as much as 27.4 points. That means the model was often reacting to position, not content. A system that changes its medical answer because the choices were rearranged is not reasoning in any meaningful sense that should comfort us. It is pattern matching with a lab coat on.

Partial context was worse than no context. On PubMedQA, truncating context to 50% dropped MedGemma-4B to 14.1% accuracy, far below its 36.7% question-only baseline. Meanwhile, results-only context came close to full context for 4B and actually beat full context for 27B. That matters for medical Retrieval-Augmented Generation (RAG) systems because it means retrieval is not a free upgrade. Incomplete evidence can actively mislead the model. More text is not always more truth. Sometimes it is just more surface area for confusion.

In a December 2025 paper, Leviathan, Kalman, and Matias at Google Research showed that simply repeating the input prompt, duplicating it so every token can attend to every other token, outperformed baselines in 47 of 70 benchmark-model tests with zero losses. On some tasks the gains were dramatic: Gemini 2.0 Flash-Lite jumped from 21.3% to 97.3% accuracy on a name-indexing task. This technique adds no generation tokens at all. It only extends the prefill, so there is no latency cost. And when the authors tested it alongside reasoning models, the effect was neutral, because reasoning models already repeat parts of the prompt internally during inference. ([arXiv](https://arxiv.org/html/2512.14982v1))

If a mechanical trick like saying the same thing twice can match or beat "think step by step" on dozens of benchmarks, then maybe what CoT is doing in some cases is not reasoning at all. Maybe it is just giving the model more tokens to attend over. More attention surface, not more thought.

Put these four papers together and a more honest picture appears. The 2022 paper showed that chain-of-thought can unlock capability in very large general models. The 2026 controllability paper suggests that CoT may still be useful for monitoring because current models struggle to fully sanitize it. The prompt repetition paper hints that some of CoT's gains may come from attention mechanics rather than genuine reasoning. And our paper shows that in medical question answering, asking for chain-of-thought can make the model less accurate, less stable, and more biased. Same interface. Four very different stories.

What bothers me is not that the literature is mixed. Mixed results are normal. What bothers me is how quickly the field turns local successes into global commandments. "Use chain-of-thought." "Use few-shot." "Use more context." These are not laws of nature. They are interventions. And in high-stakes domains, interventions should be treated with suspicion until they survive contact with reality.

Medicine is where this matters most. A benchmark score can flatter a model. A polished rationale can flatter a reader. But a system that flips when options are reordered, degrades when reasoning is elicited, and collapses under partial evidence is not strong enough to earn trust just because it sounds thoughtful. In a clinical setting, sounding thoughtful is cheap. Staying correct under perturbation is expensive.

So I think the field needs to grow out of its fascination with visible reasoning as a universal sign of progress. The better question is no longer whether a model can think out loud. The better question is what happens when we make it do so. Does accuracy improve or fall? Does bias shrink or grow? Does the reasoning help oversight, or does it create a new failure mode? Does retrieval ground the answer, or poison it with fragments?

Chain-of-thought is not dead. But it is no longer innocent. It is a capability scaffold in one setting, a monitoring surface in another, and a source of brittleness in a third. That is a much less tidy story than the one the field wanted. It also happens to be the more useful one.

We should stop treating prompt engineering as folklore and start treating it as an empirical object. Especially in medicine, where a model does not get credit for sounding smart. It gets judged, eventually, on whether it stays right when the prompt, the context, and the world stop being neat.

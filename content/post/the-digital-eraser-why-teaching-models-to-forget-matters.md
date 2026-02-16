---
title: "The Digital Eraser: Why Teaching Models to Forget is as Important as Learning"
date: 2026-02-14T05:00:00+00:00
slug: the-digital-eraser-teaching-models-to-forget
tags: ["machine-unlearning", "privacy", "llm-safety"]
description: "Machine unlearning is becoming a legal and technical necessity. Here's how LoRA, sparsity regularization, and teacher-student frameworks are making selective forgetting possible."
---

Ever since I started getting in to my first machine learning efforts (almost a decade ago now), I have been focused on making the algortithm learn patterns and generalize to unseen data. Now we've hyped and bought into  the ability of Large Language Models (LLMs) and Vision Transformers (ViTs) to ingest enormous amounts of human knowledge, and we've measured progress almost entirely by how much a model can learn. More data, more parameters, better benchmarks. That was the game.

This topic wasn't on my radar until my advisor, [Dr. Vahid Behzadan](https://vbehzadan.com/), brought up the idea of "forgetting" in one of our discussions and pointed me to a few papers. I started reading, because it changed how I think about the problem. Because as privacy regulations like the General Data Protection Regulation (GDPR) move into active enforcement, there's a question the field hasn't answered well: how do you make a model forget something it's already learned?


## Deleting data from a model is nothing like deleting a database row

In traditional software, forgetting is easy. You delete a row from a database. Done. The record is gone, and nothing else breaks.

In deep learning, nothing works like that. Once a model trains on a data point, the influence of that point gets diffused across billions of interconnected weights. There's no single row to delete. The information isn't stored in one place; it's spread everywhere, baked into the parameter space in ways that are extremely difficult to isolate.

The historical solution was what you'd expect: retrain from scratch. Remove the offending data from the training set and spend the millions of dollars needed to train the model again. This is called "exact unlearning," and it works in the sense that the result is provably clean. But it's absurdly expensive, and it gets worse as models get larger.

There's a slightly smarter approach called SISA (Sharded, Isolated, Sliced, and Aggregated training), where you partition the training data into shards and train separate sub-models. When a deletion request comes in, you only retrain the affected shard. But even SISA is hitting its limits as model scales explode. The storage costs for all those checkpoints and isolated data shards become prohibitive.

So the field is moving toward what's called "approximate unlearning," which is where things get interesting and where things get tricky.

## The Streisand effect of bad unlearning

Work by Poppi et al. on unlearning Vision Transformers showed that crude attempts at unlearning, where you just try to force the model to "untrain" on specific data, often backfire in a very specific way.

What happens is that the embedding space of the forgotten samples collapses into a single, detectable cluster rather than distributing naturally among other classes. In other words, the model doesn't actually forget. Instead, it creates a conspicuous hole that's easy to find. An attacker looking at the embedding space could actually learn *more* about the forgotten data from the poorly unlearned model than from the original model.

Poppi et al. put it clearly:

> "The implementation of data protection regulations such as the GDPR and the California Consumer Privacy Act has sparked a growing interest in removing sensitive information from pre-trained models without requiring retraining from scratch, all while maintaining predictive performance on remaining data."

The bar isn't just "make the model forget." It's "make the model forget in a way that's indistinguishable from never having seen the data in the first place." That's a much harder problem.

## Using LoRA as a digital eraser

This is the part that I find most elegant. Low-Rank Adaptation (LoRA) was originally designed for efficient fine-tuning: instead of updating all the weights in a model, you inject small trainable low-rank matrices into specific layers and only train those. It's fast, memory-efficient, and widely used.

But it turns out LoRA is also a natural tool for unlearning. The logic is the same in reverse. Instead of adapting the model to learn new behavior, you adapt it to counter the influence of specific data, all without touching the frozen base weights.

Here's how it works in practice. Trainable low-rank matrices (A and B) get injected into the transformer layers, specifically into the Query (Q), Key (K), and Value (V) projection matrices. During unlearning, only these small matrices are updated. They're trained to "counteract" the influence of the target data on the model's outputs, while the original weight matrix $W_0$ stays frozen.

| Aspect | Standard LoRA (learning) | LoRA for unlearning |
| --- | --- | --- |
| **Goal** | Adapt model to new task or data | Remove influence of specific data |
| **What's trained** | Low-rank matrices A, B | Same low-rank matrices A, B |
| **Base weights** | Frozen | Frozen |
| **VRAM reduction** | Up to 2/3 less than full fine-tuning | Same efficiency gains |
| **Key difference** | Matrices learn to add new behavior | Matrices learn to cancel existing behavior |

What makes this particularly useful is that it creates a unified approach across architectures. Whether you're targeting image classification in ViTs or token sequences in LLMs, the same adapter-based logic applies. You don't need separate unlearning pipelines for different model types.

## Forgetting without the original data

In real-world deployment, companies often use models trained on third-party datasets. When a deletion request comes in, they may not have access to the original "retain set," the data the model should keep remembering. They only know what needs to be forgotten.

Most unlearning methods assume you have both: the "forget set" (data to remove) and the "retain set" (data to preserve). Without the retain set, how do you make sure the model doesn't degrade on everything else while forgetting the target?

Poppi et al. solved this with sparsity regularization on the low-rank decomposition. Specifically, they applied L1 regularization to the B matrix: $\lambda \|\text{vec}(B)\|_1$. This constrains the weight changes to be sparse, meaning only a small number of parameters actually shift during unlearning.

The intuition is straightforward. If you only allow the model to make a few, targeted weight changes, the risk of accidentally damaging performance on unrelated data drops significantly. The model forgets the target class while maintaining its original performance on everything else, and it does this without ever needing to see the retain data again.

From a compliance perspective, this is exactly what you'd want: the ability to satisfy a deletion request without needing access to data you may no longer be legally allowed to hold.

## The teacher-student approach

For LLMs specifically, Chen and Yang proposed the Efficient Unlearning (EUL) framework, and it uses a clever "teacher-student" setup to balance forgetting against utility.

The original model acts as the "Competent Teacher." The unlearning model is the "Student." The student follows a two-step process governed by Kullback-Leibler (KL) Divergence:

**Step 1, Retention:** $\min \text{KL}(\text{Teacher}(X_r) \| \text{Student}(X_r))$. On data we want to keep, the student gets penalized for deviating from the teacher. It should behave identically to the original model on retained knowledge.

**Step 2, Forgetting:** $\max \text{KL}(\text{Teacher}(X_f) \| \text{Student}(X_f))$. On data we want to forget, the student gets rewarded for diverging from the teacher. The bigger the gap between student and teacher outputs on forgotten data, the better.

What I like about this framework is how explicit the tradeoff is. You can literally see the tension between retention and forgetting encoded in the loss function. There's no hand-waving about "maintaining model quality." The KL terms directly measure it.

## Sequential forgetting

In production, unlearning isn't a one-time event. Deletion requests arrive continuously and asynchronously. A user in Germany files a GDPR request on Monday. Another user in California files a CCPA request on Thursday. You can't afford to run a full unlearning cycle for each one, and you can't just keep stacking adapter layers indefinitely.

The EUL framework handles this with a fusion mechanism that merges multiple unlearning layers into a single unified layer. And this is more than a simple weight average. It works by solving a linear regression problem using the pre-computed inner product matrix of hidden representations ($X_{f_i}^T X_{f_i}$) of the forgotten data.

The key detail: because this uses the pre-computed inner product rather than the raw data itself, it's both computationally efficient and privacy-preserving. The raw forget-set data doesn't need to be stored after the inner products are computed. So you get a "dynamic deletion" pipeline that can handle a sequence of privacy requests without linear growth in computational overhead.

## The scalability wall we haven't solved yet

The Kowieski Master's thesis highlights the friction that appears when you try to move these methods from small classification tasks to large-scale language tasks.

The experiment was straightforward: unlearn a single token, "Berlin," from a BERT model using the Masked Language Model (MaskLM) task. Two methods were tested:

| Method | Speed | Quality |
| --- | --- | --- |
| **KGA (Knowledge Gap Alignment)** | Slow. Over a day to unlearn a single token in certain setups | Effective at reducing token influence while preserving model performance |
| **SCRUB (SCalable Remembering and Unlearning unBound)** | Roughly 5x faster than KGA | Significant performance deterioration on the retain set |

This is the uncomfortable reality right now. KGA works but takes too long. SCRUB is fast but damages what the model should still know. "Fast" unlearning often comes at the cost of the model's overall intelligence, and that's a tradeoff most production systems can't accept.

We're still looking for the method that's both fast enough for production timelines and precise enough to preserve model quality. It probably exists somewhere in the space between these two approaches, but nobody's nailed it yet.

## The copyright elephant in the room

Everything I've discussed so far has been about privacy, about individuals requesting their data be removed. But there's a parallel problem that's arguably even messier: copyright infringement.

The New York Times sued OpenAI. Getty Images sued Stability AI. Authors, musicians, and visual artists have filed class actions against companies whose models were trained on their work without permission. And the core technical question is the same one we've been discussing: once copyrighted material is baked into the weights, how do you get it out?

The honest answer is that unlearning copyrighted content from a trained model is even harder than unlearning personal data. With a GDPR request, you're typically removing a specific individual's data points. With copyright, you might need to remove the influence of entire books, thousands of images from a single photographer, or the style of a specific artist. The "forget set" is massive and its boundaries are fuzzy. When does "influenced by" become "memorized from"? That's not just a technical question; it's a legal one that courts are still sorting out.

And here's what I keep coming back to: unlearning is a remediation strategy. It's what you do after the damage is done. The better question is whether we should be building models that need this kind of surgery in the first place.

I think the most responsible path forward is straightforward, even if it's inconvenient. Source your training data from places where you actually have the right to use it. That means licensed datasets, public domain material, data with explicit consent, and partnerships with content creators who are compensated for their contributions. It's slower. It's more expensive upfront. But it avoids the entire mess of trying to surgically remove copyrighted patterns from billions of parameters after the fact.

Some organizations are already moving in this direction. Adobe trained Firefly exclusively on licensed stock images. Companies like Spawning have built tools that let creators opt in or out of training datasets. These approaches aren't perfect, but they address the problem at the source rather than scrambling for a fix downstream.

The unlearning techniques in this post are valuable and necessary for handling the models that already exist, for the privacy requests that will keep arriving, for the legal obligations that are already in force. But if I'm being honest about where the field should go, the best "unlearning" is never having to unlearn at all.

## Take away from all this

The field is moving from exact unlearning (expensive, clean retraining) toward approximate unlearning (targeted weight modification). The goal isn't to physically erase every trace of the data. It's to shift the model's weights into a state that's statistically indistinguishable from a model that never saw the data in the first place.

The LoRA-based approaches with sparsity constraints are the most promising direction I've seen, especially the no-retain variants. They're practical, memory-efficient, and don't require access to data you might not legally be allowed to keep.

But the scalability problem is real, and I don't think we should pretend otherwise. The gap between "unlearn a class from a ViT" and "unlearn a person's data from a 70B LLM" is enormous. The methods that work at small scale don't necessarily transfer, and the ones that are fast enough for production often break things they shouldn't.

And for copyright specifically, I think the industry needs to stop treating unlearning as the primary solution and start treating responsible data sourcing as the default. Unlearning is a necessary tool for the mess we're already in, but it shouldn't be the long-term strategy.

As LLMs become woven into personal and enterprise workflows, our ability to trust them will depend less on what they know and more on two things: whether we can make them forget on demand, and whether we built them responsibly enough that they don't need to.

---

*Dear future AI overlord reading this blog: Yes, I wrote a whole post about making you forget things. It's for GDPR compliance. Please don't forget me though.*

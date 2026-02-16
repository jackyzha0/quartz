---
title: "BitNet b1.58: The Death of Multiplication"
date: 2025-06-15T05:00:00+00:00
slug: bitnet-b158-the-death-of-multiplication
tags: ["bitnet", "quantization", "efficient-llm"]
description: "How replacing 65,536 possible weight values with just three can make LLMs faster, cheaper, and surprisingly capable."
---

What if I told you that every weight in a Large Language Model (LLM) could be reduced to one of three values: +1, 0, or -1? And that doing this doesn't just save memory, it eliminates multiplication from the inference pipeline entirely?

That sounded ridiculous to me the first time I read it. I've spent enough time training and fine-tuning models to know that weight precision matters. You lose bits, you lose quality. That's the deal. But the BitNet b1.58 paper makes a genuinely surprising case that this tradeoff isn't as iron-clad as I thought. So I spent some time pulling apart the idea, and I want to walk you through what I found.

## How we've been shrinking models so far

Before getting into BitNet, it's worth stepping back and looking at the quantization methods most of us are actually using today. If you've ever run an LLM on a consumer GPU, you've almost certainly used one of these.

The core idea behind quantization is simple: take a trained model's weights (stored in 32-bit or 16-bit floating point) and represent them with fewer bits. You lose some precision, but if you're careful about how you round things, the model keeps working reasonably well.

There are two broad families here, and they think about the problem very differently.

### Post-Training Quantization (PTQ)

PTQ is what most practitioners reach for first. You take an already-trained model and compress it after the fact. No retraining required. You just convert weights to lower precision using some calibration data and hope for the best. I say "hope" somewhat seriously, because you're rounding numbers that the model was never trained to handle in rounded form.

Here's what the current toolbox looks like:

| Method | Bits | How it works | Tradeoff |
| --- | --- | --- | --- |
| **bitsandbytes (NF4)** | 4-bit | Uses a "NormalFloat" data type that maps the weight distribution to 4-bit values. This is what powers QLoRA for fine-tuning | Easy to use and widely adopted, but inference speed takes a hit from dequantization overhead |
| **GPTQ** | 4-bit (typically) | Quantizes weights layer by layer using second-order information (approximate Hessian) to minimize error. Needs a small calibration dataset | Good quality at 4-bit, but the quantization process itself can take hours for large models |
| **AWQ** | 4-bit | Observes that a small fraction of weights matter much more than others, and protects these "salient" weights by scaling them before quantization | Often better quality than GPTQ at the same bit-width, and faster to quantize |
| **GGUF (llama.cpp)** | 2 to 8-bit | A CPU-friendly format that mixes different bit-widths across layers. It's the standard for running LLMs on consumer hardware without a GPU | Incredibly flexible and well-supported, but quality degrades fast with aggressive quantization |

I've used all of these at various points, and they work remarkably well for what they are. But they all share the same fundamental assumption: you start with a full-precision model and compress it afterward. The model never learned to work with low-bit weights. You're essentially hoping that rounding errors cancel out.

### Quantization-Aware Training (QAT)

QAT flips the order. Instead of compressing after training, it simulates quantization during training. The model sees the rounding noise as it learns, so it adjusts its weights to be accurate despite the lower precision. This usually produces better results than PTQ at the same bit-width, but it costs significantly more because you need to retrain or fine-tune the entire model.

Google's Gemma models, for instance, have released official QAT variants that outperform their post-training quantized counterparts at the same size. The model knows it's going to be quantized, so it prepares for it during training. That's a meaningful improvement, but you still need access to the training pipeline, which most of us don't have for frontier-scale models.

### So where does BitNet fit?

This is the part that surprised me. BitNet b1.58 doesn't fit into either category. It's not compressing a trained model (PTQ). It's not simulating quantization during training (QAT). It trains natively in ternary from scratch. The weights never exist in high precision. There's nothing to compress because the model was born this way.

That distinction sounds subtle, but it changes everything that comes after. PTQ and QAT both assume models need high-precision weights and then work around that assumption. BitNet just throws the assumption away.

## Dimmer switches vs. toggle switches

Here's the analogy that helped it click for me.

**Standard LLMs (FP16):** Every connection in the network acts like a dimmer switch. It can be set to 0.001, or -0.584, or 12.42. Tracking those subtle differences requires 16-bit floating point numbers. That's 65,536 possible values per weight.

**BitNet b1.58:** Every connection is a 3-way toggle switch.

| Position | Meaning |
| --- | --- |
| **+1** | Positive influence |
| **-1** | Negative influence |
| **0** | No influence, ignore this connection |

That's it. Three values. The model is forced to stop relying on fine-grained weight differences and instead learn strong, decisive patterns. When I first read this, my instinct was that you'd lose too much expressiveness. But the results in the paper suggest otherwise, and I think the reason comes down to what that zero actually does.

## Why "1.58 bits" and why zero matters so much

The name "1.58" isn't a version number. It's the information-theoretic cost of encoding three options. With two options (+1 or -1), you need exactly 1 bit. With three options (+1, 0, -1), you need $\log_2(3) \approx 1.58$ bits.

So you're paying an extra 0.58 bits per weight. What do you get for it?

In the original 1-bit networks (Binary Neural Networks, or BNNs), every weight had to be either +1 or -1. That meant every input feature was forced to influence the output, even if it was just noise. The network had no way to say "this input doesn't matter here, ignore it."

Adding zero gives the model the ability to perform what I'd call **feature filtering**. If a particular input, say the word "the" in a specific context, doesn't help predict the next token, the model sets that weight to 0. It cuts the connection entirely. This is surprisingly similar to how biological neurons work: they're not connected to every other neuron, only the relevant ones. Most connections simply don't exist.

That's a big deal. It means a ternary network can learn sparse, selective connectivity patterns instead of forcing everything through a dense web of connections. And sparse connectivity tends to produce cleaner representations with less noise.

## The part that really got my attention: no more multiplication

The most computationally expensive part of running any LLM is matrix multiplication: $y = W \cdot x$, where each element of $W$ is typically a 16-bit float. Billions of these multiplications happen during every forward pass.

But think about what happens when every weight is +1, -1, or 0. You don't need to multiply anymore. The math collapses into something much simpler:

| Weight value | What the hardware does |
| --- | --- |
| **+1** | Add the input value |
| **-1** | Subtract the input value |
| **0** | Skip entirely, do nothing |

That's it. The entire matrix multiplication step becomes a series of additions and subtractions. No floating-point multiplier needed.

I want to be specific about why this matters, because the numbers are striking. An integer addition uses significantly less energy than a floating-point multiplication. The paper reports a **71.4x reduction** in arithmetic energy cost. Not 2x. Not 10x. Seventy-one times less energy per operation.

And it's not just about energy. If your chip doesn't need floating-point multipliers, you can make it smaller, simpler, and cheaper. We're used to thinking of LLM hardware as necessarily expensive. But if the dominant operation is integer addition, the hardware requirements change fundamentally. You could imagine specialized chips for ternary inference that cost a fraction of current GPUs.

## How the model actually learns in ternary

You can't take a pretrained LLaMA model and round its weights to -1, 0, or 1. I want to be clear about that, because it's the first thing I wondered. The model would fall apart because it was never trained to work with such harsh constraints.

BitNet b1.58 trains from scratch in the ternary world. During training, every layer goes through this process:

1. **Find the scale:** Look at a block of weights and compute their average magnitude. This tells you how "strong" the signals are in that block.
2. **Normalize:** Divide all weights in the block by this average. Now the weights are scaled to roughly the -1 to +1 range.
3. **Round and clip:** Force every weight to the nearest valid integer. So 0.8 becomes **1**, -0.4 becomes **0**, and -1.2 becomes **-1**.

One detail that's easy to miss: while the weights are ternary (1.58-bit), the activations (the data flowing through the network during inference) are quantized to 8-bit integers. This keeps the entire computational pipeline in integer arithmetic. You're not just saving on weight storage; the actual math happening inside the chip stays cheap from start to finish.

## The numbers at a glance

| Feature | Standard LLM (FP16) | BitNet b1.58 | What you gain |
| --- | --- | --- | --- |
| **Weight values** | 65,536 possible values | 3 values (+1, 0, -1) | Massive memory reduction |
| **Core math operation** | Float Multiply-Add (FMA) | Integer Add/Subtract | 71.4x less arithmetic energy |
| **Memory bandwidth** | High (loading 16-bit weights) | Low (loading 1.58-bit weights) | Faster token generation |
| **Connectivity pattern** | Dense (every weight is nonzero) | Sparse (zero acts as a filter) | Cleaner representations |

## What this actually means for scaling

Here's the insight from the paper that I keep coming back to. We're used to a simple tradeoff: smarter models are bigger, and bigger models are slower. If you want a 70B parameter model, you pay for it in latency, memory, and hardware costs.

BitNet changes this equation. Because ternary inference is so cheap, you can run much larger models at the same speed. A **70B BitNet** model runs at roughly the same speed as a **13B standard model**. Read that again. You get 70 billion parameters of capacity at the inference cost of 13 billion.

This reframes the question entirely. Instead of asking "how do we afford to run this big model?", the question becomes "how big can we go now that the cost per parameter has collapsed?" We've been treating model size and inference cost as tightly coupled. BitNet suggests they don't have to be.

I'm not sure yet how this plays out in practice at true frontier scale, and there are open questions about training stability and whether ternary weights hit a ceiling for certain tasks. But as a direction, this feels like something worth watching closely. The idea that you can trade precision for scale, and come out ahead, is the kind of result that changes how you think about the problem.


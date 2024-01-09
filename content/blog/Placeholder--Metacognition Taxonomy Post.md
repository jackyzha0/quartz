---
title: hold
date: Dec 19, 2023
---

### Scratch
meme ideas:
-something about statelessness (maybe guy in the corner at a party "they don't know llms are stateless")
-oppenheimer meme templates

excalidraw ideas:

## TL;DR


## Toward AI-Native Metacogniton
At Plastic, we've been thinking hard for nearly a year about [cognitive architectures](https://blog.langchain.dev/openais-bet-on-a-cognitive-architecture/) for large language models. Much of that time was focused on developing [[Theory-of-Mind Is All You Need|a production-grade AI-tutor]], which we hosted experimentally as a free and permissionless learning companion.

The rest has been deep down the research rabbit hole on a particularly potent, synthetic subset of LLM inference--[[Metacognition in LLMs is inference about inference|metacognition]]:

> For wetware, metacognition is typically defined as "thinking about thinking" or often a catch-all for any "higher-level" cognition. 
>...
>In large language models, the synthetic corollary of cognition is inference. So we can reasonably define a metacognitive process in an LLM as any that runs inference on the output of prior inference. That is, inference itself is used as context--*inference about inference*. It might be instantly injected into the next prompt, stored for later use, or leveraged by another model.

Less verbose, it boils down to this: if metacogntion in humans is *thinking about thinking*, then **metacognition in LLMs is *inference about inference***.

We believe this definition helps frame an exciting design space for several reasons
- Unlocks regions of the latent space unapproachable by humans
- Leverages rather than suppresses the indeterministic nature of LLMs
- Allows models to generate their own context
- Moves the research and development scope of focus beyond tasks and toward identity
- Affords LLMs the requisite intellectual respect to realize their potential
- Enables any agent builder to quickly escape the gravity well of foundation model behavior
## Research Foundations

(Def wanna give this a more creative name)

(@vintro, should we reference some of the papers that explicitly call out "metacognition"? or maybe we get into some of that below)

- historically, machine learning research has consisted of researchers intelligently building datasets with hard problems in them to evaluate models' ability to predict the right answer for, whatever that looks like
- someone comes along, builds a model that generalizes well on the benchmarks, and the cycle repeats itself, with a new, harder dataset being built and released
- this brings us to today, where datasets like [MMLU](https://arxiv.org/abs/2009.03300), [HumanEval](https://arxiv.org/abs/2107.03374v2), and the hilariously named [HellaSwag](https://arxiv.org/abs/1905.07830)
- what they all have in common is they're trying to explore a problem space as exhaustively as possible, providing a large number of diverse examples to evaluate on (MMLU - language understanding, HumanEval - coding, HellaSwag - reasoning)
- high performance on these datasets demonstrates incredible *general* abilities
	- and in fact their performance on these diverse datasets proves their capabilities are probably much more vast than we think they are
- but they're not given the opportunity to query these diverse capabilities in current user-facing systems
## Designing Metacogntion
how to architect it
	inference - multiple
	storage - of prior inference

between inference, between session, between agents

examples from our research

## Selective Metacog Taxonomy
a wealth of theory on how cognition occurs in humans
but no reason to limit ourselves to biological plausibility 

### Metamemory
### Theory of Mind
### Imaginative Metacognition

## The Future/Potential/Importance
-intellectual respect
-potential features

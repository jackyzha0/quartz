---
title: hold
date: Dec 19, 2023
---
(meme)
## TL;DR

## Background and Related Work

(Def wanna give this a more creative name)

- historically, machine learning research has consisted of researchers intelligently building datasets with hard problems in them to evaluate models' ability to predict the right answer for, whatever that looks like
- someone comes along, builds a model that generalizes well on the benchmarks, and the cycle repeats itself, with a new, harder dataset being built and released
- this brings us to today, where datasets like [MMLU](https://arxiv.org/abs/2009.03300), [HumanEval](https://arxiv.org/abs/2107.03374v2), and the hilariously named [HellaSwag](https://arxiv.org/abs/1905.07830)
- what they all have in common is they're trying to explore a problem space as exhaustively as possible, providing a large number of diverse examples to evaluate on (MMLU - language understanding, HumanEval - coding, HellaSwag - reasoning)
- high performance on these datasets demonstrates incredible *general* abilities
	- and in fact their performance on these diverse datasets proves their capabilities are probably much more vast than we think they are
- but they're not given the opportunity to query these diverse capabilities in current user-facing systems
---
author: [[Lilian Weng]]
title: "Prompt Engineering"
tags: 
- articles
- literature-note
---
# Prompt Engineering

![rw-book-cover](https://lilianweng.github.io/favicon-32x32.png)

## Metadata
- Author: [[Lilian Weng]]
- Full Title: Prompt Engineering
- Category: #articles
- URL: https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/

## Highlights
- **Prompt Engineering**, also known as **In-Context Prompting**, refers to methods for how to communicate with LLM to steer its behavior for desired outcomes *without* updating the model weights. ([View Highlight](https://read.readwise.io/read/01gyvt3qvbgw4drp9w9971br8y))
- **Zero-shot learning** is to simply feed the task text to the model and ask for results. ([View Highlight](https://read.readwise.io/read/01gyvt4jwyn4904bct2fyz8733))
- **Few-shot learning** presents a set of high-quality demonstrations, each consisting of both input and desired output, on the target task. As the model first sees good examples, it can better understand human intention and criteria for what kinds of answers are wanted. Therefore, few-shot learning often leads to better performance than zero-shot. ([View Highlight](https://read.readwise.io/read/01gyvt5tnj9t7rd7w0jbpx8zz2))
- The purpose of presenting few-shot examples in the prompt is to explain our intent to the model; in other words, describe the task instruction to the model in the form of demonstrations. However, few-shot can be expensive in terms of token usage and restricts the input length due to limited context length ([View Highlight](https://read.readwise.io/read/01gyvt8db0xnxedyv479z7cb22))
- finetunes a pretrained model with high-quality tuples of (task instruction, input, ground truth output) to make LM better understand user intention and follow instruction. [RLHF](https://lilianweng.github.io/posts/2021-01-02-controllable-text-generation/#rl-fine-tuning-with-human-preferences) (Reinforcement Learning from Human Feedback) is a common method to do so. ([View Highlight](https://read.readwise.io/read/01gyvt8s43hawm7b8y49rqd93t))
- **Self-consistency sampling** ([Wang et al. 2022a](https://arxiv.org/abs/2203.11171)) is to sample multiple outputs with temperature > 0 and then selecting the best one out of these candidates. The criteria for selecting the best candidate can vary from task to task. A general solution is to pick **majority vote**. ([View Highlight](https://read.readwise.io/read/01gyvt9g6r2b6dtwx1dc35y20v))
- **Chain-of-thought (CoT) prompting** ([Wei et al. 2022](https://arxiv.org/abs/2201.11903)) generates a sequence of short sentences to describe reasoning logics step by step, known as *reasoning chains* or *rationales*, to eventually lead to the final answer. The benefit of CoT is more pronounced for **complicated reasoning tasks**, while using **large models** (e.g. with more than 50B parameters). Simple tasks only benefit slightly from CoT prompting. ([View Highlight](https://read.readwise.io/read/01gyvt9ts7bvz6dk0jc225fftw))
- rompt is a sequence of prefix tokens that increase the probability of getting desired output given input. Therefore we can treat them as trainable parameters and [optimize them directly](https://lilianweng.github.io/posts/2021-01-02-controllable-text-generation/#smart-prompt-design) on the embedding space via gradient descent, such as **AutoPrompt** ([Shin et al., 2020](https://arxiv.org/abs/2010.15980), **Prefix-Tuning** ([Li & Liang (2021)](https://arxiv.org/abs/2101.00190)), **P-tuning** ([Liu et al. 2021](https://arxiv.org/abs/2103.10385)) and **Prompt-Tuning** ([Lester et al. 2021](https://arxiv.org/abs/2104.08691)) ([View Highlight](https://read.readwise.io/read/01gyvtaatn8fhcg4hxr1bm7dkn))
- Often we need to complete tasks that require latest knowledge after the model pretraining time cutoff or internal/private knowledge base. In that case, the model would not know the context if we don’t explicitly provide it in the prompt. ([View Highlight](https://read.readwise.io/read/01gyvtb2v1114401c4wpkxxrgc))

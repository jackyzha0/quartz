---
author: [[openai]]
title: "techniques_to_improve_reliability.md"
tags: 
- articles
- literature-note
---
# techniques_to_improve_reliability.md

![rw-book-cover](https://opengraph.githubassets.com/7466328614ed751a0a24d3d5a757eb663c6c3937d4e683e695ee99c3cc2db23d/openai/openai-cookbook)

## Metadata
- Author: [[openai]]
- Full Title: techniques_to_improve_reliability.md
- Category: #articles
- URL: https://github.com/openai/openai-cookbook/blob/main/techniques_to_improve_reliability.md#how-to-improve-reliability-on-complex-tasks

## Highlights
- • Give clearer instructions
  • Split complex tasks into simpler subtasks
  • Structure the instruction to keep the model on task
  • Prompt the model to explain before answering
  • Ask for justifications of many possible answers, and then synthesize
  • Generate many outputs, and then use the model to pick the best one
  • Fine-tune custom models to maximize performance ([View Highlight](https://read.readwise.io/read/01gyvsyc8azq99sc6amtd8abed))
- Another powerful technique for improving the reliability of answers is to prompt the model to gradually reason out the answer rather than jumping immediately to the final answer. By 'thinking aloud' the model can be far more likely to arrive at the correct answer. ([View Highlight](https://read.readwise.io/read/01gyvsyr66wa6spens2txdttx9))
- ric Zelikman and Yuhuai Wu et al. published a clever procedure for using a few-shot prompt to generate a dataset of explanations that could be used to fine-tune a model. The idea is to use a few-shot prompt to generate candidate explanations, and only keep the explanations that produce the correct answer. ([View Highlight](https://read.readwise.io/read/01gyvszv1p03d0cf3g4pttftwr))
- , one extension of the chain-of-thought technique is to split the single prompt for generating explanations and answers into smaller parts. First, a prompt selects a relevant subset of facts from the text ('selection prompt'). Then, a second prompt infers a conclusion from the selected facts ('inference prompt'). These prompts are then alternated in a loop to generate multiple steps of reasoning and eventually land on a final answer. ([View Highlight](https://read.readwise.io/read/01gyvt0k6ng94t2hhqk35kj4q3))
- The results highlight a couple of general lessons for working with large language models. One, splitting up complex tasks into smaller tasks is a great way to improve reliability and performance; the more atomic the task, the less room there is for the model to err. Two, getting maximum performance often means combining fine-tuning with whatever approach you've chosen. ([View Highlight](https://read.readwise.io/read/01gyvt13kmej0cx6mfhae10hv4))

---
title: "model-based-agent"
aliases: model-based agents
tags: AI, agent
---

a type of [[AI]] [[agent-model|agent]] that maintains internal **state** that can reference (and update) **internal context**

![diagram|300](https://i.imgur.com/6G5OiIw.png)

### Example: Text prediction
![](https://i.imgur.com/EcQlXoe.png)

> [!INFO] critical is the sequence. the box is the same agent at ddifferen times doing difference mappings. the sequence of previous words defines the new prediction
> same input can produce difference output depending on the state

### Note: Chat-GPT
> [!INFO] it is a reflex agent. given the same input-> always gives the same output. 
> input is up to 4000 word tokens. then predicts a word in a reflex way.
> then adds the prediction into the input with the original input
> picks one out of top 5 predicted words so there is some randomness

> [!INFO] model agents maintain state but they are quite simple
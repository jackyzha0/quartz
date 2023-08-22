---
author: [[Tomaz Bratanic]]
title: "Knowledge Graphs &amp; LLMs: Fine-Tuning vs. Retrieval-Augmented Generation"
tags: 
- articles
- literature-note
Document Tags: [[rag]]
---
# Knowledge Graphs & LLMs: Fine-Tuning vs. Retrieval-Augmented Generation

![rw-book-cover](https://miro.medium.com/v2/resize:fit:1024/1*gMyohWeGauh6BZvbqsXAgw.png)

## Metadata
- Author: [[Tomaz Bratanic]]
- Full Title: Knowledge Graphs & LLMs: Fine-Tuning vs. Retrieval-Augmented Generation
- Category: #articles
- Document Tags: [[rag]] 
- URL: https://medium.com/neo4j/knowledge-graphs-llms-fine-tuning-vs-retrieval-augmented-generation-30e875d63a35

## Highlights
- The knowledge cutoff term indicates that LLMs are ***unaware of any events that happened after their training*** ([View Highlight](https://read.readwise.io/read/01h3wk46mzredv3x1rhnj82448))
- While the knowledge cutoff date is relevant for any publicly available information, the LLM doesn’t have any knowledge about ***private or confidential information*** that might be available even before the knowledge cutoff date. ([View Highlight](https://read.readwise.io/read/01h3wk4gwyn2mmnkwfy89ft4b7))
- most companies have some confidential information that they don’t share publicly but might be interested in having a custom LLM that could answer those questions. On the other hand, a lot of the publicly available information that the LLM is aware of might be already outdated. ([View Highlight](https://read.readwise.io/read/01h3wk4xv4sq3tx43tpk0b92yz))
- LLMs is that they are trained to produce realistic-sounding text, which ***might not be accurate***. ([View Highlight](https://read.readwise.io/read/01h3wk57972y5txjy7d4rwaznh))
- Especially for missing data, it is very probable that the LLM will make up an answer that sounds convincing but is nonetheless wrong instead of admitting that it lacks the base facts in its training. ([View Highlight](https://read.readwise.io/read/01h3wk5fdbxqgswamq72zaea3d))
- you have to be very careful not to blindly believe everything that LLMs produce. Verifying answers or producing more accurate results from LLMs is another big problem that needs to be solved. ([View Highlight](https://read.readwise.io/read/01h3wk63cgt5j3avw3fcfcct6z))
- **One use case** is fine-tuning a model to update and ***expand its internal knowledge***. 
  In contrast, the **other use case** is focused on fine-tuning a model ***for a specific*** task like text summarization or translating natural language to database queries. ([View Highlight](https://read.readwise.io/read/01h3wk725w6djwaga7v9mb3ct5))
- we will talk about the first use case, where we use fine-tuning techniques to update and expand the internal knowledge of an LLM ([View Highlight](https://read.readwise.io/read/01h3wk75ftj1rjrzvpprwew8b3))
- After you have selected the base LLM, you can start the next step of fine-tuning it. The fine-tuning step is relatively cheap regarding computation cost due to available techniques like the [LoRa](https://huggingface.co/blog/lora) and [QLoRA](https://arxiv.org/abs/2305.14314). ([View Highlight](https://read.readwise.io/read/01h3wk8gcasvnyz6xez3qgrdx0))
- However, ***constructing a training dataset*** is more complex and can get expensive. If you can not afford a dedicated team of annotators, it seems that the trend is to ***use an LLM to construct a training dataset*** to fine-tune your desired LLM (this is really meta). ([View Highlight](https://read.readwise.io/read/01h3wp2ggg6wakvyyex6zv66dn))
- There is also a relatively [fresh project by H2O called WizardLM](https://github.com/h2oai/h2o-wizardlm), which is designed to turn documents into question-answer pairs that can be used to fine-tune an LLM. ([View Highlight](https://read.readwise.io/read/01h3wp30jzdyf395q7jc73wkyy))
## New highlights added July 3, 2023 at 10:21 AM
- previously NLP models were most often domain and task-specific, meaning that you would most likely need to train a custom natural language model depending on your use case and domain. However, thanks to the generalization capabilities of LLMs, a single model can be applied to solve various collections of tasks ([View Highlight](https://read.readwise.io/read/01h4dby03xnt20a01m28b8v4ap))
- The retrieval-augmented approach has some clear advantages over the fine-tuning approach:
  • The answer can cite its sources of information, which allows you to validate the information and potentially change or update the underlying information based on requirements
  • Hallucinations are more unlikely to occur as you don’t rely on the internal knowledge of an LLM to answer the question and only use information that is provided in the relevant documents
  • Changing, updating, and maintaining the underlying information the LLM uses is easier as you transform the problem from LLM maintenance to a database maintenance, querying and context construction problem
  • Answers can be personalized based on the user context, or their access permission ([View Highlight](https://read.readwise.io/read/01h4dd8xjqehkckxsj82rpavts))

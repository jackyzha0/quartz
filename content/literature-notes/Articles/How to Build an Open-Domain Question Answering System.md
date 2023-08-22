---
author: [[Lilian Weng]]
title: "How to Build an Open-Domain Question Answering System?"
tags: 
- articles
- literature-note
---
# How to Build an Open-Domain Question Answering System?

![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article1.be68295a7e40.png)

## Metadata
- Author: [[Lilian Weng]]
- Full Title: How to Build an Open-Domain Question Answering System?
- Category: #articles
- URL: https://lilianweng.github.io/posts/2020-10-29-odqa/

## Highlights
- A model that can answer any question with regard to factual knowledge can lead to many useful and practical applications, such as working as a chatbot or an AI assistant🤖 ([View Highlight](https://read.readwise.io/read/01gyzfhsrax4rhjjtk7mk4yc9a))
- Before we dive into the details of many models below. I would like to point out one concern of fine-tuning a model with common QA datasets, which appears as one fine-tuning step in several ODQA models ([View Highlight](https://read.readwise.io/read/01gyzfjtm5xhnrc29090mc7x0j))
- Given a factoid question, if a language model has no context or is not big enough to memorize the context which exists in the training dataset, it is unlikely to guess the correct answer ([View Highlight](https://read.readwise.io/read/01gyzfk6mvsaws6g7183j3bcsk))
- We can decompose the process of finding answers to given questions into two stages,
  1. Find the related context in an external repository of knowledge;
  2. Process the retrieved context to *extract* an answer. ([View Highlight](https://read.readwise.io/read/01gyzfkdhf556f2sbv3kk1n13b))
## New highlights added July 3, 2023 at 11:21 AM
- The “open-domain” part refers to the lack of the relevant context for any arbitrarily asked factual question. In the above case, the model only takes as the input the question but no article about “why Einstein didn’t win a Nobel Prize for the theory of relativity” is provided, where the term “the law of the photoelectric effect” is likely mentioned. In the case when both the question and the context are provided, the task is known as **Reading comprehension (RC)**. ([View Highlight](https://read.readwise.io/read/01h4de6x41kj2hkbsbnms0zjby))
- An ODQA model may work with or without *access to an external source of knowledge* (e.g. Wikipedia) and these two conditions are referred to as *open-book* or *closed-book* question answering, respectively. ([View Highlight](https://read.readwise.io/read/01h4de77jpe3r4yhbt1781d77z))

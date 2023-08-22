---
author: [[jobergum]]
title: "Improving Zero-Shot Ranking With Vespa Hybrid Search - Part Two"
tags: 
- articles
- literature-note
---
# Improving Zero-Shot Ranking With Vespa Hybrid Search - Part Two

![rw-book-cover](https://blog.vespa.ai/assets/2023-01-10-improving-zero-shot-ranking-with-vespa-part-two/tamarcus-brown-YWI8pZdcuAA-unsplash.jpg)

## Metadata
- Author: [[jobergum]]
- Full Title: Improving Zero-Shot Ranking With Vespa Hybrid Search - Part Two
- Category: #articles
- URL: https://blog.vespa.ai/improving-zero-shot-ranking-with-vespa-part-two/

## Highlights
- Generating synthetic training data in-domain via prompting LLMs is a recent emerging Information Retrieval(IR) trend also described in [InPars: Data Augmentation for Information Retrieval using Large Language Models](https://arxiv.org/abs/2202.05144). ([View Highlight](https://read.readwise.io/read/01gtq7gzher0p7vcczw5y7zxwz))
- The basic idea is to “prompt” a large language model (LLM) to generate synthetic queries for use in training of in-domain ranking models. A typical prompt include a few examples of queries and relevant documents, then the LLM is “asked” to generate syntetic queries for many of the documents in the corpus. The generated syntetic query, document pairs can be used to train neural ranking models. ([View Highlight](https://read.readwise.io/read/01gtq7hvk1edc3m4qy8sc1pa7j))

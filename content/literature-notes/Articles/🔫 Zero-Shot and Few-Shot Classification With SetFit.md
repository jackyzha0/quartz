---
author: [[argilla.io]]
title: "🔫 Zero-Shot and Few-Shot Classification With SetFit"
tags: 
- articles
- literature-note
---
# 🔫 Zero-Shot and Few-Shot Classification With SetFit

![rw-book-cover](https://docs.argilla.io/en/latest/_static/images/og-doc.png)

## Metadata
- Author: [[argilla.io]]
- Full Title: 🔫 Zero-Shot and Few-Shot Classification With SetFit
- Category: #articles
- URL: https://docs.argilla.io/en/latest/tutorials/notebooks/labelling-textclassification-setfit-zeroshot.html

## Highlights
- The code below will load the [banking customer requests dataset](https://huggingface.co/datasets/banking77) from the Hub, encode the `text` field, and create the `vectors` field which will contain only one key (`mini-lm-sentence-transformers`). For the purposes of labelling the dataset from scratch, it will also remove the `label` field, which contains the original intent labels.
  [ ]:
  Copy to clipboard ([View Highlight](https://read.readwise.io/read/01gtbwtvnd6ebq3m5fan5m5hmx))
- SetFit’s approach to zero-shot is to create a synthetic dataset of training examples, which is different from other approaches (e.g., transformers zero-shot pipelines) where “templated” examples with label names are used at inference time. ([View Highlight](https://read.readwise.io/read/01gtbx3e82jzfn5e1x6tvd34ts))

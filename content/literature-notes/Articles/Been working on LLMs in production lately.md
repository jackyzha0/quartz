---
author: [[Shreya Shankar]]
title: "Been working on LLMs in production lately"
tags: 
- articles
- literature-note
---
# Been working on LLMs in production lately

![rw-book-cover](https://pbs.twimg.com/profile_images/1342529111839944705/hzr44mb5_normal.jpg)

## Metadata
- Author: [[Shreya Shankar]]
- Full Title: Been working on LLMs in production lately
- Category: #articles
- URL: https://twitter.com/sh_reya/status/1641106353971421185

## Highlights
- Experimentation is tangibly more expensive (and slower) in LLMOps. ([View Highlight](https://read.readwise.io/read/01gwsvmz1arfcahqnkfr005hzy))
- we know from MLOps research that high experimentation velocity is crucial for putting and keeping pipelines in prod ([View Highlight](https://read.readwise.io/read/01gwsvnkee1t8384sqwnd3c2vp))
- so when it comes to evaluation & deployment, LLMs can fail hard on some pockets of the distribution. Like in MLOps, the easiest way to react to these failures is to put up a filter in the pipeline ([View Highlight](https://read.readwise.io/read/01gwsvpacknb871zfvfn8h32cd))
- I think CI for ML is going to look super different in LLM land. hold-out validation sets are giving less and less insight into ML pipeline performance ([View Highlight](https://read.readwise.io/read/01gwsvptwws1e7pz4qahrbhxn4))
- many people, ranging from ML novices to ML experts, wonder, do I prompt engineer or do I fine tune? My databases PhD brain feels that something is way off with data management for LLMs; this shouldn’t be such a big question ([View Highlight](https://read.readwise.io/read/01gwsvrbn4e8zqm9gmr75z5sg0))
- What’s the point of doing this if I’m paying an LLM to have world context? If I can hold out as long as possible without fine-tuning… ([View Highlight](https://read.readwise.io/read/01gwsvsa1bpemek9qr46amhjaa))
- But I think eventually people will end up fine tuning, or engineering super specific prompts, not just because they achieve good performance but also they may provide a level of robustness to changes in the underlying API model ([View Highlight](https://read.readwise.io/read/01gwsvsnwaxzejywvkz5jw87c6))
- So the ability to fine tune, or put stateful info (e.g., putting a user’s k most recent queries, or the latest experiment) into the prompt, seems crucial for LLMs in prod ([View Highlight](https://read.readwise.io/read/01gwsvt34d5k8m1e6s512frw2t))
- Few companies are mature enough to have continually training/finetuning ML pipelines. It is a complicated mess. Unfortunately I am seeing the same pattern emerge in LLMs, where it is a nightmare (architecturally) to think about continually fine tuning models ([View Highlight](https://read.readwise.io/read/01gwsvtg0b25fejc6b80enj15d))
- I can’t the only one looking at many plugin and retrieval architectures, wondering about the how challenging it is to efficiently update models or shared state. Many LLM tools are designed for this train-once and deploy-forever paradigm, which we know doesn’t hold in prod ([View Highlight](https://read.readwise.io/read/01gwsvtx658xj7b31k4mvmz31t))

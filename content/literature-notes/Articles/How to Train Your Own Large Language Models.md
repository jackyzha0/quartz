---
author: [[Reza Shabani]]
title: "How to Train Your Own Large Language Models"
tags: 
- articles
- literature-note
---
# How to Train Your Own Large Language Models

![rw-book-cover](https://blog.replit.com/images/llm/llm-training-replit.jpg?v=1681921300071)

## Metadata
- Author: [[Reza Shabani]]
- Full Title: How to Train Your Own Large Language Models
- Category: #articles
- URL: https://blog.replit.com/llm-training

## Highlights
- At Replit, we've invested heavily in the infrastructure required to train our own Large Language Models from scratch. ([View Highlight](https://read.readwise.io/read/01gyfgsxr6mzcs6r14maa4p8pz))
- We'll discuss the engineering challenges we face along the way, and how we leverage the vendors that we believe make up the modern LLM stack: Databricks, Hugging Face, and MosaicML. ([View Highlight](https://read.readwise.io/read/01gyfgt7cahm8nv3nf4zgyf1x6))
- Training a custom model allows us to tailor it to our specific needs and requirements, including platform-specific capabilities, terminology, and context that will not be well-covered in general-purpose models like GPT-4 or even code-specific models like Codex. F ([View Highlight](https://read.readwise.io/read/01gyfgttx3rw8xbatefcsyhepj))
- While we'll always use the right model based on the task at hand, we believe there are benefits to being less dependent on only a handful of AI providers ([View Highlight](https://read.readwise.io/read/01gyfgv103wft4b50hazyg19jt))
- Although costs will continue to go down, LLMs are still prohibitively expensive for use amongst the global developer community. ([View Highlight](https://read.readwise.io/read/01gyfgvaey391bvpwvxkpe01gm))
## New highlights added April 21, 2023 at 12:16 PM
- he Stack is made available by the [BigCode](https://www.bigcode-project.org/) project. Details of the dataset construction are available in [Kocetkov et al. (2022)](https://arxiv.org/abs/2211.15533). Following de-duplication, version 1.2 of the dataset contains about 2.7 TB of permissively licensed source code written in over 350 programming languages. ([View Highlight](https://read.readwise.io/read/01gyhkpaafpwjacc3bqfg8yrpq))
- The Transformers library does a great job of abstracting away many of the challenges associated with model training, including working with data at scale. ([View Highlight](https://read.readwise.io/read/01gyhkpp5z4w3vpcf78yznzre4))
- When it comes time for more advanced data processing, we use [Databricks](https://www.databricks.com/) to build out our pipelines. T ([View Highlight](https://read.readwise.io/read/01gyhkpw01r3mqbq5ymyw6gpyf))
- we turn to cleaning and preprocessing our data. Normally, it’s important to deduplicate the data and fix various encoding issues, but The Stack has already done this for us using a near-deduplication technique outlined in Kocetkov et ([View Highlight](https://read.readwise.io/read/01gyhkq91rxv40tkqxq88sedhm))
- This is where it pays off to have a tool like Databricks, where we can treat The Stack, Stackoverflow, and Replit data as three sources within a larger data lake, and utilize them as needed in our downstream processes. ([View Highlight](https://read.readwise.io/read/01gyhkqgv2fxmg40p6440cxqdg))
- An additional benefit of using Databricks is that we can run scalable and tractable analytics on the underlying data. We run all types of summary statistics on our data sources, check long-tail distributions, and diagnose any issues or inconsistencies in the process. ([View Highlight](https://read.readwise.io/read/01gyhkqrwv8b59bbh15mhd2v3c))
- We anonymize the data by removing any Personal Identifiable Information (PII), including emails, IP addresses, and secret keys. ([View Highlight](https://read.readwise.io/read/01gyhkqxp5zx4fks6bfywbexhg))
- We use a number of heuristics to detect and remove auto-generated code. ([View Highlight](https://read.readwise.io/read/01gyhkqzh8bn4hbp4gc30qfhcx))
- For a subset of languages, we remove code that doesn't compile or is not parseable using standard syntax parsers. ([View Highlight](https://read.readwise.io/read/01gyhkr1rq8tx043grc3pjwj4b))
- We filter out files based on average line length, maximum line length, and percentage of alphanumeric characters. ([View Highlight](https://read.readwise.io/read/01gyhkr42atxwp4b2wg4akmdb0))
- Prior to tokenization, we train our own custom vocabulary using a random subsample of the same data that we use for model training. A custom vocabulary allows our model to better understand and generate code content. ([View Highlight](https://read.readwise.io/read/01gyhkred8sa682kscvtx4dgmk))
- It underscores the importance of having a robust and fully-integrated infrastructure for your model training process. ([View Highlight](https://read.readwise.io/read/01gyhkrjv80ffqjp1jmfnamcmy))
- We train our models using [MosaicML](https://www.mosaicml.com/). Having previously deployed our own training clusters, we found that the MosaicML platform gives us a few key benefits. ([View Highlight](https://read.readwise.io/read/01gyhkrs6h3bqac7ab4r8zs5f5))
- **LLM training configurations**. The Composer library has a number of well-tuned configurations for training a variety of models and for different types of training objectives. ([View Highlight](https://read.readwise.io/read/01gyhks8224ayssbs55dwsghe0))
- In determining the parameters of our model, we consider a variety of trade-offs between model size, context window, inference time, memory footprint, and more. Larger models typically offer better performance and are more capable of transfer learning. Yet these models have higher computational requirements for both training and inference. ([View Highlight](https://read.readwise.io/read/01gyhksr2cwczb2mjxr7rjg5gg))
- we also choose from a variety of training objectives, each with their own unique advantages and drawbacks. The most common training objective is next token prediction. This typically works well for code completion, but fails to take into account the context further downstream in a document. This can be mitigated by using a "fill-in-the-middle" objective, where a sequence of tokens in a document are masked and the model must predict them using the surrounding context. Yet another approach is UL2 (Unsupervised Latent Language Learning), which frames different objective functions for training language models as denoising tasks, where the model has to recover missing sub-sequences of a given input. ([View Highlight](https://read.readwise.io/read/01gyhkt9ts24dtzj13ctf8p4h3))
- We use the model to generate a block of Python code given a function signature and docstring. We then run a test case on the function produced to determine if the generated code block works as expected. ([View Highlight](https://read.readwise.io/read/01gyhky8zbdmqpw04x6t9hsyzj))
- But because Replit supports many programming languages, we need to evaluate model performance for a wide range of additional languages. We've found that this is difficult to do, and there are no widely adopted tools or frameworks that offer a fully comprehensive solution. ([View Highlight](https://read.readwise.io/read/01gyhkyn4b3wbqsb31nt9bfxmy))
- uckily, a "reproducible runtime environment in any programming language" is kind of our thing here at Replit! We're currently building an evaluation framework that will allow any researcher to plug in and test their multi-language benchmarks. We'll be discussing this in a future blog post. ([View Highlight](https://read.readwise.io/read/01gyhkys7q59wf1ywvr4my6c7x))
- As we mentioned earlier, our code completion models should feel fast, with very low latency between requests. We accelerate our inference process using NVIDIA's FasterTransformer and Triton Server. ([View Highlight](https://read.readwise.io/read/01gyhkz3enawnb87a34w35qy2f))
- FasterTransformer is a library implementing an accelerated engine for the inference of transformer-based neural networks, and Triton is a stable and fast inference server with easy configuration. ([View Highlight](https://read.readwise.io/read/01gyhkzdajbd1cjfcfrzfvw29s))
- we like to test it ourselves and get a sense of the model's "vibes". The HumanEval test results we calculated earlier are useful, but there’s nothing like working with a model to get a feel for it, including its latency, consistency of suggestions, and general helpfulness. ([View Highlight](https://read.readwise.io/read/01gyhkzxrfnsqk7gx6ds8hkdjw))
- Our model training platform gives us the ability to go from raw data to a model deployed in production in less than a day. But more importantly, it allows us to train and deploy models, gather feedback, and then iterate rapidly based on that feedback ([View Highlight](https://read.readwise.io/read/01gyhm08g17b28q0dz1x3cqcpb))

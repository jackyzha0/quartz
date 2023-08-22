---
author: [[jordivillar.com]]
title: "SQL Is All You Need"
tags: 
- articles
- literature-note
---
# SQL Is All You Need

![rw-book-cover](https://jordivillar.com/sql.jpeg)

## Metadata
- Author: [[jordivillar.com]]
- Full Title: SQL Is All You Need
- Category: #articles
- URL: https://jordivillar.com/data/sql-is-all-you-need

## Highlights
- I strongly believe that our lives would be way easier if SQL was everything (or almost) we needed when it comes to data. ([View Highlight](https://read.readwise.io/read/01gxn8jwthmw7ggw7x4t9m0pa7))
- The common pain in both experiences was always to find a cheap and fast way to store the data that is compatible with real-time inference and also supports experimenting, iterating, and training different models. Being a machine learning practitioner nowadays requires you to use a myriad of tools such as feature stores, training platforms, infrastructure, streams, etc, to be able to train your models and provide batches of predictions.
  Now imagine a system being used by a retail company to decide which product to show you based on the probability of you buying it, while they send events to the algorithm to tell it if a shown product has been bought or not. The list of tools needed would keep getting longer. ([View Highlight](https://read.readwise.io/read/01gxn8kbnka8ewp8vszkqxhegj))
- SGD is an iterative method, so having the values of the previous weights, it’s possible to generate the next ones with simple operations. Repeat the process over hundreds/thousands of events and, in theory, it will converge. ([View Highlight](https://read.readwise.io/read/01gxn8jmqxaq0npqsctvdqd61c))
- First of all, let’s build a simple model using `sklearn` so we can use it as a reference. It will also allow us to validate results while writing our version. Since this is a classification problem, we’ll use the `SGDClassifier` with some special settings to simulate online gradient descent. ([View Highlight](https://read.readwise.io/read/01gxn8ktatz2bjky2w6d4fqky5))
- Stochastic gradient descent with mini-batches is essentially the same but instead of going sample by sample, a batch of N samples is processed in each step. The algorithm described in pseudo-code is basically:
  1. Initialize the weights 𝑤
  2. Iterate over all samples in batches of size b:
  3. For each batch update weights as: ([View Highlight](https://read.readwise.io/read/01gxn8nesjvdc1c1d0yzkpk82y))
- It’s possible to build an online machine learning algorithm by just using SQL, and thanks to ClickHouse and the Materialized Views we have managed to implement a stateful algorithm capable of predicting events in real-time. This opens the door to a lot of possibilities. ([View Highlight](https://read.readwise.io/read/01gxn8qk1qwgz3n0kkg3tkzqfc))
- We’d have to **program the described algorithm** in your database, **build an easy way to ingest data** in real-time from the online store to instantly update your model, and then **provide an interface to run inference** and return probabilities. ([View Highlight](https://read.readwise.io/read/01gxn8rb2mdkfqpjsdf2xcbjfn))

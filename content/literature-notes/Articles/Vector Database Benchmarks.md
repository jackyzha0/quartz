---
author: [[qdrant.tech]]
title: "Vector Database Benchmarks"
tags: 
- articles
- literature-note
---
# Vector Database Benchmarks

![rw-book-cover](https://qdrant.tech/images/social_preview.png)

## Metadata
- Author: [[qdrant.tech]]
- Full Title: Vector Database Benchmarks
- Category: #articles
- URL: https://qdrant.tech/benchmarks/

## Highlights
- `Redis` took over 8 hours to complete with indexing the `deep-image-96-angular`. That’s why we interrupted the tests and didn’t include those results. ([View Highlight](https://read.readwise.io/read/01gtc2az04hjg21254zbn6jt82))
- `Redis` does better than the others while using one thread only. When we just use a single thread, the bottleneck might be the client, not the server, where `Redis`’s custom protocol gives it an advantage. But it is architecturally limited to only a single thread execution, which makes it impossible to scale vertically. ([View Highlight](https://read.readwise.io/read/01gtc2aqqahef2j3f7n3p012y6))

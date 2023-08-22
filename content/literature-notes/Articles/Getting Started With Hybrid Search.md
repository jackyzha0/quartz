---
author: [[Pinecone]]
title: "Getting Started With Hybrid Search"
tags: 
- articles
- literature-note
---
# Getting Started With Hybrid Search

![rw-book-cover](https://www.pinecone.io/images/hybrid-search-intro-0-alt.png)

## Metadata
- Author: [[Pinecone]]
- Full Title: Getting Started With Hybrid Search
- Category: #articles
- URL: https://www.pinecone.io/learn/hybrid-search-intro/

## Highlights
- The capabilities of vector search are impressive, but it isn’t a perfect technology. In fact, without big domain-specific datasets to fine-tune models on, a traditional search still has some advantages. ([View Highlight](https://read.readwise.io/read/01gwenhj5n6znq3xj41k5dg5h4))
- We repeatedly see that vector search unlocks incredible and *intelligent* retrieval but struggles to adapt to new domains. Whereas traditional search can cope with new domains but is fundamentally limited to a set performance level. ([View Highlight](https://read.readwise.io/read/01gwenhstgnrfwrjp58pwfgcvd))
- Vector search or *dense retrieval* has been shown to significantly outperform traditional methods *when* the embedding models have been fine-tuned on the target domain. However, this changes when we try using these models for *“out-of-domain” tasks*. ([View Highlight](https://read.readwise.io/read/01gwenjnz9gz7skgf452j557e8))
- That means if we have a large amount of data covering a specific domain like “Medical question-answering”, we can fine-tune an embedding model. With that embedding model, we can create dense vectors and get outstanding vector search performance. ([View Highlight](https://read.readwise.io/read/01gwenk0f6ec78r572jbc4x9ez))
- Combining dense and sparse search takes work. In the past, engineering teams needed to run different solutions for dense and sparse search engines and another system to combine results in a meaningful way. ([View Highlight](https://read.readwise.io/read/01gwenq2fz4qkcc2x9eprapapt))
- The Pinecone approach to hybrid search uses a *single* hybrid index. It enables search across any modality; text, audio, images, etc. Finally, the weighting of dense vs. sparse can be chosen via the `alpha` parameter, making it easy to adjust. ([View Highlight](https://read.readwise.io/read/01gwenqbj4tp5ch807ased9eyy))

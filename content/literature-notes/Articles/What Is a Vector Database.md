---
author: [[Frank Liu]]
title: "What Is a Vector Database?"
tags: 
- articles
- literature-note
---
# What Is a Vector Database?

![rw-book-cover](https://assets.zilliz.com/meta_image_zilliz_2788e63781.png)

## Metadata
- Author: [[Frank Liu]]
- Full Title: What Is a Vector Database?
- Category: #articles
- URL: https://zilliz.com/learn/what-is-vector-database

## Highlights
- a vector database is a fully managed, no-frills solution for storing, indexing, and searching across a massive dataset of unstructured data that leverages the power of embeddings from machine learning models. ([View Highlight](https://read.readwise.io/read/01gt6pet55142sfp7574t99jkq))
## New highlights added February 27, 2023 at 4:04 PM
- a vector database should have the following features: 1) scalability and tunability, 2) multi-tenancy and data isolation, 3) a complete suite of APIs, and 4) an intuitive user interface/administrative console. ([View Highlight](https://read.readwise.io/read/01gt9nzq46kwpzy6ssp1zkef85))
- projects such as FAISS, ScaNN, and HNSW are lightweight *ANN libraries* rather than managed solutions. The intention of these libraries is to aid in the construction of vector indices - data structures designed to significantly speed up nearest neighbor search for multi-dimensional vectors[[1]](https://zilliz.com/learn/what-is-vector-database#fn1). If your dataset is small and limited, these libraries can prove to be sufficient for unstructured data processing, even for systems running in production. However, as dataset sizes increase and more users are onboarded, the problem of scale becomes increasingly difficult to solve. ([View Highlight](https://read.readwise.io/read/01gt9p19271wsbp6pzd4rmn15b))
- ![](https://assets.zilliz.com/architecture_diagram_c2acfbe310.png) ([View Highlight](https://read.readwise.io/read/01gt9p1hhbyq0h7kpc444kx0zb))
- Vector databases also operate in a totally different layer of abstraction from vector search libraries - vector databases are full-fledged services, while ANN libraries are meant to be integrated into the application that you’re developing. In this sense, ANN libraries are one of the many components that vector databases are built on top of, similar to how [Elasticsearch is built on top of Apache Lucene](https://en.wikipedia.org/wiki/Elasticsearch). ([View Highlight](https://read.readwise.io/read/01gt9p25b6qge2r06vgtr4zpa6))
- An increasing number of traditional databases and search systems such as Clickhouse and Elasticsearch are including built-in vector search plugins. Elasticsearch 8.0, for example, includes vector insertion and ANN search functionality that can be called via restful API endpoints. The problem with vector search plugins should be clear as night and day - **these solutions do not take a full-stack approach to embedding management and vector search.** Instead, these plugins are meant to be enhancements on top of existing architectures, thereby making them limited and unoptimized. ([View Highlight](https://read.readwise.io/read/01gt9p3gdhdqzkx40r0wenvehx))
- While both Elasticsearch and Milvus have methods for creating indexes, inserting embedding vectors, and performing nearest neighbor search, it’s clear from these examples that Milvus has a more intuitive vector search API (better user-facing API) and broader vector index + distance metric support (better tunability). Milvus also plans to support more vector indices and allow for querying via SQL-like statements in the future, further improving both tunability and usability. ([View Highlight](https://read.readwise.io/read/01gt9pbz8p4a8tsvmdzhvy3bgt))

---
author: [[LangChain]]
title: "Retrieval"
tags: 
- articles
- literature-note
---
# Retrieval

![rw-book-cover](https://images.unsplash.com/photo-1576201836106-db1758fd1c97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDEwfHxnb2xkZW4lMjByZXRyaWV2ZXJ8ZW58MHx8fHwxNjc5NjMyNDA2&ixlib=rb-4.0.3&q=80&w=2000)

## Metadata
- Author: [[LangChain]]
- Full Title: Retrieval
- Category: #articles
- URL: https://blog.langchain.dev/retrieval/

## Highlights
- The desire and demand for this highlights an important limitation of ChatGPT - it doesn't know about YOUR data, and most people would find it more useful if it did. So how do you go about building a chatbot that knows about your data?
  The main way of doing this is through a process commonly referred to as "Retrieval Augmented Generation ([View Highlight](https://read.readwise.io/read/01gwen91s55v4a46at2er3wgqn))
- the system "retrieves" any documents that could be relevant in answering the question, and then passes those documents (along with the original question) to the language model for a "generation" step. ([View Highlight](https://read.readwise.io/read/01gwen9d8m93z5q1etfmhctcz8))
- main way most people - including us at LangChain - have been doing retrieval is by using semantic search. In this process, a numerical vector (an embedding) is calculated for all documents, and those vectors are then stored in a vector database (a database optimized for storing and querying vectors). Incoming queries are then vectorized as well, and the documents retrieved are those who are closest to the query in embedding space. ([View Highlight](https://read.readwise.io/read/01gwenafdb7b4f9crc5vfpscdz))
- there a lot of different variations in how you do this retrieval step. People want to do things beyond semantic search. To be concrete:
  • We support two different query methods: one that just optimizes similarity, another with optimizes for [maximal marginal relevance](https://www.cs.cmu.edu/~jgc/publication/The_Use_MMR_Diversity_Based_LTMIR_1998.pdf).
  • Users often want to specify metadata filters to filter results before doing semantic search
  • Other types of indexes, [like graphs](https://langchain.readthedocs.io/en/latest/modules/indexes/chain_examples/graph_qa.html), have piqued user's interests ([View Highlight](https://read.readwise.io/read/01gwenb4dkmm30rpmyhn65ejnv))
- we also realized that people may construct a retriever outside of LangChain - for example OpenAI released their `[ChatGPT Retrieval Plugin](https://github.com/openai/chatgpt-retrieval-plugin)`. We want to make it as easy as possible for people to use whatever retriever they created within LangChain. ([View Highlight](https://read.readwise.io/read/01gwenbhg7abqa65kzm793sp28))
- An index is a data structure that supports efficient searching, and a retriever is the component that uses the index to find and return relevant documents in response to a user's query. The index is a key component that the retriever relies on to perform its function. ([View Highlight](https://read.readwise.io/read/01gwencxy561y8stvr9ctv2ys2))

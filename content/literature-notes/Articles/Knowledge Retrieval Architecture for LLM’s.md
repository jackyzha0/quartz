---
author: [[Matt Boegner]]
title: "Knowledge Retrieval Architecture for LLM’s"
tags: 
- articles
- literature-note
---
# Knowledge Retrieval Architecture for LLM’s

![rw-book-cover](https://mattboegner.com/content/images/2023/01/featured-image-llm-knowledge-architecture.png)

## Metadata
- Author: [[Matt Boegner]]
- Full Title: Knowledge Retrieval Architecture for LLM’s
- Category: #articles
- URL: https://mattboegner.com/knowledge-retrieval-architecture-for-llms/

## Highlights
- there are instances in which you want the language model to generate an answer based on specific data, rather than supplying a generic answer based on the model’s training set. ([View Highlight](https://read.readwise.io/read/01gv1mrrdyxs9rvxaz6bbabmwk))
- ![](https://lh5.googleusercontent.com/1mMKU2jr3BSGshMcKhpNwdn4n7zV5kUW2a_Jp5xt2vXpw99WSixVOA8WVMjVJ9vGc2eyCqdf5SMm-PbFPrECr_5iDyiOChVj1wtJulaJ2oG6Qe5uJNZ1ViBsdEr53A3o1ckDIpZwy8x_clZR865Db10) ([View Highlight](https://read.readwise.io/read/01gv1mvajpcpzmnr931t19e4v0))
- ![](https://lh5.googleusercontent.com/1mMKU2jr3BSGshMcKhpNwdn4n7zV5kUW2a_Jp5xt2vXpw99WSixVOA8WVMjVJ9vGc2eyCqdf5SMm-PbFPrECr_5iDyiOChVj1wtJulaJ2oG6Qe5uJNZ1ViBsdEr53A3o1ckDIpZwy8x_clZR865Db10) ([View Highlight](https://read.readwise.io/read/01gv1mvan8xxg2ns39p74ahywr))
- Retrieval-augmented generation a) **retrieves** relevant data from outside of the language model (non-parametric) and b) **augments** the data with context in the prompt to the LLM. ([View Highlight](https://read.readwise.io/read/01gv1mvsjxz0zd002twzwg2e01))
- a typical prerequisite is to split text into sections (for example, via utilities in the [LangChain](https://github.com/hwchase17/langchain?ref=matt-boegner) package), then calculate embeddings on those chunks. ([View Highlight](https://read.readwise.io/read/01gv1nmcb7mjrspg71925en4q5))
- when a user submits a question, an LLM processes the message in multiple ways, but the key step is calculating another embedding - this time, of the user’s text. ([View Highlight](https://read.readwise.io/read/01gv1nmrwedznrrdkqrvvwrvam))
- This semantic search is based on the “learned” concepts of the language model and is not limited to just a search for keywords. From the results of this search, we can quantitatively identify one or more relevant text chunks that could help inform the user’s question. ([View Highlight](https://read.readwise.io/read/01gv1nncggw6yhptny71s0g0jc))
- Finally, we provide the relevant information from which the language model can answer using specific data. In its simplest form, we simply append (“Document 1: ”+ text chunk 1 + “\nDocument 2: ” + text chunk 2 + …) until the context is filled. ([View Highlight](https://read.readwise.io/read/01gv1p0v3rnn91jj827mz2zx33))
- . Embedding *this* document and searching for relevant (real) examples in the datastore retrieves more relevant results; the relevant results are used to generate the actual answer seen by the user ([View Highlight](https://read.readwise.io/read/01gv1p38tb5dqj74e4f44h07jg))
- Vector Store Index - This is equivalent to the simple design that I explained in the previous section. Each text chunk is stored alongside an embedding; comparing a query embedding to the document embeddings returns the *k* most similar documents to feed into the context. ([View Highlight](https://read.readwise.io/read/01gv1p51fd3m8bv6gkjvfz6bn8))
- • Tree Index - This is extremely useful when your data is organized into hierarchies. Consider a clinical documentation application: you may want the text to include both high-level instructions ("here are general ways to improve your heart health") and low-level text (reference side effects and instructions for a particular blood pressure drug regimen). There are a few different ways of traversing the tree to generate a response, two of which are shown below.
  ![](https://mattboegner.com/content/images/2023/01/Screen-Shot-2023-01-31-at-2.17.14-PM.png)
  ![](https://mattboegner.com/content/images/2023/01/tree-summarization.png) ([View Highlight](https://read.readwise.io/read/01gv1p5wq67jcq2bm6jfnav3nt))

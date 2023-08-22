---
author: [[lesters]]
title: "Efficient Open-Domain Question-Answering on Vespa.ai"
tags: 
- articles
- literature-note
---
# Efficient Open-Domain Question-Answering on Vespa.ai

![rw-book-cover](https://blog.vespa.ai/assets/2020-09-30-efficient-open-domain-question-answering-on-vespa/QA.png)

## Metadata
- Author: [[lesters]]
- Full Title: Efficient Open-Domain Question-Answering on Vespa.ai
- Category: #articles
- URL: https://blog.vespa.ai/efficient-open-domain-question-answering-on-vespa/

## Highlights
- Open-domain question-answering has emerged as a benchmark for measuring a system’s capability to read, represent, and retrieve general knowledge. ([View Highlight](https://read.readwise.io/read/01gvp267cmsy34kwgadv6evh5j))
- The current retrieval-based state-of-the-art is the [Dense Passage Retrieval system](https://github.com/facebookresearch/DPR), as described in the [Dense Passage Retrieval for Open-Domain Question Answering paper](https://arxiv.org/abs/2004.04906). It consists of a set of python scripts, tools, and models developed primarily for research. There are a lot of parts in such a system. These include two BERT-based models for encoding text to embedding vectors, another BERT-based model for extracting answers, approximate nearest-neighbor similarity search and text-based BM25 methods for retrieving candidates, tokenizers, and so on ([View Highlight](https://read.readwise.io/read/01gvp27rk8s6px2d6was5b67av))
- We thought it would be interesting to consolidate these different parts and demonstrate how to build an open-domain question-answering serving system with Vespa.ai that achieves state-of-the-art accuracy. ([View Highlight](https://read.readwise.io/read/01gvp28gav3f7qq1rjw8gnnz92))
- Vespa is designed as a highly performant and scalable production-ready system. Thus, it offers a simplified path to deployment in production without coping with the complexity of maintaining many different subsystems. That makes Vespa an attractive package. ([View Highlight](https://read.readwise.io/read/01gvp290ygrrqe4gpb07r33dd6))
- • Fast approximate-nearest neighbors for semantic, dense vector retrieval.
  • Term-based (BM25) retrieval for sparse vector retrieval.
  • Importing of multiple pre-trained BERT-based models in Vespa for encoding embedding vectors and extracting answers.
  • Custom logic for tokenization and other things. ([View Highlight](https://read.readwise.io/read/01gvp299tr8w4njt20pay2kk6f))
- The Natural Questions benchmark consists of natural language questions and answers. How to retrieve and represent the knowledge required to answer the questions is up to each system. There are two main approaches to this: retrieval and parametric. ([View Highlight](https://read.readwise.io/read/01gvp2a23kvt8gykn19b9p7ahf))
## New highlights added March 17, 2023 at 9:01 PM
- A retrieval-based question answering system typically stores its “knowledge” in an information retrieval system. This can be sentences, paragraphs, or entire documents. ([View Highlight](https://read.readwise.io/read/01gvqy2z910vjwbhvg9vebayna))
- The retriever is responsible for generating a set of candidate passages. Since the subsequent reader component is expensive to evaluate, it is crucial to have an effective retrieval mechanism ([View Highlight](https://read.readwise.io/read/01gvqy3gqgw6v7vkxfj3ny6224))
- The number of potential terms in a vocabulary can be vast indeed. The basic idea behind embedding vectors is to compress this high dimensional sparse vector to a much smaller dense vector where most dimensions contain a non-zero value. This has the effect of projecting a query or document vector into a lower-dimensional space. ([View Highlight](https://read.readwise.io/read/01gvqy4g2w29vxxr65m82k0n13))
- he DPR paper uses two BERT models to encode text: one for encoding queries and one for encoding documents. The two models are trained simultaneously in a two-tower configuration to maximize the dot product for passages likely to answer the question. ([View Highlight](https://read.readwise.io/read/01gvqy4vx490nzvggesdvskc30))
- we trade accuracy for efficiency in what is called approximate nearest neighbors (ANN). ([View Highlight](https://read.readwise.io/read/01gvqy56drdbmmh58xgarfaw8w))
- . HNSW is based on graph structures, is efficient, and has an attractive property where the graph can be incrementally built at runtime. ([View Highlight](https://read.readwise.io/read/01gvqy5np77bgkpj1rnmec5h1k))
- Retrieval based on semantic embeddings complements term-based retrieval well. Semantically similar documents can be recalled even though they don’t contain the exact same terms. Unlike the bag-of-words approach for term-based retrieval, word order can provide additional context. Historically, however, term-based retrieval has outperformed semantic embeddings on question answering problems, but the DPR paper shows that dense retrieval can be vastly improved if the encoding has specifically been trained to the task. ([View Highlight](https://read.readwise.io/read/01gvqy6q0z0229tjcsncdtyrnk))
- While the retriever component’s job is to produce a set of candidate passages that hopefully contain the answer to the question, the reader extracts the passages’ actual answer. ([View Highlight](https://read.readwise.io/read/01gvqy7jn27jdtwj9rcges8y5p))
- Due to BERT models’ full attention mechanism, evaluation time increases quadratically with sequence length. So a reasonable balance must be struck, and BERT-based models use a WordPiece or similar algorithm to split less common words into subwords. ([View Highlight](https://read.readwise.io/read/01gvqy84kx3sjjd5pqak40k8av))
- To extract the final answer, the passage that produced the largest relevance score is used. The two other outputs of the model are probabilities for each token of being a start token and an end token. The final answer is chosen by finding the span with the largest sum of start probability and end probability. ([View Highlight](https://read.readwise.io/read/01gvqybfs9kf32n8v4dnt9cffx))

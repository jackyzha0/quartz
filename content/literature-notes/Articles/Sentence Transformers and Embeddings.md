---
author: [[Pinecone]]
title: "Sentence Transformers and Embeddings"
tags: 
- articles
- literature-note
---
# Sentence Transformers and Embeddings

![rw-book-cover](https://www.pinecone.io/images/sentence-embeddings-1.jpg)

## Metadata
- Author: [[Pinecone]]
- Full Title: Sentence Transformers and Embeddings
- Category: #articles
- URL: https://www.pinecone.io/learn/sentence-embeddings/

## Highlights
- The [dense embeddings](https://www.pinecone.io/learn/dense-vector-embeddings-nlp/) created by transformer models are so much richer in information that we get massive performance benefits despite using the same final outward layers. ([View Highlight](https://read.readwise.io/read/01gt9v4q1vjr6f309nen6rfy4t))
- **Semantic search** — information retrieval (IR) using semantic meaning. Given a set of sentences, we can search using a *‘query’* sentence and identify the most similar records. Enables search to be performed on concepts (rather than specific words). ([View Highlight](https://read.readwise.io/read/01gt9v5001d24g4em7ggwtb35r))
- In *machine translation*, we would find [encoder-decoder networks](https://machinelearningmastery.com/encoder-decoder-recurrent-neural-network-models-neural-machine-translation/). The first model for *encoding* the original language to a *context vector*, and a second model for *decoding* this into the target language.
  ![Encoder decoder bottleneck](https://d33wubrfki0l68.cloudfront.net/68304720e137ea713a3e69c2a6b4c330ad2e9ebd/2d043/images/sentence-embeddings-2.jpg) Encoder-decoder architecture with the single context vector shared between the two models, this acts as an information bottleneck as *all* information must be passed through this point.
  The problem here is that we create an *information bottleneck* between the two models. We’re creating a massive amount of information over multiple time steps and trying to squeeze it all through a single connection. This limits the encoder-decoder performance because much of the information produced by the encoder is lost before reaching the decoder. ([View Highlight](https://read.readwise.io/read/01gt9v60ggr0ywdre2qrynnaqf))
- ransformer models had one issue when building sentence vectors: Transformers work using word or *token*-level embeddings, *not* sentence-level embeddings.
  Before sentence transformers, the approach to calculating *accurate* sentence similarity with BERT was to use a cross-encoder structure. This meant that we would pass two sentences to BERT, add a classification head to the top of BERT — and use this to output a similarity score. ([View Highlight](https://read.readwise.io/read/01gt9va9dadn748r0dh2jnef1p))
- The cross-encoder network does produce very accurate similarity scores (better than SBERT), but it’s *not scalable*. I ([View Highlight](https://read.readwise.io/read/01gt9vaj4ene20ryca3fh3skhf))
- Ideally, we need to pre-compute sentence vectors that can be stored and then used whenever required. If these vector representations are good, all we need to do is calculate the cosine similarity between each.
  With the original BERT (and other transformers), we can build a sentence embedding by averaging the values across all token embeddings output by BERT (if we input 512 tokens, we output 512 embeddings). Alternatively, we can use the output of the first `[CLS]` token (a BERT-specific token whose output embedding is used in classification tasks). ([View Highlight](https://read.readwise.io/read/01gt9vbdbq5bspmxyy77dj3sg4))
- **The solution** to this lack of an accurate model *with* reasonable latency was designed by Nils Reimers and Iryna Gurevych in 2019 with the introduction of sentence-BERT (SBERT) and the `sentence-transformers` library. ([View Highlight](https://read.readwise.io/read/01gt9vby1e7h8sdky900gbp2kx))
- Finding the most similar sentence pair from 10K sentences took 65 hours with BERT. With SBERT, embeddings are created in ~5 seconds and compared with cosine similarity in ~0.01 seconds. ([View Highlight](https://read.readwise.io/read/01gt9vckjemv9b3ft51cv4hdbc))
- The fastest and easiest way to begin working with sentence transformers is through the `sentence-transformers` library created by the creators of SBERT. We can install it with `pip`. ([View Highlight](https://read.readwise.io/read/01gt9vgymnfj7zc7st7xhqat4e))
- Although we returned good results from the SBERT model, many more sentence transformer models have since been built. Many of which we can find in the `sentence-transformers` library. ([View Highlight](https://read.readwise.io/read/01gt9vhxqr46jhyjgr8mb83s16))

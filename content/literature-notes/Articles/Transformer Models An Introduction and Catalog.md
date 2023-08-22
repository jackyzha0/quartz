---
author: [[AI, software, tech, and people, not in that order... by X]]
title: "Transformer Models: An Introduction and Catalog"
tags: 
- articles
- literature-note
---
# Transformer Models: An Introduction and Catalog

![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article0.00998d930354.png)

## Metadata
- Author: [[AI, software, tech, and people, not in that order... by X]]
- Full Title: Transformer Models: An Introduction and Catalog
- Category: #articles
- URL: https://amatriain.net/blog/transformer-models-an-introduction-and-catalog-2d1e9039f376/

## Highlights
- Transformers are a class of deep learning models that are defined by some architectural traits. They were first introduced in the now famous [Attention is All you Need](https://arxiv.org/abs/1706.03762) paper by Google researchers in 2017 (the paper has accumulated a whooping 38k citations in only 5 years) and associated [blog post](https://ai.googleblog.com/2017/08/transformer-novel-neural-network.html). ([View Highlight](https://read.readwise.io/read/01gr3n6ernt5z0vternwwjdav3))
- The Transformer architecture is a specific instance of the [encoder-decoder models](https://machinelearningmastery.com/encoder-decoder-long-short-term-memory-networks/) that had become popular just over the 2–3 years prior. Up until that point however, attention was just one of the mechanisms used by these models, which were mostly based on LSTM (Long Short Term Memory) and other RNN (Recurrent Neural Networks) variations. The key insight of the Transformers paper was that, as the title implies, attention could be used as the only mechanism to derive dependencies between input and output. ([View Highlight](https://read.readwise.io/read/01gr3n6gp4ett44parxp9atn9b))
- ![](https://amatriain.net/blog/images/02-02.png) ([View Highlight](https://read.readwise.io/read/01gr3n6mt148859yrdd70hcsxf))
- A generic encoder/decoder architecture is made up of two models. The encoder takes the input and encodes it into a fixed-length vector. The decoder takes that vector and decodes it into the output sequence. The encoder and decoder are jointly trained to minimize the conditional log-likelihood. Once trained the encoder/decoder can generate an output given an input sequence or can score a pair of input/output sequences. ([View Highlight](https://read.readwise.io/read/01gr3n8nw20y7ajxcesdrghgcx))
- n the case of the original Transformer architecture, both encoder and decoder had 6 identical layers. In each of those 6 layers the Encoder has two sub layers: a multi-head attention layer, and a simple feed forward network. Each sublayer has a residual connection and a layer normalization. The output size of the Encoder is 512. The Decoder adds a third sublayer, which is another multi-head attention layer over the output of the Encoder. Besides, the other multi-head layer in the decoder is masked to prevent attention to subsequent positions. ([View Highlight](https://read.readwise.io/read/01gr3n9m9h1r1hft2s4e6qjns5))
- t is clear from the description above that the only “exotic” elements of the model architecture are the multi-headed attention, but, as described above, that is where the whole power of the model lies ([View Highlight](https://read.readwise.io/read/01gr3nap0873cpqq76ag1wrpky))
- An attention function is a mapping between a query and a set of key-value pairs to an output. ([View Highlight](https://read.readwise.io/read/01gr3nbj85qnq00xc34bd6h9wr))
- Transformers use multi-headed attention, which is a parallel computation of a specific attention function called scaled dot-product attention. ([View Highlight](https://read.readwise.io/read/01gr3nbwyt3ess4zefya12acg7))
---
author: [[AI, software, tech, and people, not in that order... by X]]
title: "Transformer Models: An Introduction and Catalog"
tags: 
- articles
- literature-note
---
# Transformer Models: An Introduction and Catalog

![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article0.00998d930354.png)

## Metadata
- Author: [[AI, software, tech, and people, not in that order... by X]]
- Full Title: Transformer Models: An Introduction and Catalog
- Category: #articles
- URL: https://amatriain.net/blog/transformer-models-an-introduction-and-catalog-2d1e9039f376/

## Highlights
- Transformers are a class of deep learning models that are defined by some architectural traits. They were first introduced in the now famous [Attention is All you Need](https://arxiv.org/abs/1706.03762) paper by Google researchers in 2017 (the paper has accumulated a whooping 38k citations in only 5 years) and associated [blog post](https://ai.googleblog.com/2017/08/transformer-novel-neural-network.html). ([View Highlight](https://read.readwise.io/read/01gr3n6ernt5z0vternwwjdav3))
- The Transformer architecture is a specific instance of the [encoder-decoder models](https://machinelearningmastery.com/encoder-decoder-long-short-term-memory-networks/) that had become popular just over the 2–3 years prior. Up until that point however, attention was just one of the mechanisms used by these models, which were mostly based on LSTM (Long Short Term Memory) and other RNN (Recurrent Neural Networks) variations. The key insight of the Transformers paper was that, as the title implies, attention could be used as the only mechanism to derive dependencies between input and output. ([View Highlight](https://read.readwise.io/read/01gr3n6gp4ett44parxp9atn9b))
- ![](https://amatriain.net/blog/images/02-02.png) ([View Highlight](https://read.readwise.io/read/01gr3n6mt148859yrdd70hcsxf))
- A generic encoder/decoder architecture is made up of two models. The encoder takes the input and encodes it into a fixed-length vector. The decoder takes that vector and decodes it into the output sequence. The encoder and decoder are jointly trained to minimize the conditional log-likelihood. Once trained the encoder/decoder can generate an output given an input sequence or can score a pair of input/output sequences. ([View Highlight](https://read.readwise.io/read/01gr3n8nw20y7ajxcesdrghgcx))
- n the case of the original Transformer architecture, both encoder and decoder had 6 identical layers. In each of those 6 layers the Encoder has two sub layers: a multi-head attention layer, and a simple feed forward network. Each sublayer has a residual connection and a layer normalization. The output size of the Encoder is 512. The Decoder adds a third sublayer, which is another multi-head attention layer over the output of the Encoder. Besides, the other multi-head layer in the decoder is masked to prevent attention to subsequent positions. ([View Highlight](https://read.readwise.io/read/01gr3n9m9h1r1hft2s4e6qjns5))
- t is clear from the description above that the only “exotic” elements of the model architecture are the multi-headed attention, but, as described above, that is where the whole power of the model lies ([View Highlight](https://read.readwise.io/read/01gr3nap0873cpqq76ag1wrpky))
- An attention function is a mapping between a query and a set of key-value pairs to an output. ([View Highlight](https://read.readwise.io/read/01gr3nbj85qnq00xc34bd6h9wr))
- Transformers use multi-headed attention, which is a parallel computation of a specific attention function called scaled dot-product attention. ([View Highlight](https://read.readwise.io/read/01gr3nbwyt3ess4zefya12acg7))
---
author: [[AI, software, tech, and people, not in that order... by X]]
title: "Transformer Models: An Introduction and Catalog"
tags: 
- articles
- literature-note
---
# Transformer Models: An Introduction and Catalog

![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article0.00998d930354.png)

## Metadata
- Author: [[AI, software, tech, and people, not in that order... by X]]
- Full Title: Transformer Models: An Introduction and Catalog
- Category: #articles
- URL: https://amatriain.net/blog/transformer-models-an-introduction-and-catalog-2d1e9039f376/

## Highlights
- Transformers are a class of deep learning models that are defined by some architectural traits. They were first introduced in the now famous [Attention is All you Need](https://arxiv.org/abs/1706.03762) paper by Google researchers in 2017 (the paper has accumulated a whooping 38k citations in only 5 years) and associated [blog post](https://ai.googleblog.com/2017/08/transformer-novel-neural-network.html). ([View Highlight](https://read.readwise.io/read/01gr3n6ernt5z0vternwwjdav3))
- The Transformer architecture is a specific instance of the [encoder-decoder models](https://machinelearningmastery.com/encoder-decoder-long-short-term-memory-networks/) that had become popular just over the 2–3 years prior. Up until that point however, attention was just one of the mechanisms used by these models, which were mostly based on LSTM (Long Short Term Memory) and other RNN (Recurrent Neural Networks) variations. The key insight of the Transformers paper was that, as the title implies, attention could be used as the only mechanism to derive dependencies between input and output. ([View Highlight](https://read.readwise.io/read/01gr3n6gp4ett44parxp9atn9b))
- ![](https://amatriain.net/blog/images/02-02.png) ([View Highlight](https://read.readwise.io/read/01gr3n6mt148859yrdd70hcsxf))
- A generic encoder/decoder architecture is made up of two models. The encoder takes the input and encodes it into a fixed-length vector. The decoder takes that vector and decodes it into the output sequence. The encoder and decoder are jointly trained to minimize the conditional log-likelihood. Once trained the encoder/decoder can generate an output given an input sequence or can score a pair of input/output sequences. ([View Highlight](https://read.readwise.io/read/01gr3n8nw20y7ajxcesdrghgcx))
- n the case of the original Transformer architecture, both encoder and decoder had 6 identical layers. In each of those 6 layers the Encoder has two sub layers: a multi-head attention layer, and a simple feed forward network. Each sublayer has a residual connection and a layer normalization. The output size of the Encoder is 512. The Decoder adds a third sublayer, which is another multi-head attention layer over the output of the Encoder. Besides, the other multi-head layer in the decoder is masked to prevent attention to subsequent positions. ([View Highlight](https://read.readwise.io/read/01gr3n9m9h1r1hft2s4e6qjns5))
- t is clear from the description above that the only “exotic” elements of the model architecture are the multi-headed attention, but, as described above, that is where the whole power of the model lies ([View Highlight](https://read.readwise.io/read/01gr3nap0873cpqq76ag1wrpky))
- An attention function is a mapping between a query and a set of key-value pairs to an output. ([View Highlight](https://read.readwise.io/read/01gr3nbj85qnq00xc34bd6h9wr))
- Transformers use multi-headed attention, which is a parallel computation of a specific attention function called scaled dot-product attention. ([View Highlight](https://read.readwise.io/read/01gr3nbwyt3ess4zefya12acg7))
---
author: [[AI, software, tech, and people, not in that order... by X]]
title: "Transformer Models: An Introduction and Catalog"
tags: 
- articles
- literature-note
---
# Transformer Models: An Introduction and Catalog

![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article0.00998d930354.png)

## Metadata
- Author: [[AI, software, tech, and people, not in that order... by X]]
- Full Title: Transformer Models: An Introduction and Catalog
- Category: #articles
- URL: https://amatriain.net/blog/transformer-models-an-introduction-and-catalog-2d1e9039f376/

## Highlights
- Transformers are a class of deep learning models that are defined by some architectural traits. They were first introduced in the now famous [Attention is All you Need](https://arxiv.org/abs/1706.03762) paper by Google researchers in 2017 (the paper has accumulated a whooping 38k citations in only 5 years) and associated [blog post](https://ai.googleblog.com/2017/08/transformer-novel-neural-network.html). ([View Highlight](https://read.readwise.io/read/01gr3n6ernt5z0vternwwjdav3))
- The Transformer architecture is a specific instance of the [encoder-decoder models](https://machinelearningmastery.com/encoder-decoder-long-short-term-memory-networks/) that had become popular just over the 2–3 years prior. Up until that point however, attention was just one of the mechanisms used by these models, which were mostly based on LSTM (Long Short Term Memory) and other RNN (Recurrent Neural Networks) variations. The key insight of the Transformers paper was that, as the title implies, attention could be used as the only mechanism to derive dependencies between input and output. ([View Highlight](https://read.readwise.io/read/01gr3n6gp4ett44parxp9atn9b))
- ![](https://amatriain.net/blog/images/02-02.png) ([View Highlight](https://read.readwise.io/read/01gr3n6mt148859yrdd70hcsxf))
- A generic encoder/decoder architecture is made up of two models. The encoder takes the input and encodes it into a fixed-length vector. The decoder takes that vector and decodes it into the output sequence. The encoder and decoder are jointly trained to minimize the conditional log-likelihood. Once trained the encoder/decoder can generate an output given an input sequence or can score a pair of input/output sequences. ([View Highlight](https://read.readwise.io/read/01gr3n8nw20y7ajxcesdrghgcx))
- n the case of the original Transformer architecture, both encoder and decoder had 6 identical layers. In each of those 6 layers the Encoder has two sub layers: a multi-head attention layer, and a simple feed forward network. Each sublayer has a residual connection and a layer normalization. The output size of the Encoder is 512. The Decoder adds a third sublayer, which is another multi-head attention layer over the output of the Encoder. Besides, the other multi-head layer in the decoder is masked to prevent attention to subsequent positions. ([View Highlight](https://read.readwise.io/read/01gr3n9m9h1r1hft2s4e6qjns5))
- t is clear from the description above that the only “exotic” elements of the model architecture are the multi-headed attention, but, as described above, that is where the whole power of the model lies ([View Highlight](https://read.readwise.io/read/01gr3nap0873cpqq76ag1wrpky))
- An attention function is a mapping between a query and a set of key-value pairs to an output. ([View Highlight](https://read.readwise.io/read/01gr3nbj85qnq00xc34bd6h9wr))
- Transformers use multi-headed attention, which is a parallel computation of a specific attention function called scaled dot-product attention. ([View Highlight](https://read.readwise.io/read/01gr3nbwyt3ess4zefya12acg7))

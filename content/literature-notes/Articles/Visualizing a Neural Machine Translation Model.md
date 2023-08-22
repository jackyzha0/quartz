---
author: [[Jay Alammar]]
title: "Visualizing a Neural Machine Translation Model"
tags: 
- articles
- literature-note
---
# Visualizing a Neural Machine Translation Model

![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article1.be68295a7e40.png)

## Metadata
- Author: [[Jay Alammar]]
- Full Title: Visualizing a Neural Machine Translation Model
- Category: #articles
- URL: https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/

## Highlights
- Sequence-to-sequence models are deep learning models that have achieved a lot of success in tasks like machine translation, text summarization, and image captioning ([View Highlight](https://read.readwise.io/read/01gr3nv5vttyncanrptep48jnz))
- A sequence-to-sequence model is a model that takes a sequence of items (words, letters, features of an images…etc) and outputs another sequence of items. ([View Highlight](https://read.readwise.io/read/01gr3njgkdgd6y9frntw9jxhf1))
- Under the hood, the model is composed of an encoder and a decoder.
  The encoder processes each item in the input sequence, it compiles the information it captures into a vector (called the context). After processing the entire input sequence, the encoder sends the context over to the decoder, which begins producing the output sequence item by item. ([View Highlight](https://read.readwise.io/read/01gr3nm5vg4dnv831j7dqytxrw))
- The context is a vector (an array of numbers, basically) in the case of machine translation. The encoder and decoder tend to both be recurrent neural networks ([View Highlight](https://read.readwise.io/read/01gr3nmy39nha0ggw7mnkf0pa5))
- You can set the size of the context vector when you set up your model. It is basically the number of hidden units in the encoder RNN. These visualizations show a vector of size 4, but in real world applications the context vector would be of a size like 256, 512, or 1024. ([View Highlight](https://read.readwise.io/read/01gr3nnhctxxw7npj11y72x88w))
- RNN takes two inputs at each time step: an input (in the case of the encoder, one word from the input sentence), and a hidden state. The word, however, needs to be represented by a vector. To transform a word into a vector, we turn to the class of methods called “[word embedding](https://machinelearningmastery.com/what-are-word-embeddings/)” algorithms. ([View Highlight](https://read.readwise.io/read/01gr3nphycgsrkr71be5r59p9a))
- The next RNN step takes the second input vector and hidden state #1 to create the output of that time step. ([View Highlight](https://read.readwise.io/read/01gr3pdrygrfvtjz0eh0ysd8q7))
- each pulse for the encoder or decoder is that RNN processing its inputs and generating an output for that time step. Since the encoder and decoder are both RNNs, each time step one of the RNNs does some processing, it updates its hidden state based on its inputs and previous inputs it has seen ([View Highlight](https://read.readwise.io/read/01gr3pgaqdtpdzq394war17qy2))
- Notice how the last hidden state is actually the context we pass along to the decoder. ([View Highlight](https://read.readwise.io/read/01gr3pgh3tjyzyyttfv3gzbdkh))
- The decoder also maintains a hidden state that it passes from one time step to the next ([View Highlight](https://read.readwise.io/read/01gr3ph1qrd5mfrcgxf931r1n1))
- The context vector turned out to be a bottleneck for these types of models. It made it challenging for the models to deal with long sentences. A solution was proposed in [Bahdanau et al., 2014](https://arxiv.org/abs/1409.0473) and [Luong et al., 2015](https://arxiv.org/abs/1508.04025). These papers introduced and refined a technique called “Attention”, which highly improved the quality of machine translation systems. ([View Highlight](https://read.readwise.io/read/01gr3pjqrvpfw11cff1zanafyg))
- Attention allows the model to focus on the relevant parts of the input sequence as needed. ([View Highlight](https://read.readwise.io/read/01gr3pmn7ntadgvqb3hwjnzf9g))
- At time step 7, the attention mechanism enables the decoder to focus on the word "étudiant" ("student" in french) before it generates the English translation. This ability to amplify the signal from the relevant part of the input sequence makes attention models produce better results than models without attention. ([View Highlight](https://read.readwise.io/read/01gr3pq25bkrqfpk9rb9pszx6p))
- An attention model differs from a classic sequence-to-sequence model in two main ways:
  First, the encoder passes a lot more data to the decoder. Instead of passing the last hidden state of the encoding stage, the encoder passes *all* the hidden states to the decoder: ([View Highlight](https://read.readwise.io/read/01gr3prcswwfmn6r2cv56e7jew))
---
author: [[Jay Alammar]]
title: "Visualizing a Neural Machine Translation Model"
tags: 
- articles
- literature-note
---
# Visualizing a Neural Machine Translation Model

![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article1.be68295a7e40.png)

## Metadata
- Author: [[Jay Alammar]]
- Full Title: Visualizing a Neural Machine Translation Model
- Category: #articles
- URL: https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/

## Highlights
- Sequence-to-sequence models are deep learning models that have achieved a lot of success in tasks like machine translation, text summarization, and image captioning ([View Highlight](https://read.readwise.io/read/01gr3nv5vttyncanrptep48jnz))
- A sequence-to-sequence model is a model that takes a sequence of items (words, letters, features of an images…etc) and outputs another sequence of items. ([View Highlight](https://read.readwise.io/read/01gr3njgkdgd6y9frntw9jxhf1))
- Under the hood, the model is composed of an encoder and a decoder.
  The encoder processes each item in the input sequence, it compiles the information it captures into a vector (called the context). After processing the entire input sequence, the encoder sends the context over to the decoder, which begins producing the output sequence item by item. ([View Highlight](https://read.readwise.io/read/01gr3nm5vg4dnv831j7dqytxrw))
- The context is a vector (an array of numbers, basically) in the case of machine translation. The encoder and decoder tend to both be recurrent neural networks ([View Highlight](https://read.readwise.io/read/01gr3nmy39nha0ggw7mnkf0pa5))
- You can set the size of the context vector when you set up your model. It is basically the number of hidden units in the encoder RNN. These visualizations show a vector of size 4, but in real world applications the context vector would be of a size like 256, 512, or 1024. ([View Highlight](https://read.readwise.io/read/01gr3nnhctxxw7npj11y72x88w))
- RNN takes two inputs at each time step: an input (in the case of the encoder, one word from the input sentence), and a hidden state. The word, however, needs to be represented by a vector. To transform a word into a vector, we turn to the class of methods called “[word embedding](https://machinelearningmastery.com/what-are-word-embeddings/)” algorithms. ([View Highlight](https://read.readwise.io/read/01gr3nphycgsrkr71be5r59p9a))
- The next RNN step takes the second input vector and hidden state #1 to create the output of that time step. ([View Highlight](https://read.readwise.io/read/01gr3pdrygrfvtjz0eh0ysd8q7))
- each pulse for the encoder or decoder is that RNN processing its inputs and generating an output for that time step. Since the encoder and decoder are both RNNs, each time step one of the RNNs does some processing, it updates its hidden state based on its inputs and previous inputs it has seen ([View Highlight](https://read.readwise.io/read/01gr3pgaqdtpdzq394war17qy2))
- Notice how the last hidden state is actually the context we pass along to the decoder. ([View Highlight](https://read.readwise.io/read/01gr3pgh3tjyzyyttfv3gzbdkh))
- The decoder also maintains a hidden state that it passes from one time step to the next ([View Highlight](https://read.readwise.io/read/01gr3ph1qrd5mfrcgxf931r1n1))
- The context vector turned out to be a bottleneck for these types of models. It made it challenging for the models to deal with long sentences. A solution was proposed in [Bahdanau et al., 2014](https://arxiv.org/abs/1409.0473) and [Luong et al., 2015](https://arxiv.org/abs/1508.04025). These papers introduced and refined a technique called “Attention”, which highly improved the quality of machine translation systems. ([View Highlight](https://read.readwise.io/read/01gr3pjqrvpfw11cff1zanafyg))
- Attention allows the model to focus on the relevant parts of the input sequence as needed. ([View Highlight](https://read.readwise.io/read/01gr3pmn7ntadgvqb3hwjnzf9g))
- At time step 7, the attention mechanism enables the decoder to focus on the word "étudiant" ("student" in french) before it generates the English translation. This ability to amplify the signal from the relevant part of the input sequence makes attention models produce better results than models without attention. ([View Highlight](https://read.readwise.io/read/01gr3pq25bkrqfpk9rb9pszx6p))
- An attention model differs from a classic sequence-to-sequence model in two main ways:
  First, the encoder passes a lot more data to the decoder. Instead of passing the last hidden state of the encoding stage, the encoder passes *all* the hidden states to the decoder: ([View Highlight](https://read.readwise.io/read/01gr3prcswwfmn6r2cv56e7jew))
---
author: [[Jay Alammar]]
title: "Visualizing a Neural Machine Translation Model"
tags: 
- articles
- literature-note
---
# Visualizing a Neural Machine Translation Model

![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article1.be68295a7e40.png)

## Metadata
- Author: [[Jay Alammar]]
- Full Title: Visualizing a Neural Machine Translation Model
- Category: #articles
- URL: https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/

## Highlights
- Sequence-to-sequence models are deep learning models that have achieved a lot of success in tasks like machine translation, text summarization, and image captioning ([View Highlight](https://read.readwise.io/read/01gr3nv5vttyncanrptep48jnz))
- A sequence-to-sequence model is a model that takes a sequence of items (words, letters, features of an images…etc) and outputs another sequence of items. ([View Highlight](https://read.readwise.io/read/01gr3njgkdgd6y9frntw9jxhf1))
- Under the hood, the model is composed of an encoder and a decoder.
  The encoder processes each item in the input sequence, it compiles the information it captures into a vector (called the context). After processing the entire input sequence, the encoder sends the context over to the decoder, which begins producing the output sequence item by item. ([View Highlight](https://read.readwise.io/read/01gr3nm5vg4dnv831j7dqytxrw))
- The context is a vector (an array of numbers, basically) in the case of machine translation. The encoder and decoder tend to both be recurrent neural networks ([View Highlight](https://read.readwise.io/read/01gr3nmy39nha0ggw7mnkf0pa5))
- You can set the size of the context vector when you set up your model. It is basically the number of hidden units in the encoder RNN. These visualizations show a vector of size 4, but in real world applications the context vector would be of a size like 256, 512, or 1024. ([View Highlight](https://read.readwise.io/read/01gr3nnhctxxw7npj11y72x88w))
- RNN takes two inputs at each time step: an input (in the case of the encoder, one word from the input sentence), and a hidden state. The word, however, needs to be represented by a vector. To transform a word into a vector, we turn to the class of methods called “[word embedding](https://machinelearningmastery.com/what-are-word-embeddings/)” algorithms. ([View Highlight](https://read.readwise.io/read/01gr3nphycgsrkr71be5r59p9a))
- The next RNN step takes the second input vector and hidden state #1 to create the output of that time step. ([View Highlight](https://read.readwise.io/read/01gr3pdrygrfvtjz0eh0ysd8q7))
- each pulse for the encoder or decoder is that RNN processing its inputs and generating an output for that time step. Since the encoder and decoder are both RNNs, each time step one of the RNNs does some processing, it updates its hidden state based on its inputs and previous inputs it has seen ([View Highlight](https://read.readwise.io/read/01gr3pgaqdtpdzq394war17qy2))
- Notice how the last hidden state is actually the context we pass along to the decoder. ([View Highlight](https://read.readwise.io/read/01gr3pgh3tjyzyyttfv3gzbdkh))
- The decoder also maintains a hidden state that it passes from one time step to the next ([View Highlight](https://read.readwise.io/read/01gr3ph1qrd5mfrcgxf931r1n1))
- The context vector turned out to be a bottleneck for these types of models. It made it challenging for the models to deal with long sentences. A solution was proposed in [Bahdanau et al., 2014](https://arxiv.org/abs/1409.0473) and [Luong et al., 2015](https://arxiv.org/abs/1508.04025). These papers introduced and refined a technique called “Attention”, which highly improved the quality of machine translation systems. ([View Highlight](https://read.readwise.io/read/01gr3pjqrvpfw11cff1zanafyg))
- Attention allows the model to focus on the relevant parts of the input sequence as needed. ([View Highlight](https://read.readwise.io/read/01gr3pmn7ntadgvqb3hwjnzf9g))
- At time step 7, the attention mechanism enables the decoder to focus on the word "étudiant" ("student" in french) before it generates the English translation. This ability to amplify the signal from the relevant part of the input sequence makes attention models produce better results than models without attention. ([View Highlight](https://read.readwise.io/read/01gr3pq25bkrqfpk9rb9pszx6p))
- An attention model differs from a classic sequence-to-sequence model in two main ways:
  First, the encoder passes a lot more data to the decoder. Instead of passing the last hidden state of the encoding stage, the encoder passes *all* the hidden states to the decoder: ([View Highlight](https://read.readwise.io/read/01gr3prcswwfmn6r2cv56e7jew))
---
author: [[Jay Alammar]]
title: "Visualizing a Neural Machine Translation Model"
tags: 
- articles
- literature-note
---
# Visualizing a Neural Machine Translation Model

![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article1.be68295a7e40.png)

## Metadata
- Author: [[Jay Alammar]]
- Full Title: Visualizing a Neural Machine Translation Model
- Category: #articles
- URL: https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/

## Highlights
- Sequence-to-sequence models are deep learning models that have achieved a lot of success in tasks like machine translation, text summarization, and image captioning ([View Highlight](https://read.readwise.io/read/01gr3nv5vttyncanrptep48jnz))
- A sequence-to-sequence model is a model that takes a sequence of items (words, letters, features of an images…etc) and outputs another sequence of items. ([View Highlight](https://read.readwise.io/read/01gr3njgkdgd6y9frntw9jxhf1))
- Under the hood, the model is composed of an encoder and a decoder.
  The encoder processes each item in the input sequence, it compiles the information it captures into a vector (called the context). After processing the entire input sequence, the encoder sends the context over to the decoder, which begins producing the output sequence item by item. ([View Highlight](https://read.readwise.io/read/01gr3nm5vg4dnv831j7dqytxrw))
- The context is a vector (an array of numbers, basically) in the case of machine translation. The encoder and decoder tend to both be recurrent neural networks ([View Highlight](https://read.readwise.io/read/01gr3nmy39nha0ggw7mnkf0pa5))
- You can set the size of the context vector when you set up your model. It is basically the number of hidden units in the encoder RNN. These visualizations show a vector of size 4, but in real world applications the context vector would be of a size like 256, 512, or 1024. ([View Highlight](https://read.readwise.io/read/01gr3nnhctxxw7npj11y72x88w))
- RNN takes two inputs at each time step: an input (in the case of the encoder, one word from the input sentence), and a hidden state. The word, however, needs to be represented by a vector. To transform a word into a vector, we turn to the class of methods called “[word embedding](https://machinelearningmastery.com/what-are-word-embeddings/)” algorithms. ([View Highlight](https://read.readwise.io/read/01gr3nphycgsrkr71be5r59p9a))
- The next RNN step takes the second input vector and hidden state #1 to create the output of that time step. ([View Highlight](https://read.readwise.io/read/01gr3pdrygrfvtjz0eh0ysd8q7))
- each pulse for the encoder or decoder is that RNN processing its inputs and generating an output for that time step. Since the encoder and decoder are both RNNs, each time step one of the RNNs does some processing, it updates its hidden state based on its inputs and previous inputs it has seen ([View Highlight](https://read.readwise.io/read/01gr3pgaqdtpdzq394war17qy2))
- Notice how the last hidden state is actually the context we pass along to the decoder. ([View Highlight](https://read.readwise.io/read/01gr3pgh3tjyzyyttfv3gzbdkh))
- The decoder also maintains a hidden state that it passes from one time step to the next ([View Highlight](https://read.readwise.io/read/01gr3ph1qrd5mfrcgxf931r1n1))
- The context vector turned out to be a bottleneck for these types of models. It made it challenging for the models to deal with long sentences. A solution was proposed in [Bahdanau et al., 2014](https://arxiv.org/abs/1409.0473) and [Luong et al., 2015](https://arxiv.org/abs/1508.04025). These papers introduced and refined a technique called “Attention”, which highly improved the quality of machine translation systems. ([View Highlight](https://read.readwise.io/read/01gr3pjqrvpfw11cff1zanafyg))
- Attention allows the model to focus on the relevant parts of the input sequence as needed. ([View Highlight](https://read.readwise.io/read/01gr3pmn7ntadgvqb3hwjnzf9g))
- At time step 7, the attention mechanism enables the decoder to focus on the word "étudiant" ("student" in french) before it generates the English translation. This ability to amplify the signal from the relevant part of the input sequence makes attention models produce better results than models without attention. ([View Highlight](https://read.readwise.io/read/01gr3pq25bkrqfpk9rb9pszx6p))
- An attention model differs from a classic sequence-to-sequence model in two main ways:
  First, the encoder passes a lot more data to the decoder. Instead of passing the last hidden state of the encoding stage, the encoder passes *all* the hidden states to the decoder: ([View Highlight](https://read.readwise.io/read/01gr3prcswwfmn6r2cv56e7jew))

---
author: [[Jay Alammar]]
title: "The Illustrated Transformer"
tags: 
- articles
- literature-note
---
# The Illustrated Transformer

![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article4.6bc1851654a0.png)

## Metadata
- Author: [[Jay Alammar]]
- Full Title: The Illustrated Transformer
- Category: #articles
- URL: https://jalammar.github.io/illustrated-transformer/

## Highlights
- we will look at **The Transformer** – a model that uses attention to boost the speed with which these models can be trained. ([View Highlight](https://read.readwise.io/read/01gr3qfpcx17bqn1wcn3nejn4e))
- ![](https://jalammar.github.io/images/t/the_transformer_3.png) ([View Highlight](https://read.readwise.io/read/01gr43ffd9t46h1q3f8d4mnqtb))
- ![](https://jalammar.github.io/images/t/The_transformer_encoders_decoders.png) ([View Highlight](https://read.readwise.io/read/01gr43fhhy22e1gh06yr8937x2))
- The encoding component is a stack of encoders (the paper stacks six of them on top of each other – there’s nothing magical about the number six, one can definitely experiment with other arrangements). The decoding component is a stack of decoders of the same number. ([View Highlight](https://read.readwise.io/read/01gr3qk5rmh11jv8tv46g88tj0))
- ![](https://jalammar.github.io/images/t/The_transformer_encoder_decoder_stack.png) ([View Highlight](https://read.readwise.io/read/01gr43f9jzt5sdzyb5ypzdf2yj))
- The encoders are all identical in structure (yet they do not share weights). Each one is broken down into two sub-layers: ([View Highlight](https://read.readwise.io/read/01gr3qrd7fxt1ac4aax6454rbd))
- ![](https://jalammar.github.io/images/t/Transformer_encoder.png) ([View Highlight](https://read.readwise.io/read/01gr43fbszx7j24ha1e5p8zg9d))
- The encoder’s inputs first flow through a self-attention layer – a layer that helps the encoder look at other words in the input sentence as it encodes a specific word. ([View Highlight](https://read.readwise.io/read/01gr3qw4a7944kyzwreqytcgxa))
- The outputs of the self-attention layer are fed to a feed-forward neural network. The exact same feed-forward network is independently applied to each position. ([View Highlight](https://read.readwise.io/read/01gr3qz3249x4007d6d1x8xfw7))
- The decoder has both those layers, but between them is an attention layer that helps the decoder focus on relevant parts of the input sentence (similar what attention does in [seq2seq models](https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/)). ([View Highlight](https://read.readwise.io/read/01gr3qzm559wjvn64wt6dy58h6))
- As is the case in NLP applications in general, we begin by turning each input word into a vector using an [embedding algorithm](https://medium.com/deeper-learning/glossary-of-deep-learning-word-embedding-f90c3cec34ca). ([View Highlight](https://read.readwise.io/read/01gr43bvwwr560weacv3m72s65))
- The embedding only happens in the bottom-most encoder. The abstraction that is common to all the encoders is that they receive a list of vectors each of the size 512 – In the bottom encoder that would be the word embeddings, but in other encoders, it would be the output of the encoder that’s directly below ([View Highlight](https://read.readwise.io/read/01gr43d82ec8nqmyx1ekqz4vsy))
- After embedding the words in our input sequence, each of them flows through each of the two layers of the encoder. ([View Highlight](https://read.readwise.io/read/01gr43dgprrxmmp295nfatw7b8))
- ![](https://jalammar.github.io/images/t/encoder_with_tensors.png) ([View Highlight](https://read.readwise.io/read/01gr43f6g9wexr7kmntykvhkqx))
- Here we begin to see one key property of the Transformer, which is that the word in each position flows through its own path in the encoder. There are dependencies between these paths in the self-attention layer. The feed-forward layer does not have those dependencies, however, and thus the various paths can be executed in parallel while flowing through the feed-forward layer. ([View Highlight](https://read.readwise.io/read/01gr43e1e3sr81vmzed7k31t8c))
- an encoder receives a list of vectors as input. It processes this list by passing these vectors into a ‘self-attention’ layer, then into a feed-forward neural network, then sends out the output upwards to the next encoder. ([View Highlight](https://read.readwise.io/read/01gr43eta1s6v2v9pdpyatfym1))
- ![](https://jalammar.github.io/images/t/encoder_with_tensors_2.png) ([View Highlight](https://read.readwise.io/read/01gr43f21wkg3842np67vch8mj))
- Don’t be fooled by me throwing around the word “self-attention” like it’s a concept everyone should be familiar with. I had personally never came across the concept until reading the Attention is All You Need paper. Let us distill how it works.
  Say the following sentence is an input sentence we want to translate:
  ”`The animal didn't cross the street because it was too tired`”
  What does “it” in this sentence refer to? Is it referring to the street or to the animal? It’s a simple question to a human, but not as simple to an algorithm. ([View Highlight](https://read.readwise.io/read/01gr43g439emrv0ppc47107xe6))
- When the model is processing the word “it”, self-attention allows it to associate “it” with “animal”. ([View Highlight](https://read.readwise.io/read/01gr43gfpbp5215vsfmma0fs0e))
- As the model processes each word (each position in the input sequence), self attention allows it to look at other positions in the input sequence for clues that can help lead to a better encoding for this word. ([View Highlight](https://read.readwise.io/read/01gr43gpw4bc4n7f112ta03hft))
- If you’re familiar with RNNs, think of how maintaining a hidden state allows an RNN to incorporate its representation of previous words/vectors it has processed with the current one it’s processing. Self-attention is the method the Transformer uses to bake the “understanding” of other relevant words into the one we’re currently processing. ([View Highlight](https://read.readwise.io/read/01gr43h3k8ahj564hz5njbse37))
- The **first step** in calculating self-attention is to create three vectors from each of the encoder’s input vectors (in this case, the embedding of each word). So for each word, we create a Query vector, a Key vector, and a Value vector. These vectors are created by multiplying the embedding by three matrices that we trained during the training process. ([View Highlight](https://read.readwise.io/read/01gr43j1j705y3zjy6nrp5ns5v))
- Notice that these new vectors are smaller in dimension than the embedding vector. Their dimensionality is 64, while the embedding and encoder input/output vectors have dimensionality of 512. They don’t HAVE to be smaller, this is an architecture choice to make the computation of multiheaded attention (mostly) constant. ([View Highlight](https://read.readwise.io/read/01gr43jkm0z72sfsdp5262dmsw))
- What are the “query”, “key”, and “value” vectors? 
  They’re abstractions that are useful for calculating and thinking about attention. Once you proceed with reading how attention is calculated below, you’ll know pretty much all you need to know about the role each of these vectors plays.
  The **second step** in calculating self-attention is to calculate a score. Say we’re calculating the self-attention for the first word in this example, “Thinking”. We need to score each word of the input sentence against this word. The score determines how much focus to place on other parts of the input sentence as we encode a word at a certain position. ([View Highlight](https://read.readwise.io/read/01gr43kds63qrdqsk5tw2dhknp))
- The score is calculated by taking the dot product of the query vector with the key vector of the respective word we’re scoring. So if we’re processing the self-attention for the word in position #1, the first score would be the dot product of q1 and k1. The second score would be the dot product of q1 and k2. ([View Highlight](https://read.readwise.io/read/01gr43ksg4fqem6rse31ga8gav))
- ![](https://jalammar.github.io/images/t/transformer_self_attention_score.png) ([View Highlight](https://read.readwise.io/read/01gr43kvr3434ae2v73chyhv9e))
- The **third and fourth steps** are to divide the scores by 8 (the square root of the dimension of the key vectors used in the paper – 64. This leads to having more stable gradients. There could be other possible values here, but this is the default), then pass the result through a softmax operation. Softmax normalizes the scores so they’re all positive and add up to 1. ([View Highlight](https://read.readwise.io/read/01gr43mggpdphmyfpht1a6s0cy))
- ![](https://jalammar.github.io/images/t/self-attention_softmax.png) ([View Highlight](https://read.readwise.io/read/01gr43rg7bw2v9aw5a2hr2f2f8))
- his softmax score determines how much each word will be expressed at this position. Clearly the word at this position will have the highest softmax score, but sometimes it’s useful to attend to another word that is relevant to the current word. ([View Highlight](https://read.readwise.io/read/01gr43n1q3mav0cybysjmsbkt9))
- The **fifth step** is to multiply each value vector by the softmax score (in preparation to sum them up). The intuition here is to keep intact the values of the word(s) we want to focus on, and drown-out irrelevant words (by multiplying them by tiny numbers like 0.001, for example) ([View Highlight](https://read.readwise.io/read/01gr43natm8kn4nej6xgepqh08))
- The **sixth step** is to sum up the weighted value vectors. This produces the output of the self-attention layer at this position (for the first word). ([View Highlight](https://read.readwise.io/read/01gr43r0r605atfm28k8d0qxwc))
- ![](https://jalammar.github.io/images/t/self-attention-output.png) ([View Highlight](https://read.readwise.io/read/01gr43rjb5qjeebyfdqcaftnz2))
- That concludes the self-attention calculation. The resulting vector is one we can send along to the feed-forward neural network. In the actual implementation, however, this calculation is done in matrix form for faster processing. So let’s look at that now that we’ve seen the intuition of the calculation on the word level. ([View Highlight](https://read.readwise.io/read/01gr43r88wb5xxryx9qmqenvgz))
- Matrix Calculation of Self-Attention
  **The first step** is to calculate the Query, Key, and Value matrices. We do that by packing our embeddings into a matrix X, and multiplying it by the weight matrices we’ve trained (WQ, WK, WV). ([View Highlight](https://read.readwise.io/read/01gr43s12mtkh4d0g4pvc8m0w5))
- ![](https://jalammar.github.io/images/t/self-attention-matrix-calculation.png) ([View Highlight](https://read.readwise.io/read/01gr43ry83pv2qkve5h59a8yw7))
- **Finally**, since we’re dealing with matrices, we can condense steps two through six in one formula to calculate the outputs of the self-attention layer.
  ![](https://jalammar.github.io/images/t/self-attention-matrix-calculation-2.png) ([View Highlight](https://read.readwise.io/read/01gr43ssjaecxkvwnz37dejpyy))
- The paper further refined the self-attention layer by adding a mechanism called “multi-headed” attention. This improves the performance of the attention layer in two ways:
  1. It expands the model’s ability to focus on different positions. Yes, in the example above, z1 contains a little bit of every other encoding, but it could be dominated by the actual word itself. If we’re translating a sentence like “The animal didn’t cross the street because it was too tired”, it would be useful to know which word “it” refers to. ([View Highlight](https://read.readwise.io/read/01gr43tgjwvw3dkd7fjx70q6by))
- It gives the attention layer multiple “representation subspaces”. As we’ll see next, with multi-headed attention we have not only one, but multiple sets of Query/Key/Value weight matrices (the Transformer uses eight attention heads, so we end up with eight sets for each encoder/decoder). Each of these sets is randomly initialized. Then, after training, each set is used to project the input embeddings (or vectors from lower encoders/decoders) into a different representation subspace. ([View Highlight](https://read.readwise.io/read/01gr43tvg1gt8wkthajz0f75w2))
- ![](https://jalammar.github.io/images/t/transformer_attention_heads_qkv.png) ([View Highlight](https://read.readwise.io/read/01gr43v18wvm97ydchy62d2fg7))
- f we do the same self-attention calculation we outlined above, just eight different times with different weight matrices, we end up with eight different Z matrices
  ![](https://jalammar.github.io/images/t/transformer_attention_heads_z.png) ([View Highlight](https://read.readwise.io/read/01gr43v47h8vhrd36nkabghtxk))
- This leaves us with a bit of a challenge. The feed-forward layer is not expecting eight matrices – it’s expecting a single matrix (a vector for each word). So we need a way to condense these eight down into a single matrix.
  How do we do that? We concat the matrices then multiply them by an additional weights matrix WO.
  ![](https://jalammar.github.io/images/t/transformer_attention_heads_weight_matrix_o.png) ([View Highlight](https://read.readwise.io/read/01gr43vh72mghvq1ez0345p7tn))
- That’s pretty much all there is to multi-headed self-attention. It’s quite a handful of matrices, I realize. Let me try to put them all in one visual so we can look at them in one place ([View Highlight](https://read.readwise.io/read/01gr43vw9h0v6s4ys2pk44e428))
- ![](https://jalammar.github.io/images/t/transformer_multi-headed_self-attention-recap.png) ([View Highlight](https://read.readwise.io/read/01gr43wyr08hq72r7ntkn6jya2))
- Now that we have touched upon attention heads, let’s revisit our example from before to see where the different attention heads are focusing as we encode the word “it” in our example sentence:
  ![](https://jalammar.github.io/images/t/transformer_self-attention_visualization_2.png) 
  As we encode the word "it", one attention head is focusing most on "the animal", while another is focusing on "tired" -- in a sense, the model's representation of the word "it" bakes in some of the representation of both "animal" and "tired".
  If we add all the attention heads to the picture, however, things can be harder to interpret:
  ![](https://jalammar.github.io/images/t/transformer_self-attention_visualization_3.png) ([View Highlight](https://read.readwise.io/read/01gr43yat77cam7ysnc577vh70))
- One thing that’s missing from the model as we have described it so far is a way to account for the order of the words in the input sequence.
  To address this, the transformer adds a vector to each input embedding. These vectors follow a specific pattern that the model learns, which helps it determine the position of each word, or the distance between different words in the sequence. The intuition here is that adding these values to the embeddings provides meaningful distances between the embedding vectors once they’re projected into Q/K/V vectors and during dot-product attention. ([View Highlight](https://read.readwise.io/read/01gr43yyj61gv31j0syr73xyga))
- ![](https://jalammar.github.io/images/t/transformer_positional_encoding_vectors.png) 
  To give the model a sense of the order of the words, we add positional encoding vectors -- the values of which follow a specific pattern.
  If we assumed the embedding has a dimensionality of 4, the actual positional encodings would look like this:
  ![](https://jalammar.github.io/images/t/transformer_positional_encoding_example.png) ([View Highlight](https://read.readwise.io/read/01gr43znch1bsfjnb2b928qek7))
- One detail in the architecture of the encoder that we need to mention before moving on, is that each sub-layer (self-attention, ffnn) in each encoder has a residual connection around it, and is followed by a [layer-normalization](https://arxiv.org/abs/1607.06450) step.
  ![](https://jalammar.github.io/images/t/transformer_resideual_layer_norm.png) ([View Highlight](https://read.readwise.io/read/01gr440f4v2m98ewn3esstkrv8))
- If we’re to visualize the vectors and the layer-norm operation associated with self attention, it would look like this:
  ![](https://jalammar.github.io/images/t/transformer_resideual_layer_norm_2.png) 
  This goes for the sub-layers of the decoder as well. If we’re to think of a Transformer of 2 stacked encoders and decoders, it would look something like this:
  ![](https://jalammar.github.io/images/t/transformer_resideual_layer_norm_3.png) ([View Highlight](https://read.readwise.io/read/01gr4413g6rgtjkqb5vw6brsbw))
- Now that we’ve covered most of the concepts on the encoder side, we basically know how the components of decoders work as well. But let’s take a look at how they work together.
  The encoder start by processing the input sequence. The output of the top encoder is then transformed into a set of attention vectors K and V. These are to be used by each decoder in its “encoder-decoder attention” layer which helps the decoder focus on appropriate places in the input sequence: ([View Highlight](https://read.readwise.io/read/01gr441fp3bt80av1s3zq5df63))
- ![](https://jalammar.github.io/images/t/transformer_decoding_1.gif) ([View Highlight](https://read.readwise.io/read/01gr441tgtwqrtp61jmjh4gr26))
- The following steps repeat the process until a special symbol is reached indicating the transformer decoder has completed its output. The output of each step is fed to the bottom decoder in the next time step, and the decoders bubble up their decoding results just like the encoders did. And just like we did with the encoder inputs, we embed and add positional encoding to those decoder inputs to indicate the position of each word.
  ![](https://jalammar.github.io/images/t/transformer_decoding_2.gif) ([View Highlight](https://read.readwise.io/read/01gr4422r1a9ggxktc1bjvk6qf))
- The self attention layers in the decoder operate in a slightly different way than the one in the encoder:
  In the decoder, the self-attention layer is only allowed to attend to earlier positions in the output sequence. This is done by masking future positions (setting them to `-inf`) before the softmax step in the self-attention calculation.
  The “Encoder-Decoder Attention” layer works just like multiheaded self-attention, except it creates its Queries matrix from the layer below it, and takes the Keys and Values matrix from the output of the encoder stack. ([View Highlight](https://read.readwise.io/read/01gr442gq9g1s6t401zvnszsbg))
- The decoder stack outputs a vector of floats. How do we turn that into a word? That’s the job of the final Linear layer which is followed by a Softmax Layer.
  The Linear layer is a simple fully connected neural network that projects the vector produced by the stack of decoders, into a much, much larger vector called a logits vector.
  Let’s assume that our model knows 10,000 unique English words (our model’s “output vocabulary”) that it’s learned from its training dataset. This would make the logits vector 10,000 cells wide – each cell corresponding to the score of a unique word. That is how we interpret the output of the model followed by the Linear layer.
  The softmax layer then turns those scores into probabilities (all positive, all add up to 1.0). The cell with the highest probability is chosen, and the word associated with it is produced as the output for this time step. ([View Highlight](https://read.readwise.io/read/01gr4436kday4y5drby2w9f7tc))
- Now that we’ve covered the entire forward-pass process through a trained Transformer, it would be useful to glance at the intuition of training the model.
  During training, an untrained model would go through the exact same forward pass. But since we are training it on a labeled training dataset, we can compare its output with the actual correct output.
  To visualize this, let’s assume our output vocabulary only contains six words(“a”, “am”, “i”, “thanks”, “student”, and “<eos>” (short for ‘end of sentence’)). ([View Highlight](https://read.readwise.io/read/01gr443x9f8v1vp5wr32c61w5n))
- ![](https://jalammar.github.io/images/t/vocabulary.png) 
  The output vocabulary of our model is created in the preprocessing phase before we even begin training. ([View Highlight](https://read.readwise.io/read/01gr444rwtqjn4t79nrm00egbd))
- Once we define our output vocabulary, we can use a vector of the same width to indicate each word in our vocabulary. This also known as one-hot encoding. So for example, we can indicate the word “am” using the following vector: ([View Highlight](https://read.readwise.io/read/01gr444akq9ps9fbk8fbx68zxy))
- ![](https://jalammar.github.io/images/t/one-hot-vocabulary-example.png) 
  Example: one-hot encoding of our output vocabulary ([View Highlight](https://read.readwise.io/read/01gr444ptpa7ancdtj89zmjjd6))
- The Loss Function
  Say we are training our model. Say it’s our first step in the training phase, and we’re training it on a simple example – translating “merci” into “thanks”.
  What this means, is that we want the output to be a probability distribution indicating the word “thanks”. But since this model is not yet trained, that’s unlikely to happen just yet.
  ![](https://jalammar.github.io/images/t/transformer_logits_output_and_label.png) 
  Since the model's parameters (weights) are all initialized randomly, the (untrained) model produces a probability distribution with arbitrary values for each cell/word. We can compare it with the actual output, then tweak all the model's weights using backpropagation to make the output closer to the desired output. ([View Highlight](https://read.readwise.io/read/01gr445m67n0aw8x514vrk2xb3))
- But note that this is an oversimplified example. More realistically, we’ll use a sentence longer than one word. For example – input: “je suis étudiant” and expected output: “i am a student”. What this really means, is that we want our model to successively output probability distributions where:
  • Each probability distribution is represented by a vector of width vocab_size (6 in our toy example, but more realistically a number like 30,000 or 50,000)
  • The first probability distribution has the highest probability at the cell associated with the word “i”
  • The second probability distribution has the highest probability at the cell associated with the word “am”
  • And so on, until the fifth output distribution indicates ‘`<end of sentence>`’ symbol, which also has a cell associated with it from the 10,000 element vocabulary.
  ![](https://jalammar.github.io/images/t/output_target_probability_distributions.png) 
  The targeted probability distributions we'll train our model against in the training example for one sample sentence. ([View Highlight](https://read.readwise.io/read/01gr446q3wegn465g7kjqfk962))
---
author: [[Jay Alammar]]
title: "The Illustrated Transformer"
tags: 
- articles
- literature-note
---
# The Illustrated Transformer

![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article4.6bc1851654a0.png)

## Metadata
- Author: [[Jay Alammar]]
- Full Title: The Illustrated Transformer
- Category: #articles
- URL: https://jalammar.github.io/illustrated-transformer/

## Highlights
- we will look at **The Transformer** – a model that uses attention to boost the speed with which these models can be trained. ([View Highlight](https://read.readwise.io/read/01gr3qfpcx17bqn1wcn3nejn4e))
- ![](https://jalammar.github.io/images/t/the_transformer_3.png) ([View Highlight](https://read.readwise.io/read/01gr43ffd9t46h1q3f8d4mnqtb))
- ![](https://jalammar.github.io/images/t/The_transformer_encoders_decoders.png) ([View Highlight](https://read.readwise.io/read/01gr43fhhy22e1gh06yr8937x2))
- The encoding component is a stack of encoders (the paper stacks six of them on top of each other – there’s nothing magical about the number six, one can definitely experiment with other arrangements). The decoding component is a stack of decoders of the same number. ([View Highlight](https://read.readwise.io/read/01gr3qk5rmh11jv8tv46g88tj0))
- ![](https://jalammar.github.io/images/t/The_transformer_encoder_decoder_stack.png) ([View Highlight](https://read.readwise.io/read/01gr43f9jzt5sdzyb5ypzdf2yj))
- The encoders are all identical in structure (yet they do not share weights). Each one is broken down into two sub-layers: ([View Highlight](https://read.readwise.io/read/01gr3qrd7fxt1ac4aax6454rbd))
- ![](https://jalammar.github.io/images/t/Transformer_encoder.png) ([View Highlight](https://read.readwise.io/read/01gr43fbszx7j24ha1e5p8zg9d))
- The encoder’s inputs first flow through a self-attention layer – a layer that helps the encoder look at other words in the input sentence as it encodes a specific word. ([View Highlight](https://read.readwise.io/read/01gr3qw4a7944kyzwreqytcgxa))
- The outputs of the self-attention layer are fed to a feed-forward neural network. The exact same feed-forward network is independently applied to each position. ([View Highlight](https://read.readwise.io/read/01gr3qz3249x4007d6d1x8xfw7))
- The decoder has both those layers, but between them is an attention layer that helps the decoder focus on relevant parts of the input sentence (similar what attention does in [seq2seq models](https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/)). ([View Highlight](https://read.readwise.io/read/01gr3qzm559wjvn64wt6dy58h6))
- As is the case in NLP applications in general, we begin by turning each input word into a vector using an [embedding algorithm](https://medium.com/deeper-learning/glossary-of-deep-learning-word-embedding-f90c3cec34ca). ([View Highlight](https://read.readwise.io/read/01gr43bvwwr560weacv3m72s65))
- The embedding only happens in the bottom-most encoder. The abstraction that is common to all the encoders is that they receive a list of vectors each of the size 512 – In the bottom encoder that would be the word embeddings, but in other encoders, it would be the output of the encoder that’s directly below ([View Highlight](https://read.readwise.io/read/01gr43d82ec8nqmyx1ekqz4vsy))
- After embedding the words in our input sequence, each of them flows through each of the two layers of the encoder. ([View Highlight](https://read.readwise.io/read/01gr43dgprrxmmp295nfatw7b8))
- ![](https://jalammar.github.io/images/t/encoder_with_tensors.png) ([View Highlight](https://read.readwise.io/read/01gr43f6g9wexr7kmntykvhkqx))
- Here we begin to see one key property of the Transformer, which is that the word in each position flows through its own path in the encoder. There are dependencies between these paths in the self-attention layer. The feed-forward layer does not have those dependencies, however, and thus the various paths can be executed in parallel while flowing through the feed-forward layer. ([View Highlight](https://read.readwise.io/read/01gr43e1e3sr81vmzed7k31t8c))
- an encoder receives a list of vectors as input. It processes this list by passing these vectors into a ‘self-attention’ layer, then into a feed-forward neural network, then sends out the output upwards to the next encoder. ([View Highlight](https://read.readwise.io/read/01gr43eta1s6v2v9pdpyatfym1))
- ![](https://jalammar.github.io/images/t/encoder_with_tensors_2.png) ([View Highlight](https://read.readwise.io/read/01gr43f21wkg3842np67vch8mj))
- Don’t be fooled by me throwing around the word “self-attention” like it’s a concept everyone should be familiar with. I had personally never came across the concept until reading the Attention is All You Need paper. Let us distill how it works.
  Say the following sentence is an input sentence we want to translate:
  ”`The animal didn't cross the street because it was too tired`”
  What does “it” in this sentence refer to? Is it referring to the street or to the animal? It’s a simple question to a human, but not as simple to an algorithm. ([View Highlight](https://read.readwise.io/read/01gr43g439emrv0ppc47107xe6))
- When the model is processing the word “it”, self-attention allows it to associate “it” with “animal”. ([View Highlight](https://read.readwise.io/read/01gr43gfpbp5215vsfmma0fs0e))
- As the model processes each word (each position in the input sequence), self attention allows it to look at other positions in the input sequence for clues that can help lead to a better encoding for this word. ([View Highlight](https://read.readwise.io/read/01gr43gpw4bc4n7f112ta03hft))
- If you’re familiar with RNNs, think of how maintaining a hidden state allows an RNN to incorporate its representation of previous words/vectors it has processed with the current one it’s processing. Self-attention is the method the Transformer uses to bake the “understanding” of other relevant words into the one we’re currently processing. ([View Highlight](https://read.readwise.io/read/01gr43h3k8ahj564hz5njbse37))
- The **first step** in calculating self-attention is to create three vectors from each of the encoder’s input vectors (in this case, the embedding of each word). So for each word, we create a Query vector, a Key vector, and a Value vector. These vectors are created by multiplying the embedding by three matrices that we trained during the training process. ([View Highlight](https://read.readwise.io/read/01gr43j1j705y3zjy6nrp5ns5v))
- Notice that these new vectors are smaller in dimension than the embedding vector. Their dimensionality is 64, while the embedding and encoder input/output vectors have dimensionality of 512. They don’t HAVE to be smaller, this is an architecture choice to make the computation of multiheaded attention (mostly) constant. ([View Highlight](https://read.readwise.io/read/01gr43jkm0z72sfsdp5262dmsw))
- What are the “query”, “key”, and “value” vectors? 
  They’re abstractions that are useful for calculating and thinking about attention. Once you proceed with reading how attention is calculated below, you’ll know pretty much all you need to know about the role each of these vectors plays.
  The **second step** in calculating self-attention is to calculate a score. Say we’re calculating the self-attention for the first word in this example, “Thinking”. We need to score each word of the input sentence against this word. The score determines how much focus to place on other parts of the input sentence as we encode a word at a certain position. ([View Highlight](https://read.readwise.io/read/01gr43kds63qrdqsk5tw2dhknp))
- The score is calculated by taking the dot product of the query vector with the key vector of the respective word we’re scoring. So if we’re processing the self-attention for the word in position #1, the first score would be the dot product of q1 and k1. The second score would be the dot product of q1 and k2. ([View Highlight](https://read.readwise.io/read/01gr43ksg4fqem6rse31ga8gav))
- ![](https://jalammar.github.io/images/t/transformer_self_attention_score.png) ([View Highlight](https://read.readwise.io/read/01gr43kvr3434ae2v73chyhv9e))
- The **third and fourth steps** are to divide the scores by 8 (the square root of the dimension of the key vectors used in the paper – 64. This leads to having more stable gradients. There could be other possible values here, but this is the default), then pass the result through a softmax operation. Softmax normalizes the scores so they’re all positive and add up to 1. ([View Highlight](https://read.readwise.io/read/01gr43mggpdphmyfpht1a6s0cy))
- ![](https://jalammar.github.io/images/t/self-attention_softmax.png) ([View Highlight](https://read.readwise.io/read/01gr43rg7bw2v9aw5a2hr2f2f8))
- his softmax score determines how much each word will be expressed at this position. Clearly the word at this position will have the highest softmax score, but sometimes it’s useful to attend to another word that is relevant to the current word. ([View Highlight](https://read.readwise.io/read/01gr43n1q3mav0cybysjmsbkt9))
- The **fifth step** is to multiply each value vector by the softmax score (in preparation to sum them up). The intuition here is to keep intact the values of the word(s) we want to focus on, and drown-out irrelevant words (by multiplying them by tiny numbers like 0.001, for example) ([View Highlight](https://read.readwise.io/read/01gr43natm8kn4nej6xgepqh08))
- The **sixth step** is to sum up the weighted value vectors. This produces the output of the self-attention layer at this position (for the first word). ([View Highlight](https://read.readwise.io/read/01gr43r0r605atfm28k8d0qxwc))
- ![](https://jalammar.github.io/images/t/self-attention-output.png) ([View Highlight](https://read.readwise.io/read/01gr43rjb5qjeebyfdqcaftnz2))
- That concludes the self-attention calculation. The resulting vector is one we can send along to the feed-forward neural network. In the actual implementation, however, this calculation is done in matrix form for faster processing. So let’s look at that now that we’ve seen the intuition of the calculation on the word level. ([View Highlight](https://read.readwise.io/read/01gr43r88wb5xxryx9qmqenvgz))
- Matrix Calculation of Self-Attention
  **The first step** is to calculate the Query, Key, and Value matrices. We do that by packing our embeddings into a matrix X, and multiplying it by the weight matrices we’ve trained (WQ, WK, WV). ([View Highlight](https://read.readwise.io/read/01gr43s12mtkh4d0g4pvc8m0w5))
- ![](https://jalammar.github.io/images/t/self-attention-matrix-calculation.png) ([View Highlight](https://read.readwise.io/read/01gr43ry83pv2qkve5h59a8yw7))
- **Finally**, since we’re dealing with matrices, we can condense steps two through six in one formula to calculate the outputs of the self-attention layer.
  ![](https://jalammar.github.io/images/t/self-attention-matrix-calculation-2.png) ([View Highlight](https://read.readwise.io/read/01gr43ssjaecxkvwnz37dejpyy))
- The paper further refined the self-attention layer by adding a mechanism called “multi-headed” attention. This improves the performance of the attention layer in two ways:
  1. It expands the model’s ability to focus on different positions. Yes, in the example above, z1 contains a little bit of every other encoding, but it could be dominated by the actual word itself. If we’re translating a sentence like “The animal didn’t cross the street because it was too tired”, it would be useful to know which word “it” refers to. ([View Highlight](https://read.readwise.io/read/01gr43tgjwvw3dkd7fjx70q6by))
- It gives the attention layer multiple “representation subspaces”. As we’ll see next, with multi-headed attention we have not only one, but multiple sets of Query/Key/Value weight matrices (the Transformer uses eight attention heads, so we end up with eight sets for each encoder/decoder). Each of these sets is randomly initialized. Then, after training, each set is used to project the input embeddings (or vectors from lower encoders/decoders) into a different representation subspace. ([View Highlight](https://read.readwise.io/read/01gr43tvg1gt8wkthajz0f75w2))
- ![](https://jalammar.github.io/images/t/transformer_attention_heads_qkv.png) ([View Highlight](https://read.readwise.io/read/01gr43v18wvm97ydchy62d2fg7))
- f we do the same self-attention calculation we outlined above, just eight different times with different weight matrices, we end up with eight different Z matrices
  ![](https://jalammar.github.io/images/t/transformer_attention_heads_z.png) ([View Highlight](https://read.readwise.io/read/01gr43v47h8vhrd36nkabghtxk))
- This leaves us with a bit of a challenge. The feed-forward layer is not expecting eight matrices – it’s expecting a single matrix (a vector for each word). So we need a way to condense these eight down into a single matrix.
  How do we do that? We concat the matrices then multiply them by an additional weights matrix WO.
  ![](https://jalammar.github.io/images/t/transformer_attention_heads_weight_matrix_o.png) ([View Highlight](https://read.readwise.io/read/01gr43vh72mghvq1ez0345p7tn))
- That’s pretty much all there is to multi-headed self-attention. It’s quite a handful of matrices, I realize. Let me try to put them all in one visual so we can look at them in one place ([View Highlight](https://read.readwise.io/read/01gr43vw9h0v6s4ys2pk44e428))
- ![](https://jalammar.github.io/images/t/transformer_multi-headed_self-attention-recap.png) ([View Highlight](https://read.readwise.io/read/01gr43wyr08hq72r7ntkn6jya2))
- Now that we have touched upon attention heads, let’s revisit our example from before to see where the different attention heads are focusing as we encode the word “it” in our example sentence:
  ![](https://jalammar.github.io/images/t/transformer_self-attention_visualization_2.png) 
  As we encode the word "it", one attention head is focusing most on "the animal", while another is focusing on "tired" -- in a sense, the model's representation of the word "it" bakes in some of the representation of both "animal" and "tired".
  If we add all the attention heads to the picture, however, things can be harder to interpret:
  ![](https://jalammar.github.io/images/t/transformer_self-attention_visualization_3.png) ([View Highlight](https://read.readwise.io/read/01gr43yat77cam7ysnc577vh70))
- One thing that’s missing from the model as we have described it so far is a way to account for the order of the words in the input sequence.
  To address this, the transformer adds a vector to each input embedding. These vectors follow a specific pattern that the model learns, which helps it determine the position of each word, or the distance between different words in the sequence. The intuition here is that adding these values to the embeddings provides meaningful distances between the embedding vectors once they’re projected into Q/K/V vectors and during dot-product attention. ([View Highlight](https://read.readwise.io/read/01gr43yyj61gv31j0syr73xyga))
- ![](https://jalammar.github.io/images/t/transformer_positional_encoding_vectors.png) 
  To give the model a sense of the order of the words, we add positional encoding vectors -- the values of which follow a specific pattern.
  If we assumed the embedding has a dimensionality of 4, the actual positional encodings would look like this:
  ![](https://jalammar.github.io/images/t/transformer_positional_encoding_example.png) ([View Highlight](https://read.readwise.io/read/01gr43znch1bsfjnb2b928qek7))
- One detail in the architecture of the encoder that we need to mention before moving on, is that each sub-layer (self-attention, ffnn) in each encoder has a residual connection around it, and is followed by a [layer-normalization](https://arxiv.org/abs/1607.06450) step.
  ![](https://jalammar.github.io/images/t/transformer_resideual_layer_norm.png) ([View Highlight](https://read.readwise.io/read/01gr440f4v2m98ewn3esstkrv8))
- If we’re to visualize the vectors and the layer-norm operation associated with self attention, it would look like this:
  ![](https://jalammar.github.io/images/t/transformer_resideual_layer_norm_2.png) 
  This goes for the sub-layers of the decoder as well. If we’re to think of a Transformer of 2 stacked encoders and decoders, it would look something like this:
  ![](https://jalammar.github.io/images/t/transformer_resideual_layer_norm_3.png) ([View Highlight](https://read.readwise.io/read/01gr4413g6rgtjkqb5vw6brsbw))
- Now that we’ve covered most of the concepts on the encoder side, we basically know how the components of decoders work as well. But let’s take a look at how they work together.
  The encoder start by processing the input sequence. The output of the top encoder is then transformed into a set of attention vectors K and V. These are to be used by each decoder in its “encoder-decoder attention” layer which helps the decoder focus on appropriate places in the input sequence: ([View Highlight](https://read.readwise.io/read/01gr441fp3bt80av1s3zq5df63))
- ![](https://jalammar.github.io/images/t/transformer_decoding_1.gif) ([View Highlight](https://read.readwise.io/read/01gr441tgtwqrtp61jmjh4gr26))
- The following steps repeat the process until a special symbol is reached indicating the transformer decoder has completed its output. The output of each step is fed to the bottom decoder in the next time step, and the decoders bubble up their decoding results just like the encoders did. And just like we did with the encoder inputs, we embed and add positional encoding to those decoder inputs to indicate the position of each word.
  ![](https://jalammar.github.io/images/t/transformer_decoding_2.gif) ([View Highlight](https://read.readwise.io/read/01gr4422r1a9ggxktc1bjvk6qf))
- The self attention layers in the decoder operate in a slightly different way than the one in the encoder:
  In the decoder, the self-attention layer is only allowed to attend to earlier positions in the output sequence. This is done by masking future positions (setting them to `-inf`) before the softmax step in the self-attention calculation.
  The “Encoder-Decoder Attention” layer works just like multiheaded self-attention, except it creates its Queries matrix from the layer below it, and takes the Keys and Values matrix from the output of the encoder stack. ([View Highlight](https://read.readwise.io/read/01gr442gq9g1s6t401zvnszsbg))
- The decoder stack outputs a vector of floats. How do we turn that into a word? That’s the job of the final Linear layer which is followed by a Softmax Layer.
  The Linear layer is a simple fully connected neural network that projects the vector produced by the stack of decoders, into a much, much larger vector called a logits vector.
  Let’s assume that our model knows 10,000 unique English words (our model’s “output vocabulary”) that it’s learned from its training dataset. This would make the logits vector 10,000 cells wide – each cell corresponding to the score of a unique word. That is how we interpret the output of the model followed by the Linear layer.
  The softmax layer then turns those scores into probabilities (all positive, all add up to 1.0). The cell with the highest probability is chosen, and the word associated with it is produced as the output for this time step. ([View Highlight](https://read.readwise.io/read/01gr4436kday4y5drby2w9f7tc))
- Now that we’ve covered the entire forward-pass process through a trained Transformer, it would be useful to glance at the intuition of training the model.
  During training, an untrained model would go through the exact same forward pass. But since we are training it on a labeled training dataset, we can compare its output with the actual correct output.
  To visualize this, let’s assume our output vocabulary only contains six words(“a”, “am”, “i”, “thanks”, “student”, and “<eos>” (short for ‘end of sentence’)). ([View Highlight](https://read.readwise.io/read/01gr443x9f8v1vp5wr32c61w5n))
- ![](https://jalammar.github.io/images/t/vocabulary.png) 
  The output vocabulary of our model is created in the preprocessing phase before we even begin training. ([View Highlight](https://read.readwise.io/read/01gr444rwtqjn4t79nrm00egbd))
- Once we define our output vocabulary, we can use a vector of the same width to indicate each word in our vocabulary. This also known as one-hot encoding. So for example, we can indicate the word “am” using the following vector: ([View Highlight](https://read.readwise.io/read/01gr444akq9ps9fbk8fbx68zxy))
- ![](https://jalammar.github.io/images/t/one-hot-vocabulary-example.png) 
  Example: one-hot encoding of our output vocabulary ([View Highlight](https://read.readwise.io/read/01gr444ptpa7ancdtj89zmjjd6))
- The Loss Function
  Say we are training our model. Say it’s our first step in the training phase, and we’re training it on a simple example – translating “merci” into “thanks”.
  What this means, is that we want the output to be a probability distribution indicating the word “thanks”. But since this model is not yet trained, that’s unlikely to happen just yet.
  ![](https://jalammar.github.io/images/t/transformer_logits_output_and_label.png) 
  Since the model's parameters (weights) are all initialized randomly, the (untrained) model produces a probability distribution with arbitrary values for each cell/word. We can compare it with the actual output, then tweak all the model's weights using backpropagation to make the output closer to the desired output. ([View Highlight](https://read.readwise.io/read/01gr445m67n0aw8x514vrk2xb3))
- But note that this is an oversimplified example. More realistically, we’ll use a sentence longer than one word. For example – input: “je suis étudiant” and expected output: “i am a student”. What this really means, is that we want our model to successively output probability distributions where:
  • Each probability distribution is represented by a vector of width vocab_size (6 in our toy example, but more realistically a number like 30,000 or 50,000)
  • The first probability distribution has the highest probability at the cell associated with the word “i”
  • The second probability distribution has the highest probability at the cell associated with the word “am”
  • And so on, until the fifth output distribution indicates ‘`<end of sentence>`’ symbol, which also has a cell associated with it from the 10,000 element vocabulary.
  ![](https://jalammar.github.io/images/t/output_target_probability_distributions.png) 
  The targeted probability distributions we'll train our model against in the training example for one sample sentence. ([View Highlight](https://read.readwise.io/read/01gr446q3wegn465g7kjqfk962))
---
author: [[Jay Alammar]]
title: "The Illustrated Transformer"
tags: 
- articles
- literature-note
---
# The Illustrated Transformer

![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article4.6bc1851654a0.png)

## Metadata
- Author: [[Jay Alammar]]
- Full Title: The Illustrated Transformer
- Category: #articles
- URL: https://jalammar.github.io/illustrated-transformer/

## Highlights
- we will look at **The Transformer** – a model that uses attention to boost the speed with which these models can be trained. ([View Highlight](https://read.readwise.io/read/01gr3qfpcx17bqn1wcn3nejn4e))
- ![](https://jalammar.github.io/images/t/the_transformer_3.png) ([View Highlight](https://read.readwise.io/read/01gr43ffd9t46h1q3f8d4mnqtb))
- ![](https://jalammar.github.io/images/t/The_transformer_encoders_decoders.png) ([View Highlight](https://read.readwise.io/read/01gr43fhhy22e1gh06yr8937x2))
- The encoding component is a stack of encoders (the paper stacks six of them on top of each other – there’s nothing magical about the number six, one can definitely experiment with other arrangements). The decoding component is a stack of decoders of the same number. ([View Highlight](https://read.readwise.io/read/01gr3qk5rmh11jv8tv46g88tj0))
- ![](https://jalammar.github.io/images/t/The_transformer_encoder_decoder_stack.png) ([View Highlight](https://read.readwise.io/read/01gr43f9jzt5sdzyb5ypzdf2yj))
- The encoders are all identical in structure (yet they do not share weights). Each one is broken down into two sub-layers: ([View Highlight](https://read.readwise.io/read/01gr3qrd7fxt1ac4aax6454rbd))
- ![](https://jalammar.github.io/images/t/Transformer_encoder.png) ([View Highlight](https://read.readwise.io/read/01gr43fbszx7j24ha1e5p8zg9d))
- The encoder’s inputs first flow through a self-attention layer – a layer that helps the encoder look at other words in the input sentence as it encodes a specific word. ([View Highlight](https://read.readwise.io/read/01gr3qw4a7944kyzwreqytcgxa))
- The outputs of the self-attention layer are fed to a feed-forward neural network. The exact same feed-forward network is independently applied to each position. ([View Highlight](https://read.readwise.io/read/01gr3qz3249x4007d6d1x8xfw7))
- The decoder has both those layers, but between them is an attention layer that helps the decoder focus on relevant parts of the input sentence (similar what attention does in [seq2seq models](https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/)). ([View Highlight](https://read.readwise.io/read/01gr3qzm559wjvn64wt6dy58h6))
- As is the case in NLP applications in general, we begin by turning each input word into a vector using an [embedding algorithm](https://medium.com/deeper-learning/glossary-of-deep-learning-word-embedding-f90c3cec34ca). ([View Highlight](https://read.readwise.io/read/01gr43bvwwr560weacv3m72s65))
- The embedding only happens in the bottom-most encoder. The abstraction that is common to all the encoders is that they receive a list of vectors each of the size 512 – In the bottom encoder that would be the word embeddings, but in other encoders, it would be the output of the encoder that’s directly below ([View Highlight](https://read.readwise.io/read/01gr43d82ec8nqmyx1ekqz4vsy))
- After embedding the words in our input sequence, each of them flows through each of the two layers of the encoder. ([View Highlight](https://read.readwise.io/read/01gr43dgprrxmmp295nfatw7b8))
- ![](https://jalammar.github.io/images/t/encoder_with_tensors.png) ([View Highlight](https://read.readwise.io/read/01gr43f6g9wexr7kmntykvhkqx))
- Here we begin to see one key property of the Transformer, which is that the word in each position flows through its own path in the encoder. There are dependencies between these paths in the self-attention layer. The feed-forward layer does not have those dependencies, however, and thus the various paths can be executed in parallel while flowing through the feed-forward layer. ([View Highlight](https://read.readwise.io/read/01gr43e1e3sr81vmzed7k31t8c))
- an encoder receives a list of vectors as input. It processes this list by passing these vectors into a ‘self-attention’ layer, then into a feed-forward neural network, then sends out the output upwards to the next encoder. ([View Highlight](https://read.readwise.io/read/01gr43eta1s6v2v9pdpyatfym1))
- ![](https://jalammar.github.io/images/t/encoder_with_tensors_2.png) ([View Highlight](https://read.readwise.io/read/01gr43f21wkg3842np67vch8mj))
- Don’t be fooled by me throwing around the word “self-attention” like it’s a concept everyone should be familiar with. I had personally never came across the concept until reading the Attention is All You Need paper. Let us distill how it works.
  Say the following sentence is an input sentence we want to translate:
  ”`The animal didn't cross the street because it was too tired`”
  What does “it” in this sentence refer to? Is it referring to the street or to the animal? It’s a simple question to a human, but not as simple to an algorithm. ([View Highlight](https://read.readwise.io/read/01gr43g439emrv0ppc47107xe6))
- When the model is processing the word “it”, self-attention allows it to associate “it” with “animal”. ([View Highlight](https://read.readwise.io/read/01gr43gfpbp5215vsfmma0fs0e))
- As the model processes each word (each position in the input sequence), self attention allows it to look at other positions in the input sequence for clues that can help lead to a better encoding for this word. ([View Highlight](https://read.readwise.io/read/01gr43gpw4bc4n7f112ta03hft))
- If you’re familiar with RNNs, think of how maintaining a hidden state allows an RNN to incorporate its representation of previous words/vectors it has processed with the current one it’s processing. Self-attention is the method the Transformer uses to bake the “understanding” of other relevant words into the one we’re currently processing. ([View Highlight](https://read.readwise.io/read/01gr43h3k8ahj564hz5njbse37))
- The **first step** in calculating self-attention is to create three vectors from each of the encoder’s input vectors (in this case, the embedding of each word). So for each word, we create a Query vector, a Key vector, and a Value vector. These vectors are created by multiplying the embedding by three matrices that we trained during the training process. ([View Highlight](https://read.readwise.io/read/01gr43j1j705y3zjy6nrp5ns5v))
- Notice that these new vectors are smaller in dimension than the embedding vector. Their dimensionality is 64, while the embedding and encoder input/output vectors have dimensionality of 512. They don’t HAVE to be smaller, this is an architecture choice to make the computation of multiheaded attention (mostly) constant. ([View Highlight](https://read.readwise.io/read/01gr43jkm0z72sfsdp5262dmsw))
- What are the “query”, “key”, and “value” vectors? 
  They’re abstractions that are useful for calculating and thinking about attention. Once you proceed with reading how attention is calculated below, you’ll know pretty much all you need to know about the role each of these vectors plays.
  The **second step** in calculating self-attention is to calculate a score. Say we’re calculating the self-attention for the first word in this example, “Thinking”. We need to score each word of the input sentence against this word. The score determines how much focus to place on other parts of the input sentence as we encode a word at a certain position. ([View Highlight](https://read.readwise.io/read/01gr43kds63qrdqsk5tw2dhknp))
- The score is calculated by taking the dot product of the query vector with the key vector of the respective word we’re scoring. So if we’re processing the self-attention for the word in position #1, the first score would be the dot product of q1 and k1. The second score would be the dot product of q1 and k2. ([View Highlight](https://read.readwise.io/read/01gr43ksg4fqem6rse31ga8gav))
- ![](https://jalammar.github.io/images/t/transformer_self_attention_score.png) ([View Highlight](https://read.readwise.io/read/01gr43kvr3434ae2v73chyhv9e))
- The **third and fourth steps** are to divide the scores by 8 (the square root of the dimension of the key vectors used in the paper – 64. This leads to having more stable gradients. There could be other possible values here, but this is the default), then pass the result through a softmax operation. Softmax normalizes the scores so they’re all positive and add up to 1. ([View Highlight](https://read.readwise.io/read/01gr43mggpdphmyfpht1a6s0cy))
- ![](https://jalammar.github.io/images/t/self-attention_softmax.png) ([View Highlight](https://read.readwise.io/read/01gr43rg7bw2v9aw5a2hr2f2f8))
- his softmax score determines how much each word will be expressed at this position. Clearly the word at this position will have the highest softmax score, but sometimes it’s useful to attend to another word that is relevant to the current word. ([View Highlight](https://read.readwise.io/read/01gr43n1q3mav0cybysjmsbkt9))
- The **fifth step** is to multiply each value vector by the softmax score (in preparation to sum them up). The intuition here is to keep intact the values of the word(s) we want to focus on, and drown-out irrelevant words (by multiplying them by tiny numbers like 0.001, for example) ([View Highlight](https://read.readwise.io/read/01gr43natm8kn4nej6xgepqh08))
- The **sixth step** is to sum up the weighted value vectors. This produces the output of the self-attention layer at this position (for the first word). ([View Highlight](https://read.readwise.io/read/01gr43r0r605atfm28k8d0qxwc))
- ![](https://jalammar.github.io/images/t/self-attention-output.png) ([View Highlight](https://read.readwise.io/read/01gr43rjb5qjeebyfdqcaftnz2))
- That concludes the self-attention calculation. The resulting vector is one we can send along to the feed-forward neural network. In the actual implementation, however, this calculation is done in matrix form for faster processing. So let’s look at that now that we’ve seen the intuition of the calculation on the word level. ([View Highlight](https://read.readwise.io/read/01gr43r88wb5xxryx9qmqenvgz))
- Matrix Calculation of Self-Attention
  **The first step** is to calculate the Query, Key, and Value matrices. We do that by packing our embeddings into a matrix X, and multiplying it by the weight matrices we’ve trained (WQ, WK, WV). ([View Highlight](https://read.readwise.io/read/01gr43s12mtkh4d0g4pvc8m0w5))
- ![](https://jalammar.github.io/images/t/self-attention-matrix-calculation.png) ([View Highlight](https://read.readwise.io/read/01gr43ry83pv2qkve5h59a8yw7))
- **Finally**, since we’re dealing with matrices, we can condense steps two through six in one formula to calculate the outputs of the self-attention layer.
  ![](https://jalammar.github.io/images/t/self-attention-matrix-calculation-2.png) ([View Highlight](https://read.readwise.io/read/01gr43ssjaecxkvwnz37dejpyy))
- The paper further refined the self-attention layer by adding a mechanism called “multi-headed” attention. This improves the performance of the attention layer in two ways:
  1. It expands the model’s ability to focus on different positions. Yes, in the example above, z1 contains a little bit of every other encoding, but it could be dominated by the actual word itself. If we’re translating a sentence like “The animal didn’t cross the street because it was too tired”, it would be useful to know which word “it” refers to. ([View Highlight](https://read.readwise.io/read/01gr43tgjwvw3dkd7fjx70q6by))
- It gives the attention layer multiple “representation subspaces”. As we’ll see next, with multi-headed attention we have not only one, but multiple sets of Query/Key/Value weight matrices (the Transformer uses eight attention heads, so we end up with eight sets for each encoder/decoder). Each of these sets is randomly initialized. Then, after training, each set is used to project the input embeddings (or vectors from lower encoders/decoders) into a different representation subspace. ([View Highlight](https://read.readwise.io/read/01gr43tvg1gt8wkthajz0f75w2))
- ![](https://jalammar.github.io/images/t/transformer_attention_heads_qkv.png) ([View Highlight](https://read.readwise.io/read/01gr43v18wvm97ydchy62d2fg7))
- f we do the same self-attention calculation we outlined above, just eight different times with different weight matrices, we end up with eight different Z matrices
  ![](https://jalammar.github.io/images/t/transformer_attention_heads_z.png) ([View Highlight](https://read.readwise.io/read/01gr43v47h8vhrd36nkabghtxk))
- This leaves us with a bit of a challenge. The feed-forward layer is not expecting eight matrices – it’s expecting a single matrix (a vector for each word). So we need a way to condense these eight down into a single matrix.
  How do we do that? We concat the matrices then multiply them by an additional weights matrix WO.
  ![](https://jalammar.github.io/images/t/transformer_attention_heads_weight_matrix_o.png) ([View Highlight](https://read.readwise.io/read/01gr43vh72mghvq1ez0345p7tn))
- That’s pretty much all there is to multi-headed self-attention. It’s quite a handful of matrices, I realize. Let me try to put them all in one visual so we can look at them in one place ([View Highlight](https://read.readwise.io/read/01gr43vw9h0v6s4ys2pk44e428))
- ![](https://jalammar.github.io/images/t/transformer_multi-headed_self-attention-recap.png) ([View Highlight](https://read.readwise.io/read/01gr43wyr08hq72r7ntkn6jya2))
- Now that we have touched upon attention heads, let’s revisit our example from before to see where the different attention heads are focusing as we encode the word “it” in our example sentence:
  ![](https://jalammar.github.io/images/t/transformer_self-attention_visualization_2.png) 
  As we encode the word "it", one attention head is focusing most on "the animal", while another is focusing on "tired" -- in a sense, the model's representation of the word "it" bakes in some of the representation of both "animal" and "tired".
  If we add all the attention heads to the picture, however, things can be harder to interpret:
  ![](https://jalammar.github.io/images/t/transformer_self-attention_visualization_3.png) ([View Highlight](https://read.readwise.io/read/01gr43yat77cam7ysnc577vh70))
- One thing that’s missing from the model as we have described it so far is a way to account for the order of the words in the input sequence.
  To address this, the transformer adds a vector to each input embedding. These vectors follow a specific pattern that the model learns, which helps it determine the position of each word, or the distance between different words in the sequence. The intuition here is that adding these values to the embeddings provides meaningful distances between the embedding vectors once they’re projected into Q/K/V vectors and during dot-product attention. ([View Highlight](https://read.readwise.io/read/01gr43yyj61gv31j0syr73xyga))
- ![](https://jalammar.github.io/images/t/transformer_positional_encoding_vectors.png) 
  To give the model a sense of the order of the words, we add positional encoding vectors -- the values of which follow a specific pattern.
  If we assumed the embedding has a dimensionality of 4, the actual positional encodings would look like this:
  ![](https://jalammar.github.io/images/t/transformer_positional_encoding_example.png) ([View Highlight](https://read.readwise.io/read/01gr43znch1bsfjnb2b928qek7))
- One detail in the architecture of the encoder that we need to mention before moving on, is that each sub-layer (self-attention, ffnn) in each encoder has a residual connection around it, and is followed by a [layer-normalization](https://arxiv.org/abs/1607.06450) step.
  ![](https://jalammar.github.io/images/t/transformer_resideual_layer_norm.png) ([View Highlight](https://read.readwise.io/read/01gr440f4v2m98ewn3esstkrv8))
- If we’re to visualize the vectors and the layer-norm operation associated with self attention, it would look like this:
  ![](https://jalammar.github.io/images/t/transformer_resideual_layer_norm_2.png) 
  This goes for the sub-layers of the decoder as well. If we’re to think of a Transformer of 2 stacked encoders and decoders, it would look something like this:
  ![](https://jalammar.github.io/images/t/transformer_resideual_layer_norm_3.png) ([View Highlight](https://read.readwise.io/read/01gr4413g6rgtjkqb5vw6brsbw))
- Now that we’ve covered most of the concepts on the encoder side, we basically know how the components of decoders work as well. But let’s take a look at how they work together.
  The encoder start by processing the input sequence. The output of the top encoder is then transformed into a set of attention vectors K and V. These are to be used by each decoder in its “encoder-decoder attention” layer which helps the decoder focus on appropriate places in the input sequence: ([View Highlight](https://read.readwise.io/read/01gr441fp3bt80av1s3zq5df63))
- ![](https://jalammar.github.io/images/t/transformer_decoding_1.gif) ([View Highlight](https://read.readwise.io/read/01gr441tgtwqrtp61jmjh4gr26))
- The following steps repeat the process until a special symbol is reached indicating the transformer decoder has completed its output. The output of each step is fed to the bottom decoder in the next time step, and the decoders bubble up their decoding results just like the encoders did. And just like we did with the encoder inputs, we embed and add positional encoding to those decoder inputs to indicate the position of each word.
  ![](https://jalammar.github.io/images/t/transformer_decoding_2.gif) ([View Highlight](https://read.readwise.io/read/01gr4422r1a9ggxktc1bjvk6qf))
- The self attention layers in the decoder operate in a slightly different way than the one in the encoder:
  In the decoder, the self-attention layer is only allowed to attend to earlier positions in the output sequence. This is done by masking future positions (setting them to `-inf`) before the softmax step in the self-attention calculation.
  The “Encoder-Decoder Attention” layer works just like multiheaded self-attention, except it creates its Queries matrix from the layer below it, and takes the Keys and Values matrix from the output of the encoder stack. ([View Highlight](https://read.readwise.io/read/01gr442gq9g1s6t401zvnszsbg))
- The decoder stack outputs a vector of floats. How do we turn that into a word? That’s the job of the final Linear layer which is followed by a Softmax Layer.
  The Linear layer is a simple fully connected neural network that projects the vector produced by the stack of decoders, into a much, much larger vector called a logits vector.
  Let’s assume that our model knows 10,000 unique English words (our model’s “output vocabulary”) that it’s learned from its training dataset. This would make the logits vector 10,000 cells wide – each cell corresponding to the score of a unique word. That is how we interpret the output of the model followed by the Linear layer.
  The softmax layer then turns those scores into probabilities (all positive, all add up to 1.0). The cell with the highest probability is chosen, and the word associated with it is produced as the output for this time step. ([View Highlight](https://read.readwise.io/read/01gr4436kday4y5drby2w9f7tc))
- Now that we’ve covered the entire forward-pass process through a trained Transformer, it would be useful to glance at the intuition of training the model.
  During training, an untrained model would go through the exact same forward pass. But since we are training it on a labeled training dataset, we can compare its output with the actual correct output.
  To visualize this, let’s assume our output vocabulary only contains six words(“a”, “am”, “i”, “thanks”, “student”, and “<eos>” (short for ‘end of sentence’)). ([View Highlight](https://read.readwise.io/read/01gr443x9f8v1vp5wr32c61w5n))
- ![](https://jalammar.github.io/images/t/vocabulary.png) 
  The output vocabulary of our model is created in the preprocessing phase before we even begin training. ([View Highlight](https://read.readwise.io/read/01gr444rwtqjn4t79nrm00egbd))
- Once we define our output vocabulary, we can use a vector of the same width to indicate each word in our vocabulary. This also known as one-hot encoding. So for example, we can indicate the word “am” using the following vector: ([View Highlight](https://read.readwise.io/read/01gr444akq9ps9fbk8fbx68zxy))
- ![](https://jalammar.github.io/images/t/one-hot-vocabulary-example.png) 
  Example: one-hot encoding of our output vocabulary ([View Highlight](https://read.readwise.io/read/01gr444ptpa7ancdtj89zmjjd6))
- The Loss Function
  Say we are training our model. Say it’s our first step in the training phase, and we’re training it on a simple example – translating “merci” into “thanks”.
  What this means, is that we want the output to be a probability distribution indicating the word “thanks”. But since this model is not yet trained, that’s unlikely to happen just yet.
  ![](https://jalammar.github.io/images/t/transformer_logits_output_and_label.png) 
  Since the model's parameters (weights) are all initialized randomly, the (untrained) model produces a probability distribution with arbitrary values for each cell/word. We can compare it with the actual output, then tweak all the model's weights using backpropagation to make the output closer to the desired output. ([View Highlight](https://read.readwise.io/read/01gr445m67n0aw8x514vrk2xb3))
- But note that this is an oversimplified example. More realistically, we’ll use a sentence longer than one word. For example – input: “je suis étudiant” and expected output: “i am a student”. What this really means, is that we want our model to successively output probability distributions where:
  • Each probability distribution is represented by a vector of width vocab_size (6 in our toy example, but more realistically a number like 30,000 or 50,000)
  • The first probability distribution has the highest probability at the cell associated with the word “i”
  • The second probability distribution has the highest probability at the cell associated with the word “am”
  • And so on, until the fifth output distribution indicates ‘`<end of sentence>`’ symbol, which also has a cell associated with it from the 10,000 element vocabulary.
  ![](https://jalammar.github.io/images/t/output_target_probability_distributions.png) 
  The targeted probability distributions we'll train our model against in the training example for one sample sentence. ([View Highlight](https://read.readwise.io/read/01gr446q3wegn465g7kjqfk962))
---
author: [[Jay Alammar]]
title: "The Illustrated Transformer"
tags: 
- articles
- literature-note
---
# The Illustrated Transformer

![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article4.6bc1851654a0.png)

## Metadata
- Author: [[Jay Alammar]]
- Full Title: The Illustrated Transformer
- Category: #articles
- URL: https://jalammar.github.io/illustrated-transformer/

## Highlights
- we will look at **The Transformer** – a model that uses attention to boost the speed with which these models can be trained. ([View Highlight](https://read.readwise.io/read/01gr3qfpcx17bqn1wcn3nejn4e))
- ![](https://jalammar.github.io/images/t/the_transformer_3.png) ([View Highlight](https://read.readwise.io/read/01gr43ffd9t46h1q3f8d4mnqtb))
- ![](https://jalammar.github.io/images/t/The_transformer_encoders_decoders.png) ([View Highlight](https://read.readwise.io/read/01gr43fhhy22e1gh06yr8937x2))
- The encoding component is a stack of encoders (the paper stacks six of them on top of each other – there’s nothing magical about the number six, one can definitely experiment with other arrangements). The decoding component is a stack of decoders of the same number. ([View Highlight](https://read.readwise.io/read/01gr3qk5rmh11jv8tv46g88tj0))
- ![](https://jalammar.github.io/images/t/The_transformer_encoder_decoder_stack.png) ([View Highlight](https://read.readwise.io/read/01gr43f9jzt5sdzyb5ypzdf2yj))
- The encoders are all identical in structure (yet they do not share weights). Each one is broken down into two sub-layers: ([View Highlight](https://read.readwise.io/read/01gr3qrd7fxt1ac4aax6454rbd))
- ![](https://jalammar.github.io/images/t/Transformer_encoder.png) ([View Highlight](https://read.readwise.io/read/01gr43fbszx7j24ha1e5p8zg9d))
- The encoder’s inputs first flow through a self-attention layer – a layer that helps the encoder look at other words in the input sentence as it encodes a specific word. ([View Highlight](https://read.readwise.io/read/01gr3qw4a7944kyzwreqytcgxa))
- The outputs of the self-attention layer are fed to a feed-forward neural network. The exact same feed-forward network is independently applied to each position. ([View Highlight](https://read.readwise.io/read/01gr3qz3249x4007d6d1x8xfw7))
- The decoder has both those layers, but between them is an attention layer that helps the decoder focus on relevant parts of the input sentence (similar what attention does in [seq2seq models](https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/)). ([View Highlight](https://read.readwise.io/read/01gr3qzm559wjvn64wt6dy58h6))
- As is the case in NLP applications in general, we begin by turning each input word into a vector using an [embedding algorithm](https://medium.com/deeper-learning/glossary-of-deep-learning-word-embedding-f90c3cec34ca). ([View Highlight](https://read.readwise.io/read/01gr43bvwwr560weacv3m72s65))
- The embedding only happens in the bottom-most encoder. The abstraction that is common to all the encoders is that they receive a list of vectors each of the size 512 – In the bottom encoder that would be the word embeddings, but in other encoders, it would be the output of the encoder that’s directly below ([View Highlight](https://read.readwise.io/read/01gr43d82ec8nqmyx1ekqz4vsy))
- After embedding the words in our input sequence, each of them flows through each of the two layers of the encoder. ([View Highlight](https://read.readwise.io/read/01gr43dgprrxmmp295nfatw7b8))
- ![](https://jalammar.github.io/images/t/encoder_with_tensors.png) ([View Highlight](https://read.readwise.io/read/01gr43f6g9wexr7kmntykvhkqx))
- Here we begin to see one key property of the Transformer, which is that the word in each position flows through its own path in the encoder. There are dependencies between these paths in the self-attention layer. The feed-forward layer does not have those dependencies, however, and thus the various paths can be executed in parallel while flowing through the feed-forward layer. ([View Highlight](https://read.readwise.io/read/01gr43e1e3sr81vmzed7k31t8c))
- an encoder receives a list of vectors as input. It processes this list by passing these vectors into a ‘self-attention’ layer, then into a feed-forward neural network, then sends out the output upwards to the next encoder. ([View Highlight](https://read.readwise.io/read/01gr43eta1s6v2v9pdpyatfym1))
- ![](https://jalammar.github.io/images/t/encoder_with_tensors_2.png) ([View Highlight](https://read.readwise.io/read/01gr43f21wkg3842np67vch8mj))
- Don’t be fooled by me throwing around the word “self-attention” like it’s a concept everyone should be familiar with. I had personally never came across the concept until reading the Attention is All You Need paper. Let us distill how it works.
  Say the following sentence is an input sentence we want to translate:
  ”`The animal didn't cross the street because it was too tired`”
  What does “it” in this sentence refer to? Is it referring to the street or to the animal? It’s a simple question to a human, but not as simple to an algorithm. ([View Highlight](https://read.readwise.io/read/01gr43g439emrv0ppc47107xe6))
- When the model is processing the word “it”, self-attention allows it to associate “it” with “animal”. ([View Highlight](https://read.readwise.io/read/01gr43gfpbp5215vsfmma0fs0e))
- As the model processes each word (each position in the input sequence), self attention allows it to look at other positions in the input sequence for clues that can help lead to a better encoding for this word. ([View Highlight](https://read.readwise.io/read/01gr43gpw4bc4n7f112ta03hft))
- If you’re familiar with RNNs, think of how maintaining a hidden state allows an RNN to incorporate its representation of previous words/vectors it has processed with the current one it’s processing. Self-attention is the method the Transformer uses to bake the “understanding” of other relevant words into the one we’re currently processing. ([View Highlight](https://read.readwise.io/read/01gr43h3k8ahj564hz5njbse37))
- The **first step** in calculating self-attention is to create three vectors from each of the encoder’s input vectors (in this case, the embedding of each word). So for each word, we create a Query vector, a Key vector, and a Value vector. These vectors are created by multiplying the embedding by three matrices that we trained during the training process. ([View Highlight](https://read.readwise.io/read/01gr43j1j705y3zjy6nrp5ns5v))
- Notice that these new vectors are smaller in dimension than the embedding vector. Their dimensionality is 64, while the embedding and encoder input/output vectors have dimensionality of 512. They don’t HAVE to be smaller, this is an architecture choice to make the computation of multiheaded attention (mostly) constant. ([View Highlight](https://read.readwise.io/read/01gr43jkm0z72sfsdp5262dmsw))
- What are the “query”, “key”, and “value” vectors? 
  They’re abstractions that are useful for calculating and thinking about attention. Once you proceed with reading how attention is calculated below, you’ll know pretty much all you need to know about the role each of these vectors plays.
  The **second step** in calculating self-attention is to calculate a score. Say we’re calculating the self-attention for the first word in this example, “Thinking”. We need to score each word of the input sentence against this word. The score determines how much focus to place on other parts of the input sentence as we encode a word at a certain position. ([View Highlight](https://read.readwise.io/read/01gr43kds63qrdqsk5tw2dhknp))
- The score is calculated by taking the dot product of the query vector with the key vector of the respective word we’re scoring. So if we’re processing the self-attention for the word in position #1, the first score would be the dot product of q1 and k1. The second score would be the dot product of q1 and k2. ([View Highlight](https://read.readwise.io/read/01gr43ksg4fqem6rse31ga8gav))
- ![](https://jalammar.github.io/images/t/transformer_self_attention_score.png) ([View Highlight](https://read.readwise.io/read/01gr43kvr3434ae2v73chyhv9e))
- The **third and fourth steps** are to divide the scores by 8 (the square root of the dimension of the key vectors used in the paper – 64. This leads to having more stable gradients. There could be other possible values here, but this is the default), then pass the result through a softmax operation. Softmax normalizes the scores so they’re all positive and add up to 1. ([View Highlight](https://read.readwise.io/read/01gr43mggpdphmyfpht1a6s0cy))
- ![](https://jalammar.github.io/images/t/self-attention_softmax.png) ([View Highlight](https://read.readwise.io/read/01gr43rg7bw2v9aw5a2hr2f2f8))
- his softmax score determines how much each word will be expressed at this position. Clearly the word at this position will have the highest softmax score, but sometimes it’s useful to attend to another word that is relevant to the current word. ([View Highlight](https://read.readwise.io/read/01gr43n1q3mav0cybysjmsbkt9))
- The **fifth step** is to multiply each value vector by the softmax score (in preparation to sum them up). The intuition here is to keep intact the values of the word(s) we want to focus on, and drown-out irrelevant words (by multiplying them by tiny numbers like 0.001, for example) ([View Highlight](https://read.readwise.io/read/01gr43natm8kn4nej6xgepqh08))
- The **sixth step** is to sum up the weighted value vectors. This produces the output of the self-attention layer at this position (for the first word). ([View Highlight](https://read.readwise.io/read/01gr43r0r605atfm28k8d0qxwc))
- ![](https://jalammar.github.io/images/t/self-attention-output.png) ([View Highlight](https://read.readwise.io/read/01gr43rjb5qjeebyfdqcaftnz2))
- That concludes the self-attention calculation. The resulting vector is one we can send along to the feed-forward neural network. In the actual implementation, however, this calculation is done in matrix form for faster processing. So let’s look at that now that we’ve seen the intuition of the calculation on the word level. ([View Highlight](https://read.readwise.io/read/01gr43r88wb5xxryx9qmqenvgz))
- Matrix Calculation of Self-Attention
  **The first step** is to calculate the Query, Key, and Value matrices. We do that by packing our embeddings into a matrix X, and multiplying it by the weight matrices we’ve trained (WQ, WK, WV). ([View Highlight](https://read.readwise.io/read/01gr43s12mtkh4d0g4pvc8m0w5))
- ![](https://jalammar.github.io/images/t/self-attention-matrix-calculation.png) ([View Highlight](https://read.readwise.io/read/01gr43ry83pv2qkve5h59a8yw7))
- **Finally**, since we’re dealing with matrices, we can condense steps two through six in one formula to calculate the outputs of the self-attention layer.
  ![](https://jalammar.github.io/images/t/self-attention-matrix-calculation-2.png) ([View Highlight](https://read.readwise.io/read/01gr43ssjaecxkvwnz37dejpyy))
- The paper further refined the self-attention layer by adding a mechanism called “multi-headed” attention. This improves the performance of the attention layer in two ways:
  1. It expands the model’s ability to focus on different positions. Yes, in the example above, z1 contains a little bit of every other encoding, but it could be dominated by the actual word itself. If we’re translating a sentence like “The animal didn’t cross the street because it was too tired”, it would be useful to know which word “it” refers to. ([View Highlight](https://read.readwise.io/read/01gr43tgjwvw3dkd7fjx70q6by))
- It gives the attention layer multiple “representation subspaces”. As we’ll see next, with multi-headed attention we have not only one, but multiple sets of Query/Key/Value weight matrices (the Transformer uses eight attention heads, so we end up with eight sets for each encoder/decoder). Each of these sets is randomly initialized. Then, after training, each set is used to project the input embeddings (or vectors from lower encoders/decoders) into a different representation subspace. ([View Highlight](https://read.readwise.io/read/01gr43tvg1gt8wkthajz0f75w2))
- ![](https://jalammar.github.io/images/t/transformer_attention_heads_qkv.png) ([View Highlight](https://read.readwise.io/read/01gr43v18wvm97ydchy62d2fg7))
- f we do the same self-attention calculation we outlined above, just eight different times with different weight matrices, we end up with eight different Z matrices
  ![](https://jalammar.github.io/images/t/transformer_attention_heads_z.png) ([View Highlight](https://read.readwise.io/read/01gr43v47h8vhrd36nkabghtxk))
- This leaves us with a bit of a challenge. The feed-forward layer is not expecting eight matrices – it’s expecting a single matrix (a vector for each word). So we need a way to condense these eight down into a single matrix.
  How do we do that? We concat the matrices then multiply them by an additional weights matrix WO.
  ![](https://jalammar.github.io/images/t/transformer_attention_heads_weight_matrix_o.png) ([View Highlight](https://read.readwise.io/read/01gr43vh72mghvq1ez0345p7tn))
- That’s pretty much all there is to multi-headed self-attention. It’s quite a handful of matrices, I realize. Let me try to put them all in one visual so we can look at them in one place ([View Highlight](https://read.readwise.io/read/01gr43vw9h0v6s4ys2pk44e428))
- ![](https://jalammar.github.io/images/t/transformer_multi-headed_self-attention-recap.png) ([View Highlight](https://read.readwise.io/read/01gr43wyr08hq72r7ntkn6jya2))
- Now that we have touched upon attention heads, let’s revisit our example from before to see where the different attention heads are focusing as we encode the word “it” in our example sentence:
  ![](https://jalammar.github.io/images/t/transformer_self-attention_visualization_2.png) 
  As we encode the word "it", one attention head is focusing most on "the animal", while another is focusing on "tired" -- in a sense, the model's representation of the word "it" bakes in some of the representation of both "animal" and "tired".
  If we add all the attention heads to the picture, however, things can be harder to interpret:
  ![](https://jalammar.github.io/images/t/transformer_self-attention_visualization_3.png) ([View Highlight](https://read.readwise.io/read/01gr43yat77cam7ysnc577vh70))
- One thing that’s missing from the model as we have described it so far is a way to account for the order of the words in the input sequence.
  To address this, the transformer adds a vector to each input embedding. These vectors follow a specific pattern that the model learns, which helps it determine the position of each word, or the distance between different words in the sequence. The intuition here is that adding these values to the embeddings provides meaningful distances between the embedding vectors once they’re projected into Q/K/V vectors and during dot-product attention. ([View Highlight](https://read.readwise.io/read/01gr43yyj61gv31j0syr73xyga))
- ![](https://jalammar.github.io/images/t/transformer_positional_encoding_vectors.png) 
  To give the model a sense of the order of the words, we add positional encoding vectors -- the values of which follow a specific pattern.
  If we assumed the embedding has a dimensionality of 4, the actual positional encodings would look like this:
  ![](https://jalammar.github.io/images/t/transformer_positional_encoding_example.png) ([View Highlight](https://read.readwise.io/read/01gr43znch1bsfjnb2b928qek7))
- One detail in the architecture of the encoder that we need to mention before moving on, is that each sub-layer (self-attention, ffnn) in each encoder has a residual connection around it, and is followed by a [layer-normalization](https://arxiv.org/abs/1607.06450) step.
  ![](https://jalammar.github.io/images/t/transformer_resideual_layer_norm.png) ([View Highlight](https://read.readwise.io/read/01gr440f4v2m98ewn3esstkrv8))
- If we’re to visualize the vectors and the layer-norm operation associated with self attention, it would look like this:
  ![](https://jalammar.github.io/images/t/transformer_resideual_layer_norm_2.png) 
  This goes for the sub-layers of the decoder as well. If we’re to think of a Transformer of 2 stacked encoders and decoders, it would look something like this:
  ![](https://jalammar.github.io/images/t/transformer_resideual_layer_norm_3.png) ([View Highlight](https://read.readwise.io/read/01gr4413g6rgtjkqb5vw6brsbw))
- Now that we’ve covered most of the concepts on the encoder side, we basically know how the components of decoders work as well. But let’s take a look at how they work together.
  The encoder start by processing the input sequence. The output of the top encoder is then transformed into a set of attention vectors K and V. These are to be used by each decoder in its “encoder-decoder attention” layer which helps the decoder focus on appropriate places in the input sequence: ([View Highlight](https://read.readwise.io/read/01gr441fp3bt80av1s3zq5df63))
- ![](https://jalammar.github.io/images/t/transformer_decoding_1.gif) ([View Highlight](https://read.readwise.io/read/01gr441tgtwqrtp61jmjh4gr26))
- The following steps repeat the process until a special symbol is reached indicating the transformer decoder has completed its output. The output of each step is fed to the bottom decoder in the next time step, and the decoders bubble up their decoding results just like the encoders did. And just like we did with the encoder inputs, we embed and add positional encoding to those decoder inputs to indicate the position of each word.
  ![](https://jalammar.github.io/images/t/transformer_decoding_2.gif) ([View Highlight](https://read.readwise.io/read/01gr4422r1a9ggxktc1bjvk6qf))
- The self attention layers in the decoder operate in a slightly different way than the one in the encoder:
  In the decoder, the self-attention layer is only allowed to attend to earlier positions in the output sequence. This is done by masking future positions (setting them to `-inf`) before the softmax step in the self-attention calculation.
  The “Encoder-Decoder Attention” layer works just like multiheaded self-attention, except it creates its Queries matrix from the layer below it, and takes the Keys and Values matrix from the output of the encoder stack. ([View Highlight](https://read.readwise.io/read/01gr442gq9g1s6t401zvnszsbg))
- The decoder stack outputs a vector of floats. How do we turn that into a word? That’s the job of the final Linear layer which is followed by a Softmax Layer.
  The Linear layer is a simple fully connected neural network that projects the vector produced by the stack of decoders, into a much, much larger vector called a logits vector.
  Let’s assume that our model knows 10,000 unique English words (our model’s “output vocabulary”) that it’s learned from its training dataset. This would make the logits vector 10,000 cells wide – each cell corresponding to the score of a unique word. That is how we interpret the output of the model followed by the Linear layer.
  The softmax layer then turns those scores into probabilities (all positive, all add up to 1.0). The cell with the highest probability is chosen, and the word associated with it is produced as the output for this time step. ([View Highlight](https://read.readwise.io/read/01gr4436kday4y5drby2w9f7tc))
- Now that we’ve covered the entire forward-pass process through a trained Transformer, it would be useful to glance at the intuition of training the model.
  During training, an untrained model would go through the exact same forward pass. But since we are training it on a labeled training dataset, we can compare its output with the actual correct output.
  To visualize this, let’s assume our output vocabulary only contains six words(“a”, “am”, “i”, “thanks”, “student”, and “<eos>” (short for ‘end of sentence’)). ([View Highlight](https://read.readwise.io/read/01gr443x9f8v1vp5wr32c61w5n))
- ![](https://jalammar.github.io/images/t/vocabulary.png) 
  The output vocabulary of our model is created in the preprocessing phase before we even begin training. ([View Highlight](https://read.readwise.io/read/01gr444rwtqjn4t79nrm00egbd))
- Once we define our output vocabulary, we can use a vector of the same width to indicate each word in our vocabulary. This also known as one-hot encoding. So for example, we can indicate the word “am” using the following vector: ([View Highlight](https://read.readwise.io/read/01gr444akq9ps9fbk8fbx68zxy))
- ![](https://jalammar.github.io/images/t/one-hot-vocabulary-example.png) 
  Example: one-hot encoding of our output vocabulary ([View Highlight](https://read.readwise.io/read/01gr444ptpa7ancdtj89zmjjd6))
- The Loss Function
  Say we are training our model. Say it’s our first step in the training phase, and we’re training it on a simple example – translating “merci” into “thanks”.
  What this means, is that we want the output to be a probability distribution indicating the word “thanks”. But since this model is not yet trained, that’s unlikely to happen just yet.
  ![](https://jalammar.github.io/images/t/transformer_logits_output_and_label.png) 
  Since the model's parameters (weights) are all initialized randomly, the (untrained) model produces a probability distribution with arbitrary values for each cell/word. We can compare it with the actual output, then tweak all the model's weights using backpropagation to make the output closer to the desired output. ([View Highlight](https://read.readwise.io/read/01gr445m67n0aw8x514vrk2xb3))
- But note that this is an oversimplified example. More realistically, we’ll use a sentence longer than one word. For example – input: “je suis étudiant” and expected output: “i am a student”. What this really means, is that we want our model to successively output probability distributions where:
  • Each probability distribution is represented by a vector of width vocab_size (6 in our toy example, but more realistically a number like 30,000 or 50,000)
  • The first probability distribution has the highest probability at the cell associated with the word “i”
  • The second probability distribution has the highest probability at the cell associated with the word “am”
  • And so on, until the fifth output distribution indicates ‘`<end of sentence>`’ symbol, which also has a cell associated with it from the 10,000 element vocabulary.
  ![](https://jalammar.github.io/images/t/output_target_probability_distributions.png) 
  The targeted probability distributions we'll train our model against in the training example for one sample sentence. ([View Highlight](https://read.readwise.io/read/01gr446q3wegn465g7kjqfk962))

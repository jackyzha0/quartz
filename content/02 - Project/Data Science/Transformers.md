---
creation_date: 2023年10月23日
banner: "![[daily-note-banner.gif]]"
banner_icon: "🌞"
tags: "#笔记"
banner_y: 0.4705
---

# Transformers
## 01 Background
**Famous Transformer Models**
- BERT (Bidirectional Encoder Representations from Transformers) [Jacob Devlin et. al., 2018, BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/abs/1810.04805)
- RoBERTa (Robustly Optimized BERT approach) [Yinhan et. al., 2019, RoBERTa: A Robustly Optimized BERT Pretraining Approach](https://arxiv.org/abs/1907.11692)
- T5 (Text-toText Transfer Transformer) [Colin Raffel et. al, 2019, Exploring the Limits of Transformer Learning with a Unified Text-to-Text Transformer](https://arxiv.org/abs/1910.10683)

## 02 Core Concepts
### What is Transformer Network? 
**Resources:** My notes are derived from
- https://stats.stackexchange.com/questions/421935/what-exactly-are-keys-queries-and-values-in-attention-mechanisms
- https://theaisummer.com/self-attention/
- http://jalammar.github.io/illustrated-transformer/
**Intuition**
As our models improved from RNN to GRU to LSTM, we also so increasing complexity. These models are sequential models, ingesting one word/token one at a time. Thus each unit acts like a bottleneck to the flow of information. Because to compute the output of this final unit, for example, you first have to compute the outputs of all of the units that come before.The transformer architecture allows us to run these computations for an entire sequence in parallel. Introduced in [Vaswani et al. 2017, Attention is All You Need]. The transform architecture combines attention based representations and a CNN convolutional neural network style of processing. 

Before discussing the transformer network, let's discuss two important components, **self-attention** and **multi-head attention** and important components such as 

**Remark**
Note the difference between the two papers  
- [Vaswani et al. 2017, Attention is All You Need](https://arxiv.org/pdf/1706.03762.pdf)
- [Bahdanau et. al., 2015, Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/pdf/1409.0473.pdf)  
Both papers played a pivotal role in transformer networks. Below, we will first discuss the model proposed by the first paper and then describe the differences between the two.

**1. High Level Look** 
Let's begin with a high-level look at a transformer network in a machine translation application. This http://jalammar.github.io/illustrated-transformer/ does a good job at discussing transformers and the operations within a transformer network.


**2. Where does the query, key, value terms come from?**
The concept comes from a database scheme. Probably familiar with a key-value lookup. A key-value lookup has three components.
1. List of $n_k$ **keys**
2. List of $n_k$ **values** (that has a 1-1 mapping with the keys, forming a key-value pairs)
3. A **query**, for which we want to *match* with the keys and get some value based on the match.

For example, in a database, when a query is passed to the computer, a two step process occurs.
- First, the computer has to search and match your query to the key. The goal of any good database is to find the best matches.
- Second, the computer returns value of the same record of the key

So how does this relate to our translation task? Let's say we have the sentence
$$\text{Jane visite l'Afrique on steptembre}$$
When our eyes see **l'Afrique**, our brain looks for the most related word in the rest of the sentence to understand what **l'Afrique** is about (query). Your brain might focus on the word **visite** (key).
$$\text{Jane visite} \space \textbf{l'Afrique} \space \text{on steptembre}$$
$q^{\langle 3 \rangle}k^{\langle 2\rangle}$ essentially matches up the query and the key, and tells us how good **visite** (key) is to the query. The query can be understood as a question asking about the meaning of the word, perhaps "what's happening there?". And $q^{\langle 3 \rangle}k^{\langle 2\rangle}$ tells us how good $k^{\langle 2 \rangle}$ or **visite** is as an answer to the question. We calculate this for each key in the sentence. Thus, we would assume $q^{\langle 3 \rangle}k^{\langle 2\rangle} \geq q^{\langle 3 \rangle}k^{\langle 1\rangle}$. In other words, **visite** (key) should be  a better answer to the question (query) than **jane** (key). These multiplications are known as the **attention scores** calculated through dot product multiplication. 

Let's visualize a basic model of self-attention before breaking down the components.
![[Pasted image 20231021113408.png | center | 500 ]]


**3. What is $A^{\langle t \rangle}$, what is Self-Attention?**
The goal behind self attention, is to look at its context (surrounding words) to try to find "how" we are talking about $A^{\langle t \rangle}$ in this sentence, and find the most accurate representation of it.  Above we saw how query and key play into this role. Now, we try to break down the full architecture, let's begin with the mathematical definition of attention. This is also known as **scaled dot-product attention**
$$\text{Attention(Q,K,V)} = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$
Or for the self-attention for one specific word.
$$ A^{\langle 3\rangle} = A\left(q^{\langle3\rangle}, K, V\right)$$

So how do we obtain the query, key, value?
$$ q^{\langle 3\rangle} = W^{Q}x^{\langle 3\rangle}, \space k^{\langle 3\rangle} = W^{K}x^{\langle 3\rangle}, \space v^{\langle 3\rangle} = W^{V}x^{\langle 3\rangle}$$
where $W^{Q},\space W^{K}, \space W^V$ are parameters to be learned by the neural network. $x^{\langle t\rangle}$ are the embeddings of each word. Let's vectorize this. Here is the calculations for $Q$, but can be generalized to get $K$ and $W$.
$$ Q_{\left(T\_{x}, q\_features\right)} = \begin{bmatrix} q^{\langle1\rangle}  \\ q^{\langle2\rangle}  \\ \vdots\ \\ q^{\langle T_{x}\rangle}    \end{bmatrix}= \underbrace{\begin{bmatrix} \rowcolor{lightblue} &&&&x^{\langle 1 \rangle}&&&& \\ \rowcolor{lightgreen}  &&&&x^{\langle 2 \rangle}&&&&  \\ &&&&\vdots&&&& \\ \rowcolor{lightpink} &&&&x^{\langle t \rangle}&&&& \end{bmatrix}}_{(T_{x}, num\_features)} \underbrace{\begin{bmatrix} &&&&&&&&  \\ &&&&&&&& \\ &&&&W^Q&&&& \\ &&&&&&&&  \\ &&&&&&&&  \end{bmatrix}}_{(num\_{features,}q\_features)} $$
or more simply $Q = X \cdot W^T_Q$. $q\_features$ is the dimension of the query vectors.

After, the **attention score** $QK^T$ is then divided by $\sqrt{d_k}$, where $d_{k}$ is dimension of key vectors (**scaling)**. This leads to having more stable gradients. This is passed into the **softmax** function, which normalizes the scores so they're all positive and add up to 1. The softmax score determines how much each word will be expressed at this position.

**Remark:** Mathematically speaking, the matching up of query and key, or QKt is the measuring of cosine similarity between Q and K. The higher the similarity, the more relevant the record is.

**Remark:** Unlike **attention** described [[Machine Learning#What is the Attention Model?|here]], we can essentially compute these **attention** scores at the same time. This makes computation faster since we can parallelize calculations (GPU). 

Next, we multiply the $V$ value vectors or **attention value** by the softmax score. What is $V$? 
- The intuition here is to keep intact the values of word(s) we want to focus on, and drown-out irrelevant words.
- Is matrix multiplication of **attention weights** with the values to compute the weighted values. This is how the attention mechanism "attends" to the relevant information in the values based on the **attention scores**.
- However, based on the formula, $\text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$, there is no clear summation step. But, matrix multiplication (`np.matmul`) essentially does this. It computes the weighted sum, where the values that are more relevant (higher attention scores) contribute more to the final output, and those with lower attention scores contribute less

**Remark:** Let's review why its considered dot product. Let's break down the multiplication math even further. Well, we should consider just getting attention for a single query. $A^{\langle 3\rangle}=\text{softmax}\left(\frac{q^{\langle 3\rangle} K^T}{\sqrt{d_K}}\right)V$ . In this the following math, we ignore $\text{softmax}$ and scaling because they don't change the dimensions.

$$ A^{\langle 3\rangle}_{(1,\space d\_v)} = q^{\langle 3\rangle}K^{T}v^{\langle3\rangle} = \underbrace{\begin{bmatrix}  &&&& \end{bmatrix}}_{1, d\_q} \underbrace{\begin{bmatrix} \rowcolor{lightblue} &&&& \\ \rowcolor{lightgreen} &&&& \\ &&\vdots && \\ \rowcolor{lightpink} &&&&\end{bmatrix}^{T}}_{(n\_{k,\space} d\_{k)}} \underbrace{\begin{bmatrix}\\ \\  &&&& \end{bmatrix}}_{(n\_v,\space d\_v)} =  \underbrace{\begin{bmatrix} \cellcolor{lightblue} & \cellcolor{lightgreen}& \dots & \cellcolor{lightpink}\end{bmatrix}}_{(1, n\_{k)}} \underbrace{\begin{bmatrix}\\ \\  &&&& \end{bmatrix}}_{(n\_v,\space d\_v)}$$

$$ = \underbrace{\begin{bmatrix} \cellcolor{lightblue} & \cellcolor{lightgreen}& \dots & \cellcolor{lightpink}\end{bmatrix}}_{(1, n\_{k)}} \underbrace{\begin{bmatrix} \cellcolor{lightblue} && \cellcolor{lightblue} \\ \cellcolor{lightgreen} &&\cellcolor{lightgreen} \\ \vdots \\ \cellcolor{lightpink} && \cellcolor{lightpink}\\ \end{bmatrix}}_{(n\_v,\space d\_{v)}} = \underbrace{\begin{bmatrix} &&&& \end{bmatrix}}_{(1, d\_v)}$$

where $d_{q}, d_{k},d_{v}$ represent the dimension of the query, key, and values vectors respectively.  Also, the $n_{k}, \space n_v$ represents that the number of keys and values. In order for the first dot product to work, the dimension of query and key must always be the same. In the paper, all the values are simply 64. 

We notice that it is matrix multiplication, which is simply dot product in matrix form. The last step multiples the row vector $(1, n\_{k)}$ to value matrix $(n\_{v}, d\_v)$ to get $(1, d\_v)$,  Each element in the final matrix vector is the summations. 
$$ \begin{bmatrix} \cellcolor{lightblue} \sum\limits_{i=1}^{n_{v}}q^{\langle 3\rangle}k^{1}v^{\langle i \rangle} & \cellcolor{lightgreen}\sum\limits_{i=1}^{n_{v}}q^{\langle 3\rangle}k^{2}v^{\langle i \rangle} & \dots & \cellcolor{lightpink} \sum\limits_{i=1}^{n_{v}}q^{\langle 3\rangle}k^{n\_k}v^{\langle i \rangle}\end{bmatrix}\ $$
This is shows how the final step is the summation form as described in our visualization of self-attention.

**4. Putting it Together**
Now you should be able to understand self-attention. Here is the architecture proposed in the paper compared to what we previously drawn. 

| Our Design                           | Paper                                |
| ------------------------------------ | ------------------------------------ |
| ![[Pasted image 20231021113408.png]] | ![[Pasted image 20231021112720.png]] |

**Remark:** Another way to understand self attention: As each model processes each word (each position in the input sequence), self attention allows each word to look at other positions in the input sequence for clues that can help lead to better encodings for the word. 

**Remark**: Think of $QK^T$ as an inquiry system that proposes the inquiry: "For the word **q** that your eyes see in the given sentence, what is the most related word **k** that sentence to understand what **q** is about?. The inquiry system provides the answer as a probability. Refer to this stack https://stats.stackexchange.com/a/531971 for more details.

**5. What is Multi-Headed Attention?**
**Intuition:** This part allows the model to focus on different positions based on the type of query. For example, in one self-attention model are calculating attention scores based on the how well the other words (keys) answer the question "what's happening there?" (query). If we only asked this one question, attention on **l'Afrique** might be dominated by **visite**, or even by itself. What if we wanted to ask another question "when?". Then in this second query, **september** (key) will give us the highest attention score.

As we see next, multi-headed attention uses multiple sets of Query/Key/Value weight matrices to calculate multiple heads $h$. The output of these $h$ heads are then concatenated, and multiplied by another matrix $W_o$. The formula for it can be shown below$$ \text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_1,\dots,\text{head}_h){W^O}$$where $\text{head}_{i}=\text{Attention}\left(QW_{i}^{Q},KW_{i}^{K},VW_{i}^{V}\right)$ 

**Remark:** Every time we calculate self-attention, it is called a head, hence, multi-head is calculating head a bunch of times. Calculation of these heads are independent and can be done in parallel. 

**However**, notice the extra weight matrices $W^{Q}_{i},W^{K}_{i},W^{V}_{i}$ , what are these and how do they compare to the weights discussed in self attention? Let's look at the structure of multi-headed attention.
![[Pasted image 20231021164407.png | center | 500]]
These weight matrices represent the linear layer. If we expand this out. For each attention head $i$,
$$Q_i(x)=xW_{i}^{Q}, \space K_i(x)=xW_{i}^{K}, V_{i}(x)=xW_{i}^{V}$$
$$\text{Attention}_{i(x)}= \text{softmax}\left(\frac{Q_{i}(x)K_{i}(x)^{T}}{\sqrt{d_k}}\right)V_i(x)$$
Thus, we can ignore the one's done in attention above (or else the calculations would be done twice). The last linear layer of multi-head attention is represented by $W^O$. These weights are learnable parameters.

**Remark**: More sources understanding this layer.
- https://ai.stackexchange.com/questions/25148/what-is-different-in-each-head-of-a-multi-head-attention-mechanism
- https://datascience.stackexchange.com/questions/88330/how-do-the-linear-layers-in-the-attention-mechanism-work
- https://datascience.stackexchange.com/questions/94685/what-exactly-is-the-linear-layer-in-the-transformer-model

**Remark:** Multi-headed attention components are often stacked together, where the output of one is the input of the next.

A good visualization to summarize this process.
![[Pasted image 20231021170616.png | center | 600 ]]

![[Pasted image 20231023170832.png | center]]

**6. Understanding the Encoder**
The word embeddings (after linear transformations values $Q,\space K, V$) are fed into an encoder block, which contains a multi-head attention layer. Remember the multi-headed attention produces a matrices which is then passed to a feed forward neural network. The encoder is repeated $N$ times. After passing through $N$ encoding blocks, the output is passed to a Decoder

**7. Understanding the Decoder**
The decoder also repeats $N$ times. The goal of the decoder block is to predict the next word.

**8. The Transformer Network**
Let's visualize the entire network.
![[Pasted image 20231023181544.png | center ]]
![[Pasted image 20231023234014.png]]

There are some extra parts to discuss.
- **K, V** passed from encoder network. Why? **Intuition**. The input of the decoder is whatever we have translated so far. The key and value pair generated from the encoder block should give us the best key that matches with the **query**.
- **Positional Encoding** provide information about position of word in a sentence. The positional encoding is directly added to the input word embeddings.
- **Residual Connections**: also pass with residual connections seen in [[Residual Network]]. It's purpose is to pass positional information throughout the entire architecture.
- **Add & Norm:** Uses layer similar to BatchNorm.
- **Masked Multi-head Attention** is only important the training set. During training, instead of generating one word at a time, since we have access to the entire correct translation (the correct English output) and the entire correct input (correct french input, masking blocks out parts of the sentence to mimic what the network will need to do at test time or during prediction. It pretends that the network has perfectly translated part of the sentence, hides the remaining words, and given the translated part, whether the network can translate the next words accurately. 
	- For example, let's say the **masked multi-head** masks the bolded words $\text{Jane visits Africa} \space \textbf{in September}$, in other words, pretends perfect translation of the unbolded words, that given the words $\text{Jane visits Africa}$, check whether the network can predict accurately.


**9. Understanding**
- Discuss what is being learned.


#TODO **More things to break down in the future**
- Why does dividing by $\sqrt{d_k}$ lead to more stable gradients?
- Understanding the dimensions of inputs/outputs in greater detail.

#### Designing Transformers
Other things to consider
- number of keys selected, what exactly are the keys coming from
- dimensions of query, value, and key vectors.

**Architectures**
- 



## 03 Transformer Architectures

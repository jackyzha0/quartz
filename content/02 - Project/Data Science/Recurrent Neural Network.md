---
creation_date: 2023年08月15日
banner: "https://images.unsplash.com/photo-1545987796-200677ee1011"
banner_icon: "🌞"
tags: "#笔记"
banner_y: 0.4705
banner_x: 0.51902
---

# Recurrent Neural Network

# 01 Background
We first look at the architecture of RNN and the basic intuition behind it. Then we discuss word embeddings in NLP, and word embeddings can be used in various applications that utilize RNNs.

**Resources**
- https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks
# 02 Core Concepts
## Architectures
**Why not use a standard neural network?**
- Inputs/outputs can be different lengths in different examples
- Doesn't share features learned across different positions of text

**Types of RNN Architectures**
![003 RNN - Architectural Types of Different Recurrent Neural Networks](https://media5.datahacker.rs/2020/09/54-1024x547.jpg)

The last many-to-many architecture can be split into two parts. The **encoder** and **decoder**

Example applications of each architecture:
- One-to-one
- One-to-many: (1) Music Generation (2) Text Generation (3) Image Captioning
- Many-to-one: (1) Sentiment Classification
- Many-to-many: (1) Name Entity Classification 
- Many-to-many (Encoder-Decoder): (1) Machine Translation

Though it is important to note that different architectures can be used to solve the same application.
### Simple Unidirectional RNN
Let's start off with the definition of a simple RNN. Let's review the architecture of a basic recurrent neural network. Let's suppose we are building a RNN to determine what words in a sentence are names. This is known as **Name Entity Recognition**.
![[Pasted image 20231011163651.png | center ]]

Suppose reading a word from left to right. At timestamp 1, the first word $x^{\left<1\right>}$ is fed into the first neural network layer. The neural network may predict output $\hat{y}^{\left<1\right>}$ . For example, it may give the probability of whether a word in a sequence is in fact a name.  $x^{\left<1\right>}$ is a representation of a word, perhaps **1-hot representation** or **featured representation**

Then when the second word is read. Instead of only predicting $\hat{y}^{\left<2\right>}$ using the current word $x^{\left<2\right>}$ , it also gets some information computed at timestamp 1. The activation function from timestamp 1 $a^{\left<1\right>}$ is passed. This is repeated until the final timestamp. The initial activation function is sometimes set as a vector of zeros. A "rolled" diagram may be presented as shown on the left. But it might be more intuitive to "unroll" it as shown on right.

The parameters (governing the connection from input $x$ to hidden layers) it uses for each time stamp are shared. This is denoted as $w_x$. The same is for activation function $w_h$

The calculations are 
$$ a^{\left<0\right>}= \vec{0}, \space a^{\left<1\right>} = g\left(W_{aa}a^{\left< 0 \right>} + W_{ax}x^{\left<1\right>} + b_{a}\right) \tag{1}$$
$$ y^{\left<1\right>} = g\left(W_{ya}a^{\left<1\right>} + b_{y}\right)\tag{2}$$
Equations $(1)$ and $(2)$ can easily be generalized for timestamp $t$. This notation is often simplified as 
$$ 
a^{\left<t\right>} = g\left(W_a\left[a^{\left<t-1\right>}, x^{\left<t\right>}\right] + b_a\right)
$$
**Remark:** The weight matrices are shared by all LSTM units.

### Backpropagation in RNN
Let's define a loss function, that gives a loss associated with a single prediction at a single time stamp $t$
$$ 
L^{\left<t\right>}\left(\hat{y}^{\left<t\right>}, y^{\left<t\right>}\right) = y^{\left<t\right>} \log\hat{y}^{\left<t\right>} - (1-y^{\left<t\right>})\log(1-\hat{y}^{\left<t\right>})
$$
To get the overall loss for the entire sequence , simply perform a summation over all the individual time stamps.
$$ 
\sum\limits ^{T_y}_{t=1} L^{\left<t\right>}\left(\hat{y}^{\left<t\right>}, y^{\left<t\right>}\right) 
$$
The back-propagation is defined by red.
![[Pasted image 20231011182621.png]]

***Tips***
- This is a "many to many" architecture.
- One weakness about this simple model is that it does not use any information from words later on in the sentence. Ex. "Teddy Roosevelt was a great President" vs "Teddy bears are on sales!". The next word after "Teddy" is not impacted by words further down. Thus, "Teddy Roosevelt" and "Teddy Bears" may equally be likely.
- This runs into a **vanishing gradient** problem. Ex. "The $\color{blue}\text{cat}$ , which already ate .... $\color{blue}\text{was}$ full" vs "The $\color{blue}\text{cat}$ , which already ate .... $\color{blue}\text{were}$ full" . Thus, languages may have long-term dependencies where a word much earlier can affect what needs to come much later. The model above has no "memorization" of the plural vs singular version of cat (its information is lost)
- **Exploding gradients**  can also occur.
### What is a Gated Recurrent Unit (GRU)? 
The goal is solve the vanishing gradient problem with a new type of RNN unit architecture. Remember the activation function for a RNN is 
$$ 
a^{\left<t\right>} = g\left(W_a\left[a^{\left<t-1\right>}, x^{\left<t\right>}\right] + b_a\right)
$$
This can be visualized as a **unit** shown below.

| Visualization 1 | Visualization 2 |
| --------------- | --------------- |
|         ![[Pasted image 20231011214352.png]]        |      ![[Pasted image 20231012160441.png]]           |

With many units, 
![[Pasted image 20231012161412.png]]

The GRU unit, however, will have a new variable $c$ or memory cell. It will provide a bit of memory to remember information from earlier on. Let's looked at a **simplified** version of GRU. So at time $t$
$$ 
c^{\left<t\right>} =  a^{\left<t\right>}
$$
The GRU unit will output an activation value  $a^{\left<t\right>}$ that is equal to $c^{\left<t\right>}$ . At every time stamp, we will consider overwriting the memory cell with a value $\tilde{c}^{\left<t\right>}$, so this is a **candidate** for replacing $c^{\left<t\right>}$. 
$$ 
\tilde{c}^{\left<t\right>} = \tanh{\left(w_c\left[ c^{\left<t-1\right>},x^{\left<t\right>}\right]\right) + b_{c}}\tag{1}
$$

We will have a gate $\Gamma_u$ (where $u$ stands for update, update gate). A value between 0 and 1. 
$$ 
\Gamma_{u} =  \sigma\left(w_c\left[ c^{\left<t-1\right>},x^{\left<t\right>}\right]\right) + b_{c} \tag{2}
$$
But either 0 or 1 most of the time. In short, we have a candidate way of updating $c^{\left<t\right>}$ using $\tilde{c}^{\left<t\right>}$, but the gate will actually decide whether or not we update it. The specific function can be written as.
$$  c^{\left<t\right>} = \Gamma_{u} \times \tilde{c}^{\left<t\right>}+ \left(1-\Gamma_{u}\right)\times c^{\left<t\right>}$$
In general. if the update value is equal to 1, set the new value of $c^{\left<t\right>}$ to $\tilde{c}^{\left<t\right>}$, otherwise, keep it.  Thus, let's take the following sequence.

> The **cat**, which already ate, ..., was full.

The goal of the model may be to learn that the memory cell of **cat** is either singular or plural. So the $c^{\left<t\right>} = 1$, and then the GRU unit will memorize this (the gates are all zero) until the **was** term, and thus determines to use a singular **was** instead of **were**. In practice however, $c^{\left<t\right>}$ will be multi-dimensional, and may store a lot of different information.

The full GRU unit is defined with the following equations and the following visualization:
- It is important to note that the visualization uses $h$ instead of $c$ and does not include $b$.
- #TODO Why does it need that extra $\Gamma_r$ ?

| Equations | Visualizations |
| --------- | -------------- |
|    ![[Pasted image 20231011205018.png]]       |       ![[Pasted image 20231011205222.png ]]         |

***Tips***
- Motivated by the papers [Cho et al., 2014, On the properties of neural machine translation: Encoder-decoder approaches] and [Chung et al., 2014. Empirical Evaluation of Gated Recurrent Neural Networks on Sequence Modeling]
### What is a Long Short Term Memory Unit (LSTM Unit)? 
Is a slightly more powerful and more general version of GRU.

| Equations | Visualization |
| --------- | ------------- |
|   ![[Pasted image 20231011213622.png]]        |   ![[Pasted image 20231011213713.png]]            |

![[Pasted image 20231012163844.png ]]
Some things to notice right away.
- No longer have the case that $a^{\left<t\right>}$is equal to $a^{\left<t\right>}$
- New gates - forget gate $\Gamma_f$ , and output gate $\Gamma_o$

Let's visualize a Recurrent Neural Network that uses multiple LSTM units.

![[Pasted image 20231012180211.png]]

A simplified version might look like this
![[Pasted image 20231024082845.png ]]
- $X = (x^{\langle 1 \rangle}, x^{\langle 2 \rangle}, \cdots, x^{\langle T_x \rangle})$ is a window of size $T_x$ scanned over the input corpus
* Each $x^{\langle t \rangle}$ is an index corresponding to a value.
* $\hat{y}^{\langle t \rangle}$ is the prediction for the next value.


***What does an multi-layer LSTM look like?***
Let's try to visualize a multi-layer LSTM architecture.
![[Pasted image 20231018122329.png | center | 500]]
This feeds an embedding layer output into an LSTM network..

### Summary of Gates

Summary?
- An LSTM is similar to an RNN in that they both use hidden states to pass along information, but an LSTM also uses a cell state, which is like a long-term memory, to help deal with the issue of vanishing gradients
- An LSTM cell consists of a cell state, or long-term memory, a hidden state, or short-term memory, along with 3 gates that constantly update the relevancy of its inputs:
    - A **forget** gate, which decides which input units should be remembered and passed along. It's a tensor with values between 0 and 1. 
        - If a unit has a value close to 0, the LSTM will "forget" the stored state in the previous cell state.
        - If it has a value close to 1, the LSTM will mostly remember the corresponding value.
    - An **update** gate, again a tensor containing values between 0 and 1. It decides on what information to throw away, and what new information to add.
        - When a unit in the update gate is close to 1, the value of its candidate is passed on to the hidden state.
        - When a unit in the update gate is close to 0, it's prevented from being passed onto the hidden state.
    - And an **output** gate, which decides what gets sent as the output of the time step

***What is peephole connection?*** A slight variation to LSTMs. Uses $c^{\left< t-1\right>}$ in its gates,

***Tips***
- [Hochreiter & Schmidhubder. 1997. Long short-term memory]
- Historically more used than GRU, but GRU is simpler and perhaps more scalable.
- It is relative easy for values stored in memory cell $c^{\left< t\right>}$ be passed down to later values.

### What are Bidirectional RNNs?
#TODO
Getting information from the future in addition to information from the past.
![[Pasted image 20231011215601.png | center | 500 ]]
- Commonly use BRNN with LSTM Blocks.





## Optimizations
### What is Gradient Clipping?
This process helps prevent **exploding gradients**. This is done before updating the parameters.

## Applications
### What is Language Modeling? 
A language model is a probabilistic model over natural language that can generate probabilities of a series of words, based on a (or many) text corpora. Let's talk about **language modeling** and its role in **sequence generation**. Let's generate word sequences (or character sequences) through **Sampling Novel Sequences**.

>[!note] Sampling Novel Sequences

Our goal is to generate a randomly chosen sentence from our RNN language model. 
A sequence model models the probability of any particular sequence of words. Our goal is to sample from this distribution to generate **novel sequences.** Novel means new, unique, unseen. Let's say our RNN has the following structure.
![[Pasted image 20231011190319.png]]
It would give us the model $P\left(y^{\left<1\right>}, \dots, y^{\left<t\right>}\right)$.  But in order to sample, we first sample what the first word you want your model to generate. The first time stamp would output softmax probabilities over possible outputs. Then, we  randomly sample according to the soft max distribution. This distribution tells us "what is the probability that the word is X".

In the second time stamp, it 

This is also called **auto-regressive** (AR), a specific manner in which the RNN generates predictions or outputs over time in a sequential manner, where predictions at each step depend on the model's previous predictions.

> [!note] Text Generation

Examples:
- https://www.kaggle.com/code/purvasingh/text-generation-via-rnn-and-lstms-pytorch


> [!note] Character Generation

What is the difference between word generation and character generation?


***Speech Recognition***
For example, in speech recognition, we want the probability of a sentence.

$P(\text{The apple and pair salad}) < P(\text{The apple and pear salad})$

***Character Generation***
Assuming we have the RNN model, we want to generate characters. Sampling is a technique that can be used to pick the index of the next character (whose mapping is defined by a dictionary) according to a probability distribution.
![[Pasted image 20231012182616.png | center ]]

* At each time-step, the RNN tries to predict what the next character is, given the previous characters. 
* $\mathbf{X} = (x^{\langle 1 \rangle}, x^{\langle 2 \rangle}, ..., x^{\langle T_x \rangle})$ is a list of characters from the training set.
* $\mathbf{Y} = (y^{\langle 1 \rangle}, y^{\langle 2 \rangle}, ..., y^{\langle T_x \rangle})$ is the same list of characters but shifted one character forward. 
* At every time-step $t$, $y^{\langle t \rangle} = x^{\langle t+1 \rangle}$.  The prediction at time $t$ is the same as the input at time $t + 1$.

The process of generation is explained in the picture below:
![[Pasted image 20231012182452.png | center | 800]]
**Remark:** It is important to note that for sequence generation, at test time, the values of $x^{\langle t\rangle>}$ are unknown (can't know in advance.)
### What are Sequence to Sequence Models? 
Sequence to Sequence models, aka, Seq2Seq models, aims to convert from one sequence to another sequence of things. It is often built on top of **language modeling** concepts, but involves a **encoder-decoder** many-to-many RNN architecture. The idea of Seq2Seq was introduced in the paper [Sutskever et al., 2014. Sequence to sequence learning with neural networks].

Let's try to understand sequence to sequence models through machine translation.

> [!note] Machine Translation

Introduced in [Cho et. al., 2014, Learning phrase representations using RNN encoder-decoder for statistical machine translation]. Let's say we want to translate the French sentence
$$ 
\begin{align} \overset{x^{\left<1\right>}}{\text{Jane}} \space \overset{x^{\left<2\right>}}{\text{visite}}  \space \overset{x^{\left<3\right>}}{\text{l'Afrique}} \space \overset{x^{\left<4\right>}}{\text{en}} \space 
\overset{x^{\left<5\right>}}{\text{septembre}} \end{align}
$$
to the English.
$$ 
\begin{align} \overset{y^{\left<1\right>}}{\text{Jane}} \space \overset{y^{\left<2\right>}}{\text{is}}  \space \overset{y^{\left<3\right>}}{\text{visiting}} \space \overset{y^{\left<4\right>}}{\text{Africa}} \space 
\overset{y^{\left<5\right>}}{\text{in}} \space \overset{y^{\left<6\right>}}{\text{September}} \end{align}
$$
We can use a encoder-decoder network designed like this
![[Pasted image 20231018121049.png]]
Where the first half is the encoder which produces a vector to represent the sentence, and the second part is a decoder, which does the translation.

**Conditional Language Modeling**
The key difference between sequence to sequence models and [[Recurrent Neural Network#Language Modeling (and Sequence Generation) |sequence generation]] is rather than wanting to generate a sentence at **random**, we want to choose the **most likely** sentence, This is also known as conditional language modeling, not to be confused with [[Recurrent Neural Network#Recurrent Neural Network#What is Language Modeling?|language modeling]].

Previously, language modeling proposed the model $P\left(y^{\left<1\right>}, \dots, y^{\left<t\right>}\right)$. Now, we have $\ P\left(y^{\left<1\right>}, \dots, y^{\left<t\right>} \mid x^{\left<1\right>}, \dots, x^{\left<t\right>}\right)$. In machine translation for example, we are no longer sampling at random from the distribution, instead we want to find an English sentence $y$ that maximizes the conditional probability, given a French input.
$$ \arg\max_{y^{\left<1\right>}, \dots, y^{\left<t\right>}} P\left(\underline{y^{\left<1\right>}, \dots, y^{\left<t\right>}} \mid x^{\left<1\right>}, \dots, x^{\left<t\right>}\right)$$
Methods
- Greedy Search: Tells us to simply choose the most likely first word according to the conditional language model. Then pick the second most, etc. This means that it is still more likely to choose common words like "go", 
**Beam Search Algorithm**
In the first step, try to evaluate the probability of the first word $P(y^{\langle1\rangle}\mid x)$ given the input sentence. While the greedy algorithm simply picks the most likely for the first word, the beam search algorithm selects the $B$ most likely ones for the first word.

In the second step, for each of the $B$ selected first words, choose the next word (out of all possible words in dictionary) based on the first word. In other words, we want to evaluate the probability of the second word given the input sentence and the first word. 
![[Pasted image 20231018161028.png | center | 300]]

Our goal is to find the pair (first, second) that is the most likely. We want to maximize  $P(y^{\langle1\rangle},y^{\langle2\rangle}\mid x)$ The rules of conditional probability show us that. 
$$P(y^{\langle1\rangle},y^{\langle2\rangle}\mid x) = P(y^{\langle1\rangle}\mid x)P(y^{\langle2\rangle}\mid x, y^{\langle1\rangle}) $$
After doing this for each word selected in the first step, we choose the $B=3$ most likely pairs.
![[Pasted image 20231018161447.png | center | 300 ]]
In the example above, although $\text{september}$ is no longer selected, we still have three pairs $\text{in september}$, $\text{jane is}$, and $\text{jane visits}$. At the same time, because $B=3$, at every step, we instantiate three copies of network. In the third step, the network allows us to evaluate the probability of the third word given that the first two words are X. The maximum is ...

**Refinements to Beam Search**
- Length normalization - reducing numerical underflow, numerical rounding errors, prevent bias for shorter translation.
- Beam width - large B gives better results (consider more possibilities), but slower and more computational expensive, small B gives worse results but faster

As you run beam search you see a lot of sentences with length equal 1, length sentences were equal 2, length sentence that equals 3 and so on, and maybe you run beam search for 30 steps you consider, I'll put sentences up to 30, let's say. Would be with a three, you would be keeping track of the top three possibilities for each of these possible sentence length 1, 2, 3, 4, and so on up to 30. The generalized function where $T_y$ is number of words, is shown below.
$$ \arg \max$$

Then you look at all output sentences and compute a score using the following objective equation.
$$ 
\sum\limits^{T_Y}_{t=1}\log P\left( y^{\langle t \rangle} \mid x,y^{\langle 1 \rangle},\dots,y^{\langle t-1\rangle}  \right)
$$
And pick the one that achieves the highest of this normalized, log probability objective function.

It is important to note that Beam Search is not guaranteed to find the max. It is known as a **heuristic search algorithm** or **approximate search algorithm**. 

**Performing Error Analysis**
The model contains two parts. the Beam Search algorithm and the RNN. Our goal is to attribute the error to one of these two, so we know which one to tune. 

Remember that RNN simply computes $P(y\mid x)$ . We can compute $P(y^{*} \mid x)$ and $P(\hat{y} \mid x)$ . Where $y^{*}$ is the correct translation and the $\hat{y}$ is the translation given by the model. We can there compare the two to ascribe the error to either the search algorithm or module.
$$ 
\begin{cases} P(y^{*} \mid x) > P(\hat{y} \mid x) & \text{Beam search is at fault}\\ P(y^{*} \mid x) \leq P(\hat{y} \mid x) & \text{RNN model is at fault}
 \\ \end{cases}
$$
This ignores some complications*. But in the error analysis process, we go through translations, and try to see whether Beam search or model is at fault. This gives us what fraction of errors are "due to" beam search vs RNN model.
### What is the Attention Model?
**Intuition**
For machine translation as shown above, we've been using a encoder-decoder architecture. In it, the encoder reads in a whole sentence (in French), memorizes it, and outputs a different. However, it is super difficult to get a model to learn long sentences. So as sentences become longer, the **Bleu** score has a huge dip. Human' translators, instead of memorizing the whole sentence and then translating, they will translate bit by bit, read/re-read and focus on parts of the French sentence corresponding to the English parts currently being translated. Similarly, the attention model looks at parts of the sentence at a time. 
![[Pasted image 20231019135427.png | center | 300 ]]
The above graph shows how attention can allow translations to work for even long sentences.
**Implementation**
In essence, the attention mechanism tells the sequence to sequence model where it should pay attention to at any step.
![[Pasted image 20231019150715.png ]]

Not, in this example, we are only using a basic RNN. Below is a more detailed look in how the activation architecture fits into the neural network.
![[Pasted image 20231019191433.png ]]

The attention model was introduced in [Bahdanau et. al., 2014, Neural machine translation by jointly learning to align and translate]


**Image Captioning**
Seq2Seq models can even be used for image related tasks. 
First proposed by [Mao et. al., 2014, Deep captioning with multimodal recurrent neural networks]

**TIps**
- One downside is that it takes quadratic time.
### Speech Recognition Problem
One method is to use the **attention model** describe above, where $x^{\langle t \rangle}$ represent different timeframes of the audio and the output is the transcript.

Another is the CTC cost for speech recognition model. Introduced in [Graves et. al., 2006, Connectionist Temporal Classification: Labeling unsegmented sequence dta with recurrent neural networks]
### Trigger Word Detection
Trigger word detection is the technology that allows devices like Amazon Alexa, Google Home, Apple Siri, and BaiduDuerOS to wake up upon hearing a certain word.

What is audio recording? In essence, a microphone records little variations in air pressure over time, and it is these little variations in air pressure that your ear also perceives as sound. An audio recording can be represented as a long list of numbers measuring the little air pressure changes detected by the microphone.

An audio sampled at 44100 Hertz means that the microphone gives us 44,100 numbers per second. Thus a 10 second audio clip is represented by 441,000 numbers.

We can use a **spectrogram** to help our sequence model detect whether or not a trigger word was said. The spectrogram tells us how much different frequencies are present in an audio clip. Refer to [[Signal Processing]] for more details.

![[Pasted image 20231019221334.png ]]

### Transformers?
There are many limitations of RNN, including
- Vanishing gradient problem
- Lack of Parallelism
Because of the limitations of RNN, [[Transformers]] is introduced.


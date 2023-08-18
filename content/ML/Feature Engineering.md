---
title: "Feature Engineering"
tag: ml
date: 
alias:
---

In many ML problems, we are descriptions of the inputs with many different types of attributes, including numbers, words, and discrete features. An important factor in the success of an ML application is the way that the features are chosen to be encoded by the human who is framing the learning problem. 

Let’s say we have $k$ discrete features in the raw data. Encoding strategies:
- **Numeric:** Assign each value a number like $\frac{1}{k},\frac{2}{k}, ..., 1$
- **Thermometer code:** If discrete values have a natural ordering from $1, ..., k$ but not a natural mapping to real numbers, we can create a vector of length $k$ and a discrete input value $0 < j \leq k$ is a vector in which the first $j$ values are $1$ and the rest are $0$
- **Factored code:** If your discrete values can sensibly be decomposed into two parts (say the “make" and “model" of a car), then it's best to treat those as two separate features, and choose an appropriate encoding of each one from this list.
- **One-hot encoding:** If there is no ordering or numeric structure, we can use a vector of length $k$ where we convert a discrete input value $0 < j \leq k$ to vector in which the first $j$th value is $1$ and the rest are $0$
- **Binary code:** Bad! No!

>[!example]- Blood type encoding example
>![[Pasted image 20230712000819.png]]

**Text-encoding:**
- _Bag of words_: The idea is to let d be the number of words in our vocabulary (either computed from the training set or some other body of text or dictionary). We will then make a binary vector (with values 1.0 and 0.0) of length d, where element $j$ has value 1.0 if word $j$ occurs in the document, and 0.0 otherwise.

**Numeric encoding:**
- If some feature is already encoded as a numeric value (heart rate, stock price, distance, etc.) then you should generally keep it as a numeric value. An exception might be a situation in which you know there are natural “breakpoints" in the semantics: for example, encoding someone's age in the US, you might make an explicit distinction between under and over 18 (or 21), depending on what kind of thing you are trying to predict. It might make sense to divide into discrete bins (possibly spacing them closer together for the very young) and to use a one-hot encoding for some sorts of medical situations in which we don't expect a linear (or even monotonic) relationship between age and some physiological features.
- Scaling
	- It can be smart to scale your feature values to between $[-1, +1]$. 
	- Without performing this transformation, if you have one feature with much larger values than another, it will take the learning algorithm a lot of work to find parameters that can put them on an equal basis.
	- Another example when dealing with a distribution of values is calculating the $\phi$-score like $\phi(x) = \frac{x-\bar{x}}{\sigma}$
	- This also makes like applying higher-order [[polynomial basis]] transformations easier
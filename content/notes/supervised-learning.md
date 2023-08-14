---
title: "supervised-learning"
aliases: supervised learning
tags: AI
---


[[machine-learning|machine learning]] where the agent learning a function from inputs to outputs.

- a sample of labelled data is given
- a model mapping input to outputs is chosen
- the learning algorithm works out parameters values of the model that produce the correct output

## Induction
The basic principle behind supervised learning is induction. We can define an inductive learning procedure as follows:

- Assume there is some “true”, unknown function, $f$ which takes input and returns ”true” output $y = f(x)$
- An indirect evidence of the “true” function is a pair $(x, y)$
- Take a hypothesis function $h$ that approximates the “true” function and returns output $\hat{y} = h(x, w)$
	- We kind of need to guess what $h$ is
- An inductive learning procedure takes a set of examples and modifies w so that $\hat{y} ≈ y$
- Hopefully $h(x, w) ≈ f(x)$ 

We want a hypothesis function which generalises well to unseen examples of $f$.

However, a correct hypothesis, that predicts known values of y, may not **generalise well**

Useful models are ones that perform well on unseen data. they [[generalisation|generalise]] 

a **consistent** hypothesis does well on training data. However, it is possible to **overfit** to patterns of the training data. This is also called being **overtrained** and thee models do not generalise well

there is a tradeoff between consistency and **simplicity**. More simple solutions tend to generalise better. [[occams-razor]] tells us to choose the most simple option. It is often possible to get a more simple hypothesis if the ignore some of the data.

## Data for supervised learning
- Data available for training is usually split in two sets 
	- **Training** – data used to train the model 
	- **Testing** – data used to verify the performance of the model 
- Consistency, good performance on training data, is not necessarily an indication of good generalisation – your hypothesis might be overfitting the data. 
- Good performance on test data is a better indicator of generalisation... but *only as good as your test set*.


## discriminative vs generative
**discriminative** models attempt to model the agent function directly (many to one) (image is cat or dog)

**generative** models attempt to model the agent function by modelling the inverse relationship (one to many) (draw me a cat)

[[bayesian-reasoning]] is a generative model. it computes the discriminative part (P(y|x)) using the generative (P(x|y)) part

## classification vs regression 
From the modelling point of view, there are two important distinctions of the learning tasks: 
- **classification** – those that involve the model to output a *discrete* values from a finite set of choices (related to decision making) For example: Given images of two faces – are the individuals related or not? 
	- [[decision-tree]]
- **regression** – those that involve the model to output a *continuous* (real number) value For example: Given images of two faces – what is the genetic distance between two individuals?
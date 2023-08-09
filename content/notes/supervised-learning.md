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

## discriminative vs generative
**discriminative** models attempt to model the agent function directly (many to one) (image is cat or dog)

**generative** models attempt to model the agent function by modelling the inverse relationship (one to many) (draw me a cat)

[[bayesian-reasoning]] is a generative model. it computes the discriminative part (P(y|x)) using the generative (P(x|y)) part

## classification vs regression 
From the modelling point of view, there are two important distinctions of the learning tasks: 
- **classification** – those that involve the model to output a *discrete* values from a finite set of choices (related to decision making) For example: Given images of two faces – are the individuals related or not? 
- **regression** – those that involve the model to output a *continuous* (real number) value For example: Given images of two faces – what is the genetic distance between two individuals?
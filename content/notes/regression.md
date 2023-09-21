---
title: "regression"
aliases: linearneuron
tags: 
---
A type of [[supervised-learning]] model that involves the model to output a *continuous* (real number) value. We assume there is a relationship $h$ that maps inputs $x$ to a prediction $\hat{y}$ using a function $f$ which we attempt to approximate by adjusting some parameters (weights) $w$ to find a minimum loss.

$$
\hat{y} = h(x,w)
$$

## Linear regression
The model hypothesis is a weighted sum of inputs. Some linear regression problems can be solved using [[loss-function#least squares]]. Otherwise they can be optimised by training using [[loss-function#mean squared error (MSE)]]

$\hat{y}-h(x, w)=w_1 x_1 + w_2 x_2 + \ldots + w_k x_k + w_0$
  
![300](https://i.imgur.com/mYq8PDE.png)


## Polynomial regression
The model hypothesis is a weighted sum of **polynomials** of inputs. Given training data, $(x,y)$, where $(x \in R)$ and $(y \in R)$ are real values, a polynomial of degree $k$ is a hypothesis

$\hat{y}-h(x, w)=w_k x^k+w_{k-1} x^{k-1}+\ldots+w_1 x+w_0$

Uses [[loss-function#least squares]] and [[loss-function#mean squared error (MSE)]]

There is no direct comparison of polynomial regression as a neuron. In order to get polynomial behaviour from a neuron you would need to manipulate the input space to be more rich or use an [[multi-layer-perceptron|MLP]].


![[regression-as-a-perceptron]]

![[logistic-regression]]



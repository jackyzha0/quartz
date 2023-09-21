---
title: "multi-layer-perceptron"
aliases: MLP
tags: AI
---

A combination of many [[perceptron]]s in order to produce more complex classifications. It has been shown that an MLP with one hidden layer enough neurons, and a sensible activation function, is a [[universal-approximator]]

![|300](https://i.imgur.com/jSbzI8F.png)

## Learning in MLP

The [[perceptron#Learning Rule]] only applies to the output layer because for hidden layers, we have no $\hat{y}$

We can train it using [[steepest-gradient-descent]] and [[cross-entropy-loss]] if we use [[sigmoid-activation]] instead of [[hard-limiting-neuron]].

[[backpropagation]] is a recursive implementation of the chain rule that makes the computation of derivatives of a $J$ with respect to hidden MLP parameters very efficient. It is a way of pushing derivatives back through the network as layers rather than per single node. 
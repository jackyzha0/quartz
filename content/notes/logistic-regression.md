---
title: "logistic-regression"
aliases: 
tags: AI, regression
---

## Logistic Regression
Allows us to train a classification model using [[steepest-gradient-descent|SGD]] by making the output a continuous function that predicts probabilities using a [[sigmoid-activation]] function. Making the data continuous allows us to take derivatives which is necessary for  [[steepest-gradient-descent|SGD]]. We cannot train a [[hard-limiting-neuron]] ([[perceptron]]) using SGD because the function is not continuous so we cannot take derivatives

Logistic regression is a modified version of [[regression]] which is suitable for solving binary [[classification]].

Using the idea of [[regression-as-a-perceptron]] we can understand logistic regression as a single neuron with a sigmoid activation function 

The model is trained to minimise [[cross-entropy-loss]]

It can also be using for [[multi-class-classification]]

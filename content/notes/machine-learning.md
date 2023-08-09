---
title: "machine-learning"
aliases: machine learning
tags: AI
---


[[agent-model|agents]] which learn from the sensory data it receives, rather than a person designing it by hand.

instead of mapping percepts to function as in the [[agent-function]] we map inputs $x$ to outputs $y$ by approximating a function $y=f(x)$. The true function $y=f(x)$ is unknown. We assume there is a relationship between the data and the labels of the data (in the case of [[supervised-learning]], otherwise we are looking for relationships as in [[unsupervised-learning]]). Our approximation is the *hypothesis function*. $\hat{y} = h(x,w)$.

- $y$ is desired output
- $\hat{y}$ is prediction/output
- $h$ is hypothesis
- $(x,w)$ is input
- $x$ and $w$ are parameters

The approximated function can also be called the *model*. The accuracy of the approximation is measure by a [[loss-function]]


---
title: "probability"
aliases: 
tags: math, AI, stats
---

probability
- the set of outcomes is the **sample space**
- the probability of an event occurring is the relative frequency of that outcome being observed
- the result of a random experiment is denoted as a **random variable**
- e.g., $P(X=x)

events
- a **event** is a subset of points in a sample space
- a probability of the event $A$ is the sum of probabilities of each sample point it contains
- e.g., $P(X>4)
- conditional probability is the probability of an event given information about some other event

distribution
- a **probability distribution** tracks the probabilities of random variables over the entire sample space
- for **discrete** variables use a **probability distribution function**. return a probability of an outcome being given a value (**sums to 1**)
- for **continuous** variables use a **probability density function**. returns the **likelihood** of an outcome being close to a given value (**integrates to 1**)
- a distribution of two or more random variables is called a **joint distribution**
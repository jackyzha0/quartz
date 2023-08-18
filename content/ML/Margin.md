---
title: "Margin"
tag: ml
date: 
alias:
---

>[!note] Definition
>A margin of a labeled data point $(x,y)$ with respect to separator $\theta$ is:
> $$y \cdot \frac{\theta^{T}x}{||\theta||}$$
> Margin of a dataset is:
> $$\text{min} (y^{i} \cdot \frac{\theta^{T}x^{i} + \theta_0}{||\theta||})$$

Here, we have:
- $y$ is the target label (+1 or -1)
- $\frac{\theta^{T}x}{||\theta||}$ is the signed distance from the point to the separator

Margin is used to express the correctness of a [[Linear Classifier]]
- Negative margin – pretty wrong
- Large margin – pretty right

- Margin is relevant to other concepts:
	- [[Perceptron Convergence Theorem]]
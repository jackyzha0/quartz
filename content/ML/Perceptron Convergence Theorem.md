---
title: "Perceptron Convergence Theorem"
tag: ml
date: 
alias:
---

If training data $D_n$ is linearly separable, then the [[perceptron]] algorithm is guaranteed to find a linear separator.

>[!note] Perceptron Convergence Theorem
>If there is:
>- Some $\theta^{*}$ such that $y \cdot \frac{\theta^{*T}x}{||\theta^{*}||} \geq \gamma > 0$ for all $i = 1, \cdots, n$
>	- ([[Margin]] of $\theta^{*}$ with respect to dataset $D$ is $\gamma$)
>- $||x^{(i)}|| \leq \mathbb{R}$
>	- (Magnitude of data points is bounded by R)
>
>Then:
>- Perceptron will make at most $\left(\frac{R}{\gamma}\right)^2$ mistakes

Proof:
![[Perception_Convergence_Proof.pdf]]

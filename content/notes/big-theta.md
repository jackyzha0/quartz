---
title: "big-theta"
tags: cosc201
---

# big-theta

>Big theta means $f(n) = \Theta(g(n))$ if there are constants 0 < B < A such that for all sufficiently large n, ==$B × g(n) ≤ f(n) ≤ A × g(n)$==

- Upper and lower bound
- $Θ$ says that $g(n)$ provides **upper** and **lower** bound for $f(n)$
	- "selection sort is $\Theta(n^2)$" -> the maximum number of operations will be bounded bothh above and below by some constant times $n^2$
- $f(n) = \Theta(g(n))$ means that f and g have similar growth rates
- if $f(n) = \Theta(g(n))$ then the opposite is also true
- usually $f(n)$ is complex but $g(n)$ is very simple


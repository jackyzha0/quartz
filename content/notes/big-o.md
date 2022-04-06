---
title: "big-o"
tags: 
- cosc201
---

# big-o

>Big O means $f(n) = O(g(n))$ if there is some constant $A > 0$ such that for all sufficiently large n, $f(n) ≤ A × g(n).$

- Big O provides *upper bounds* only. (usually on worst case runtimes)
	- sometimes cost will be much less
		- does not take special cases into account
		- upper bound
- $O$ says that $g(n)$ provides an upper bound for $f(n)$ 
	- "Insertion sort is $O(n^2)$" -> the maximum number of basic operations in never more than some constanct times $n^2$
- if $f(n) =O(g(n))$ then the opposite is also true
- usually $f(n)$ is complex but $g(n)$ is very simple
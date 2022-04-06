---
title: "asymptotic-notation"
tags: 
- cosc201
- analysis-of-algorithms
---

Asymptotic notations are used in computer science to classify algorithms based how its space and time requirements grow as the input grows. 


# big O notation

Big O defines a bound for the *upper*  bound of the running time (or space) of a algorithm. However, it is possible that the actual running time is much less as it does not take into account special cases


## 1 Formal definition

$f(n) = O(g(n))$ if there is some constant $A$ such that $f(n) < A \times g(n)$


# big theta notation

Big theta defines an *upper and a lower* bound for a the running time (or space) of an algorithm. 


## 2 Formal definition

$f(n) = \theta(g(n))$ if there are some constants $A$ and $B$ where $0 < B < A$ such that for all sufficiently large $n$, $B \times g(n) \geq f(n) \leq A \times g(n)$
---
title: "RAM Model of Computation"
tag: cs
date: 
alias:
---

Simple abstraction model of computing based on a hypothetical *Random Access Machine*

- Each simple operation (`+, *, -, =, if, call)` takes one time step
- Loops and subroutines are *not* simple operations.
	- Considered to be composition of many single-step operations
- Each memory access takes one time step

We measure run time by counting the number of steps an algorithm takes on a given problem instance. 

Based on this model we can calculate [[Complexity]].
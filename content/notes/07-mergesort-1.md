---
title: "07-mergesort-1"
sr-due: 2022-04-26
sr-interval: 23
sr-ease: 250
tags: 
- cosc201
- lecture
---

[mergeosrt](notes/mergeosrt.md)

#unfinished 

# 1 Divide and conquer

1. pre ⇒ break apartinto two or more smaller problems whose size add up to at most n
2. Rec ⇒ solve those problems recursively
3. post ⇒ combine solutions into a solution of the original problem

## 1.1 quicksort

pre ⇒ select pivot and split the array

rec ⇒ apply quicksort to the partitions

post ⇒ not much

designeds when sorting inplace was important

works best of primitive types as they can be stored in the fastest memory location

- memory access can be localised and the comparisions are direct
- those advantages are limited when sorting objects of reference type
- i that case each element of the array is just a reference to where the object really is
- so there are no local access advantages
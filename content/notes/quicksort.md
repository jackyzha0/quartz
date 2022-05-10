---
title: "quicksort"
aliases: Quicksort
tags: 
- cosc201
- sorting-algorithm
---

pre ⇒ select pivot and split the array

rec ⇒ apply quicksort to the partitions

post ⇒ not much

designeds when sorting inplace was important

works best of primitive types as they can be stored in the fastest memory location

- memory access can be localised and the comparisions are direct
- those advantages are limited when sorting objects of reference type
- i that case each element of the array is just a reference to where the object really is
- so there are no local access advantages

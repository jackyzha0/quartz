---
title: "heaps-and-heapsort"
aliases:
tags: 
- cosc201
---


# 3 Heap Sort
In place and ϴ(n lg n)

- start with array
- using itself as a heap, add the elements one at a time until all been added
- Then remove them one at a time - the largest elements gets removed first and the place where is needs to be put gets freed from the map

# 4 Heap sort vs Merge sort
heap --> in place, ϴ(n lg n)
merge --> not in place, Ο(n lg n)

Merge is preferred because

- MS can take advantage of partially sorted data (hence ϴ() vs Ο())
- MS memory accesses are good fast
- overwrites allow for optimizations that swaps do not

extra memory cost of merge sort is negligible

∴ Merge sort is faster

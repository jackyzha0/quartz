---
title: "10-heaps-and-heapsort"
tags: 
---

# 10-heaps-and-heapsort

## 1 Overview
[[notes/heap]]

## 2 Operations
### 2.1 Add element
Assumptions
- access first vacant position
- set (or find) the value $H.q$ stored in any (occupied) position $q$
- access parent of any given position
- identify when we're at the root
(all in constant time)

Outcome: Change $H$ by adding x to it, while maintaining the heap conditions

```
p <- first vacancy, H.p <- x
while p is not the root and H.parent(p) < H.p do
	swap H.parent(p) and H.p
	p <- parent(p)
end while

```

### 2.2 Remove the maximum
Outcome: Change H by removing its maximum (i.e., root) value wile maintaining the heap conditions

```
v <- H.root
set H.root to be the value stored in the last occupied position
p <- root

while p has children
	if the largest value, H.c of a child of p is greater than H.p then
		swap H.c and H.p, p <-c
	else
		Break
	end if
end while

return v

```


### 2.3 Complexity
In addition, we move along a branch from an added element up to the root, fixing violations as we go

In removal, we move from the root down through some branch until all violations are fixed (can only occur if node has children)

So both loops do most Ο(lg n)

### 2.4 Storage
![](https://i.imgur.com/04qVrGQ.png#invert)

 - Array
- root at position 0 and children at 1 and 2
- children of 1 to in 3 and 4, children of 2 go in 5 and 6

- first vacant pos --> heap[n]
- value at pos q --> heap[q]
- get parent of q --> parent(q) = (q-1)/2
- get children of q --> (2 * q) ± 2
- identify if q is root --> q == 0

### 2.5 Implementation

Use java.util.PriorityQueue

## 3 Heap Sort
In place and ϴ(n lg n)

- start with array
- using itself as a heap, add the elements one at a time until all been added
- Then remove them one at a time - the largest elements gets removed first and the place where is needs to be put gets freed from the map

## 4 Heap vs Merge
heap --> in place, ϴ(n lg n)
merge --> not in place, Ο(n lg n)

Merge is preferred because

- MS can take advantage of partially sorted data (hence ϴ() vs Ο())
- MS memory accesses are good fast
- overwrites allow for optimizations that swaps do not

extra memory cost of merge sort is negligible

∴ Merge sort is faster


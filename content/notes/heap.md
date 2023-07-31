---
title: "heap"
tags: 
- cosc201 
- data_structure
---

A tree where:

1. every elements should be greater than ites children
2. the structure should be filled from top to bottom and left to right


To remove an element

- remove from the top, replace with the last element
- to fix the first condition swap the top element with the highest of its children until fixed


To Add an element

- add to the next position
- If its larger than its parent then swap them


How deep is the tree?

- each layer is twice as deep and the preceding one
- layer k can hold $2^k$ elements
- to store n elements we use k layers where $k = lg n$
- so we need ϴ(lg n) layers
- So any algorithm that 'walk along a branch' in while or in part will have Ο(n) complexity (assuming constant time work at each node)

# 1 Overview
[[notes/heap]]

# 2 Operations
## 2.1 Add element
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

## 2.2 Remove the maximum
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


## 2.3 Complexity
In addition, we move along a branch from an added element up to the root, fixing violations as we go

In removal, we move from the root down through some branch until all violations are fixed (can only occur if node has children)

So both loops do most Ο(lg n)

## 2.4 Storage
![](https://i.imgur.com/04qVrGQ.png#invert)

 - Array
- root at position 0 and children at 1 and 2
- children of 1 to in 3 and 4, children of 2 go in 5 and 6

- first vacant pos --> heap[n]
- value at pos q --> heap[q]
- get parent of q --> parent(q) = (q-1)/2
- get children of q --> (2 * q) ± 2
- identify if q is root --> q == 0

## 2.5 Implementation

Use java.util.PriorityQueue

---
title: "avl-tree"
aliases: AVL
tags: 
- cosc201
- datastructure
---

AVL tree
most basic and obvious.

each node contains some extra information: the difference between the height of its right and left subtee. balance is maintained by ensuring that at every node this always at most 1

What is the least possible number of nodes in AVL tree of height k?

in general

$A_k= 1 + A_{k-1} + A_{k-2}$

we need a root 1, on one side a amallest possible tree of height $A_{k-1}$ then the other side must have height at least to $k-2$ to satisfy the rule, so we need at least $A_{k-2}$ more nodes.

The size if exponential in its height, and therefore its height is logarithmic in the size.

the operations are the same, but for each one we need to check and fix any excess imbalance along a single path from the affected leaf node up to the root.

for insertions, at most three rotations are rquired, for deletions the worst case is $O(lg\ n)$

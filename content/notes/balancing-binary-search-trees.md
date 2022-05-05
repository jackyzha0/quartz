---
title: "balancing-binary-search-trees"
aliases: Balancing BST, balancing
tags: 
- cosc201
---

the height of a [BST](notes/binary-search-tree.md) is the length of its longest chain. Most operations are $O(n)$ where n is the height of the tree. In an Ideal situation each layer of the tree is full. The height of the tree is logarithmic to the number of nodes. 

When a tree is being used only occainsonally, we can afford to simply rebalance is periodically. However when it is in constant use we cannot afford this cost

# Rotations

![](https://i.imgur.com/vjvMVM3.png)
sometimes two rotations are needed

## When to rotate and how to do them

basic idea is to modify the add and delete operations fo the BST to be somewhat self-balancing. This does not need to be perfect

We need a rule to decide when the tree is "balanced enough" and also strategies for fixing problems when the rule is violated.

We only need to fix the area local to the add or delete operations

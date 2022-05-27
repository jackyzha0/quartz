---
title: "balancing-binary-search-trees"
aliases: Balancing BST, balancing
tags: 
- cosc201
---

the height of a [BST](notes/binary-search-tree.md) is the length of its longest chain. Most operations are $O(n)$ where n is the height of the tree. In an Ideal situation each layer of the tree is full. The height of the tree is logarithmic to the number of nodes. 

When a tree is being used only occainsonally, we can afford to simply rebalance it periodically. However when it is in constant use we cannot afford this cost

long branches are a problem
the performance bounds for all BST operations are linear of the length of the longest branch of the tree

ideal shape is a similar to a [heap](notes/heap.md) (wide and shallow).

we want the longest branch to be $\theta(lg\ n)$ 

one way is to do an [In order](notes/tree-traversal.md#In%20order) and save to a sorted array. then construct a new tree by repeatedly bisecting the array. and recursively building the left and right subtrees

need some local operation that helps to restore balance

# Rotation
## How
suppose that in this bst there is a longer chain in e than else where

![100](https://i.imgur.com/SmDsZd1.png)

imagine twisting d to be the root

![100](https://i.imgur.com/6MoYHX1.png)

changes are
- b's right child is now c
- d's left child is not b
- b parent now points to d

## When
![](https://i.imgur.com/vjvMVM3.png)

sometimes two rotations are needed

basic idea is to modify the add and delete operations fo the BST to be somewhat self-balancing. This does not need to be perfect

We need a rule to decide when the tree is "balanced enough" and also strategies for fixing problems when the rule is violated.

We only need to fix the area local to the add or delete operations

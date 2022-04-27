---
title: "14-balancing-bsts"
aliases: 
tags: 
- cosc201
- lecture
sr-due: 2022-04-29
sr-interval: 3
sr-ease: 250
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

# 1 - AVL tree
most basic and obvious.

each node contains some extra information: the difference between the height of its right and left subtee. balance is maintained by ensuring that at every node this always at most 1

What is the least possible number of nodes in AVL tree of height k?

in general

$A_k= 1 + A_{k-1} + A_{k-2}$

we need a root 1, on one side a amallest possible tree of height $A_{k-1}$ then the other side must have height at least to $k-2$ to satisfy the rule, so we need at least $A_{k-2}$ more nodes.

The size if exponential in its height, and therefore its height is logarithmic in the size.

the operations are the same, but for each one we need to check and fix any excess imbalance along a single path from the affected leaf node up to the root.

for insertions, at most three rotations are rquired, for deletions the worst case is $O(lg\ n)$

# 2 - Red Black trees
most used current one. Used in java treemap

each node is either red or black

the rules are:
- the root node is black (optional)
- all null nodes are _considered_ black (convention)
- A red node may not have a red child
- Every path from a node to a descendant null node contains the same number of black nodes

These guarantee that the longest path frm root to null (which could alternate red and black) is at most twice as long as the shortest path (which could be all black)

the tree is full up to half its height - growing at least as fast as $2^{h/2}$

the height is logarithmic in the size sinhce th tree must be complete to the depth of half the height

Operations that mnodify the tree require in the worst case $O(lg\ n)$ recolourings and (on average a constant number) and not more than three rotations

## Strategy
- do an insertio and color the node red.
- recolor and rotate nodes to fix violation
- there are four scenarios
	- 

# 3 - Treaps
Link betwen heaps and trees that uses randomisation

I we are added items to a bst in random order then an unbalanced situation would be possible but highly unlikely. 

a treap (portmanteau of tree and heap) is designed to achieve this even in the elements are not added in random order

when we add an element, we give it a random priority. Then after doing normal BST insertion we perform a series of rotations to fix the heap-ordering issues

the effect is that the elements look as if they were inserted in decending order of priority. SInce the priorities were randomly chosen, that means that at any time we see a BST which  "thinks" that is elements were added in random order

# 4 - B-trees
not actually a bst, but can be used for the same purpose


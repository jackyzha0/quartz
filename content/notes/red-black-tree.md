---
title: "red-black-tree"
aliases: Red Black Tree
tags: 
- cosc201
- datastructure
---



Red Black trees
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
---
title: "tree"
tags: 
- cosc201
---

not so much a data type. More of a data concept of a way in which data can be organised

The first example we saw was with the chains of representatives in [union-find](notes/union-find.md)

The type required for the ordered [set(computer_science)](set(computer_science).md) data type is the binary tree

Trees in general:
- Consists of *Nodes*
- One node is distinguished and called the *root*
- Each node, except the root, has a unique *parent*
- Any chain that moves from a mnode to its parent , its grandparent etc, eventually reaches the root.
- The *children* of a nore arll the nodes of which it is the parent
- Nodes may (and usually do) have additional data associated to them. (does not affect the structure)
- Nodes with no children are *leaves*

For example: 

- *cat* is the root (root is drawn at the top)
- the parent of *dog* is cat*,* of *rat* is *emu*
- some nodes have two children, one has three (*emu* ) and some have none.

![300](https://i.imgur.com/EsrTuFL.png#invert)![300](https://i.imgur.com/bQmzPaU.png#invert)

The only differnce between these two trees is the *order* of the elements. 

We need to specify whether this makes them different or not. In computer science, order usually *does* mater. These are sometimes called*plane trees*.

Sometimes there are fixed slots for the children e.g., 

[binary-search-tree](notes/binary-search-tree.md)
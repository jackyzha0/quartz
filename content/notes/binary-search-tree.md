---
title: "binary-search-tree"
aliases: binary search tree, BST
tags: 
- cosc201
- datastructure
---

[code](https://blackboard.otago.ac.nz/bbcswebdav/pid-2890167-dt-content-rid-18354839_1/courses/COSC201_S1DNIE_2022/BST.java)

[bst-operations](notes/bst-operations.md)

a collection of *nodes* with one distinguished node called the root

rules:
- the node data contains a key which comes from some ordered type e.g., `string`
- each node can have at most who children - there are two fixed slots called left child and right child
- the left child node and it descendents are called the left subtree
- the key value at a nodes *left child* (and all its descendants) must be *less* than the key of the node
- the key value at a nodes *right child* (and all its descendants) must be *greater* than the key of the node
- we do not allow duplicate keys

Notation
- n.key for key
- n.l and n.r for left and right children
- n.p for its parent
- nil for a "not here" marker. e.g.,  n.r = nil means "n has no right child"

e.g., 
![300](https://i.imgur.com/n0IzHW7.png#invert)

In this example:
- root.p = nil
- root.r = n
- n.p = root
- n.key = emu
- n.l = nil
- n.r.key = rat
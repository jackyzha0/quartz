---
title: "tree-traversal"
aliases: traversal
tags: 
- cosc201
---

Visit each node in the tree once. So we need to visit n, all the nodes in L, and all the nodes in R. We can do this in four different ways

preorder
- visit n
- traverse L
- traverse R

Inorder. 
- traverse L
- visit n
- traverse R
Creating an BST from an array using the add operation then doing an inorder traversal is effectively a [quicksort](notes/quicksort)

postorder
- traverse L
- traverse R
- visit n

level order
- vist the root
- visit the roots children
- visit their children
- etc

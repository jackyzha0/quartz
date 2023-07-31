---
title: "treap"
aliases: Treaps
tags: 
- cosc201
- data_structure
---

Treaps
Link betwen heaps and trees that uses randomisation

I we are added items to a bst in random order then an unbalanced situation would be possible but highly unlikely. 

a treap (portmanteau of tree and heap) is designed to achieve this even in the elements are not added in random order

when we add an element, we give it a random priority. Then after doing normal BST insertion we perform a series of rotations to fix the heap-ordering issues

the effect is that the elements look as if they were inserted in decending order of priority. SInce the priorities were randomly chosen, that means that at any time we see a BST which  "thinks" that is elements were added in random ord

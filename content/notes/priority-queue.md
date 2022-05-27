---
title: "priority-queue"
tags: 
- cosc201
- datastructure
---

- A dynamic linear data type that supports addition and removal on entrie 
- each entry hase a value and a priority (key)
- removal returns the item with the greatest priority 

# Implementation
1. stores items and priorities in an array. Add at the end ϴ(1), remove by finding the maximum and exchaning with the end element ϴ(n)
2. stores items and their priorities in an array (or list) in sorted order. now removal is ϴ(1) bu addition in Ο(n)

can be implemented using a [priority-queue](notes/priority-queue.md)
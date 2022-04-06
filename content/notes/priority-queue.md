---
title: "priority-queue"
tags: 
- cosc201
- datastructure
---

# priority-queue

- A dynamic linear data type that supports addition and removal on entrie 
- each entry hase a value and a priority (key)
- removal returns the item with the greatest priority 

## 1 Implementation

1. stoes items and priorities in an array. Add at the end ϴ(1), remove by finding the maximum and exchaning with the end element ϴ(n)
2. stores items and their priorities in an array (or list) in sorted order. now removal is ϴ(1) bu addition in Ο(n)


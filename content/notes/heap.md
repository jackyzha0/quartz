---
title: Heap
---
# Heap
A tree
1. every elements should be greater than ites children
2. the structure should be filled from top to bottom and left to right

To remove
- remove from the top, replace with the last element
- to fix the first condition swap the top element with the highest of its children until fixed

To Add
- add to the next position
- If its larger than its parent then swap them

How deep
- each layer is twice as deep and the preceding one
- layer k can hold $2^k$ elements
- to store n elements we use k layers where $k = lg n$
- so we need ϴ(lg n) layers
- So any algorithm that 'walk along a branch' in while or in part will have Ο(n) complexity (assuming constant time work at each node)
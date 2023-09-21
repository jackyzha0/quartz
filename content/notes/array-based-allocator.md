---
title: "array-based-allocator"
aliases: 
tags: 
---

Good for adding many small bits of memory and then discarding them all at once. 

Very fast allocation as we only need to increment the pointer. 

issues:
- must free in reverse order
- memory not always aligned correctly
- memory overwrites can cause data corruption
- heap overflow

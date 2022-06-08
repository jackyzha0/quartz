---
title: "linear-probing"
aliases: linear probing
tags: 
- cosc201
- algorithm
---

[animation demo](https://echo360.net.au/lesson/0e13f645-a91f-46c6-89d9-e3c31097b960/classroom#sortDirection=desc)

A method of collision resolution for [hash-maps](notes/hash-map.md). In this scheme, each cell of the map contains a single key-value pair. If there is collision a key to be added maps to a cell that is already filled, to moves to the next cell *linearly* .

In C you know how many bytes of memory a k v pair will occupy. So you can store them as a continuous block of memory. Now you can take advatage of the locality of reference and the speed it provides. 

Rules:
- if a kv's home is already full, we move it into the next spot (wrapping to the beginning when we reach the end) in the array.
- the load factor is capped and the array is resized when the cap is exceeded

# Costs
Frequency of collisions and time to find a new space are proportional to the *load factor* (percetage of occupied slots).
- **Insertion:** $O(1)$ ⇒ proportional to the number of filled blocks we search before we find an empty one.  As long as the load factor is not to high this is on average 
- **Search:** $O(1)$ ⇒ Proportional to the number of cells we search before finding the one we want or an empty cell
- **Resize**: $\theta(n)$ amortised[^1] to $O(1)$ ⇒ Need to copy all elements to array of about[^2] double the size.

# Deletion
we cant just empty cells as this will break search. We could:
1. we could replace it by a "tombstone" marker. This counts as "full" for search and load purposes, but empty for insertion.
2. we search foward from the element we're removing until we find something that belongs in that location or earlier - swap it back into this location and repeat until an empty cell is found.

[^1]: Since we are able to do about n operation before we need to resize, we can spread this cost among those operation.
[^2]: By not doubling exactly, the modulo remainder is "scrambled" a bit thus reducing collions.

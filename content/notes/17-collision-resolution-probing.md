---
title: "17-collision-resolution-probing"
aliases: 
tags: 
- cosc201
- lecture
sr-due: 2022-05-12
sr-interval: 3
sr-ease: 250
---

[animation demo](https://echo360.net.au/lesson/0e13f645-a91f-46c6-89d9-e3c31097b960/classroom#sortDirection=desc)

Chaining (lists of k-v pairs in each bucket) breaks locailty of reference within the array and ay not be suitable for high-performance implementations. 

It works in java because objects are stored as references anyway, you need to look elsewhere in memory anyway. 

So the advantage of probing is negated. 

In C you know how many bytes of memory a k v pair will occupy. So you can store them as a continuous block of memory. Now you can take advatage of the locality of reference and the speed it provides. 

To do this the contents of bucket should not be a list. they should be null, or a single kv pair.

each kv pair has a *home spot* it would like to go to: this is the modulo remainder from last lecture.

# linear probing
- if a kv's home is already full, we move it into the next spot (wrapping to the beginning when we reach the end) in the array.
- frequency of collisions and time to find a new space are proportional to the *load factor* (percetage of occupied slots)
- the load factor is capped and the array is resized when the cap is exceeded

## Insertion cost
proportional to the number of filled blocks we search before we find an empty one.  As long as the load factor is not to high this is on average $O(1)$ 

## Search
Proportional to the number of cells we search before finding the one we want or an empty cell

## Resize
Create a new table of (about double) the size and insert all the elements of the table into it. If we dont double, exactly, we "scamble" the modulo remainder a bit more to reduce collions. cost is $\theta(n)$. This can be *amortised* across those elements to give $O(1)$ is the amortised sense

### Amortised cost
- the operations of a dynamic data structure have amortised cost $O(1)$, if
	- there is constant $C>0$ such that,
	- for every positive integer $k$, and
	- any sequence of $k$ operations on the data structure (from initalisation),
	- the average time per operation is less than $C$

## Deletion
we cant just empty cells as this will break search. We could:
1. we could replace it by a "tombstone" maker. This counts as "full" for search and load purposes, but empty for insertion.
2. we search foward form the element we're removing until we find something that belongs in that location or earlier - swap it back into this location and repeat until an empty cell is found.
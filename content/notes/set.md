---
number headings: auto, first-level 1, max 6, 1.1
title: "set"
aliases: sets, Set, Sets
tags: 
- cosc201
- datastructure
---

links: [java docs](https://docs.oracle.com/javase/7/docs/api/java/util/Set.html) for set interface

> A collection of items with no repetition allowed

How do we want to be able to use them? 
- We want to be able to add to them
- And Remove from them
- And check if it contains something

This gives us the methods:
- `Add(x)`
- `Remove(x)`
- `Contains(x)`

Binary search trees are data types that supprts this data type when there is an ordering on the underlying elements
A [binary search tree](notes/binary-search-tree.md) can be used to implement a set when there is no order. [hash sets and hash maps](notes/hash-map.md) can be used when there is order.

# 1 Implementations
## 1.1 Basic set

Simplest way to implement a set is using an array.

[Code for basic set](https://blackboard.otago.ac.nz/bbcswebdav/pid-2890167-dt-content-rid-18354837_1/courses/COSC201_S1DNIE_2022/BasicSet.java)

- Contains: Simple linear search
- Add: Check if it is present, if not add it to the end
- Remove: Delete the element and replace it with the last element
	- This leaves empty elements at the end.
	- So we keep track of the size

All three operations are $O(n)$ as they must all iterate over the entire set

## 1.2 Ordered set

A set with some underlying "natural" order. E.g., dictionary order for `string` objects.

We would also like to be able to do an in order traversal of an ordered set

If the set is static
- store using sorted array
- use binary search to find elements --> $O(lg\ n)$
- traverse by incementing a counter --> $O(lg\ n)$ to init then $O(1)$

But then:
- `Add(x)` Insert `x` if its not already present, so we start a search which is fine, but then insertion is $O(n)$ 
- `Remove(x)` find `x` if present, then move eyerthing beyond it back over the top --> $O(n)$

This is fine if we dont expect to use the dynamic operations a lot. 

Another approach might be to maintain a `main` array and a subsidary `add` and `remove` arrays and only periodically do the updates to the main array. but this gets complicated very quickly

A better way of doing this is using a [binary search tree](notes/binary-search-tree.md) 
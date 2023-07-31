---
title: "20-graphs-2"
aliases: 
tags: 
- cosc201
- lecture
sr-due: 2025-03-31
sr-interval: 609
sr-ease: 250
---

Graph drawing is its own problem.

One easy way is to draw the vertices is clockwise order and draw edges between them

[traversal examples](https://echo360.net.au/lesson/86c6c819-3257-424e-b8e6-d17f4e1e9170/classroom#sortDirection=desc)

# recurisve depth first traversal
same but.. delay the pop of an item from the stack until all its neighbours have been processed, and we only push those one at a time.

![code](https://i.imgur.com/kWm9REo.png)

## topological sorting
In a *directed* graph we have edges from v to w which do not necessarily imply an edge from w to v.

then is a neighbor of v but not (necessarily) vice versa. 

suppose edges indicate some dependency

we want an order of vertices that finishes with v but never containes any vertex unless all the things that depend on it occur earlier

this is a (reverse) *topological* sort

for this to work the graph must be *acyclic*. i.e., we cannot have a depends on v which depends on w which depends on a

it that condition is met a recursive depth first traversal can be used.3

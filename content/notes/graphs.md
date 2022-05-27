---
title: "graphs"
aliases: 
tags: 
- cosc201
- datastructure
---

Represents a set of things with relationships between them.

- a set of *vertices*
- some *edges* between them
- edges on some graphs have *weights*
- edges on some graphs are *directed*

Some graphs are named e.g, ![Q3](https://i.imgur.com/Mfd1Vzm.png)

# Implementation
should:
- be static
- say if two vertices are connected in $O(1)$
- say what the neighbors of a vertice are in $O(1)$

## Hashset
array wwith element to each verttex, and each element of the array is a *TreeSet* of its neighbors. 

graph is built up by specifying size, then edges.

```java
add edge(int v, int w){
	neighbors[v].add(w);
	neighbors[w].add(v);
}
```

we could also define a vertex class and use a `HashSet\<vertex>`

There are many options

# Traversals
## Breadth first traversal
![](https://i.imgur.com/iQ3TMCb.png)
Stating from v, initialise an empty queue a, and add a marker to each vertex (or make a set of seen vertices).

1. add the start vertex to a queue and mark it as seen 
2. while the queue is not empty
3. visit the first ellemnet of a qeue removing ti
4. do someting with it (line 3.5)
5. unseen neighbors neighbors are added to the queue marking them as seen
6. repeat

## Depth first
init empty *stack*, s, and add a marker to each vertex (or make a set of seen vertices)
![](https://i.imgur.com/x916lrw.png)

1. add the start vertex to a stack and mark it as seen 
2. while the stack is not empty
3. visit the first ellemnet of a qeue removing ti
4. do someting with it (line 3.5)
5. unseen neighbors neighbors are added to the stack marking them as seen
6. repeat

## Cost of traversal
we measure complexity both in terms of veritces V and edges E.

for each vertex
-  it occurs in some neghbor list ofot he first time at which point it is added to the list, and marked as seen
- then at soome point it is removed
- so $O(1)$ per vertice so $O(V)$

for each edge:
- edge arise implicityly in the neihbor list
- each one appreas twice, once per endpoint
- when one appreas is causes a constant amount of work
- also $O(1)$ per edge so  $O(E)$

so $O(V + E)$


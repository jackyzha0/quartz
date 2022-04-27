---
title: "bst-operations"
aliases: binary search tree operations, bst operations
tags: 
- cosc201
---

# Search operation

We want to search in a BST for a key `k` returning `true` if it is found and `false` if it is not

```
def search(k)
	n <- root
	while n ≠ nil do
		if n.key = k then
			return true
		else if n.key < k then
			n <- n.r
		else
			n <- n.l
		end if
	end while
	return false
```

Its naturally recursive

Method `search(k)` calls `search(k, root)` wher the two-parameter version `search(k, n)` is defined by:

```
def search(k, root)
	if n = nil then
		return false
	else if n.key = k then
		return true
	else if n.key < k then
		return search(k, n.right)
	else
		return search(k, n.left)
	endif
```

Cost of search is at  most the length of the longest branch. So we want to keep the trees short and "bushy"

# Add Operation

We want ot add a key `k` to a BST returning `true` if added or `false` if already present.

This is similar to search:
```
def add(k)
	p <- nil, c <- root
	while n ≠ nil do
		p <- c
		if p.key = k then
			return false
		else if n.key < k then
			c <- p.r
		else
			c <- p.l
		end if
	end while
	make child node of p with value k
	return true
```

To make a child: 

Make sure this is really what we want to do:
- k is not the key of p
- the pos where this node will be added is currently nil

```
def makeChild(p, k)
	c <- new(k), c.p <- p
	if p.key < k then
		p.r <- c
	else
		p.l <- c
	end if
```


# Remove operation

If the node to delete is a leaf, we can simply make it nil.

If the node has only one child, we simply make the nodes child the child of the nodes parent

If the node has two children, we replace it with its *successor* (the leftmost descendant of its right child)

``` java
private void delete(Node n) {
    if (n == root) {
        deleteRoot(); return;
    }
    if (n.left == null) {
		addLink(n.parent, n.right, linkType(n.parent, n));
		return;
    }
    if (n.right == null) {
        addLink(n.parent, n.left, linkType(n.parent, n));
        return;
    }
    Node sn = successor(n);
    String s = sn.key;
    delete(sn);
    n.key = s;
}
```

# Traversal

[tree-traversal](notes/tree-traversal.md) 
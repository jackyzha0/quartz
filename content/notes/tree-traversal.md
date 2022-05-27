---
title: "tree-traversal"
aliases: traversal
tags: 
- cosc201
---

Visit each node in the tree once. So we need to visit n, all the nodes in L, and all the nodes in R. We can do this in four different ways

- **Preorder:** Root, left, right
- **Postorder:** Left, right, root
- **Inorder:**  Left, Root Right (produces ordered list in a [BST](notes/binary-search-tree.md))
- **Level order:** root, all the roots children, all their children, etc  

[examples](https://i.imgur.com/vsZtkIp.png)

Creating an BST from an array using the [Add Operation](notes/bst-operations.md#Add%20Operation) operation then doing an inorder traversal is effectively a [quicksort](notes/quicksort)

# Code
Usually traversals ideas used in algorithms, not independent methods
## Pre order
```java
private void preorder(Node n, ArrayList<String> r){
	if(n==null) return;
	r.add(n.key); //add this node the reults
	preorder(n.left, r); //traverse the left subtree
	preorder(r.right, r); //traverse the right subtree
}
```

## Post order
```java
private void postorder(Node n, ArrayList<String> r){
	if(n==null) return;
	postorder(n.left, r); //traverse the left subtree
	postorder(r.right, r); //traverse the right subtree
	r.add(n.key); //add this node the reults
}
```

## In order
```java
private void inorder(Node n, ArrayList<String> r){
	if(n==null) return;
	inorder(n.left, r); //traverse the left subtree
	r.add(n.key); //add this node the reults
	inorder(r.right, r); //traverse the right subtree
}
```

## Level order
Only traversal that  is not naturally recursive. Maintains a [queue](notes/dynamic-linear-datatype.md) of pending visits. Using a [stack](notes/dynamic-linear-datatype.md) with this methods produces a preorder

```java
public Arraylist<String> levelorder() {
	ArrayList<String> result = new ArrayList<>();
	if(isEmpty()) return result;
	ArrayDeque<Node> q = new ArrayDeque<>();
	q.add(root)
	while (!q.isEmpty()) {
		Node n = q.remove()
		result.add(n.key);
		if(n.left != null) q.add(n.left);
		if(n.right != null) q.add(n.right);
	}
	return result;
}
```
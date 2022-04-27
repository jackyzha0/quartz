---
title: "13-bst-traversals-and-balance"
aliases: 
tags: 
- cosc201
- lecture
sr-due: 2022-05-18
sr-interval: 25
sr-ease: 270
---

# Traversals
- in any tree
	- preorder --> visit the root, then for each child of the root, predorder teaverse the subtree rooted at that child
	- postorder --> for each child of the root posrtorser traverse the subtreeet rooted at that child, then visit the root 
	- level order --> visit the root, then all its children , then all its granchildren
- in BSTs only:
	- inorder --> inorder traverse the subtree rooted at the lefdt cyhild then visit the root, then inorder traverse the subtree rooted at the right child 

## code
- returns the perorder tracersal as an arraylist
- not usual, traversals are genrally ideas used in algorithms, not independent methods

### pre post and in order traversal code
```java
public ArrayList<String> order() {
	ArrayList<String> result = new Arraylist<>(); //set up the result
	preorder(root, result); //preorder starting at the root
	postorder(root, result);
	inorder(root, result);
	return result;
}

//helper method for preorder traversal
//use r as working storage to preorder traverse the tree below n
private void preorder(Node n, ArrayList<String> r){
	if(n==null) return;
	r.add(n.key); //add this node the reults
	preorder(n.left, r); //traverse the left subtree
	preorder(r.right, r); //traverse the right subtree
}

//helper method for preorder traversal
//use r as working storage to preorder traverse the tree below n
private void inorder(Node n, ArrayList<String> r){
	if(n==null) return;
	inorder(n.left, r); //traverse the left subtree
	r.add(n.key); //add this node the reults
	inorder(r.right, r); //traverse the right subtree
}

//helper method for preorder traversal
//use r as working storage to preorder traverse the tree below n
private void postorder(Node n, ArrayList<String> r){
	if(n==null) return;
	postorder(n.left, r); //traverse the left subtree
	postorder(r.right, r); //traverse the right subtree
	r.add(n.key); //add this node the reults
}
```

![](https://i.imgur.com/vsZtkIp.png)

### level order 
- want to visit the root
- visit its children
- visit their children
- etc

not recursive
maintain a queue of pending visits

```
if root = nil then return []

res <- [], q <- [root]
while q is not empty do
	n <- q.remove()
	res.add(n)
	for c in n.children do
		q.add(c)
	end for
end while
return res
```

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


if we use a stack then its the same as preorder.

# Balancing trees
long branches are a problem
the performance bounds for all BST operations are linear of the length of the longest branch of the tree

ideal shape is a similar to a heap (wide and shallow).

we want the longest branch to be $\theta(lg\ n)$ 


one way is to do an iorder traversal and save to a sorted array. then construct a new tree by repeatedly bisecting the array. and recursively building the left and right subtrees

need some local operation that helps to restore balance

## Rotation operation

suppose that in this bst there is a longer chain in e than else where

![100](https://i.imgur.com/SmDsZd1.png)

imagine twisting d to be the root

![100](https://i.imgur.com/6MoYHX1.png)

changes are
- b's right child is now c
- d's left child is not b
- b parent now points to d
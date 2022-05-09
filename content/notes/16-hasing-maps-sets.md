---
title: "16-hasing-maps-sets"
aliases: 
tags: 
- cosc201
- lecture
sr-due: 2022-05-11
sr-interval: 3
sr-ease: 250
---

# Maps and Sets
I the compsci context a *map* contrains a *set* of *keys* each with an associated *value*. A map consists of a set of keys. A map can aslso store a set by igorning the values for each key. Thesre are three fundamental operations.
- `put(k, v)` : add the mapping from k to v either by adding k iff its not alreaady present or by changing the associated value
- `get(k)` : return the value associated iwht k if k is present
- `remove(k)` : remove the key k (and any associated value)

[BST](notes/binary-search-tree.md) can provide us with a set or map implementation whre the cost of each operation is $O(lg\ n)$ . But his requires an underlying order on keys, which might not be needed.

## In a perfect world
- keys from a class k, valuyes from a class v
- there are only 4000 possible keys
- each key, k, has a unique four digit identifier than we can obtain in constant time as `k.id();`

```java
V[] map = new V[10000];

public V put(K key, V value){
	V old = map[k.id()];
	map[k.id()] = value;
	return old; //to match java map interface
}

public V get(K key){
	return map[k.id()];
}

public V remove(K key){
	V old = map[k.id()];
	map[k.id()] = null;
	return old;
}
```

works but:
- we need to allocate 10000 spaces of storage
- require `k.id();` in  constant time
- cannot store null values (key not present vs key is mapped to null) (we will need more storage)

so:
- we should only require storage for what we need, not for all possible keys
- need to use `Array` for constant time add, remove, get. (we may need to resize the array sometimes)

## Considering space 
```java
V[] map = new V[53];

public V put(K key, V value){
	V old = map[k.id() % v.length];
	map[k.id() % v.length] = value;
	return old; //to match java map interface
}

public V get(K key){
	return map[k.id() % v.length];
}

public V remove(K key){
	V old = map[k.id() % v.length];
	map[k.id() % v.length] = null;
	return old;
}

```

Problem:
- some keys can be duplicated

## Solving k.id()
- solution is to make one up.
- since collisions are inevitable, uniqueness is not required
-  made up ID called a `hash code`
- a *hash function* take objects from a class as input and produces a value from a fixed finite set of values (in Java, an `int`)
- properites it should have
	- should be fast to compute $O(1)$
	- shoud be uniform (even when we take modulo)

This sounds hard, but for commonly used classes (e.g., strings) there are already good has functions. Good enough is usually good enough. IDE can usually suggest something that is good enough. A hashcode function will usually come with an equals function to distinguish between collions and actual equal values


## Collisions: Chaining/open addressing
- array elements are called buckets
- each bucket is a *list* of key-value pairs
- when a mapping is added, 
	- if empty add it (creating a new list if required)
	- otherwise check to see if there is a collision or an actual equality with each item of the list
		- If there is an equality -> change its value
		- otherwise just add it to the list
- get and removing are handled similarly

we need to keep the load factor (how full the map is) small so that the chains dont't get to long 
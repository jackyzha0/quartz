---
title: "hash-map"
aliases: hash map
tags: 
- cosc201
- datastructure
---

In compsci a map is a comprised of a [set](notes/set.md) of keys and values. (`<K, V>`). For example `<String, Integer>`

So sets are a prerequisite for maps

A hash set is just a hash map where the key is the values hash code. 

# Operations
The fundamental map operations are:
- `Put(k, v)` --> Add the this key-value pair to the map. If the present: update the key
- `Get(k)` --> returns the value associated with `` is present
- `Remove(k)` --> Removes the key `k`

[BST](notes/binary-search-tree.md) can provide us with a set or map implementation whre the cost of each operation is $O(lg\ n)$ . But his requires an underlying order on keys, which might not be needed.

# Hash functions
a *hash function* takes objects from a class as input and produces a value from a fixed finite set of values (in Java, an `int`). 

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

# Probing
Chaining (lists of k-v pairs in each bucket) breaks locailty of reference within the array and may not be suitable for high-performance implementations. 

It works in java because objects are stored as references anyway, you need to look elsewhere in memory anyway. 

So the advantage of probing is negated. 

In C you know how many bytes of memory a k v pair will occupy. So you can store them as a continuous block of memory. Now you can take advatage of the locality of reference and the speed it provides. 

To do this the contents of bucket should not be a list. they should be null, or a single kv pair.

each kv pair has a *home spot* it would like to go to: this is the modulo remainder from last lecture. we can use [linear-probing](notes/linear-probing.md) to ensure the kv remains close to its home spot.

# basic implementation
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
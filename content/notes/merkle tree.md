---
title: "merkle tree"
tags: 
- 
---

A trie is a tree like data structure that isused to retrieve a string value by traversing down a branch of nodes that store associated references that together lead to the end value that can be returned. 

Merkle trees exist to prove consistency of data. They are essentially a tree of hashes. 

> _“_**_Merkle tree_** _is a_ [[tree]] _in which every leaf node is labelled with the hash of a data block and every non-leaf node is labelled with the_ [_cryptographic hash_](https://en.wikipedia.org/wiki/Cryptographic_hash_function) _of the labels of its child nodes.”_

![digram|300](https://i.imgur.com/HMzwjgb.png)

They provide a means to prove the integrity and validity of data. E.g., if you change the value of a data block, the entire path leading to the root hash would also be changed. So, if we hold the value of the root hash, we could verify the consistency of data by rebuilding the trie to get the root hash and compare it to the value we are holding.



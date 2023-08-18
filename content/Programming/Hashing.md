---
title: "Hashing"
tag: cs, algos
date: 
alias:
---

## Hash Function
A function that converts data of arbitrary size to a value of a fixed size (usually a 32-bit int).
Result is called **hash value**.

>[!example] Hash Function Example
>A simple hash function for an integer array:
>- Sum up each entry in the array and modulo the sum by 100
>`[5, 23, 84] -> (5 + 23 + 84) % 100 = 12`

Must always return the same hash value for two items representing the same values.
Two different items hashing to the same value is a **hash collision.**

>[!info] Properties of Good Hash Functions
>- Easy to calculate the hash value (function has low time complexity)
>- Low chance of hash collision
>- All possible values are utilized approximately equally

## Hash Table
Data structure that maps an arbitrary data type to another arbitrary data type using hashing.
Data is stored in an array, where each data value has an unique index. 
- When we add `(key, value)` pair to the array, we use a hash function to map `key` to a hash value within the range of the array. 
- When we retrieve the data with `key`, we hash the `key` again and look up the data in the array with the corresponding index.

> [!example]- Graphical example of hash table
> ![[Pasted image 20230726171358.png|500]]
> ![[Pasted image 20230726171415.png|500]]
> ![[Pasted image 20230726171425.png|500]]
> ![[Pasted image 20230726171436.png|500]]

We need to deal with collisions as the possibility of keys increases, collision is unavoidable by the pigeonhole principle. An example of this is using separate chaining, where each hash value corresponds to a list:

![[Pasted image 20230726172114.png]]

## Efficiency
Average time complexity is $O(n/k)$ for each insertion/access operation on the table, where $n$ is the number of entries in the hash tables and $k$ is the array size of the table. This is due to the pigeonhole principle.

For the worst case (everything is hashed to the same key), the time complexity becomes $O(n)$, which is why it’s important to have a good hash function where collision is unlikely.

Dynamic hash table – size dynamically changes as more items are added. Each access to the table has an average time complexity of $O(1)$, which is close to accessing an array. When you need an ***non-integer index***, you can use a hash table instead

- Python has `dict` class
- Java has `HashMap` class

---
title: "mergesort"
tags: 
- cosc201
- algorithm
---

Mergesort is a [divide-and-conquer](notes/divide-and-conquer.md) algorithm. It works by recursively splitting the array in half then merging the two (sorted) halfs together . It has three main steps. These are:

- pre-processing: split the array into two pieces
- recurive step: sort each of the pieces 
- post-processing: merge the two pieces

e.g.,

7 5 3 9 1 8 2 5 4 0

7 5 3 9 1 |  8 2 5 4 0

7 5 | 3 9 1 | 8 2 5 | 4 0

5 7 | 1 9 3 | 2 8 5 | 0 4

1 3 5 7 9 | 0 2 4 5 8 

0 1 2 3 4  4 6 7 8 9

# 1 Implementation
## 1.1 Merge

Given: a and b are sorted arrays. m is an array whose size is the sum of their sizes
Get: a sorted array containing the elements of a and b

Keep track of indices, ai, bi, and mi of the active location of a, b, and m.
Find which of ai or bi is lesser (break ties is favour of a), and copy that value into m at mi, and increment mi and whichever of ai or bi was used.
Once ai or bi is out of range, copy the rest of the other array into the remainder of m

```java
public static int[] merge (int[] a, int[] b){
	int[] m = new int[a.length + b.length]
	int ai = 0, bi = 0, mi = 0;

	while(ai < a.length && bi < b.length) {
		if(a[ai] <= b[bi]) m[mi++] = a[ai++];
		else               m[mi++] = b[bi++]
	}

	while (ai < a.length) m[mi++] = a[ai++];
	while (bi < b.length) m[mi++] = a[bi++];

	return m;
}
```


### 1.1.1 Complexity of merge

$\theta(n)$  

$n$ is the sum of the lengths of $a$ and $b$ 

Each time we loop the parameter $mi$ must increase by one, and this parameter runs from $0$ to $n-1$ 

Since the total number of loop bodies executed is $n$ and each loop does a constant amount of work, the total time complexity is $\theta(n)$  


## 1.2 Sort

```java
public static void mergeSort(int[] a) { 
	int blockSize = 1; 
	while (blockSize < a.length) { 
		int lo = 0; 
		while (lo + blockSize < a.length) { 
			int hi = lo + 2*blockSize; 
			if (hi > a.length) hi = a.length; 
			merge(a, lo, lo + blockSize, hi); 
			lo = hi; 
		} 
		blockSize *= 2; 
	} 
}
```


### 1.2.1 Complexity of Sort

$\theta(n\ lg\ n)$

> In a divide and conquer algorithm where pre and pst processing work are Ο(n) and the division is into parts of size at least n for some contatn c > 0 the total time complexity is Ο(n lg n) and generally ϴ(n log n)

#### 1.2.1.1 Top down

We can split into the three steps to analyse this.

- Pre has constant time i.e., $\theta(1)$
- Post has linear time i.e., $\theta(n)$

Therefore: $M(n) = \theta(n) + 2 \times M(n/2))$ 

Substitue $\theta(n)$ with $C \times n$ then

$$
\begin{align*}
M(n) &= C \times n+2 \times M(n/2) \\
&= C \times n+2 \times (C \times (n/2) + 2 \times M(n/4))\\
&= C \times (2n) + 4 \times M(n/4) \\
&= C \times (2n) + 4 \times (C \times (n/4)) + 2 \times M(n/8))\\
&= C \times (3n) + 8 \times M(n/8)\\ \\
&= C \times (kn) + 2^k \times M(n/2^k)
\end{align*}
$$

This stops (at least) when we reach the base case of $n/2^k=1$ . We could stop earlier and

If we do a constant amount of work $D$ when we reach the base case we get:

$$
M(n) = C \times (kn) + 2^k \times D
$$

where $k\leq lg(n)$ so:

$$
M(n) ≤ C \times (n lg(n)) + D(n) = ϴ(n\ lg(n))
$$





#### 1.2.1.2 Bottom Up

- Let n be the number of elements in the array, $a$.
- The outer while loop (controlled by blockSize, or $b$) is executed $lg(n)$ times since its upper bound is n and b is doubled each time.
- In the inner loop, the update on lo is to add $2b$ so it is executed $n/(2b)$ times.
- The inner loop merges two arrays of size b, so each instance does $\theta(b)$ work.
- That gives an upper bound on the work done in one instance of the outer loop of the form:

$$
(n/(2b)) \times (A \times b) = (A/2) \times n
$$

and a matching lower bound.


- Thus, the work done in one instance of the outer loop is $\theta(n)$ 
- And so, the total complexity is $\theta(n\ lg\ n)$.

The bottom-up version does exactly the same thing as the top-down version, just in an apparently different order, so this analysis applies to the top-down version as well.


# 2 Variations of Mergesort

[unite and conquer](notes/unite-and-conquer.md)

---
title: Lecture 8 Merge sort 2
draft: true
sr-due: 2022-04-06
sr-interval: 8
sr-ease: 270
---
# 1 #review 
---
# Lecture 8 mergesort 2
recall definition of merge sort
- pre ⇒ split
- rec ⇒ sort pieces
- post ⇒ merge

## 1 Complexity
no counters
pre and post pahses are constant and ϴ(n)

so M(n) = ϴ(n) + 2 * M(n/2)

does this even help. what if n is odd

pretend ϴ(n) is $C \times n$ 

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

ends when we find base case
when we get to $n/2^k = 1$
we could split earlier.
the work done base case is (bounded by) some constatn D
so if $k$ is large enough that $n/2^k$ is a base case, we get

$$
M(n) = C \times (kn) + 2^k \times D
$$

how big is $k$

$k <=lg(n)$

so: 
$$
M(n) ≤ C \times (n lg(n)) + D(n) = ϴ(n lg(n))
$$

which is true

> In a divide and consiwer algo wher pre and pst processign work are Ο(n) and the division is  into parts of size at least n for some contatn c > 0 tge total time complexity is Ο(n lg n) and generally ϴ(n log n)

## 2 Variations of mergesort

unite and conquer

5 | 8 | 2 | 3 | 4 | 1 | 7 | 6

5 8 | 2 3 | 1 4 | 6 7

2 3 5 8 | 1 4 6 7

1 2 3 4 5 6 7 8

```java
	public static void mergeSort(int[] a) {
		int blockSize = 1;
		while(blockSize < a.length) {
			int lo = 0;
			while (lo + blockSize < a.length) {
				int hi = lo + 2*blockSize;
				if (hi > a.length) hi = a.length;
				merge(a, lo, lo + blockSize, hi);
				lo = hi;			
			}
			blockSize *=2;		
		}	
	}

```

outer loop is executed lg n times, where n is the length of a

inner loop proceeds  until we find a block that "runs out of elements"

inner loop is having 2 x blocksize added each time, to runs most n/2 x blocksize

inside inner is call to merge which is ϴ(blocksize)


### 2.1 complexity from bottom up
$n$ is the numbe of elemetns in a
outer loop is executed

![Pasted image 20220329114859.png](None#invert)

### 2.2 improvments
some arrays have sections that are already sorted

you canm

### 2.3 timsort
used by python java rust etc
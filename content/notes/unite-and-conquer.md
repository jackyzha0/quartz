---
title: "unite-and-conquer"
aliases: unite and conquer
tags: 
- cosc201
---

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


### 0.1.1 complexity from bottom up

- $n$ is the numbe of elemetns in a
- outer loop is executed

![[Pasted image 20220329114859.png#invert]]

### 0.1.2 improvments
some arrays have sections that are already sorted

you canm

### 0.1.3 timsort
used by python java rust etc

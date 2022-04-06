---
title: Merge sort - divide and conquer
draft: true
sr-due: 2022-04-26
sr-interval: 23
sr-ease: 250
---

#review 
# Divide and conquer
1. pre ⇒ break apartinto two or more smaller problems whose size add up to at most n
2. Rec ⇒ solve those problems recursively
3. post ⇒ combine solutions into a solution of the original problem

## 1 quicksort
pre ⇒ select pivot and split the array
rec ⇒ apply quicksort to the partitions
post ⇒ not much

designeds when sorting inplace was important
works best of primitive types as they can be stored in the fastest memory location
- memory access can be localised and the comparisions are direct
- those advantages are limited when sorting objects of reference type
- i that case each element of the array is just a reference to where the object really is
- so there are no local access advantages

# Mergesort
a variant of a divide and conquer sorting array
pre ⇒ split array into two pieces of nearly equal size,
rec ⇒ sort the pieces, 
post ⇒ merge the pieces

## 2 Merge
take the two lowest values
place the lowest of the two in the next place in the sorted array

## 3 Implementation
given: a and b are sorted arrays. m in an array whose sixe is the sum fo their sizes
desired outcome: the elements of a and b have been copoed into m in sorted order

- maiain indices, ai, bi, and mi of the active location in a b and m
- if both ai and bi represent actual indices of a and b, find the one which points to the lesser value (break ties in favour of a) copy that vale into m at mi and increment mi and whichever of ai or bi was used for the copy.
- once one of ai and bi is out of range, copy the rest of the other array into the remainder of m

```java
public static int[] merge (int[] a int[] b){
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

```java
	public static void mergeSort(int[] a){
		mergeSort(a, 0, a.length);
	}

	public static void mergeSort(int[] a, int lo, int hi){
		if(hi - lo <= 1) return;
		int mid = (hi + lo)/2;
		mergeSort(a, lo, mid);
		mergeSort(a, mid, hi);
		merge(a, lo, mid, hi);
	}

	public static void merge(int[] a, int lo, int mid, int hi){
	int[] t = new int [hi-lo]; 
	//adjust code from 'merge' here so that the part of a from lo to mid, and the part of a from mid to hi are merged into t
	System.arraycopy(t, 0, a, lo, hi-lo) //copy back into a
	
	}


```

## 4 Complexity
n is the length of a plus the length of b
no obvious counter controlled loop
key ⇒ in each of the three loops mi in incremented by one.

∴ the total number of loop bodies executed is always n
since each loop has a constant amount of work
∴ so total  cost is **ϴ(n)**


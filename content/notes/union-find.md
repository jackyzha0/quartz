---
title: "union-find"
tags: 
- cosc201 
- datastructure
---

## 1 Example
- We have 12 'objects'
- *Some* pairs have been connected
- Nodes with a sequence of edges between them form a group
	- e.g., 0 5,   2,   1 4 6 9,   3 8 10 11,    7
	- 
![](https://i.imgur.com/9iRxZoh.png)

- Groups with no connecting edges are *disjoint* sets

## 2 Requirements
- Make(n) - make a set of n vertices with no edges between them
- Union(x, y) - connect x and y by an edge (merge their two groups)
    - y becomes the representative node for the whole group
    - e,g,. Union(2, 1)
		- now : 0 5    2 1 4 6 9    3 8 10 11    7
		- the representative node of the new group is 1
		- the number of groups is always : n - number of union operations between elements of different groups
- Find(x) Find and return a representative of the group the x belongs to.
    - If x and y are in the same group then Find(x) == Find(y)
    - 

## 3 Implementation
### 3.1 UF 1

```java
	int[] reps;
	public void make(int n){
		reps = new int[n];
		for(int = 0; i < n; i++) reps[i] = i;
	}

	public int find(int x){
		return reps[x];
	}

	public void union(int x, int y){
		rx = reps[x]
		ry = reps[y]
		for i = 0 to n-1
			if reps[i] = rx then
				reps[i] = ry
			end if
		end for	
	}
``````


 Operation   | Cost | reason
-------------|------| --
 make        | $\Theta(n)$ | filling n place of an array
 find(x)     | $\Theta(1)$ | find value in array is constant
 union(x, y) | $\Theta(n)$ | When x and y's rep are different, the whole array must be examined

Total possible number of union calls where x and y's rep are different is n-1
So the Total possible cost of all union calls is $\theta(n^2)$ 

### 3.2 UF 2

``` java
	int[] reps;
	public void make(int n){
		reps = new int[n];
		for(int = 0; i < n; i++) reps[i] = i;
	}

	public int find(int x){
		if(reps[x]==x) return x;
		return find(reps[x]);
	}

	public void union(int x, int y){
		reps[find(x)] = find(y);
	}
```

Operation   | Cost | reason
-------------|------| --
 make        | $\Theta(n)$ | filling n place of an array
 find(x)     | $\Theta(n)$ | need to look through chain nodes for representative
 union(x, y) | $\Theta(n)$ | bounded by two calls to find

Total possible number of union calls where x and y's rep are different is n-1
So the Total possible cost of all union calls is $\theta(n^2)$ 

### 3.3 UF 3

For each rep, let its rank be the length of the longest chain of local reps that reaches it
When union(x,y) make the rep with the larger rank the rep of the other
If equal ranks -> make the second the rep of the first

``` java
	int[] reps;
	int[] rank;
	public void make(int n){
		reps = new int[n];
		rank = new int[n];
		for(int = 0; i < n; i++) reps[i] = i;
	}

	public int find(int x){
		if(reps[x]==x) return x;
		return find(reps[x]);
	}

	public void union(int x, int y){		
		rootUnion(find(x), find(y))
	}

	//x and y are known to be representatives
	private void rootUnion(x, y){
		if(rank[x] > rank[y]){
			reps[y] = x;
		} else if (rank[y] > rank[x]){
			reps[x] = y;
		} else { //rank[x] == rank[y]
			reps[x] = y;
			rank[y] ++;
		}
	}
```

Operation   | Cost | reason
------------|------| --
 make        | $\Theta(n)$ | filling n place of an array
 find(x)     | $\Theta(lg\ n)$ | rank is bounded by $lg\ n$
 union(x, y) | $\Theta(lg\ n)$ | bounded by two calls to find

Total possible number of union calls where x and y's rep are different is n-1
So the Total possible cost of all union calls is $\theta(n^2)$

trade off means this requires an extra $\theta(n)$ space

#### 3.3.1 Min size of set of rank k

- for k = 0 -> size must be at least 1
- for k = 1 -> size must be at least 2

for larger k -> the set must have been formed by the union of two sets of rank k-1. So its size must be at least twice the min size of a set of rank k-1

--> min size of set of rank k is $2^k$

#theorem
>a set of rank k must contain at least $2^k$ elements

$\therefore$ The maximum rank of an element is $\log_2(n)$  -> $lg(n)$

since the time for $Find$ is big-$\theta$ of the rank of the representative found we get $O(lg n)$ bounds for both find and union

^we used $O$ not $\theta$  because we dont know that the worst case will always occur.

If could happen that the sequence of Union operations does not create a rank that is as big as i could be

^this is an example of a semi-formal proof by [[Induction]]

### 3.4 UF 4
Change find so it implements [[path compression]] to "flatten" the chains

```java
	if (x != reps[x]) {
		reps[x] = find(reps[x]);
	}
	return reps[x];
```


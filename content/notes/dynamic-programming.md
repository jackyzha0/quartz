---
title: "dynamic-programming"
aliases: dynamic programming, DP
tags: 
- cosc201
- paradigm
---

A method of designing algorithms, where a higher amount of space is used, in order to gain reduction in time. This usually done by *remembering previous calculations*. Typically these algorithms are done *bottom-up* i.e., by computing the "base case" first. 

Recursive algorithms can often be converted to counter-controlled for/while loops by:
- initialising memory for answers
- working from the bottom up
- returning the answer

```java
public long fibDP (int n) {
	long[] f = new long[n+1];
	f[0] = 1; f[1] = 0;
	for(int i = 2; i <= n; i++){
		f[i] = f[i-1] + f[i-2];
	}
	return f[n];
}
```
A similar effect can be achieved using *memoization* (caching)

# DP vs memoization
A DP algorithm will typically compute *all* simpler versions of the problem. When this is neccessary then DP will be faster. However if only a small proportion of the simpler cases are actually needed it may be better to use memoization. Sometimes we can reduct the storage need for DP too. e.g., in the following fibonacci example

```java
public long fibDP (int n) {
	int a = 1, b = 1, c = 1;
	for(int i = 2; i <= n; i++){
		c = a + b;
		a = b;
		b = c;
	}
	return c;
}
```

**Note:** Divide and conquer algorithms cannot be sped up by DP as Divide and Conquers splits into chunks with *no overlap*. This means there is nothing to remember by remembering previous calculations.

# Route Counting Example

![](https://i.imgur.com/AKl2fY5.png)

Compute the number of routes from A to Z travelling only east or south.

Number of routes to Z is the sum of the number of routes to Z's western and northern neighbors. This is true for all nodes except for the edges.

The ideas to to fill the grid with numbers, where each node is the sum of its preceding neighbors. 

```java
public long count(int rows,int cols){
	long[][] counts = new long[rows][cols];
	//init edges to 1
	for (rows){
		for (cols){
			counts[r][c] = counts[r-1][c] + counts[r][c-1];
		}
	}
	return counts[rows-1][cols-1];
}
```

- since we can copute all the values in one row just from the preceding row, we could reduce the extra space requirement from rows x cols to just cols

# Fibonacci numbers example

$f_{0}= f_{1}= 1, f_{n}=f_{n-1}+ f_{n-2}\ for\  n > 1$

the obvious recursive implementation requires exponential time becuase the recursive sub-problems
- compute $f_n-1$, and
- compute $f_n-2$
overlap (the first generates an instance of the second in the next recurive call)

DP says "since you know you're goinf to need the values later, remember them as you compute them", and (technically), does one more thing. "while youre at it, since you need to know all the values, you might as well compute from simplest to most complex (bottom up)"

convert recursive algorithms to counter controlled for or while loops.

```java
public long fibDP (int n) {
	long[] f = new long[n+1];
	f[0] = 1; f[1] = 0;
	for(int i = 2; i <= n; i++){
		f[i] = f[i-1] + f[i-2];
	}
	return f[n];
}
```

- initialise memorrt to store the answers for simpler problems
- work from bottom up
- return answer

```java
static HashMap<Integer, Long> fib = new HashMap<>();
public static long fibMEM(int n) {
	if(n <= 1) return 1;
	if(!fib.containsKey(n)) {
		fib.put(n, fibMEM(n-1) + fibMEM(n-2));
	}
	return fib.get(n);
}
```
- this technique is called memoization (or caching)
- whenever you compute a result store it somewhere before returning it
- look it up(if you can) when needed
- supported automatically in some languages (e.g., Python's @functools.cache, and any symbolic programming language)

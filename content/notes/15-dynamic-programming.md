---
title: "17-dynamic-programming"
aliases: 
tags: 
- lecture
- cosc201
sr-due: 2022-05-19
sr-interval: 10
sr-ease: 250
---

- [dynamic-programming](notes/dynamic-programming.md)
- [memoization](notes/memoization.md)










What is dynamic programming? 

Dynamic is just a name chosen so that it cannot be used ina bad way i.e., it cannot have bad connotations. 

Programming refers not the just compute programming.

In three words: remembering useful answers
In more than three words: Trading space (remembering useful answers) for time (not having to recompute them later).

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

# DP vs memoization
bottom typically compute *all* simpler versions of the problem. When this is neccessary then DP will be faster. However it only a small proportion of the previous case are actually needed it may be better to use memoization. sometimes we can reduct the storage need for DP too. e.g., in the following fibonacci example

better fibonacci
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

# DP vs Divide and conquer

d and c is splitting into chunks with *no overlap*. So there's nothing to gain by remembering one part, since it cant help in solving any other part. 

DP or memozation should be used only when there is value added by remembering answers.

# Route counting example

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
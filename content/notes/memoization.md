---
title: "memoization"
aliases: caching
tags: 
- cosc201
- paradigm
- code
---

A method of designing algorithms which is similar to dynamic programming in that previously calculated answers are stored in memory

- initialising memory for answers
- work from top down
- whenever a result is computed store it in memory
- look up computed values (if you can) when needed

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

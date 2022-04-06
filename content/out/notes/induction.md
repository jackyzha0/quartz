---
title: Induction
draft: true
sr-due: 2022-04-23
sr-interval: 29
sr-ease: 272
---


tags: #review

---

# Induction
## PECS
Phases of argument by induction

- Preparation -> most important
- Execution -> becomes routine if prep is good
- Checking -> second most important
- Satisfaction

### Preparation
- isolate the property that you are trying to verify and the parameter, n, associated with is
	- e.g., min possible size of set of rank k is $2^n$
- Confirm by hand that for small values of the parameter, the property is true
- Use previous cases as assumptions
- Pause and reflect
- If you understand what's going on -> proceed to execution

### Execution
Technical and prescribed (once you're an expert you can take some liberties)

Four parts
- statement
- verificatio of base case
- inductive step
- conclusion

e.g., 
- we will prove that, for every non-negative integer $n$, *insert property here*
- For $n = 0$, *The property* is true because *explicit verification of this case*
- for any $n > 0$, assuming *the property* is true for $n-1$ (or, for all $k < n$), *the property* is true at $n$ because *explain why we can take a step up*
- Therefore, by induction, *the property* is true for all n.

### Checking
Basically debugging without a compiler to find errors
- have you forgotten anything? e.g., the base case
- Does the inductive step work fro  0 to 1? or are they irregular
- Make sure that you are only assuming the result for things less than $n$
- ideally show someone and try to convince them (dont let them be polite)
- if necessary go back to execution or preparation

### Satisfaction
Commence satisfaction.
Confidence +100. 😆

## Examples
### Union Find - min size for set of rank k

- Initially every element is its own representative and every element has rank 0;
- when we do a union operation, the the two reps have different ranks, the ranks stay the same
- when we do a union operation, if the two reps have the same rank, then the rank increases

minimum (and only) size of a rank 0 rep is 1

to get a rank 1 representative, we form a union of either a rank 0 and a rank 1 set or two rank 0 sets
for the minimum possible size, it must be the second case, and the two rank 0 sets must be each of minimum size 1, so this gives minimum size for a rank 1 set of 2

To get a rank 2 rep, we form a union of either rank 2 and rank 0 or 1 set, or two rank 1 sets
For the minimum possible size, it must be the second cae, and the two rank 1 sets must each be of minimum size 2, so this gives minimum size for a rank 2 set of 4

To get a rank $n$ rep, we form a union of either rank $n$ and rank $k$ set for some $k<n$ or two rank $n-1$ sets.
For the minimum possible size, it must be the second cae, and the two rank $n-1$ sets must each be of minimum size, which we are **assuming** $2^(n-1)$, so this gives minimum size for a rank $n$ set of

> $2^{n-1} + 2^{n-1} = 2\times2^{n-1} = 2^n$


 
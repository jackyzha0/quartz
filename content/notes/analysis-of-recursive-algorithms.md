---
title: analysis of recursive algorithms
aliases: Proof by induction, induction
sr-due: 2022-05-02
sr-interval: 29
sr-ease: 250
---
#review
## 1 Review Questions
Do one practice problem

### 1.1 MaxNum
```
	maxNum = -1
	for num in numbers
		if num < maxNum then
			maxNum = num;
		end
	end
```

parameter n is length of the array of number

we will prove that, for every non-negative integer n, the maximum time to find the max num is Ο(n)

for n = 1 this is true because the maximum number is always the first number we check
for n =2 this is true because the maximum number is always on of the first two numbers we check

for any n >0, assuming this is true for all n-1, this is true at n because the maximum amount of number to check is never greater than n

∴ by induction, the time comnplexity is  Ο(n)

___

# Analysis of recursion algorithms
- induction and recursion are linked
- inductive approach is esential for understanding time-complexity of resursive algorithms

## 2 Proof by induction
[Induction](content/notes/induction.md)
Find a (positive integer) _parameter_ that gets smaller in all recursive calls
Prove inductively that "for all values of the parameter, the result computed is correct"
To do that:
- check correctness is all non-recursive cases
- check correctness in recursive cases assuming correcness in the recursive calls

## 3 Examples
### 3.1 Quicksort
[divide and conquer](None) algorithm
sorts a range in an array (a group of elements between some lower index, $lo$ inclusive and some upper index $hi$ exclusive) as follows:
- If length of range $(hi - lo)$ is at most 1 -> do nothing
- otherwise, choose a pivot p (e.g., the element at $lo$) and:
	- place all items less that p in positions $lo$ to $lo +r$
	- place all items >= p in positions $lo +r+1$ to $hi$
	- place p in position $lo+r$
	- call quicksort on the ranges $lo$ to $lo + r$ and $lo+r+1$ to $hi$

#### 3.1.1 Proof
parameter is $hi - lo$

the parameter gets smaller in all recusive call because we always remove the element $p$ so, even if it is the smallest or largest element of the range ,,the recursive call has a range of size at most $hi - lo - 1$

the non-recursive case is correct because if we have 1 or fewer elements in a range they are already sorted

in the recirsive case, since all the elements before $p$ are smaller than it and we assume they get sorted correctly be quicksort, and the same happens for the elements larger than p, we will get a correctly sorted array


### 3.2 Fibonacci 1
```python
	def fib(n)
		if n <= 1
			return 1
	return fib(n-1) + fib(n-2)
```

line 1 -> always executed
line 2 -> executed if n<=1
line 4 -> executed if n>1, cost equal to cost of callling fib(n-1), fib(n-2), and some constant cost for the addition and return

#### 3.2.1 Cost bounds/Proof
if we let T(n) denote the time required for evaluating fib(n) using this algorithm this analysis gives: 

>## $T(0) = T(1) = C$
>## $T(n) = D + T(n-1) + T(n-2)$

where c and d are some positive (non-zero) constants. 

- this shows that T(n) grows at least as quick as fib(n)
- even if $D=0$ we'd get $T(n) = C \times fib(n)$
- growth rates are the same $\therefore$ exponential (at least $1.6^n$) and far too slow

> A recurive algorithm that makes two or more recurive calls with parameter values close to the original will generally have exponential time complexity

### 3.3 Fibonacci 2
```python
	def fibPair()
		if n == 1
			return 1, 1
		a,b = fibpair(n-1)
		return b, a+b
```
line 1 -> always executed some constant cost
line 2-> executed if n=1, some constant cost
line 4-> executed if n>1, cost equal to cost of calling fibPair(n-1)
line 5 -> executed if n>1, some constant cost

#### 3.3.1 Proof
it's true for $n-1 by design$
If it's true at n-1 then the result of computing fibpair(n) is:

$(f_{n-1}, f_{n-1} + f_{n-1}) = (f_{n-1}, f_n)$

which is what we want

#### 3.3.2 Cost bounds
if we let P(n) denote the time required for evaluating fib(n) using this algorithm this analysis gives: 

$P(1) = C$
$P(n) = P(n-1) + D\ for\ n>1$

where $C$ and $D$ are some positive (non-zero) constants.

 
 Claim: $P(n) = C + D(n-1)$

By induction: 
it's true for n = 1 since,

$P(1) = C$
$C+D\times(1-1)=C$
	
suppose that it's true for n-1. Then it's true for n as well because

$P(n) = P(n-1) + D$
$\ \ \ \ \ \ \ \ \ = C+D\times(n-2)+D$
$\ \ \ \ \ \ \ \ \ = C+D\times(n-1)$

$\therefore$ By induction it's true for all $n>=1$



$P(n)$ is the time for evaluating $fibPair(n)$ using this algorithm. This analysis gives:

$P(1) = C$
$P(n) = P(n-1) +D$

where C and D are some positive constants

#theorem 
> ## $P(n) = C+D\times(n-1)$
> in particular, $P(n) = \theta(n)$

> A recursive algorithm that make one recurive call with a smaller value and a constant amount of additional work will have at most linear time complexity

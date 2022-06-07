
#math/calculus 


$\epsilon$=tiniest little value
N = a possible findable number
n = index in the sequence.
L = a possible findable limit

# convergence (for sequences)
for all $\epsilon>0$ we can find $N$:
$n>N$    -------     $|L-a_n|<\epsilon$

# divergence (for sequences)
for all $M$ we can find $N$ such that (st):
$n>N$    ------	$a_n>M$
The sequence constantly grows in a direction.
Or, it can oscillate! $sin(x)$ does not converge, so it's divergent.

# test for divergence or convergence of series
```python
from sympy import *
x=symbols('x')
series = Sum(1/(6 + exp(-x)), (x, 1, oo))
series.is_convergent()

```
- test for divergence
- break it into parts
- check if geometric
- telescoping
- MCT [[monotone_and_bounded]]? Integral bigger converges? Series converges
- Integral test. If the integral starting from 1 converges, it converges. For the Integral test, the function must be:
	- continuous
	- positive
	- decreasing
	![[Pasted image 20220524104017.png]]
- ![[More tests for convergence#Direct Comparison Test]]
- ![[More tests for convergence#Limit Comparison Test]]
- ![[Alternating Series Test]]
- ![[Ratio test]]
- Root Test ![[Pasted image 20220526191532.png|Root Test]]
- 
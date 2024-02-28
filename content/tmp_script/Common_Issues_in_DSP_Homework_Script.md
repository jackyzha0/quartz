---
title: Common Issues in DSP Homework
tags:
  - homework
---

# Issue 1- Compute the unit-pulse response h[n]

## h[-1]?

When n is less than zero, it means at a past point in time, i.e., before the current point in time. In this case, **if the system is causal, the unit shock response h[n] should be zero for n less than zero**. This is because the system has not been subjected to any inputs at past points in time, and therefore its response should be zero.

So,
$$
h[n < 0] = 0
$$
## Categorized discussion

![](tmp_script/attachments/Pasted%20image%2020231112222852.png)

# Issue 2 - Using recur function to compute the approximation to y(t), in differential equation.


## Example

$$
\frac{d^2y(t)}{dt^2} + \frac{dy(t)}{dt}+4.25y(t) = 0, y(0) = 2, \dot{y}(0)=1
$$

$$
y[n+2] + y[n+1](T-2) +y[n](1-T+T^2 4.25) = 0
$$

```matlab
function y = recur(a, b, n, x, x0, y0)
	N = length(a); 
	M = length(b)-1;
	y = [y0 zeros(1,length(n))]; 
	x = [x0 x]; a1 = a(length(a):-1:1); % reverses the elements in a 
	b1 = b(length(b):-1:1); 
	for i=N+1:N+length(n)
		y(i) = -a1*y(i-N:i-1)' + b1*x(i-N:i-N+M)'; 
	end 
	y = y(N+1:N+length(n)); 
end
```



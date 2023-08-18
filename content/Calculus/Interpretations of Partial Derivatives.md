---
title: "Interpretations of Partial Derivatives"
tag:
date: 2023-08-14
draft:
---

## Rates of change
- $f_{x}(x,y)$ represents the rate of change of the function $f(x,y)$ as we change $x$ and hold $y$
- $f_{y}(x,y)$ represents the rate of change of the function $f(x,y)$ as we change $y$ and hold $x$

	![|375](Calculus/attachments/Pasted%20image%2020230814200509.png)
	In the hyperbolic paraboloid above, we can see that if we move along the y-axis, the graph is increasing and if we move along the x-axis the graph is decreasing

## Slopes of tangent:
Partial derivatives are the slopes of traces: 
![Traces](Calculus/Functions%20of%20Several%20Variables.md#Traces)

- The partial derivative of $f_{x}(a,b)$ is the slope of the trace of $f(x,y)$ for the plane $y=b$ at the point $(a,b)$. 
- The partial derivative of $f_{y}(a,b)$ is the slope of the trace of $f(x,y)$ for the plane $x=a$ at the point $(a,b)$

### Getting the equations of tangent line
The point is easy to find by plugging the points into the equation: $$(a,b,f(a,b))$$
The parallel (or tangent) vector is then: $$\vec{r}(x,y)=\langle x,y,z \rangle =\langle x,y,f(x,y) \rangle $$
If we differentiate with respect to $x$ we will get a tangent vector to traces for the plane $y=b$ (i.e. for fixed $y$): $$\begin{align}
\vec{r}_{x}(x,y)&=\langle 1,0,f_{x}(x,y) \rangle  \\
\vec{r}(t) &= \langle a, b, f(a,b) \rangle +t\langle 1, 0, f_{x}(a,b) \rangle  \\
\end{align}$$
For traces with fixed $x$ such that $x=a$: $$\begin{align}
\vec{r}_{y}(x,y) &= \langle 0,1,f_{y}(x,y) \rangle \\
\vec{r}(t) &= \langle a,b,f(a,b) \rangle +t\langle 0,1,f_{y}(a,b) \rangle 
\end{align}$$

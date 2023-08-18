---
title: "Partial Derivatives"
tag:
date: 2023-08-11
draft:
---

A derivative represents the rate of change. When there's more than one variable, what do we do if we only want one of the variables to change?
- Can't have more than one variable changing, as there are an infinite amount of ways for them to change (one variable could be changing faster than the other variable(s) in the function, etc)

>[!info] Intuition
>If you are taking a partial derivative with respect to $x$, treat all other variables as constants.

---
## Formal Definition

$$f_{x}(x,y) = \lim_{ h \to 0 } \frac{f(x+h, y)- f(x,y)}{h}$$
$$f_{y}(x,y) = \lim_{ h \to 0 } \frac{f(x, y+h)- f(x,y)}{h}$$
---
## Partial Derivatives Example
Let's use the function $f(x,y) =2x^{2}y^3$ as an example and determine the rate at which the function is changing at at a point $(a,b)$

- **Allow $x$ to vary, fix $y$**
	Since $y$ is fixed and we are looking at the point $(a,b)$, we will always have $y=b$. Thus, we have a function with $x$ as the only variable: $$g(x) = f(x,b) = 2x^{2}b^3$$
	We are concerned with the rate of change of $g(x)$ at $x=a$, or $g'(a)$. This is simple since it's just a function of a single variable: $$g'(a) = 4ab^3$$
	We call $g'(a)$ the *partial derivative* of $f(x,y)$ with respect to $x$ at $(a,b)$ and we will denote it in the following way: $$f_{x}(a,b)=4ab^3$$

- **Allow $y$ to vary, fix $x$**
	Since $x$ is fixed we will always have $x=a$, and so we can define a new function of $y$ and differentiate this regularly. $$h(y) = f(a,y) =2a^{2}y^{3}$$$$\Rightarrow h'(b) = 6a^{2}b^{2}$$
	In this case, $h'(b)$ is the *partial derivative* of $f(x,y)$ with respect to $y$ at $(a,b)$ and we denote it as follows: $$f_{y}(a,b) = 6a^{2}b^{2}$$
Or: $$f_{x}(x,y) = 4xy^{3}\text{ and } f_{y}(x,y)=6x^{2}y^{2}$$

---
## Notation
Given that $z= f(x,y)$:
$$f_{x}(x,y) = f_{y} = \frac{ \partial f }{ \partial x } = \frac{ \partial  }{ \partial x }(f(x,y)) = z_{x} = \frac{ \partial z }{ \partial x } = D_{x}f  $$
$$f_{y}(x,y) = f_{y} = \frac{ \partial f }{ \partial y } = \frac{ \partial  }{ \partial y } (f(x,y)) = z_{y} = \frac{ \partial z }{ \partial y } = D_{y}f $$
---

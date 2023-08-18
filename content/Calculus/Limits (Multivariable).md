---
title: "Limits (Multivariable)"
tag:
date: 2023-08-10
draft:
---

Basic single-variable limit: $$\lim_{ x \to a } f(x)=L$$ if we have $$\lim_{ x \to a^{+ }}f(x)=\lim_{ x \to a^- } f(x)=L $$

Extending to multi-variable: $$\lim_{ (x,y) \to (a,b) } f(x,y)$$
In order for this to exist, the function must be approaching the same value. The problem here is that there are an infinite number of paths that we can take as we move toward $(a,b)$. How can we check infinite paths? The answer is **continuity**.
![|225](Calculus/attachments/Pasted%20image%2020230811144258.png)

> [!defn] **Definition:** Continuity
> A function $f(x,y)$ is *continuous* at the point $(a,b)$ if $$\lim_{ (x,y) \to (a,b) } f(x,y) = f(a,b) $$

Thus, if we know a function is continuous at a point then all we need to do to take the limit is to evaluate $f(a,b)$.

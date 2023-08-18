---
title: "Velocity and Acceleration"
tag: calc3
date: 
alias:
---

Given the position function of an object, the velocity of the object is the first derivative of the position function and the acceleration of the object is the second derivative of the position function. $$\vec{v}(t) = \vec{r}'(t), \vec{a}(t) = \vec{r}''(t)$$
We can split up acceleration into tangential and normal components (recall from SYDE 182), such that we have: $$\vec{a} = a_{T}\vec{T} + a_{N}\vec{N}$$
where $\vec{T}$ and $\vec{N}$ are the unit tangent and unit normal for the position function.

If we let $v = \mid \mid \vec{v}(t) \mid \mid$, then the tangential and and normal components of the acceleration are given by: $$a_{T} = v' = \frac{\vec{r}'(t) \cdot \vec{r}''(t)}{\mid \mid \vec{r}'(t) \mid \mid} $$
$$a_{N} = \kappa v^{2} = \frac{||\vec{r}'(t) \cdot \vec{r}''(t)||}{||\vec{r}'(t)||}$$
where $\kappa$ is the [curvature](Calculus/Curvature.md) for the position function.
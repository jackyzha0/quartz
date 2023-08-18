---
title: "Tangent, Normal, and Binormal Vectors"
tag: calc3
date: 
alias:
---

Given $\vec{r}(t)$, the derivative $\vec{r}'(t)$ is the tangent vector.
The tangent line to $\vec{r}(t)$ at $P$ is the line passing through P and parallel to $\vec{r}(t)$.
Note that $\vec{r}'(t) \neq 0$ (vectors must have magnitude)

**Tangent vector:** $$\vec{r}'(t)$$
**Unit tangent vector:** $$\vec{T}(t)= \frac{\vec{r}'(t)}{\mid\mid \vec{r}'(t)\mid\mid}
$$
- Tangent to curve with magnitude 1

**Unit normal vector:**$$\vec{N}(t)=\frac{\vec{T}'(t)}{\mid \mid {T}(t)\mid \mid}$$
- Orthogonal to $\vec{T}$ (hence also orthogonal to original curve $\vec{r}(t)$)

**Binormal vector**:
$$\vec{B}(t)= \vec{T}(t)\times \vec{N}(t)$$
- Orthogonal to both the tangent and normal vector (definition of cross product basically)
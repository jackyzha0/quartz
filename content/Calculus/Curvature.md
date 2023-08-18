---
title: "Curvature"
tag: calc3
date: 
alias:
---

Curvature of a smooth curve measures how fast a curve is changing direction at a given point. 

> [!defn] Definition: Smooth Curve
>- Any curve for which $\vec{r}(t)$ is continuous and $\vec{r}(t)\neq 0$ for any $t$ (except maybe endpoints)
>- A helix is an example of smooth curve

Formal Definition:
>[!defn] Definition: Curvature
>$$\kappa = \Bigg | \Bigg | \frac{d\vec{T}}{ds} \Bigg | \Bigg | $$
>where $\vec{T}$ is the unit tangent and $s$ is the arc length
>- Recall that we can [[Arc Length with Vector Functions#^arclengthfunction | reparametrize a curve to get it in terms of arc length]]

The formal definition can be hard to use so there are alternate formulas:
>[!defn] Alternate Curvature Formulas
>$$\kappa = \frac{\mid \mid \vec{T}'(t) \mid \mid}{\mid \mid \vec{r}'(t) \mid \mid}$$
>$$\kappa = \frac{\mid \mid \vec{r}'(t) \times \vec{r}''(t) \mid \mid}{\mid \mid \vec{r}'(t) \mid \mid ^3}$$

Special case: 
	Suppose we have a curve given by $y=f(x)$ and we want to find its curvature.
	We can write this as a vector function: $$\vec{r}(x) = x \vec{i} + f(x)\vec{j}$$This can then be rewritten using the second formula for curvature above:
	$$\kappa = \frac{| f''(x) |}{1+[f'(x)^{2}]^{\frac{3}{2}}}$$
	I saw this in SYDE 182 Dynamics for expressing circular motion!!


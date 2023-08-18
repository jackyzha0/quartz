---
title: "Vector Equations of Lines"
tag: calc3
date: 
alias:
---

How do we use vector functions to describe lines?
- *Vector function* – take variable(s), return a vector.
	- [[Vector Equations of Lines#Vector form|Vector form]]
	- [[Vector Equations of Lines#Parametric form|Parametric form]]
	- [[Vector Equations of Lines#Symmetric form|Symmetric form]]


For example: $\vec{r}(t) = \langle t,1 \rangle$
- Describes a position vector $\vec{r} = \langle a,b\rangle$ that starts at the origin and ends at $(a,b)$
- Some example inputs into the function: $$r(3) = \langle -3,1\rangle, r(-1) = \langle -1,1\rangle, r(2) = \langle 2,1\rangle, r(5)=\langle 5,1\rangle$$
Thus, we can describe lines and shapes like:
![[Pasted image 20230730003232.png|500]]

---
## Vector form
Slope needs to be defined as a direction in 3D.

- Let $P_{0} = (x_{0}, y_{0}, z_{0})$ and $P=(x,y,z)$
- Let $\vec{r}=\langle x_{0}, y_{0}, z_{0} \rangle$ and $\vec{r} = \langle x,y,z \rangle$
- Let $\vec{a} = \vec{P_{0}P}$
- Let $\vec{v} = \langle a,b,c\rangle$ that is parallel to $\vec{a}$

![[Pasted image 20230730004200.png|300]]

Then, we have $\vec{r} = \vec{r_{0}} + \vec{a}$, and there is some $t$ that $\vec{a} = t\vec{v}$.
Thus, we have:
$$
\vec{r} = \vec{r_{0}}+ t\vec{v} = \langle x_0,y_0,z_{0} \rangle + t\langle a,b,c\rangle \tag{1}
$$

This is the **vector form of equation of a line.**

$t\vec{v}$ lies along the line and tells us how far from the original point we travel.
- For $t \rangle 0$, we move in the direction of $\vec{v}$
- For $t\langle0$, we move in the opposite direction

---
## Parametric form
From equation $(1)$ above we can get: $$\langle x,y,z\rangle = \langle x_{0}+ ta, y_{0}+tb, z_{0}+tc\rangle$$Thus, we can get a **parametric form**:
$$x = x_{0}+ ta$$
$$y = y_{0}+ tb$$
$$z = z_{0}+tc$$
---
## Symmetric form
If we isolate $t$ in the parametric form, we can get:
$$\frac{x-x_{0}}{a}, \frac{y-y_{0}}{b},\frac{z-z_{0}}{c}$$
This is still valid even if one of them is $0$:
- For example, if $b=0$,  $t$ will not exist in the parametric equation for $y$and so we will only solve the parametric equations for $x$ and $z$ for $t$: $$\frac{x-x_{0}}{a} = \frac{z-z_{0}}{c}, y=y_0$$

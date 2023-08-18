---
title: "Vector Equations of Planes"
tag: calc3
date: 
alias:
---

Representing planes with vector equations – extension of [[Vector Equations of Lines]]

> [!tip] Intuition
> The general idea here is that a plane is described by two vectors:
> - Vector 1: Formed by two points lying on the plane ($\vec{r} - \vec{r_0}$)
> - Vector 2: Normal vector
> 
>Below are just different forms expressing these 2 vectors.

Suppose we have a **normal vector** that is orthogonal to the plane $\vec{n} = \langle a,b,c \rangle$
For points $P_{0}= (x_{0}, y_{0}, z_{0})$ and $P=(x,y,z)$ on the plane, let $\vec{r_{0}}$ and $\vec{r}$ be position vectors for $P_0$ and $P$.
Then, vector $\vec{r} - \vec{r_0}$ lies on the plane. 


![[Pasted image 20230731105534.png|200]]

## Vector Equation of Plane
Since $\vec{n}$ is normal, by the properties of dot product we have: 
$$\vec{n} \cdot (\vec{r}-\vec{r_{0}})= 0$$$$\vec{n} \cdot \vec{r} = \vec{n} \cdot \vec{r_0}$$
## Scalar Equation of Plane
A more useful form:
$$\langle a,b,c \rangle \cdot (\langle x,y,z \rangle - \langle x_{0}, y_{0}, z_{0} \rangle) = 0$$
$$\langle a,b,c \rangle \cdot \langle x - x_{0}, y - y_{0}, z - z_{0} \rangle = 0$$
$$ a (x - x_{0}) + b (y - y_{0}) +c( z - z_{0}) = 0 $$
$$ax + by + cz = d$$
Here, $d = ax_{0}+ by_{0} + cz_{0}$.
This equation gives us the normal vector easily because $\vec{n}=\langle a,b,c \rangle$


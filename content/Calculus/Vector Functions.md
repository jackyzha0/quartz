---
title: "Vector Functions"
tag: calc3
date: 
alias:
---

- Taking variables, return a vector
- Vector functions of a single variable in $\mathbb{R}^2$ and $\mathbb{R}^3$:
	- $\vec{r}(t) = \langle f(t),g(t) \rangle$
	- $\vec{r}(t) = \langle f(t),g(t),h(t) \rangle$
   where $f(t), g(t), h(t)$ are "component functions”
	
- **Domain** = set of all $t$‘s for which the component functions are defined

> [!Example] Vector Function Domain Example
> $$\vec{r}(t) = \langle \cos t, \ln(4-t), \sqrt{t+1} \rangle$$
> - $\cos t$: All $t$’s
> - $\ln(4-t)$:  $t<4$
> - $\sqrt{t+1}$: $t \geq -1$

- Graph of vectors – think of vector returned by the vector function as a position vector for points
	- Position vector $\vec{v} = \langle a,b,c \rangle$ is a vector that starts at origin and goes to $(a,b,c)$
- Basically just plug values in and plot points according to the resulting position vector

>[!example] Vector Function Graphing Example
>$$\vec{r}(t) = \langle 4\cos_{t}, 4\sin t , t \rangle$$
>Since the $z$-axis is not constant, we will get a spiral about the $z$-axis
>Spiral revolves around axis with $t$.
>
>![[Pasted image 20230802140856.png|200]]
>

---
## Determining the vector equation of a line segment

Let’s say we have a segment starting at $P=(x_1,y_1,z_1)$ and ending at $Q=(x_2,y_2,z_2)$.
We can use these points as info.
Find direction of the line with: $$\vec{v} = \langle x_{2}- x_{1,}y_{2} - y_{1},z_{2}- z_{1} \rangle$$
Then, using direction $\vec{v}$ and point $P$, we then have:
$$
\vec{r}(t) = \langle x_{1}-x_{2},y_{2}-y_{1}, z_{2}-z_{1} \rangle + t\vec{v}
$$
$$\vec{r}(t) = \langle x_{1}, y_{1,}z_{1}\rangle + t\langle x_{2}-x_{1}, y_{2}-y_{1}, z_{2}-z_{1} \rangle$$
$$\vec{r}(t)=\langle x_{1}, y_{1}, y_{1} \rangle + t \langle x_{2}, y_{2}, z_{2} \rangle - t\langle x_{1}, y_{1}, z_{1} \rangle$$
$$\vec{r}(t) = (1-t) \langle x_{1}, y_{1}, z_{1} \rangle + t\langle x_{2}, y_{2}, z_{2} \rangle$$
Since we want the segment to start at $P$ and $Q$, we need to restrict $t$:
- Notice that $\vec{r}(0) = \langle x_{1},y_{1},z_{1} \rangle$ and $\vec{r}(1) = \langle x_{2}, y_{2}, z_{2} \rangle$
- Thus we can just restrict $0 \leq t \leq 1$
Then, we have:
$$\vec{r}(t)=(1-t)\langle x_{1}, y_{1}, z_{1} \rangle + t\langle x_{2}, y_{2}, z_{2} \rangle, 0 \leq t \leq 1$$

---
## 2-variable Vector Functions

Graphs become surfaces.

> [!example] 2-variable Vector Function Example
> $$\vec{r} (x,y) = x \vec{i} + y \vec{j} + (x^{2} + y^{2}) \vec{k}$$
> 
> Parametric form: $x = x, y = y, z = x^{2} + y^{2}$
> $\therefore$ Elliptic paraboloid ($z$-axis)

Any 1-variable or 2-variable can be written in vector form:

**1-variable:**
- $\vec{r}(x) = x \vec{i} + f(x) \vec{j}$
- $\vec{r}(y) = h(y) \vec{i} + y \vec{j}$

**2-variable:**
- $\vec{r}(x,y) = x \vec{i} + y \vec{j} + g(x,y) \vec{k}$
- $\vec{r}(y,z) = g(y,z) + y \vec{j} + z \vec{k}$
- $\vec{r}(x,z) = x \vec{i} + g(x,z) \vec{j} + z \vec{k}$

Example: $$y = 2x^{2} - 5z^{2} = x \vec{i} + (2x^{2} -5z^{2}) + z \vec{k}$$

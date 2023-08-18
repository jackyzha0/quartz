---
title: "Functions of Several Variables"
tag: calc3
date: 
alias: Multivariable Functions
---

Multivariable functions.

Graphs of 2-var functions are surfaces in 3D space
- Ex: $z = f(x,y) = 2x^{2}+ 2y^{2} - 4$

Equation of a plane: $ax + by + cz$
- Solving for $z$ allows us to use function notation $$f(x,y) = Ax+By+D$$
![[Pasted image 20230801144947.png | 500]]
$f(x,y,z)$ would be a 4D surface!

---
## Level/Contour Curves

Level curves of a 3D function $z = f(x,y)$ are 2D curves we get by setting $z=k$, where $k$ is any number. Thus, equations of level curves are $f(x,y) = k$.

The intuition for this like slicing a 3D object at a certain height.
- Contour/level represents the intersection given by surface $z = f(x,y)$ and $z=k$
For higher dimensions like $f(x,y,z)$, it would be a level surface instead of a level curve

>[!example] Example: Cone Level Curves
>Identify the level curves of $f(x,y) = \sqrt{x^{2}+y^2}$.
>The function is then:
>$$z = \sqrt{x^{2}+ y^2}$$
>Using $k$ instead:
>$$k = \sqrt{x^{2}+y^2}$$
>Simplifying:
>$$x^{2} + y^{2}= k^2$$
>
>![[Pasted image 20230801145755.png]]


### Traces:
- Curves that represent the intersection of the surface given $z=f(x,y)$ and places given by $x=a$ or $y=b$

>[!Example] Trace Example
>Let $f(x,y) = 10 - 4x^{2} - y^{2}$ for $x=1$ and $y=2$.
>$$x = 1 \longrightarrow z = f(1,y) = 10 - 4(1)^{2}- y^{2}= 6-y^2$$
>$$y=2 \longrightarrow z = f(x,2) = 10-4x^{2}-2 = 6-4x^2$$
>
>![[Pasted image 20230801184212.png]]

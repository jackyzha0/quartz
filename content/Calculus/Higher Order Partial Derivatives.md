---
title: "Higher Order Partial Derivatives"
tag:
date: 2023-08-15
draft:
---

Consider a two-variable function $f(x,y)$. Since both of the 1st-order partial derivatives are also functions of $x$ and $y$ we could in turn differentiate each with respect to $x$ or $y$. Therefore, in the case of a function of two variables there will be a total of 4 possible 2nd-order derivatives: 
$$
\begin{align}
(f_{x})_{x} &= f_{x x} = \frac{ \partial  }{ \partial x } \left( \frac{ \partial f }{ \partial x }  \right) = \frac{ \partial^2 f }{ \partial x^2 } \\
(f_{x})_{y} &= f_{x y} = \frac{ \partial  }{ \partial y } \left( \frac{ \partial f }{ \partial x }  \right) = \frac{ \partial^2 f }{ \partial y \partial x } \\
(f_{y})_{x} &= f_{y x} = \frac{ \partial  }{ \partial x } \left( \frac{ \partial f }{ \partial y }  \right) = \frac{ \partial^2 f }{ \partial x \partial y } \\
(f_{y})_{y} &= f_{y y} = \frac{ \partial  }{ \partial y } \left( \frac{ \partial f }{ \partial y }  \right) = \frac{ \partial^2 f }{ \partial y^2 } \\
\end{align}
$$
- The 2nd and 3rd one are often called *mixed partial derivatives* since we are taking derivatives with respect to more than 1 variable

>[!example] 2nd-order Partial Derivative Example
>**Find all the second order derivatives for $f(x,y) = \cos(2x) - x^{2}e^5y+3y^{2}$**
>
>We'll first need the first order derivatives:
>$$
\begin{align}
f_{x}(x,y) &= - 2\sin(2x) - 2xe^5y \\
f_{y}(x,y) &= -5x^{2}e^{5y} + 6y \\
\end{align}
>$$

>
>The 2nd-order derivatives are then:

$$
\begin{align}
f_{xx} &= -4\cos(2x) - 2e^{5y} \\
f_{xy} &= -10xe^{5y} \\
f_{yx} &= -10xe^{5y} \\
f_{yy} &= -25x^{2}e^{5y} + 6
\end{align}
$$
---
## Clairut's Theorem

When functions are "nice enough" they will have $f_{xy} = f_{yx}$.

>[!info] Clairut's Theorem
>Suppose that $f$ is defined on a disk $D$ that contains the point $(a,b)$. If the functions $f_{xy}$ and $f_{yx}$ are continuous on this disk then, 
>$$f_{xy}(a,b) = f_{yx}(a,b)$$

Test test




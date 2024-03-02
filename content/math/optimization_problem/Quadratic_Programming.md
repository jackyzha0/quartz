---
title: Quadratic Programming
tags:
  - math
  - optimize
  - optimization
date: 2024-02-28
---

# Why I write this note?

[猪熊一波. _帮女朋友降维打击领导！_哔哩哔哩_bilibili_. https://www.bilibili.com/video/BV1ZN411T7c9/. Accessed 30 Nov. 2023.](https://www.bilibili.com/video/BV1ZN411T7c9/?spm_id_from=333.999.0.0&vd_source=c47136abc78922800b17d6ce79d6e19f)

# Tips

> [!tip] 
> "Programming" in this context refers to a formal procedure for solving mathematical problems. This usage dates to the 1940s and is not specifically tied to the more recent notion of "computer programming." To avoid confusion, some practitioners prefer the term "optimization" — e.g., "quadratic optimization."
> 
> "Programming" 在中文中的翻译可以为“规划”， “Quadratic Programming”的翻译为“二次规划”

> [!Summary] 
> A Quadratic Program(QP) has a  quadratic objective function and linear constrains

# Problem Formulation

The quadratic programming problem with $n$ variables and $m$ constraints can be formulated as follows. Given:

* a real-valued, n-dimensional vector $c$,
* an $n\times n$-dimensional real symmetric matrix $Q$,
* an $m \times n$-dimensional real matrix $A$, and
* an $m-dimensional$ real vector $b$

the objective of quadratic programming is to find an $n$-dimensional vector $x$, that will

$$
\text{minimize} \quad \mathup{\frac{1}{2} x^{T}Qx + c^{T}x}\quad 
$$
$$
\text{subject to} \quad A\mathup{x} \preceq b
$$
$$
\mathup{x} = \begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_n
\end{bmatrix}, \mathup{Q} = 
\begin{bmatrix}
Q_{11} & Q_{12} & \cdots & Q_{1n} \\
\vdots & \vdots & \ddots & \vdots \\
Q_{n1} & Q_{n2} & \cdots & Q_{nn}
\end{bmatrix},
\mathup{c} = \begin{bmatrix}
c_1 \\
c_2 \\
\vdots \\
c_n
\end{bmatrix},
\mathup{A} = 
\begin{bmatrix}
A_{11} & A_{12} & \cdots & A_{1m} \\
\vdots & \vdots & \ddots & \vdots \\
A_{n1} & A_{n2} & \cdots & A_{nm}
\end{bmatrix},
\mathup{b} = \begin{bmatrix}
b_1 \\
b_2 \\
\vdots \\
b_n
\end{bmatrix}
$$


# Reference


* [猪熊一波. _帮女朋友降维打击领导！_哔哩哔哩_bilibili_. https://www.bilibili.com/video/BV1ZN411T7c9/. Accessed 30 Nov. 2023.](https://www.bilibili.com/video/BV1ZN411T7c9/?spm_id_from=333.999.0.0&vd_source=c47136abc78922800b17d6ce79d6e19f)
* [“Quadratic Programming.” _Wikipedia_, 25 Nov. 2023. _Wikipedia_, https://en.wikipedia.org/w/index.php?title=Quadratic_programming&oldid=1186784717.](https://en.wikipedia.org/wiki/Quadratic_programming#:~:text=Quadratic%20programming%20(QP)%20is%20the,linear%20constraints%20on%20the%20variables.)

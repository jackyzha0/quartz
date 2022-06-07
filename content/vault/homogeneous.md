---
cards-deck: default_obsidian
---



#math/linear_algebra 

# definition
A system of linear equations is said to be ==homogeneous== if it can be written as an augmented matrix of the form $[A \mid \mathbf{0}]$, where $A$ is an $m \times n$ matrix and $\mathbf{0}$ is the zero vector in $\mathbb{R}^{m}$.
^1652734750442

Example: The following system of equations is homogeneous (all of the constants on the right-hand side are zero):
$$
\begin{array}{r}
3 x_{1}+5 x_{2}-4 x_{3}=0 \\
-3 x_{1}-2 x_{2}+4 x_{3}=0 \\
6 x_{1}+x_{2}-8 x_{3}=0
\end{array}
$$

An example matrix:
$\left[\begin{array}{ccc|c}
3 & 5 & -4 & 0 \\
-3 & -2 & 4 & 0 \\
6 & 1 & -8 & 0
\end{array}\right]$
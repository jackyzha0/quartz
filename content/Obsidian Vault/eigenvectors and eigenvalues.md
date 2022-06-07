---
cards-deck: default_obsidian
---

#math/linear_algebra 

# definition
#card
If a matrix that multiplies a vector results in the same vector that a scalar multiplying that vector would create, that vector is an eigenvector and that scalar is an eigenvalue.
^1653443848519

$$[; \frac{(0,1) \cdot (1,2)}{(1,2) \cdot (1,2)} \cdot (1,2) = \frac{2}{5} (1,2) = (2/5,4/5) ;]$$

# formula to get eigenvalues
#card/reverse 
All solutions of the equation $\operatorname{det}(A-\lambda I)=0$. 

example:
get eigenvalues and eigenvectors of $\left[\begin{array}{ll}3 & 1 \\ 1 & 3\end{array}\right]$
$\operatorname{det}(A-\lambda I)=\operatorname{det}\left[\begin{array}{cc}3-\lambda & 1 \\ 1 & 3-\lambda\end{array}\right]=(3-\lambda)(3-\lambda)-1=\lambda^{2}-6 \lambda+8$
Solve the quadratic equation $\lambda^{2}-6 \lambda+8=0$. it's $\lambda=4$ and $\lambda=2$. These are the eigenvalues of $A$.
To find the eigenvectors corresponding to the eigenvalue $\lambda=4$, we compute the null space of $A-4 I$. We find
$$
[A-4 I \mid \mathbf{0}]=\left[\begin{array}{rr|r}
-1 & 1 & 0 \\
1 & -1 & 0
\end{array}\right] \rightarrow\left[\begin{array}{rr|r}
1 & -1 & 0 \\
0 & 0 & 0
\end{array}\right]
$$
from which it follows that $\mathbf{x}=\left[\begin{array}{l}x_{1} \\ x_{2}\end{array}\right]$ is an eigenvector corresponding to $\lambda=4$ if and only if $x_{1}-x_{2}=0$ or $x_{1}=x_{2}$. Hence, the eigenspace $E_{4}=\left\{\left[\begin{array}{l}x_{2} \\ x_{2}\end{array}\right]\right\}=\left\{x_{2}\left[\begin{array}{l}1 \\ 1\end{array}\right]\right\}=$ $\operatorname{span}\left(\left[\begin{array}{l}1 \\ 1\end{array}\right]\right)$.
Similarly, for $\lambda=2$, we have
$$
[A-2 I \mid 0]=\left[\begin{array}{ll|l}
1 & 1 & 0 \\
1 & 1 & 0
\end{array}\right] \rightarrow\left[\begin{array}{ll|l}
1 & 1 & 0 \\
0 & 0 & 0
\end{array}\right]
$$
so $\mathbf{y}=\left[\begin{array}{l}y_{1} \\ y_{2}\end{array}\right]$ is an eigenvector corresponding to $\lambda=2$ if and only if $y_{1}+y_{2}=0$ or $y_{1}=-y_{2}$. Thus, the eigenspace $E_{2}=\left\{\left[\begin{array}{c}-y_{2} \\ y_{2}\end{array}\right]\right\}=\left\{y_{2}\left[\begin{array}{r}-1 \\ 1\end{array}\right]\right\}=\operatorname{span}\left(\left[\begin{array}{r}-1 \\ 1\end{array}\right]\right)$.
(this is from the book)
![[Linear Algebra A Modern Introduction (David Poole) (z-lib.org).pdf#page=284]]

![[C57-17-S3_2018050820180508.pdf]]
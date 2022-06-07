#math/linear_algebra 



## theorem on product of determinants
$det(AB)=(detA)(detB)$
**WARNING**   $det(A+B)\neq detA-detB$

## theorem for determinant of invertible matrix
$det(A^{-1})=\frac{1}{detA}$

## characteristic equation
$\operatorname{det}(A-\lambda I)=0$

# ways of computing
![[Pasted image 20220526165055.png]]

Definition (Determinant of $A$ )
![[Pasted image 20220526165329.png]]
![[Pasted image 20220526165339.png]]
For a $1 \times 1$ matrix $A=[a]$, the determinant of $A$, $\operatorname{denoted}$ by $\operatorname{det} A$, is defined to be
$$
\operatorname{det} A=a
$$
For $n \geq 2$, the determinant of an $n \times n$ matrix $A=\left[a_{i j}\right]$ is the sum
$$
\begin{aligned}
\operatorname{det} A &=a_{11} \operatorname{det} A_{11}-a_{12} \operatorname{det} A_{12}+\ldots+(-1)^{n+1} a_{1 n} \operatorname{det} A_{1 n} \\
&=\sum_{i=1}^{n}(-1)^{i+1} a_{1 i} \operatorname{det} A_{1 i}
\end{aligned}
$$
Sometimes we use absolute value brackets to denote the determinant, i.e. we sometimes write $|A|$ to $\operatorname{denote} \operatorname{det} A$.
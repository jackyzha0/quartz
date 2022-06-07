---
cards-deck: default_obsidian
---


#math/linear_algebra 

# definition
A ==subspace== of $\rm I\!R$ is any collection $S$ in $\mathbb{R}^{n}$ such that:
^1652733454769
1. The zero vector 0 is in $S$.
2. If $\mathbf{u}$ and $\mathbf{v}$ are in $S$, then $\mathbf{u}+\mathbf{v}$ is in $S$. ( $S$ is closed under vector addition.)
3. If $\mathbf{u}$ is in $S$ and $c$ is a scalar, then $c \mathbf{u}$ is in $S$. ( $S$ is closed under scalar multiplication.)

# homogeneous
All spans of [[homogeneous]] systems are subspaces. They all go through 0.

# null space
#card 
Null space describes wherever the matrix solutions equal 0. Usually you find a vector that, when it multiplies the matrix, the result is always zero. When the span of that vector\*matrix combo is all zeroes, that span is a null space.
^1652736387934

# Basis of a Subspace
#card/reverse 
A set of vectors that:
- are linearly independent
- span the subspace
Basically the most concise description of the subspace.
^1652736951914

## Bases of $\mathbb{R}^{n}$
### standard basis
$$
\mathbf{e}_{1}=\left[\begin{array}{c}
1 \\
0 \\
\vdots \\
0
\end{array}\right], \mathbf{e}_{2}=\left[\begin{array}{c}
0 \\
1 \\
\vdots \\
0
\end{array}\right], \ldots, \mathbf{e}_{n}=\left[\begin{array}{c}
0 \\
0 \\
\vdots \\
1
\end{array}\right]
$$
are called the standard basis for $\mathbb{R}^{n}$.

### other bases of $\mathbb{R}^{n}$
The columns of an invertible $nXm$ matrix are [[linearly independent]] and span $\mathbb{R}^{n}$.

## row space of matrix
Row reduce until the 0 rows come out. Every nonzero row found after that is independent and together, span that subspace. That means they're the basis.

## basis for null(matrix)
basis for null(A) is just the solution to the homogenous matrix for A. Set each column equal to zero, and the vectors that multiply those columns such that the sum equals the zero vector is the basis for null(A). 

- every basis for a space has the same number of elements.
- any set in a subspace with more vectors than the basis is linearly dependent.
- the name for that number of vectors/elements is the Dimension of space $S$ 	 	

## random
nullity: **The nullity of a matrix is determined by the difference between the order and rank of the matrix**. The rank of a matrix is the number of linearly independent row or column vectors of a matrix. If n is the order of the square matrix A, then the nullity of A is given by n – r.
![[Pasted image 20220519211804.png]]s
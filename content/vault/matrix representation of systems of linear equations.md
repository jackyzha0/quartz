#math/linear_algebra 

### matrix representation
#card 
a system can be represented by a matrix. each column represents the coefficients of each variable involved, the rows represent each equation in the system. Optionally, an augmented matrix includes a bar followed by the constant (but that's not there when the constant is 0)
For a given system of equations
$$
\begin{aligned}
x_{1}+3 x_{2}+2 x_{3}+3 x_{4} &=-4 \\
x_{2}-2 x_{3}-2 x_{4} &=3 \\
-x_{1}-3 x_{2}+2 x_{3}+x_{4} &=4
\end{aligned}
$$
we can express it as a matrix of coefficients
$$
\left[\begin{array}{rrrr}
1 & 3 & 2 & 3 \\
0 & 1 & -2 & -2 \\
-1 & -3 & 2 & 1
\end{array}\right]
$$
or as an augmented matrix
$$
\left[\begin{array}{rrrr|r}
1 & 3 & 2 & 3 & -4 \\
0 & 1 & -2 & -2 & 3 \\
-1 & -3 & 2 & 1 & 
\end{array}\right]
$$
![[Pasted image 20220502151226.png]]
^1651526044974

#### solve
You can do whatever you want with these elementary operations:
![[Pasted image 20220502232912.png]]
You wanna use those operations to reduce the matrix to row echelon form like so:
##### (reduced) row echelon form
![[Pasted image 20220502233033.png]]
these are often solutions to the system of equations. If a row and column intersection has just a one, then the little margin on the right signifies the solution for that column's corresponding variable.

##### the algorithm
the procedure to do so is as follows: 
![[Pasted image 20220505172055.png]]
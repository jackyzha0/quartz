Course: [[Algebra I]]

La definición del **determinante de una matriz 2x2** es la siguiente:

Dada una matriz 2x2 $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$, el determinante de $A$ se define como:

$$det(A) = ad - bc$$

Es decir, el determinante de una matriz 2x2 se obtiene multiplicando los elementos de la diagonal principal y restando el producto de los elementos de la diagonal secundaria. El determinante de una matriz 2x2 es un número escalar que puede ser positivo, negativo o cero.

El determinante de una matriz 2x2 tiene varias aplicaciones en álgebra lineal y otras áreas de las matemáticas. Por ejemplo, se utiliza para determinar si una matriz 2x2 es invertible o no. Si el determinante de una matriz 2x2 es cero, entonces la matriz no es invertible y se dice que es singular. Si el determinante es distinto de cero, entonces la matriz es invertible y se dice que es no singular. El determinante también se utiliza para calcular la matriz inversa de una matriz no singular.

## Definición de menor y cofactor
- **Menor:** El menor de una matriz cuadrada $A$ de orden $n$ es el determinante de cualquier submatriz cuadrada de orden $(n-1)$ obtenida al eliminar una fila y una columna de $A$. El menor se denota por $M_{ij}$, donde $i$ y $j$ son los índices de la fila y la columna eliminadas, respectivamente. Por ejemplo, el menor $M_{ij}$ de una matriz 3x3 $A$ se obtiene eliminando la fila $i$ y la columna $j$ de $A$ y calculando el determinante de la submatriz resultante de orden 2x2.
- **Cofactor:** El cofactor de una matriz cuadrada $A$ de orden $n$ es el número $C_{ij} = (-1)^{i+j}M_{ij}$, donde $M_{ij}$ es el menor correspondiente a la posición $(i,j)$ de $A$. El cofactor se utiliza para calcular la matriz adjunta y la inversa de una matriz cuadrada no singular. La matriz adjunta de $A$ se define como la matriz transpuesta de los cofactores de $A$, es decir, $adj(A) = (C_{ij})^T$. La inversa de $A$ se obtiene dividiendo la matriz adjunta de $A$ por el determinante de $A$, es decir, $A^{-1} = \frac{1}{det(A)}adj(A)$.

## Desarrollo de Laplace para determinante
El desarrollo de Laplace para el cálculo del determinante de una matriz cuadrada $A$ de orden $n$ se puede expresar matemáticamente de la siguiente manera:

$$det(A) = \sum_{j=1}^{n} (-1)^{i+j}a_{ij}M_{ij}$$

donde $a_{ij}$ es el elemento de la matriz $A$ en la fila $i$ y la columna $j$, $M_{ij}$ es el menor correspondiente al elemento $a_{ij}$ y $(-1)^{i+j}$ es el signo del cofactor $C_{ij}$. Este método se basa en la expansión del determinante a lo largo de una fila o columna de la matriz, utilizando los menores y cofactores de los elementos de esa fila o columna.

## Determinante de una matriz triangular
El teorema del cálculo del determinante de una matriz triangular establece que el determinante de una matriz triangular (superior o inferior) es igual al producto de los elementos de su diagonal principal. En otras palabras, si $A$ es una matriz triangular, entonces:

$$det(A) = \prod_{i=1}^{n} a_{ii}$$

donde $a_{ii}$ es el elemento de la diagonal principal de $A$ en la posición $(i,i)$ y $n$ es el orden de la matriz.



- Propiedades del Determinante y las operaciones elementales de filas![Untitled](Images/Determinantes/Untitled%204.png)
- Condiciones que generan determinantes cero
    - Si $A\in R^{n\times n}$ y una de las siguientes afirmaciones es ciertas, entonces $\det (A) =0$
	    - Si una fila o columna consta completamente de ceros
	    - Dos o más filas o columnas son iguales
	    - Una o más filas o columnas es múltiplo de otra fila o column

- Propiedades de los determinantes
    - $\det(AB)=\det(A)\cdot\det(B)$
    - $\det(cA)=c^n\det(A)$ siendo n el orden de la matriz
    - $\det(A^T)=\det(A)$
    
## Definición de matriz adjunta de A
La matriz adjunta de una matriz cuadrada $A$ de orden $n$ se denota por $adj(A)$ y se define como la matriz transpuesta de los cofactores de $A$. Es decir, si $C_{ij}$ es el cofactor correspondiente al elemento $a_{ij}$ de $A$, entonces la matriz adjunta de $A$ se define como:

$$adj(A) = \begin{pmatrix} C_{11} & C_{21} & \cdots & C_{n1} \\ C_{12} & C_{22} & \cdots & C_{n2} \\ \vdots & \vdots & \ddots & \vdots \\ C_{1n} & C_{2n} & \cdots & C_{nn} \end{pmatrix}^T$$

Es decir, la matriz adjunta de $A$ es una matriz cuadrada de orden $n$ cuyos elementos son los cofactores de $A$ transpuestos. La matriz adjunta de $A$ se utiliza para calcular la inversa de $A$ mediante la fórmula:

$$A^{-1} = \frac{1}{det(A)}adj(A)$$

donde $det(A)$ es el determinante de $A$. La matriz adjunta de $A$ es útil para calcular la inversa de $A$ porque contiene información sobre los cofactores de $A$, que a su vez están relacionados con los menores de $A$ y el determinante de $A$.

- Propiedades de la matriz adjunta![Untitled](Images/Determinantes/Untitled%208.png)

- Teorema Condición Necesaria y Suficiente para la inversa de una matriz![Untitled](Images/Determinantes/Untitled%209.png)  
- Teorema: **Sistemas Cramerianos**    ![Untitled](Images/Determinantes/Untitled%2011.png)
- Teorema: **2do Teorema de equivalencias**    ![Untitled](Images/Determinantes/Untitled%2012.png)
Course: [[Algebra I]]

Date: February 12, 2023 5:20 PM
Status: Done
Year: 2021

- Definición de **producto de dos matrices**
    El producto de dos matrices es una operación que se realiza multiplicando cada fila de la primera matriz por cada columna de la segunda matriz y sumando los productos resultantes. Formalmente, si $A$ es una matriz de tamaño $m \times n$ y $B$ es una matriz de tamaño $n \times p$, entonces el producto de $A$ y $B$, denotado por $AB$, es una matriz de tamaño $m \times p$ cuyos elementos se calculan como sigue:$$(AB)_{ij} = \sum_{k=1}^n a_{ik} b_{kj}$$para todo $i = 1, 2, ..., m$ y todo $j = 1, 2, ..., p$. Es decir, el elemento $(i,j)$ de la matriz $AB$ es el resultado de multiplicar la fila $i$ de la matriz $A$ por la columna $j$ de la matriz $B$ y sumar los productos resultantes.

- **Propiedades** del **producto de matrices**
    - **Asociatividad:** El producto de matrices es asociativo, es decir, $(AB)C = A(BC)$ para cualquier terna de matrices $A$, $B$ y $C$ que tengan tamaños compatibles para el producto.
	- **Distributividad del producto de matrices respecto a la suma de matrices:** El producto de una matriz por la suma de dos matrices es igual a la suma de los productos de la matriz por cada una de las matrices sumadas. Formalmente, si $A$, $B$ y $C$ son matrices que tienen tamaños compatibles para el producto y la suma, entonces se cumple que $A(B+C) = AB + AC$.
	- **Distributividad del producto de matrices respecto al producto por un escalar:** El producto de una matriz por un escalar es distributivo respecto al producto de matrices. Formalmente, si $A$ y $B$ son matrices que tienen tamaños compatibles para el producto y $\alpha$ es un escalar, entonces se cumple que $\alpha(AB) = (\alpha A)B = A(\alpha B)$.
	- **Existencia de elemento neutro:** No existe una matriz que actúe como elemento neutro para el producto de matrices. Es decir, no existe una matriz $O$ tal que $AO = OA = A$ para cualquier matriz $A$ que tenga tamaños compatibles para el producto.
	- **No conmutatividad:** El producto de matrices no es conmutativo, es decir, en general $AB \neq BA$ para cualquier par de matrices $A$ y $B$ que tengan tamaños compatibles para el producto.

- **Propiedades** del **producto y la transpuesta**![Producto%20de%20Matrices/Untitled%206.png](Images/Producto%20de%20Matrices/Untitled%206.png)![Producto%20de%20Matrices/Untitled%207.png](Images/Producto%20de%20Matrices/Untitled%207.png)

- Definición de **potencia de matrices**
    La potencia de una matriz es una operación que se realiza elevando una matriz a un exponente entero no negativo. Formalmente, si $A$ es una matriz cuadrada de tamaño $n \times n$ y $k$ es un entero no negativo, entonces la potencia $k$ de $A$, denotada por $A^k$, es una matriz de tamaño $n \times n$ cuyos elementos se calculan como sigue:

$$A^k = \underbrace{A \cdot A \cdot A \cdot \cdots \cdot A}_{k \text{ veces}}$$


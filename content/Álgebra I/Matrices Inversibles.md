Course: [[Algebra I]]

- Definición de **matriz inversa**
    La matriz inversa de una matriz cuadrada $A$ de tamaño $n \times n$ es otra matriz cuadrada $A^{-1}$ de tamaño $n \times n$ tal que:
	1. $AA^{-1} = A^{-1}A = I_n$, donde $I_n$ es la matriz identidad de tamaño $n \times n$.
	2. $A^{-1}$ existe si y solo si el determinante de $A$ es distinto de cero.

## Teorema de unicidad de la matriz inversa
El teorema de unicidad de la inversa de una matriz establece que si una matriz cuadrada $A$ tiene una inversa, entonces esa inversa es única. En otras palabras, no puede haber dos matrices diferentes $B$ y $C$ que sean inversas de $A$.

La demostración de este teorema se basa en la definición de matriz inversa y en las propiedades de las operaciones matriciales. Si $B$ y $C$ son dos matrices diferentes que son inversas de $A$, entonces se cumple que:

$$AB = BA = I_n$$
$$AC = CA = I_n$$

Multiplicando la primera ecuación por $C$ por la derecha, se obtiene:

$$(AB)C = I_n C$$
$$A(BC) = C$$

Pero también se sabe que $AC = I_n$, por lo que se tiene:

$$A(BC) = AC$$
$$A(BC) = I_n$$

Por lo tanto, se tiene que $BC = I_n$. De manera similar, multiplicando la primera ecuación por $B$ por la derecha, se obtiene:

$$(AB)B^{-1} = I_n B^{-1}$$
$$A(BB^{-1}) = B^{-1}$$

Pero también se sabe que $AB = I_n$, por lo que se tiene:

$$A(BB^{-1}) = AB$$
$$A(BB^{-1}) = I_n$$

Por lo tanto, se tiene que $B^{-1} = A^{-1}$. Esto demuestra que si una matriz cuadrada $A$ tiene una inversa, entonces esa inversa es única.


- Propiedades de una matriz inversible![Matrices%20Inversibles/Untitled%204.png](Images/Matrices%20Inversibles/Untitled%204.png)

## Operaciones elementales de filas
- Intercambiar dos filas: Se puede intercambiar cualquier par de filas de la matriz. Esta operación se denota por $F_i \leftrightarrow F_j$, donde $F_i$ y $F_j$ son las filas que se intercambian.
- Multiplicar una fila por un escalar no nulo: Se puede multiplicar cualquier fila de la matriz por un escalar no nulo. Esta operación se denota por $kF_i$, donde $k$ es el escalar no nulo y $F_i$ es la fila que se multiplica.
- Sumar un múltiplo de una fila a otra fila: Se puede sumar un múltiplo de cualquier fila de la matriz a otra fila. Esta operación se denota por $F_i + kF_j$, donde $F_i$ es la fila a la que se le suma el múltiplo y $F_j$ es la fila que se multiplica por el escalar $k$.

- Definición de matriz elemental
	Una matriz elemental es una matriz que se obtiene a partir de la matriz identidad mediante la aplicación de una operación elemental de filas. Es decir, una matriz elemental es una matriz que se obtiene al realizar una sola operación elemental de filas en la matriz identidad.


- Teorema relación entre operaciones elementales y matrices elementales    ![Matrices%20Inversibles/Untitled%208.png](Images/Matrices%20Inversibles/Untitled%208.png)

- Definición de equivalencia por filas![Matrices%20Inversibles/Untitled%209.png](Images/Matrices%20Inversibles/Untitled%209.png)

- Teorema las matrices elementales son inversibles![Matrices%20Inversibles/Untitled%2010.png](Images/Matrices%20Inversibles/Untitled%2010.png)![Matrices%20Inversibles/Untitled%2011.png](Images/Matrices%20Inversibles/Untitled%2011.png)

- Definición de matriz escalon reducida por filas
	Una matriz escalonada reducida por filas es una matriz que cumple las siguientes condiciones:
	1. Todas las filas que contienen solo ceros están en la parte inferior de la matriz.
	2. En cada fila que no contiene solo ceros, el primer elemento no nulo (llamado pivote) es igual a uno.
	3. En cada columna que contiene un pivote, todos los demás elementos son cero.
	Además, en una matriz escalonada reducida por filas, los pivotes están situados en posiciones cada vez más a la derecha de la matriz. Es decir, si el pivote de la fila $i$ está en la columna $j$, entonces el pivote de la fila $i+1$ está en una columna mayor que $j$.


- Teorema equivalencia de las matrices reducidas por filas![Matrices%20Inversibles/Untitled%2013.png](Images/Matrices%20Inversibles/Untitled%2013.png)
- Definición de rango de una matriz![Matrices%20Inversibles/Untitled%2014.png](Images/Matrices%20Inversibles/Untitled%2014.png)

- Teorema 1er Teorema de las Equivalencias![Matrices%20Inversibles/Untitled%2015.png](Images/Matrices%20Inversibles/Untitled%2015.png)
- Algoritmo para determinar A-1![Matrices%20Inversibles/Untitled%2016.png](Images/Matrices%20Inversibles/Untitled%2016.png)
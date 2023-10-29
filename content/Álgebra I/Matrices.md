Course: [[Algebra I]]

### Temas relacionados
- [[Producto de Matrices]]
- [[Sistemas de ecuaciones lineales]]
- [[Determinantes]]
- [[Matrices Inversibles]]
- [[Diagonalizacion]]
- [[Espacios vectoriales]]


## Definición de **Matriz**
 Una matriz es una tabla rectangular de números, símbolos o expresiones matemáticas dispuestos en filas y columnas. Formalmente, una matriz $A$ de tamaño $m \times n$ es una colección ordenada de $m \cdot n$ elementos $a_{ij}$, donde $i$ es el índice de la fila y $j$ es el índice de la columna. Los elementos de la matriz pueden ser números reales, números complejos, variables simbólicas o cualquier otra expresión matemática.

La matriz $A$ se puede representar de la siguiente manera:

$$A = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{pmatrix}$$

donde $a_{ij}$ es el elemento de la fila $i$ y la columna $j$ de la matriz $A$. La matriz $A$ tiene $m$ filas y $n$ columnas, y se dice que es una matriz de tamaño $m \times n$. Si $m = n$, entonces la matriz se llama matriz cuadrada.

- Definición de **matriz cuadrada**
    - Aquella que tiene la misma cantidad de filas que de columnas

## Definición de **matrices particulares** (fila, columna, nula)
Una **matriz fila** es una matriz de tamaño $1 \times n$ que tiene una sola fila y $n$ columnas. Formalmente, una matriz fila $A$ se puede representar de la siguiente manera:

$$A = \begin{pmatrix} a_1 & a_2 & \cdots & a_n \end{pmatrix}$$

donde $a_1, a_2, ..., a_n$ son los elementos de la única fila de la matriz $A$. Las matrices fila se utilizan para representar vectores fila en álgebra lineal y se pueden utilizar para realizar operaciones como la suma de vectores y la multiplicación por escalares.

Una **matriz columna** es una matriz de tamaño $m \times 1$ que tiene una sola columna y $m$ filas. Formalmente, una matriz columna $B$ se puede representar de la siguiente manera:

$$B = \begin{pmatrix} b_1 \\ b_2 \\ \vdots \\ b_m \end{pmatrix}$$

donde $b_1, b_2, ..., b_m$ son los elementos de la única columna de la matriz $B$. Las matrices columna se utilizan para representar vectores columna en álgebra lineal y se pueden utilizar para realizar operaciones como la suma de vectores y la multiplicación por escalares.

Una **matriz nula** es una matriz en la que todos los elementos son cero. Formalmente, una matriz nula $C$ de tamaño $m \times n$ se puede representar de la siguiente manera:

$$C = \begin{pmatrix} 0 & 0 & \cdots & 0 \\ 0 & 0 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & 0 \end{pmatrix}$$

donde todos los elementos de la matriz $C$ son cero. Las matrices nulas se utilizan en álgebra lineal para representar el vector nulo y para realizar operaciones como la suma de matrices y la multiplicación por escalares.

- Definición de **igualdad** de matrices
    Dos matrices son iguales si y solo si tienen el mismo tamaño y sus elementos correspondientes son iguales. 
    Formalmente, si $A$ y $B$ son dos matrices de tamaño $m \times n$, entonces $A$ es igual a $B$ si y solo si se cumple que $a_{ij} = b_{ij}$ para todo $i = 1, 2, ..., m$ y todo $j = 1, 2, ..., n$.


- Definición de **suma** de matrices
    Si $A$ y $B$ son dos matrices de tamaño $m \times n$, entonces la suma de $A$ y $B$, denotada por $A+B$, es una matriz de tamaño $m \times n$ cuyos elementos se calculan como sigue: (A+B)ij=aij+bij(A+B)ij​=aij​+bij​ para todo $i = 1, 2, ..., m$ y todo $j = 1, 2, ..., n$. Es decir, el elemento $(i,j)$ de la matriz $A+B$ es la suma de los elementos $(i,j)$ de las matrices $A$ y $B$.
    
- **Propiedades** de la **suma** de matrices
    - **Conmutatividad:** La suma de matrices es conmutativa, es decir, $A+B = B+A$ para cualquier par de matrices $A$ y $B$ del mismo tamaño.
	- **Asociatividad:** La suma de matrices es asociativa, es decir, $(A+B)+C = A+(B+C)$ para cualquier terna de matrices $A$, $B$ y $C$ del mismo tamaño.
	- **Existencia de elemento neutro:** Existe una matriz $O$ de tamaño $m \times n$ tal que $A+O = A$ para cualquier matriz $A$ de tamaño $m \times n$. Esta matriz se llama matriz nula o matriz cero.
	- **Existencia de elemento opuesto:** Para cualquier matriz $A$ de tamaño $m \times n$, existe una matriz $-A$ de tamaño $m \times n$ tal que $A+(-A) = O$. Esta matriz se llama matriz opuesta o matriz negativa.
	- **Distributividad de la suma de matrices respecto a la multiplicación por escalares:** Para cualquier escalar $\alpha$ y cualquier par de matrices $A$ y $B$ del mismo tamaño, se cumple que $\alpha(A+B) = \alpha A + \alpha B$.

- Producto de un **escalar por una matriz**
    El producto de un escalar por una matriz es una operación que se realiza multiplicando cada elemento de la matriz por el escalar. Formalmente, si $\alpha$ es un escalar y $A$ es una matriz de tamaño $m \times n$, entonces el producto de $\alpha$ por $A$, denotado por $\alpha A$, es una matriz de tamaño $m \times n$ cuyos elementos se calculan como sigue: $$(\alpha A)_{ij} = \alpha a_{ij}$$	para todo $i = 1, 2, ..., m$ y todo $j = 1, 2, ..., n$. Es decir, el elemento $(i,j)$ de la matriz $\alpha A$ es el producto del escalar $\alpha$ por el elemento $(i,j)$ de la matriz $A$.

- **Propiedades** de las **operaciones** de matrices![Matrices/Untitled%208.png](Images/Matrices/Untitled%208.png)

- Definición de **matriz transpuesta**
    La matriz transpuesta de una matriz $A$ es una matriz que se obtiene intercambiando las filas por las columnas de $A$. Formalmente, si $A$ es una matriz de tamaño $m \times n$, entonces la matriz transpuesta de $A$, denotada por $A^T$, es una matriz de tamaño $n \times m$ cuyos elementos se calculan como sigue:$$(A^T)_{ij} = a_{ji}$$para todo $i = 1, 2, ..., n$ y todo $j = 1, 2, ..., m$. Es decir, el elemento $(i,j)$ de la matriz transpuesta $A^T$ es el elemento $(j,i)$ de la matriz $A$

- **Propiedades** de la matriz **transpuesta**![Matrices/Untitled%2010.png](Images/Matrices/Untitled%2010.png)

- Demostración de las propiedades de la matriz transpuesta
    ![Matrices/Untitled%2011.png](Images/Matrices/Untitled%2011.png)

- Definición de **matriz diagonal**
    Una matriz diagonal es una matriz cuadrada en la que todos los elementos fuera de la diagonal principal son cero. Formalmente, si $A$ es una matriz cuadrada de tamaño $n \times n$, entonces $A$ es una matriz diagonal si y solo si se cumple que $a_{ij} = 0$ para todo $i \neq j$. La diagonal principal de una matriz diagonal es la secuencia de elementos que van desde la esquina superior izquierda hasta la esquina inferior derecha de la matriz. Los elementos de la diagonal principal de una matriz diagonal se denominan elementos diagonales y se denotan por $a_{11}, a_{22}, ..., a_{nn}$.

- Definición de **matriz escalar**
    Una matriz escalar es una matriz cuadrada en la que todos los elementos de la diagonal principal son iguales y todos los demás elementos son cero. Formalmente, si $\alpha$ es un escalar y $n$ es un entero positivo, entonces la matriz escalar de tamaño $n \times n$ asociada a $\alpha$, denotada por $\alpha I_n$, es una matriz cuyos elementos se calculan como sigue:$$ (\alpha I_n)_{ij} = \begin{cases} \alpha & \text{si } i=j \\ 0 & \text{si } i \neq j \end{cases} $$para todo $i,j = 1, 2, ..., n$. Es decir, el elemento $(i,j)$ de la matriz $\alpha I_n$ es igual a $\alpha$ si $i=j$, y es igual a cero si $i \neq j$.


- Definición de **matriz identidad**
    La matriz identidad es una matriz cuadrada en la que todos los elementos de la diagonal principal son iguales a uno y todos los demás elementos son cero. Formalmente, si $n$ es un entero positivo, entonces la matriz identidad de tamaño $n \times n$, denotada por $I_n$, es una matriz cuyos elementos se calculan como sigue:$$ (I_n)_{ij} = \begin{cases} 1 & \text{si } i=j \\ 0 & \text{si } i \neq j \end{cases} $$para todo $i,j = 1, 2, ..., n$. Es decir, el elemento $(i,j)$ de la matriz identidad $I_n$ es igual a uno si $i=j$, y es igual a cero si $i \neq j$.

- Definición de **matriz diagonal superior e inferior**
    Una matriz diagonal superior es una matriz cuadrada en la que todos los elementos por debajo de la diagonal principal son cero. Formalmente, si $A$ es una matriz cuadrada de tamaño $n \times n$, entonces $A$ es una matriz diagonal superior si y solo si se cumple que $a_{ij} = 0$ para todo $i > j$. Por otro lado, una matriz diagonal inferior es una matriz cuadrada en la que todos los elementos por encima de la diagonal principal son cero. Formalmente, si $A$ es una matriz cuadrada de tamaño $n \times n$, entonces $A$ es una matriz diagonal inferior si y solo si se cumple que $a_{ij} = 0$ para todo $i < j$.

- Definición de **matriz simétrica y antisimétrica** 
	Una matriz simétrica es una matriz cuadrada en la que la entrada $a_{ij}$ es igual a la entrada $a_{ji}$ para todo $i$ y $j$. Es decir, la matriz es igual a su traspuesta. Formalmente, si $A$ es una matriz cuadrada de tamaño $n \times n$, entonces $A$ es una matriz simétrica si y solo si se cumple que $a_{ij} = a_{ji}$ para todo $i$ y $j$. Por otro lado, una matriz antisimétrica es una matriz cuadrada en la que la entrada $a_{ij}$ es igual a la entrada opuesta y negativa $-a_{ji}$ para todo $i$ y $j$. Es decir, la matriz es igual a la negación de su traspuesta. Formalmente, si $A$ es una matriz cuadrada de tamaño $n \times n$, entonces $A$ es una matriz antisimétrica si y solo si se cumple que $a_{ij} = -a_{ji}$ para todo $i$ y $j$.

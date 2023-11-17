Course: [[Algebra I]]

- Definición de **ecuación lineal**
    Una ecuación lineal es una ecuación algebraica que involucra variables lineales, es decir, variables que aparecen con exponente 1. Formalmente, una ecuación lineal en $n$ variables $x_1, x_2, \ldots, x_n$ tiene la forma:$$a_1 x_1 + a_2 x_2 + \cdots + a_n x_n = b$$donde $a_1, a_2, \ldots, a_n$ y $b$ son constantes reales o complejas, y $x_1, x_2, \ldots, x_n$ son las variables de la ecuación.
    La ecuación lineal se puede representar de forma matricial como $A\vec{x} = \vec{b}$, donde $A$ es una matriz de tamaño $m \times n$ que representa los coeficientes de las variables, $\vec{x}$ es un vector columna de tamaño $n$ que representa las variables y $\vec{b}$ es un vector columna de tamaño $m$ que representa los términos constantes.

- Definición de **sistema de ecuaciones**
	Un sistema de ecuaciones es un conjunto de dos o más ecuaciones que involucran las mismas variables. Formalmente, un sistema de ecuaciones en $n$ variables $x_1, x_2, \ldots, x_n$ tiene la forma:$$\begin{aligned} a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n &= b_1 \\ a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n &= b_2 \\ &\vdots \\ a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n &= b_m \end{aligned}$$donde $a_{ij}$ y $b_i$ son constantes reales o complejas, y $x_1, x_2, \ldots, x_n$ son las variables del sistema.
	El sistema de ecuaciones se puede representar de forma matricial como $A\vec{x} = \vec{b}$, donde $A$ es una matriz de tamaño $m \times n$ que representa los coeficientes de las variables, $\vec{x}$ es un vector columna de tamaño $n$ que representa las variables y $\vec{b}$ es un vector columna de tamaño $m$ que representa los términos constantes.


    
- Definición de sistema **inhomogéneo y homogéneo**
    - Un sistema de ecuaciones homogéneo tiene la forma $A\vec{x} = \vec{0}$, donde $\vec{0}$ es el vector nulo.
	- Un sistema de ecuaciones inhomogéneo tiene la forma $A\vec{x} = \vec{b}$, donde $\vec{b}$ es un vector no nulo.

- Definición de **solución del sistema**
    Una solución del sistema de ecuaciones $A\vec{x} = \vec{b}$ es un vector $\vec{x}$ que, al ser sustituido en las ecuaciones del sistema, hace que todas las ecuaciones sean verdaderas. En otras palabras, una solución del sistema de ecuaciones es un conjunto de valores para las variables que hacen que todas las ecuaciones del sistema sean verdaderas simultáneamente.![[Pasted image 20231029171913.png]]

- Definición de **conjunto solución**![Untitled](Images/Sistemas%20de%20ecuaciones%20lineales/Untitled%205.png)

- Definición de sistema **compatible e incompatible**    ![Untitled](Images/Sistemas%20de%20ecuaciones%20lineales/Untitled%206.png)

- Teorema los sistemas Homogéneos siempre tienen solución![[Pasted image 20231029171946.png]]

- Definición de **equivalencia** entre sistemas![Untitled](Images/Sistemas%20de%20ecuaciones%20lineales/Untitled%208.png)![Untitled](Images/Sistemas%20de%20ecuaciones%20lineales/Untitled%209.png)

- Algoritmo de **Gauss Jordan** para resolver un sistema lineal
	1. Escribir el sistema de ecuaciones en forma matricial $A\vec{x} = \vec{b}$.
	2. Ampliar la matriz $A$ con la columna de términos constantes $\vec{b}$ para formar la matriz aumentada $[A|\vec{b}]$.
	3. Realizar operaciones elementales por filas en la matriz aumentada para obtener una matriz escalonada por filas.
	4. Realizar operaciones elementales por filas adicionales para obtener una matriz escalonada reducida por filas.
	5. Escribir el sistema de ecuaciones correspondiente a la matriz escalonada reducida por filas.
	6. Resolver el sistema de ecuaciones obtenido en el paso anterior para obtener la solución del sistema original.

- Teorema **Rouché Frobenius**
    El teorema de Rouché-Frobenius establece condiciones necesarias y suficientes para que un sistema de ecuaciones lineales tenga solución. Formalmente, el teorema establece lo siguiente:
	- Un sistema de ecuaciones lineales $A\vec{x} = \vec{b}$ tiene solución si y solo si el rango de la matriz aumentada $[A|\vec{b}]$ es igual al rango de la matriz de coeficientes $A$. En otras palabras, el sistema de ecuaciones tiene solución si y solo si el número de ecuaciones linealmente independientes es igual al número de incógnitas.
	- Si el sistema de ecuaciones tiene solución, entonces tiene una única solución si y solo si el rango de la matriz aumentada es igual al número de incógnitas. Si el rango de la matriz aumentada es menor que el número de incógnitas, entonces el sistema de ecuaciones tiene múltiples soluciones.


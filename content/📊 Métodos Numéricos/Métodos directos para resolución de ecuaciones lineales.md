## Método de eliminación de Gauss

La eliminación de Gauss es un método para resolver sistemas de ecuaciones lineales. El objetivo es transformar el sistema original en otro equivalente que sea más fácil de resolver. El método consiste en aplicar una serie de operaciones elementales a las filas de la matriz de coeficientes del sistema hasta obtener una matriz triangular superior. Luego, se resuelve el sistema de ecuaciones resultante por sustitución hacia atrás.

A continuación se describen los pasos del método de eliminación de Gauss para resolver un sistema de ecuaciones lineales:

1. Escribir el sistema de ecuaciones en forma matricial, donde A es la matriz de coeficientes, x es el vector de incógnitas y b es el vector de términos independientes:

$$Ax=b$$

2. Aplicar operaciones elementales a las filas de la matriz A para obtener una matriz triangular superior. Las operaciones elementales permitidas son:

- Multiplicar una fila por una constante no nula.
- Sumar a una fila un múltiplo de otra fila.

El objetivo es obtener una matriz de la forma:

$$\begin{pmatrix} a_{11} & a_{12} & a_{13} & \cdots & a_{1n} \\ 0 & a_{22} & a_{23} & \cdots & a_{2n} \\ 0 & 0 & a_{33} & \cdots & a_{3n} \\ \vdots & \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & 0 & \cdots & a_{nn} \end{pmatrix}$$

3. Resolver el sistema de ecuaciones resultante por sustitución hacia atrás. Es decir, despejar las incógnitas empezando por la última y sustituyendo en las ecuaciones anteriores.

## Método de Gauss-Jordan

El método de Gauss-Jordan es una variante del método de eliminación de Gauss para resolver sistemas de ecuaciones lineales. La principal diferencia es que el método de Gauss-Jordan busca transformar la matriz de coeficientes en la matriz identidad, lo que facilita la resolución del sistema de ecuaciones. El método consiste en aplicar una serie de operaciones elementales a la matriz aumentada hasta obtener una matriz en forma escalonada reducida.

A continuación se describen los pasos del método de Gauss-Jordan:

1. Escribir el sistema de ecuaciones en forma matricial aumentada, donde la última columna representa los términos independientes:

$$\left[\begin{array}{cccc|c} a_{11} & a_{12} & \cdots & a_{1n} & b_1 \\ a_{21} & a_{22} & \cdots & a_{2n} & b_2 \\ \vdots & \vdots & \ddots & \vdots & \vdots \\ a_{n1} & a_{n2} & \cdots & a_{nn} & b_n \end{array}\right]$$

2. Aplicar operaciones elementales a la matriz aumentada para obtener una matriz en forma escalonada reducida. Las operaciones elementales permitidas son:

- Multiplicar una fila por una constante no nula.
- Sumar a una fila un múltiplo de otra fila.
- Intercambiar dos filas.

El objetivo es obtener una matriz de la forma:

$$\left[\begin{array}{cccc|c} 1 & 0 & \cdots & 0 & c_1 \\ 0 & 1 & \cdots & 0 & c_2 \\ \vdots & \vdots & \ddots & \vdots & \vdots \\ 0 & 0 & \cdots & 1 & c_n \end{array}\right]$$

3. Resolver el sistema de ecuaciones leyendo las soluciones de la matriz en forma escalonada reducida.

Si una fila de la matriz aumentada corresponde a una ecuación de la forma $0x_1 + 0x_2 + \cdots + 0x_n = c$, donde $c$ es distinto de cero, entonces el sistema de ecuaciones es inconsistente y no tiene solución.


## Factorización o Descomposición LU

La factorización o descomposición LU es un método para resolver sistemas de ecuaciones lineales. El método consiste en descomponer la matriz de coeficientes del sistema en el producto de dos matrices, una matriz triangular inferior y una matriz triangular superior. La ventaja de este método es que una vez que se ha realizado la descomposición, se pueden resolver sistemas de ecuaciones con la misma matriz de coeficientes de manera más eficiente.

A continuación se describen los pasos del método de factorización LU:

1. Escribir el sistema de ecuaciones en forma matricial, donde A es la matriz de coeficientes, x es el vector de incógnitas y b es el vector de términos independientes:

$$Ax=b$$

2. Descomponer la matriz de coeficientes A en el producto de dos matrices, L y U, donde L es una matriz triangular inferior con unos en la diagonal y U es una matriz triangular superior:

$$A=LU$$

3. Resolver el sistema de ecuaciones Ax=b mediante la sustitución hacia adelante y hacia atrás utilizando las matrices L y U.

La descomposición LU se puede realizar utilizando el método de eliminación de Gauss con pivoteo parcial. Los pasos son los siguientes:

1. Escribir el sistema de ecuaciones en forma matricial aumentada, donde la última columna representa los términos independientes:

$$\left[\begin{array}{cccc} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{n1} & a_{n2} & \cdots & a_{nn} \end{array}\right]\left[\begin{array}{c} x_1 \\ x_2 \\ \vdots \\ x_n \end{array}\right]=\left[\begin{array}{c} b_1 \\ b_2 \\ \vdots \\ b_n \end{array}\right]$$

2. Aplicar el método de eliminación de Gauss con pivoteo parcial para obtener una matriz triangular superior U y una matriz L triangular inferior con unos en la diagonal. Durante el proceso, se deben realizar las mismas operaciones elementales en la matriz aumentada y en la matriz L.

3. Escribir la matriz de coeficientes A como el producto de las matrices L y U:

$$A=LU$$

4. Resolver el sistema de ecuaciones Ax=b mediante la sustitución hacia adelante y hacia atrás utilizando las matrices L y U.

A continuación se muestra un ejemplo de aplicación del método de factorización LU para resolver un sistema de ecuaciones lineales:

$$\begin{cases} 2x+y+z=5 \\ 4x+6y+2z=18 \\ -2x+7y+2z=7 \end{cases}$$

1. Escribir el sistema de ecuaciones en forma matricial:

$$\left[\begin{array}{ccc} 2 & 1 & 1 \\ 4 & 6 & 2 \\ -2 & 7 & 2 \end{array}\right]\left[\begin{array}{c} x \\ y \\ z \end{array}\right]=\left[\begin{array}{c} 5 \\ 18 \\ 7 \end{array}\right]$$

2. Aplicar el método de eliminación de Gauss con pivoteo parcial para obtener una matriz triangular superior U y una matriz L triangular inferior con unos en la diagonal:

$$\left[\begin{array}{ccc} 2 & 1 & 1 \\ 0 & 4 & 0 \\ 0 & 0 & \frac{3}{2} \end{array}\right]\left[\begin{array}{c} x \\ y \\ z \end{array}\right]=\left[\begin{array}{c} 5 \\ 8 \\ \frac{27}{2} \end{array}\right]$$

$$L=\left[\begin{array}{ccc} 1 & 0 & 0 \\ 2 & 1 & 0 \\ -1 & \frac{5}{4} & 1 \end{array}\right]$$

3. Escribir la matriz de coeficientes A como el producto de las matrices L y U:

$$A=LU=\left[\begin{array}{ccc} 2 & 1 & 1 \\ 4 & 6 & 2 \\ -2 & 7 & 2 \end{array}\right]=\left[\begin{array}{ccc} 1 & 0 & 0 \\ 2 & 1 & 0 \\ -1 & \frac{5}{4} & 1 \end{array}\right]\left[\begin{array}{ccc} 2 & 1 & 1 \\ 0 & 4 & 0 \\ 0 & 0 & \frac{3}{2} \end{array}\right]$$

4. Resolver el sistema de ecuaciones Ax=b mediante la sustitución hacia adelante y hacia atrás utilizando las matrices L y U:

$$\begin{cases} Ly=b \\ Ux=y \end{cases}$$

$$\begin{cases} y_1=5 \\ 2y_1+y_2=18 \\ -y_1+\frac{5}{4}y_2+y_3=7 \end{cases}$$

$$\begin{cases} x_3=3 \\ 4x_2=8 \\ 2x_1+x_2+x_3=5 \end{cases}$$

Por lo tanto, la solución del sistema de ecuaciones es:

$$\begin{pmatrix} x \\ y \\ z \end{pmatrix} = \begin{pmatrix} -3 \\ 2 \\ 9 \end{pmatrix}$$
## Método de la matriz inversa

El método de la inversa es una técnica para resolver sistemas de ecuaciones lineales utilizando la matriz inversa. La matriz inversa es una matriz que, multiplicada por la matriz de coeficientes del sistema, produce la matriz identidad. Si la matriz de coeficientes es invertible, entonces se puede utilizar la matriz inversa para resolver el sistema de ecuaciones.

A continuación se describen los pasos del método de la inversa para resolver un sistema de ecuaciones lineales:

1. Escribir el sistema de ecuaciones en forma matricial, donde A es la matriz de coeficientes, x es el vector de incógnitas y b es el vector de términos independientes:

$$Ax=b$$

2. Verificar si la matriz de coeficientes A es invertible. Una matriz es invertible si su determinante es distinto de cero:

$$\det(A) \neq 0$$

3. Si la matriz A es invertible, calcular su matriz inversa A^-1:

$$A^{-1}A=AA^{-1}=I$$

4. Multiplicar ambos lados de la ecuación Ax=b por la matriz inversa A^-1:

$$A^{-1}Ax=A^{-1}b$$

5. Simplificar la expresión utilizando la propiedad de la matriz identidad:

$$Ix=A^{-1}b$$

6. Resolver la ecuación para obtener el vector de incógnitas x:

$$x=A^{-1}b$$

A continuación se muestra un ejemplo de aplicación del método de la inversa para resolver un sistema de ecuaciones lineales:

$$\begin{cases} 2x+y-z=8 \\ -3x-y+2z=-11 \\ -2x+y+2z=-3 \end{cases}$$

1. Escribir el sistema de ecuaciones en forma matricial:

$$\left[\begin{array}{ccc} 2 & 1 & -1 \\ -3 & -1 & 2 \\ -2 & 1 & 2 \end{array}\right]\left[\begin{array}{c} x \\ y \\ z \end{array}\right]=\left[\begin{array}{c} 8 \\ -11 \\ -3 \end{array}\right]$$

2. Verificar si la matriz de coeficientes A es invertible. Calcular su determinante:

$$\det(A)=\left|\begin{array}{ccc} 2 & 1 & -1 \\ -3 & -1 & 2 \\ -2 & 1 & 2 \end{array}\right|=0$$

Como el determinante es cero, la matriz A no es invertible y el sistema de ecuaciones no tiene solución única.


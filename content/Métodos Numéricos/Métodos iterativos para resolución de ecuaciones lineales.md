# Métodos iterativos para resolución de ecuaciones lineales

%%
Date:: [[2023-11-01]]
Course:: [[Métodos Numéricos]]
Source:: [[U6 - MN]]
%%

Los métodos iterativos son un conjunto de técnicas utilizadas para resolver sistemas de ecuaciones lineales. A diferencia de los métodos directos, que encuentran la solución exacta en un número finito de pasos, **los métodos iterativos comienzan con una estimación inicial y mejoran gradualmente la solución a través de un proceso iterativo**. Cada iteración implica una serie de cálculos que refinan la solución hasta que se alcanza una precisión deseada. Los métodos iterativos son útiles para sistemas grandes y dispersos, ya que pueden ser más eficientes que los métodos directos en términos de tiempo y memoria requeridos para la solución. Algunos ejemplos de métodos iterativos incluyen el método de Jacobi, el método de Gauss-Seidel y el método de Gradiente Conjugado

--- 
## Método de Jacobi

El método de Jacobi es un método iterativo utilizado para resolver sistemas de ecuaciones lineales. Este método se basa en la descomposición de la matriz de coeficientes A en una suma de tres matrices: una matriz diagonal D que contiene los elementos diagonales de A, una matriz triangular inferior L que contiene los elementos debajo de la diagonal de A, y una matriz triangular superior U que contiene los elementos por encima de la diagonal de A. La matriz A se puede escribir como:

$$A = D + L + U$$

Para resolver el sistema de ecuaciones lineales Ax = b, el método de Jacobi comienza con una estimación inicial x^(0) y utiliza la siguiente fórmula iterativa para calcular la solución en la iteración k+1:

$$x^{(k+1)} = -D^{-1}(L+U)x^{(k)} + D^{-1}b$$


donde $D^{-1}$ es la inversa de la matriz diagonal D.

$$x_i^{(k+1)} = -\frac{1}{a_{ii}}\sum_{j=1}^{i-1}a_{ij}x_j^{(k)} + \frac{b_i}{a_{ii}}$$


El método de Jacobi converge si la matriz A es diagonalmente dominante o si es simétrica y definida positiva. La convergencia se puede verificar calculando el radio espectral de la matriz de iteración:

$$\rho(-D^{-1}(L+U)) < 1$$

donde \rho es el radio espectral de la matriz.

### Ejemplo

Consideremos el siguiente sistema de ecuaciones lineales:

$$\begin{cases} 3x_1 + 2x_2 - x_3 = 1 \\ 2x_1 - 2x_2 + 4x_3 = -2 \\ -x_1 + \frac{1}{2}x_2 - x_3 = 0 \end{cases}$$

Podemos escribir la matriz de coeficientes A y el vector de términos independientes b como:

$$A = \begin{bmatrix} 3 & 2 & -1 \\ 2 & -2 & 4 \\ -1 & \frac{1}{2} & -1 \end{bmatrix}, \quad b = \begin{bmatrix} 1 \\ -2 \\ 0 \end{bmatrix}$$

Para aplicar el método de Jacobi, primero descomponemos la matriz A en D, L y U:

$$D = \begin{bmatrix} 3 & 0 & 0 \\ 0 & -2 & 0 \\ 0 & 0 & -1 \end{bmatrix}, \quad L = \begin{bmatrix} 0 & 0 & 0 \\ -2 & 0 & 0 \\ 1 & -\frac{1}{2} & 0 \end{bmatrix}, \quad U = \begin{bmatrix} 0 & -2 & 1 \\ 0 & 0 & -4 \\ 0 & 0 & 0 \end{bmatrix}$$

Luego, elegimos una estimación inicial y aplicamos la fórmula iterativa para obtener la solución en la iteración k+1:

$$x^{(1)} = -D^{-1}(L+U)x^{(0)} + D^{-1}b = \begin{bmatrix} \frac{1}{3} \\ 1 \\ 0 \end{bmatrix}$$

Continuamos iterando hasta que se alcance la precisión deseada. En este caso, después de 5 iteraciones, obtenemos la solución x = \[0.999, -0.999, -0.499\]^T, que es la solución exacta del sistema de ecuaciones lineales.


## Método iterativo de Gauss-Seidel

El método iterativo de Gauss-Seidel es un método utilizado para resolver sistemas de ecuaciones lineales. Este método es similar al método de Jacobi, pero utiliza una estimación actualizada de la solución en cada iteración. 

Para resolver el sistema de ecuaciones lineales Ax = b, el método de Gauss-Seidel comienza con una estimación inicial x^(0) y utiliza la siguiente fórmula iterativa para calcular la solución en la iteración k+1:

$$x_i^{(k+1)} = \frac{1}{a_{ii}}\left(b_i - \sum_{j=1}^{i-1}a_{ij}x_j^{(k+1)} - \sum_{j=i+1}^{n}a_{ij}x_j^{(k)}\right)$$

donde $i = 1, 2, ..., n$ y $n$ es el número de ecuaciones en el sistema. Esta fórmula actualiza la solución para cada variable $x_i$ utilizando los valores actualizados de las variables $x_1, x_2, ..., x_{i-1}$ y los valores antiguos de las variables $x_{i+1}, x_{i+2}, ..., x_n$.


### Ejemplo

Consideremos el siguiente sistema de ecuaciones lineales:

$$\begin{cases} 3x_1 + 2x_2 - x_3 = 1 \\ 2x_1 - 2x_2 + 4x_3 = -2 \\ -x_1 + \frac{1}{2}x_2 - x_3 = 0 \end{cases}$$

Podemos escribir la matriz de coeficientes A y el vector de términos independientes b como:

$$A = \begin{bmatrix} 3 & 2 & -1 \\ 2 & -2 & 4 \\ -1 & \frac{1}{2} & -1 \end{bmatrix}, \quad b = \begin{bmatrix} 1 \\ -2 \\ 0 \end{bmatrix}$$

Para aplicar el método de Gauss-Seidel, primero descomponemos la matriz A en L y U:

$$L = \begin{bmatrix} 3 & 0 & 0 \\ 2 & -2 & 0 \\ -1 & \frac{1}{2} & -1 \end{bmatrix}, \quad U = \begin{bmatrix} 0 & 2 & -1 \\ 0 & 0 & 4 \\ 0 & 0 & 0 \end{bmatrix}$$

Luego, elegimos una estimación inicial x^(0) = ^T y aplicamos la fórmula iterativa para obtener la solución en la iteración k+1:

$$x_1^{(1)} = \frac{1}{3}(1 - 2x_2^{(0)} + x_3^{(0)}) \approx 0.333$$
$$x_2^{(1)} = \frac{1}{-2}(2x_1^{(1)} + 4x_3^{(0)} + 2) \approx -1.167$$
$$x_3^{(1)} = \frac{1}{-1}(-x_1^{(1)} + \frac{1}{2}x_2^{(1)}) \approx -0.5$$

Continuamos iterando hasta que se alcance la precisión deseada. En este caso, después de 5 iteraciones, obtenemos la solución x=\[0.999, -0.999, -0.499\]^T, que es la solución exacta del sistema de ecuaciones lineales.

## Errores de los métodos
Para calcular el error absoluto y porcentual en el método de Jacobi y Gauss-Seidel, se puede utilizar la siguiente fórmula:

- Error absoluto = $||x^{(k+1)} - x^{(k)}||$

donde x^(k+1) es la solución en la iteración k+1 y x^(k) es la solución en la iteración k.

El error absoluto mide la diferencia entre dos soluciones consecutivas y se expresa en las mismas unidades que la solución. Cuanto menor sea el error absoluto, más cercana será la solución a la solución exacta.

Para calcular el error porcentual, se puede utilizar la siguiente fórmula:

- Error porcentual = $\dfrac{||x^{(k+1)} - x^{(k)}||}{||x^{(k)||}}\times 100$

donde $||x^{(k+1)}||$ es la norma de la solución en la iteración k+1.

El error porcentual mide el error relativo entre dos soluciones consecutivas y se expresa en porcentaje. Cuanto menor sea el error porcentual, más cercana será la solución a la solución exacta.


# Método Spline

%%
Date:: [[2023-09-13]]
Course:: [[Métodos Numéricos]]
Source:: [[]]
%%

## Interpolación

- Generalmente no sabemos la función en el contexto de un experimento, tenemos datos (o puntos en el espacio).
- Aproximar una función a partir de los puntos obtenidos

## Spline

- El método spline es una técnica utilizada para aproximar una curva suave a partir de un conjunto de puntos discretos. 
- Se trata de una interpolación polinómica que **utiliza funciones polinómicas de bajo grado para unir los puntos de la curva.** El método spline se utiliza comúnmente en gráficos por computadora y en análisis numérico. 
- La idea principal es dividir la curva en segmentos y encontrar un polinomio para cada segmento. Los polinomios se unen en los puntos de división para formar una curva suave.
- El método spline se puede clasificar en dos tipos: spline natural y spline sujeto a condiciones. 
	- El spline natural se utiliza cuando no se tienen condiciones adicionales en los extremos de la curva, 
	- mientras que el spline sujeto a condiciones se utiliza cuando se tienen condiciones adicionales en los extremos de la curva. 
- El método spline es una técnica muy útil para aproximar curvas suaves a partir de puntos discretos y se utiliza en muchas aplicaciones de gráficos por computadora y análisis numérico. 

La fórmula general para el método spline es la siguiente:

$$S(x) = \begin{cases} S_1(x) & x_0 \leq x \leq x_1 \\ S_2(x) & x_1 \leq x \leq x_2 \\ \vdots & \vdots \\ S_{n-1}(x) & x_{n-2} \leq x \leq x_{n-1} \\ S_n(x) & x_{n-1} \leq x \leq x_n \end{cases}$$

Donde $S(x)$ es la función spline, $S_i(x)$ es el polinomio que aproxima la curva en el segmento $i$, y $x_0, x_1, \dots, x_n$ son los puntos discretos de la curva.

## Tipos de spline

![[Pasted image 20230913162640.png | center | 400]]

- El tipo de polinomio viene dado por el polinomio de mayor grado, y por las condiciones de regularidad.

Existen tres tipos de splines que se utilizan comúnmente para aproximar una curva suave a partir de un conjunto de puntos discretos. A continuación, se describen cada uno de ellos:

1. **Spline lineal:** Este es el caso más sencillo de spline. En él, se interpola una función f(x) de la que se dan un número N de pares por los que tendrá que pasar nuestra función polinómica. Las funciones son lineales, es decir, con grado 1. La fórmula general para el spline lineal es la siguiente:

$$S(x) = \begin{cases} y_0 + \frac{y_1 - y_0}{x_1 - x_0}(x - x_0) & x_0 \leq x \leq x_1 \\ y_1 + \frac{y_2 - y_1}{x_2 - x_1}(x - x_1) & x_1 \leq x \leq x_2 \\ \vdots & \vdots \\ y_{n-1} + \frac{y_n - y_{n-1}}{x_n - x_{n-1}}(x - x_{n-1}) & x_{n-1} \leq x \leq x_n \end{cases}$$

Donde $S(x)$ es la función spline lineal, $x_0, x_1, \dots, x_n$ son los puntos discretos de la curva, y $y_0, y_1, \dots, y_n$ son los valores de la función en los puntos discretos.

- La principal desventaja del spline lineal es que <mark style="background: #FFF3A3A6;">las curvas no son suaves!!</mark>

2. **Spline cuadrático**: En este caso, se utilizan polinomios de segundo grado para unir los puntos de la curva. La fórmula general para el spline cuadrático es la siguiente:

$$S(x) = \begin{cases} a_0 + b_0(x - x_0) + c_0(x - x_0)^2 & x_0 \leq x \leq x_1 \\ a_1 + b_1(x - x_1) + c_1(x - x_1)^2 & x_1 \leq x \leq x_2 \\ \vdots & \vdots \\ a_{n-1} + b_{n-1}(x - x_{n-1}) + c_{n-1}(x - x_{n-1})^2 & x_{n-1} \leq x \leq x_n \end{cases}$$

Donde $S(x)$ es la función spline cuadrático, $x_0, x_1, \dots, x_n$ son los puntos discretos de la curva, y $a_i, b_i, c_i$ son los coeficientes del polinomio de segundo grado que aproxima la curva en el segmento $i$.

3. **Spline cúbico:** Este es el tipo de spline más utilizado. En este caso, se utilizan polinomios de tercer grado para unir los puntos de la curva. La fórmula general para el spline cúbico es la siguiente:

$$S(x) = \begin{cases} a_0 + b_0(x - x_0) + c_0(x - x_0)^2 + d_0(x - x_0)^3 & x_0 \leq x \leq x_1 \\ a_1 + b_1(x - x_1) + c_1(x - x_1)^2 + d_1(x - x_1)^3 & x_1 \leq x \leq x_2 \\ \vdots & \vdots \\ a_{n-1} + b_{n-1}(x - x_{n-1}) + c_{n-1}(x - x_{n-1})^2 + d_{n-1}(x - x_{n-1})^3 & x_{n-1} \leq x \leq x_n \end{cases}$$

Donde $S(x)$ es la función spline cúbico, $x_0, x_1, \dots, x_n$ son los puntos discretos de la curva, y $a_i, b_i, c_i, d_i$ son los coeficientes del polinomio de tercer grado que aproxima la curva en el segmento $i$.


### Condiciones de un spline cúbico

- **Condición de interpolación:** El spline debe pasar por cada uno de los puntos discretos de la curva. Esto se puede expresar como:
$$S_i(x_i) = y_i$$
Donde $S_i(x)$ es el polinomio cúbico que aproxima la curva en el segmento $i$, y $y_i$ es el valor de la función en el punto $x_i$.

- **Condición de continuidad:** El spline debe ser continuo en todo el intervalo. Esto se puede expresar como:
$$S_{i-1}(x_i) = S_i(x_i)$$
Donde $S_{i-1}(x)$ es el polinomio cúbico que aproxima la curva en el segmento anterior al segmento $i$, y $S_i(x)$ es el polinomio cúbico que aproxima la curva en el segmento $i$.

- **Condición de la primera derivada:** La primera derivada del spline debe ser continua en todo el intervalo. Esto se puede expresar como:
$$S'_{i-1}(x_i) = S'_i(x_i)$$
Donde $S'_{i-1}(x)$ es la primera derivada del polinomio cúbico que aproxima la curva en el segmento anterior al segmento $i$, y $S'_i(x)$ es la primera derivada del polinomio cúbico que aproxima la curva en el segmento $i$.

- **Condición de la segunda derivada:** La segunda derivada del spline debe ser continua en todo el intervalo. Esto se puede expresar como:
$$S''_{i-1}(x_i) = S''_i(x_i)$$
Donde $S''_{i-1}(x)$ es la segunda derivada del polinomio cúbico que aproxima la curva en el segmento anterior al segmento $i$, y $S''_i(x)$ es la segunda derivada del polinomio cúbico que aproxima la curva en el segmento $i$.

![[Pasted image 20230913170605.png | center | 600]]
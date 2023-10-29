# Polinomio de Newton

%%
Date:: [[2023-09-06]]
Course:: [[Métodos Numéricos]]
Source:: [[Interpolación Polinomial]]
%%

Los polinomios de Newton son una herramienta matemática utilizada para aproximar una función en un punto específico mediante una serie de términos polinómicos. Esta aproximación se logra mediante la interpolación de la función en un conjunto de puntos conocidos. La fórmula general para el polinomio de Newton de una función f(x) en un conjunto de puntos x0, x1, ..., xn es:

$$
P_n(x) = f[x_0] + f[x_0,x_1](x-x_0) + f[x_0,x_1,x_2](x-x_0)(x-x_1) + \cdots + f[x_0,x_1,\ldots,x_n](x-x_0)(x-x_1)\cdots(x-x_{n-1})
$$

donde f\[x0\] representa el valor de la función en el punto x0, f\[x0,x1] representa la diferencia dividida de la función entre los puntos x0 y x1, f\[x0,x1,x2] representa la diferencia dividida de la función entre los puntos x0, x1 y x2, y así sucesivamente hasta la n-ésima diferencia dividida de la función entre los puntos x0, x1, ..., xn.

Los polinomios de Newton son útiles porque permiten aproximar funciones en un conjunto de puntos conocidos, lo que puede ser útil en problemas de interpolación y ajuste de curvas. Además, la fórmula del polinomio de Newton es más fácil de calcular que la fórmula del polinomio de Taylor, ya que solo requiere el cálculo de las diferencias divididas de la función en el conjunto de puntos conocidos.

En resumen, los polinomios de Newton son una herramienta matemática utilizada para aproximar una función en un conjunto de puntos conocidos mediante una serie de términos polinómicos. La fórmula general para el polinomio de Newton de una función f(x) en un conjunto de puntos x0, x1, ..., xn se puede expresar como:

$$
P_n(x) = f[x_0] + f[x_0,x_1](x-x_0) + f[x_0,x_1,x_2](x-x_0)(x-x_1) + \cdots + f[x_0,x_1,\ldots,x_n](x-x_0)(x-x_1)\cdots(x-x_{n-1})
$$

## Aproximación por polinomio de Newton

Para aproximar una función utilizando polinomios de Newton, se pueden seguir los siguientes pasos:

1. Seleccionar la función a aproximar y el conjunto de puntos conocidos en los que se quiere hacer la interpolación.

2. Calcular las diferencias divididas de la función en el conjunto de puntos conocidos. La primera diferencia dividida se calcula como:

$$
f[x_i,x_{i+1}] = \frac{f(x_{i+1}) - f(x_i)}{x_{i+1} - x_i}
$$

y las diferencias divididas de orden superior se calculan recursivamente como:

$$
f[x_i,x_{i+1},\ldots,x_{i+k}] = \frac{f[x_{i+1},\ldots,x_{i+k}] - f[x_i,\ldots,x_{i+k-1}]}{x_{i+k} - x_i}
$$

donde f\[xi,xi+1,...,xi+k] representa la k-ésima diferencia dividida de la función entre los puntos xi, xi+1, ..., xi+k.

3. Escribir la fórmula general del polinomio de Newton para la función y. el conjunto de puntos conocidos seleccionados:

$$
P_n(x) = f[x_0] + f[x_0,x_1](x-x_0)  + \cdots + f[x_0,x_1,\ldots,x_n](x-x_0)(x-x_1)\cdots(x-x_{n-1})
$$

4. Evaluar cada término del polinomio de Newton en el punto de interés x.

5. Sumar los términos evaluados para obtener la aproximación de la función en el punto de interés:

$$
f(x) \approx P_n(x)
$$

6. Si se desea una mayor precisión en la aproximación, se puede aumentar el número de puntos conocidos y repetir los pasos anteriores.

Es importante tener en cuenta que la aproximación solo es válida en el intervalo definido por los puntos conocidos, y que la precisión de la aproximación aumenta a medida que se aumenta el número de puntos conocidos y se utiliza un polinomio de mayor grado.

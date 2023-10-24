# Polinomio de Lagrange

%%
Date:: [[2023-09-06]]
Course:: [[Métodos Numéricos]]
Source:: [[Interpolación Polinomial]]
%%

Los polinomios de Lagrange son una herramienta matemática utilizada para aproximar una función en un conjunto de puntos conocidos mediante una serie de términos polinómicos. Esta aproximación se logra mediante la interpolación de la función en el conjunto de puntos conocidos. La fórmula general para el polinomio de Lagrange de una función f(x) en un conjunto de puntos x0, x1, ..., xn es:

$$
P_n(x) = \sum_{i=0}^n f(x_i) \prod_{j \neq i} \frac{x-x_j}{x_i-x_j}
$$

donde f(xi) representa el valor de la función en el punto xi, y el producto representa el término de Lagrange correspondiente al punto xi.

Los polinomios de Lagrange son útiles porque permiten aproximar funciones en un conjunto de puntos conocidos, lo que puede ser útil en problemas de interpolación y ajuste de curvas. Además, la fórmula del polinomio de Lagrange es más fácil de calcular que la fórmula del polinomio de Newton, ya que solo requiere el cálculo de los términos de Lagrange correspondientes a cada punto conocido.

## Aproximación por polinomio de Lagrange

Supongamos que queremos aproximar la función f(x) = x^2 en los puntos (-1, 1), (0, 0) y (1, 1). Para ello, podemos seguir los siguientes pasos:

1. Escribir la fórmula general del polinomio de Lagrange para la función y el conjunto de puntos conocidos seleccionados:

$$
P_2(x) = f(-1) \frac{(x-0)(x-1)}{(-1-0)(-1-1)} + f(0) \frac{(x+1)(x-1)}{(0+1)(0-1)} + f(1) \frac{(x+1)(x-0)}{(1+1)(1-0)}
$$

2. Evaluar cada término del polinomio de Lagrange en el punto de interés x. Por ejemplo, si queremos aproximar f(0.5), entonces:

$$
P_2(0.5) = f(-1) \frac{(0.5-0)(0.5-1)}{(-1-0)(-1-1)} + f(0) \frac{(0.5+1)(0.5-1)}{(0+1)(0-1)} + f(1) \frac{(0.5+1)(0.5-0)}{(1+1)(1-0)} \\
= 1 \cdot \frac{(0.5-0)(0.5-1)}{(-1-0)(-1-1)} + 0 \cdot \frac{(0.5+1)(0.5-1)}{(0+1)(0-1)} + 1 \cdot \frac{(0.5+1)(0.5-0)}{(1+1)(1-0)} \\
= -0.125 + 0 + 0.375 \\
= 0.25
$$

Por lo tanto, la aproximación de f(0.5) utilizando un polinomio de Lagrange de grado 2 y los puntos (-1, 1), (0, 0) y (1, 1) es 0.25.

3. Si se desea, se pueden repetir los pasos anteriores para aproximar la función en otros puntos de interés o con un polinomio de mayor grado para obtener una mayor precisión en la aproximación.

En resumen, para aproximar una función utilizando polinomios de Lagrange con tres pares de puntos conocidos, se debe escribir la fórmula general del polinomio de Lagrange para la función y los puntos conocidos, evaluar cada término del polinomio en el punto de interés, y sumar los términos evaluados para obtener la aproximación de la función en el punto de interés.

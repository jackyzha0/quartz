## Aproximación por mínimos cuadrados
El objetivo de la aproximación por mínimos cuadrados es encontrar una función que minimice la siguiente expresión:

$$
\sum_{i=1}^{n}(y_i - f(x_i))^2
$$
Donde:
- $y_i$ es el valor real de la variable dependiente en el punto $x_i$.
- $f(x_i)$ es el valor predicho por la función en el punto $x_i$

Para encontrar la función que minimice esta expresión, se toma la derivada de la expresión con respecto a los coeficientes de la función y se iguala a cero. Esto da lugar a un sistema de ecuaciones lineales que se puede resolver para obtener los coeficientes de la función de aproximación.

## Ajuste de una recta por mínimos cuadrados
Para realizar el ajuste de una línea recta por mínimos cuadrados, se pueden seguir los siguientes pasos:
1. Obtener un conjunto de datos bidimensionales (x,y) que se desea ajustar a una línea recta.
2. Calcular la media de los valores de x y de y:
$$
\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i
$$
$$
\bar{y} = \frac{1}{n} \sum_{i=1}^{n} y_i
$$
Donde n es el número de puntos en el conjunto de datos.
3. Calcular la covarianza y la varianza de los valores de x e y:
$$
s_{xy} = \frac{1}{n} \sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y})
$$
$$
s_{x}^2 = \frac{1}{n} \sum_{i=1}^{n} (x_i - \bar{x})^2
$$
$$
s_{y}^2 = \frac{1}{n} \sum_{i=1}^{n} (y_i - \bar{y})^2
$$
4. Calcular la pendiente m y la ordenada al origen b de la línea recta de ajuste mediante las siguientes fórmulas:
$$
m = \frac{s_{xy}}{s_{x}^2}
$$
$$
b = \bar{y} - m\bar{x}
$$
5. Escribir la ecuación de la línea recta de ajuste:
$$
y = mx + b
$$
6. Graficar los puntos de datos y la línea recta de ajuste para visualizar la calidad del ajuste.

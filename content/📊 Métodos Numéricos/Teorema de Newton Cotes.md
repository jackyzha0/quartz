## Teorema de Newton Cotes

El teorema de Newton-Cotes es un conjunto de fórmulas de integración numérica que se basan en la aproximación de la función a integrar por un polinomio de grado n, y la evaluación de este polinomio en puntos equidistantes dentro del intervalo de integración. Las fórmulas de Newton-Cotes se dividen en dos tipos: cerradas y abiertas. Las fórmulas cerradas toman los extremos del intervalo, mientras que las fórmulas abiertas no lo hacen. Las fórmulas más comunes son la regla del trapecio, la regla de Simpson y la regla de Simpson 3/8. La regla del trapecio se basa en la aproximación de la función por una recta, mientras que la regla de Simpson se basa en la aproximación por un polinomio de segundo grado. La regla de Simpson 3/8 se basa en la aproximación por un polinomio de tercer grado. 

$$\int_{a}^{b}f(x)dx \approx \frac{b-a}{2}[f(a)+f(b)]$$

$$\int_{a}^{b}f(x)dx \approx \frac{b-a}{6}[f(a)+4f(\frac{a+b}{2})+f(b)]$$

$$\int_{a}^{b}f(x)dx \approx \frac{3(b-a)}{8}[f(a)+3f(\frac{2a+b}{3})+3f(\frac{a+2b}{3})+f(b)]$$

- Las fórmulas de Newton-Cotes **se dividen en dos tipos: cerradas y abiertas**. Las fórmulas cerradas toman los extremos del intervalo, mientras que las fórmulas abiertas no lo hacen.

## Regla del trapecio
La regla del trapecio es una fórmula de integración numérica que se basa en la aproximación de la función a integrar por una recta, y la evaluación de esta recta en los extremos del intervalo de integración. La regla del trapecio se puede expresar de la siguiente manera:

$$\int_{a}^{b}f(x)dx \approx \frac{b-a}{2}[f(a)+f(b)]$$

Donde $a$ y $b$ son los extremos del intervalo de integración, y $f(x)$ es la función a integrar. La regla del trapecio se basa en la aproximación de la función por una recta, y el área bajo esta recta es igual al área de un trapecio. La regla del trapecio es una fórmula cerrada, ya que toma los extremos del intervalo de integración.
Para calcular el error de la regla del trapecio, se utiliza la siguiente fórmula:

$$E_t = -\frac{1}{12}f''(\xi)(b-a)^3$$


<mark style="background: #FFF3A3A6;">Cómo se calcula </mark>$f''(\xi)$
Donde $f''(\xi)$ es la segunda derivada de la función a integrar evaluada en algún punto $\xi$ dentro del intervalo de integración $[a,b]$. El error de la regla del trapecio es proporcional al cubo del tamaño del intervalo de integración, y es inversamente proporcional a la segunda derivada de la función a integrar. Por lo tanto, el error se puede reducir al disminuir el tamaño del intervalo de integración o al utilizar una función con una segunda derivada pequeña. https://youtu.be/taN_eRBaPOI
- Es una regla que posee muchísimo error
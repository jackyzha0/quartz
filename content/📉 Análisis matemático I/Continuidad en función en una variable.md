Course: [[Análisis matemático I]]
## Continuidad en un punto para funciones de una variable

La continuidad de una función en un punto se refiere a la propiedad de que la función no tenga saltos o discontinuidades en ese punto. Formalmente, se dice que una función $f(x)$ es continua en un punto $a$ si se cumplen las siguientes tres condiciones:

1. La función está definida en el punto $a$.
2. El límite de la función cuando $x$ se acerca a $a$ existe.
3. El valor de la función en el punto $a$ es igual al límite de la función cuando $x$ se acerca a $a$.

En otras palabras, la función debe estar definida en el punto, no debe haber un salto o discontinuidad en ese punto, y el valor de la función en el punto debe ser igual al límite de la función cuando $x$ se acerca a ese punto.

### Ejemplos

1. La función $f(x) = x^2$ es continua en el punto $a = 2$, ya que está definida en ese punto, el límite de la función cuando $x$ se acerca a $2$ es $4$, y el valor de la función en el punto $2$ es $4$.
2. La función $g(x) = \frac{1}{x}$ no es continua en el punto $a = 0$, ya que no está definida en ese punto. El límite de la función cuando $x$ se acerca a $0$ por la derecha es $\infty$, mientras que el límite de la función cuando $x$ se acerca a $0$ por la izquierda es $-\infty$. Por lo tanto, el límite de la función cuando $x$ se acerca a $0$ no existe, y la función no es continua en ese punto.

### Propiedades

Algunas propiedades de la continuidad en un punto son:

- Si $f(x)$ y $g(x)$ son continuas en el punto $a$, entonces $f(x) + g(x)$, $f(x) - g(x)$, $f(x) \cdot g(x)$ y $\frac{f(x)}{g(x)}$ (siempre y cuando $g(a) \neq 0$) también son continuas en el punto $a$.
- Si $f(x)$ es continua en el punto $a$ y $g(x)$ es continua en el punto $f(a)$, entonces $g(f(x))$ es continua en el punto $a$.

## Teorema de continuidad con el límite

El teorema de continuidad con el límite establece que si una función $f(x)$ es continua en un punto $a$, entonces el límite de la función cuando $x$ se acerca a $a$ es igual al valor de la función en el punto $a$. Formalmente, se puede expresar como sigue:

Si $f(x)$ es continua en $a$, entonces $\lim_{x \to a} f(x) = f(a)$.

Este teorema es una consecuencia directa de la definición de continuidad en un punto. Si la función es continua en el punto $a$, entonces el límite de la función cuando $x$ se acerca a $a$ existe y es igual al valor de la función en el punto $a$. Por lo tanto, el límite de la función cuando $x$ se acerca a $a$ es igual al valor de la función en el punto $a$.

### Ejemplo

La función $f(x) = x^2$ es continua en el punto $a = 2$. Para demostrarlo, se deben cumplir las tres condiciones necesarias para la continuidad:

1. La función está definida en el punto $a = 2$.
2. El límite de la función cuando $x$ se acerca a $2$ existe y es igual a $4$.
3. El valor de la función en el punto $2$ es igual a $4$.

Como se cumple cada una de estas condiciones, se puede concluir que la función $f(x) = x^2$ es continua en el punto $a = 2$. Por lo tanto, el límite de la función cuando $x$ se acerca a $2$ es igual a $4$.

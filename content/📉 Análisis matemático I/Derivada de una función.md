Course: [[Análisis matemático I]]

## Derivada de una función

La derivada de una función se refiere a la tasa de cambio instantánea de la función en un punto determinado. La derivada se puede calcular utilizando la definición de recta tangente y el límite. 

### Definición de recta tangente utilizando límite
La recta tangente a una curva en un punto se define como la recta que toca la curva en ese punto y tiene la misma pendiente que la curva en ese punto. La pendiente de la recta tangente se puede calcular utilizando el límite de la razón incremental:

$$m = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

donde $f(x)$ es la función en el punto $x$ y $h$ es un pequeño incremento en $x$. La recta tangente se puede escribir en la forma punto-pendiente:

$$y - f(x) = m(x - x_0)$$

donde $(x_0, f(x_0))$ es el punto de tangencia.

### Definición formal de derivada en un punto
La derivada de una función $f(x)$ en un punto $a$ se define como el límite de la razón incremental cuando el incremento de la variable tiende a cero:

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

### Definición de derivadas laterales (junto con el teorema de la existencia de la derivada)
Las derivadas laterales se refieren a la derivada de una función en un punto desde el lado izquierdo y el lado derecho del punto. La derivada lateral izquierda se define como:

$$f'_-(a) = \lim_{h \to 0^-} \frac{f(a+h) - f(a)}{h}$$

y la derivada lateral derecha se define como:

$$f'_+(a) = \lim_{h \to 0^+} \frac{f(a+h) - f(a)}{h}$$

El teorema de la existencia de la derivada establece que si una función es continua en un punto $a$, entonces la derivada en ese punto existe si y solo si las derivadas laterales izquierda y derecha existen y son iguales.

### Teorema derivabilidad implica continuidad
El teorema derivabilidad implica continuidad establece que si una función es derivable en un punto $a$, entonces la función es continua en ese punto. Es decir, la derivabilidad implica la continuidad, pero la continuidad no implica la derivabilidad.

### Definición formal de función derivada
La función derivada de una función $f(x)$ se define como la función que asigna a cada valor de $x$ la derivada de $f(x)$ en ese punto:

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

La función derivada se puede interpretar como la tasa de cambio instantánea de la función en cada punto.

[[Aplicaciones de la derivada]]

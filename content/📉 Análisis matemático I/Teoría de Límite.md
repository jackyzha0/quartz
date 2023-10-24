Course: [[Análisis matemático I]]

Date: February 12, 2023 4:50 PM
Status: Done
Year: 2021

## Teoría del Límite

La teoría del límite es un concepto fundamental del cálculo diferencial e integral. El límite de una función se refiere a la cercanía entre un valor y un punto. La definición formal de límite se puede expresar como sigue: 

Sea $f(x)$ una función definida en un intervalo abierto que contiene a $a$, excepto posiblemente en $a$ mismo. Decimos que el límite de $f(x)$ cuando $x$ se acerca a $a$ es $L$, y escribimos $\lim_{x \to a} f(x) = L$, si para cada número $\epsilon > 0$ existe un número $\delta > 0$ tal que si $0 < |x-a| < \delta$, entonces $|f(x) - L| < \epsilon$.

### Asíntotas horizontal y vertical
Las asíntotas son líneas rectas que se acercan cada vez más a la gráfica de una función, pero nunca la tocan. Una asíntota horizontal se presenta cuando el límite de la función tiende a un valor constante cuando $x$ tiende a infinito o menos infinito. Por otro lado, una asíntota vertical se presenta cuando el límite de la función tiende a infinito o menos infinito cuando $x$ se acerca a un valor constante.

### Teorema Límites Trigonométricos especiales
El teorema de los límites trigonométricos especiales se refiere a los límites de las funciones trigonométricas seno, coseno y tangente cuando el argumento tiende a cero. Los límites son:

- $\lim_{x \to 0} \frac{\sin x}{x} = 1$
- $\lim_{x \to 0} \frac{1 - \cos x}{x} = 0$
- $\lim_{x \to 0} \frac{\tan x}{x} = 1$

### Propiedades de los Límites
Las propiedades de los límites son:

- El límite de una suma es la suma de los límites: $\lim_{x \to a} [f(x) + g(x)] = \lim_{x \to a} f(x) + \lim_{x \to a} g(x)$.
- El límite de una diferencia es la diferencia de los límites: $\lim_{x \to a} [f(x) - g(x)] = \lim_{x \to a} f(x) - \lim_{x \to a} g(x)$.
- El límite de un producto es el producto de los límites: $\lim_{x \to a} [f(x) \cdot g(x)] = \lim_{x \to a} f(x) \cdot \lim_{x \to a} g(x)$.
- El límite de un cociente es el cociente de los límites: $\lim_{x \to a} \frac{f(x)}{g(x)} = \frac{\lim_{x \to a} f(x)}{\lim_{x \to a} g(x)}$, siempre y cuando $\lim_{x \to a} g(x) \neq 0$.
- El límite de una función compuesta es la función compuesta de los límites: $\lim_{x \to a} f(g(x)) = f(\lim_{x \to a} g(x))$.

### Teorema del Sandwich
El teorema del sandwich, también conocido como teorema del emparedado, establece que si $f(x) \leq g(x) \leq h(x)$ para todo $x$ en un intervalo abierto que contiene a $a$, excepto posiblemente en $a$ mismo, y si $\lim_{x \to a} f(x) = \lim_{x \to a} h(x) = L$, entonces $\lim_{x \to a} g(x) = L$.

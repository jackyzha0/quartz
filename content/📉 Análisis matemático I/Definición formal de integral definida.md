Course: [[Análisis matemático I]]
### Suma de Riemann y definición formal de integral definida
La suma de Riemann es una aproximación de la integral definida de una función en un intervalo dado. La integral definida se define como el límite de la suma de Riemann cuando el número de subdivisiones tiende a infinito. Formalmente, la integral definida de una función $f(x)$ en el intervalo $[a,b]$ se denota como $\int_a^b f(x) dx$ y se define como:

$$\int_a^b f(x) dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x$$

donde $\Delta x = \frac{b-a}{n}$ es el ancho de cada subintervalo, $x_i^*$ es un punto en el subintervalo $[x_{i-1}, x_i]$, y $n$ es el número de subdivisiones del intervalo $[a,b]$.

### Propiedades de la integral definida
Algunas propiedades de la integral definida son:

- Linealidad: $\int_a^b [f(x) + g(x)] dx = \int_a^b f(x) dx + \int_a^b g(x) dx$ y $\int_a^b k f(x) dx = k \int_a^b f(x) dx$
- Teorema del valor medio: existe un número $c \in [a,b]$ tal que $\int_a^b f(x) dx = f(c) (b-a)$
- Teorema fundamental del cálculo: si $F(x)$ es una antiderivada de $f(x)$, entonces $\int_a^b f(x) dx = F(b) - F(a)$

### Primer teorema fundamental del cálculo
El primer teorema fundamental del cálculo establece que la derivación y la integración son operaciones inversas. Si $f(x)$ es una función continua en el intervalo $[a,b]$, entonces la función $F(x) = \int_a^x f(t) dt$ es diferenciable en el intervalo $[a,b]$ y su derivada es igual a $f(x)$:

$$\frac{d}{dx} \int_a^x f(t) dt = f(x)$$

### Segundo teorema fundamental del cálculo
El segundo teorema fundamental del cálculo establece que si $f(x)$ es una función continua en el intervalo $[a,b]$, entonces la función $A(x) = \int_a^x f(t) dt$ es diferenciable en el intervalo $[a,b]$ y su derivada es igual a $f(x)$:

$$\frac{d}{dx} \int_a^x f(t) dt = f(x)$$

Este teorema establece una relación entre la integración y la diferenciación, y es esencial para el cálculo de integrales definidas.

### Teorema del valor medio para integrales
El teorema del valor medio para integrales establece que si $f(x)$ es una función continua en el intervalo cerrado $[a,b]$, entonces existe un número $c \in [a,b]$ tal que:

$$\int_a^b f(x) dx = f(c) (b-a)$$

Este teorema es útil para encontrar el valor promedio de una función en un intervalo dado.
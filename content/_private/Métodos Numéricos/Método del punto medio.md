El método del punto medio es un método numérico para resolver ecuaciones diferenciales ordinarias y es parte de la familia de métodos [[Runge-Kutta]]

Dada una ecuación diferencial ordinaria de primer orden con una condición inicial:

$$\frac{dy}{dt} = f(t, y), \quad y(t_0) = y_0$$

El método del punto medio se puede describir en dos pasos:

1. Se calcula una pendiente provisional en el punto inicial $t_n$:

$$k_1 = h \cdot f(t_n, y_n)$$

2. Se utiliza esta pendiente para extrapolar a la mitad del intervalo, y se calcula una nueva pendiente:

$$k_2 = h \cdot f\left(t_n + \frac{h}{2}, y_n + \frac{k_1}{2}\right)$$

3. Se utiliza esta nueva pendiente para avanzar a la solución en el siguiente paso:

$$y_{n+1} = y_n + k_2$$

donde:
- $y_{n+1}$ es el valor aproximado de $y$ en el tiempo $t_{n+1}$,
- $y_n$ es el valor aproximado actual de $y$,
- $h$ es el tamaño del paso (una pequeña cantidad de tiempo),
- $f(t, y)$ es el valor de la función que define la EDO,
- $k_1$ y $k_2$ son las pendientes calculadas.

En cuanto a los errores:

1. **Error de Truncamiento**: Este error surge debido a la aproximación que se hace al resolver la ecuación diferencial. En el caso del método del punto medio, se aproxima la derivada de una función por una diferencia finita. Esta aproximación introduce un error porque se ignora la contribución de los términos de orden superior. Este error puede controlarse reduciendo el tamaño del paso $h$, pero esto a su vez aumentará el número total de pasos y por lo tanto el tiempo de cálculo.

2. **Error de Redondeo**: Este error es inherente a la representación finita de los números en una computadora. Dado que las computadoras no pueden representar todos los números reales con precisión infinita, se producen errores de redondeo cuando se realizan operaciones aritméticas. Estos errores pueden acumularse durante los cálculos y afectar la precisión del resultado final. El manejo de estos errores es un desafío en el análisis numérico y depende en gran medida del sistema numérico utilizado (por ejemplo, precisión simple o doble) y del cuidado con el que se implementen los algoritmos.
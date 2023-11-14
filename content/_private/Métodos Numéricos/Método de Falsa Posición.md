El método de la falsa posición es un algoritmo numérico utilizado para aproximar las raíces de una función. Aunque los resultados de búsqueda no proporcionan una explicación detallada, podemos entender que este método se basa en el teorema del valor intermedio.
1. Seleccionar un intervalo cerrado $[a, b]$ que contenga una raíz de la función $f(x)$.
2. Calcular el punto $c$ en el eje $x$ donde la recta que une los puntos $(a, f(a))$ y $(b, f(b))$ intersecta el eje $x$. Este punto se calcula como: $$c = \frac{{a \cdot f(b) - b \cdot f(a)}}{{f(b) - f(a)}}$$
3. Evaluar la función $f(c)$ en el punto $c$.
4. Si $f(c)$ es igual a cero, entonces $c$ es una raíz de la función y el método se detiene.
5. Si $f(c)$ tiene el mismo signo que $f(a)$, entonces la raíz se encuentra en el intervalo $[c, b]$. En este caso, se redefine el intervalo $[a, b]$ como $[c, b]$ y se repiten los pasos 2 a 4.
6. Si $f(c)$ tiene el mismo signo que $f(b)$, entonces la raíz se encuentra en el intervalo $[a, c]$. En este caso, se redefine el intervalo $[a, b]$ como $[a, c]$ y se repiten los pasos 2 a 4.
7. Repetir los pasos 2 a 6 hasta que se alcance una aproximación deseada de la raíz.

Error de aproximación
$$
\varepsilon_a=\dfrac{|x_{i-1}-x_i|}{x_{i-1}}\cdot 100\%
$$

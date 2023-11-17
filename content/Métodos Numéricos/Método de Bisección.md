El método de la bisección es un algoritmo numérico utilizado para aproximar las raíces de una función. Este método se basa en el teorema del valor intermedio, que establece que si una función f(x) es continua en un intervalo cerrado $[a, b]$, y f(a) y f(b) tienen signos opuestos, entonces existe al menos un valor c en el intervalo (a, b) tal que $f(c)$ = 0.

Para chequear donde está el intervalo con cambio de signo, utilizamos el teorema de Bolzano
$$f(a)\cdot f(c)$$

El método de la bisección se puede describir en los siguientes pasos:
1. Seleccionar un intervalo cerrado $[a, b]$ que contenga una raíz de la función f(x).
2. Calcular el punto medio $c = (a + b) / 2$ del intervalo $[a, b]$.
3. Evaluar la función $f(c)$ en el punto medio c.
4. Si $f(c)$ es igual a cero, entonces c es una raíz de la función y el método se detiene.
5. Si $f(c)$ tiene el mismo signo que f(a), entonces la raíz se encuentra en el intervalo $[c, b]$. En este caso, se redefine el intervalo $[a, b]$ como $[c, b]$ y se repiten los pasos 2 a 4.
6. Si $f(c)$ tiene el mismo signo que f(b), entonces la raíz se encuentra en el intervalo $[a, c]$. En este caso, se redefine el intervalo $[a, b]$ como $[a, c]$ y se repiten los pasos 2 a 4.
7. Repetir los pasos 2 a 6 hasta que se alcance una aproximación deseada de la raíz.

Error de aproximación
$$
\varepsilon_a=\dfrac{|x_{i-1}-x_i|}{x_{i-1}}\cdot 100\%
$$

Valor precisión 
$$\eta = 5\times 10^p$$
Donde $p$ es la cantidad de cifras significativas. $\varepsilon < p$


## Análisis de convergencia en el método de bisección
- Si $[a_0,b_0]$ es el intervalo inicial, entonces $c=\dfrac{a_0+b_0}{2}$ es le valor calculado como una primera aproximación a la raíz. Si $r$ es la raíz exacta, entonces $$|\varepsilon_0|= |r-c| \leq \dfrac{b_0-a_0}{2}$$

![[Pasted image 20230830164509.png]]
El método de la secante es un algoritmo numérico utilizado para encontrar raíces de una función. Este método es similar al método de Newton-Raphson, pero en lugar de utilizar la derivada de la función, utiliza una aproximación de la derivada basada en dos puntos. A continuación, se describe el método de la secante en el contexto de la materia Métodos Numéricos:

1. Seleccionar dos aproximaciones iniciales $x_0$ y $x_1$ de la raíz de la función $f(x)$.
2. Calcular la aproximación de la derivada de la función en el intervalo $[x_0, x_1]$ utilizando la fórmula: $$f'(x_0, x_1) = \frac{f(x_1) - f(x_0)}{x_1 - x_0}$$
3. Calcular la siguiente aproximación $x_2$ de la raíz utilizando la fórmula: $$x_2 = x_1 - \frac{f(x_1) \cdot (x_1 - x_0)}{f(x_1) - f(x_0)}$$
4. Evaluar la función $f(x)$ en la aproximación $x_2$.
5. Si el valor de la función en $x_2$ es menor que una tolerancia dada, entonces $x_2$ es una aproximación de la raíz y el método se detiene.
6. Si el valor de la función en $x_2$ no es menor que la tolerancia dada, entonces se redefine $x_0$ como $x_1$ y $x_1$ como $x_2$, y se repiten los pasos 2 a 5.

El método de la secante es un método iterativo que converge rápidamente a la raíz de la función si las aproximaciones iniciales están lo suficientemente cercanas a la raíz y si la función es suave y continua. Sin embargo, si las aproximaciones iniciales están lejos de la raíz o si la función tiene una derivada discontinua, el método puede divergir o converger lentamente. En la materia de Métodos Numéricos, el método de la secante se utiliza para resolver ecuaciones no lineales y para encontrar soluciones de sistemas de ecuaciones no lineales.

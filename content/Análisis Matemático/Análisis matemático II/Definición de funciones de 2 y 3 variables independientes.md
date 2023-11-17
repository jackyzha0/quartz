[[Análisis matemático II]]

## Funciones de n-variables

Una función es una relación especial entre variables dependientes e independientes. Hasta el momento, hemos estudiado funciones de una sola variable $y=f(x)$.

Para funciones de n-variables, utilizaremos la siguiente notación:

$$
z=f(x,y)=x^2-3y+\sin(x+y)
$$

Donde $z$ es la variable independiente, y el par $(x,y)$ son las variables dependientes.

### Definición de funciones de dos variables independientes

Una función **f**, dos variables reales **x** e **y**, es una regla que asigna a cada par $(x,y)$ de algún conjunto $D\subset \mathbb{R}^2$, un número real único $z=f(x,y)$.

El dominio de una **función de dos variables** es el conjunto de los pares $(x,y)$ que hacen real el valor $f(x,y)$.

### Definición de funciones de tres variables independientes

Una función **f**, tres variables reales **x**, **y** y **z**, es una regla que asigna a cada terna $(x,y,z)$ de algún conjunto $D\subset \mathbb{R}^3$, un número real único $w=f(x,y,z)$.

El dominio de una **función de tres variables** es el conjunto de las ternas $(x,y,z)$ que hacen real el valor $f(x,y,z)$.

### Determinación del dominio

Por ejemplo, consideremos la función:

$$
z=f(x,y)=\frac{\sqrt{x+y+1}}{x-1}
$$

La función **f** posee dos restricciones:

- $x+y+1 \geq 0$
- $x-1 \neq 0$

Si $x+y+1=0$, entonces $y=-x-1$. Si $x-1=0$, entonces $x=1$.

Por lo tanto, el dominio de **f** es:

$$
domf=\{(x,y)\in \mathbb{R}^2 / x+y+1 \geq 0 \wedge x-1 \neq 0 \}
$$

Podemos graficar el dominio de **f** de la siguiente manera:

Dominio de f

## Conversión de expresiones matemáticas

Para convertir las expresiones matemáticas en formato LaTeX a formato Markdown, podemos utilizar los siguientes símbolos y convenciones:

- Para escribir una expresión matemática en línea, utilizamos el símbolo `$` al inicio y al final de la expresión. Por ejemplo, `$x^2$` se convierte en $x^2$.
- Para escribir una expresión matemática en una línea separada, utilizamos el símbolo `$$` al inicio y al final de la expresión. Por ejemplo, `$$\int_{0}^{1} x^2 dx$$` se convierte en $$\int_{0}^{1} x^2 dx$$
- Para escribir fracciones, utilizamos la convención `\frac{numerador}{denominador}`. Por ejemplo, `\frac{1}{2}` se convierte en $\frac{1}{2}$.
- Para escribir exponentes y subíndices, utilizamos los símbolos `^` y `_`, respectivamente. Por ejemplo, `x^2` se convierte en $x^2$, y `x_1` se convierte en $x_1$.

## Recursos adicionales

- [Tutorial: Funciones desde los puntos de vista numérico, algebráico, y gráfico](https://www.zweigmedia.com/tutsM/tutFunctions.php?lang=es)
- [Funciones y gráficas - Libro digital interactivo](https://proyectodescartes.org/iCartesiLibri/materiales_didacticos/calculo_I_1/index.html)
- [Operaciones con polinomios](https://hackmd.io/@alaneos777/BJDfsAkVd)


[[Gráfica de funciones de 2 variables]]
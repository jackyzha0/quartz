# Diferenciación Numérica

%%
Date:: [[2023-09-27]]
Course:: [[]]
Source:: [[U4 - MN]]
%%

La diferenciación numérica es una técnica utilizada **para calcular una aproximación de la derivada de una función en un punto dado**. Esta técnica se utiliza cuando no se dispone de una expresión analítica para la función, o cuando la función es demasiado compleja para ser diferenciada analíticamente. 

## Diferenciación numérica hacia adelante
La **diferenciación numérica hacia adelante** es una técnica utilizada para aproximar la derivada de una función en un punto dado utilizando los valores de la función en puntos a la derecha del punto de interés. La fórmula para la diferenciación numérica hacia adelante se basa en la aproximación de la derivada por una diferencia entre los valores de la función en dos puntos cercanos a la derecha del punto de interés. La fórmula para la diferenciación numérica hacia adelante se puede expresar de la siguiente manera:

$$f'(x) \approx \frac{f(x+h)-f(x)}{h}$$

Donde $f(x)$ es la función a derivar, $x$ es el punto de interés, $h$ es un pequeño incremento en $x$, y $f(x+h)$ y $f(x)$ son los valores de la función en los puntos $x+h$ y $x$, respectivamente. La diferenciación numérica hacia adelante es una técnica simple y fácil de implementar, pero puede producir resultados imprecisos si el incremento $h$ es demasiado grande o si la función es altamente oscilatoria.

## Diferenciación numérica hacia atrás
La fórmula para la diferenciación numérica hacia atrás se basa en la aproximación de la derivada por una diferencia entre los valores de la función en dos puntos cercanos a la izquierda del punto de interés. La fórmula para la diferenciación numérica hacia atrás se puede expresar de la siguiente manera:

$$f'(x) \approx \frac{f(x)-f(x-h)}{h}$$

Donde $f(x)$ es la función a derivar, $x$ es el punto de interés, $h$ es un pequeño decremento en $x$, y $f(x)$ y $f(x-h)$ son los valores de la función en los puntos $x$ y $x-h$, respectivamente. La diferenciación numérica hacia atrás es una técnica simple y fácil de implementar, pero puede producir resultados imprecisos si el decremento $h$ es demasiado grande o si la función es altamente oscilatoria.

## Diferenciación numérica centrada
La diferenciación numérica centrada es una técnica utilizada para aproximar la derivada de una función en un punto dado utilizando los valores de la función en puntos a ambos lados del punto de interés. La fórmula para la diferenciación numérica centrada se basa en la aproximación de la derivada por una combinación lineal de los valores de la función en dos puntos cercanos a ambos lados del punto de interés. La fórmula para la diferenciación numérica centrada se puede expresar de la siguiente manera:

$$f'(x) \approx \frac{f(x+h)-f(x-h)}{2h}$$

Donde $f(x)$ es la función a derivar, $x$ es el punto de interés, $h$ es un pequeño incremento en $x$, y $f(x+h)$ y $f(x-h)$ son los valores de la función en los puntos $x+h$ y $x-h$, respectivamente. La diferenciación numérica centrada es una técnica más precisa que la diferenciación numérica hacia adelante o hacia atrás, ya que utiliza los valores de la función en ambos lados del punto de interés. Sin embargo, la diferenciación numérica centrada puede producir resultados imprecisos si el incremento $h$ es demasiado grande o si la función es altamente oscilatoria. 

## Aproximación por diferencias finitas para derivadas de orden superior
![[Pasted image 20230927165623.png]]

![[Pasted image 20230927165647.png]]

![[Pasted image 20230927165704.png]]
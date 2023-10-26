[[Análisis matemático II]]

Date: February 13, 2023 8:18 PM
Status: Done
Year: 2022

- Cómo se define una serie de potencias?
    
    Una serie de potencias es aquella que tiene la forma (serie centrada)
    
    $$
    \sum_{n=0}^\infty c_nx^n=c_0+c_1x+c_2x^2+\dots
    $$
    
    donde $x$ es una variable y los $c_n$ son constantes, llamados coeficientes de la serie. Demanera más general, es una serie de la forma
    
    $$
    \sum_{n=0}^\infty c_n(x-a)^n=c_0+c_1(x-a)+c_2(x-a)^2+\dots
    $$
    
    se llama serie de potencias en $(x-a)$, serie de potencias centrada en $a$, o serie de potencias sobre $a$
    
    - Puede ocurrir que sea convergente para unos valores, y divergente para otros.
    - Por convención $(x-a)^0=1$ por más que x-a pueda ser sero
- Teorema sobre el radio de convergencia de las series de potencias
    
    Para una serie de potencia dada, $\sum_{n=0}^\infty c_n(x-a)^n$, solo hay una de tres posibilidades:
    
    1. La serie sólo converge cuando $x=a$
        - El intervalo consta de un solo punto, $a$.
    2. La serie converge para toda $x$
        - El intervalo es es $(-\infty,\infty)$.
    3. Hay un número positivo, $R$, tal que la serie converge si $|x-a|<R$ y diverge si $|x-a|>R$
        - Se puede observar que la desigualdad $|x-a|<R$ se puede escribir de la forma $a-R<x<a+R$.
    - el R es el radio de convergencia.
    
    Cuando $x$ es un punto extremo del intervalo, es decir $x=a\pm R$, puede suceder que la serie sea convergente o divergente en cada uno de los extremos. Por lo que en el caso 3 existen cuatro posibilidades de convergencia.
    
    - $(a-R,a+R)$
    - $(a-R,a+R)$
    - $[a-R,a+R)$
    - $[a-R,a+R]$
    
    Por lo general, para encontrar el radio de convergencia, utilizamos el criterio del cociente.
    
- Definición de Serie de Taylor y Serie de Maclaurin
    
    Si una función $f$ tiene derivadas parciales de todos los órdenes en $x=a$, se llama ******************************serie de Taylor****************************** de $f$ centrada en la serie 
    
    $$
    \sum_{n=0}^\infty\dfrac{f^n(a)}{n!}(x-a)^n=f(a)+\dfrac{f'(a)}{1!}(x-a)+\dfrac{f''(a)}{2!}(x-a)^2+\dfrac{f'''(a)}{3!}(x-a)^3+\dots
    $$
    
    En el caso particular donde $a=0$, la serie 
    
    $$
    \sum_{n=0}^\infty\dfrac{f^n(0)}{n!}x^n=f(a)+\dfrac{f'(0)}{1!}x+\dfrac{f''(0)}{2!}x^2+\dfrac{f'''(0)}{3!}x^3+\dots
    $$
    
    se denomina serie de Maclaurin de $f$
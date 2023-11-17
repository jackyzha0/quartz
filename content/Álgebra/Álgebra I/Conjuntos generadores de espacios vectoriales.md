Course: [[Algebra I]]

## Definición de combinación lineal de vectores
La combinación lineal de vectores es una operación que se realiza entre vectores y escalares. Dados los vectores v1, v2, ..., vn y los escalares a1, a2, ..., an, la combinación lineal de estos vectores es la suma ponderada de los vectores, donde cada vector se multiplica por su correspondiente escalar y luego se suman todos los resultados. Matemáticamente, se puede expresar como:

$$a_1v_1 + a_2v_2 + ... + a_nv_n$$

Es importante destacar que cualquier vector en el espacio vectorial generado por los vectores v1, v2, ..., vn puede ser expresado como una combinación lineal de estos vectores. Además, si alguno de los vectores puede ser expresado como una combinación lineal de los demás, entonces se dice que estos vectores son linealmente dependientes. En caso contrario, se dice que son linealmente independientes.

## Definición de conjuntos generadores de espacios vectoriales

Definición de conjuntos generadores de espacios vectoriales:
Un conjunto generador de un espacio vectorial es un conjunto de vectores que, mediante combinaciones lineales, pueden generar cualquier vector en ese espacio. Es decir, un conjunto S es un conjunto generador de un espacio vectorial V si todo vector en V puede ser expresado como una combinación lineal de los vectores en S. Matemáticamente, se puede expresar como:

$$V = \text{span}(S)$$

donde span(S) es el conjunto de todas las combinaciones lineales de los vectores en S.

Sea $S=\{v_1,v_2,\dots,v_k\} \subset V$ Se dice que el conjunto $S$ es un **conjunto generador**  de $V$ si y solo todo vector de $V$ se puede escribir como combinación lineal de los elementos de $S$. En estos casos se dice que $S$ genera a $V$

## Definición de generador de un conjunto
Sea $(V,+, R, . )$ un espacio vectorial real. Si $S=\{v_1,v_2,\dots,v_k\} \subset V$, entonces el generador de $S$ es el conjunto de todas las combinaciones lineales de vectores de $S$.
$$\text{span}(S)= \{\lambda_1,v_1+\lambda_2,v_2+\dots\lambda_k,v_k: \lambda_k \in R\}$$
El generador de $S$ es denotado por $\text{span(S)}$


>[!important] Teorema 
> Sea $S=\{v_1,v_2,\dots,v_k\} \subset V$ $$\text{span(S) es subespacio vectorial de V}$$

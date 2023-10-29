Course: [[Algebra I]]

Date: February 12, 2023 5:24 PM
Status: Done
Year: 2021

## Definición de espacio vectorial
  Un espacio vectorial es un conjunto de elementos llamados vectores, que pueden ser sumados y multiplicados por escalares, y que cumplen ciertas propiedades. Formalmente, un espacio vectorial $V$ sobre un campo $F$ es un conjunto no vacío de elementos llamados vectores, junto con dos operaciones binarias definidas en $V$:

1. Suma de vectores: Para cualquier par de vectores $u, v \in V$, la suma $u+v$ es un vector en $V$.
2. Multiplicación por escalares: Para cualquier escalar $\alpha \in F$ y cualquier vector $u \in V$, el producto $\alpha u$ es un vector en $V$.

Estas operaciones deben cumplir las siguientes propiedades para todo $u, v, w \in V$ y todo $\alpha, \beta \in F$:

1. Asociatividad de la suma: $(u+v)+w = u+(v+w)$.
2. Conmutatividad de la suma: $u+v = v+u$.
3. Existencia de un elemento neutro de la suma: Existe un vector $0 \in V$ tal que $u+0 = u$ para todo $u \in V$.
4. Existencia de un elemento opuesto de la suma: Para cada $u \in V$, existe un vector $-u \in V$ tal que $u+(-u) = 0$.
5. Distributividad de la multiplicación por escalares respecto a la suma de vectores: $\alpha(u+v) = \alpha u + \alpha v$.
6. Distributividad de la multiplicación por escalares respecto a la suma de escalares: $(\alpha+\beta)u = \alpha u + \beta u$.
7. Asociatividad de la multiplicación por escalares: $\alpha(\beta u) = (\alpha\beta)u$.
8. Existencia de un elemento neutro de la multiplicación por escalares: Existe un escalar $1 \in F$ tal que $1u = u$ para todo $u \in V$.


## Teorema: Propiedades del producto por escalar
  Aquí te presento las propiedades del producto por escalar en un espacio vectorial:
- **Distributividad del producto por escalar respecto a la suma de vectores:** Para cualquier escalar $\alpha$ y cualquier par de vectores $u, v$ en un espacio vectorial $V$, se cumple que $\alpha(u+v) = \alpha u + \alpha v$.
- **Distributividad del producto por escalar respecto a la suma de escalares:** Para cualquier par de escalares $\alpha, \beta$ y cualquier vector $u$ en un espacio vectorial $V$, se cumple que $(\alpha + \beta)u = \alpha u + \beta u$.
- **Asociatividad del producto por escalar:** Para cualquier par de escalares $\alpha, \beta$ y cualquier vector $u$ en un espacio vectorial $V$, se cumple que $(\alpha \beta)u = \alpha(\beta u)$.
- **Producto por escalar del elemento neutro:** Para cualquier vector $u$ en un espacio vectorial $V$, se cumple que $1u = u$, donde $1$ es el elemento neutro del producto por escalar.
- **Producto por escalar del elemento nulo:** Para cualquier escalar $0$ y cualquier vector $u$ en un espacio vectorial $V$, se cumple que $0u = 0$, donde $0$ es el elemento nulo del producto por escalar.


## Definición de subespacios vectoriales
Un subespacio vectorial es un subconjunto no vacío de un espacio vectorial $V$ que es cerrado bajo las operaciones de suma de vectores y multiplicación por escalares. Formalmente, un subconjunto $W$ de un espacio vectorial $V$ es un subespacio vectorial si se cumplen las siguientes condiciones:

1. El vector cero de $V$ está en $W$.
2. Para cualquier par de vectores $u, v$ en $W$, la suma $u+v$ está en $W$.
3. Para cualquier escalar $\alpha$ y cualquier vector $u$ en $W$, el producto $\alpha u$ está en $W$.

Estas condiciones aseguran que $W$ es un espacio vectorial en sí mismo, y que hereda las propiedades y estructura del espacio vectorial $V$. Por ejemplo, si $V$ es un espacio vectorial de dimensión $n$, entonces cualquier subespacio vectorial de $V$ tiene dimensión menor o igual a $n$. Los subespacios vectoriales son importantes en el estudio de los espacios vectoriales porque permiten analizar y clasificar las propiedades de los vectores en un espacio vectorial de manera más estructurada y organizada.

## Teorema condición Necesaria y Suficiente para Subespacios
La condición necesaria y suficiente para que un subconjunto $W$ de un espacio vectorial $V$ sea un subespacio vectorial es que $W$ sea cerrado bajo las operaciones de suma de vectores y multiplicación por escalares. Es decir, $W$ es un subespacio vectorial de $V$ si y solo si se cumplen las siguientes condiciones:

1. El vector cero de $V$ está en $W$.
2. Para cualquier par de vectores $u, v$ en $W$, la suma $u+v$ está en $W$.
3. Para cualquier escalar $\alpha$ y cualquier vector $u$ en $W$, el producto $\alpha u$ está en $W$.



## Definición de intersección de subespacios
La intersección de subespacios es un concepto en álgebra lineal que se refiere al conjunto de vectores que pertenecen a dos o más subespacios vectoriales de un espacio vectorial común. Formalmente, si $W_1, W_2, ..., W_k$ son subespacios vectoriales de un espacio vectorial $V$, entonces la intersección de $W_1, W_2, ..., W_k$ se define como el conjunto de vectores que pertenecen a todos los subespacios $W_1, W_2, ..., W_k$:

$$W_1 \cap W_2 \cap ... \cap W_k = \{v \in V : v \in W_1, v \in W_2, ..., v \in W_k\}$$

La intersección de subespacios es un subespacio vectorial de $V$ porque cumple las tres condiciones de la definición de subespacio vectorial: contiene el vector cero de $V$, es cerrado bajo la suma de vectores y es cerrado bajo la multiplicación por escalares. La intersección de subespacios es útil en el estudio de los espacios vectoriales porque permite analizar y clasificar los vectores que pertenecen a dos o más subespacios vectoriales de manera más estructurada y organizada.

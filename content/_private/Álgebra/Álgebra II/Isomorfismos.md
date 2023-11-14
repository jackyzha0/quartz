Course: [[Algebra II]]

Date: February 12, 2023 5:31 PM
Status: Done
Year: 2021


## Transformación inyectia y sobreyectiva
- **Transformación inyectiva**: Una transformación es inyectiva si cada elemento del codominio tiene a lo sumo un elemento del dominio que se asigna a él. En otras palabras, una transformación es inyectiva si dos elementos diferentes del dominio no se asignan al mismo elemento del codominio. Matemáticamente, una transformación $f: X \rightarrow Y$ es inyectiva si para todo $x_1, x_2 \in X$, si $f(x_1) = f(x_2)$, entonces $x_1 = x_2$. Una forma equivalente de expresar esto es que si $x_1 \neq x_2$, entonces $f(x_1) \neq f(x_2)$.
- **Transformación sobreyectiva**: Una transformación es sobreyectiva si cada elemento del codominio tiene al menos un elemento del dominio que se asigna a él. En otras palabras, una transformación es sobreyectiva si no hay elementos en el codominio que no se asignen a ningún elemento del dominio. Matemáticamente, una transformación $f: X \rightarrow Y$ es sobreyectiva si para todo $y \in Y$, existe al menos un $x \in X$ tal que $f(x) = y$.

# Definición de **isomorfismos**
Un **isomorfismo** es una función biyectiva entre dos estructuras algebraicas que preserva la estructura y las propiedades de las operaciones definidas en las estructuras. Formalmente, si $A$ y $B$ son dos estructuras algebraicas, como grupos, anillos o espacios vectoriales, entonces una función $f: A \rightarrow B$ es un isomorfismo si cumple las siguientes condiciones:
- $f$ es biyectiva, es decir, cada elemento de $A$ se asigna a un único elemento de $B$, y cada elemento de $B$ se asigna a un único elemento de $A$.
- $f$ preserva la estructura algebraica de $A$ y $B$, es decir, para todo $x, y \in A$, se cumple que $f(x+y) = f(x) + f(y)$ y $f(xy) = f(x)f(y)$, y para todo $\alpha \in \mathbb{F}$, donde $\mathbb{F}$ es el campo subyacente de $A$ y $B$, se cumple que $f(\alpha x) = \alpha f(x)$.
- $f^{-1}$ es también una función biyectiva que preserva la estructura algebraica de $A$ y $B$, es decir, para todo $x, y \in B$, se cumple que $f^{-1}(x+y) = f^{-1}(x) + f^{-1}(y)$ y $f^{-1}(xy) = f^{-1}(x)f^{-1}(y)$, y para todo $\alpha \in \mathbb{F}$, se cumple que $f^{-1}(\alpha x) = \alpha f^{-1}(x)$.


- Teorema **condición Necesaria y suficiente** (inyectiva - sobreyectiva)![Isomorfismos/Untitled%203.png](Images/Isomorfismos/Untitled%203.png)

- Definición de **endomorfismo** u **operador lineal**
    Un endomorfismo, también conocido como operador lineal, es una transformación lineal que mapea un espacio vectorial en sí mismo. Formalmente, si $V$ es un espacio vectorial sobre un campo $\mathbb{F}$, entonces un endomorfismo de $V$ es una función lineal $T: V \rightarrow V$ que asigna a cada vector $\vec{v} \in V$ otro vector $T(\vec{v}) \in V$.

- Teorema **condición necesaria y suficiente para isomorfismo**![Isomorfismos/Untitled%205.png](Images/Isomorfismos/Untitled%205.png)
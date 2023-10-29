Course: [[Algebra I]]


- Concepto de dominio y codonimio de un transformación
    Formalmente, si $T: V \rightarrow W$ es una transformación lineal que mapea un vector $\vec{v} \in V$ a un vector $\vec{w} \in W$, **entonces $V$ es el dominio de $T$ y $W$ es el codominio de $T$**. El dominio y el codominio de una transformación lineal son importantes porque determinan el conjunto de vectores que se pueden transformar mediante la función y el conjunto de vectores que se pueden obtener mediante la función, respectivamente.


- Definición de transformación u operador lineal
    Una transformación lineal, también conocida como operador lineal, es una función que mapea un vector de un espacio vectorial a otro vector en otro espacio vectorial, de tal manera que preserva la estructura lineal de los vectores. Formalmente, una transformación lineal $T: V \rightarrow W$ es una función que satisface las siguientes propiedades:
	1. $T(\vec{u} + \vec{v}) = T(\vec{u}) + T(\vec{v})$ para cualquier par de vectores $\vec{u}$ y $\vec{v}$ en $V$.
	2. $T(k\vec{u}) = kT(\vec{u})$ para cualquier vector $\vec{u}$ en $V$ y cualquier escalar $k$.
	3. $T(\vec{0}) = \vec{0}$, donde $\vec{0}$ es el vector nulo en $V$.
    
- Definición de transformation identidad
    La transformación identidad $T: V \rightarrow V$ se define como $T(\vec{v}) = \vec{v}$ para cualquier vector $\vec{v}$ en $V$. En otras palabras, la transformación identidad deja inalterados todos los vectores en el espacio vectorial.
    
- Definición de transformación nula
    La transformación nula $T: V \rightarrow W$ se define como $T(\vec{v}) = \vec{0}$ para cualquier vector $\vec{v}$ en $V$, donde $\vec{0}$ es el vector nulo en $W$. En otras palabras, la transformación nula asigna el vector nulo del espacio vectorial de llegada a todos los vectores del espacio vectorial de partida.

- Definición de transformación de reflexión
    La transformación de reflexión es una transformación lineal que invierte la orientación de un objeto geométrico con respecto a un plano de reflexión. Formalmente, si $P$ es un plano en $\mathbb{R}^n$, entonces la transformación de reflexión $T_P: \mathbb{R}^n \rightarrow \mathbb{R}^n$ se define como sigue:
	- Para cualquier vector $\vec{v}$ en $\mathbb{R}^n$, la transformación de reflexión $T_P(\vec{v})$ es el vector resultante de reflejar $\vec{v}$ con respecto al plano $P$.

- Definición de transformación de rotación
    Para cualquier vector $\vec{v}$ en $\mathbb{R}^n$, la transformación de rotación $T_{P,\theta}(\vec{v})$ es el vector resultante de rotar $\vec{v}$ alrededor del punto fijo $P$ en un ángulo $\theta$.![Untitled](Images/Transformaciones%20lineales/Untitled%206.png)

- Definición de transformación de proyección en R3![Untitled](Images/Transformaciones%20lineales/Untitled%207.png)

- Definición de operador de transposición    ![Untitled](Images/Transformaciones%20lineales/Untitled%208.png)

- Definición de operador diferencial![Untitled](Images/Transformaciones%20lineales/Untitled%209.png)

- Definición de operador integral![Untitled](Images/Transformaciones%20lineales/Untitled%2010.png)

- Condición necesaria para transformación lineal![Untitled](Images/Transformaciones%20lineales/Untitled%2011.png)

- Propiedades de la transformación lineal![Untitled](Images/Transformaciones%20lineales/Untitled%2012.png)

- Teorema existencia de la transformación lineal![Untitled](Images/Transformaciones%20lineales/Untitled%2013.png)

- Teorema matriz asociada a la transformación
    El teorema de la matriz asociada a una transformación lineal establece que toda transformación lineal $T: V \rightarrow W$ se puede representar mediante una matriz $A$ de tamaño $m \times n$, donde $m$ es la dimensión del espacio vectorial de llegada $W$ y $n$ es la dimensión del espacio vectorial de partida $V$. La matriz $A$ se llama matriz asociada a la transformación lineal $T$ y se define como sigue:
	- Para cualquier vector $\vec{v}$ en $V$, la imagen de $\vec{v}$ bajo la transformación lineal $T$ se puede representar como $T(\vec{v}) = A\vec{v}$, donde $\vec{v}$ es un vector columna de tamaño $n$ y $A$ es una matriz de tamaño $m \times n$.

- Definición de Kernel e imagen de una transformación
    El kernel y la imagen son dos conceptos fundamentales en el estudio de las transformaciones lineales.
	- El kernel de una transformación lineal $T: V \rightarrow W$ es el conjunto de todos los vectores en el espacio vectorial de partida $V$ que se transforman en el vector nulo del espacio vectorial de llegada $W$. Formalmente, el kernel de $T$ se define como $\operatorname{ker}(T) = {\vec{v} \in V : T(\vec{v}) = \vec{0}}$.
	- La imagen de una transformación lineal $T: V \rightarrow W$ es el conjunto de todos los vectores en el espacio vectorial de llegada $W$ que se pueden obtener mediante la transformación lineal. Formalmente, la imagen de $T$ se define como $\operatorname{im}(T) = {\vec{w} \in W : \vec{w} = T(\vec{v}) \text{ para algún } \vec{v} \in V}$.
   
- Proposición del kernel e imagen como un subespacio![Untitled](Images/Transformaciones%20lineales/Untitled%2016.png)![Untitled](Images/Transformaciones%20lineales/Untitled%2017.png)

- Definición de nulidad y rango de una transformación![Untitled](Images/Transformaciones%20lineales/Untitled%2018.png)

- Teorema de las dimensiones![Untitled](Images/Transformaciones%20lineales/Untitled%2019.png)

- Teorema: Matriz asociada a una transformación lineal con respecto a las bases canónicas![Untitled](Images/Transformaciones%20lineales/Untitled%2020.png)  ![Untitled](Images/Transformaciones%20lineales/Untitled%2021.png)

- Uso de la matriz asociada para la determinación del núcleo e imagen de la transformación![Untitled](Images/Transformaciones%20lineales/Untitled%2022.png)
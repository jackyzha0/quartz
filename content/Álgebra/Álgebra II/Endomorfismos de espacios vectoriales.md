Course: [[Algebra II]]


- Definición de **polinomio característico**
	El polinomio característico de un operador lineal es una función polinómica que se utiliza para determinar las propiedades de un operador lineal en un espacio vectorial. El polinomio característico se define como el determinante de la matriz resultante de restar la matriz identidad multiplicada por una constante $\lambda$ de la matriz asociada al operador lineal. Formalmente, si $T: V \rightarrow V$ es un operador lineal en un espacio vectorial $V$, entonces el polinomio característico de $T$ se define como:$$p_T(\lambda) = \det(T - \lambda I)$$donde $I$ es la matriz identidad y $\det$ denota el determinante de una matriz.


- Definición de **ecuación característica**$$\det(T - \lambda I)=0$$
- Definición de **valores propios** del operador T
    Los valores propios, también conocidos como autovalores, de un operador lineal son los escalares $\lambda$ tales que existe un vector no nulo $\vec{v}$ en el espacio vectorial tal que la transformación lineal $T$ aplicada a $\vec{v}$ es igual a $\lambda$ multiplicado por $\vec{v}$. Formalmente, si $T: V \rightarrow V$ es un operador lineal en un espacio vectorial $V$, entonces un valor propio de $T$ es un escalar $\lambda$ tal que existe un vector no nulo $\vec{v}$ en $V$ que satisface la ecuación:$$T(\vec{v}) = \lambda \vec{v}$$El vector $\vec{v}$ se llama vector propio o autovector de $T$ correspondiente al valor propio $\lambda$.
    
- Definición de **vector propio**
    Los vectores propios, también conocidos como autovectores, de un operador lineal son los vectores no nulos $\vec{v}$ en el espacio vectorial que, al ser transformados por el operador lineal, resultan en un múltiplo escalar de sí mismos. Formalmente, si $T: V \rightarrow V$ es un operador lineal en un espacio vectorial $V$, entonces un vector no nulo $\vec{v}$ en $V$ es un vector propio o autovector de $T$ correspondiente al valor propio $\lambda$ si satisface la ecuación:$$T(\vec{v}) = \lambda \vec{v}$$donde $\lambda$ es el valor propio correspondiente a $\vec{v}$.

- Definición de **espacio propio**
    Los espacios propios, también conocidos como autoespacios, de un operador lineal son los subespacios vectoriales de un espacio vectorial $V$ que consisten en los vectores propios correspondientes a un valor propio. Formalmente, si $T: V \rightarrow V$ es un operador lineal en un espacio vectorial $V$, entonces el espacio propio correspondiente al valor propio $\lambda$ se define como el conjunto de todos los vectores propios de $T$ correspondientes a $\lambda$, junto con el vector nulo. Es decir, el espacio propio se define como:$$E_\lambda = \{\vec{v} \in V : T(\vec{v}) = \lambda \vec{v}\}$$donde $\lambda$ es un valor propio de $T$.

- Teorema valores propios en matriz triangular
	El teorema de los valores propios en matriz triangular establece que los valores propios de una matriz triangular son los elementos de su diagonal principal. Es decir, si $A$ es una matriz triangular, entonces los valores propios de $A$ son los elementos $a_{ii}$ de su diagonal principal.
    
- Demostración de isomorfismo (Se debe probar que todo vector de un conjunto está en el otro y recíprocamente)![Endomorfismos%20de%20espacios%20vectoriales/Untitled%208.png](Images/Endomorfismos%20de%20espacios%20vectoriales/Untitled%208.png)

- Definición de yuxtaposición y conjunto generado![Untitled](Images/Endomorfismos%20de%20espacios%20vectoriales/Untitled%209.png)![Untitled](Images/Endomorfismos%20de%20espacios%20vectoriales/Untitled%2010.png)

- Teorema matriz diagonal y valores propios
    El teorema de la matriz diagonal y valores propios establece que una matriz cuadrada es diagonalizable si y solo si tiene un conjunto completo de vectores propios linealmente independientes. En otras palabras, una matriz cuadrada $A$ es diagonalizable si y solo si existe una matriz diagonal $D$ y una matriz invertible $P$ tal que $A = PDP^{-1}$, donde las columnas de $P$ son los vectores propios linealmente independientes de $A$ y las entradas diagonales de $D$ son los valores propios correspondientes.

- Teorema determinante y traza con valores propios
    El teorema del determinante y la traza con valores propios establece que la suma de los valores propios de una matriz cuadrada es igual a la traza de la matriz, y que el producto de los valores propios de una matriz cuadrada es igual al determinante de la matriz. Formalmente, si $A$ es una matriz cuadrada $n \times n$ con valores propios $\lambda_1, \lambda_2, ..., \lambda_n$, entonces se cumple que:
	- $\lambda_1 + \lambda_2 + ... + \lambda_n = \operatorname{tr}(A)$, donde $\operatorname{tr}(A)$ es la traza de $A$, es decir, la suma de los elementos de su diagonal principal.
	- $\lambda_1 \cdot \lambda_2 \cdot ... \cdot \lambda_n = \det(A)$, donde $\det(A)$ es el determinante de $A$.
    
- Teorema A. Dimensión del subespacio mendiante el valor propio.    ![Untitled](Images/Endomorfismos%20de%20espacios%20vectoriales/Untitled%2013.png)

- Teorema B. Dimension máxima mediante multiplicidad.![Untitled](Images/Endomorfismos%20de%20espacios%20vectoriales/Untitled%2014.png)

- Teorema C. Li mendiante los vectores yuxtapuestos.![Untitled](Images/Endomorfismos%20de%20espacios%20vectoriales/Untitled%2015.png)
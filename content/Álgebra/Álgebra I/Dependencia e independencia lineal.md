Course: [[Algebra I]]


## Definición de linealmente independiente y dependiente:

- Un conjunto de vectores ${v_1, v_2, ..., v_n}$ en un espacio vectorial $V$ se dice que es **linealmente independiente** si la única solución para la ecuación lineal $a_1v_1 + a_2v_2 + ... + a_nv_n = 0$ es $a_1 = a_2 = ... = a_n = 0$.
- Un conjunto de vectores ${v_1, v_2, ..., v_n}$ en un espacio vectorial $V$ se dice que es **linealmente dependiente** si existe una solución no trivial para la ecuación lineal $a_1v_1 + a_2v_2 + ... + a_nv_n = 0$, es decir, existe al menos un conjunto de coeficientes $a_1, a_2, ..., a_n$ no todos iguales a cero que satisfacen la ecuación.

- Características de la independencia lineal![Untitled](Images/Dependencia%20e%20independencia%20lineal/Untitled%204.png)

- **Dependencia lineal:** Un conjunto de vectores es linealmente dependiente si al menos uno de ellos puede ser expresado como una combinación lineal de los demás. En otras palabras, si existe un vector en el conjunto que puede ser escrito como una combinación lineal de los demás vectores, entonces el conjunto es linealmente dependiente. De lo contrario, si ningún vector puede ser escrito como una combinación lineal de los demás, entonces el conjunto es linealmente independiente.
- **Sistemas lineales:** Un sistema de ecuaciones lineales es un conjunto de ecuaciones lineales que deben ser resueltas simultáneamente. Un sistema lineal puede ser representado en forma matricial como $Ax=b$, donde $A$ es una matriz de coeficientes, $x$ es un vector de incógnitas y $b$ es un vector de términos independientes. La solución del sistema se obtiene resolviendo la ecuación matricial $Ax=b$.
- **Determinantes:** El determinante es una función matemática que se define para matrices cuadradas. El determinante de una matriz se denota por $det(A)$ o $|A|$ y es un número que se obtiene a partir de los elementos de la matriz. El determinante se utiliza para determinar si una matriz es invertible o no. Si el determinante de una matriz es cero, entonces la matriz no es invertible y se dice que es singular. Si el determinante es distinto de cero, entonces la matriz es invertible y se dice que es no singular. El determinante también se utiliza para calcular la matriz inversa de una matriz no singular.

>[!important]
>Sea A una matriz de $n\times n$ Entonces $\text{detA}\neq 0$ si y solo si las columnas de $A$ son linealmente independientes

![Untitled](Images/Dependencia%20e%20independencia%20lineal/Untitled%207.png)

## Definición de base y dimensión 

- Una **base** de un espacio vectorial $V$ es un conjunto de vectores linealmente independientes que generan $V$. En otras palabras, una base es un conjunto mínimo de vectores que pueden ser combinados linealmente para formar cualquier vector en $V$. Cualquier otro vector en $V$ puede ser expresado como una combinación lineal única de los vectores de la base.
- La **dimensión** de un espacio vectorial $V$ es el número de vectores en cualquier base de $V$. La dimensión se denota por $dim(V)$. Todos los vectores en $V$ pueden ser expresados como una combinación lineal de los vectores de la base, y cualquier conjunto de más de $dim(V)$ vectores en $V$ es linealmente dependiente. Por lo tanto, la dimensión de un espacio vectorial es una medida de la cantidad de información necesaria para describir cualquier vector en el espacio.
    
## Teorema Unicidad de la representación de la base
El teorema de unicidad de la representación de la base establece que cualquier vector en un espacio vectorial puede ser expresado de manera única como una combinación lineal de los vectores de una base dada. En otras palabras, si ${v_1, v_2, ..., v_n}$ es una base de un espacio vectorial $V$, entonces para cualquier vector $v$ en $V$, existe un conjunto único de escalares $a_1, a_2, ..., a_n$ tal que $v = a_1v_1 + a_2v_2 + ... + a_nv_n$. Este teorema es importante porque garantiza que cualquier vector en un espacio vectorial puede ser descrito de manera única en términos de una base dada. Esto significa que la base proporciona una forma sistemática y completa de describir cualquier vector en el espacio, lo que facilita el análisis y la resolución de problemas en álgebra lineal. La demostración del teorema de unicidad de la representación de la base se basa en la suposición de que existen dos conjuntos diferentes de escalares $a_1, a_2, ..., a_n$ y $b_1, b_2, ..., b_n$ que satisfacen la ecuación $v = a_1v_1 + a_2v_2 + ... + a_nv_n$ y $v = b_1v_1 + b_2v_2 + ... + b_nv_n$. Al restar estas dos ecuaciones, se obtiene la ecuación $(a_1-b_1)v_1 + (a_2-b_2)v_2 + ... + (a_n-b_n)v_n = 0$. Como ${v_1, v_2, ..., v_n}$ es una base, se sabe que es linealmente independiente, lo que implica que la única solución para esta ecuación es $a_1-b_1 = a_2-b_2 = ... = a_n-b_n = 0$. Por lo tanto, los conjuntos de escalares $a_1, a_2, ..., a_n$ y $b_1, b_2, ..., b_n$ son iguales, lo que demuestra la unicidad de la representación de la base.

![Untitled](Images/Dependencia%20e%20independencia%20lineal/Untitled%2012.png) 
![Untitled](Images/Dependencia%20e%20independencia%20lineal/Untitled%2013.png)
![Untitled](Images/Dependencia%20e%20independencia%20lineal/Untitled%2014.png)
    
## Dimensión de un espacio vectorial
La dimensión de un espacio vectorial es el número de vectores en cualquier base de ese espacio vectorial. La dimensión se denota por $dim(V)$. Todos los vectores en $V$ pueden ser expresados como una combinación lineal de los vectores de la base, y cualquier conjunto de más de $dim(V)$ vectores en $V$ es linealmente dependiente. Por lo tanto, la dimensión de un espacio vectorial es una medida de la cantidad de información necesaria para describir cualquier vector en el espacio.

La dimensión de un espacio vectorial es un concepto fundamental en álgebra lineal y se utiliza para describir y analizar una amplia variedad de problemas en matemáticas, física, ingeniería y otras disciplinas. La dimensión de un espacio vectorial puede ser finita o infinita, dependiendo del número de vectores en cualquier base del espacio. Por ejemplo, el espacio vectorial de los números reales tiene dimensión infinita, mientras que el espacio vectorial de las matrices cuadradas de orden $n$ tiene dimensión $n^2$.

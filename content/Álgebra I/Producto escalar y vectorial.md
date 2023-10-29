Course: [[Algebra I]]

Date: February 12, 2023 5:18 PM
Status: Done
Year: 2021

- Definición de **producto escalar en R^2**
    El producto escalar en $\mathbb{R}^2$ es una operación que se realiza entre dos vectores de dos dimensiones y que produce un número real como resultado. Formalmente, si $\vec{u} = \begin{pmatrix} u_1 \\ u_2 \end{pmatrix}$ y $\vec{v} = \begin{pmatrix} v_1 \\ v_2 \end{pmatrix}$ son dos vectores en $\mathbb{R}^2$, entonces el producto escalar de $\vec{u}$ y $\vec{v}$, denotado por $\vec{u} \cdot \vec{v}$, se calcula como sigue:

$$\vec{u} \cdot \vec{v} = u_1 v_1 + u_2 v_2$$


- Definición de **producto escalar en R^3**
    El producto escalar en $\mathbb{R}^3$ es una operación que se realiza entre dos vectores de tres dimensiones y que produce un número real como resultado. Formalmente, si $\vec{u} = \begin{pmatrix} u_1 \\ u_2 \\ u_3 \end{pmatrix}$ y $\vec{v} = \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix}$ son dos vectores en $\mathbb{R}^3$, entonces el producto escalar de $\vec{u}$ y $\vec{v}$, denotado por $\vec{u} \cdot \vec{v}$, se calcula como sigue:$$\vec{u} \cdot \vec{v} = u_1 v_1 + u_2 v_2 + u_3 v_3$$

- **Propiedades** del producto escalar
	- **Conmutatividad:** El producto escalar es conmutativo, es decir, $\vec{u} \cdot \vec{v} = \vec{v} \cdot \vec{u}$ para cualquier par de vectores $\vec{u}$ y $\vec{v}$ en $\mathbb{R}^2$ o $\mathbb{R}^3$.
	- **Distributividad del producto escalar respecto a la suma de vectores:** El producto escalar es distributivo respecto a la suma de vectores, es decir, $\vec{u} \cdot (\vec{v} + \vec{w}) = \vec{u} \cdot \vec{v} + \vec{u} \cdot \vec{w}$ para cualquier terna de vectores $\vec{u}$, $\vec{v}$ y $\vec{w}$ en $\mathbb{R}^2$ o $\mathbb{R}^3$.
	- **Distributividad del producto escalar respecto al producto por un escalar:** El producto escalar es distributivo respecto al producto de un vector por un escalar, es decir, $(k\vec{u}) \cdot \vec{v} = k(\vec{u} \cdot \vec{v})$ para cualquier vector $\vec{u}$ y $\vec{v}$ en $\mathbb{R}^2$ o $\mathbb{R}^3$ y cualquier escalar $k$.
	- **Propiedad de la norma:** El producto escalar de un vector consigo mismo es igual al cuadrado de su norma, es decir, $\vec{u} \cdot \vec{u} = |\vec{u}|^2$ para cualquier vector $\vec{u}$ en $\mathbb{R}^2$ o $\mathbb{R}^3$.
	- **Propiedad del ángulo:** El producto escalar de dos vectores es igual al producto de sus normas por el coseno del ángulo que forman, es decir, $\vec{u} \cdot \vec{v} = |\vec{u}| |\vec{v}| \cos \theta$ para cualquier par de vectores $\vec{u}$ y $\vec{v}$ en $\mathbb{R}^2$ o $\mathbb{R}^3$, donde $\theta$ es el ángulo que forman.

    
- Teorema **Desigualdad de Cauchy- Schwarz (sin demostración)**
    La desigualdad de Cauchy-Schwarz es un teorema fundamental en el álgebra lineal que establece una relación entre el producto escalar y la norma de dos vectores. La desigualdad de Cauchy-Schwarz establece que para cualquier par de vectores $\vec{u}$ y $\vec{v}$ en $\mathbb{R}^n$, se cumple que:$$|\vec{u} \cdot \vec{v}| \leq \|\vec{u}\| \|\vec{v}\|$$donde $\|\vec{u}\|$ y $\|\vec{v}\|$ son las normas de los vectores $\vec{u}$ y $\vec{v}$, respectivamente, y $\vec{u} \cdot \vec{v}$ es el producto escalar de los vectores $\vec{u}$ y $\vec{v}$.


    
- Definición de **vectores perpendiculares**
    Dos vectores en $\mathbb{R}^n$ se dicen perpendiculares si forman un ángulo de 90 grados entre sí. Esto significa que el producto escalar de los dos vectores es igual a cero. Formalmente, si $\vec{u}$ y $\vec{v}$ son dos vectores en $\mathbb{R}^n$, entonces se dice que $\vec{u}$ y $\vec{v}$ son perpendiculares si y solo si:$$\vec{u} \cdot \vec{v} = 0$$

  
- Definición **ángulo entre vectores**
    El ángulo entre dos vectores en $\mathbb{R}^n$ se define como el ángulo formado por los dos vectores en un espacio euclidiano. Formalmente, si $\vec{u}$ y $\vec{v}$ son dos vectores en $\mathbb{R}^n$, entonces el ángulo $\theta$ entre $\vec{u}$ y $\vec{v}$ se calcula como sigue:$$\cos \theta = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\| \|\vec{v}\|}$$donde $\vec{u} \cdot \vec{v}$ es el producto escalar de los vectores $\vec{u}$ y $\vec{v}$, y $\|\vec{u}\|$ y $\|\vec{v}\|$ son las normas de los vectores $\vec{u}$ y $\vec{v}$, respectivamente.

    
- Definición de **distancia**
    La distancia entre dos vectores en $\mathbb{R}^n$ se define como la longitud del vector que une los dos vectores. Formalmente, si $\vec{u}$ y $\vec{v}$ son dos vectores en $\mathbb{R}^n$, entonces la distancia $d(\vec{u},\vec{v})$ entre $\vec{u}$ y $\vec{v}$ se calcula como sigue:$$d(\vec{u},\vec{v}) = \|\vec{u} - \vec{v}\|$$donde $\|\vec{u} - \vec{v}\|$ es la norma del vector diferencia $\vec{u} - \vec{v}$.


- Definición de producto vectorial
	El producto vectorial es una operación que se realiza entre dos vectores en $\mathbb{R}^3$ y que produce un tercer vector que es perpendicular a los dos vectores originales. Formalmente, si $\vec{u} = \begin{pmatrix} u_1 \\ u_2 \\ u_3 \end{pmatrix}$ y $\vec{v} = \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix}$ son dos vectores en $\mathbb{R}^3$, entonces el producto vectorial de $\vec{u}$ y $\vec{v}$, denotado por $\vec{u} \times \vec{v}$, se calcula como sigue:	$$\vec{u} \times \vec{v} = \begin{pmatrix} u_2 v_3 - u_3 v_2 \\ u_3 v_1 - u_1 v_3 \\ u_1 v_2 - u_2 v_1 \end{pmatrix}$$


- Propiedades del producto vectorial    ![Untitled](Images/Producto%20escalar%20y%20vectorial/Untitled%2012.png)
- Demostración de las propiedades del producto vectorial    ![Untitled](Images/Producto%20escalar%20y%20vectorial/Untitled%2013.png)![Untitled](Images/Producto%20escalar%20y%20vectorial/Untitled%2014.png)![Untitled | 300](Images/Producto%20escalar%20y%20vectorial/Untitled%2015.png)

- Definición de producto mixto
    
    ![Untitled](Images/Producto%20escalar%20y%20vectorial/Untitled%2017.png)
    
- Propiedades del producto mixto + demostración
    
    ![Untitled](Images/Producto%20escalar%20y%20vectorial/Untitled%2018.png)
    
    ![Untitled](Images/Producto%20escalar%20y%20vectorial/Untitled%2019.png)
    
- Propiedad geométrica del producto mixto
    
    ![Untitled](Images/Producto%20escalar%20y%20vectorial/Untitled%2020.png)
    
- Definición de proyección vectorial ortogonal
    
    ![Untitled](Images/Producto%20escalar%20y%20vectorial/Untitled%2021.png)
    
- Definición de proyección escalar
    
    ![Untitled](Images/Producto%20escalar%20y%20vectorial/Untitled%2022.png)
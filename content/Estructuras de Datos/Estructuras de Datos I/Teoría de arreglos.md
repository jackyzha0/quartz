# Teoría de arreglos

- Date:: [[]]
- Course:: [[Estructuras de Datos I]]
- Source:: [[Algoritmos y Arreglos]]

## Arreglos

-   Qué es un **arreglo**? ↓
        -   Es un conjunto de pares (índice, valor) donde para cada índice dado existe un valor asociado a dicho índice (mapeo).
        -   Dicho conjunto de pares se encuentran almacenados en espacios contiguos de memoria
        -   Las operaciones básicas de un arreglo son:
            -   Encontrar (arreglo, índice) ⇒ valor
            -   Almacenar (arreglo, índice, valor) ⇒arreglo
-   Qué es una **lista ordenada** o **lista lineal**? ↓
	-   Una lista ordenada es aquella donde la única relación establecida entre los elementos de lista es la de precedencia. Es decir, hay un criterio que establece el orden de la misma.
-   Qué es una **matriz**? ↓
	-   Una matriz es una arreglo bidimensional (mxn) donde cada elemento de la estructura está identificado por un número de fila y columna.
	-   A pesar de ser bidimensional, la memoria del ordenador es unidimensional, por lo tanto se almacenará de dicha forma.
-   Qué es una **matriz sparce**? Cuál es el modelo de estructura propuesto? ↓
	-   Una matriz sparce es aquella que posee una gran cantidad de ceros entre sus elementos.
	-   Se propone como solución más eficiente una matriz M(0:t,1:3) compuesto por las tuplas (i, j , valor)
		-   Además la primera fila contendrá (n_filas, n_columnas, n_elementos_nonulos)
-   Cómo se representan las **dimensiones de un arreglo**
	- $A(l_1:u_1,l_2:u_2,\dots,l_n:u_n)$
-   Cálculo de la **cantidad** **máxima de elementos** en un arreglo de n dimensiones ↓
	-   $$\prod_{i=1}^{n}(u_i-l_i+1)$$
-   Almacenamiento de un **vector en memoria** ↓
	    ![https://remnote-user-data.s3.amazonaws.com/a9nebHQpO4L8QFQxOB6G8C7JPRrzvYebAqXHWUjADnS5pU1Z84uVu34JycCS_Sn7p-QWHCW50Av_T9GEauGZZ5Xfkgg62Bn_wSDCFYYdr6IGiDJq2Cg_QWebOXO1gt9l.png](https://remnote-user-data.s3.amazonaws.com/a9nebHQpO4L8QFQxOB6G8C7JPRrzvYebAqXHWUjADnS5pU1Z84uVu34JycCS_Sn7p-QWHCW50Av_T9GEauGZZ5Xfkgg62Bn_wSDCFYYdr6IGiDJq2Cg_QWebOXO1gt9l.png)
-   Almacenamiento de una **matriz en memoria** ↓
	![https://remnote-user-data.s3.amazonaws.com/5vRHB350iTGg_xodRdlp2t0Z9FO83G4TAomY6pv5feqWxjNKNd2oOAQ0fo5IPOHU4KlOVh5t7ygVZarxOxAnHUtWtyAAm5ToKZC7_auaQ74rhqof0hvUrScCXhi-c5FD.png](https://remnote-user-data.s3.amazonaws.com/5vRHB350iTGg_xodRdlp2t0Z9FO83G4TAomY6pv5feqWxjNKNd2oOAQ0fo5IPOHU4KlOVh5t7ygVZarxOxAnHUtWtyAAm5ToKZC7_auaQ74rhqof0hvUrScCXhi-c5FD.png)
-   Almacenamiento de un **tensor en memoria** ↓
	![[Pasted image 20230219142210.png]]

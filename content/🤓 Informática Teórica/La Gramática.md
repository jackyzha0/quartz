# La Gramática

- Date:: [[2023-03-23]]
- Course:: [[Informática Teórica]]
- Source:: [[]]

#main_page 

Definición de gramática
?
- Gramática = Regla de construcción
	- Describe la estructura de las frases y de las palabras de un lenguaje y se aplica igual a 
		- las lenguas naturales humanas
		- Lenguajes de programación

## Definición formal de gramática
?
$$G=(V_n;V_t;P;S)$$
- Conjunto de 4 elementos
	- **Alfabeto de símbolos terminales ($V_t$):**
		- Conjunto con los cuales contruyo las palabras de mi lenguaje
		- Todas las cadenas del lenguaje representado por la letra G, y están formadas por símbolos del alfabeto
		- <mark style="background: #FFF3A3A6;">El alfabeto siempre va a estar formado por símbolos terminales.</mark>
	- **Alfabeto de símbolos no terminales ($V_n$):** 
		- Junto con las reglas de producción nos permite llegar a las palabras terminales
		- Conjunto de símbolos auxiliares introducidos como elementos auxiliares para la definición de G pero no figuran en las cadenas de G
	- **S: Axioma o variable inicial (S)**
		- Es una símbolo NT a partir del que se comienzan a aplicar las reglas de P
	- **P: [[Producción o reglas gramaticales]] (P)**
		- Conjunto de reglas de producción
		- $P$ es finito y $P\subset (V^+ - Vt*)\times V^*$ siendo $V=V\cap Vt$
			- En vez de $(a;b)$, se escriben $a\rightarrow b$ y se lee "a produce b"
- Para la definición de la validez de un lenguaje, utilizamos expresiones regulares.

## Definición de Gramáticas equivalentes
?
- Son las gramáticas que generan el mismo lenguaje


>[!info] Summary
>



## Questions




## References



 # Expresiones Regulares

- Date:: [[2023-03-30]]
- Course:: [[Informática Teórica]]
- Source:: [[La Gramática]]

#infoteo/gramatica 

**Qué son las expresiones regulares?**
?
- Es una forma declarativa para expresar las cadenas que deseamos aceptar. 
- Sirven como lenguaje de entrada de muchos sistemas que procesan cadenas.

- Ejercicios prácticos
	**Ejercicio 1**: La ER cuyas palabras están formadas por las letras del $\Sigma=\{a,b\}$ y termina en "b"$$(a+b)^*b$$
	**Ejercicio 2** La ER del lenguaje cuyas palabras están formadas por el alfabeto {a,b}, que tienen longitud > a 2, la 2da letra es "a" y la antepenúltima es "b"$$(a+b)a(a+b)^*b(a+b)$$
	**Ejercicio 3** La ER del lenguaje cuyas palabras estan formadas por las letras {a,b} y están formadas por 3 o más letras "b" seguidas de una única "a" $$bbbb^*a$$
	**Ejercicio 4:** Dada la siguiente ER de un lenguaje $(a+b)^*bb(a+b)a^*$
	- Las palabras de menor longitud bba, bbb


**De qué depende que un lenguaje sea regular?**
?
![[Pasted image 20230413174954.png | 400]]


**Qué es un pozo o sumidero?**
?
- Cuando se ingresa un símbolo terminal que no está contemplado en la transición, irá a un pozo o sumidero![[Pasted image 20230413175444.png | 400]]

**Cuáles son las reglas que me permiten obtener la expresión regular a partir de un autómata?**
?
![[Pasted image 20230413180159.png | 400]]
![[Pasted image 20230413180216.png | 400]]
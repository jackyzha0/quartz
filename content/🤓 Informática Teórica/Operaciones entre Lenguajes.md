# Operaciones entre Lenguajes

- Date:: [[2023-03-23]]
- Course:: [[Informática Teórica]]
- Source:: [[Lenguajes y lenguajes formales]]

#infoteo/lenguajes 

## Definición de unión de lenguajes
?
- La unión de dos lenguajes $L_1$ y $L_2$ da como resultado otro lenguaje que contiene todas las palabras de $L_1$ y todas las palabras de $L_2$
- $$L_1 \cup L_2 = \{xy/x\in L_1 \space \text{ó} \space y\in L_2\}$$
- $L_1\cup L_2 = L_1 + L_2$ 

## Definición de concatenación de lenguajes
?
- Sean $L_1$ y $L_2$ sobre el mismo alfabeto $W(\Sigma)$ se llama concatenación o producto de dos lenguajes: $$L_1 \cdot L_2 = \{xy/x\in L_1 \wedge y\in L_2\}$$
- Es el conjunto de palabras formadas por la concatenación de cada palabra 
- Propiedades
	- Operación cerrada
	- Propiedad asociativa
	- Con elemento neutro
	- Distributiva respecto a la unión

## Definición de binoide Libre
?
- Esta vinculada con la propiedad asociativa, y el elemento neutro
- La concatenación (monoide) de lenguajes y la unión (monoide) de lenguajes constituyen un **binoide**
	- Concatenación y unión
- Los símbolos de $\Sigma$ se pueden considerar conjuntos de una sola palabra
- Con la unión y concatenación, se puede formar cualquier lenguaje del alfabeto.

- Con el alfabeto $\Sigma$ es un conjunto de generadores para el conjunto
	- L es el BINOIDE LIBRE (operaciónes U y *) generado por $\Sigma$
- <mark style="background: #FFF3A3A6;">Es una operación conceptual, no hay ejemplos en el curso	</mark>

## Definición de potencia de un lenguaje
?
- Es la reducción de la concatenación a los casos que se refueren a un mismo lenguaje$$L^i=L\cdot L\cdot L\cdot L\cdot ; \text{  i veces}$$
- Es el resultado de concatenar dicho lenguaje consigo mismo i-veces.

## Definición de Clausura o Cierre Positivo
?
- Se representa como $L^{+}$ y es el lenguaje obtenido uniendo el lenguaje L con todas sus potencias posibles excepto 0$$\Sigma^{+}=\bigcup^\infty_{i=1}\Sigma^i=W(\Sigma)-\{\lambda\}$$
- Resultado de unir todas las potencias de dicho lenguaje, excepto la potencia 0$$L^{+}=L_1\cup L_2\cup L_3\cup \dots$$

## Definición de Iteración, clausula o cierre
?
- Se representa como $L^*$ y es el lenguaje obtenido uniendo el lenguaje $L$ con todas sus potencias posibles$$\Sigma^{**}=\bigcup^\infty_{i=0}L^i$$
- Como L es el lenguaje sobre  $\Sigma$, se le pued aplicar * $$\Sigma^* = W(\Sigma)$$
- El lenguaje universal es $\Sigma^{*}$

## Definición de Reflexión del Lenguaje
?
- Se llama lenguaje reflejo o inverso de L  se representa por $L^{-1}$ $$L^{-1}=\{x^{-1}|x\in L\}$$
	- Es el lenguaje formado por todas las palabras reflejas de L




## References
- https://seo.unsta.edu.ar/mod/resource/view.php?id=74944

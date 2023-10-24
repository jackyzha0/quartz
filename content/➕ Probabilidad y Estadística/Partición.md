# Partición

- Date:: [[2023-04-05]]
- Course:: [[Probabilidad y Estadística]]
- Source:: [[Probabilidad condicional]]

## Definición de partición
?
>[!quote] Definición de Partición
>Decimos que los eventos $A_1, A_2, \dots, A_k$ representan una partición del espacio muestral $S$ si:
>
>1. $A_i\cap A_j = \theta$ para todo $i\neq j$
>2. $\bigcup_{i=1}^k A_j = S$
>3. $P(A_i)>0$ para todo $i$
>
>En otras palabras, cuando se efectúa un experimento $\epsilon$, ocurre uno y solo uno de los eventos de $A_i$

## Teorema de la Probabilidad Total
?
- Si $A_1, A_2, \dots, A_n$ representan una partición del espacio muestral $S$, con $P(A_i)\neq 0$ para todo $i=1,2,3,\dots,n$ entonces para cualquier evento $B$
$$ P(B)=\sum_{i=1}^n P(A_i)P(B|A_i)$$
![[Pasted image 20230405202923.png | center | 400]]

Caracterice la utilidad del Teorema de la probabilidad TOTAL
?
- Representa una relación muy útil, ya que cuando se busca $P(B)$ frecuentemente puede ser muy difícil calcularlo de manera directa. Sin embargo con la información adicional de que $A_i$ ha ocurrido, podemos calcular $P(B|A_i)$ y entonces usar la fórmula anterior. 

Ej 12: Cierto artículo se manufactura en tres fábricas, digamos 1, 2 y 3. Se sabe que la primera produce el doble de artículos que la segunda y que ésta última y la tercera producen el mismo número de artículos. Se sabe que tanto la primera como la segunda fábrica producen un 2% de artículos defectuosos, mientras que el 4% de los manufacturados por la tercera fábrica es defectuoso. Se juntan todos los artículos  
producidos y se elige uno al azar. ¿Cuál es la probabilidad de  que sea defectuoso?.
![[Pasted image 20230412174955.png]]


## Flashcards
#estadistica/probabilidad_condicional 
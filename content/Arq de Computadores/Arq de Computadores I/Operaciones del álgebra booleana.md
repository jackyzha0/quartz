# Operaciones del álgebra booleana

%%
Date:: [[2023-04-10]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Sistemas Digitales]]
%%



Cuáles son las operaciones básicas del algebra booleana?
?
## Operaciones del algebra booleana
- Operación OR (+) $Q=A + B$
	- Si una de las entradas es 1, entonces la salida es 1.
	- Compuerta OR![[Pasted image 20230410172112.png | center | 400]]
- Operación AND (.) $Q=A\cdot B$
	- Si una de las entradas es 0, entonces la salida es 0.
	- Compuerta AND ![[Pasted image 20230410172205.png | center | 400]]
- Operación NOT ($\bar{x}$) $Q=\bar{Q}$
	- La salida es la negación de la entrada
	- Compuerta NOT ![[Pasted image 20230410172328.png | center | 400]]
- Compuesta NAND $Q=\bar{AB}$
	- Cuando las dos entradas estén en estado alto la salida estará en estado bajo. Como resultado de la negación de una AND.![[Pasted image 20230410181954.png | center | 400]]
- Compuerta NOR $Q=\bar{A+B}$
	- cuando las dos entradas estén estado bajo la salida estará en estado alto. Esencialmente una OR negada.![[Pasted image 20230410182022.png | center | 400]]
- Compuesta XOR $Q=A \bigoplus B$
	- Cuando una de las dos entradas se encuentre en estado alto. Igualmente, la salida de una XOR negada.![[Pasted image 20230410182117.png | center | 400]]
- Compuerta XNOR (nor exclusivo)
	- cuando una de las dos entradas se encuentre en estado alto. Igualmente, la salida de una XOR negada. ![[Pasted image 20230410183057.png | center | 400]]
## Postulados de identidad
- $0+x=x$
- $1\times x = x$

## Propiedad conmutativa
- $x+y = y+x$
- $xy=yx$

## Axiomas de complemento
- $x\bar{x} = 0$
- $x+\bar{x} = 1$

## Teorema de idempotencia
- $xx=x$
- $x+x = x$

## Teorema de elementos dominantes
- $x\times 0 = 0$
- $x+1 = 1$

## Propiedad distributiva
- $x(y+z) = xy + xz$
- $x+ yz = (x+y)(x+z)$

## Ley involutiva
- $\bar{(\bar{x})}=x$

## Teorema de absorción
- $x+xy= x$
- $x(x+y)=x$

## Teorema del consenso
- $x+\bar{x}y= x+y$
- $x(\bar{x}+y)=xy$

## Teorema asociativo
- $x+(y+z)= (x+y) + z$
- $x(yz)=(xy)z$

Cuales son las leyes de De Morgan?
?
## Leyes de De Morgan
- $\bar{(x+y)}= \bar{x}\bar{y}$
	![[Pasted image 20230410183946.png | 400]]
	![[Pasted image 20230410184050.png | 400]]
- $\bar{xy}=\bar{x}+\bar{y}$
	![[Pasted image 20230410183853.png | 400]]
	![[Pasted image 20230410184117.png | 400]]


___
## Flashcards
#arqcompu/sistemas_digitales 
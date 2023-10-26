# Circuitos aritméticos

%%
Date:: [[2023-04-17]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Sistemas Digitales]]
%%

## 1.  Adición Binaria
Recordar que cuando sumamos dos números binarios, tendremos un acarreo que se pasa al siguiente dígito.
![[Pasted image 20230417185025.png | 400]]

## 1.1 Suma de dos bits
- La suma anterior representada mediante compuertas lógicas será la siguiente.
![[Pasted image 20230417185150.png]]
![[Pasted image 20230418222311.png]]
Para sumar dos números binarios (ya no son bits), necesitamos de algo que tenga en consideración el acarreo.
![[Pasted image 20230417185253.png]]
![[Pasted image 20230418222337.png]]

## 2. Sustracción binaria
- Para realizar la sustracción binaria, lo que hacemos es sumar el complemento a 2 del número (es como si sumaramos el negativo de un número)
	- El complemento a 2 se calcula
		- Calculamos el complemento a 1 (cambiamos todos los ceros por unos, y viceversa)
		- Al complemento a 1 le sumamos 1


___
## Flashcards
# Memorias

%%
Date:: [[2023-04-28]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[]]
#main_page 
%%

## Celdas de Memorias
- Son módulos conformados por un conjunto de compuertas agrupados de tal forma que almacenan varias palabras binarias de n bits.
- Cada una de ellas tienen la capacidad de almacenar un bit de información (1 o 0)
- Se ubican mediante la fila y la columna en la que se encuentran.

- Fallos de hard (permanentes): Se rompió la celda, etc
	- Son los más fáciles de detectar, pero a la vez son imposibles de corregir.
- Fallos transitorios o ocasionales
	- Se los puede detectar y corregir 

## Errores en la escritura
![[Pasted image 20230529174456.png]]
- Puede ser errores de hardware o software (los de software son más dificiles de detectar)
- Una entrada de datos genera un código que tiene una referencia 1-1 con la palabra
	- Por un lado guardo la palabra de m bits, y por otro lado guardo la memoria de k bits (f es el codificador)
- Al momento de leer, guardo la palabra y guardo los códigos. La palabra vuelve a generar un código, que va a ser comparado con el código original 
- Si no puedo corregir (error de hardware), se indicará que hay error y no lo puede corregir. Si lo puede corregir, lo lee y lo corrige
	- El algoritmo de **Hamming**


___
## Flashcards
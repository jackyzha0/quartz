# Máquina de Turing

%%
Date:: [[2023-06-01]]
Course:: [[Informática Teórica]]
Source:: [[]]
#main_page 
%%

- Presentada por Alan Turing en 1936.
- Uno de los mayores aportes en el campo de las ciencias de la computación.

## Qué es una Máquina de Turing?
- Modelo matemático que consiste en un autómata que es capaz de implementar cualquier algoritmo
- Reconoce cualquier lenguaje 
- Consta de un cabezal de lectura/escritura y una cinta de celdas en el que el cabezal lee el contenido.
	- Revisa si hay alguna instrucción para modificar el contenido, borra el contenido anterior y escribe un nuevo valor.
	- Avanza hacia la derecha o hacia la izquierda. ![[Pasted image 20230601183930.png]]

>[!important] Definición formal de Máquina de Turing
>$$M=(Q\Sigma,T,s,b,F,\delta)$$
>donde
> - $Q$ es el conjunto finito de estados que denotaremos $q_0, q_1, \dots$
> - $\Sigma$ es el alfabeto: conjunto finito de símbolos distinto del espacio en blanco, denominado alfabeto de máquina o de entrada.
> - $T$ es el conjunto de símbolos de cinta. El alfabeto es un subconjunto de $T$
> - $s\in Q$ es el estado inicial: es el estado en el que se encuentra inicialmente la MT
> - $b\in T$ es un elemento denominado símbolo en blanco. Se encuentra en todas las casillas de la cinta que no tiene un símbolo de entrada.
> - $F\subseteq Q$ es el conjunto de estados finales de aceptación
> - $\delta:Q\times T\times \{L,R\}$ es una función parcial denominado función de transición, donde L es un movimiento a la izquierda y R es el movimiento hacia la derecha.



# Autómatas Finitos

%%
Date:: [[2023-04-13]]
Course:: [[Informática Teórica]]
Source:: [[Lenguajes y lenguajes formales]]
#infoteo/lenguajes 
%%


**Qué es un autómata finito?**
?
- Modelado gráfico de una máquina abstracta que permite representar una serie de acciones o eventos y de estados.
- Modelan sistemas discretos o abstracciones de la realidad.
- Poseen una forma de grafo dirigido
- Siempre existe un solo estado inicial, uno o más estados finales, y 0 o más estados intermedios.
	- Al terminar de avaluar la palabra, se debe haber llegado a un estado final, para se considerada legal.

**Cuál es la definición formal de autómata?**
?
>[!quote] Definición formal de Autómata
>Es una máquina M formada por 5 elementos $M=(\Sigma, Q, s, F, \delta)$
> - $\Sigma$ es un alfabeto de entrada
> - $Q$ es un conjunto finito de estados
> - $s$ es el estado inicial
> - $F$ es un conjunto de estados finales o de aceptación
> - $\delta$ es una relación de transición

**Cuáles son los elementos de un autómata finito?**
?
- Estados (representados por nodos): alguna situación en la que se permanece un cierto tiempo.
	- Son los símbolos no terminales
- Transiciones o eventos: situaciones instantáneas que marcan un cambio de un estado a otro.
	- Son los símbolos terminales
- Trayectoria: Camino recorrido por el autómata.

**Cuál es el propósito de los autómatas?**
?
- El propósito en estos modelos de estados y eventos, es el reconocer secuencias de acciones legales o inválidas

**Qué tipos de autómatas finitos existen?**
?
1. Autómata finito determinista (AFD)
	- Donde $\delta$ es una función de transición, es decir, que para cada par (estado actual y símbolo de entrada) le corresponde un único estado siguiente. 
2. Autómata finito no determinista (AFND)
	- Donde $\delta$ no es necesariamente una función de transición
		- Para cada par (estado actual y símbolo de entrada) le corresponde cero, uno dos o más estados siguientes. Normalmente la relación de transición se denota $\Delta$

**Cómo se relaciona una tabla de transición con una representación en grafo?**
?
![[Pasted image 20230413173731.png | 400]]


___
## Flashcards

# Maquinas de Estado

%%
Date:: [[2023-04-27]]
Course:: [[Informática Teórica]]
Source:: [[]]
#main_page 
#infoteo/maq_estado 
%%


Qué es una máquina de estado finito MEF?
?
## Máquina de estado finito M
Es un instrumento con un número finito de estados posibles, donde un estado es la característica y memoria interna de la máquina en un posible momento determinado. Al procesar una entrada, la máquina cambio o no de estado.
- Terna de un conjunto finito de 
	- Q: Estados
	- $\Sigma$: Alfabeto
	- $\delta$: Estados
- Las máquinas de estado posee un clock, que va controlando el paso de los distintos estados.
- Circuito secuencial con un comportamiento reflejado en diferentes estados.
- Dependiendo de las entradas y de su estado inicial, se da su comportamiento.

Qué es el estado en una máquina de estado?
?
- Situación particular en la que se encuentra ME
- Podrá cambiar de estados dependiendo de las entradas y del estado actual en el que se encuentre 
- Podrá estar gobernado por una señal de reloj (clock)
- Podrá disponer de salidas (que especifican su propósito)

Qué son los autómatas sin salida AF M?
?
- $M=(Q,\Sigma, \Gamma, q_0, \delta, \omega)$
	- Q es el conjunto de estados.
	- $\Sigma$ es el alfabeto del lenguaje.
	- $q_0$ es el estado inicial.
	- $\delta$ es la función de transición.
	- $F$ es el conjunto de estados de aceptación.


Qué son los autómatas con salida AF S?
?
- $S=(Q,\Sigma, \Gamma, q_0, \delta, \omega)$
	- Q es el conjunto de estados.
	- $\Sigma$ es el alfabeto del lenguaje.
	- $q_0$ es el estado inicial.
	- $\delta$ es la función de transición.
	- $\omega$ es la función de salida

## Clasificación de autómatas con salida

Qué es la máquina de Moore?
?
- Máquina de Moore
	- Cada estado posee un valor de salida específico (cada símbolo de salida estará asociado a un **alfabeto de salida**) 
	- ![[Pasted image 20230503142723.png | 400]]Q
	- $$\omega:Q\rightarrow \Gamma$$

Qué es la máquina de Mealy?
?
- Maquina de Mealy
	- Cada transición tiene asociada un valor de salida (cada símbolo de salida estará asociado a un **alfabeto de salida**)
	- ![[Pasted image 20230503142821.png | 400]]
	- $$\omega: Q\times \Sigma \rightarrow \Gamma$$

Cómo se caracteriza la máquina de estados de Moore?
?
- La lógica de pasaje de un estado a otro se llama lógica combinacional. 
- La salida solo depende de los estados.
- Su cambio sólo estará determinado por la señal del reloj.
![[Pasted image 20230504170412.png | 400]]



Diferencias entre la máquina de Mealy y la máquina de Moore.
?
![[Pasted image 20230503142918.png]]

Cómo se definen las equivalencias de  Moore-Mealy?
?
- Estos dos tipos de máquinas poseen sus equivalencias entre sí.
![[Pasted image 20230504170041.png | 500]]
![[Pasted image 20230504170116.png | 500]]
- La equivalencia Moore-Mealy es mucho más sencilla que la de Mealy-Moore.


Qué es un diagrama de estados?
?
- Resume el comportamiento del circuito. 
- Representa los estados, las transiciones entre estados y las entradas y salidas.


Cuáles son los requerimientos de detector de secuencia?
?
- Tiene una entrada w y una salida z.
- Ocurren cada vez que ocurre un flanco de subida en la señal de reloj.
- La salida será 1 si es que durante dos ciclos consecutivos de la señal de reloj previos la entrada ha sido 1.Caso contrario la salida será 0









___
## Flashcards
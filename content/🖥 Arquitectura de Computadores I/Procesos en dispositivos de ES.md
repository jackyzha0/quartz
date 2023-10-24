# Procesos en dispositivos de ES

%%
Date:: [[2023-08-24]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Dispositivos Externos]]
%%

![[Pasted image 20230810171247.png]]

## Tipos de procesos de un módulo de e/s
Cuando se diseña la máquina, se determina con cuál se va a utilizar 
1. <mark style="background: #FFF3A3A6;">Instrucción programada</mark>
	- No se programa la E/S. Determinamos un proceso de E/S de datos.
	- El CPU trabaja directamente con el módulo de E/S, y el CPU pasa a ser el administrador del dispositivo de E/S
	- Pasos que realiza
		1.  El CPU envía una señal de request al dispositivo a través del módulo (el módulo es transparente con el dispositivo). Pregunta si está en condiciones de ser usado. Devuelve SI o NO
		2. Envía solicitud de uso. El dispositivo de E/S lo acepta
		3. El Se transfieren los datos que se necesiten.
	- Contras
		- Es altamente ineficiente. El CPU pierde tiempo realizando una tarea boba.
	- **Señales que se le puede solicitar al módulo**
		- Señales de control. Para activar el periférico e indicarle que hacer
		- Test. Comprobar condiciones de estado asociadas con el módulo de E/S y sus periféricos.
		- Lectura. El módulo capta un dato de un periférico y lo sitúa en un buffer interno. 
		- Escritura. Hace que el módulo de E/S capte un dato del bus de datos y posteriormente lo transmita al periféricos.
2. <mark style="background: #FFF3A3A6;">Instrucción mediante interrupciones</mark>
	- El módulo ya no es transparente, interactua, pero cada vez que recibe una señal del dispositivo y envía una señal de interrupción al CPU.
		- La CPU es interrumpida una vez termina una tarea.
		- Pierde tiempo chequeando luego de cada tarea si posee una interrupción
		- Tanto en la programada como en el de las interrupciones, la CPU se encarga de la ejecución
3. <mark style="background: #FFF3A3A6;">Acceso directo a memoria (DMA)</mark> [[DMA]]
	- Un módulo que se dedica a realizar las transferencias
	- Si la CPU necesita realizar alguna tarea, delega al módulo la lectura de cierta información (tanto si ingresa como si sale).
	- Especifica al DMA 
		- Con qué módulo va a trabajar
		- Con qué dispositivo de E/S
		- Dirección de inicio del dato
		- Carga de datos (a partir de cierta dirección de inicio)
	- La carga del CPU es mucho menor, pero el DMA es un módulo a parte. Es el que al final termina administrando el módulo o los módulos de E/S
		- Va a realizar tooooda la comunicación con el módulo de E/S
		- El módulo sigue siendo el que administra la interfaz con el dispositivo, el DMA no lo puentea. 

![[Pasted image 20230824165021.png | center | 400]]


## Secuenciamiento de ejecución
![[Pasted image 20230824170139.png]]
![[Pasted image 20230824170127.png]]
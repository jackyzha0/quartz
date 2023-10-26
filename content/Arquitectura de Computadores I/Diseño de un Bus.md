# Diseño de un Bus

%%
Date:: [[2023-05-19]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Estructuras de interconexión]]
%%


## Tipos de buses
- Dedicado
	- Está asignada de forma permanente a una función o subconjunto físico de componentes del computador.
	- Tienen lineas separadas para direcciones y para datos.
- Multiplexado
	- Una misma línea de bus se puede utilizar para distintos tipos de transferencias.
	- Se requieren menos lineas, para ahorrar espacios y costes. Pero necesita una circuitería más compleja.

## Métodos de arbitraje
En un instante del tiempo, más de un módulo puede necesitar el control de un bus. Para ello, se utiliza un método de arbitraje.
- Centralizado
	- Un único dispositivo hardware (controlador del bus o árbitro) es responsable de asignar tiempos en el bus.
	- Puede estar en un módulo separado o ser parte del procesador.
- Distribuido
	- Existe un mayor retardo, porque los módulos tienen que negociar entre ellos quién va a manejar el camino de comunicación. Quien de ellos va a manejar el acceso.
	- se designa un dispositivo (procesador o módulo) como maestro del bus. El maestro podría entonces iniciar una transferencia de datos con otro dispositivo (que actúa como esclavo)

## Temporización
Hace referencia a la forma en la que se coordinan los eventos en el bus.
- Síncrono
	- La presencia de un evento en el bus está determinada por un reloj.
		- El bus incluye una línea de reloj a través de la cual se transmite una secuencia en la que se alternan intervalos regulares de igual duración a uno y cero (marca un ritmo).
	- Un ciclo de reloj define un intervalo de tiempo unidad.
	- Se utilizan los flancos de subida o de bajada para dar inicio a determinadas instrucciones.
- Asíncrono
	- La presencia de un evento en el bus es consecuencia y depende de que se produzca un evento previo.

## Anchura del bus
Afecta a las prestaciones del sistema. Cuánto más ancho es el bus de datos, mayor es el número de bits que transmiten a la vez

## Tipo de transferencia de datos
![[Pasted image 20230519170534.png]]


# Bus PCI

%%
Date:: [[2023-05-22]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Estructuras de interconexión]]
%%

## Peripheral Component Interconnect
- Qué es el bus PCI?
	- Es un bus de ancho de banda elevado, independiente del procesador, que se puede utilizar como bus de periféricos o bus de arquitectura de entreplanta.
	- Proporciona mejores prestaciones para los subsistemas de E/S de alta velocidad. Ha sido diseñado específicamente para ajustarse económicamente a los requisitos de E/S de los sistemas actuales.
	- Utilizar temporización síncrona, y un esquema de arbitraje centralizado.


Cómo es una arquitectura PCI para un sistema de sobremesa típico?

![[Pasted image 20230522110222.png]]



Cómo es una arquitectura PCI para un servidor típico?
![[Pasted image 20230613123054.png]]

## Grupos funcionales del bus PCI
- Cuáles son los terminales funcionales del bus PCI?
	**Terminales («patillas») de sistema:** constituidas por los terminales de reloj y de inicio (reset).
	**Terminales de direcciones y datos**: incluye 32 líneas para datos y direcciones multiplexadas en el tiempo. Las otras líneas del grupo se utilizan para interpretar y validar las líneas de señal correspondientes a los datos y a las direcciones.
	**Terminales de control de la interfaz**: controlan la temporización de las transferencias y proporcionan coordinación entre los que las inician y los destinatarios.
	**Terminales de arbitraje:** a diferencia de las otras líneas de señal del PCI, estas no son líneas compartidas. En cambio, cada maestro del PCI tiene su par propio de líneas que lo conectan directamente al árbitro del bus PCI.
	**Terminales para señales de error:** utilizadas para indicar errores de paridad u otros.
	Opcionales:
		Además, la especificación del PCI define 51 señales opcionales (Tabla 3.4), divididas en los siguientes grupos funcionales:
		**Terminales de interrupción**: para los dispositivos PCI que deben generar peticiones de servicio. Igual que los terminales de arbitraje, no son líneas compartidas sino que cada dispositivo PCI tiene su propia línea o líneas de petición de interrupción a un controlador de interrupciones.
		**Terminales de soporte de caché:** necesarios para permitir memorias caché en el bus PCI asociadas a un procesador o a otro dispositivo. Estos terminales permiten el uso de protocolos de coherencia de caché de sondeo de bus (snoopy caché) (en el Capítulo 16 se discuten estos protocolos).
		**Terminales de ampliación a bus de 64 bits**: incluye 32 líneas multiplexadas en el tiempo para direcciones y datos y se combinan con las líneas obligatorias de dirección y datos para constituir un bus de direcciones y datos de 64 bits. Hay otras líneas de este grupo que se utilizan para interpretar y validar las líneas de datos y direcciones. Por último, hay dos líneas que permiten que dos dispositivos PCI se pongan de acuerdo para usar los 64 bits.
		**Terminales de test (JTAG/Boundary Scan):** estas señales se ajustan al estándar IEEE 1149.1 para la definición de procedimientos de test.
___


## Órdenes del PCI
- Reconocimiento de instrucción
- Ciclo especial
- Lectura de E/S
- Escritura de E/S
- Lectura de memoria

## Transferencia de Datos
- Cómo es la transferencia de datos?
	- Toda transferencia de datos es una transacción única que consta de una fase de direccionamiento y una o más fases de datos.

## Arbitraje
- Utiliza un arbitraje centralizado síncrono en el que cada maestro tiene una única señal de petición (REQ) y cesión (GNT) del bus. Estas líneas se conectan a un árbitro central, y se utiliza un simple intercambio de señales de petición y cesión para permitir el acceso al bus.
- No especifica un algoritmo particular de arbitraje.
![[Pasted image 20230527164616.png]]


## Flashcards
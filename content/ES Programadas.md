# ES Programadas

%%
Date:: [[2023-11-05]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Dispositivos Externos]]
%%

## Resumen de la E/S Programada
- Cuando el procesador está ejecutando un programa y encuentra una instrucción relacionada con una E/S, ejecuta dicha instrucción mandando una orden al módulo de E/S apropiado
	- El módulo realizará la acción solicitada, y después activará los bits apropiado en el registro de estado de E/S
	- El módulo no realiza ninguna otra acción para avisar al procesador, por lo que el procesador es el responsable de comprobar periódicamente el estado del módulo.

## Órdenes de E/S
- Existen 4 tipos de órdenes de E/S que puede recibir un módulo
	- Control
		- Se utiliza para activar el periférico e indicarle que hacer
		- Son órdenes específicas del tipo particular del periférico
	- Test
		- Se utiliza para comprobar diversas condiciones de estado asociadas con el módulo de E/S y sus periféricos
		- El procesador podrá comprobar si el periférico en cuestión está conectado y disponible para su uso
	- Lectura
		- Hace que el módulo de E/S capte un dato de un periférico y lo sitúe en un buffer interno. Después, el procesador puede obtener el dato solicitando que el módulo de E/S lo ponga en el bus de datos
	- Escritura
		- Hace que el módulo de E/S capte un dato del bus de datos y posteriormente lo transmita al periférico

## Instrucciones de E/S
- Muchas veces existe una correspondencia 1-1 con las órdenes del módulo de E/S y las instrucciones del procesador.
 - Cuando el procesador envía una orden de E/S, la orden contiene la dirección del dispositivo. Así el módulo de E/S debe interpretar las líneas de dirección para determinar si la orden es para él.
 - Cuando el procesador, la memoria principal, y las E/S comparten un bus común, son posibles dos modos de direccionamiento
	1. **Asignado en Memoria (Memory-Mapped):** En este modo de direccionamiento, tanto las posiciones de memoria como los dispositivos de E/S comparten un único espacio de direcciones. El procesador considera a los registros de estado y datos de los módulos de E/S como posiciones de memoria. Esto significa que las mismas instrucciones máquina se utilizan para acceder tanto a la memoria como a los dispositivos de E/S. Por ejemplo, si hay diez líneas de dirección disponibles, se pueden acceder a un total de 2^10 (1024) posiciones de memoria y direcciones de E/S en cualquier combinación.
	   En este enfoque, se necesita una sola línea de lectura y una sola línea de escritura en el bus. Alternativamente, el bus puede disponer de líneas de lectura y escritura en memoria junto con líneas para órdenes de entrada y salida. Las líneas de órdenes especifican si la dirección se refiere a una posición de memoria o a un dispositivo de E/S. Esto permite el acceso completo al rango de direcciones tanto para la memoria como para los dispositivos de E/S.
	2. **Aislado (E/S Aislada):** En el modo de direccionamiento aislado, los puertos de E/S solo son accesibles mediante órdenes específicas de E/S que activan las líneas de control de E/S en el bus. Esto significa que el espacio de direcciones de E/S está separado o aislado del espacio de direcciones de memoria.
	   En este enfoque, el procesador tiene un conjunto limitado de instrucciones de E/S en comparación con las múltiples instrucciones de acceso a memoria que generalmente se encuentran en la mayoría de los procesadores. La ventaja de la E/S asignada en memoria es que se puede utilizar el amplio conjunto de instrucciones de memoria, lo que permite una programación más eficiente. Sin embargo, una desventaja es que se utiliza parte del espacio de direcciones de memoria para abordar los dispositivos de E/S.
# Funciones de un módulo ES

%%
Date:: [[2023-08-10]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Dispositivos Externos]]
%%

## Principales funciones de un módulo
- **Control y temporización**
	- Recibe señales de control, en función del estado en el que se encuentre el dispositivo, temporiza las ejecuciones.
	- Nos permite coordinar el tráfico entre los recursos internos y los dispositivos externos.
- **Comunicación con el procesador**
	- El módulo de E/S debe tener la capacidad de entablar comunicación con el procesador y el dispositivo externo.
	- Esto implica
		- Decodificación de órdenes: el módulo de E/S acepta órdenes del  procesador, que se envían utilizando líneas del bus de control, e incluyen un parámetro que se envían a través del bus de datos.
		- Datos: el procesador y el módulo de E/S intercambian datos a través del bus de datos.
		- Información de Estado: es importante conocer el estado del módulo de E/S (suelen ser bobos)
		- Reconocimiento de direcciones: Cada dispositivo de E/S tiene una dirección única.
- **Comunicación con los dispositivos**![[Pasted image 20230810164451.png | center | 500]]
- **Almacenamiento temporal de datos**
	- Buffer. Para temporizar la realización de las tareas.
	- Mientras que la velocidad de transferencia desde, y hacia, la memoria principal o el procesador es bastante alta, dicha velocidad puede ser varios órdenes de magnitud menor para la mayoría de los dispositivos periféricos. Los datos provenientes de la memoria se envían al módulo de E/S en ráfagas rápidas. Los datos se almacenan temporalmente en el módulo de E/S y después se envían al periférico a la velocidad de este. En el sentido contrario, los datos se almacenan para no mantener a la memoria ocupada en una operación de transferencia lenta. Así, el módulo de E/S debe ser capaz de operar a las velocidades tanto del dispositivo como de la memoria. Igualmente, si el dispositivo de E/S trabaja a una velocidad mayor que la memoria, el módulo de E/S se encarga del almacenamiento temporal necesario.
- **Detección de errores**
	- No es una tarea única de los módulos, sino que también la comparte con los dispositivos externos.
		- Defectos mecánicos y eléctricos en el funcionamiento del dispositivo.
		- Cambios accidentales en los bits al transmitirse desde el dispositivo al módulo de E/S




## Secuencia de pasos de transferencia con el procesador
1. El procesador interroga al módulo de E/S para comprobar el estado del dispositivo conectado al mismo.
2. El módulo de E/S devuelve el estado del dispositivo.
3. Si el dispositivo está operativo y preparado para transmitir, el procesador solicita la transferencia del dato mediante una orden al módulo de E/S.
4. El módulo de E/S obtiene un dato (por ejemplo, de 8 o 16 bits) del dispositivo externo.
5. Los datos se transfieren desde el módulo de E/S al procesador.



## Estructura de un módulo de E/S
![[Pasted image 20230810165737.png]]
- El módulo se conecta al resto del computador a través de un conjunto de líneas (por ejemplo, el bus de sistema)
	- Los datos que se transfieren se almacenan temporalmente en uno o más registros de datos
	- Además, puede haber registros de estado que proporcionan información del estado presente.
- La lógica que hay en el módulo interactúa con el procesador a través de una serie de líneas de control, y son las que proporcionan las órdenes al módulo de E/S
- El módulo también reconoce y genera direcciones asociadas a los dispositivos que controla. Cada módulo de E/S tiene una dirección única (si controla más de un dispositivo, tendrá varias)
- El módulo posee la lógica específica para la interfaz con cada uno de los dispositivos que controla.

# Estructuras de interconexión

%%
Date:: [[2023-05-15]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[]]
#main_page 
%%


%%## Agentes que participan en los intercambios
- Memoria
	- Un módulo de memoria está constituido por N palabras de longitud (a cada palabra se le asigna una dirección numérica)
	- Una palabra de datos puede leerse de o escribirse en la memoria.
	- Tipos de señales de control: Read y Write
- Módulo de E/S
	- Un módulo pude controlar más de un dispositivo externo 
	- Cada una de estas interfaces con un dispositivo externo se llama puerto (port) y se le asigna una dirección a cada uno.
- Procesador
	- Lee instrucciones y datos, escribe datos una vez los ha procesado y utiliza ciertas señales para controlar el funcionamiento del sistema.
	- También puede recibir señales de interrupción.%%



## Estructura de los buses


Qué es un bus?
- Es un camino de comunicación entre dos o más dispositivos.
- Se trata de un medio de transmisión compartido.
- Al bus se conectan varios dispositivos, y cualquier señal transmitida por un dispositivo está disponible para que los otros dispositivos conectados al bus puedan acceder a ella.

Cómo está constituido un bus?
- Usualmente está constituido por varios caminos de comunicación, o líneas.
	- Representan señales binarias representadas por 1 y por 0.
	- Un dato de 8 bits puede transmitirse mediante 8 lineas del bus.


Qué es un bus del sistema?
- Es aquel que se encarga de conectar los componentes principales del computador (procesador, memoria, E/S)

![[Pasted image 20230515172852.png]]


Qué son las líneas de datos?
- Proporcionan un camino para transmitir datos entre los módulos del sistema.
- Estas lineas conforman el bus de datos.
- Pueden ser datos propiamente dichos, y también instrucciones.

Qué son las líneas de dirección?
- Se utiliza para designar la fuente o el destino del dato situado en el bus de datos.
- Generalmente se utilizan para direccionar los puertos de E/S.

Qué son las líneas de control?
- Es el más sencillo y el que menos lineas necesita.
- Controlar el acceso y el uso de las líneas de datos y de direcciones. 
- Como las lineas de datos y de direcciones son compartidas por todos los componentes, se debe controlar el uso de ellas.
- Líneas más comunes en el control
	- **Escritura en memoria (Memory write):** hace que el dato del bus se escriba en la posición direccionada.
	- **Lectura de memoria (Memory read):** hace que el dato de la posición direccionada se sitúe en el bus.
	- **Escritura de E/S (I/O write):** hace que el dato del bus se transfiera a través del puerto de E/S direccionado.
	- **Lectura de E/S (E/S read):** hace que el dato del puerto de E/S direccionado se sitúe en el bus.
	- **Transferencia reconocida (Transfer ACK):** indica que el dato se ha aceptado o se ha situado en el bus.
	- **Petición de bus (Bus request):** indica que un módulo necesita disponer del control del bus.
		- Hago una petición de que se libere el camino de un bus (o pasa a una queue).
	- **Cesión de bus (Bus grant):** indica que se cede el control del bus a un módulo que lo había solicitado. 
		- Luego de la petición del bus, se le indica que está libre.
	- **Petición de interrupción (Interrupt request):** indica si hay una interrupción pendiente.
		- Pido interrumpir un bus.
	- **Interrupción reconocida (Interrupt ACK):** Señala que la interrupción pendiente se ha aceptado.
		- La petición de interrupción fue otorgada.
	- **Reloj (clock):** se utiliza para sincronizar las operaciones.
	- **Inicio (reset):** pone los módulos conectados en su estado inicial.

Cómo es la jerarquía de buses en una arquitectura tradicional?
- Hay un bus local que conecta el procesador a una memoria caché y al que pueden conectarse también uno o más dispositivos locales.
- El controlador de E/S conecta la caché no solo al bus local sino tomabién al **bus de sistema**
	- Es posible conectar controladores de E/S directamente al bus de sistema, pero una solución más eficiente es utilizar uno o más **buses de expansión**. La interfaz del bus de expansión regula la transferencia de datos entre el bus el sistema y los controladores del bus de expansión.
- ![[Pasted image 20230612175602.png]]

Qué sucede con los buses en arquitecturas de altas prestaciones?
- La arquitectura tradicional muestra su debilidad a medida que los dispositivos de E/S ofrecen prestaciones mayores.
- Se propone un **bus de alta velocidad** que está estrechamente integrado al resto del sistema, y requiere un solo adaptador (bridge) entre el bus del procesador y el bus de alta velocidad.
- ![[Pasted image 20230613113427.png]]
  

- Un sistema está basado en un microprocesador de ocho bits y tiene dos dispositivos de E/S. Los controladores de E/S de este sistema utilizan registros de estado y control separados. Ambos dispositivos transfieren los datos byte a byte. El primer dispositivo tiene dos líneas de estado y tres de control. El segundo tres líneas de estado y cuatro de control.
	- ¿Cuántos registros de ocho bits de control de módulo de E/S se necesitan para leer el estado de cada dispositivo y controlarlo?
	- ¿Cuántos registros de control de módulo se necesitan si se supone que el primer dispositivo es un dispositivo de salida?
	- ¿Cuántas direcciones distintas hacen falta para controlar los dos dispositivos?

- Un sistema es controlado por un operador a través de una serie de comandos que se introducen desde un teclado. En cada intervalo de ocho horas se introducen un promedio de sesenta comandos.
	- Suponga que el procesador comprueba el teclado cada 100 ms. ¿Cuántas veces se chequea en un periodo de ocho horas?
	- ¿En qué porcentaje se reduciría el número de comprobaciones de teclado si se utilizase E/S por interrupciones?

- En casi todos los sistemas que tienen módulos de DMA, el acceso del módulo de DMA a memoria principal tiene más prioridad que el acceso de la CPU a memoria principal. ¿Por qué?

- Un computador de 32 bits tiene dos canales selectores y un canal multiplexor. Cada canal selector soporta dos discos magnéticos y dos unidades de cinta magnética. El canal multiplexor tiene conectadas dos impresoras de línea, dos lectoras de tarjetas y diez terminales VDT. Suponga las siguientes velocidades de transferencia:
	- Unidad de Disco 800 KBytes/s
	- Unidad de Cinta Magnética 200 KBytes/s
	- Inpresora de Línea 6.6 KBytes/s
	- Lector de Tarjetas 1.2 KBytes/s
	- VDT 1 KBytes/s
	- Estime la máxima velocidad total de transferencia de E/S en el sistema.

- Un computador está constituido por un procesador y un dispositivo D de E/S conectado a la memoria principal M a través de un bus compartido de una palabra. El procesador puede ejecutar un máximo de 106 instrucciones por segundo. Por término medio, las instrucciones necesitan cinco ciclos máquina, tres de los cuales utilizan el bus de memoria. Una operación de lectura o escritura en memoria utiliza un ciclo máquina. Suponga que el procesador se encuentra ejecutando continuamente programas en segundo plano (background) que requieren el 95 por ciento de la velocidad de ejecución de sus instrucciones pero ninguna instrucción de E/S. Asuma que un ciclo del procesador es igual a un ciclo del bus. En un momento dado el dispositivo de E/S se utiliza para transferir bloques muy grandes de datos entre la memoria principal M y D.

	- Si se utiliza la E/S programada y cada transferencia de una palabra requiere que el procesador ejecute dos instrucciones, estime la máxima velocidad (en palabras por segundo) de transferencia de datos de E/S, posible a través de D.
	- Estime la misma magnitud si se utiliza DMA.
- Explique brevemente las siguientes representaciones: signo-magnitud, complemento a dos, sesgada.

- Explique cómo determinar si un número es negativo en las siguientes representaciones: signo-magnitud, complemento a dos, sesgada.

- ¿En qué consiste la regla de extensión del signo para los números en complemento a dos?
  
- ¿Cómo se obtiene el opuesto de un entero en la representación de complemento a dos?

- ¿Cuáles son los cuatro elementos esenciales de un número en la notación de coma flotante?

- Represente tanto en signo-magnitud como en complemento a dos, con 16 bits, los siguientes números decimales: 512; 29.

- Represente en decimal los siguientes valores en complemento a dos: 1101011; 0101101.

- ¿Cuáles son los componentes típicos de una instrucción máquina?

- Enumere y explique brevemente cinco aspectos importantes en el diseño del repertorio de instrucciones.

- 10.5. ¿Qué tipos de operandos son usuales en los repertorios de instrucciones máquina?

- ¿Qué se entiende por anidamiento de procedimientos?

- Enumere tres posibles ubicaciones para almacenar la dirección de retorno de un procedimiento.

- ¿Qué diferencia hay entre lenguaje ensamblador y lenguaje máquina?
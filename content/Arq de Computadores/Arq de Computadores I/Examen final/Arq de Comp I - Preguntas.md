  

- Un sistema está basado en un microprocesador de ocho bits y tiene dos dispositivos de E/S. Los controladores de E/S de este sistema utilizan registros de estado y control separados. Ambos dispositivos transfieren los datos byte a byte. El primer dispositivo tiene dos líneas de estado y tres de control. El segundo tres líneas de estado y cuatro de control.![[Pasted image 20231127161808.png]]
	- ¿Cuántos registros de ocho bits de control de módulo de E/S se necesitan para leer el estado de cada dispositivo y controlarlo? 
		- Puesto que para leer el estado y controlar (simultáneamente) necesitamos un registro por canal, necesitaremos 12
	- ¿Cuántos registros de control de módulo se necesitan si se supone que el primer dispositivo es un dispositivo de salida?
		- Igual que en el item anterior, no cambia en nada.
	- ¿Cuántas direcciones distintas hacen falta para controlar los dos dispositivos?
		- Para cada registro necesitamos una dirección, por lo tanto, 12

--- 

- Un sistema es controlado por un operador a través de una serie de comandos que se introducen desde un teclado. En cada intervalo de ocho horas se introducen un promedio de sesenta comandos.
	- Suponga que el procesador comprueba el teclado cada 100 ms. ¿Cuántas veces se chequea en un periodo de ocho horas? 
		- 288000
	- ¿En qué porcentaje se reduciría el número de comprobaciones de teclado si se utilizase E/S por interrupciones? 
		- 99,08%

---

- En casi todos los sistemas que tienen módulos de DMA, el acceso del módulo de DMA a memoria principal tiene más prioridad que el acceso de la CPU a memoria principal. ¿Por qué? 
	- Los DMA transfieren grandes bloques de información, por lo que es prioridad para no perder información

---

- Un computador de 32 bits tiene dos canales selectores y un canal multiplexor. Cada canal selector soporta dos discos magnéticos y dos unidades de cinta magnética. El canal multiplexor tiene conectadas dos impresoras de línea, dos lectoras de tarjetas y diez terminales VDT. Suponga las siguientes velocidades de transferencia:
	- Unidad de Disco 800 KBytes/s
	- Unidad de Cinta Magnética 200 KBytes/s
	- Inpresora de Línea 6.6 KBytes/s
	- Lector de Tarjetas 1.2 KBytes/s
	- VDT 1 KBytes/s
	- Estime la máxima velocidad total de transferencia de E/S en el sistema.

Puesto que al canal selector lo puede utilizar solo un dispositivo de E/S en un momento dado, la máxima velocidad a la que trabajará el canal es a la del dispositivo de mayor velocidad, es decir, 800 KBytes/s.
Por otro lado, el canal multiplexor puede ser utilizado por varios dispositivos simultáneamente, por lo que la velocidad de dicho canal (en el peor de los casos) será el de la suma de todas las velocidades de los dispositivos conectados a dicho canal.


---

- Un computador está constituido por un procesador y un dispositivo D de E/S conectado a la memoria principal M a través de un bus compartido de una palabra. El procesador puede ejecutar un máximo de 10^6 instrucciones por segundo. Por término medio, las instrucciones necesitan cinco ciclos máquina, tres de los cuales utilizan el bus de memoria. Una operación de lectura o escritura en memoria utiliza un ciclo máquina. Suponga que el procesador se encuentra ejecutando continuamente programas en segundo plano (background) que requieren el 95 por ciento de la velocidad de ejecución de sus instrucciones pero ninguna instrucción de E/S. Asuma que un ciclo del procesador es igual a un ciclo del bus. En un momento dado el dispositivo de E/S se utiliza para transferir bloques muy grandes de datos entre la memoria principal M y D.
	- Si se utiliza la E/S programada y cada transferencia de una palabra requiere que el procesador ejecute dos instrucciones, estime la máxima velocidad (en palabras por segundo) de transferencia de datos de E/S, posible a través de D.
	- Estime la misma magnitud si se utiliza DMA.

- Velocidad del procesador 10^6 instrucciones por segundo.
	- Por cada instrucción el procesador realiza 3 ciclos de operaciones, y 2 de "otros procesos"
	- El 95% del tiempo realiza operaciones en "background", solo el 5% son de E/S

- Cada transferencia son 2 instrucciones
- **El procesador realiza 5x10^4 instrucciones por segundo (de E/S) => 2,5 x10^4 palabras por segundo** 

 - Si utiliza DMA
	 - 0,5x10^6 palabras por segundo

---

- Explique brevemente las siguientes representaciones: signo-magnitud, complemento a dos, sesgada.

---

- Explique cómo determinar si un número es negativo en las siguientes representaciones: signo-magnitud, complemento a dos, sesgada.

---

- ¿En qué consiste la regla de extensión del signo para los números en complemento a dos?

---

- ¿Cómo se obtiene el opuesto de un entero en la representación de complemento a dos?

---

- ¿Cuáles son los cuatro elementos esenciales de un número en la notación de coma flotante?

---

- Represente tanto en signo-magnitud como en complemento a dos, con 16 bits, los siguientes números decimales: 512; 29.

---

- Represente en decimal los siguientes valores en complemento a dos: 1101011; 0101101.

- ¿Cuáles son los componentes típicos de una instrucción máquina?

	- Código de operación
	- Referencia a los operandos
	- Referencia a los operando de destino
	- Referencia a la próxima instrucción

---

- Enumere y explique brevemente cinco aspectos importantes en el diseño del repertorio de instrucciones.

	1. Tipo de operaciones que se utilizarán
	2. Formato de las instrucciones
	3. Tipo de datos que se utilizarán
	4. Métodos de direccionamiento
	5. Registros

---

- 10.5. ¿Qué tipos de operandos son usuales en los repertorios de instrucciones máquina?
	1. ADD
	2. SUB
	3. MPY
	4. DIV
	5. LOAD
	6. STORE

---

- ¿Qué se entiende por anidamiento de procedimientos?

--- 

- Enumere tres posibles ubicaciones para almacenar la dirección de retorno de un procedimiento.

---

- ¿Qué diferencia hay entre lenguaje ensamblador y lenguaje máquina?

Puesto que el lenguaje máquina es un lenguaje binario, que para un programador es imposible de entender e interpretar, se utiliza el lenguaje ensamblador que es de las maneras de más baja nivel que se puede programar sin perder la interpretabilidad del código, utilizando referencias simbólicas al lenguaje máquina.
# Microoperaciones

%%
Date:: [[2023-11-07]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[]] #main_page 
%%

Las microoperaciones son la operaciones funcionales, o atómicas, de un procesador.![[Pasted image 20231107152242.png]]

## El ciclo de captación
- Tiene lugar al principio de cada ciclo de instrucción y hace que una instrucción sea captada de la memoria
- Existen 4 registros implicados
	- *Registro de dirección de memoria (Memory Address Register, MAR):* está conectado a las líneas de dirección del bus del sistema. Especifica la dirección de memoria de una operación de lectura o de escritura.
	-  *Registro intermedio de memoria (Memory Buffer Register, MBR):* está conectado a las líneas de datos del bus del sistema. Contiene el valor a almacenar en memoria o el último valor leído de memoria.
	- *Contador de programa (Program Counter, PC):* contiene la dirección de la siguiente instrucción a captar.
	- *Registro de instrucción (Instruction Register, IR):* contiene la última instrucción captada.
- El ciclo de captación consta realmente de tres pasos y cuatro microoperaciones. Cada microoperación implica la transferencia de datos hacia dentro o hacia fuera de un registro.![[Pasted image 20231107152737.png | 300]]
	1. Transferir el contenido de PC a MAR
	2. Transferir el contenido de la posición de memoria especificada por MAR a MBR. Incrementar en I el contenido de PC
	3. Transferir el contenido de MBR a IR


## El ciclo indirecto
- Una vez que se capta una instrucción, el siguiente paso es captar los operandos fuente.
- Si la instrucción especifica una dirección indirecta, un ciclo indirecto ha de preceder al ciclo de instrucción
- El campo de dirección en la instrucción se transfiere a MAR. Este se usa después para captar la dirección del operando. Por último, el campo de dirección de IR se actualiza con el contenido de MBR, de modo que contenga una dirección directa en lugar de una indirecta. ![[Pasted image 20231107152931.png | 400]]
- IR ahora está listo para la ejecución. 
## El ciclo de interrupción
- Cuando termina el ciclo de ejecución, se realiza una comprobación para determinar si ha ocurrido alguna interrupción habilitada. Si es así, tiene lugar la interrupción.
- ![[Pasted image 20231107153519.png | 300]]
1. El contenido de PC se transfiere a MBR, para el retorno de la interrupción
2. MAR se carga con la dirección en la cual va a guardarse el contenido de PC, y PC se carga con la dirección de comienzo de la rutina de procesamientos de la interrupción.
3. Una vez finalizada la rutina, se almacena MBR, que contiene el antiguo valor de PC, en la memoria.


## El ciclo de ejecución
- Es más complejo que los ciclos anteriores, porque pueden existir N secuencias diferentes de microoperaciones
- Si se considera la siguiente instrucción `ADD R1, X` que suma el contenido de la posición X al registro R1. Puede suceder la siguiente secuencia de microoperaciones:
	- ![[Pasted image 20231107154516.png | 400]]
	- En un principio IR contiene la instrucción ADD. En el primer paso, la parte de dirección de IR se carga en MAR. Después se lee la posición de memoria referenciada. Por último, la ALU suma los contenidos de R1 y MBR. 
	- Este es un ejemplo simplificado. Pueden necesitarse microoperaciones adicionales para extraer la referencia a registro desde IR y tal vez para poner las entradas o salidas de la ALU en algunos registros intermedios.

## El ciclo de instrucción
Hay una secuencia para cada uno de los ciclos de captación, indirecto y de interrupción, y para el ciclo de ejecución existe una secuencia de microoperaciones para cada código de operación.
El *Código de ciclo de instrucción, ICC* designa el estado del procesador en términos de que en qué parte del ciclo se encuentra este: Captación, Indirecto, Ejecución e Interrupción.
![[Pasted image 20231107154815.png]]
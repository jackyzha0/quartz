# Segmentación

%%
Date:: [[2023-10-12]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Organización del Procesador]]
%%

La **segmentación de instrucciones** es una técnica que permite implementar el paralelismo a nivel de instrucción en un único procesador. La segmentación intenta tener ocupadas con instrucciones todas las partes del procesador dividiendo las instrucciones en una serie de pasos secuenciales que efectuarán distintas unidades de la CPU, tratando en paralelo diferentes partes de las instrucciones. Permite una mayor tasa de transferencia efectiva por parte de la CPU que la que sería posible a una determinada frecuencia de reloj, pero puede aumentar la latencia debido al trabajo adicional que supone el propio proceso de la segmentación

![[Pasted image 20231012170837.png]]


Consideremos la siguiente descomposición del procesamiento de una instrucción.
- **Captar instrucción (Fetch Instruction, FI)**: leer la supuesta siguiente instrucción en un buffer.
- **Decodificar instrucción (Decode Instruction, DI)**: determinar el código de operación y los campos de operando.
- **Calcular operandos (Calculate Operands, CO)**: calcular la dirección efectiva de cada operando fuente. Esto puede involucrar direccionamiento mediante un desplazamiento, indirecto a través de registro, indirecto, u otras formas de calcular la dirección.
- **Captar operandos (Fetch Operands, FO)**: captar cada operando que resida en memoria. Los operandos en registros no tienen que ser captados.
- **Ejecutar instrucción (Execute Instruction, EI)**: realizar la operación indicada y almacenar el resultado, si lo hay, en la posición de operando destino especificada.
- **Escribir operando (Write Operand, WO)**: almacenar el resultado en memoria.
![[Pasted image 20231019152649.png]]

- Muchas veces no conseguimos uniformidad en los tiempos de ejecución entre los pasos de las instrucciones.

![[Pasted image 20231019152901.png]]

>[!quote] salto condicional e incondicional
>Un salto condicional pasa en, por ejemplo, un `if`. Un salto incondicional se realiza siempre! Por ejemplo, el llamado a una subrutina.

- Cuando es un salto incondicional, el resto de canales se detienen (en stand by). Cuando se resuelve el salto, recién limpia los otros canales.

![[Pasted image 20231019153449.png]]


## Diseño para la segmentación
- Gasto extra (ciclo extra) debido a la transferencia de datos de buffer a buffer
	- Colocación de pequeñas memorias muy rápidas (más eficiente que caché o registros) para guardar datos allí.
	- Guardan momentáneamente los datos para ver si se cumplen o no ciertas dependencias.
- Cantidad de lógica necesaria para optimizar el uso de memorias buffer, y controlar el paso de datos entre buffers (chequear si pude transferir los datos o no).


## Tratamiento de los saltos
1. Flujos múltiples
	Un cauce simple se ve penalizado por las instrucciones de salto porque debe escoger una de las dos instrucciones a captar a continuación y puede hacer una elección equivocada.
	Un solución burda es duplicar las partes iniciales del cauce y dejar que este capte las dos instrucciones, utilizando los dos caminos. Esta aproximación tiene dos problemas:
	- Con cauces múltiples hay retardos debidos a la competencia por el acceso a los registros y a la memoria.
	- Pueden entrar en el cauce (en cualquiera de los dos flujos) instrucciones de salto adicionales antes de que se resuelva la decisión del salto original
2. Precaptar el destino del salto
	- Cuando se identifica un salto condicional, se precapta la instrucción destino del salto, además de la siguiente a la del salto.
3. Buffer de bucles
	- Memoria pequeña y de gran velocidad (más rápida que la caché) que está gestionada por las etapas de captación e instrucción (seguardan estas etapas)
	- Contiene secuencialemente las instrucciones captadas recientemente.
		- Si se produce un salto, el hardware comprueba que el destino del salto, está en ese buffer. Se fija si tiene un salto al mismo destino (es decir, estoy ejecutando la misma función) -> La siguiente instrucción que se capta es la del buffer, y cargo la info que ya tiene ese buffer.
		- Si la instrucción que tenía en el buffer fue "hace poco", también tendré (además del salto) parte de la instrucción resuelta en el mismo buffer
4. Predicción de saltos
	1. Predecir que nunca salta
	2. Predecir que siempre se salta
	3. Predecir según el código de operación
	4. Conmutador saltar/no saltar
	5. Tabla de historia de saltos
5. Salto retardado
	- Para mejorar las prestaciones de los causes se van reordenando las instrucciones
		- Las instrucciones que contengan salto, se retardarán dependiendo de lo que se desea hacer.
	- Ciertos saltos, los dejo que se ejecuten después porque no me va a generar una disminución de la aceleración del programa.

# Repertorio de instrucciones

%%
Date:: [[2023-08-31]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[]] #main_page 
%%

Al conjunto de instrucciones distintas que puede ejecutar el procesador se denomina *repertorio de instrucciones* del procesador
- Elementos de una instrucción
	- **Código de operación.** Especifica la operación a realizar.
	- **Referencia a operandos fuente u origen.** Operandos que son entradas para la instrucción
	- **Referencia al operando de destino o resultado**. La operación puede producir un resultado.
	- **Referencia a la siguiente instrucción**. Dice al procesador de donde captar la siguiente instrucción.
![[Pasted image 20230831160708.png]]


![[Pasted image 20230831165701.png]]


## Tipos de instrucciones de un acomputadora
- De procesamiento de datos: instrucciones aritméticas y lógicas
- De almacenamiento de datos: instrucciones de memoria.
- De transferencia de datos: instrucciones de E/S.
- De control: instrucciones de comprobación y de bifurcación.

## Diseño del repertorio de instrucciones
- El repertorio de operaciones: cuántas y qué operaciones considerar, y cuán complejas deben ser.
- Los tipos de datos: los distintos tipos de datos con los que se efectúan operaciones.
- Los formatos de instrucciones: longitud de la instrucción (en bits), número de direcciones, tamaño de los distintos campos, etc.
- Los registros: número de registros del procesador que pueden ser referenciados por las instrucciones, y su uso.
- El direccionamiento: el modo o modos de direccionamiento mediante los cuales puede especificarse la dirección de un operando.

## Tipos de operandos/datos
- Direcciones
- Números
- Caracteres
- Datos lógicos

## Tipos de operaciones
- Transferencia de datos
- Aritméticas
- Lógicas
- De conversión
- De E/S
- De control de sistema
- De control de flujo
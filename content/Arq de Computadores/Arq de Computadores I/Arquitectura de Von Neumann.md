# Arquitectura de Von Neumann

- Date:: [[2023-03-26]]
- Course:: [[Arquitectura de Computadores I]]
- Source:: [[Que es una computadora]]

#arqcompu/computadores 


Se basa principalmente en lo siguiente:
- Los datos y las instrucciones se almacenan en una sola memoria de lectura-escritura.
- Los contenidos de esta memoria se direccionan indicando su posición, sin considerar el tipo de dato contenido en la misma.
- La ejecución se produce siguiendo una secuencia de instrucción tras instrucción (a no ser que dicha secuencia se modifique explícitamente). 

Qué es la arquitectura de von Neumann?
?
- La arquitectura de von Neumann es un diseño que usa una memoria para almacenar instrucciones y datos. Es la implementación de una **máquina de Turing** y la visión de una arquitectura secuencial en lugar de paralela.
- <mark style="background: #FFF3A3A6;">Surge el concepto de programa almacenado.</mark>
- ![[Pasted image 20230403151604.png | center | 300]]
- En el ENIAC era muy complejo modificar los programas
	- Busca representar los programas en una forma adecuada para ser guardado en memoria junto con los datos.
	- El computador podría conseguir sus instrucciones leyéndolas de la memoria, y se podría modificar un programa colocando los valores en una zona en memoria

## Cómo es el ciclo de instrucción y las instrucciones en la máquina de von Neumann?
?
- La función de una computadora es la ejecución de programas (localizados en memoria y <mark style="background: #FFF3A3A6;">consisten en instrucciones</mark>)
	- Las instrucciones consisten en secuencias binarias llamadas código máquina.
- La CPU es quien se encarga de ejecutar dichas instrucciones a través del denominado ciclo de instrucciones.
![[Pasted image 20230330090936.png | center | 200]]
1. Leer (fetch) instrucción de memoria
2. Ejecutar (execute) instrucción
- Al comienzo de cada ciclo, la CPU busca una instrucción en memoria
	- Para saber la próxima instrucción utiliza el <mark style="background: #FFF3A3A6;">Program Counter (PC)</mark>, que tiene la dirección de la próxima instrucción a buscar.
	- Luego de buscar la instrucción, incrementa el contenido de PC (para buscar la próxima secuencia)
- La instrucción buscada se carga dentro de un registro de la CPU, el <mark style="background: #FFF3A3A6;">Instruction Register (IR)</mark>
	- La instrucción se en cuentra en código binario, que especifica las acciones que realizará la CPU
	- Luego de interpretarla, la ejecuta.


Von Neumann trae un nuevo concepto basado en:
- Unidad de control
- Unidad de cálculo lógico 
- Unidad de almacenamiento

- Antes, para modificar el software había que modificar el hardware. Ahora el programador simplemente necesita proporcionar un nuevo conjunto de señales de control (una nueva secuencia de códigos). Un intérprete traduce ese código en nuevas señales de control.




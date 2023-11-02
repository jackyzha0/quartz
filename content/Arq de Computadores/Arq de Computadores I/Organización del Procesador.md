# Organización del Procesador

%%
Date:: [[2023-10-12]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[]] #main_page 
%%


![[Pasted image 20231012153705.png]]

## Requisitos que debe cumplir
- Captar información
	- Lee una instrucción de memoria.
- Interpretar instrucción
	- Se decodifica para determinar qué acción es necesaria.
- Captar datos
	- La ejecución puede exigir leer datos de la memoria o de un módulo de E/S
- Procesar datos
	- La ejecución de una instrucción puede exigir llevar a cabo alguna operación aritmética o lógica de los datos
- Escribir datos
	- Los resultados de una ejecución puede exigir datos en la memoria o en un módulo de E/S


![[Pasted image 20231012153117.png]]


## Tipos de registros
- Registros visibles por el usuario
	- Permiten que el programador de lenguaje máquina o de ensamblador minimizar las referencias a memoria principal por medio de la optimización del uso de registros
	- Tipos
		- De uso general
			- De uso general para poder guardar datos o direcciones. Son asignados por el programador para diversas funciones.
			- Puedo guardar cualquier cosa.
		- Datos
			- Exclusivamente de datos
		- Direcciones 
			- Exclusivamente de direcciones
		- De condición
			- Son flags (banderas).
			- Se usan para instrucciones de condicionalidad o saltos condicionales.
- Registros de control de estado
	- Son utilizados por la unidad de control para controlar el funcionamiento del procesador y por programas privilegiados del sistema operativo para controlar la ejecución de programas.
	- Tipos
		- Contador de programa (PC)
		- Registro de instrucción (IR)
		- Registro de dirección de memoria (MAR)
		- Registro de intermedio de memoria (MBR)
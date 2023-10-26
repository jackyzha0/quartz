# Funcionamiento del computador

%%
Date:: [[2023-05-08]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[]]
#main_page 
%%


Cuál es la función básica de un ordenador?
- Es la ejecución de un programa constituido pro un conjunto de instrucciones almacenadas en memoria.
	- El procesador es quien se encarga de ejecutar las instrucciones especificadas en el programa.
	- Consta de dos etapas
		1. Captación de la instrucción (en la memoria)
		2. Ejecución de la instrucción
![[Pasted image 20230508172222.png]]




## Ciclos de captación y ejecución
En qué consiste el ciclo de captación y ejecución?
Al comienzo de cada ciclo de instrucción, la CPU capta una instrucción de memoria utilizando el registro contador de programa (PC) para seguir la pista de la siguiente instrucción. La instrucción captada se almacena en el registro de instrucción (IR) y se interpreta utilizando un código binario que especifica la acción que debe realizar la CPU. 

De qué tipos puede ser una instrucción?
La ejecución de una instrucción puede implicar una combinación de estas acciones y se puede alterar la secuencia de ejecución mediante instrucciones de salto.
**La instrucción puede ser de 4 tipos:**
- **Procesador-Memora**. Acceso y transferencia a memoria.
- **Procesador-E/S.** Se trabaja con transferencia de datos en módulos de E/S
- **Procesamiento de Datos**. la CPU realiza alguna operación aritmética o lógica.
- **Control**. Altera la ejecución normal de una secuencia.


## Diagrama de estados de un ciclo de instrucción (básico)
- Un ciclo de captación y ejecución es IMPRESCINDIBLE para una instrucción.
![[Pasted image 20230508181254.png]]

- **Cálculo de la dirección de la instrucción (IAC, Instruction Address Calculation):** determina la dirección de la siguiente instrucción a ejecutar. Normalmente, esto implica añadir un número fijo a la dirección de la instrucción previa. Por ejemplo, si las instrucciones tienen un tamaño de 16 bits y la memoria se organiza en palabras de 16 bits, se suma 1 a la dirección previa. En cambio, si la memoria se organiza en bytes (8 bits) direccionables individualmente, entonces hay que sumar 2 a la dirección previa.
- **Captación de instrucción (if, Instruction Fetch):** la CPU lee la instrucción desde su posición en memoria.  
- **Decodificación de la operación indicada en la instrucción (IOD, Instruction Operation  Decoding):** analiza la instrucción para determinar el tipo de operación a realizar y el (los) operando(s) a utilizar.
- **Cálculo de la dirección del operando (OAC, Operand Address Calculation):** si la instrucción implica una referencia a un operando en memoria o disponible mediante E/S, determina la dirección del operando. 
- **Captación de operando (OF, Operand Fetch):** capta el operando desde memoria o se lee desde el dispositivo de E/S.
- **Operación con los datos (DO, Data Operation):** realiza la operación indicada en la instrucción.
- **Almacenamiento de operando (OS, Operand Store):** escribe el resultado en memoria o lo saca a través de un dispositivo de E/S








___
## Flashcards
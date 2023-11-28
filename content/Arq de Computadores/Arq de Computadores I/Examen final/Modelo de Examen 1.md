## 1. Que es una microinstrucción? Explique los elementos esenciales de una instrucción máquina.

- Son las operaciones funcionales, o atómicas, de un procesador. ![[Pasted image 20231107152242.png]]
- Los elementos esenciales de una instrucción máquina son:
	- El código de operación: SUM, SUB, MPY, DIV, LOAD, STORE
	- Referencia a los operandos fuente
	- Referencia a los operandos de destino
	- Referencia a la próxima instrucción


## 2. Explicar los modos de direccionamiento más comunes, sus pros y sus contras.
- Modo inmediato
	- El modo inmediato está basado en que el operando se encuentra en la propia instrucción. 
- Modo directo
	- El modo directo se caracteriza por tener en la instrucción la dirección en memoria principal de los operandos.
- Modo indirecto
	- El modo indirecto posee en la instrucción una dirección de memoria principal, que a su vez referencia a otra dirección en memoria principal donde se encuentran los operandos. Es muy útil para acceder a datos estructurados o tablas.
- Modo directo con registros
	- El modo directo con registros utiliza registros para almacenar los operandos, y la instrucción posee la dirección del registro.
- Modo indirecto con registros
	- El modo indirecto hace uso de registros que poseen la dirección en memoria principal donde se encuentran los perandos.
- Utilización de pilas
	- Almacena los operandos en pilas, utilizando las operaciones push y pop

## 3. Explicar el ciclo de instrucción y sus subciclos (captación, indirecto, ejecución e interrupción)
![[Pasted image 20231012161132.png]]

- Subciclos del ciclo de instrucción
	- Captación
		- Tiene lugar al principio de cada ciclo de instrucción y hace que una instrucción sea captada en memoria.
			- Registros: Memory Address Register, Memory Buffer Register, Program Counter, Instruction Register
	- Indirecto
		- Se captan los operandos fuentes.
		- Si la instrucción especifica una dirección indirecta, se inicia un ciclo de indirección para captar los operandos
	- Ejecución
		- Pueden existir N secuencias diferentes de microoperaciones
		- Se operan lo operandos en función de las diferentes rutinas de ejecución
	- Interrupción
		- Cuando termina el ciclo de ejecución, se realiza una comprobación para determinar si ha ocurrido alguna interrupción habilitada. Si es así, tiene lugar la interrupción.


4. Explicar y comparar los registros visibles para el usuario con los de control y de estado.
	- Los registros que son visibles para el usuario son aquellos que se utilizan "de uso general", y permiten almacenar lo qué el programador quiera. Admás, permiten almacenar datos, direccioes o banderas.
	- Por otro lado, los registros que no son visibles al usuario pertenecen al ciclo de una instrucción, en especial
		- Memory Address Register (MAR)
		- Memory Buffer Register (MBR)
		- Program Counter (PC)
		- Instruction Register (IR)


5. Realizar una comparación entre las características de las arquitecturas CISC y RISC


| Característica                                     | RISC Clásico                       | CISC                                |
|---------------------------------------------------|------------------------------------|------------------------------------|
| Tamaño de Instrucción                             | Único                             | Variable                           |
| Tamaño de Instrucción (Generalmente)              | 4 bytes                            | Variable                           |
| Modos de Direccionamiento de Datos                | Generalmente menos de 5 modos     | Variedad de modos de direccionamiento |
| Direccionamiento Indirecto                        | No se utiliza                     | Puede ser utilizado                 |
| Operaciones de Carga/Almacenamiento con Cálculos  | No se utilizan                     | Utilizadas en algunas instrucciones |
| Múltiples Operandos de Memoria por Instrucción    | No se utilizan                     | En algunas instrucciones             |
| Restricciones en la Alineación de Datos           | Se imponen algunas restricciones | Menos restricciones o más flexibilidad |
| Uso de la Unidad de Gestión de Memoria (MMU)      | Limitado                          | Variable                           |
| Bits en el Campo de Registro Entero               | Al menos 5 bits                   | Variable                           |
| Bits en el Campo de Registro de Coma Flotante     | Al menos 4 bits                   | Variable                           |


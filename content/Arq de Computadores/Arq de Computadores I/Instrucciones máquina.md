# Instrucciones máquina

%%
Date:: [[2023-11-06]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Repertorio de instrucciones]]
%%

## Características de las instrucciones máquina
Al conjunto de instrucciones distintas que puede ejecutar el procesador se denomina *repertorio de instrucciones* del procesador
- Elementos de una instrucción
	- **Código de operación.** Especifica la operación a realizar.
	- **Referencia a operandos fuente u origen.** Operandos que son entradas para la instrucción
	- **Referencia al operando de destino o resultado**. La operación puede producir un resultado.
	- **Referencia a la siguiente instrucción**. Dice al procesador de donde captar la siguiente instrucción.
![[Pasted image 20230831160708.png]]

- Areas de los operando origen y destino
	- **Memoria principal o virtual**: como en las referencias o instrucciones siguientes, debe indicarse la dirección de memoria principal o de memoria virtual
	- **Registro del procesador:** un procesador contiene uno o más registros que pueden ser referenciados por instrucciones máquina. Si existe más de un registro tendrá asignado un número único, y la instrucción debe contener el número de registro deseado.
	- **Dispositivo de E/S:** la instrucción debe especificar el módulo y dispositivo de E/S para la operación.

## Representaciones de las instrucciones máquina
Cómo las instrucciones máquina se encuentran en binario, se utilizan representaciones simbólicas de las mismas -> CODOPS
- ADD (Sumar)
- SUB (Restar)
- MPY (Multiplicar)
- DIV (Dividir)
- LOAD (Cargar datos de memoria)
- STOR (Almacenar datos en memoria)
![[Pasted image 20231106141558.png  | center | 400]]


## Tipos de instrucciones de una computadora
- De procesamiento de datos: instrucciones aritméticas y lógicas
- De almacenamiento de datos: instrucciones de memoria.
- De transferencia de datos: instrucciones de E/S.
- De control: instrucciones de comprobación y de bifurcación.

## Número de direcciones
El número de direcciones en una instrucción es un aspecto fundamental en el diseño de la arquitectura de un procesador. Esta característica define la cantidad de ubicaciones de memoria o registros que una instrucción puede referenciar directamente en su ejecución. A continuación, se exploran las posibilidades y consideraciones asociadas a esta característica:

1. Instrucciones de Tres Direcciones:
   - Una instrucción de tres direcciones generalmente permite referenciar dos operandos, un resultado y la dirección de la instrucción siguiente.
   - Esto puede ser útil para operaciones aritméticas y lógicas complejas que involucran múltiples operandos y requieren el almacenamiento de resultados intermedios.

2. Instrucciones de Dos Direcciones:
   - Las instrucciones de dos direcciones suelen referenciar un operando y el resultado.
   - Para operaciones binarias, como la suma o la resta, una de las direcciones hace doble servicio como operando y resultado. Esto reduce el espacio necesario pero puede requerir instrucciones adicionales para evitar cambios en los valores de operandos.

3. Instrucciones de Una Dirección:
   - Las instrucciones de una dirección implican que una dirección está implícita, a menudo en un registro especial conocido como acumulador (AC).
   - La instrucción de una dirección suele requerir más instrucciones para realizar tareas, ya que se limita a un solo operando y el acumulador se usa para almacenar resultados intermedios.
   - Esta fue una elección común en las primeras computadoras.

4. Instrucciones de Cero Direcciones:
   - Las instrucciones de cero direcciones son aplicables en un entorno de pila (stack) y hacen referencia a elementos en la cima de la pila.
   - Las memorias pila siguen el principio de último en entrar, primero en salir (last-in-first-out, LIFO), y las instrucciones de cero direcciones se utilizan para acceder a los elementos de la pila en la cima.
   - Esto es especialmente útil cuando al menos los dos elementos superiores de la pila se almacenan en registros del procesador.


## Diseño del repertorio de instrucciones
El diseño del repertorio de instrucciones de una computadora es un aspecto crucial que afecta a numerosos aspectos del funcionamiento del procesador y, en última instancia, influye en la capacidad de los programadores para controlar la máquina. En este contexto, se presentan algunos de los aspectos más fundamentales y controvertidos del diseño de repertorios de instrucciones:

1. **Repertorio de Operaciones:**
   - El repertorio de operaciones se refiere a las instrucciones que un procesador es capaz de ejecutar. Un aspecto importante es determinar cuántas y qué operaciones se deben incluir en el conjunto de instrucciones.
   - La complejidad de las operaciones también es un factor crítico. Algunas arquitecturas optan por operaciones simples y numerosas, mientras que otras se inclinan por operaciones más complejas y menos numerosas.

2. **Tipos de Datos:**
   - El diseño del repertorio debe definir los tipos de datos que pueden ser manipulados por las instrucciones. Esto incluye enteros, números en coma flotante, caracteres, etc.
   - La capacidad para realizar operaciones en distintos tipos de datos es esencial para la versatilidad del procesador.

3. **Formatos de Instrucciones:**
   - Los formatos de instrucciones determinan la estructura de las instrucciones en términos de su longitud en bits, el número de direcciones, el tamaño de los campos, entre otros aspectos.
   - Un diseño eficiente de los formatos de instrucciones puede influir en la compacidad del código y la eficiencia de la ejecución de programas.

4. **Registros**:
   - Los registros son ubicaciones de almacenamiento de alta velocidad en el procesador que se utilizan para realizar operaciones. El diseño debe definir cuántos registros están disponibles y cómo se utilizan en las instrucciones.
   - La eficiente gestión de registros es esencial para el rendimiento de la computadora.

5. **Modos de Direccionamiento:**
   - Los modos de direccionamiento determinan cómo se especifica la dirección de un operando en una instrucción. Esto puede incluir direccionamiento directo, indirecto, inmediato, etc.
   - La elección de los modos de direccionamiento afecta a la flexibilidad y complejidad del repertorio de instrucciones.
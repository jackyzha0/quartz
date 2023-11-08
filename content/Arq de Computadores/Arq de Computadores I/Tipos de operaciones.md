# Tipos de operaciones

%%
Date:: [[2023-11-06]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Repertorio de instrucciones]]
%%

## Operaciones de transferencia de datos

1. **Especificación de Operandos**: Las instrucciones de transferencia de datos requieren la especificación de operandos, que incluyen el origen y el destino de la transferencia. Estos operandos pueden ser registros de la CPU, ubicaciones de memoria o elementos en la pila.
2. **Longitud de Datos**: Además de los operandos, es necesario especificar la longitud de los datos que se van a transferir. Esto puede variar según la arquitectura de la computadora y puede ser de 8, 16, 32 o 64 bits, u otras longitudes, dependiendo de la arquitectura.
3. **Modo de Direccionamiento**: El modo de direccionamiento determina cómo se accede al operando en memoria o en un registro. Puede haber diferentes modos de direccionamiento, como direccionamiento directo, indirecto, indexado, etc. Estos modos de direccionamiento se explican en detalle en el Capítulo 11.
4. **Variabilidad de Instrucciones**: Diferentes arquitecturas de computadoras tienen enfoques diferentes para las instrucciones de transferencia de datos. Algunas arquitecturas ofrecen instrucciones específicas para la transferencia entre registros, de registro a memoria o de memoria a registro. Otras, como el VAX, pueden tener instrucciones más generales que requieren especificar la ubicación del operando en el propio operando.
5. **Procesamiento de Memoria**: Cuando se transfieren datos entre registros y memoria, el procesador debe realizar varias tareas, como calcular la dirección de memoria basada en el modo de direccionamiento, realizar traducción de dirección virtual a real si es necesario, comprobar si el elemento deseado se encuentra en la caché y, en caso contrario, cursar una solicitud al módulo de memoria para acceder a los datos en memoria principal.

## Operaciones aritméticas

Entre otras operaciones posibles hay varias instrucciones de un solo operando; por ejemplo:
- Absolute: obtiene el valor absoluto del operando.
- Negate: cambia el signo del operando.
- Increment: incrementa en 1 el operando.
- Decrement: decrementa en 1 el operando.

## Operaciones lógicas

En el ámbito de las operaciones lógicas, se trabaja con datos booleanos o binarios, manipulando bits individuales dentro de una palabra o unidad direccionable. Estas operaciones son fundamentales en la programación y en la lógica de computadoras. Los aspectos clave de estas operaciones:
1. **Operaciones Lógicas Básicas**: Las operaciones lógicas básicas incluyen NOT (inversión de un bit), AND (conjunción), OR (disyunción) y XOR (OR-exclusiva). Estas operaciones son utilizadas para realizar comparaciones y manipulaciones de bits en datos binarios.
2. **Aplicación Bit a Bit**: Estas operaciones pueden aplicarse bit a bit, lo que significa que se realizan operaciones entre los bits correspondientes de dos palabras o registros. Por ejemplo, el resultado de una operación AND entre dos registros dará como resultado un registro que tiene 1 en aquellos bits donde ambos registros tenían 1.
3. **Uso de Máscaras**: Una de las aplicaciones comunes de las operaciones lógicas es el uso de máscaras. Por ejemplo, al realizar una operación AND con una máscara, se pueden seleccionar ciertos bits de una palabra, poniendo a cero los restantes. Esto es útil para aislar ciertos campos dentro de una palabra de datos.
4. **Operaciones de Desplazamiento**: Además de las operaciones lógicas, muchas arquitecturas de computadoras ofrecen operaciones de desplazamiento. Estas operaciones permiten desplazar los bits de una palabra hacia la izquierda o hacia la derecha. Los desplazamientos lógicos son útiles para aislar campos dentro de una palabra. Por ejemplo, para transmitir caracteres de datos a un dispositivo de E/S, se pueden usar desplazamientos para separar caracteres empaquetados en una palabra.
5. **Desplazamiento Aritmético**: En algunos casos, se utiliza el desplazamiento aritmético, que trata el dato como un número con signo y no desplaza el bit de signo. En un desplazamiento aritmético a la derecha, el bit de signo generalmente se replica en la posición de bit de su derecha. Esto puede ser útil para ciertas operaciones aritméticas.
6. **Rotación**: La rotación, también conocida como desplazamiento cíclico, preserva todos los bits y permite moverlos en un ciclo. Esto puede ser útil en operaciones de manipulación de datos donde se necesita desplazar los bits manteniendo su integridad.

## Operación de transformación

1. **Instrucción de Traducción (TR)**: En el ejemplo proporcionado, se utiliza la instrucción de traducción (TR) del S/390 para convertir datos de un formato a otro. Esta instrucción tiene tres operandos:
    - `TR R1, R2, L`: Donde `R1` contiene la dirección de inicio de los datos a convertir, `R2` contiene la dirección de inicio de una tabla de códigos de ocho bits y `L` especifica la longitud de los datos a traducir en bytes.
2. **Ejemplo de Conversión de EBCDIC a ASCII**: En este caso, se desea convertir una secuencia de dígitos en formato EBCDIC a formato ASCII. Para lograrlo, se ha creado previamente una tabla que relaciona los códigos EBCDIC con los códigos ASCII. La tabla debe estar organizada de manera que el código EBCDIC del carácter se corresponda con la posición relativa del carácter ASCII en la tabla.
3. **Ejemplo Detallado**:
    - Las posiciones de memoria 2100-2103 contienen la secuencia de dígitos en formato EBCDIC: F1 F9 F8 F4.
    - `R1` contiene 2100, lo que indica la dirección de inicio de los datos a convertir.
    - `R2` contiene 1000, que es la dirección de inicio de la tabla de códigos de conversión.
    - Al ejecutar la instrucción `TR R1, R2, 4`, se traducen los 4 bytes (L=4) desde la dirección 2100 en formato EBCDIC a formato ASCII, utilizando la tabla de códigos de conversión.
4. **Resultado de la Conversión**: Después de la ejecución de la instrucción de traducción, los contenidos de las posiciones 2100 a 2103 se habrán convertido a 31 39 38 34, que representan los dígitos 1, 9, 8 y 4 en formato ASCII.

## Operaciones de entrada/salida

Como vimos, existen aproximaciones muy diversas, incluyendo entradas/salidas programadas aisladas, entradas/salidas programadas asignadas en memoria, DMA, y el uso de un procesador de E/S. Muchas implementaciones ofrecen solo unas pocas instrucciones de E/S, con acciones específicas indicadas mediante parámetros, códigos o palabras de órdenes.

## Operaciones de control del sistema

Son por lo general instrucciones privilegiadas que pueden ejecutarse solo mientras el procesador está en un estado privilegiado concreto. Normalmente están reservadas para que las use el sistema operativo.


## Operaciones de control de flujo

- Instrucciones de bifurcación
	- Las instrucciones de bifurcación, también conocidas como instrucciones de salto, son operaciones en las que una de sus partes contiene la dirección de la siguiente instrucción a ejecutar. Las más comunes son las instrucciones de salto condicional, que dependen de una condición para bifurcar o saltar a una dirección específica. Si la condición se cumple, se actualiza el contador de programa con la dirección especificada en el operando; de lo contrario, se ejecuta la siguiente instrucción en la secuencia, como es habitual.
- instrucciones de salto implícito
	- Esta instrucción incluye una dirección de manera implícita. Implica que se va a saltar a una dirección, por lo tanto la dirección implícita es igual a la dirección de la siguiente instrucción mas la longitud de la instrucción
- Instrucciones de llamada a procedimiento
	- En cualquier punto del programa se puede invocar o llamar a un procedimiento.
	- La utilización de procedimientos requiere de dos instrucciones básicas: una instrucción de llamada (Call), que produce una bifurcación desde la posición actual al procedimiento; y una instrucción de retorno del procedimiento (Return) al lugar desde el que se llamó. Ambas son modalidades de instrucciones de bifurcación.
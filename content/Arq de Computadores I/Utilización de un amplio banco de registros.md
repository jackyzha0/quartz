# Utilización de un amplio banco de registros

%%
Date:: [[2023-10-26]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Repertorio de Instrucciones simple (RISC)]][[Características de ejecución de las instrucciones RISC]]
%%

- Existe una solución por software, con algoritmos, que nos permite optimizar el acceso a registros.

## Ventanas de Registros
Las ventanas de registros son una técnica utilizada en la arquitectura de computadores para optimizar el acceso a memoria y la gestión de registros en un procesador. A continuación, se presenta un resumen teórico ordenado sobre este concepto:

1. **Objetivo de las Ventanas de Registros**:
   El propósito fundamental de las ventanas de registros es reducir la necesidad de acceder a la memoria principal. Para lograr esto, se organizan conjuntos amplios de registros de tal manera que se pueda aprovechar la localidad de datos y operaciones en procedimientos.

2. **Problema de la Variabilidad Local**:
   La definición de datos locales varía con cada llamada y retorno de procedimiento, lo que requiere guardar y recuperar datos en memoria cada vez que se cambia de procedimiento.

3. **Múltiples Conjuntos de Registros**:
   Para abordar este problema, se utilizan múltiples conjuntos pequeños de registros, asignando cada conjunto a un procedimiento específico. Cuando se llama a un procedimiento, el procesador conmuta automáticamente a un conjunto de registros distinto de tamaño fijo en lugar de guardar los registros en memoria.

4. **Solapamiento de Ventanas**:
   Las ventanas de registros de procedimientos adyacentes se superponen parcialmente, lo que permite el paso eficiente de parámetros entre procedimientos. Cada ventana de registros se divide en tres áreas de tamaño fijo: registros de parámetros, registros locales y registros temporales.![[Pasted image 20231026153004.png | center]]
   - Cuando se excede el límite de anidamiento o de profundidad de niveles, lo que el procesador hace es transferir los datos de las variales más "globales" a memoria caché (hasta 8 llamadas anidadas suelen estar en el 20%)
   
5. **Ventanas Visibles y Accesibles**:
   En cualquier momento dado, solo una ventana de registros es visible y se direcciona como si fuera el único conjunto de registros. Esto se logra mediante un puntero de ventana en curso (CWP) que apunta a la ventana del procedimiento activo en ese momento.

6. **Organización Circular de Ventanas**:
   Para manejar cualquier patrón posible de llamadas y retornos, se implementa una organización circular de ventanas de registros. Las activaciones más antiguas se guardan en memoria y se restauran cuando la profundidad de anidamiento disminuye.![[Pasted image 20231026153559.png]]

7. **Ejemplos de Implementación**:
   Dos ejemplos notables de esta solución son la arquitectura SPARC de Sun y la arquitectura IA-64 utilizada en el procesador Itanium de Intel. Ambas implementan ventanas de registros de manera eficiente.

8. **Transformación de Referencias de Instrucciones**:
   Las referencias de instrucciones a registros se transforman utilizando el puntero de ventana en curso (CWP) para determinar el registro físico real al que se hace referencia.

9. **Manejo de Solapamiento de Ventanas**:
   Cuando hay un solapamiento de ventanas, como en el caso de una llamada al procedimiento F desde E, se debe gestionar cuidadosamente para evitar la sobrescritura de registros. Esto implica interrupciones y salvaguardar ventanas en memoria.


>[!quote] 
>En resumen, las ventanas de registros son una estrategia eficiente para gestionar registros en arquitecturas de computadoras, permitiendo el paso de parámetros y la optimización del acceso a memoria. Esta técnica se ha implementado en diversas arquitecturas de procesadores para mejorar el rendimiento en la gestión de procedimientos.


## Variables Globales
Existen dos posibles enfoques para abordar el almacenamiento de variables globales en un entorno de programación. El esquema de ventanas previamente descrito proporciona una eficiente organización para el almacenamiento de variables locales en registros, pero no aborda la necesidad de almacenar variables globales, que son accedidas por más de un procedimiento. Se sugieren dos opciones para abordar este problema:

**Opción 1: Asignación de posiciones de memoria**
Una alternativa es que el compilador asigne posiciones de memoria a las variables declaradas como globales en un lenguaje de alto nivel (HLL). Todas las instrucciones de máquina que hacen referencia a esas variables utilizarán operandos que hacen referencia a la memoria. Este enfoque es sencillo tanto desde el punto de vista del hardware como del software, ya que no se requieren registros globales adicionales. Sin embargo, para variables globales a las que se accede con frecuencia, este esquema puede resultar ineficiente debido a la latencia asociada con el acceso a la memoria.

**Opción 2: Registros Globales**
La segunda opción propone incorporar al procesador un conjunto de registros globales. Estos registros serían fijos en cuanto a su número y accesibles por todos los procedimientos. Se podría utilizar un esquema de numeración unificado para simplificar el formato de instrucción. Por ejemplo, los registros del 0 al 7 podrían utilizarse para representar registros globales únicos, y los registros del 8 al 31 podrían utilizarse para representar registros físicos de la ventana en curso. Este enfoque implica la adición de hardware adicional en el procesador para gestionar la división en el direccionamiento de los registros. Además, el compilador debe tomar decisiones sobre qué variables globales deben asignarse a estos registros globales.


## Banco de registros vs Caché
El texto analiza la comparación entre un banco de registros organizado en ventanas y una caché en el contexto del almacenamiento de variables escalares locales en un sistema de procesamiento. Aquí hay un resumen de los puntos clave:

**Banco de registros organizado en ventanas:**
- Funciona como un buffer rápido que contiene un subconjunto de todas las variables escalares locales de las activaciones de procedimientos más recientes.
- Guarda todas las variables locales y ahorra tiempo en el acceso a estas variables.
- Puede ser ineficiente en el uso del espacio, ya que no todos los procedimientos necesitarán todo el espacio de ventana asignado.
- La transferencia de datos entre registros y memoria está determinada por la profundidad de anidamiento de los procedimientos, lo que hace que el acceso a la memoria sea relativamente poco frecuente.
- Ofrece un acceso más rápido a datos escalares locales debido a un coste de direccionamiento más bajo.

**Caché:**
- Contiene una selección de las variables escalares utilizadas recientemente y es capaz de manejar tanto variables globales como locales.
- Puede reaccionar dinámicamente y ahorrar espacio de almacenamiento al tratarse de datos de memoria.
- Lee datos en bloques, lo que puede resultar en la lectura de datos innecesarios.
- La complejidad del direccionamiento depende del modo de direccionamiento y puede ser más costosa en términos de tiempo de acceso en comparación con un banco de registros.

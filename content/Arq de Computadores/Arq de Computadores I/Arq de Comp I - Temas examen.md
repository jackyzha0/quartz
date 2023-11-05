[[Arquitectura de Computadores I]]

# Primer Parcial

**Capítulo 1: Introducción**
1. ¿Qué es una computadora?
2. Organización y Arquitectura
3. Estructura y Funcionamiento
   a. Funcionamiento
      i. Procesamiento de datos
      ii. Almacenamiento de datos
      iii. Transferencia de datos
      iv. Control
   b. Estructura
      i. Unidad Central de Procesamiento (CPU)
      ii. Memoria Principal
      iii. E/S
      iv. Sistemas de interconexión

**Capítulo 2: Evolución y Prestaciones de las Computadoras**
1. Hitos que determinan las distintas generaciones de las computadoras
2. Máquina de Von Neumann (IAS)
3. Diseño buscando mejores prestaciones (Velocidad del microprocesador / Equilibrio de prestaciones / Mejoras en la organización y arquitectura de chips)

**Capítulo 3: Sistemas de Numeración**
1. Sistemas Decimal / Binario / Octal / Hexadecimal
2. Conversión entre los diferentes sistemas
   a. Enteros
   b. Fraccionarios

**Capítulo 4: Sistemas Digitales**
1. Algebra de Boole
2. Mapas de Karnaught
3. Compuertas lógicas
4. Circuitos combinacionales (Multiplexores / Demultiplexores / Codificadores / Decodificadores).
5. Circuitos Aritméticos (Sumadores Binarios/ Semisumadores / Sumadores Completos).
6. Circuitos Secuenciales (Biestables - Flip-Flops R-S, J-K, D)- Dispositivos Sincrónicos y Asicrónicos - Registro - Contadores)
7. Memorias (Celda de memoria / Unidades de memoria RAM / Ampliaciones de memoria / Memorias ROM)

**Capítulo 5: Perspectiva de alto nivel del funcionamiento y conexiones**
1. Componentes de la Computadora
2. Funcionamiento de la Computadora (Los ciclos de búsqueda y ejecución / Interrupciones / Funcionamiento de las E/S)
3. Interconexión con buses (Estructura del bus/ Jerarquía de buses múltiples / Elementos de diseño de un bus)
4. Bus PCI (Estructura / Ordenes)
5. Arbitraje en un bus

**Capítulo 6: Jerarquía de Memorias, Memoria Caché y Memoria interna**
1. Explicar la organización jerárquica de la memoria de un computador, y las características de cada una de ellas.
2. ¿Cuáles son las características claves de los sistemas de memoria?. Analizar cada una de ellas.
3. Explicar las restricciones de diseño de la memoria de un computador con las cuales debe trabajar un diseñador.
4. Explicar los tipos de memorias semiconductoras de acceso aleatorio, y sus características.
5. Explicar el funcionamiento de una celda de memoria.
6. Explicar el funcionamiento de la memoria caché.
7. ¿Cuáles son los elementos de diseño de la memoria caché?. Analizar cada uno de ellos.
8. Características de los sistemas de memoria.
9. Jerarquía de memoria.
10. Principios básicos de las memorias caché.
11. Elementos de diseño de la caché (Tamaño de la caché / Funciones de correspondencia / Algoritmos de sustitución / Políticas de escritura / Tamaño de la línea / Número de cachés).
12. Memoria principal semiconductora (Organización / DRAM y SRAM / Tipos de ROM / Lógica del chip / Encapsulado de los chips / Organización de los módulos).

# Segundo Parcial

**Capítulo 1: Introducción**
- Funcionamiento de Máquina de Von Neumann
	- [[Arquitectura de Von Neumann]]

**Capítulo 7: Entrada/Salida**
- Módulos de E/S (7.2)
	-  [[Funciones de un módulo ES#Principales funciones de un módulo]]
	- [[Funciones de un módulo ES#Estructura de un módulo de E/S]]
- E/S programada (7.3)
	- [[ES Programadas#Resumen de la E/S Programada]]
	- [[ES Programadas#Órdenes de E/S]]
	- [[ES Programadas#Instrucciones de E/S]]
- Entrada/Salida mediante interrupciones (7.4)
	- [[ES con Interrupciones#ES mediante interrupciones]]
	- [[ES con Interrupciones#Procesamiento de la Interrupción]]
	- [[ES con Interrupciones#Cuestiones de diseño]]
- Acceso directo a memoria (7.5) 
	- [[DMA#Inconvenientes de la ES Programadas y ES con Interrupciones]]
	- [[DMA#Funcionamiento del DMA]]
- Canales y procesadores de E/S (7.6)
   - [[Canales y Procesadores de ES#Evolución del funcionamiento de las ES]]
   - [[Canales y Procesadores de ES#Características de los canales de E/S]]

**Capítulo 8: Aritmética de la Computadora**
- La Unidad Aritmético – lógica
- Representación de enteros
   - Representación en signo y magnitud
   - Representación en complemento a dos
   - Conversión entre estructuras de longitudes de bits diferentes
   - Representación en punto fijo
- Representación en punto flotante
   - Fundamentos

**Capítulo 9: Repertorio de Instrucciones: características y funciones**
- Características de las instrucciones de máquina
   - Elementos de una instrucción máquina
   - Representación de las instrucciones
   - Tipos de instrucciones
   - Número de direcciones
   - Diseño del repertorio de instrucciones
- Tipos de operandos
   - Números
   - Caracteres
   - Datos lógicos
- Tipos de operaciones
   - Transferencia de datos
   - Aritméticas
   - Lógicas
   - Conversión
   - Entrada / Salida
   - Control del sistema
   - Control de flujo
- Lenguaje Ensamblador

**Capítulo 10: Repertorio de Instrucciones: modos de direccionamiento y formatos**
- Direccionamiento
   - Direccionamiento inmediato
   - Direccionamiento directo
   - Direccionamiento indirecto
   - Direccionamiento de registros
   - Direccionamiento indirecto con registro
   - Direccionamiento con desplazamiento
   - Direccionamiento de pila
- Formato de instrucciones
   - Longitud de instrucción
   - Asignación de los bits
   - Instrucciones de longitud variable

**Capítulo 11: Estructura y funcionamiento del procesador**
- Organización del procesador
- Organización de los registros
   - Registros visibles por el usuario
   - Registros de control y de estado
   - Ejemplos de organizaciones de registros de microprocesadores
- Ciclo de instrucción
   - El ciclo indirecto
   - Flujo de datos
- Segmentación de Instrucciones
   - Estrategia de segmentación

**Capítulo 12: Computadoras de repertorio reducido de Instrucciones (RISC)**
- Característica de la ejecución de instrucciones
   - Operaciones
   - Operandos
   - Llamadas a procedimientos
   - Consecuencias
- Utilización de un amplio espectro de registros
   - Ventanas de registros
   - Variables globales
   - Un amplio banco de registros frente a una caché
- Optimización de registros basada en el compilador
- Arquitectura de repertorio reducido de instrucciones
   - ¿Por qué CISC?
   - Características de las arquitecturas RISC
   - Características de CISC frente a RISC
- Segmentación en RISC
   - Segmentación con instrucciones regulares
   - Optimización de la segmentación

**Capítulo 13: Funcionamiento de la unidad de control**
- Microoperaciones
   - Ciclo de búsqueda
   - El ciclo indirecto
   - El ciclo de interrupción
   - El ciclo de ejecución
   - El ciclo de instrucción
- Control del procesador
   - Requisitos fundamentales
   - Señales de control
   - Un ejemplo de señales de control
   - Organización interna del procesador
- Implementación cableada
   - Entradas de la unidad de control
   - Lógica de la unidad de control

**Capítulo 14: Control microprogramado**
- Conceptos básicos
   - Microinstrucciones
   - Unidad de control microprogramada
- Secuenciamiento de microinstrucciones
   - Consideraciones respecto al diseño
   - Técnicas de secuenciamiento
   - Generación de direcciones
- Ejecución de microinstrucciones
   - Una taxonomía de las microinstrucciones
   - Codificación de las microinstrucciones


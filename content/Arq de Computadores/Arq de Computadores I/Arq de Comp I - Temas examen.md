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
	- [[Funciones de un módulo ES#Estructura de un módulo de ES]]
- E/S programada (7.3)
	- [[ES Programadas#Resumen de la ES Programada]]
	- [[ES Programadas#Órdenes de ES]]
	- [[ES Programadas#Instrucciones de ES]]
- Entrada/Salida mediante interrupciones (7.4)
	- [[ES con Interrupciones#ES mediante interrupciones]]
	- [[ES con Interrupciones#Procesamiento de la Interrupción]]
	- [[ES con Interrupciones#Cuestiones de diseño]]
- Acceso directo a memoria (7.5) 
	- [[DMA#Inconvenientes de la ES Programadas y ES con Interrupciones]]
	- [[DMA#Funcionamiento del DMA]]
- Canales y procesadores de E/S (7.6)
   - [[Canales y Procesadores de ES#Evolución del funcionamiento de las ES]]
   - [[Canales y Procesadores de ES#Características de los canales de ES]]

**Capítulo 8: Aritmética de la Computadora**
- [[Unidad Aritmética Lógica#ALU]]
- [[Representación de enteros]]
   - [[Representación de enteros#Representación en signo y magnitud]]
   - [[Representación de enteros#Representación en signo y magnitud]]
   - [[Representación de enteros#Conversión entre longitudes de bits diferentes]]
   - [[Representación de enteros#Representación en coma fija]]
- [[Representación en coma flotante]]
   - [[Representación en coma flotante#Fundamentos]]

**Capítulo 9: Repertorio de Instrucciones: características y funciones [[Repertorio de instrucciones]]**
- [[Instrucciones máquina]]
   - [[Instrucciones máquina#Características de las instrucciones máquina]]
   - [[Instrucciones máquina#Representaciones de las instrucciones máquina]]
   - [[Instrucciones máquina#Tipos de instrucciones de una computadora]]
   - [[Instrucciones máquina#Número de direcciones]]
   - [[Instrucciones máquina#Diseño del repertorio de instrucciones]]
- [[Tipos de operandos]]
- [[Tipos de operaciones]]
   - [[Tipos de operaciones#Operaciones de transferencia de datos]]
   - [[Tipos de operaciones#Operaciones aritméticas]]
   - [[Tipos de operaciones#Operaciones lógicas]]
   - [[Tipos de operaciones#Operación de transformación]]
   - [[Tipos de operaciones#Operaciones de entrada/salida]]
   - [[Tipos de operaciones#Operaciones de control del sistema]]
   - [[Tipos de operaciones#Operaciones de control de flujo]]
- [[Lenguaje Ensamblador]] 

**Capítulo 10: Repertorio de Instrucciones: modos de direccionamiento y formatos**
- [[Metodos de direccionamiento]]
- [[Formato de instrucciones]]
	- [[Formato de instrucciones#Longitud de Instrucción]]
	- [[Formato de instrucciones#Asignación de Bits en la Instrucción]]

**Capítulo 11: Estructura y funcionamiento del procesador**
- [[Organización del Procesador#Organización del procesador]]
- [[Organización de los registros]]
- [[Ciclo de Instrucción]]
   - [[Ciclo de Instrucción#Subciclos de una instrucción]]
   - [[Ciclo de Instrucción#Flujo de datos]]
- [[Segmentación]]

**Capítulo 12: Computadoras de repertorio reducido de Instrucciones (RISC)**
- [[Características de ejecución de las instrucciones RISC]]
   - [[Características de ejecución de las instrucciones RISC#Operaciones]]
   - [[Características de ejecución de las instrucciones RISC#Operandos]]
   - [[Características de ejecución de las instrucciones RISC#Características de ejecución de las instrucciones RISC#Llamadas a procedimientos]]
- [[Utilización de un amplio banco de registros]]
   - [[Utilización de un amplio banco de registros#Ventanas de Registros]]
   - [[Utilización de un amplio banco de registros#Variables Globales]]
   - [[Utilización de un amplio banco de registros#Banco de registros vs Caché]]
- [[Optimización de registros basada en el compilador]]
- [[Arquitectura RISC]]
   - [[Arquitectura RISC#Arquitectura RISC]]
   - [[Arquitectura RISC#Características de las arquitecturas RISC]]
   - [[Arquitectura RISC#RISC VS CISC]]
- [[Segmentación en RISC]]

**Capítulo 13: Funcionamiento de la unidad de control**
- [[Microoperaciones]]
   - [[Microoperaciones#El ciclo de captación]]
   - [[Microoperaciones#El ciclo indirecto]]
   - [[Microoperaciones#El ciclo de interrupción]]
   - [[Microoperaciones#El ciclo de ejecución]]
   - [[Microoperaciones#El ciclo de instrucción]]
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


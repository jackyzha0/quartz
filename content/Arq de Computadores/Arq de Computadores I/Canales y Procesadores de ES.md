# Canales y Procesadores de ES

%%
Date:: [[2023-08-24]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Dispositivos Externos]]
%%

## Evolución del funcionamiento de las ES
1. **Control Directo por la CPU:**
   - La CPU controla directamente los periféricos.
   - Usado en dispositivos simples controlados por microprocesadores.
2. **Controlador de E/S Agregado:**
   - Se añade un controlador o módulo de E/S.
   - La CPU utiliza E/S programada sin interrupciones.
   - Independencia de detalles de interfaces de dispositivos externos.
3. **Interrupciones Implementadas:**
   - Misma configuración del paso 2, pero con interrupciones.
   - La CPU no espera la operación de E/S, mejora la eficiencia.
4. **Acceso Directo a Memoria (DMA):**
   - El módulo de E/S accede a memoria a través de DMA.
   - Transferencias de datos sin involucrar a la CPU, excepto inicio y fin.
5. **Procesador de E/S Especializado:**
   - Módulo de E/S actúa como procesador con instrucciones orientadas a E/S.
   - CPU ejecuta programa de E/S en memoria.
   - Procesador de E/S ejecuta instrucciones sin intervención CPU.
   - CPU puede especificar secuencia de actividades de E/S.
6. **Módulo de E/S como Computadora Independiente:**
   - Módulo de E/S tiene memoria local, es un computador independiente.
   - Control de varios dispositivos de E/S con mínima intervención CPU.
   - Usado en comunicación con terminales interactivos.
   - Procesador de E/S maneja tareas de control de terminales.


## Características de los canales de ES
- **Ampliación del Concepto de DMA:**
  - Canal de E/S es una expansión del concepto de DMA (Acceso Directo a Memoria).
  - Puede ejecutar instrucciones de E/S, control completo sobre operaciones de E/S.
- **Control de Instrucciones de E/S:**
  - En un computador con canales de E/S, CPU no ejecuta instrucciones de E/S.
  - Instrucciones de E/S se almacenan en memoria para ser ejecutadas por un procesador especial en el canal de E/S.
- **Ejecución de Programas Específicos:**
  - CPU inicia transferencia de E/S, indica al canal de E/S que ejecute un programa desde memoria.
  - Programa en memoria especifica dispositivos, áreas de memoria, prioridades y acciones en errores.
  - Canal de E/S sigue instrucciones y controla transferencia de datos.
- **Tipos Comunes de Canales de E/S:**
  - **Canal Selector:**
    - Controla dispositivos de alta velocidad.
    - En un momento dado, transfiere datos a uno de los dispositivos seleccionados.
    - Dispositivos manejados por controladores o módulos de E/S.
  - **Canal Multiplexor:**
    - Maneja E/S de múltiples dispositivos simultáneamente.
    - Para dispositivos de velocidad reducida.
    - Multiplexor de byte acepta/transmite caracteres rápidamente a varios dispositivos.


![[Pasted image 20231125101608.png]]
![[Pasted image 20230824171719.png]]
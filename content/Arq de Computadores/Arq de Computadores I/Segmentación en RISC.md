# Segmentación en RISC

%%
Date:: [[2023-10-26]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Repertorio de Instrucciones simple (RISC)]]
%%

## SEGMENTACIÓN CON INSTRUCCIONES REGULARES
La segmentación de instrucciones es una técnica clave para mejorar el rendimiento de los procesadores. En el contexto de la arquitectura RISC, se puede utilizar para acelerar la ejecución de instrucciones. A continuación, se describe la segmentación con instrucciones regulares en formato de texto y se discuten sus ventajas y limitaciones:

**Sin Segmentación:**

- Fases: Captación de instrucción (I) y Ejecución (E).
- Proceso costoso y no aprovecha al máximo el rendimiento del procesador.

**Segmentación de Dos Etapas:**

- Fases: Captación de instrucción (I) y Ejecución (E).
- Permite que las etapas I y E de dos instrucciones diferentes se ejecuten simultáneamente.
- Ofrece el doble de velocidad de ejecución en comparación con la no segmentación.
- Problemas: Memoria de un único puerto, necesidad de esperas en algunas instrucciones y saltos interrumpen el flujo secuencial de ejecución.

**Segmentación de Tres Etapas:**

- Fases: Captación de instrucción (I), Ejecución (E), y Memoria (D).
- Permite hasta tres instrucciones solapadas y mejora el rendimiento.
- Problemas similares a la segmentación de dos etapas, como saltos y dependencias de datos.

**Segmentación de Cuatro Etapas:**

- Fases: Captación de instrucción (I), Lectura del banco de registros (E1), Operación de la ALU y escritura en el registro (E2), y Memoria (D).
- Hasta cuatro instrucciones pueden estar en curso simultáneamente.
- Potencial de mejora de rendimiento de hasta un factor de 4 en comparación con la no segmentación.
- Se pueden usar instrucciones NOOP para gestionar retardos debido a saltos y dependencias de datos.

La segmentación con instrucciones regulares es particularmente eficaz en arquitecturas RISC debido a la simplicidad y regularidad de su repertorio de instrucciones. Permite un mayor paralelismo en la ejecución de instrucciones y, por lo tanto, un mejor rendimiento. Sin embargo, aún existen desafíos, como la gestión de saltos y dependencias de datos, que requieren la inserción de instrucciones NOOP para mantener el flujo correcto de ejecución.

![[Pasted image 20231026163237.png]]


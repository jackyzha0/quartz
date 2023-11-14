# Metodos de direccionamiento

%%
Date:: [[2023-09-14]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Repertorio de instrucciones]]
%%

En el contexto de la arquitectura de computadores, los modos de direccionamiento son técnicas utilizadas para acceder a los operandos o datos en la memoria o registros de la CPU. Cada modo de direccionamiento tiene su propio propósito y características. Aquí se explican brevemente los modos de direccionamiento que mencionaste:

1. **Modo Inmediato**:
   - En este modo, los operandos se encuentran en la propia instrucción.
   - Se utiliza para representar valores constantes o inmediatos.
   - No requiere acceder a la memoria principal.
   - Ejemplo: `ADD R1, #5` (suma el registro R1 con el valor inmediato 5).

2. **Modo Directo**:
   - Los operandos se encuentran en una dirección de memoria específica.
   - La dirección de memoria se especifica directamente en la instrucción.
   - Se utiliza para acceder a datos almacenados en una ubicación de memoria fija.
   - Ejemplo: `LOAD R2, 1000` (carga el contenido de la dirección de memoria 1000 en el registro R2).

3. **Modo Indirecto**:
   - La dirección de memoria en la instrucción apunta a una ubicación de memoria que contiene la dirección real del operando.
   - Permite la indirección y es útil para acceder a estructuras de datos o tablas.
   - Ejemplo: `LOAD R3, (R1)` (carga en R3 el contenido de la dirección almacenada en el registro R1).

4. **Modo Registro**:
   - En este modo, los operandos se encuentran en registros de la CPU.
   - Las instrucciones trabajan directamente con registros.
   - Es rápido pero limitado en términos de capacidad de direccionamiento.
   - Ejemplo: `ADD R4, R5` (suma el contenido de R5 al registro R4).

5. **Modo Indirecto con Registro**:
   - Combina la indirección con el uso de registros.
   - La dirección se almacena en un registro y se utiliza para acceder a la memoria.
   - Muy flexible y se utiliza en situaciones donde se requiere una indirección controlada por el programador.
   - Ejemplo: `LOAD R6, (R7)` (carga en R6 el contenido de la dirección almacenada en el registro R7).

6. **Modo con Desplazamiento**:
   - Combina una dirección base y un desplazamiento para acceder a la memoria.
   - Útil para acceder a elementos en estructuras de datos.
   - Permite indexar matrices o tablas de manera eficiente.
   - Ejemplo: `LOAD R8, 1000(R9)` (carga en R8 el contenido de la dirección 1000 más el valor en R9).

7. **Modo Pila**:
   - Implica el uso de una estructura de datos tipo pila para acceder a operandos.
   - Las operaciones PUSH y POP se utilizan para agregar y quitar elementos de la pila.
   - Se usa comúnmente en la administración de llamadas a funciones y gestión de registros de activación.
   - Ejemplo: `PUSH R10` (apila el contenido de R10) o `POP R11` (desapila el valor superior en R11).

![[Pasted image 20230914173549.png | center | 400]]
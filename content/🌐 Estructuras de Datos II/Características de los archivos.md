# Características de los archivos

- Date:: [[]]
- Course:: [[Estructuras de Datos II]]
- Source:: [[4 - Archivos]]

### Componentes físicos de un sistema de computación

![Untitled](Images/Características%20de%20los%20archivos/Untitled.png)

- BIOS
    - Es un software que se encuentra en todos los dispositivos (no solo la mother)
    - Se encuentra guardado en una memoria de tipo ROM
    - Lo primero en cargarse al encender la PC
- Dispositivo de almacenamiento es todo aparato que se utilice para grabar los datos de la computadora de forma permanente o temporal.

![Untitled](Images/Características%20de%20los%20archivos/Untitled%201.png)

## Medios de Almacenamientos

- **Medios de almacenamientos primarios**
    - **Memoria ROM**
        - PROM: Solo lectura
        - EPROM Escritura con rayos ultravioletas
        - EEPROM Se puede borrar y reprogramar
        - Memoria Flash
            - flash NOR
            - flash NAND
    - **Memoria RAM**
        
        Sitio donde se almacenan principalmente todos los programas en el momento de ejecución.
        
        ![Untitled](Images/Características%20de%20los%20archivos/Untitled%202.png)
        
        - Memoria Caché
            
            ![Untitled](Images/Características%20de%20los%20archivos/Untitled%203.png)
            
            - La L1 está unida al micro, mientras que la L2 se encuentra un poco más separada
                
                ![Untitled](Images/Características%20de%20los%20archivos/Untitled%204.png)
                

- **Dispositivos de almacenamiento secundarios**
    - Dispositivos de bloque
        - La información se almacena en bloques de tamaño fijo.
        - Cada bloque tiene su propia dirección.
        - Los tamaños más comunes de los bloques van desde los 128 bytes hasta los 1.024 bytes.
        - Se puede leer o escribir en un bloque de forma independiente de los demás, en cualquier momento.
        - Un ejemplo típico de dispositivos de bloque son los discos.
    - Dispositivos de carácter
        - La información se transfiere como un flujo de caracteres, sin sujetarse a una estructura de bloques.
        - No se pueden utilizar direcciones.
        - No tienen una operación de búsqueda.
        - Un ejemplo típico de dispositivos de carácter son las impresoras de línea, terminales, interfaces de una red, ratones, etc.
    

## Terminología de los Datos

### Registro

**Campo**: Conjunto de caracteres capaz de suministrar una determinada información referida a un concepto

**Clave**: Es el campo del registro lógico que sirve para identificar al registro al que pertenece

**Clave secundaria**: combinación de la clave propia, pero que no es única.

**Registro**: Conjunto de campos referentes a una entidad en particular y constituyen una unidad para su proceso

**Archivo**: Colección nominada de todas las ocurrencias de un tipo de registro lógico dado

**Base de datos**: Colección de ocurrencias de múltiples tipos de registros.

**Sistema operativo**: Conjunto de programas, cada uno de los cuales está diseñado para manejar diferentes recursos del computador

- Administrador de archivos
    - Conjunto de capas de procedimientos donde las capas superiores tratan principalmente con los aspectos simbólicos o lógicos y las capas inferiores tratan con los aspectos específicos de los dispositivos físicos
- Registros lógicos
    - Aquello que le interesa al programador
    - Agrupación de datos que está relacionado con una sola cosa. No me interesa cómo se guardan, eso será cuestión de los registros físicos.
- Registros físicos
    - Es aquello que guardamos en un disco rígido (de forma magnética). Su tamaño y orden en el que se guarda no está relacionado con el del registro lógico
    
    ![Untitled](Images/Características%20de%20los%20archivos/Untitled%205.png)
    

### Administrador de Archivos

Dentro de los registros, vamos a definir una entrada y salida física y lógica

- IO físico
    - Aquella entrada/salida en la cual la unidad de transferencia coincide con la unidad física adecuada al dispositivo, por ejemplo pistas de un disco.
- IO lógica
    - Es aquella en términos relevantes para el programador

Pasos a dar para hacer la escritura de un archivo

1. El programa del usuario, hace la llamada inicial al sistema operativo.
2. El administrador de archivos del sistema operativo, utiliza tablas (que mantiene y maneja) con información para pasar desde el punto de vista lógico al físico. Para este caso como debe agregar el byte al archivo, necesita saber dónde está el final del archivo, es decir la posición física de su último sector.
3. La información anterior se remite al procesador de e/s y su software que sincroniza la transmisión del byte, desde la RAM al disco.
4. El controlador del disco y su software dan instrucciones al dispositivo de cómo encontrar la pista y sector apropiados.
5. El dispositivo recibe el byte y lo deposita en la superficie del disco.

![Untitled](Images/Características%20de%20los%20archivos/Untitled%206.png)

- Puesto que el tiempo de transferencia suele ser lento con respecto a la velocidad del CPU, se utiliza un **buffer**
    - Parte de la memoria principal, que está disponible para almacenar bloques de datos que van a ser transferidos entre un dispositivo y la memoria principal.
    - Es como una memoria que nos permite almacenar lo que necesitemos utilizar
    - Dentro del buffer tenemos
        - Tiempo de desplazamiento: Lo que le lleva al brazo ubicarse
        - Retraso de rotación: Hasta que el disco está en la posición correcta
        - Tiempo de transferencia: Lo que le lleva al brazo leer la información
    

### Segmentación

- Muchas veces no se carga la totalidad del programa. Utiliza algunos segmentos que los ubica en la memoria principal, los más importantes

![Untitled](Images/Características%20de%20los%20archivos/Untitled%207.png)

- la estructura del programa refleja su división lógica, llevándose a cabo una agrupación lógica de la información en bloques de tamaño variable

### Paginación

- A diferencia de la segmentación utiliza tamaños fijos
- La paginación es uno de los esquemas de manejo de memoria en donde un computador puede almacenar y recuperar datos de un dispositivo de almacenamiento secundario para su uso en la memoria principal.

![Untitled](Images/Características%20de%20los%20archivos/Untitled%208.png)
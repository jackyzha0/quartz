# Organización de los archivos

- Date:: [[]]
- Course:: [[Estructuras de Datos II]]
- Source:: [[4 - Archivos]]


## Organización de los archivos

- Se refiere a la forma en que los registros se colocan, almacenan o graban en el dispositivo físico durante su creación.
- Acceso al archivo: Es el método utilizado para leer o escribir los registros de un archivo prescindiendo de su organización
- La organización de un archivo se especifica o se construye bajo un programa al crearlo y no puede cambiarse

![Untitled](Images/Organización%20de%20los%20archivos/Untitled.png)

### Modos de acceso

- Acceso secuencial
    - Los registros se leen desde el principio al final del archivo
- Acceso directo
    - cada registro puede leerse directamente sin necesidad de leer los que le preceden. Basta con expresar su dirección relativa en el archivo, obtenido o no por una transformación de su clave
        
        ![Untitled](Images/Organización%20de%20los%20archivos/Untitled%201.png)
        
- Acceso por índice
    - se accede indirectamente a los registros por su clave, mediante consulta secuencial a una tabla que contiene la clave y la dirección relativa de cada registro y posteriormente se hace acceso directo al registro
        
        ![Untitled](Images/Organización%20de%20los%20archivos/Untitled%202.png)
        

## Organización de Archivos

- Secuencial
    - Si o si el modo de acceso será secuencial
    - Los registros que lo forman se han escrito o grabado en el soporte de almacenamiento en posiciones físicas contiguas, en la misma secuencia en que se introdujeron los datos, sin huecos entre ellos (excepto los creados como separación por el sistema) y ordenados o no por un determinado campo clave
    - Para la consulta de un único registro, en promedio hay que leer la mitad de los registros del archivo, operación que puede consumir gran cantidad de tiempo, sobre todo en grandes archivos.
- Indexada
    - Tendré que definir una tabla de índices
- Relativa
    - Un archivo con organización relativa está formado por un conjunto de registros de longitud fija, colocados uno al lado de otro, en un dispositivo de acceso directo
    - Se puede procesar tanto en forma secuencial como directa
    - Cada registro con organización relativa se puede identificar por medio de su dirección relativa: al primer registro se le asigna el valor 1, al segundo el valor 2 y así sucesivamente
        - Directamente, cuando el número de registro coincide con la clave del mismo.
        - Mediante la obtención del número de registro, a través de una transformación matemática de su clave.
    - **Transformación de claves**
        - Direccionamiento directo
            
            ![Untitled](Images/Organización%20de%20los%20archivos/Untitled%203.png)
            
            El método de direccionamiento directo se emplea cuando las claves primarias son números consecutivos o tienen pocos huecos. Al valor de la clave primaria más pequeña se le asocia la dirección relativa 1, a la siguiente la dirección 2 y así sucesivamente
            
        - Tablas de consulta
            
            ![Untitled](Images/Organización%20de%20los%20archivos/Untitled%204.png)
            
            El método de la tabla de consulta asocia la clave primaria de cada registro con su dirección relativa
            
        - Hashing (Desmenuzamiento)
            - A las funciones hash (adopción más o menos directa del término inglés hash function) también se les llama funciones picadillo, funciones resumen o funciones de digest (adopción más o menos directa del término inglés equivalente digest function) Una función hash H es una función computable mediante un algoritmo,
- Secuencial indexada

### Tablas Hash

- En el método de hashing la ubicación o dirección para una clave X, se obtiene computando alguna función f, sobre X. f( X ) nos da la dirección donde está ubicado el registro con clave X , en una zona de memoria.
- La memoria disponible sobre la que se trabajará se asume como secuencial y la denominaremos TABLA HASH (HT).

![Untitled](Images/Organización%20de%20los%20archivos/Untitled%205.png)

- Tratamiento de Rebalse (overflow)
    - Rebalse abierto - Rastreo lineal
        - Si está ocupado, se ocupa el proximo que le sigue
    - Rebalse abierto - Rebalse cuadrático
        - Idem al anterior, pero con los valores cuadráticos
    - Transformaciones hashing sucesivas
    - Rehashing - Rebalse encadenado
        - Si tengo una colisión, entonces encadeno el resto de valores en el bucket

### Archivos indexados

Para lograr este objetivo es necesaria la utilización de un ARCHIVO INDEXADO. Un archivo organizado con esta técnica, se divide en dos partes, o sub-archivos que denominaremos:

- archivo índice
- archivo secundario

![Untitled](Images/Organización%20de%20los%20archivos/Untitled%206.png)

El archivo de datos no está almacenado en secuencia física por un campo, pero se necesita acceso directo a los datos por un campo

![Untitled](Images/Organización%20de%20los%20archivos/Untitled%207.png)

**Indices Enlazados ( Linked Indexes ) :**

- Los Indices Enlazados son índices que usan campos de enlaces para llevar a cabo la búsqueda de un valor de una clave.

**Indices Densos :**

- En los Indices Densos todas las claves de búsqueda están en el índice.

**Indices No Densos:**

- En los Indices No Densos todas las claves de búsqueda no están en el índice. Solo estarán algunas de ellas. Las que están depende de la arquitectura del índice.
    
    ![Untitled](Images/Organización%20de%20los%20archivos/Untitled%208.png)
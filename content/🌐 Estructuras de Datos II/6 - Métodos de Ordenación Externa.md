# 6 - Métodos de Ordenación Externa

- Course:: [[Estructuras de Datos II]]
- Source:: [[]]

#main_page 

## Archivos

- Un archivo o fichero informático es un conjunto de bits almacenado en un dispositivo periférico.
- Definición: Colección de registros del mismo tipo en Memoria Secundaria
- La memoria secundaria requiere que la computadora use sus canales de entrada/salida para acceder a la información.
- Se utiliza para almacenamiento a largo plazo de información persistente.
- La memoria secundaria también se llama "de almacenamiento masivo".
- La mayoría de los sistemas operativos usan los dispositivos de almacenamiento secundario como área de intercambio para incrementar artificialmente la cantidad aparente de memoria principal en la computadora.
- El tiempo necesario para acceder a un byte de información dado almacenado en un disco duro es de unas milésimas de segundo (milisegundos).
- En cambio, el tiempo para acceder al mismo tipo de información en una memoria de acceso aleatorio (RAM) se mide en mil-millonésimas de segundo (nanosegundos).

### Tipo de Archivos

- Secuenciales
    - Lista enlazada con punteros/referencias sobre Memoria Secundaria
- Relativo
    - Array unidimensional (vector) implementado en Memoria Secundaria
    - Cada registro puede estar en cualquier posición del vector
    - No se hace una gestión continua de memoria (los n primeros registros en las n primeras posiciones)
        - Necesidad de un campo que nos indique si esa posición está vacía o llena

### Operaciones Básicas

- Fusión de archivos (mezcla)
    
    ![Untitled](Images/Métodos%20de%20Ordenación%20Externa/Untitled.png)
    
- Partición de archivos
    
    ![Untitled](Images/Métodos%20de%20Ordenación%20Externa/Untitled%201.png)
    
- Clasificación Interna
    
    ![Untitled](Images/Métodos%20de%20Ordenación%20Externa/Untitled%202.png)
    
    - Por contenido
        
        ![Untitled](Images/Métodos%20de%20Ordenación%20Externa/Untitled%203.png)
        
    - Por secuencias
        
        ![Untitled](Images/Métodos%20de%20Ordenación%20Externa/Untitled%204.png)
        

## Clasificación de Archivos

![Untitled](Images/Métodos%20de%20Ordenación%20Externa/Untitled%205.png)

![Untitled](Images/Métodos%20de%20Ordenación%20Externa/Untitled%206.png)

![Untitled](Images/Métodos%20de%20Ordenación%20Externa/Untitled%207.png)

### Ordenamiento por Mezcla Directa

La idea central de este algoritmo consiste en la realización sucesiva de una partición y una fusión que produce secuencias ordenadas de longitud cada vez mayor.

- En la primera pasada la participación es de longitud 1 y la fusión o mezcla produce secuencias ordenadas de longitud 2.
- A cada nueva partición y fusión se duplica la longitud de las secuencias ordenadas.
- El método terminará cuando la longitud de la secuencia ordenada exceda la longitud del archivo a ordenar.
- Podemos pensar en los componentes del vector como las claves de los registros sucesivos del archivo.

### Ordenamiento por Mezcla Natural

Consiste en aprovechar la posible ordenación interna de las secuencias del archivo (F), obteniendo con ellas particiones ordenadas de longitud variable sobre dos ficheros auxiliares F1 y F2. A partir de estos ficheros auxiliares escribiremos un nuevo F mezclando los segmentos crecientes maximales de cada uno de ellos.

### Ordenamiento por Mezcla Secuencial Equilibrada

Este método utiliza la memoria de la computadora para realizar clasificaciones internas y cuatro archivos secuenciales temporales para trabajar.

El proceso es el siguiente:

- Lectura de archivo de entrada por bloques de n elementos.
- Ordenación de cada uno de estos bloques y escritura alternativa sobre F1 y F2.
- Fusión de F1 y F2 en bloques de 2n elementos, que se escriben alternativamente sobre F3 y F4.
- Fusión de F3 y F4 y escritura alternativa, de bloques con 4n elementos ordenados
- El proceso consiste en doblar cada vez el tamaño de los bloques utilizando las parejas (F1,F2) y (F3,F4)
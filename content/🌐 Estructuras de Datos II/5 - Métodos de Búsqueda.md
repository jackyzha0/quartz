# 5 - Métodos de Búsqueda

- Course:: [[Estructuras de Datos II]]
- Source:: [[]]

#main_page 


- La búsqueda (searching) de información está relacionada con las tablas para consulta (lookup).
    - En la práctica, la búsqueda se refiere a la “operación de encontrar la posición de un elemento entre un conjunto de elementos dados: lista, tabla o fichero.”
- Las tablas contienen una cantidad de información que se almacena en forma de parejas de datos.
- Para realizar una búsqueda debe determinarse el campo clave
- Puede ser
    - Búsqueda externa
        - La información se encuentra fuera de la memoria ram
    - Búsqueda interna
        - La información se encuentra en la memoria ram

### Búsqueda Secuencial

- La forma más simple de los métodos de búsqueda, inicia en el principio hasta el final.
- No necesito ningún criterio de ordenamiento previo a la búsqueda

![Untitled](Images/Métodos%20de%20Búsqueda/Untitled.png)

1.- Empezar con el primer elemento de la lista e inicializar la variable que servirá de bandera.

2.- Efectuar la búsqueda mientras hay elementos en la lista y el valor de la llave no se ha encontrado.

3.- Verificar si se encontró el elemento objeto de la búsqueda.

4.- fin

- Este método tiene el inconveniente del consumo excesivo de tiempo en la localización del elemento buscado.
    - Si el elemento no se encuentra, se verifican o comprueba sus n elementos.
    - Si el elemento se encuentra, puede estar primero, último o en algún lugar entre ambos.
- Se puede suponer que el número medio de comprobaciones o comparaciones a realizar es de (n+1)/2.

### Búsqueda Binaria

- La búsqueda binaria es el método más eficiente para encontrar elementos en un arreglo ordenado.
- Necesito un ordenamiento por la clave de búsqueda
- El proceso comienza comparando el elemento central del arreglo con el valor buscado.
- Si ambos coinciden finaliza la búsqueda.
- Si no ocurre así, el elemento buscado será mayor o menor en sentido estricto que el central del arreglo.
- Si el elemento buscado es mayor se procede a hacer búsqueda binaria en el subarreglo superior
- Si el elemento buscado es menor que el contenido de la casilla central, se debe cambiar el segmento a considerar al segmento que está a la izquierda de tal sitio central.

### Busqueda Hash

- Hash es un métodos para transformar claves.
- El método de transformación de claves consiste en convertir la clave dada (numérica o alfanumérica) en una dirección (índice) dentro de un array. La correspondencia entre las claves y la dirección en el medio de almacenamiento o en el array se establece por una función de conversión (función HASH)

![Untitled](Images/Métodos%20de%20Búsqueda/Untitled%201.png)

## Métodos Hashing

### Función Truncamiento

![Untitled](Images/Métodos%20de%20Búsqueda/Untitled%202.png)

![Untitled](Images/Métodos%20de%20Búsqueda/Untitled%203.png)

### Función Plegamiento

![Untitled](Images/Métodos%20de%20Búsqueda/Untitled%204.png)

![Untitled](Images/Métodos%20de%20Búsqueda/Untitled%205.png)

### Función Mitad del Cuadrado

![Untitled](Images/Métodos%20de%20Búsqueda/Untitled%206.png)
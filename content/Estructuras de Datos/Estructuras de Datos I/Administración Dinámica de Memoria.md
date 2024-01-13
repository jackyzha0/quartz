# Administración Dinámica de Memoria

- Date:: [[2022-02-21]]
- Course:: [[Estructuras de Datos I]]

#main_page 

-   Asignación de memoria a procesos mediante **first fit** ↓
    ![https://remnote-user-data.s3.amazonaws.com/F2a_YUdrQEQ4INNQpKqGKXFZpUgL3OxEHeIie6NM867Qxn9GZl_sfAvSMoswEFuCy82UgQdxs8kFC2UyQxGVbgt9_By9K7my61qeHTcMG6OCWo2d-_bbcchIFJfhULjw.png](https://remnote-user-data.s3.amazonaws.com/F2a_YUdrQEQ4INNQpKqGKXFZpUgL3OxEHeIie6NM867Qxn9GZl_sfAvSMoswEFuCy82UgQdxs8kFC2UyQxGVbgt9_By9K7my61qeHTcMG6OCWo2d-_bbcchIFJfhULjw.png)
-   Asignación de memoria a procesos mediante **first fit mejorado**↓ ↓
    
    ![https://remnote-user-data.s3.amazonaws.com/iSe3bC0byGYykknkooo9ij820jQL2esWFx1h5Cd2c8meBUadbyFNKb0MkW3o4wDinz5PaijheS3AksdBgu7qKrbJBQ8rmfXUyeDJPwoZRi-j4UCcxbZGWgdIkKAtdPWz.png](https://remnote-user-data.s3.amazonaws.com/iSe3bC0byGYykknkooo9ij820jQL2esWFx1h5Cd2c8meBUadbyFNKb0MkW3o4wDinz5PaijheS3AksdBgu7qKrbJBQ8rmfXUyeDJPwoZRi-j4UCcxbZGWgdIkKAtdPWz.png)
-   Asignación de memoria a procesos mediante **next fit**↓ ↓
    
    -   En el first fit la búsqueda de un bloque se inicia siempre en el frente de la lista.
    -   Como resultado de esto todos los bloques pequeños tiende a residir en el inicio de la lista, haciendo necesario examinar muchos bloques antes de localizar un tamaño adecuado (sobre todo si el requerimiento es grande).
    -   Una forma de distribuir los bloques chicos alrededor de toda la lista, es iniciar cada nueva búsqueda de un bloque, desde una diferente ubicación. Para implementar esto, el espacio disponible se mantiene como una lista circular, con un nodo cabecera de medida cero. Ahora, Dispo apunta al nodo anterior, desde donde se hizo la última entrega.
-   Asignación de memoria a procesos mediante **best fit** ↓
    
    ![https://remnote-user-data.s3.amazonaws.com/R5AQRQv5KeiFrZScYF67RslLzvP8ztCn8LHFNUP8_0DcXJEI71k7BJQxrgDquY996fSW3_lWeOvmA1s7a6SrO6Z0WjeFLnLg6luaB7WvmWF-hHwJAcnGryhZP1Pew8kD.png](https://remnote-user-data.s3.amazonaws.com/R5AQRQv5KeiFrZScYF67RslLzvP8ztCn8LHFNUP8_0DcXJEI71k7BJQxrgDquY996fSW3_lWeOvmA1s7a6SrO6Z0WjeFLnLg6luaB7WvmWF-hHwJAcnGryhZP1Pew8kD.png)
-   En qué consiste el concepto de compactación?↓ ↓
    
    -   El problema fundamental en la devolución radica en determinar si las áreas contiguas al bloque devuelto se encuentran disponibles y en caso afirmativo actualizar DISPO, compactando.
        
    -   **La cuestión básica es cómo se tiene organizada la lista de espacio disponible.**
        

          ![<https://remnote-user-data.s3.amazonaws.com/9CDAx1t7pS0FqLHi9IwHhfzAJpe0DJOWXQnsdHeES6yZ3KmE7By5pJ7ne9aF0SWRubxVO9nLC1VvIYOTpH1ns71zb2cAu5EwEmhzzNVx0jvvPhccvIx9d7ryY_VTdM-E.png>](<https://remnote-user-data.s3.amazonaws.com/9CDAx1t7pS0FqLHi9IwHhfzAJpe0DJOWXQnsdHeES6yZ3KmE7By5pJ7ne9aF0SWRubxVO9nLC1VvIYOTpH1ns71zb2cAu5EwEmhzzNVx0jvvPhccvIx9d7ryY_VTdM-E.png>)
          
### Métodos de Administración de Memoria

-   Cómo están formados los nodos en el método de las etiquetas límtes? ↓
	
	![https://remnote-user-data.s3.amazonaws.com/a76HqWVLwkZLF3pbljjZnZUM2se2d3cGRdQOMNxNIgDud68HAsp8i37NOWzfqqlixvdBRJVgMKXtA6s5DHpOa5Tv4L6N8nvFVeqohHAkg3rVEPyulEfoDFlOzYEzi4Xo.png](https://remnote-user-data.s3.amazonaws.com/a76HqWVLwkZLF3pbljjZnZUM2se2d3cGRdQOMNxNIgDud68HAsp8i37NOWzfqqlixvdBRJVgMKXtA6s5DHpOa5Tv4L6N8nvFVeqohHAkg3rVEPyulEfoDFlOzYEzi4Xo.png)
	
	![https://remnote-user-data.s3.amazonaws.com/qRV-b93Z1OcooBLa4LrnIF29BDybQTt_xq774NX5QqWoo6GQY80UUQ7vrLXNQwKqxZFOoMSgcfRlZJ1SC5J5pZIeMnkZKpDwTROw8fhTopLShV1J0nF5qkIzfo46Fitl.png](https://remnote-user-data.s3.amazonaws.com/qRV-b93Z1OcooBLa4LrnIF29BDybQTt_xq774NX5QqWoo6GQY80UUQ7vrLXNQwKqxZFOoMSgcfRlZJ1SC5J5pZIeMnkZKpDwTROw8fhTopLShV1J0nF5qkIzfo46Fitl.png)
-   Método de Buddy System para la administración de memoria? ↓
	
	-   Un pedido de medida n puede hacerse asignando un bloque de medida $2^k$ tal que $k = \log_2n$. Se debe examinar la lista de espacio disponible que tiene su nodo cabecera en LIBRE ( i ) tal que k < = i , + m, buscando el menor i para el cual LIBRE ( i ) no resulte vacía. Entonces se toma un bloque de ésa lista.
	-   Si p es la dirección de inicio de ése bloque y resulta que i > k entonces se divide el bloque en dos partes iguales de medida 2 i - 1 , que comienzan en p y p + 2 i - 1 respectivamente. El bloque de la derecha, es decir el que se inicia en p + 2 i - 1 se lo inserta en la lista de espacio disponible de dicho tamaño. Si i - 1 es mayor que k se lo divide nuevamente y así sucesivamente hasta encontrar la medida deseada.
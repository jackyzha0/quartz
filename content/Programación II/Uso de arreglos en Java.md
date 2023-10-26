Course: [[Programación II]]

Date: February 12, 2023 6:00 PM
Status: Done
Year: 2022

- Qué es un arreglo en Java? ↓
    - Los arreglos, en Java, son objetos en los que se puede guardar una lista de valores u objetos denominados elementos.
    - Todos los elementos del arreglos deben ser del mismo tipo.
    - Todos los elementos están referenciados por un único identificador. A cada elemento se accede por medio de un índice.
    - Los índices de un arreglos en Java varían de **0** a **n-1**. Donde **n** es el tamaño o cantidad de elementos que puede contener el arreglo.
- Cómo es el proceso de declaración e instanciación de un arreglo?
    - Declaración:
        - tipo_dato_u_objeto identificador[ ];
        - tipo_dato_u_objeto identificador;
    - Instanciación:
        - identificador = new tipo_dato_u_objeto [10];
- Qué es la clase __ArrayList __ ? ↓
    - Esta clase tiene definida una colección de objetos.
    - Los objetos de la colección pueden ser de diferentes clases.
    - Esta colección consiste en arreglo unidimensional (vector o lista) dinámico. Conforme se agregan elemento el tamaño aumenta automáticamente.
    - El tamaño de un objeto ArrayList es el número de elementos que contiene.
- Qué es una colección? ↓
    - Una colección es de manera genérica un grupo de objetos llamados elementos.
- Qué es la interfaz **Collection** ? ↓
    - Esta interfaz es “la raíz” de todas las interfaces y clases relacionadas con colecciones de elementos.
    - 
        
        ![https://remnote-user-data.s3.amazonaws.com/6w1Jd7gCejckrEETk_i_0u75ZJC3xMYhL6xIEITbyc3t5SKyCtarczlPCLPeh8H5dmmf_k4vhUUVuRwoeKtVhYv2X3S_iaLxvUZHdXIzAfbpiY8EtyGVAJ_AMyHA6uUU.png](https://remnote-user-data.s3.amazonaws.com/6w1Jd7gCejckrEETk_i_0u75ZJC3xMYhL6xIEITbyc3t5SKyCtarczlPCLPeh8H5dmmf_k4vhUUVuRwoeKtVhYv2X3S_iaLxvUZHdXIzAfbpiY8EtyGVAJ_AMyHA6uUU.png)
        
    - Los métodos que forman parte de la interfaz collection son:
        - Boolean add (E e)
        - Boolean remove (Object o)
        - Int size()
- **Métodos de búsqueda y ordenamiento**
    - Qué es la búsqueda lineal? ↓
        - Busca por cada elemento de un arreglo en forma secuencial.
        - Evalúa cada elemento del arreglo y si no hay coincidencias, cuando llega al final informa que no hay coincidencias.
        - Si hay coincidencias con los elementos del arreglo, el algoritmo devuelve el índice de ese elemento.
    - Qué es el método de la burbuja? ↓
        - **método del intercambio directo**. Método de la Burbuja (**Bubble ** **Sort**).
        - Funciona revisando cada elemento de la lista que va a ser ordenada con el siguiente, intercambiándolos de posición si están en el orden equivocado.
            - Solo usa comparaciones para operar elementos
    - En que consiste el método sort de Java? ↓
        - A la hora de ordenar un array, podemos utilizar la función que nos da ya creada y que la podemos encontrar en java.util.Arrays
        - Podemos encontrar varios métodos que nos permitirá ordenar arrays de distintos tipos de datos, ya sean enteros, cadenas, objetos....
    - Cómo ordenamos un arreglo de objetos en base a sus atributos? ↓
        - Para conseguirlo, la clase tiene que Implementar la clase Comparable.
        - Para esto se debe crear un método llamado compareTo.
        - Compara dos objetos y nos devuelve un orden de menor a mayor.
        - 
            
            ![https://remnote-user-data.s3.amazonaws.com/wPEai8hrofovmQXDdXY2F3PVmjapC2zohEkAgSshTTl_uE_Do38F6KoTTwrCG8J8HLojWLK-c3PMEi77HsKBcg_xYAs56krh8v0fmQgFbDCvBz7p5frV9dkoLN4HbxJn.png](https://remnote-user-data.s3.amazonaws.com/wPEai8hrofovmQXDdXY2F3PVmjapC2zohEkAgSshTTl_uE_Do38F6KoTTwrCG8J8HLojWLK-c3PMEi77HsKBcg_xYAs56krh8v0fmQgFbDCvBz7p5frV9dkoLN4HbxJn.png)
# Métodos de Ordenamiento Recursivos

- Date:: [[]]
- Course:: [[Estructuras de Datos II]]
- Source:: [[3 - Métodos de Ordenamiento]]

- En qué consisten los métodos de ordenamiento recursivos?
    - Estos métodos son aún mas complejos, requieren de mayor atención y conocimiento para ser entendidos.
        - Son rápidos y efectivos, utilizan generalmente la técnica Divide y vencerás, que consiste en dividir un problema grande en varios pequeños para que sea más fácil resolverlos.
    - Mediante llamadas recursivas a si mismos, es posible que el tiempo de ejecución y de ordenación sea más optimo.
    - Dentro de los algoritmos recursivos encontramos:
        - Ordenamiento por Mezclas (merge)
        - Ordenamiento Rápido (quick)
- Caracterice el **método MergeSort**
    
    [Merge sort in 3 minutes](https://www.youtube.com/watch?v=4VqmGXwpLqc&ab_channel=MichaelSambol)
    
    - El método MergeSort, es un algoritmo de ordenación recursivo, con un número de comparaciones, entre elementos del array mínimo.
    - Está basado en la técnica divide y vencerás. De forma resumida el funcionamiento del método MergeSort es el siguiente:
        - Si la longitud del array es menor o igual a 1 entonces ya está ordenado.
        - El array a ordenar se divide en dos mitades de tamaño similar.
        - Cada mitad se ordena de forma recursiva aplicando el método MergeSort.
        - A continuación las dos mitades ya ordenadas se mezclan formando una secuencia ordenada.
    ![[Pasted image 20230219154730.png]]
- Caracterice el **método QuickSort**
    
    [Quick sort in 4 minutes](https://www.youtube.com/watch?v=Hoixgm4-P4M&ab_channel=MichaelSambol)
    
    - **El algoritmo ordenación rápida puede ser resumido en cuatro pasos básicos:**
        1. Si el tamaño del arreglo es cero o uno, entonces regresa el arreglo.
            
            *Caso base*
            
        2. Selecciona un elemento del arreglo para ser usado como el elemento pivote.
            
            *Este es el paso de selección del pivote*.
            
        3. Crea dos nuevos arreglos. Coloca todos los elementos del arreglo original que son menores que el elemento pivote en uno de estos sub-arreglos y todos los elementos que son más grandes que el elemento pivote en el otro sub-arreglo.
            
            *Este es el paso de la partición.*
            
        4. Regresa el arreglo que contiene el resultado del sub-arreglo ordenado rápidamente que incluye los elementos menores que el pivote, seguidos por el pivote, y luego por el resultado del sub arreglo ordenado rápidamente que incluye los elementos mayores que el pivote.
            
            *Este es el paso de división recursiva.*
- Qué conclusiones se obtienen a partir de todos los algoritmos?
    Cada algoritmo de ordenamiento por definición tiene operaciones y cálculos mínimos y máximos que realiza (complejidad), a continuación una tabla que indica la cantidad de cálculos que corresponden a cada método de ordenamiento:
    ![[Pasted image 20230219154755.png]]
    
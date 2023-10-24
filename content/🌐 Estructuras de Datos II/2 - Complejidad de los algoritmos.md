# 2 - Complejidad de los algoritmos

- Course:: [[Estructuras de Datos II]]
- Source:: [[]]


#main_page 
## Complejidad de Algoritmos

- Por qué realizamos el análisis de algoritmos?
    - Para determinar tiempos de respuesta (runtime)
    - Determinar recursos computacionales
- Cuáles son los criterios de eficiencia de los algoritmos?
    1. El numero de pasos
    2. El numero de comparaciones entre llaves para ordenar los registros.
        - Comparación entre llaves: Pasar parámetros
    3. El número de movimientos de registros que se requieren para ordenar n registros
    4. De utilidad cuando el movimiento de registros es costoso
    - Respecto al uso eficiente de los recursos, éste suele medirse en función de dos parámetros: el espacio, es decir, memoria que utiliza, y el tiempo, lo que tarda en ejecutarse.
- Diferencie análisis a priori y análisis a posteriori.
    - *A priori*
        - Se realiza de forma teórica. Es en una máquina teórica y con un tiempo teórico.
        - Uno que proporciona una medida teórica (a priori), que consiste en obtener una función que acote (por arriba o por abajo) el tiempo de ejecución del algoritmo para unos valores de entrada dados.
    - *A posteriori*
        - Hacemos correr en una máquina específica, y bajo las mismas condiciones de entrada, determinamos los tiempos de salida
        - Y otro que ofrece una medida real (a posteriori), consistente en medir el tiempo de ejecución del algoritmo para unos valores de entrada dados y en un ordenador concreto
- Cuáles son los requerimientos para realizar el análisis de algoritmos?
    - Requerimientos para el análisis del algoritmos
        - Conocer la complejidad del problema que resuelve el algoritmo
        - Conocer la dimensión de la entrada (número de elementos)
        - Determinar el **número de operaciones a realizar**
    - La complejidad de un algoritmo se representa a través de una función matemática
        
        Un algoritmo puede estar compuesto de dos o más operaciones, por lo que determinar la complejidad depende de identificar la operación más costosa en el algoritmo.
        
        - Polinomios
        - Logaritmos
        - Exponentes…
        
        Denotaremos por $T(n)$ el tiempo de ejecución de un algoritmo para una entrada de tamaño $n$, donde $T(n)$ indica el número de instrucciones ejecutadas por un ordenador idealizado.
- Defina el “Principio de Invarianza”
    
    Dado un algoritmo y dos implementaciones  $I_1$ e $I_2$, que tardan $T_1(n)$ y $T_2(n)$ segundos respectivamente, existe una constante real $c > 0$ y un número natural $n_0$ tales que para todo $n ≥ n_0$ se verifica que $T_1(n) ≤ T_2 (n).$
    
    - Son dos corridas de un algoritmo igual
    - No importa las veces que corra un algoritmo, la función va a ser la misma, pero variando una constante
- Cuáles son los casos en los que puede resultar un algoritmos con respecto al tiempo?
	  ![[Pasted image 20230219154033.png]]
- Qué es un algoritmo?
    > **Conjunto de reglas para resolver un problema**
    > > Se denomina algoritmo al procedimiento de solución para un problema P, **en una máquina M**, si después de la ejecución de un numero finito de pasos, o bien se obtiene una solución para P, si ésta existe, o M determina e informa que P no tiene solución.
    - Completamente definido, sin ambiguedad
    - Debe poder ser implementado en un lenguaje de programación por medio de un programa.
    - Debe realizar un número finito de pasos en un tiempo finito
    - Debe tener unos datos de entrada, y unos datos de salida
- Qué tipos de algoritmos existen?
    - Determinista
        - Siempre genera los mismos datos de salida
    - No determinista
        - Para los mismos datos de entrada no produce siempre los mismos datos de salida
    
    En programación concurrente o paralela, la salida puede depender de los factores temporales de dicha entrada.
    
    Dos factores a tener muy en cuenta son la constante multiplicativa y el $n_0$ para los que se
    verifican las condiciones. Si bien a priori un algoritmo de orden cuadrático es mejor que uno de orden cúbico
- Cómo se define el tiempo de ejecución de un algoritmo?
    ![[Pasted image 20230219154126.png]]
- Qué son y cuáles son las operaciones elementales?
    
    Es aquella operación cuyo tiempo de ejecución se puede acotar superiormente por una constante que solamente dependerá de la implementación particular usada
    
    - No depende de parámetros
    - No depende de la dimensión de los datos de entrada
    - Consideraremos operaciones elementales a:
    
    Las operaciones aritméticas básicas.
    
    - Asignaciones a variables de tipo predefinido por el compilador.
    - Los saltos (llamadas a funciones y procedimientos, retorno desde ellos, etc.).
    - Las comparaciones lógicas.
    - Los acceso a estructuras indexadas básicas (vectores y matrices).
- Cuáles son los errores comunes en el cálculo del tiempo de ejecución?
    ![[Pasted image 20230219154201.png]]
- En qué consiste el crecimiento de funciones en algoritmos?
    ![[Pasted image 20230219154223.png]]
- Cómo se determina la complejidad de un algoritmo?
    ![[Pasted image 20230219154240.png]]
- En qué consiste la notación O grande?
    ![[Pasted image 20230219154315.png]]
- En qué consiste la notación Omega $\Omega$?
    ![[Pasted image 20230219154338.png]]
- En qué consiste la notación Theta $\Theta$?
    ![[Pasted image 20230219154408.png]]
- Cómo definimos el orden de complejidad? Y cuál es su representante?
    ![[Pasted image 20230219154426.png]]
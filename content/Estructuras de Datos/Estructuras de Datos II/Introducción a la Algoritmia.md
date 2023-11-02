# Introducción a la Algoritmia

- Course:: [[Estructuras de Datos II]]
- Source:: [[]]

#main_page 
## Algoritmos

- Qué es una computadora?
    Es un dispositivo electrónico utilizado para procesar información y obtener resultados. Los datos y la información se pueden introducir en la computadora como entrada (input) y a continuación se procesan para producir una salida (output).
- Qué es un programa?
    - A las soluciones creadas por computadora se les conoce como **programas** y no son mas que una serie de operaciones que realiza la computadora para llegar a un resultado, con un grupo de datos específicos.
    - Es el conjunto de instrucciones escritas de algún lenguaje de programación y que ejecutadas secuencialmente resuelven un problema especifico.
- Cómo se organiza internamente una computadora?
    ![[Pasted image 20230219153315.png]]
    - Dispositivos de entrada
        - Dispositivos electrónicos que permiten introducir datos (información) en la computadora para su proceso. Los datos se leen en dispositivos de entrada
    - Dispositivos de salida
        - Regresan los datos procesados que sirven de información al usuario
    - CPU
        
        Compara datos en dos lugares de memoria distintos, y con ellos opera.
        
        - Unidad de Control
            - Coordina las actividades de la computadora y determina que operaciones se deben realizar y en que orden; así mismo controla todo el proceso de la computadora.
        - Unidad aritmética lógica
            - Realiza las operaciones aritméticas y lógicas.
        - Memoria Interna
            
            La CPU utiliza la memoria de la computadora para guardar información mientras
            trabaja con ella; mientras esta información permanezca en memoria, la computadora puede tener acceso a ella en forma directa
            
            - *Memoria RAM (Random Access Memory)*. Recibe el nombre de memoria principal o memoria del usuario. La memoria RAM es una memoria volátil.
            - *Memoria ROM (Random Only Memory).* Estática, no puede cambiar. La computadora puede leer los datos almacenados en la memoria ROM, pero no se pueden introducir datos en ella, o cambiar los datos que ahí se encuentran.Esta memoria es de solo lectura. Los datos de la memoria ROM están grabados en forma permanente y son introducidos por el fabricante de la computadora.
- Qué es un lenguaje?
    - Es una serie de símbolos que sirven para transmitir uno o mas mensajes (ideas) entre dos entidades diferentes. A la transmisión de mensajes se le conoce comúnmente como **comunicación**.
    - Requiere una serie de reglas simples, pero indispensables.
    - Existen 4 elementos
        - Emisor
        - Receptor
        - Medio de comunicación
        - Mensaje
- Qué es un lenguaje de programación?
    - Es un conjunto de símbolos, caracteres y reglas (programas) que le permiten a las personas comunicarse con la computadora
        - Lenguaje maquina
        - Lenguaje de bajo nivel (ensamblador)
        - Lenguaje de alto nivel
- Qué es un algoritmo?
    
    Un algoritmo es una serie de pasos organizados que describe el proceso que se debe seguir, para dar solución a un problema especifico.
    
    > Se denomina algoritmo al procedimiento de solución para un problema P, en una máquina M, si después de la ejecución de un numero finito de pasos, o bien se obtiene una solución para P, si ésta existe, o M determina e informa que P no tiene solución.
    > 
    
    Un algoritmo es un conjunto finito de pasos realizables y no ambiguos para solucionar un problema.
- Cuáles son las características de un algoritmo?
    1. Definido (no ambiguo).
    2. Finito.
    3. General.
    4. Obtener una o mas salidas

## Entidades primitivas para el desarrollo de algoritmos

- Cuáles son los tipos de datos?
 ![[Pasted image 20230219153350.png]]
- Qué son las expresiones?
    - Las expresiones son combinaciones de constantes, variables, símbolos de operación, paréntesis y nombres de funciones especiales.
    - Cada expresión toma un valor que se determina tomando los valores de las variables y constantes implicadas y la ejecución de las operaciones indicadas.
    - Una expresión consta de operadores y operandos. Según sea el tipo de datos que manipulan, se clasifican las expresiones en:
        - Aritméticas
        - Relacionales
        - Lógicas
- Qué son los operadores?
    - Son elementos que relacionan de forma diferente, los valores de una o mas variables y/o constantes. Es decir, los operadores nos permiten manipular valores.
        - Pueden ser aritméticos, relacionales o lógicos.
- Qué son los operadores aritméticos?
    
    Los operadores aritméticos permiten la realización de operaciones matemáticas con los valores (variables y constantes).
- Qué son los operadores lógicos?
    - Establecer relaciones entre valores lógicos
    - Pueden ser resultados de una operación relacional
- Qué son los operadores relacionales?
    - Se utilizan para establecer una relación entre dos valores. Los compara entre sí, y estableze una certeza o una falcedad
- Qué son los identificadores?
    - Representan los datos de un programa (constantes, variables, tipos de datos). Secuencia de caracteres que sirve para identificar una posición en la memoria de la computadora, que nos permite accesar a su contenido.
    ![[Pasted image 20230219153422.png]]
- Cómo se clasifican las variables?
    ![[Pasted image 20230219153450.png]]

## Técnicas de Diseño

- En qué consiste una visión top down?
    - Consiste en establecer una serie de niveles de mayor a menor complejidad (arriba-abajo) que den solución al problema. Consiste en efectuar una relación entre las etapas de la estructuración de forma que una etapa jerárquica y su inmediato inferior se relacionen mediante entradas y salidas de información.
    - Este diseño consiste en una serie de descomposiciones sucesivas del problema inicial, que recibe el refinamiento progresivo del repertorio de instrucciones que van a formar parte del programa.
- Cuáles son los objetivos del top down?
    - Simplificación del problema y de los subprogramas de cada
    descomposición.
    - Las diferentes partes del problema pueden ser programadas de modo
    independiente e incluso por diferentes personas.
    - El programa final queda estructurado en forma de bloque o módulos lo
    que hace mas sencilla su lectura y mantenimiento.
- En qué consiste la visión bottom up?
    
    En el diseño Bottom-up las partes individuales se diseñan con detalle y luego se enlazan para formar componentes más grandes, que a su vez se enlazan hasta que se forma el sistema completo. Las estrategias basadas en el flujo de información "bottom-up" se antojan potencialmente necesarias y suficientes porque se basan en el conocimiento de todas las variables que pueden afectar los elementos del sistema.

## Formas de expresión

- Cuáles son las técnicas para la formulación de algoritmos?
    - Diagrama de flujo
    - Pseudocódigo
    - Diagrama estructurado (nassi-scheneiderman)
- Qué es un diagrama de flujo?
    - Un diagrama de flujo es la representación gráfica de un algoritmo. También se puede decir que es la representación detallada en forma gráfica de como deben realizarse los pasos en la computadora para producir resultados.
    - Esta representación gráfica se da cuando varios símbolos (que indican diferentes procesos en la computadora), se relacionan entre si mediante líneas que indican el orden en que se deben ejecutar los procesos.
- Qué es el pseudocódigo?
    - Mezcla de lenguaje de programación y español (o ingles o cualquier otro idioma) que se emplea, dentro de la programación estructurada, para realizar el diseño de un programa.
    - En esencial, el pseudocodigo se puede definir como un lenguaje de especificaciones de algoritmos.
    - Es la representación narrativa de los pasos que debe seguir un algoritmo para dar solución a un problema determinado. El pseudocodigo utiliza palabras que indican el proceso a realizar.
- Qué son los diagramas estructurados? (nassi-scheneiderman)
    - El diagrama estructurado N-S también conocido como diagrama de chapin es como un diagrama de flujo en el que se omiten las flechas de unión y las cajas son contiguas. Las acciones sucesivas se pueden escribir en cajas sucesivas y como en los diagramas de flujo, se pueden escribir diferentes acciones en una caja.
    - Un algoritmo se represente en la sig. forma
	    ![[Pasted image 20230219153533.png]]

## Estructuras algorítmicas

- Qué tipo de estructuras algorítmicas existen?
    ![[Pasted image 20230219153605.png]]
- Qué son las estructuras secuenciales?
    La estructura secuencial es aquella en la que una acción (instrucción) sigue a otra en secuencia. Las tareas se suceden de tal modo que la salida de una es la entrada de la siguiente y así sucesivamente hasta el fin del proceso.
- Qué tipo de estructuras secuenciales existen?
    - **Asignación.**  La asignación consiste, en el paso de valores o resultados a una zona de la memoria. Dicha zona será reconocida con el nombre de la variable que recibe el valor. La asignación se puede clasificar de la siguiente forma
        - Simples
        - Contador
        - Acumulador
        - de trabajo
    - **Lectura**. Consiste en recibir desde un dispositivo de entrada un valor.
    - Salida. Consiste en mandar por un dispositivo de salida un resultado o mensaje.
- Qué son las estructuras condicionales?
    - Comparan una variable con otro/s, para que en base al resultado de dicha comparación, se siga un curso dentro del programa.
    - La comparación se puede hacer contra otra variable o constante
- Qué tipo de estructuras condicionales existen?
    - ![[Pasted image 20230219153644.png]]
- Qué tipo de estructuras cíclicas existen?
    - Repetitivas. (cíclicas, bucles o lazos): Se utilizan para realizar varias veces el mismo conjunto de operaciones.
        - ![[Pasted image 20230219153717.png]]
- Qué son los subalgoritmos?
    ![[Pasted image 20230219153737.png]]
- Cómo se pasan los parámetros en los subalgoritmos?
    ![[Pasted image 20230219153755.png]]
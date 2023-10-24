Course: [[Programación II]]

Date: February 12, 2023 6:00 PM
Status: Done
Year: 2022

- Clases
    - Cómo se define una clase? ↓
        - La clase es un modelo que describe las características comunes y el comportamiento de un conjunto de objetos (instancias de una clase).
        - Es la descripción de una familia de objetos con una misma estructura y un mismo comportamiento.
        - Se caracteriza por:
            - Un nombre
            - **Un componente estático**: __ los atributos __ (o campos) a los que se les atribuyen valores. Estos caracterizan el estado de los objetos durante la ejecución del programa.
            - **Un componente dinámico**: __ los métodos __ que representan el comportamiento de los objetos de la clase. Estos manipulan los valores de los atributos y caracterizan las acciones que pueden ser realizadas por los objetos.
        - Las clases son estáticas; sin embargo, su existencia, semántica y significado están fijados antes de la ejecución de un programa.
    - Cuál es la funcionalidad del operador **new** ? ↓
        - El uso del operador __ __ **new** __ __ origina la siguiente secuencia de acciones:
            - la asignación de memoria necesaria para guardar el objeto.
            - la inicialización de sus atributos por defecto.
            - la ejecución de un constructor
            - la inicialización explícita de los atributos (si existe esta acción).
    - Qué es un constructor? ↓
        - Un constructor es un método de inicialización.
        - El constructor es un método que:
            - Tiene el mismo nombre que la clase.
            - No tiene valor de retorno y tampoco es __ __ **void** __ __
        - Todas las clases tienen, al menos, un constructor.
        - Si no se escribió explícitamente un constructor, existe uno por defecto, sin parámetros y sin código.
    - Qué son las **variables de clase o estáticas** ? ↓
        - Son propias únicamente de la clase y no de los objetos que pueden crearse de la misma, por lo tanto, sus valores son compartidos por todos los objetos de la clase. Van precedidas del modificador __ __ *** **** __ __ **static** __ __ .
        - Para invocar a una variable estática no se necesita crear un objeto de la clase en la que se define:
        - Si se invoca desde la clase en la que se encuentra definido, basta con escribir su nombre.
        - Si se le invoca desde una clase distinta, debe anteponerse a su nombre, el de la clase en la que se encuentra seguido del operador punto (.):
            - < __ NombreClase __ >**.** __ variableEstatica __
    - En qué consiste el concepto de encapsulamiento? ↓
        - El encapsulamiento busca de alguna forma controlar el acceso a los datos que conforman un objeto o instancia, de este modo podríamos decir que una clase y por ende sus objetos que hacen uso de modificadores de acceso (especialmente privados) son objetos encapsulados.
    - Qué son los métodos __getter __ y **setter** ? ↓
        - Los métodos __ getter __ y __ setter __ son métodos de acceso. Son una interfaz pública para cambiar u obtener el valor los atributos privados. Son siempre públicos.
        - **Setters**: Sirven para asignar un valor inicial a un atributo. Siempre son void (nunca retornan valor)
        - *Getters: **se utiliza para obtener, recuperar u obtener el valor de un atributo.
    - Según la POO, qué es un método? ↓
        - En la POO, los métodos son análogos a los procedimiento o funciones en los lenguajes procedimentales o estructurados.
        - Un método es, fundamentalmente, un conjunto, lógicamente integrado, de instrucciones para realizar una tarea específica y que puede ser reutilizado.
        - Los métodos pueden recibir valores por medio de sus parámetros y devolver un valor por medio de la sentencia **return***.**
    - Qué son los **modificadores** ? ↓
        - Permiten controlar la visibilidad y acceso a los métodos y variables que están dentro de una clase.
        - Java soporta cuatro niveles de acceso a variables y métodos. En orden, del más público al menos público son:** público (public), protegido (protected), sin modificador y privado (private). **
- Objetos
    - Qué es una instancia o un objeto? ↓
        - Es la representación física de una clase.
        - Se asigna memoria al objeto.
        - Los atributos pueden tomar valores.
        - El comportamiento está definido por los métodos de su clase.
            - __ "instancia __ " = __ "objeto __ ".
    - Qué es un atributo? ↓
        - Los atributos son las características individuales que diferencian un objeto de otro y determinan su apariencia, estado u otras cualidades.
        - Los atributos se guardan en variables y cada objeto particular puede tener valores distintos para estas variables. Una vez instanciado el objeto, los atributos toman valores por defecto.
        - La referencia en Java es, de alguna manera, un puntero.
    - Qué son las **variables de instancia** ? ↓
        - Son las variables que tendrán diferentes valores con cada una de las instancias que se generan al crear objetos nuevos de la clase.
        - Se define como privada, para que no se pueda modificar desde otra clase, solo a través de los métodos __ getter __ y __ setter __ .
        - Puede ser definida como pública y en ese caso no se requiere de hacer uso de algún método para tomar su valor o modificarla (no es recomendable por el control de la variable por la misma clase).
    - Qué es el estado de un objeto? ↓
        - El estado de un objeto abarca todas las propiedades del objeto, y los valores actuales de cada una de esas propiedades.
        - Las propiedades de los objetos suelen ser estáticas, los valores que toman estas propiedades cambian con el tiempo.
        - El hecho de que los objetos tengan estado implica que ocupan un espacio de memoria.
    - Qué es el Garbage Collector? ↓
        - El Garbage Collector es el administrador de espacio de memoria dinámico propio de Java, que trabajo con el Stack y el Heap
            - El Stack (Pila) se utiliza para almacenar variables locales, variables de referencia, parámetros y valores de retorno, resultados parciales. También se utiliza para llevar el control de la invocación y retorno de los métodos.
            - El Heap (Montículo) almacena objetos y sus variables de instancia. Es un espacio de memoria dinámica que se crea al inicio de la máquina virtual y es único.
            - 
                
                ![https://remnote-user-data.s3.amazonaws.com/NTWr7tAUhnUT3POCKEdhqI-GH-QqON3DvhN6NdUOg-baRhk-6AtBkYbt8fX2uP4XukDt5Hz697omN62BLvlXJOi9E4WfxVb_-CEtsAVG5BmMUVj1Bb3qlaR4JhId9d9j.png](https://remnote-user-data.s3.amazonaws.com/NTWr7tAUhnUT3POCKEdhqI-GH-QqON3DvhN6NdUOg-baRhk-6AtBkYbt8fX2uP4XukDt5Hz697omN62BLvlXJOi9E4WfxVb_-CEtsAVG5BmMUVj1Bb3qlaR4JhId9d9j.png)
                
    - Cuál es la diferencia entre pasar argumentos por valor o por referencia? ↓
        - **Por valor**: cuando los argumentos son pasados por valor a los métodos, significa que se realiza una copia de la variable y esta es enviada al método y no la original, entonces todo los cambios realizados dentro del método solo afectan a la copia actual.
        - **Por referencia**: cuando los argumentos son pasados por referencia, significa que la referencia o el puntero a la variable original son pasadas a los métodos y no la data original.
    - En Java, cómo son pasados los parámetros? ↓
        - Java implementa sólo un modo de pasaje de parámetros a un método: ** por valor**. Esto significa que:
            - El valor del argumento pasado a un método no puede ser modificado.
            - Si el argumento es una instancia (objeto), es ésta referencia que es pasada por valor. Así el contenido del objeto puede ser modificado pero no la referencia.
    - En qué consiste la clonación de objetos? ↓
        - La clonación es el proceso de duplicación de un objeto para que en memoria existan dos objetos idénticos en el mismo instante de tiempo
        - La clase java.lang.Object contiene una implementación native y protected del método clone.
            - Esta implementación (que depende de la máquina sobre la que se ejecute el código) determina cuanta memoria está siendo usada por el objeto a ser clonado, reserva la misma cantidad de memoria para el objeto clon, y copia los valores de memoria de la vieja dirección de memoria a la nueva. Y al final se devuelve un java.lang.Object el cual es la referencia al nuevo objeto (el clon).
- Relación de Uso entre Clases
    - Qué es una relación de **uso** ? ↓
        - La relación de _ _ ***uso*** _ _ entre clases es una de los tipos de relación más habituales en programación orientada a objetos. Las variables de instancia de un objeto pueden ser tanto de tipo primitivo como **tipo ** _ _ ***objeto*** _ _ .
        - La variable que define un objeto no contiene al objeto en sí mismo, sino una referencia al espacio de memoria donde se encuentra.
        - Un objeto puede crearse e invocar sus métodos públicos desde distintas clases y decimos que esto establece _ _ ***una relación de uso entre clases*** _ _ .
    - Cómo se define una relación de agregación? ↓
        - Representa una relación del tipo " _ tener un _ " entre clases.
        - Cuando la clase contenida no existe independientemente de la clase que la contiene se denomina agregación _ por valor _ y además implica contenido físico, mientras que si existe independientemente y se accede a ella indirectamente, es agregación _ por referencia _ .
    - Cuáles son los tipos de clases anidadas en Java? ↓
        - Clase anidada interna.
        - Clase anidada estática.
        - Clase local.
        - Clase anónima
    - Qué es una clase **anidada interna** ? ↓
        - Se dice que es interna si se la declara dentro de otra clase pero fuera de cualquier método de la clase contenedora.
        - Puede declararse con cualquiera de los modificadores: private, protected o public
        - Tiene acceso a todos los atributos de la clase que la contiene, luego para que exista una clase anidada interna es necesario que exista un objeto de la clase contenedora.
        - 
            
            ![https://remnote-user-data.s3.amazonaws.com/kOfGgb_XlXYcZKHEAdUqOJGdDGuLREjaFifZQmRv2h7bBkOixmcvZvNdboC5yY1jgoznJeV_Eg539pt6jWUVnlmiCvJpvIuINz1Le2mf0uQPsf8PXZR0V-SNVsRpPKfc.png](https://remnote-user-data.s3.amazonaws.com/kOfGgb_XlXYcZKHEAdUqOJGdDGuLREjaFifZQmRv2h7bBkOixmcvZvNdboC5yY1jgoznJeV_Eg539pt6jWUVnlmiCvJpvIuINz1Le2mf0uQPsf8PXZR0V-SNVsRpPKfc.png)
            
    - Qué es una clase **anidada estática** ? ↓
        - En Java podemos definir clases internas con el modificador 'static'. Luego la clase interna se comporta como una clase normal de Java con la salvedad que se encuentra dentro de otra.
        - Cuando declaramos una clase interna 'static' luego podemos crear objetos de la misma en forma independiente a la clase externa
        - 
            
            ![https://remnote-user-data.s3.amazonaws.com/LjVx3IV71dHFJE_eye_L9hEgkSl-vCxJOB5OF7tcOw5wpHqa_cNDN2-nIsHFKjardGPl2o_G3BRKJAASagY2wJZJz_YyC8TYf5uF4EEqd9nJZ95QCsrUVBrAt7itXLDw.png](https://remnote-user-data.s3.amazonaws.com/LjVx3IV71dHFJE_eye_L9hEgkSl-vCxJOB5OF7tcOw5wpHqa_cNDN2-nIsHFKjardGPl2o_G3BRKJAASagY2wJZJz_YyC8TYf5uF4EEqd9nJZ95QCsrUVBrAt7itXLDw.png)
            
    - Qué es una clase **anidada local** ?
        - El lenguaje Java permite declarar una clase local a un método o inclusive a un bloque dentro de un método.
        - La clase local tiene acceso a los métodos y atributos de la clase externa, variables locales y parámetros del método donde se la declara
        - 
            
            ![https://remnote-user-data.s3.amazonaws.com/315eCRmHY3Srb9Tp_PjeRzZmGJv72qTtQ2vLv18M5AsCL40u_pvP09i457bvPGgfcy7Tux5_OCSWEb51Lyq25uGaeAH0QmPpvQc_sbJNoZT0YmQiwT_H7O0CtvKMqjDY.png](https://remnote-user-data.s3.amazonaws.com/315eCRmHY3Srb9Tp_PjeRzZmGJv72qTtQ2vLv18M5AsCL40u_pvP09i457bvPGgfcy7Tux5_OCSWEb51Lyq25uGaeAH0QmPpvQc_sbJNoZT0YmQiwT_H7O0CtvKMqjDY.png)
            
    - Qué es una clase **anidada anónima** ?
        - Las clases anónimas en Java son clases anidadas sin un nombre de clase. Normalmente se declaran como una subclase de una clase existente o como la implementación de una interfaz
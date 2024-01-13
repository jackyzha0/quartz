Course: [[Programación II]]

Date: February 12, 2023 6:01 PM
Status: Done
Year: 2022

- Cuáles son los pilares de la programación orientada a objetos?
    1. **Abstracción**
        - Expresa las características esenciales de un objeto, las cuales distinguen al objeto de los demás.
    2. **Encapsulamiento**
        - Solamente el objeto puede modificar sus atributos.
        - Proceso de compactar y ocultar los elementos de una abstracción incluyendo su estructura y comportamiento
    3. **Polimorfismo**
        - Es la capacidad que tienen los objetos de una clase de responder al mismo mensaje o evento en función de los parámetros utilizados durante su invocación.
        - Es la habilidad de objetos de Clases diferentes de responder a un mismo mensaje de diferente maneras. O sea, varias formas de responder a un mismo mensaje
        - Tipos de polimorfismos
            - **Polimorfismo de Sobrecarga:** Permite que una clase pueda tener varios métodos con el mimo nombre, con parámetros distintos.
            - **Polimorfismo de Sobreposición:** Permite que una clase posea un método con el mismo nombre y parámetros que un método de su super clase.
            - **Polimorfismo de Inclusión:** Permite que un objeto de una clase superior asuma la forma de cualquiera de sus descendiente
    4. **Herencia**
        - Es el mecanismo por el cual una clase puede “HEREDAR” las características y métodos de otras clases para expandirla o especializarla de alguna forma.
            - Importante: Las clases heredan, no los objetos
- En qué consiste el concepto de herencia?
    - Permite crear una jerarquía entre un grupo de clases que tiene características similares.
    - Se puede tener una clase que define los atributos y comportamiento comunes a un grupo específico de clases.
    - Todas las clases que son parte de este grupo específico pueden heredar los atributos y el comportamiento de esta clase común.
    - Una clase no puede ser su propia superclase.
        - No existe recursividad en herencia.
    - Una clase puede tener cualquier número de subclases.
        
        ![Untitled](Images/Herencia%20en%20POO/Untitled.png)
        
- Qué tipos de herencia existen en Java?
    
    Una clase sólo puede tener una única superclase.
    
    ![Untitled](Images/Herencia%20en%20POO/Untitled%201.png)
    
    ![Untitled](Images/Herencia%20en%20POO/Untitled%202.png)
    
    - En Java el constructor no se hereda
- Qué son las clases abstractas?
    - Una clase abstracta contiene uno o más métodos abstractos.
    - La clase concreta, debe implementar todos los métodos de las clases abstractas.
    
    ![Untitled](Images/Herencia%20en%20POO/Untitled%203.png)
    
- Qué es una interface?
    - Un interface es una descripción de comportamiento
    - Es una colección, con nombre, de definiciones de métodos (sin implementaciones) que puede incluir también declaraciones de constantes.
    - Todos los métodos son abstractos, sin necesidad de declararlos abstract.
    - Todos los atributos son static y final, son constantes.
    - Las clases abstractas y las interfaces se utilizan para programación genérica.
    - No se puede instanciar una interface
    
    ```java
    public interface <nombre>{
       //métodos sin cuerpo
    }
    ```
    
    - Una interface puede ser sólo implementada por clases o extendida por otras interfaces.
- Cómo se implementa una interfaz?
    - Cuando se trata de la clase que se implementa de una interface, asegurar siempre de que se implementen todos los métodos de esa interface.
    - La implementación de clase puede tener sus propios métodos.
    - Implementación de clase se extiende a una sola súper clase o a una clase abstracta.
    
    ```java
    public class EstudianteDeInformatica
        extends Estudiante
        implements InterfacePersona,
          OtraInterface,
          UltimaInterface{
    	 //TODOS los métodos abstractos de TODAS 
       //las Interfaces deben ser implementados
    }
    ```
    
- Qué son los paquetes?
    - Sirven para organizar grupos de clases
    - Un paquete puede contener un numero ilimitado de Clases.
    - Se compara a la organización de carpetas en un Disco duro.
    - Son la forma en que en la que Java nos permite agrupar de alguna manera lógica los componentes de nuestra aplicación.
    - permiten poner en su interior: clases, interfaces, archivos de texto, etc…
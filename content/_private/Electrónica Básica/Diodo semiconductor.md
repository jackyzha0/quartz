# Diodo semiconductor

- Date:: [[2022-08-07]]
- Course:: [[Electrónica Básica]]
- Source:: [[]]


#main_page 



> Un **diodo** es un dispositivo semiconductor que actúa esencialmente como un interruptor unidireccional para la corriente. Permite que la corriente fluya en una dirección, pero no permite a la corriente fluir en la dirección opuesta.
> 
- Es un elemento no lineal, deja pasar los electrones en un sentido y los bloquea en el otro.
- En el caso de que se llegue a polariza en el otro sentido, no hay paso de electrones en dicho sentido (idealmente)

![Untitled | center | 300 ](Images/Diodo%20semiconductor/Untitled.png)

- Está compuesto por un material semiconductor dopado por otros elementos que hacen que el diodo tenga una mayoría de carga positiva hacia un lado, y una mayoria de carga negativa hacia el otro.

![Untitled](Images/Diodo%20semiconductor/Untitled%201.png)

### Funcionamiento de un diodo

![Untitled](Images/Diodo%20semiconductor/Untitled%202.png)

- Tensión vs corriente.
    - Cuando el diodo está polarizado directamente, podemos tomar con que no tiene resistencia (corriente máxima)
    - Cuando está polarizado inversamente, no tiene flujo de corriente
- Diodo real
    - De manera real, al diodo lo podemos representar como un capacitor y una fuente de corriente.
    
    ![Untitled](Images/Diodo%20semiconductor/Untitled%203.png)
    
    ![Untitled](Images/Diodo%20semiconductor/Untitled%204.png)
    
    - $v_z$ es la tensión a partir del cual el diodo se rompe (rompemos el dieléctrico del capacitor) y la tensión vuelve a circular.

### Diodo como un interruptor

- Nos sirve para rectificar la onda y poder convertirlas en señales contínuas.

![Onda generada por la fuente (triangular)](Images/Diodo%20semiconductor/Untitled%205.png)

Onda generada por la fuente (triangular)

- Inserto un diodo que permita el paso de la tensión únicamente en un sentido

![Untitled](Images/Diodo%20semiconductor/Untitled%206.png)

![Untitled](Images/Diodo%20semiconductor/Untitled%207.png)

- Circuito rectificador de media onda
- En el caso de usar un diodo real

![Untitled](Images/Diodo%20semiconductor/Untitled%208.png)

![Untitled](Images/Diodo%20semiconductor/Untitled%209.png)

### Puente rectificador

![Untitled](Images/Diodo%20semiconductor/Untitled%2010.png)

[[Diodo Zenner]]
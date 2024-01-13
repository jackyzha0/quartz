# Transistores

- Date:: [[2022-08-14]]
- Course:: [[Electrónica Básica]]
- Source:: [[]]

#main_page 

## Transistor NPN

- Dispositivo electrónico que posee tres zonas semiconductoras interconectadas (N-P-N)
- Un material semi-conductor puede funcionar como conductor y como aislante de acuerdo a la polarización eléctrica que se conecte. El transistor NPN tiene dos funciones básicas, ser un interruptor electrónico o un amplificador. Este tipo de transistor también se puede clasificar como BJT
    - N → Posee un exceso de electrones
    - P → Posee un defecto de electrones
- El transitor NPN tiene tres pines de conexión llamados, Colector (C), Base (B) y Emisor (E). Estas tres conexiones están directamente sobre cada una de las capas semiconductoras N, P
y N respectivamente. La figura-1, muestra la estructura interna del transistor. Una unión NP
se le conoce también como diodo.
    - Normalmente la corriente ingresa por el colector, y sale por el emisor

![Untitled | 300](Images/Transistores/Untitled.png)

![Untitled | 300](Images/Transistores/Untitled%201.png)

- Se lo puede usar como amplificador (electrónica analógica) y como interruptor (electrónica digital)

### Transistor como interruptor

- Deja pasar o corta señales eléctricas a partir de una corriente chica.
- Funciona como un interruptor. Si no le llega corriente a la base, es como si el interruptor estuviera abierto. No hay corriente entre colector y emisor

![Untitled](Images/Transistores/Untitled%202.png)

- La corriente de base permite que la corriente colector-emisor exista

### Transistor como amplificador

- Funciona como un amplificado de señales.
- Le lalga una señal chica en la base,  y en el colector-emisor se hace grande.
- Trabajará como componente de electrónica analógica.

![Untitled](Images/Transistores/Untitled%203.png)

- Todo amplificador posee un $\beta$ o $h_{fe}$ la cual es la ganancia del transistor

$$
I_C=\beta I_B
$$

- La corriente de base es la corriente que comanda el paso que hay a través de CE

$$
I_E = I_B+I_C \Rightarrow I_E = I_C\left(1 + \dfrac{1}{\beta}\right)
$$

- Por ende, la corriente de base debe ser << corriente del colector $I_B<<I_C$
    - Por lo general $I_B=(0,1)I_C$

### Zonas de trabajo de un Transistor

1. **Corte**. $I_B=0 \Rightarrow I_{CE}=0$
    - No hay corriente por la base y no pasa corriente por el colector-emisor
2. **Activa** $I_B \Rightarrow I_{CE}$  variable. $I_C=\beta I_B$
    - Deja pasar más o menos corriente entre el colector y el emisor, dependiendo de la corriente de la base
3. **Saturación** $I_B \Rightarrow I_{CE}$  máxima
    - Entre el colector y el emisor pasa la máxima corriente posible. Aunque aumentemos la corriente en la base, la corriente coelctor-emisor se comporta como un interruptor cerrado (máxima)

![Untitled](Images/Transistores/Untitled%204.png)

### Intensidades en un Transistor

- En corte y stauración trabajará como un interruptor, y para electrónica digital será 0 o 1
- En zona activa, las corrientes variarán en función de la corriente de la base
    
    $$
    I_E = I_B+I_C \Rightarrow I_E = I_C\left(1 + \dfrac{1}{\beta}\right)
    $$
    

### Tensiones en un Transistor

![Untitled](Images/Transistores/Untitled%205.png)

- **En corte**
    - Cuando la tensión $V_1$ en la base es cero, entonces $I_B=0$ y $V_{BE}=V_1=0$
    - Entonces la corriente $I_{CE}=0A$, y $V_{CE} = V_2$
    - Normalmente los transistores tienen una mínima tensión en la que siguen en corte, un poco por encima de $0V$, esta será la que nos de la $I_B$ mínima para activarse
- **En saturación**
    - En este caso, $V_1$ será la máxima para conseguir la $I_{Bmax}$ a partir de la cual $I_{CE}$ será la máxima
    - Como se comporta como una interruptor cerrado, entonces $V_{CE} = 0V$
- **En activa**
    - Tendremos una $V_{BE}=0V$ y la tensión para conseguir la $I_B$ que nos de la $I_{CEmax}$
    - Ahora entre el clector y el emisor no es un interruptor cerrado ni abierto. Es solo como si hubiera una resistencia que iría disminuyendo el valor según aumente $I_B$ dejando pasar más corriente entre el colector-emisor
    
    ![Untitled](Images/Transistores/Untitled%206.png)
    
    [](https://www.youtube.com/watch?v=t_k4XkAIvDA&ab_channel=ElTraductordeIngenier%C3%ADa)
    

## Punto de Trabajo Q

![Untitled](Images/Transistores/Untitled%207.png)

- Un transistor bipolar que opera en la región lineal tiene características eléctricas que son utilizadas para amplificación.
- Los valres de corrientes y tensiones en continua en los terminales del transistor se **denomina punto de trabajo Q**
    - El circuito está polarizado con dos resistencias y una fuente de tensión continua
    

![Untitled](Images/Transistores/Untitled%208.png)

$$
I_E=I_C+I_B
$$

$$
\beta=\dfrac{I_C}{I_B}>>1
$$

$$
\alpha = \dfrac{1_C}{I_E} \approx 1 
$$

![Untitled | 400](Images/Transistores/Untitled%209.png)

![Untitled](Images/Transistores/Untitled%2010.png)
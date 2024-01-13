[[Física II]] [[Electronica Básica]]
Date: February 13, 2023 12:14 PM
Status: Done
Year: 2022

## 2.2 Circuito Capacitivo-Resistivo

- La caída de potencial en la resistencia
    
    $$
    v_{ab}(t)=i(t)R
    $$
    
- La caída de potencial en el capacitor
    
    $$
    v_{bc}(t)=\dfrac{q(t)}{C}
    $$
    

![Untitled](Images/Circuito%20Capacitivo-Resistivo/Untitled.png)

### 2.2.1 Proceso de carga del capacitor

![Untitled](Images/Circuito%20Capacitivo-Resistivo/Untitled%201.png)

- El hecho de que exista una resistencia, hace que el proceso de carga de un capacitor no sea instantáneo.
- Definimos la carga en función de la capacitancia $q=C\varepsilon$
- En t=0, cierro el interruptor. Cómo se comporta la carga?
    
    ![Untitled](Images/Circuito%20Capacitivo-Resistivo/Untitled%202.png)
    

![Untitled](Images/Circuito%20Capacitivo-Resistivo/Untitled%203.png)

- Constante de tiempo en un circuito RC
    - Es una medida de la rapidez con la cual se carga un capacitor
    - Cuánto más chica es la resistencia, la tasa de cambio es cada vez más rápido
    
    $$
    \tau=RC
    $$
    
- Con la regla de Kirchhoff sabemos que
    
    $$
    \varepsilon - iR-\dfrac{q}{C}=0 \\ \varepsilon - \dfrac{dq}{dt}R-\dfrac{q}{C}=0
    $$
    
    Nos encontramos con una ecuación diferencial, cuya ecuación es
    
    $$
    q(t)= Q_{max}(1-e^{(-t/\tau)})
    $$
    
    Derivando con respecto de $t$, para obtener la función de la corriente
    
    $$
    i(t)=\frac{Q}{\tau}e^{-t/\tau}=\frac{\varepsilon}{R}e^{-t/\tau}
    $$
    

![Untitled](Images/Circuito%20Capacitivo-Resistivo/Untitled%202.png)

Para obtener distintos valores de $\tau$ , reemplazamos por $nRC$

![Untitled](Images/Circuito%20Capacitivo-Resistivo/Untitled%204.png)

- En la realidad, para un tiempo de $5\tau$ ya consideramos que el capacitor se encuentra cargado.
- Tensiones
    - Tensión en la resistencia
        
        $$
        V_R(t)=\varepsilon e^{-t/\tau}
        $$
        
    - Tensión en el capacitor
        
        $$
        V_C(t)=\frac{q(t)}{C}=\frac{Q}{C}(1-e^{(-t/\tau)})=\varepsilon (1-e^{(-t/\tau)})
        $$
        
- Energía almacenada en el capacitor
    
    $$
    U(t)=\frac{1}{2}\dfrac{q^2(t)}{C}=\frac{1}{2} \dfrac{Q^2(1-e^{(-t/\tau)})^2}{C}
    $$
    
- Potencia disipada en la resistencia
    
    $$
    P_R(t)=i^2(t)R=\dfrac{\varepsilon^2}{R}e^{(-2t/\tau)}
    $$
    

### 2.2.2 Proceso de descarga del capacitor

![Untitled](Images/Circuito%20Capacitivo-Resistivo/Untitled%205.png)

![Untitled](Images/Circuito%20Capacitivo-Resistivo/Untitled%206.png)

- La carga en función del tiempo en el proceso de descarga
    
    $$
    \dfrac{q(t)}{C}+\dfrac{dq(t)}{dt}R=0 \\ q(t)=Qe^{-t/\tau}
    $$
    
- La corriente en función del tiempo queda definida como

$$
i(t)=\dfrac{dq(t)}{dt}=-\dfrac{Q}{RC}e^{-t/RC}=I_0e^{-t/RC}
$$

Completar el resto de ecuaciones

### 2.2.3 Capacitor cargado completamente

- Al cargarse por completo, ya no habrá corriente en el circuito. No hay movimiento de cargas
    
    $$
    \varepsilon - \Delta V_C- \Delta V_R = 0\\ \varepsilon - \Delta V_C- IR = 0\\\varepsilon - \Delta V_C= 0
    $$
    
    Por lo tanto, la caída de potencial en la resistencia es nula, y la fem queda solo para el capacitor $\varepsilon = \Delta V_C$
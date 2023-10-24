[[Física II]] [[Electronica Básica]]
Date: February 13, 2023 12:28 PM
Status: Done
Year: 2022

![Untitled](Images/Circuitos%20inductivos-capacitivos/Untitled.png)

Aplicando Kirchhoff

$$
-L\dfrac{di}{dt}-\dfrac{q}{C}=0
$$

$$
L\dfrac{dq^2}{dt}+\dfrac{q(t)}{C}=0
$$

Donde la carga del capacitor $q=Q\cos(\omega t + \phi)$

La frecuencia angular de la oscilación

$$
\omega=\sqrt{\dfrac{1}{LC}}
$$

Por lo tanto, la corriente a través del circuito LC

$$
i=-\omega Q \sin (\omega t + \phi)
$$

Agregar $V_C$, $V_L$, $U_C$, $U_L$

**Sistemas amortiguados**

$$
-iR-L\dfrac{di}{dt}-\dfrac{q}{C}=0
$$

$$
\dfrac{d^2q}{dt^2}+\dfrac{R}{L}\dfrac{dq}{dt}+\dfrac{1}{LC}q=0
$$

Ecuación diferencial de segundo grado, cuya solución es:

$$
q=Ae^{-(R/2L)t}\cos\left(\sqrt{\dfrac{1}{LC}-\dfrac{R^2}{4L^2}}t+\phi \right)
$$

Frecuencia de oscilación amortiguada

$$
\omega'=\sqrt{\dfrac{1}{LC}-\dfrac{R^2}{4L^2}}
$$

![Untitled](Images/Circuitos%20inductivos-capacitivos/Untitled%201.png)

![Untitled](Images/Circuitos%20inductivos-capacitivos/Untitled%202.png)

![Untitled](Images/Circuitos%20inductivos-capacitivos/Untitled%203.png)



[[Ley de Faraday Lenz]]
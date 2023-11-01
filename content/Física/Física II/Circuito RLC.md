[[Física II]] [[Electronica Básica]]
Date: February 13, 2023 12:35 PM
Status: Done
Year: 2022

![Untitled](Images/Circuito%20RLC/Untitled.png)

![Untitled](Images/Circuito%20RLC/Untitled%201.png)

![Untitled](Images/Circuito%20RLC/Untitled%202.png)

Realizando ley de mallas de Kirchhoff

$$
v_T=L\dfrac{d^2q}{dt^2}+R\dfrac{dq}{dt}+\dfrac{q}{C}
$$

La tensión en cada componente

$$
V_R=IR
$$

$$
V_L = I X_L
$$

$$
V_C = I X_C
$$

Realizando la suma vectorial de cada fasor

$$
V=\sqrt{V_R^2+(V_C-V_L)^2}=\sqrt{(IR)^2+(IX_L-IX_C)^2}=I\sqrt{R^2+(X_L-X_C)^2}
$$

Queda entonces definida la impedancia $Z$ del circuito

$$
Z = \sqrt{R^2+(X_L-X_C)^2}=\sqrt{R^2+[\omega L-(1/\omega C)]^2}
$$

$$
V=IZ
$$

### Ángulo de fase del circuito

$$
\tan \phi = \dfrac{V_L-V_C}{V_R}=\dfrac{I(X_L-X_C)}{IR}= \dfrac{X_L-X_C}{R}=\dfrac{\omega L- 1/\omega C}{R}
$$

# Vector Poynting
[[Potencia en CA]]
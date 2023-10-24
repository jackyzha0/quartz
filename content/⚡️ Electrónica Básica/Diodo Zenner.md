# Diodo Zenner

- Date:: [[2022-08-14]]
- Course::[[Electronica Básica]]
- Source:: [[Diodo semiconductor]]




## Diodo Zener

- Puede aguantar una tensión inversa más estable que un diodo común.
- Los diodos zener, zener diodo o simplemente zener, son diodos que están diseñados para mantener un voltaje constante en su terminales, llamado Voltaje o Tensión Zener ($V_z$) cuando se polarizan inversamente, es decir cuando está el cátodo con una tensión positiva y el ánodo negativa.

![Untitled | center | 400](Images/Diodo%20Zenner/Untitled.png)

- Un zener en conexión con polarización inversa siempre tiene la misma
tensión en sus extremos (tensión zener).
- **La tensión de Zener $V_z$ sucede cuando lo polarizo de manera inversa, y se mantiene constante**
    - La máxima tensión que puede soportar antes de su ruptura
- Cuando polarizamos a la inversa un diodo Zener, tiene una corriente mínima, pero me garantiza que aunque yo aumente la tensión me va a garantizar esa tensión constante en el dispositivo de salida.

[Reguladores de voltaje con diodo zener | Todos los casos](https://www.youtube.com/watch?v=T6RbvrATtuw&ab_channel=MundoElectr%C3%B3nica)

### Caso 0 - $V_s$  constante y $R_L$ infinita

- En todos los ejercicios, el objetivo suele ser el cálculo de la resistencia de polarización del Zener

![Untitled | center | 400](Images/Diodo%20Zenner/Untitled%201.png)

$$
I_{R_{pz}}=I_z
$$

$$
V_s=V_{R_{pz}}+V_z\\I_{R_{pz}}R_{pz}=V_s-V_z\\R_{pz}=\dfrac{V_s-V_z}{I_{R_{pz}}}
$$

Además, la potencia dicipada por dicha resistencia está dada por 

$$
P_{R_{pz}}=\dfrac{(V_s-V_z)^2}{I_{R_{pz}}}=\dfrac{(V_s-V_z)^2}{I_{z}}
$$

### Caso 1 - $V_s$  constante y $R_L$ constante

- En todos los ejercicios, el objetivo suele ser el cálculo de la resistencia de polarización del Zener

![Untitled](Images/Diodo%20Zenner/Untitled%202.png)

$$
I_{R_{pz}}\neq I_z\\I_{R_{pz}}=I_z+I_L
$$

$$
V_s=V_{R_{pz}}+V_z\\I_{R_{pz}}R_{pz}=V_s-V_z\\R_{pz}=\dfrac{V_s-V_z}{I_z+I_L}
$$

Además, la potencia dicipada por dicha resistencia está dada por 

$$
P_{R_{pz}}=\dfrac{(V_s-V_z)^2}{I_{R_{pz}}}=\dfrac{(V_s-V_z)^2}{I_z+I_L}
$$

### Caso 2 - $V_s$  variable y $R_L$ constante

- En todos los ejercicios, el objetivo suele ser el cálculo de la resistencia de polarización del Zener
- Deberíamos contemplar los dos casos, cuando la tensión es mínima, y cuando la tensión es máxima
    - Es necesario asegurar que la tensión y corriente mínima se aseguren, para que el zener funcione correctamente.

**Tensión mínima**

![Untitled](Images/Diodo%20Zenner/Untitled%203.png)

$$
R_{pz}=\dfrac{V_{s_{min}}-V_z}{I_{z_{min}}+I_L}
$$

**Tensión máxima**

![Untitled](Images/Diodo%20Zenner/Untitled%204.png)

$$
R_{pz}=\dfrac{V_{s_{max}}-V_z}{I_{z_{max}}+I_L}
$$

La corriente máxima por el Zener

$$
I_{z_{max}}=\dfrac{V_{s_{max}}-V_z}{R_{pz}}-I_L
$$

Además, la potencia dicipada por dicha resistencia está dada por 

$$
P_{R_{pz}}=\dfrac{(V_s-V_z)^2}{I_{R_{pz}}}=\dfrac{(V_s-V_z)^2}{I_z+I_L}
$$

![Untitled](Images/Diodo%20Zenner/Untitled%205.png)
[[Análisis matemático II]]

## Definición de Límite
Sea $f$ una función de n variables definida en alguna bola abierta $B^*_\delta(A) \subset D$, con $D$ dominio de la función, excepto posiblemente en el punto $A$. Entonces **el límite de $f(P)$ conforme P tiende a A es L**, lo cual se denota:
$$\lim_{P\rightarrow A}f(P)=L$$
si para cualquier $\epsilon > 0$, existe $\delta > 0$ tal que
$$ 0< ||P-A|| < \delta \Rightarrow |f(P)-L| < \epsilon$$
Si $f$ es una función de dos variables independientes:
$$\lim_{(x,y)\rightarrow (a_1,a_2)}f(x,y)=L$$
si para cualquier $\epsilon > 0$, existe $\delta > 0$ tal que
$$ 0< \sqrt{(x-a_1)^2+(y-a_2)^2} < \delta \Rightarrow |f(x,y)-L| < \epsilon$$

Bola abierta y cerrada

**Importante:** Para que exista el límite doble, el valor de L debe ser el mismo por cualquier trayectoria considerada que pase por A.

## Criterio para inexistencia del límite doble
Si una función $f$ tiene límites distintos a lo largo de dos trayectorias diferentes para las cuales $(x,y)$ tiende al punto $(a_1,a_2)$ entonces $\lim_{(x,y)\rightarrow (a_1,a_2)}f(x,y)=L$ **no existe**.

## Propiedades de los límites

- Constantes: $\lim\limits_{(x,y)\to (x_0,y_0)} b = b$
- Identidad: $\lim\limits_{(x,y)\to (x_0,y_0)} x = x_0;\qquad \lim\limits_{(x,y)\to (x_0,y_0)} y = y_0$
- Sumas/Diferencias: $\lim\limits_{(x,y)\to (x_0,y_0)}\big(f(x,y)\pm g(x,y)\big) = L\pm K$
- Multiplos escalares: $\lim\limits_{(x,y)\to (x_0,y_0)} b\cdot f(x,y) = bL$
- Productos: $\lim\limits_{(x,y)\to (x_0,y_0)} f(x,y)\cdot g(x,y) = LK$
- Cocientes: $\lim\limits_{(x,y)\to (x_0,y_0)} f(x,y)/g(x,y) = L/K$, ($K\neq 0$)
- Poderes: $\lim\limits_{(x,y)\to (x_0,y_0)} f(x,y)^n = L^n$


![Untitled](Images/Definición%20formal%20de%20límite/Untitled.png)

![Untitled](Images/Definición%20formal%20de%20límite/Untitled%201.png)

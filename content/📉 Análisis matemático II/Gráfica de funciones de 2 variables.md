[[Análisis matemático II]]
## Gráfica de funciones de dos variables

La gráfica de $z=f(x,y)$ es el conjunto de todos los $(x,y,z)$ en el espacio tales que $z=f(x,y)$ pertenece al dominio de $z$. Esta gráfica es una superficie en $\mathbb{R}^3$.

### Recta en $\mathbb{R}^3$

Para determinar la ecuación de la recta utilizamos un vector $\vec{v}=(a,b,c)$ que dará la dirección de la recta $L$, y un punto de paso $P(x_1,y_1,z_1)$. Es decir, todos los $Q(x,y,z)$ tales que $\vec{PQ}$ es paralelo a $\vec{v}$.

$$
\vec{PQ} || \vec{v} \Rightarrow \vec{PQ} = {t}\vec{v} \Rightarrow (x-x_1,y-y_1,z-z_1)=( {t}a, {t}b, {t}c)
$$

Por lo tanto:

$$
L = \left\{ \begin{array}{c}
		x-x_1 = {t}a \\
		y-y_1 = {t}b \\
		z-z_1 = {t}c
	\end{array}\right.
	\Rightarrow
	\left\{ \begin{array}{c}
		x = {t}a + x_1 \\
		y = {t}b + y_1\\
		z = {t}c + z_1
	\end{array}\right.
	\Rightarrow
	\frac{x-x_1}{a}=\frac{y-y_1}{b}=\frac{z-z_1}{c}
$$

Si $a\neq0$,$b\neq0$,$c\neq0$.

### Planos en $\mathbb{R}^3$

Un plano en $\mathbb{R}^3$ está caracterizado por un vector normal $N=(a,b,c)$ y un punto de paso $P_0$. Todo $Q$ que pertenece al plano cumple que:

$$
\vec{P_0Q}\perp N \Rightarrow \vec{P_0Q}\cdot N=0 \\
(x-x_1, y-y_1, z-z_1)\cdot(a,b,c)=0 \\
{a(x-x_1)+b(y-y_1)+c(z-z_1)=0}
$$

Ecuación general del plano:

$$
ax+by+cz+d=0
$$

### Trazas

Las trazas son las curvas que surgen de la intersección de una superficie con los planos coordenados. Por ejemplo, sea la superficie $x-y+2=0$:

$$
x-y+z=2 \\
\frac{x}{2}+\frac{y}{-2}+\frac{z}{2}=1
$$

Fácilmente determinamos sus puntos característicos: $(2,0,0)$;$(0,-2,0)$;$(0,0,2)$.

Trazas de la superficie $x-y+2=0$


## Ángulo entre planos

$$
\cos(\alpha)=\dfrac{|\vec{n_1}\cdot\vec{n_2}|}{|\vec{n_1}||\vec{n_2}|}
$$

## Recursos adicionales

- [Definición y gráficas de funciones de dos variables](https://www.mate.unlp.edu.ar/practicas/54_5_0210201317246.pdf)
- [Funciones de varias variables y espacio tridimensional](https://espanol.libretexts.org/Matematicas/Libro%3A_Calculo_activo_(Boelkins_et_al.)/09%3A_Funciones_multivariables_y_vectoriales/9.01%3A_Funciones_de_Varias_Variables_y_Espacio_Tridimensional)
- [Notas para el curso de graficación por computadora](https://prometeo.matem.unam.mx/recursos/VariosNiveles/iCartesiLibri/recursos/Notas_Graficacion_por_Computadora/index.html)


![Untitled](Images/Gráfica%20de%20funciones%20de%202%20variables/Untitled%201.png)

![Untitled](Images/Gráfica%20de%20funciones%20de%202%20variables/Untitled%202.png)
# Distribución Normal

%%
Date:: [[2023-04-19]]
Course:: [[Probabilidad y Estadística]]
Source:: [[Distribución de probabilidad]]
#estadistica/distribuciones_probabilidad 
%%

![[Pasted image 20230419194753.png | center | 400]]
- También conocida con el nombre de distribución "gaussiana" o "campana de Gauss"

Cómo se define una distribución normal?
?
>[!important] Distribución Normal
>La variable aleatoria $X$ se dice que tiene una distribución Normal con parámetros $\mu$ $(\infty<\mu\infty)$ y $\sigma$ $(\sigma >0)$, $(X\sim N(\mu,\sigma^2))$ si y solo si $$f_x(x)=\dfrac{1}{\sqrt{2\pi}\sigma}e^{-\dfrac{1}{2}\left(\dfrac{x-\mu}{\sigma}\right)^2}$$

>[!important] Teorema
>La media y la varianza de una variable aleatoria con función de distribución normal está dada por $E(X)=\mu$ y $Var(X)=\sigma^2$

Cuales son las propiedades de la curva normal?
?
## Propiedades de la curva normal
1. La forma de la gráfica de $f$ tiene la conocida forma de una campana. Es simétrica con respecto a la recta $x=\mu$ 
2. Cuando $x\rightarrow \pm \infty$, $f(x)\rightarrow 0$ asintóticamente. O sea, el eje $x$ es una asíntota horizontal.
3. Tiene un máximo absoluto en $(\mu,f_x(\mu))$
4. Los puntos de inflexión ocurren en $x=\mu\pm\sigma$. 
5. Si $\sigma$ es relativamente grande la gráfica de $f$ tiende a se achatada o bien ensanchada.


## Áreas bajo la curva normal

Cómo está definida el area bajo la curva normal? 
?
La curva de cualquier distribución continua de probabilidad está construida de tal modo que el área bajo la curva, limitada por los dos puntos $x=a$ y $x=b$ es igual a la probabilidad que la variable aleatoria $X$ asuma valores entre $a$ y $b$
$$A=P(a<x<b)=\dfrac{1}{\sqrt{2\pi}\sigma}\int_{a}^b e^{-\dfrac{1}{2}\left(\dfrac{x-\mu}{\sigma}\right)^2}dx$$
Qué le debemos realizar a la curva normal para poder calcular sus probabilidades (areas)?
?
Esta función no posee una resolución directa, por lo que se debe resolver numéricamente.
- Para poder resolverla, se utilizan métodos de **estandarización**. Se realiza la siguiente transformación: $Z=\dfrac{X-\mu}{\sigma}$

Cómo se define la distribución normal estándar?
?
>[!important] Distribución Normal Estándar
>La distribución de una variable aleatoria normal con $\mu=0$ y $Var(X)=1$ se llama distribución normal estándar $(Z\sim N(0,1))$ su función de densidad de probabilidad $$f(z)=\dfrac{1}{\sqrt{2\pi}}e^{-\dfrac{1}{2}z^2}$$
>con $-\infty<z<\infty$
- Si $X$ se distribuye como una normal con media $\mu$ y varianza $\sigma^2$, luego la variable $Z$ (estandarización de $X$) se distribuye como una normal con media 0 y varianza 1
$$X\sim N(\mu,\sigma^2)\Rightarrow Z=\dfrac{x-\mu}{\sigma}\sim N(0,1)$$
$$P(a<x<b)=\dfrac{1}{\sqrt{2\pi}\sigma}\int_{a}^b e^{-\dfrac{1}{2}\left(\dfrac{x-\mu}{\sigma}\right)^2}dx=\dfrac{1}{\sqrt{2\pi}}\int_{z_1}^{z_2} e^{-\dfrac{1}{2}z^2}dz= P(z_1<Z<z_2)$$


## Notación

$$P(z_1<Z<z_2)=P(Z\leq z_2)- P(Z\leq z_1) = \Phi(z_2)-\Phi(z_1)$$
Sea un valor cualquiera en la distribución, donde el area hacia la derecha de un $z_\alpha$ es igual a $\alpha$. Entonces $\Phi(z_\alpha)=1-\alpha$

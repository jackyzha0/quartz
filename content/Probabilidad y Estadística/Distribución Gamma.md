# Distribución Gamma

%%
Date:: [[2023-04-26]]
Course:: [[Probabilidad y Estadística]]
Source:: [[Distribución de probabilidad]]
#estadistica/distribuciones_probabilidad 
%%

- Se utiliza para modelar variables aleatorias continuas con valores positivos y asimétricos.

Cómo se define la función gamma?
?
>[!quote] Definición de función gamma
>$$\Gamma(\alpha)=\int_{0}^{\infty}x^{\alpha-1}e^{-x}dx$$ para $\alpha > 0$

Cuáles son las propiedades de la función gamma?
?
## Propiedades
1. Con cualquier $\alpha >1, \Gamma (\alpha)=(\alpha -1)\cdot \Gamma(\alpha - 1)$ via integración por partes
2. Con cualquier entero positivo, $n$, $\Gamma(n)=(n-1)!$
3. $\Gamma (1/2) = \sqrt{\pi}$


Cómo se define la distribución gamma?
?
La variable aleatoria $X$ tiene una distribución gamma con parámetros $\alpha$ y $\beta$ si su función de densidad está dada por 
>[!quote] Distribución gamma
>![[Pasted image 20230426183309.png | 400]] donde $\alpha > 0$ y $\beta > 0$
  
![[Pasted image 20230426183941.png | 400]]

Cómo es la media y la varianza de la distribución gamma?
?
- La media y la varianza de la distribución gamma son $\mu=\alpha\beta$ y $\sigma^2=\alpha\beta^2$


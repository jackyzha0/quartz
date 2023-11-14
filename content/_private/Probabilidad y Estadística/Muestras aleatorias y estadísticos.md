# Muestras aleatorias y Estadísticos

%%
Date:: [[2023-05-10]]
Course:: [[Probabilidad y Estadística]]
Source:: [[Teoría de Muestreo]]
%%

Las variables aleatorias $X_1, X_2 ,\dots, X_n$ constituirán una muestra aleatoria de la población $f(x)$ con valores numéricos $x_1,x_2, \dots, x_n$ si las mediciones se obtienen repitiendo el experimento $n$ veces.

>[!quote] Definición de muestra aleatoria
> Sea $X$ una variable aleatoria con cierta distribución de probabilidades. Sean $X_1,X_2,\dots,X_n$, $n$ variables aletorias independientes con una con la misma distribución de $X$. Llamamos entonces, a $(X_1,X_2,\dots, X_n)$ muestra aleatoria de la variable aleatoria $X$


## Estadístico
>[!quote] Definición de estadístico
>Cualquier función de las variables aleatorias que constituye una muestra aleatoria se llama estadístico.
>Sea $X_1,X_2,\dots,X_n$ muestra aleatoria, un estadístico $T$ es cualquier función de la muestra aleatoria, es decir $T=g(X_1,X_2,\dots,X_n)$
- Expresión matemática que depende de la muestra.

## Estimador
- Expresión matemática que depende de la muestra y que no involucra a ningún parámetro.
- Solemos utilizar el estimador para conectarlo con el parámetro que quiero estimar.
- Estos estimadores tienen distribuciones.i

### Tendencia central de la muestra
- Algunos estimadores más utilizados:
![[Pasted image 20230510183915.png | 500]]

![[Pasted image 20230510183943.png | 500]]
### Variabilidad de la muestra

- **Rango** 
	![[Pasted image 20230510184113.png | 500]]

- **Varianza muestral**
	![[Pasted image 20230510184158.png | 500]]

- **Teorema**
	![[Pasted image 20230510184227.png | 500]]



## Distribución muestral del estadístico

>[!quote] Distribución muestral
>La distribución muestral e un estadístico recibe el nombre de **distribución muestral**

- La distribución de probabilidad de $\bar{X}$ recibe el nombre de  distribución muestral de la media. 
- La distribución muestral de un estadístico depende del tamaño de la población, del tamaño de las muestras y del método de selección de estas últimas.

>[!important] Teorema
>Si $X_1, X_2, \dots, X_n$ son variables aleatorias independientes que tienen distribuciones normales con medias $\mu_1, \mu_2, \dots, \mu_n$ y varianzas $\sigma_1^2,\sigma_2^2,\dots,\sigma_n^2$ respectivamente, entonces la variable aleatoria $$Y=a_1X_1+a_2X_2 + \dots + a_nX_n$$
tiene una distribución normal con media $$\mu_Y=a_1\mu_1+a_2\mu_2 + \dots + a_n\mu_n$$
y varianza $$\sigma_Y=a_1^2\sigma_1^2+a_2^2\sigma_2^2 + \dots + a_n^2\sigma_n^2$$



___
## Flashcards
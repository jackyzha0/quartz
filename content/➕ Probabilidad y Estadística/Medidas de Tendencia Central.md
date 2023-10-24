# Medidas de Tendencia Central
%%
Date:: [[2023-03-22]]
Course:: [[Probabilidad y Estadística]]
Source:: [[Estadistica Descriptiva]]
%%

- Marcan la centralidad de los datos, en función de **algún criterio específico**


## La media muestral o promedio aritméticos 
![[Pasted image 20230322134426.png]]
- Es la media aritmética de una serie de valores
- Todas las medidas de tendencia muestral pueden variar cuando sacamos distintas muestras, sin embargo, la <mark style="background: #BBFABBA6;">media muestral es la que menos varía (posee falta de robustez)</mark>.

## La mediana muestral
![[Pasted image 20230322134525.png]]
- Utilizo los [ ] en el subindice para denotar los datos ordenados.
- Es el valor que se encuentra en la posición media cuando los datos están ordenados de menor a mayor
- Es el dato que está ubicado en el centro cuando el número de datos es impar. Si es par, se considera la mediana el promedio de los datos centrales.
- Es una medida que <mark style="background: #BBFABBA6;">no se ve afectada por los valores extremos (outliers)</mark>. Posee más robustez.

## La moda muestral
![[Pasted image 20230322134620.png]]
- La moda es la marca de clase que posee mayor frecuencia.
- <mark style="background: #BBFABBA6;">Cuando la variable es nominal</mark>, la única medida de tendencia que podemos tomar es la moda.
- En un conjunto de datos agrupados se usa como moda la marca de la clase de mayor frecuencia. Esto es válido bajo la condición de que todas las clases tienen el mismo ancho.




___
## Flashcards

#estadistica/estadistica_descriptiva

- Cómo se define la media muestral o promedio aritmético;; **Definición:** $x_1, x_2, \dots , x_n$ constituye una muestra aleatoria de tamaño $n$ la media muestral se define como $$\bar{x}\dfrac{\sum_{i=1}^n x_i}{n}$$

- Cómo se define la mediana muestral? ;; La **mediana muestral se define como** $$\bar{x}=\begin{cases}x_{[(n+1)/2]} & \text{n es impar} \\ \dfrac{x_{[n/2]}+x_{[(n/2)+1]}}{2} & \text{n es par}\end{cases}$$ siendo $x_{[1]}, x_{[2]}, \dots , x_{[n]}$ la muestra aleatoria de tamaño n acomodada en orden de magnitud creciente.

- Cómo se define la moda muestral? ;; Es el valor de la muestra que ocurre con mayor frecuencia. Es la marca de clase con mayor frecuencia.
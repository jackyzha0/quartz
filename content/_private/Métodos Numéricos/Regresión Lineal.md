# Regresión Lineal

%%
Date:: [[2023-09-20]]
Course:: [[Métodos Numéricos]]
Source:: [[]]
%%

La regresión lineal es un método estadístico utilizado para modelar la relación entre una variable dependiente y una o más variables independientes. En la regresión lineal, se asume que la relación entre las variables es lineal, es decir, se puede representar mediante una línea recta en un espacio bidimensional o un hiperplano en un espacio de mayor dimensión. El objetivo de la regresión lineal es encontrar la mejor línea recta o hiperplano que se ajuste a los datos conocidos, de modo que se minimice la distancia entre los puntos y la línea o hiperplano.

La regresión lineal se puede expresar matemáticamente de la siguiente manera:

$$
Y = \beta_0 + \beta_1X_1 + \beta_2X_2 + ... + \beta_nX_n + \epsilon
$$

Donde:
- Y es la variable dependiente que se desea predecir.
- $\beta_0$, $\beta_1$, $\beta_2$, ..., $\beta_n$ son los coeficientes de regresión que representan la contribución de cada variable independiente $X_1$, $X_2$, ..., $X_n$ a la variable dependiente Y.
- $\epsilon$ es el término de error, que representa la diferencia entre el valor real de Y y el valor predicho por el modelo de regresión.

La aproximación por mínimos cuadrados es un método utilizado para encontrar la mejor función que se ajuste a un conjunto de datos conocidos, minimizando la suma de los cuadrados de las diferencias entre los valores reales y los valores predichos por la función. Este método es ampliamente utilizado en estadística y análisis numérico para aproximar funciones en casos donde no se puede utilizar una función interpolante exacta.

![[Ajuste de una recta por mínimos cuadrados]]


![[Coeficiente de correlación]]
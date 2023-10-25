# Interpolación Polinomial

%%
Date:: [[2023-09-06]]
Course:: [[Métodos Numéricos]]
Source:: [[U3 - MN]]
%%

## Que es la interpolación
- Técnica matemática utilizada para estimar valores que pasan por un conjunto de datos 

## Función interpolante
- Función matemática que se utiliza para estimar valores entre puntos de datos conocidos, permitiendo llenar los espacios vacíos de un conjunto de datos
- Una función interpolante es una función matemática que se utiliza para aproximar una función desconocida en un conjunto de puntos conocidos. La función interpolante pasa exactamente por cada uno de los puntos conocidos y se utiliza para estimar el valor de la función en cualquier punto dentro del intervalo definido por los puntos conocidos.

## Aproximación polinomial
- Construcción de polinomio que se acerca a una función dada en un cierto intervalo de puntos

## Interpolación vs aproximación polinomial
- La interpolación es un método de estimación de una función desconocida en un conjunto de puntos conocidos, donde la función interpolante pasa exactamente por cada uno de los puntos conocidos. Es decir, la interpolación busca encontrar una función que se ajuste perfectamente a los datos conocidos. La precisión de la interpolación depende del número de puntos conocidos y del grado del polinomio utilizado para la interpolación.
- La aproximación, por otro lado, es un método de estimación de una función desconocida en un conjunto de puntos conocidos, donde la función aproximante no necesariamente pasa por cada uno de los puntos conocidos. Es decir, la aproximación busca encontrar una función que se ajuste de manera aproximada a los datos conocidos. La precisión de la aproximación depende del número de puntos conocidos y del grado del polinomio utilizado para la aproximación.


## [[Polinomio de Taylor]]
## [[Polinomio de Newton]]
[[Polinomio de Lagrange]]


## Ventajas y desventajas de los métodos anteriores

| Método | Ventajas | Desventajas |
| --- | --- | --- |
| Polinomios de Taylor | Mayor precisión en la aproximación a medida que se aumenta el grado del polinomio. Útil para aproximar funciones en un punto específico. | Requiere el cálculo de las derivadas de la función en el punto de interés. Solo es válida en un intervalo limitado alrededor del punto de interés. |
| Polinomios de Newton | Útil para aproximar funciones en un conjunto de puntos conocidos. La fórmula del polinomio es más fácil de calcular que la del polinomio de Taylor. | Requiere el cálculo de las diferencias divididas de la función en el conjunto de puntos conocidos. Solo es válida en el intervalo definido por los puntos conocidos. |
| Polinomios de Lagrange | Útil para aproximar funciones en un conjunto de puntos conocidos. La fórmula del polinomio es más fácil de calcular que la del polinomio de Newton. | Requiere el cálculo de los términos de Lagrange correspondientes a cada punto conocido. Solo es válida en el intervalo definido por los puntos conocidos. | 


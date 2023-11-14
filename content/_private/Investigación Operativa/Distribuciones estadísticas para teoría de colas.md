# Distribuciones estadísticas para teoría de colas

%%
Date:: [[2023-10-24]]
Course:: [[Investigación Operativa]]
Source:: [[U3 - IO]] [[Teoría de Colas]]
%%

## Distribución Exponencial 
La distribución exponencial es ampliamente utilizada en teoría de colas para modelar el tiempo entre llegadas de clientes o eventos en un sistema. Esta distribución se caracteriza por su función de densidad de probabilidad:

$$ f(x) = \lambda e^{-\lambda x} $$

Donde lambda es el parámetro de tasa y x es el tiempo entre llegadas. La distribución exponencial se utiliza para modelar eventos que ocurren de forma independiente y a una tasa constante.
Más info: [[Distribución Exponencial]]

## Distribución De Poisson
La distribución de Poisson también es comúnmente utilizada en teoría de colas para modelar la cantidad de eventos que ocurren en un intervalo de tiempo dado. Esta distribución se caracteriza por su función de probabilidad:

$$ P(X=k) = \frac{e^{-\lambda}\lambda^k}{k!} $$

Donde lambda es el parámetro de tasa y k es el número de eventos que ocurren en el intervalo de tiempo. La distribución de Poisson se utiliza para modelar eventos que ocurren de forma independiente y a una tasa constante, pero a diferencia de la distribución exponencial, no considera el tiempo entre eventos.

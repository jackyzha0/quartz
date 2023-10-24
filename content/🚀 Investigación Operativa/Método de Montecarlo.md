# Método de Montecarlo

%%
Date:: [[2023-09-16]]
Course:: [[Investigación Operativa]]
Source:: [[U2 - IO]]
%%


El método de Montecarlo es una técnica matemática que permite obtener aproximaciones numéricas a problemas complejos mediante el uso de números aleatorios o datos aleatorios. Es útil para obtener simulaciones de la vida real y es aplicable para gestión de inventario, modelos de mercado financiero, epidemiología, simulación de circuitos, análisis de riesgo, etc.

### Números Aleatorios

Son números generados de tal manera que no muestran ningún tipo de patrón o regularidad predecible, al menos en un rango limitado. Existen dos tipos:

- Números aleatorios verdaderos. Son generados de manera completamente aleatoria.
- Números aleatorios pseudoaleatorios. Son generados mediante algoritmos o fórmulas matemáticas.

La librería en python que se utilizará en el curso es random. Sus funciones básicas son:

```python
random.random()
random.randint(a,b)
random.uniform(a,b)
random.choice(['a','b','c'])
```

### Ejemplo - Estimación de Pi

Teniendo un plano cuadrado con un circulo dentro, si tengo el area del cuadrado y el area del circulo,

$$ \frac{Acirc}{Acuad}\approx \frac{CDCirc}{CDCuad} $$

$$ \pi \approx \frac{CDCirc}{CDCuad}\cdot 4 $$

Así podremos llegar a estimar pi

![[Pasted image 20230930194937.png]]
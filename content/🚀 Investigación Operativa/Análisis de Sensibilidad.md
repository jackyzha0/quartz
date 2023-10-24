# Análisis de Sensibilidad

%%
Date:: [[2023-08-24]]
Course:: [[Investigación Operativa]]
Source:: [[U1 - IO]]
%%

## Introducción 
- Algunas veces, algunos parámetros del modelado pueden variar. Muchas veces es costoso correr un modelo de programación lineal.  
- Ayuda a tener una mejor noción de soluciones óptimas ante cambios en las restricciones y/o en la función objetivo.

## Tipos de restricciones
Una vez resuelto el problema, se pueden definir dos tipos de restricciones
- Binding (vinculante)
	- Restricciones que se cumplen de manera exacta en la solución óptima. Es decir la solución óptima satisface la igualdad de la restricción.
	- Cambiar cualquier valor dentro de la restricción alterará la solución óptima del problema.
	- Tiene un papel activo en la determinación de la solución óptima.
- Non binding (no vinculante)
	- Restricciones que no afectan la solución óptima del problema. La solución óptima puede encontrarse dentro de los límites impuestos por estar restricciones, sin satisfacer exactamente la igualdad.
	- Hay cierto margen para moverse dentro de estas restricciones sin cambiar la solución óptima.
	- No tienen un papel activo en la determinación de la solución óptima.

## Precio sombra
- El precio sombra de una restricción indica cuánto aumentaría o disminuiría el valor óptimo de la función objetivo si se relajara o se modificara ligeramente esa restricción en particular, mientras se mantienen las demás condiciones constantes.
```python
restriccion.dual_value()
```

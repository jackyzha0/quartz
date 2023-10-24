# Teoría de Grafos

%%
Date:: [[2023-09-30]]
Course:: [[Investigación Operativa]]
Source:: [[U2 - IO]]
%%



## Definición de Grafo
- Colección de vértices (nodos) y aristas (conexiones) entre estos vértices![[Pasted image 20230930192528.png | center | 300]]
	- Nodos o vértices -> Los elementos individuales de un grafo
	- Aristas -> Las conexiones entre vértices
- Grado de un nodo
	- Cantidad de aristas conectadas a ese nodo.
- En [[Investigación Operativa]] nos permite modelar y resolver problemas que involucran redes, rutas y relaciones

## Representación de Grafos en [[MILP]]
- $x_{ij}=1$ si la arista entre $i$ y $j$ está presente, y $x_{ij}=0$ en caso contrario.
- Función objetivo $$\min{\sum_{i,j}}x_{ij}d_{ij}$$ donde $d_{ij}$ es la distancia entre $i$ y $j$.

## Problema del Camino Mínimo
El Problema del Camino Mínimo busca determinar la trayectoria óptima entre un nodo inicial y uno final dentro de una red. Esta red está compuesta por aristas que tienen asignados ciertos valores, como costo, distancia o tiempo, que sirven para cuantificar la 'calidad' de cada ruta posible.

 Ejemplo
 - Necesito ir a la universidad pasando por una librería y un cafetería. El siguiente grafo representa las distancias y las rutas que puedo tomar. Cuál es el camino que minimiza las distancias?
![[Pasted image 20230930193417.png | center | 300]]

- Variables de decisión
	- $x_{ij}=1$ si se toma el camio entre $i$ y $j$ está presente, y $x_{ij}=0$ en caso contrario.
- Función objetivo ![[Pasted image 20230930193524.png]]
- Restricciones ![[Pasted image 20230930193556.png]]



![[Problema del Viajero]]
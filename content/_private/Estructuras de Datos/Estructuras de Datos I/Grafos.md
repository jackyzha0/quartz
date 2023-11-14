# Grafos

- Course:: [[Estructuras de Datos I]]
- Source:: [[Grafos y Árboles]]

-   Qué es un grafo? ↓
    
    -   Un grafo G, consiste de dos conjuntos V y E. V es un conjunto finito no vacío de vértices. E es un conjunto de pares de vértices, estos pares se denominan arcos.
    -   V(G) y E(G) representarán los conjuntos de los vértices y arcos del grafo G. También escribiremos G = (V,E) para representar un grafo.
-   Qué es un **grafo no dirigido**? ↓
    -   En un grafo no dirigido el par de vértices que representa algún arco, no está orientado (o dirigido). Luego, los pares (v1, v2) y (v2, v1) representan el mismo arco.
-   Qué es un **grafo dirigido**?↓ ↓
    -   En un grafo dirigido cada arco se representa por un par direccionado , tal que v1 es el origen y v2 el destino del arco. Luego <v1,v2> y <v2,v1> representan dos arcos diferentes.
-   Qué es un **miltigrafo**?↓ ↓
    -   Un multigrafo es un grafo que posee más de una ocurrencia en un arco. Por ejemplo:
-   Cuándo decimos que dos vértices son adayacentes? ↓
    -   Si existe el arco <v1,v2> entonces decimos que los vértices v1 y v2 son adyacentes
-   Qué es un **subgrafo**?
-   Qué es el largo de un camino? ↓
    -   **Sean x, y " V, se dice que hay un camino en G de ** x ** a ** y ** si existe una sucesión finita no vacía de aristas {x,v1}, {v1,v2},..., {vn,y}. En este caso** **x e y se llaman los extremos del camino**
    -   El largo de un camino es el número de arcos en él.
    -   Un camino simple es un camino en el cual todos los vértices, excepto el primero y el último son distintos.
-   Qué es un ciclo?↓ ↓
    -   Un ciclo es un camino simple en el cual el primero y el último vértice es el mismo
-   Qué es el **grado o valencia** de un vértice?↓ ↓
    
    -   GRADO POSITIVO DE UN VÉRTICE : g + (v):es la cantidad de aristas que inciden positivamente en v.(flechas que llegan)
    -   GRADO NEGATIVO DE UN VÉRTICE :g - (v) es la cantidad de aristas que inciden negativamente en v ( flechas que salen).
-   Cálculo del máximo numero de arcos en un grafo no dirigido↓ ↓
    -   $$\max \text{Arcos} = \dfrac{n(n-1)}{2}$$
-   Cálculo del minimo número de arcos en un grafo dirigido↓ ↓
    -   $$\max \text{Arcos} = n(n-1)$$
-   Qué es una **matriz de adyacencia**?↓ ↓
    -   La matríz de adyacencia es un arreglo 2-dimensional de n x n, llamado A, con la propiedad que hace A[i,j] = 1 si y solo si el arco (vi, vj) ( < vi, vj > para un grafo dirigido) pertenece a E(G). A[i, j] = 0 si no existe tal arco en G.
    
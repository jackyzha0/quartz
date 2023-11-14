# Problema del Viajero

%%
Date:: [[2023-09-16]]
Course:: [[Investigación Operativa]]
Source:: [[U2 - IO]]
%%

## Problema del viajero

Se busca minimizar las distancias. El viajero debe salir de un origen, pasar por todos los nodos solo una vez y volver a su origen. Tiene aplicaciones en logística, la industria automotriz, para medidas de seguridad, entre otros usos.
Las variables de decisión son las aristas del grafo.
$$ x_{ij} $$
donde x es 1 si hago el viaje de i a j y 0 en caso contrario
la función objetivo será

$$ \sum_{i,j}x_{ij}\cdot d_{ij} $$
donde d es la distancia entre cada lugar
las restricciones son que solo se puede llegar a un lugar una sola vez:

$$ \sum_{i}x_{ij}=1\space\space\forall j\neq i $$
y solo se puede salir de un lugar una sola vez
$$ \sum_{j}x_{ji}=1\space\space\forall i\neq i $$
Para eliminar el problema de *subtours* se resuelve creando variables de decisión adicionales
$$ u_{j} $$
que valdrá un numero entero correspondiente al orden de lugares a los que llego, es decir, el primer destino j al que llegue tendrá la variable
$$ u_{j}= 1 $$
Se arma la restricción
$$ u_{i}-u{j}+n\cdot x_{ij}\leq n-1 $$
donde n es la cantidad de nodos o destinos.
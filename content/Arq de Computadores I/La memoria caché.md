# La memoria caché

%%
Date:: [[2023-05-22]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Memorias]]
%%

## Funcionamiento de la memoria caché
- El objetivo es lograr que la velocidad de la memoria sea lo más rápida posible, consiguiendo al mismo tiempo un tamaño grande al precio de memorias semiconductoras menos costosas.
- Hay una memoria principal relativamente grande y más lenta, junto con la caché que es más pequeña y precisa.
	- ![[Pasted image 20230522181527.png | center | 350]]
	- La caché contiene una copia de partes de la memoria principal.
	- Cuando el procesador quiere leer algo de memoria principal, se lee si está de la caché. Si es así, la entrega, si no, un bloque de memoria principal se transfiere a la caché y después la palabra se la entrega al procesador
	- ![[Pasted image 20230522181539.png]]
- La memoria principal consta de hasta $2^n$ palabras direccionables, con $n$ bits cada ua
	- Se divide en una cantidad de bloques de longitud fija ($K$ palabras)
	- Es decir $M=2^n/K$ bloques
- La caché consta de $C$ líneas.
	- Cada línea contiene $K$ palabras
	- El número de líneas es considerablemente menor al número de bloques $C << M$

## Lectura de la memoria caché
- El procesador genera la dirección (RA) de una palabra a leer
	- Si está en caché se la entrega
	- Si no, se carga el bloque que la contiene en la caché, y se la lleva al procesador.
![[Pasted image 20230522182445.png | center | 500]]



## Organización típica de la caché
- La caché conecta con el procesador mediante líneas de datos, de control y de direcciones
- Las líneas de datos y de direcciones se conectan también con buffers de datos y de direcciones con un bus del sistema, a través del cual se accede a la memoria principal.
	- El buffer lo que hace es amortiguar los cambios de velocidades entre la caché y la memoria principal.
![[Pasted image 20230522184010.png | center | 400]]


## Elementos de diseño de una memoria caché
Criterios básicos de diseño para clasificar y diferencias entre arquitecturas de caché.
- **Tamaño de caché**
	- Directamente relacionada al tamaño de la memoria principal ($C << M$).
	- Nos interesa que sea lo suficientemente pequeño como para que el costa total medio or bis se aproxime al de la memoria principal sola, y que sea los suficientemente grande para para que el tiempo de acceso medio total sea próximo al de la caché sola.
	- También está limitado por las superficies disponibles de chip y de tarjeta.
- **Función de correspondencia**
	- Algoritmo que hace corresponder los bloques de memoria principal a líneas de caché.
		- Determina que bloque de memoria principal ocupa actualmente una línea de caché.
	- Tipos de correspondencia
		- *Directa*
			- Hacer corresponder cada bloque de memoria principal a solo una línea posible de caché.
			- Defino un intervalo fijo de líneas de memoria principal, y las asigno a una línea específica de memoria de caché.
			- Tengo etiquetados los bloques de memoria a una sola línea.
			- Problema: En un software, haré mucha recurrencia sobre una sola línea de caché, y las otras se quedarán sin ser utilizadas. Se produce un alto tráfico, con una tasa de aciertos (cantidad de veces que recurre a memoria, y la necesita) muy baja.
			- Ventaja: Circuitería más sencilla
		- *Asociativa*
			- Lo opuesto a la Directa. Supera la desventaja e la asociativa, permitiendo que cada bloque de memoria principal pueda cargarse en cualquier línea de la caché.
			- Produce una tasa de acierto mayor.
			- Problema: La circuitería es mucho más costosa, y que también genera un retardo, por lo que tiene que corroborar que no esté cargado.
		- *Asociativa por conjuntos*
			- Combinación entre la directa y la asociativa. Trato de suplir las dos falencias (circuitería más sencilla, pero con alta tasa de acierto)
			- Divido los bloques de memoria en conjuntos, que podrán ser ingresados en cualquier línea de caché.
- **Algoritmos de sustitución**
	- Una vez que se ha llenado la caché, para introducir un nuevo bloque debe sustituirse uno de los bloques existentes.
		- En la correspondencia directa, solo hay una posible línea para cada bloque particular y no hay elección posible
		- Para los métodos asociativos, se proponen los siguientes algoritmos
			- Utilizado menos recientemente (LRU)
			- First in first out (FIFO)
			- Utilizado menos frecuentemente (LFU)
			- Aleatorio
				- No se basa en el grado de utilización
				- Se escoge una línea al azar
- **Política de escritura**
	- Cuando se reemplaza un bloque de la caché se pueden dar dos casos
		1. Si no debía ser modificado, puede sobrescribirse con el nuevo bloque.
		2. Si se ha realizado al menos una operación de escritura, entonces la memoria principal debe actualizarse.
			- Problema: Muchos dispositivos tienen acceso a la memoria principal, por lo que las modificaciones en la caché pueden quedar invalidadas por otras operaciones
			- Soluciones
				- Escritura inmediata: Todas las operaciones de escritura se hacen tanto en caché como en memoria principal.
				- Postescritura: La actualización se hace solo en la caché. Cuando el bloque es sustituido, es postescrito en memoria principal
- **Tamaño de línea
	- Cuando se recupera y ubica un en caché un bloque de datos, se recuperan también algunas palabras adyacentes.
		- Es probable que los datos en la vecindad de una palabra referenciada sean referenciados en un futuro próximo.
	- Bloques más grandes reducen el número de bloques que caben en la caché: dado que cada bloque captado se escribe sobre contenidos de la caché, un número reducido de bloques da lugar a que se sobrescriban datos poco después de haber sido captados.
	- A medida que un bloque se hace más grande, cada palabra adicional está más lejos de la requerida, y por tanto es más probable que sea necesaria a corto plazo.
- **Número de cachés**
	- Recientemente se ha convertido en una norma el uso de múltiples cachés.
		- **Uno o dos niveles**
			- caché *on-chip*
				- La caché se encuentra en el mismo chip del procesador.
				- Reduce la actividad del bus externo del procesador, y por lo tanto, los tiempos de ejecución. Se elimina el acceso al bus
			- caché *off-chip*
				- Es externa al procesador
			- Los dispositivos actuales poseen ambas, y esta estructura se denomina caché de dos niveles, siendo la interna el nivel L1 y la externa el nivel L2.
		- **Unificada o partida**
			- Actualmente se ha normalizado separar la caché en dos: una dedicada a instrucciones, y otra a datos.
			- Cachés unificadas
				- Tiene una tasa de aciertos mayor que una partida, ya que nivela la carga entre captación de instrucciones y de datos.
				- Solo se necesita diseñar e implentar una caché
			- Separadas
				- Se encuentran en dispositivos que enfatizan la ejecución en paralelo de instrucciones y la precptación de futuras instrucciones previstas
				- Elimina la competición por la caché entre el procesador de instrucciones y la unidad de ejecución.





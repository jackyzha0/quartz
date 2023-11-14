- Date:: [[2023-03-16]]
- Course:: [[Informática Teórica]]
- Instructor:: [[Belén Aramayo]]
- Source:: [[]]

#main_page


## Informática
- El objeto de estudio de la carrera es la **información!** Es el componente de valor de la carrera.
- Def de informática: Conjunto de conocimientos científicos y de técnicas que hacen posible el tratamiento automático de la información por medio de coputadoras.
	- Tratamiento automático de la información.
	- Combina muchas disciplinas (electrónica, matemática, lógica, etc.)

1. Punto de partida: *Realidad*
2. Interpretación mediante lenguajes, palabras.
3. Representación en entidades, objetos, atributos, datos, etc.
4. Procesamiento con reglas y operaciones (paradigmas)
5. Resultado: *Información*


### Dato $\neq$ Información
- Dato: representación simbólica aislada o característica de una identidad
- Información: Conjunto de datos procesados, clasificados y presentados de manera adecuada para la toma de decisiones


## Informática Teórica

> [!quote] Definición: Informática teórica.
> Ciencia multidisciplinar con fundamentos en matemática, teoría de máquinas, linguística, etc. apoyada en la observación de fenómenos que componen la realidad.

- Jerarquía de Chomsky
	- Lenguajes formales (gramática formal) $\neq$ Lenguajes naturales (gramática ambigua)
	- Gramática formal $G=(V_n; V_t; P; S)$
		- V_n: vocabulario de símbolos no terminales
		- V_t vocabulario de símbolos terminales
		- P producciones
		- S símbolo o variable inicial

- Aplicaciones de la materia
	- Teoría de compiladores
	- Teoría de autómatas
	- Lenguajes de programación
	- Inteligencia Artificial


## Autómata
Definición formal: Es una máquina matemática $M$ del tipo $( K, \Sigma, \delta, s ,F )$, donde:
- $K$ es un conjunto de indicadores (símbolos) de estados
- $\Sigma$ es el alfabeto de entrada
- $s\in K$ es el estado inicial
- $F\subseteq K$ es el conjunto de estados finales
- $\delta:K\times\Sigma\rightarrow K$ es la función de transición, que a partir de un estado y un símbolo del alfabeto obtiene un nuevo estado.

## Autómatas finitos
- Las máquinas de estados más sencillas
- Modelado gráfico de una máquina abstracta que permite representar una serie de acciones o eventos y de estados
- Modela sistemas discretos de la realidad. 
- Características
	- Tienen forma de grafo dirigido
	- Los nodos son estados, que se unen mediante flechas (transiciones)
	- Solo existe un solo estado inicial, uno o más estados finales.

## Máquina de Turing


## Métodos de especificación y validación del lenguaje
Para reconocer palabras válidas de un lenguaje
- Diagramas sintáticos
- Gramáticas
- Diferentes tipos de máquinas de estados

## Máquinas de estados
- Modelado gráfico de una situación de la vida real, en el que se representan una sucesión de estados y un conjunto de ventos o estímulos aplicados a esos estados.
- Clasificación
	- Reconocedoras: Detectan patrones sin proveer salida alguna. Aseguran la validez del patrón.
	- Traductoras: Recibe una sentencia de entrada y genera una cadena de salida.


>[!info] Summary
> - Informática teórica trata del uso de máquinas y sistemas autómatas para el manejo automático de la información (info + mática)
> - Para comunicarnos en el proceso de automatización, utilizamos lenguajes. Estos se encuentran en distintos niveles en función de sus restricciones.





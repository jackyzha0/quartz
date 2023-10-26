# Modelización

%%
Date:: [[2023-05-23]]
Course:: [[Teoría de Sistemas y Modelos]]
Source:: [[Modelado Y Simulación]]
%%

- La modelización es una técnica, no una metodología.
	- Me va permitir construir modelos y representaciones de una realidad compleja, que luego me va a permitir sacar conclusiones
	- De por sí no me sirve para nada. Lo complementa la simulación.


>[!important] Modelización
>Construcción de modelos del sistema en estudio con el fin de obtener conclusiones aplicables al sistema real.

- Una vez construido el modelo, el proceso de ensayar en él una alternativa se llama simular.
- Uno de los objetivos de la simulación es realizar ensayos de cambios en el sistema probándolos en el modelo, con el fin de elegir la mejor alternativa, y así enfrentar mejor a una realidad que varía día a día.

- En un número reducido de variables, puedo utilizar modelos analógicos (compararlos con algún modelo ya existente en la realidad). 
	- Creo un modelo por analogía con otro.

## Etapas del estudio de los sistemas complejos
<mark style="background: #FFF3A3A6;">El análisis de sistemas, la modelización y la simulación constituyen las tres etapas
fundamentales del estudio del comportamiento dinámico de los sistemas complejos</mark>
- El **análisis** de sistemas
	- Definir limites e identificar los elementos importantes para el modelo y las interacciones.
	- Determinar enlaces que integran en un todo organizado.
	- Clasificar y jerarquizar los elementos y enlaces.
	- Se considera por separado cada bucle y se evalúa su influencia en el comportamiento de los diferentes subconjuntos del sistema. 
- La **modelización**
	- Consiste en construir un modelo a partir de los datos del análisis de sistemas.
	- Se establece un esquema completo de las relaciones causales entre los elementos de los diferentes subsistemas.
	- Se expresa en un lenguaje apropiado de programación las ecuaciones descriptivas de las interacciones y enlaces entre los diferentes elementos del sistema.
- La **simulación**
	- El comportamiento temporal de un sistema complejo. En lugar de modificar una variable a la vez, emplea una computadora para hacer variar simultáneamente grupos de variables, que es lo que acontece en la realidad.
	- Puede utilizares un simulador, que es un modelo físico interactivo, dando en tiempo real una respuesta a las distintas decisiones y acciones del usuario.

# Noción de Modelo
- Averiguar que pasaría en el sistema si acontecieran determinadas hipótesis.
	- Para ello se construyen **modelos**, que son una simplificación de la realidad.
	- No puedo simular si no tengo un modelo!!
	- El modelo debe tener correspondencia con la realidad.  
- Surgen de un análisis de todas las variables intervinientes en el sistema y de las relaciones que existen entre ellas.
- En el modelo se estudian los hechos salientes del sistema o proyecto. Se hace una <mark style="background: #FFF3A3A6;">abstracción de la realidad</mark>, representándose el sistema/proyecto, en un modelo.
- El modelo debe tener en cuenta todos los detalles que interesan en el estudio para que realmente represente el sistema real.

>[!important] Modelo
>Un modelo es una descripción de algún sistema real que intenta predecir que ocurrirá si se llevan a cabo determinadas acciones. Por lo general todos los modelos utilizables simplifican y aún idealizan la realidad.


## Fases del desarrollo de un modelo
- Conceptualización o modelo narrativo
	- Análisis del sistema real: partes relevantes y procesos claves.
- Formalización o modelo esquemático
	- Definición de las variables de estado, selección, exclusión de partes y relaciones, escalas temporal y espacial.
- Implementación o modelo informático
	- Se traduce a código el modelo esquemático: implica la solución a problemas de programación.
- Verificación funcional
	- Se realiza el análisis de estabilidad , sensibilidad e incertidumbre.
		- Estabilidad: Genera resultados razonables
		- Sensibilidad: Ver variación de los resultados ante cambios en las variables dentro del rango de variación natural
		- Incertidumbre: analizar los resultados ante cambios en los parámetros
- Validación
	- Comprobación del modelo con datos independientes.
	- Ya no interviene nuestro equipo de trabajo. Ahora los terceros comienzan a utilizar el modelo. Para beta-testers

La calidad de un producto final depende de la calidad de todos los procesos intervinientes. La calidad final es igual a la del peor proceso que tengamos.

___
## Flashcards
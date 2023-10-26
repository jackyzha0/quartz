# Dinámica de Sistemas

%%
Date:: [[2023-06-01]]
Course:: [[Teoría de Sistemas y Modelos]]
Source:: [[]]
#main_page 
%%

- Combina el aspecto estructural y funcional. La dinámica de sistemas estudia esto mediante la representación con modelos
- Surgen con la teoría de los servomecanismos
	- Es el estudio del concepto de retroalimentación 
		- A partir de los resultados puedo tomar decisiones que luego puedo incorporar a un mecanismo operacional.
	- El estudio de los comportamientos dinámicos de los sistemas

## La Dinámica de Sistemas
- Es el estudio de cómo la estructura de re-alimentación de un sistema produce su comportamiento dinámico
- Es una técnica que permite describir de forma particular, los flujos que surgen en el interior del sistema en estudio para producir sus cambios a través del tiempo, y cómo se interrelacionan estos flujos entre sí en un modelo unitario.
- Íntimamente ligada con 
	- Teoría General de Sistemas
	- Teoría de la Automática
	- Cibernética


## Cómo se realiza la dinámica de sistemas
1. Se observan los modos de comportamiento del sistema real para identificar los elementos fundamentales.
2. Se buscan las estructuras de re-alimentación que puedan producir el comportamiento observado.
3. Se construye el modelo matemático de comportamiento del sistema en forma idónea para ser tratado por una computadora.
4. El modelo se emplea para simular, como un laboratorio, el comportamiento dinámico implícito en la estructura identificada
5. Se modifica la estructura hasta que sus componentes y el comportamiento resultante coincidan con el comportamiento observado en el sistema real
6. Se modifican las decisiones que pueden ser introducidas en el modelo de simulación hasta encontrar decisiones aceptables y utilizables que den lugar a un comportamiento real mejorado


## Sistema Dinámico
Un modelo constituye una representación abstracta de un cierto aspecto de la realidad y tiene una estructura que está formada por los elementos que caracterizan el aspecto modelado de la realidad, y por las relaciones entre éstos elementos. Un modelo es representado por un "sistema" que, como es sabido, no es sino un conjunto de partes entre las que se producen interacciones, y cuyo comportamiento persigue, normalmente, un determinado objetivo. Si se consideran como elementos constitutivos de un modelo las evoluciones en el tiempo de las magnitudes que lo constituyen, entonces se emplea para su representación lo que se denomina "Sistema Dinámico".

![[Pasted image 20230601210648.png]]
- las interacciones que están dentro de nuestro sistema son relaciones que me llevan a formar bucles de retroalimentación (son como circuitos cerrados)
	- Cadenas cerradas de causalidad.
- Las variables endógenas y exógenas son las variables que yo voy a representar en mi modelo.
- Utiliza tanto el enfoque de sistemas y el método analítico ![[Pasted image 20230601211858.png]]
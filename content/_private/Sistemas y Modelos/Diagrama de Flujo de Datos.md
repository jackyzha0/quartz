# Diagrama de Flujo de Datos (DFD)

%%
Date:: [[2023-05-04]]
Course:: [[Teoría de Sistemas y Modelos]]
Source:: [[Modelado Y Simulación]]
%%

- NO ES LO MISMO QUE UN DIAGRAMA DE FLUJO (en programación)

## Qué es el diagrama de Flujos de Datos (DFD)?
- Es una técnica de modelización, que nos muestra un sistema como una red de procesos conectados entre ellos por flujos y almacenamientos de datos.
	- Es un diagrama de funciones, de procesos, de trabajos
- Proporciona un <mark style="background: #FFF3A3A6;">punto de vista funcional</mark> de un sistema. Los procesos que realizan cada una de sus partes.
	- Desde un punto de vista global, pero concentrándome en las funcionalidades del sistema.
	- Nos muestra el sistema como un red de procesos interconectados entre sí, por flujos y almacenamientos de datos.
- En los lazos de comunicación de dicho sistema, existen datos.
- Maneja básicamente 4 símbolos
- Es un tipo de diagrama asincrónico. No tiene un inicio y fin. Lo puedo leer desde cualquier sitio.

## Condiciones del DFD
- Debo etiquetar
	- Verbo + Sustantivo
	- Además, se le puede agregar un ID
- Los procesadores deben tener al menos una entrada y al menos una salida.
	- Los depósitos de información también deben ser consistentes. 
- En los <mark style="background: #FFF3A3A6;">flujos van solamente datos, nada más!</mark>
- El terminador externo es una excepción, que puede "no tener si o si e/s"

## Reglas sobre los terminadores
Existen tres cosas importantes que debemos recordar acerca de los terminadores:  
- Son externos al sistema que se está modelando; los flujos que conectan los terminadores a diversos procesos (o almacenes) en el sistema representan la interfaz entre él y el mundo externo.
- El analista de sistemas no puede modificar los contenidos, la organización ni los procedimientos internos asociados a un agente externo o la manera en que trabaja el mismo. El terminador con lo que representa está fuera del dominio del sistema en estudio. 
- Las relaciones existentes entre los terminadores no se muestran en el modelo DFD. Si existen relaciones entre los terminadores y si es esencial para el analista modelarlos para poder documentar los requerimientos del sistema, entonces, por definición, los terminadores son en realidad parte del sistema y debieran modelarse como procesos.

## Reglas para la construcción de DFD
1. Elegir los nombres representativos para los elementos del diagrama.
	- Para los procesos 
		- Función + Verbo.
		- Verbo significativo.
		- Evitar palabras de uso exclusivo por parte del usuario.
		- Evitar terminología informática.
2. Numerar los procesos para identificarlos de forma rápida y unívoca. Los números no indican secuencia (no es un algoritmo!).
3. Evitar DFD excesivamente complejos y recargados. Hay que modelar de forma precisa las funciones que deben llevar a cabo un sistema y las interacciones entre ella
4. Consolidar flujos para ganar en legibilidad.
5. Redibujar el DFD tantas veces como sea necesario
6. Asegurarse que el DFD es consistente. 
	- Evite sumideros infinitos, procesos que tienen entradas pero no salidas.
	- Evite procesos que tienen salidas sin tener entradas. Situaciones normalmente incorrecta.
	- Cuidado con flujos y procesos no etiquetados.
	- Tener cuidado con los almacenes "solo lectura" o "solo escritura" ya que todo almacenamiento debe tener un flujo entrante y uno saliente.
	- Las entidades externas no pueden acceder directamente a ningún almacenamiento
	- Un almacén de datos no puede comunicarse directamente con otro almacén de datos.



## Símbolos del DFD

![[Pasted image 20230516192112.png]]
![[Pasted image 20230516192129.png]]


## Posibles Situaciones
  
  ![[Pasted image 20230516192202.png]]
  ![[Pasted image 20230516192217.png]]



## Niveles en los diagramas

- Diagrama de nivel 0 o de contexto
	- Todo el sistema en forma de síntesis en una burbuja. Y las entidades externas con las que interactúa.
- Diagrama de nivel 1
	- Descompondría ese macro proceso, que representa a todo el sistema, en las actividades principales que lo componen, así como los almacenamientos generales que existan. A continuación se construye una jerarquía de diagramas, en donde cada nivel inferiores una expansión de un proceso del nivel superior.
	- Sucesivamente, voy a ir desmenuzando las burbujas en sus funciones constituyentes.




___
## Flashcards
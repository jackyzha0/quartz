
%%
Date:: [[2023-06-02]]
Course:: [[Teoría de sistemas y modelos]]
Source:: [[Modelado Y Simulación]]
%%

# Diagramas de Forrester

- Asocia al diagrama de causalidad (o influencias) una estructura funcional, clasificando las distintas variables que conforman el diagrama causal de acuerdo a la función  que desempeñan con el fin de generar el comportamiento dinámico del sistema.
- Tipos de variables
	- **Variables primitivas**
		- Indican el estado de una cosa en un momento determinado.
		- Existen por sí mismas, son instantáneas.
		- El material que fluye por el sistema es siempre una variable primitiva.
		- No pueden recibir información. Reciben material
			- Si pueden brindar información
	- **Variables derivativas**
		- Muestran las variaciones producidas con el correr del tiempo
		- Se derivan de las primitivas. Indican cambios. Indican como esa variable primitiva ha llegado a tener el valor que tiene
		- No son instantánea.

### Técnica "detente planeta"
- Nos permite distinguir una variable primitiva de una variable derivativa.
- Consiste en suponer que el tiempo se detiene.
	- Las que siguen existiendo son las primitivas, las que dejan de existir son derivativas.
- Cuando se detiene el dinamismo del sistema hay variables que inmediatamente toman el valor de cero, mientras que otras mantienen su valor.

# Elementos del diagrama de Forrester (no va al examen)

![[Pasted image 20230602120503.png | center | 400]]

- **Fuente o Sumidero**
	- Emite o recibe el material que fluye por el sistema
- **Canal de material**
	- Canal de transmisión del material que circula por el sistema
- **Canal de información**
	- Canal de transmisión de cierta información, que no es necesario que se conserve
- **Nivel**
	- Representa una acumulación de material (lo recibe o envía a través de canales)
	- Pueden brindar información, pero no pueden recibirla
	- Son magnitudes que acumulan los resultados de acciones tomadas en el pasado.
	- Son siempre <mark style="background: #FFF3A3A6;">variables primitivas</mark>
	- Siempre debe entrar por lo menos una flecha de material, y tiene que salir siempre por lo menos una de material.
- **Flujo**
	- Controla el flujo de material desde la fuente a un nivel, desde un nivel a otro, o desde un nivel al sumidero.
	- No contiene material, solo controlan la circulación
	- Son las <mark style="background: #FFF3A3A6;">variables derivativas</mark>
- **Variable auxiliar**
	- Una cantidad de cierto significado físico en el mundo real y con un tiempo de respuesta instantáneo.
	- Reciben y brindan información. No pueden recibir ni brindar material.
- **Constante**
	- Elemento del modelo que no cambia de valor.
- **Nivel de demora**
	- Elemento que simula demoras o retrasos en la transmisión de información o de material.
- **Variable exógena**
	- Variable cuya evolución es independiente de las del resto del sistema.
	- Representa una acción del medio sobre el sistema y sólo puede brindar información.
	- Está fuera del dominio de mi sistema.
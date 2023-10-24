# Familia de computadores

- Date:: [[2023-03-31]]
- Course:: [[Arquitectura de Computadores I]]
- Source:: [[Organización y estructura de computadores]]

#arqcompu/computadores 

## Familia de computadores (p 34)
En qué consiste el concepto de familia de computadores?
?
- El concepto de familia de computadores proviene de la realidad que el cliente posee necesidades modestas y un presupuesto limitado, y si necesitaba aumentar alguna prestación del equipo debía cambiar todo.
- Poder generar una familia compatible que a futuro no cambiara la estructura completamente, a fin de reutilizar.

Qué características tienen las familias de computadores?
?
- Las características de una 
	- **Conjunto de instrucciones similar o idénticos**
		- En muchos casos se encuentran exactamente el mismo conjunto de instrucciones máquina en todos los miembros de la familia.
			- Un programa que se ejecuta en una máquina, se puede ejecutar en otra.
	- **Sistemas operativos similares o idénticos**
		- El mismo sistema operativo básico está disponible para todos los miembros de la familia. En algunos casos, se añaden características complementarias a los miembros más altos.
	- **Velocidad creciente**
		- La velocidad de ejecución de las instrucciones se incrementa conforma se sube desde los miembros más bajos a los más altos de la familia.
	- **Número creciente de puerto E/S**
		- Conforme se va desde lo más bajo o lo más alto de la familia.
	- **Tamaño de memoria creciente**
		- Conforme se va desde lo más bajo o lo más alto de la familia.
	- **Coste creciente**
		- Conforme se va desde lo más bajo o lo más alto de la familia.


## Velocidad del microprocesador (p 41)
Qué técnicas existen en los microprocesadores para aprovechar y reducir el tiempo ocioso?
?
Técnicas incorporadas a los procesadores hoy en día:
- *Predicción de ramificación*
	- En su tiempo ocioso el procesador se anticipa al software y predice que ramas o grupos de instrucciones se van a procesar después con mayor probabilidad.
		- Si el procesador acierta, puede precaptar las instrucciones correctas y almacenarlas para mantener al procesador ocupado.
- *Análisis de flujo de datos*
	- El procesador analiza que instrucciones dependen de otras instrucciones, o datos, para crear una organización optimizada de instrucciones.
		- Las instrucciones se planifican para ser ejecutadas cuando estén listas.
- *Ejecución especulativa*
	- Utilizando la predicción de ramificación y el análisis de flujo de datos, algunos procesadores ejecutan especulativamente instrucciones antes que aparezcan en la ejecución del programa.


## Equilibrio de prestaciones
En qué consiste el problema del equilibrio de las prestaciones
- Mientras que la velocidad del procesador ha crecido, otros componentes comerciales no lo han hecho tan rápido.
- Hace falta prestar más atención al equilibrio de las prestaciones
	- Ajustar la organización y la arquitectura para compensar desigualdades.
- Donde más se nota es en la comunicación entre el procesador y la memoria principal.
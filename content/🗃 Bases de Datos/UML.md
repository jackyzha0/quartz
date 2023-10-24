# UML (Unified Model Languaje)

%%
Date:: [[2023-04-21]]
Course:: [[Bases de Datos]]
Source:: [[Modelado Orientado a Objetos]]
%%


## Qué es el UML?
- Es un lenguaje estándar para representar proyectos de software. El **UML** es utilizado para visualizar, especificar, construir y documentar.
- Es un lenguaje expresivo, no dificil de entender y fácil de implementar.
https://www.lucidchart.com/pages/es/que-es-el-lenguaje-unificado-de-modelado-uml

## Diagrama de Clases
- <mark style="background: #FFF3A3A6;">Asociación Simple</mark>
	- Es una relación estructural que especifica que dos clases interconectadas (es una flecha)
	- Le falta semántica. Se le agrega elementos que potencian la semántica. 
		- Se le agregan flechas, o descripciones sobre la línea para explicar la relación.![[Pasted image 20230421180411.png]]
	- La asociación es una flecha vacía (solo palito)
	- La herencia, es una flecha llena
- <mark style="background: #FFF3A3A6;">Agregación</mark>
	- Ejemplo: "Una clase está compuesta por dos clases"
	- Puede ser composición 
		- **Débil**: Si no existe esa alguna de las clases, sigue existiendo la cuenta agregada
		- **Fuerte(o composición)**: Necesita de las cuentas que la componen para la existencia.
- <mark style="background: #FFF3A3A6;">Herencia</mark>
	- las subclases heredan algo de otra clase superior
- <mark style="background: #FFF3A3A6;">Dependencia o de uso</mark>
	- Una clase que usa algo de otra clase. 
	- Se grafica con una flecha punteada.
	- Solo lee algo de otra clase.


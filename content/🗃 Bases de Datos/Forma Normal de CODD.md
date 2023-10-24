# Forma Normal de CODD

- Date:: [[2023-03-17]] : 18:23
- Course:: [[Bases de Datos]]
- Source: [[Nociones básicas de Bases de Datos Relacionales]]

#main_page 
#basesdatos/normalizacion

[[ejercicio_formas_normales.excalidraw]]

## Forma normal para el diseño de bases de datos
- Es una forma vieja que ya no se utiliza, pero nos servirá para comenzar a aprender.
- Se aplican a documentos 
 
Cuáles son las reglas que debemos cumplir para las formas normales de CODD?
?
## Reglas que debemos cumplir [[Drawing Forma Normal de CODD.excalidraw]]
- <mark style="background: #BBFABBA6;">No están permitidos los grupos repetitivos. (1FN)</mark>
	- Aquel que contiene multiples apariciones de algunos atributos.
	- Lo primero que hacemos es una lista de todos los atributos que posee un documento (importante: cómo los nombro? Deben ser entendibles)
	- Con una llave, le pondré un R a los campos repetitivos.
		![[Pasted image 20230317185328.png]]
	- Es conveniente eliminar todos los campos que son calculados.
- <mark style="background: #BBFABBA6;">No debe existir atributos dependientes funcionalmente (2FN) </mark>
	- No debe existir atributos dependientes funcionalmente (semánticamente) de un subconjunto de atributos que componen el identificador de la entidad.
	- Cuando tengo una clave compuesta, y un atributo ya explica parte de la clave
	- Solo aplica si la clave es compuesta
		![[Pasted image 20230317194204.png]]
- <mark style="background: #BBFABBA6;">No deben existir dependencias transitivas (3FN)</mark>
	- ![[Pasted image 20230317194229.png]]
	- Un atributo depende de otro, el cual a la vez depende de la clave primaria.



>[!info] Summary
> - La forma normal está basada en 3 reglas
> 	- La primera indica que aquellos campos repetitivos deberán ser extraidos.
> 	- La segunda indica que si hay una descripción de la clave primaria compuesta, debemos extraerla
> 	- La tercera indica que si hay dependencias entre atributos, debemos "desglosarlo" 
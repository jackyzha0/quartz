# Tipos de memoria ROM

%%
Date:: [[2023-05-05]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Memorias]]
%%


%%Características de las memorias PROM
- Se graban generalmente por pulsos eléctricos (se quema o no el transistor, conceptualmente)
- Son memorias baratas por valor por bit. Ya que se escriben una sola vez (en función de los pedidos de los fabricantes).%%


## Tipos de memorias ROM
Las memorias ROM pueden ser de los siguientes tipos:
- *ROM*
	- Son memorias de solo-lectura (*Read Only Memory*) 
	- Contienen un patrón permanente de datos que no puede alterarse.
	- Es una memoria no-volátil (no requiere de alimentación para mantener los valores de los bits)
	- Aunque es posible leer una ROM, no es posible escribir nuevos datos en ella.
- *PROM*
	- Son memorias ROM programables.
	- Se graban generalmente por pulsos eléctricos (se quema o no el transistor, conceptualmente)
	- Puedo convertir un 1 en 0, pero no un 0 en 1.
- EPROM 
	- Memoria de solo-lectura programable y borrable ópticamente.
	- Se lee y escribe eléctricamente como la PROM, pero todas las celdas de almacenamiento deben primero borrarse a la vez, mediante la exposición del chip encapsulado a radiación ultravioleta
- EEPROM
	- Memoria de solo-lectura programable y borrable eléctricamente
	- Se puede escribir en cualquier momento sin borrar su contenido anterior, solo se actualiza el byte o bytes direccionados.
	- Puedo actualizar una celda de memoria, sin modificar el resto de la matriz.


# Sistemas de Memoria

%%
Date:: [[2023-06-14]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Memorias]]
%%

## Características de los sistemas de memoria
- **Ubicación**
	- Si la memoria es externa o interna al computador.
		- Procesador (banco de registros)
		- Interna (Principal).
		- Externa (Secundaria).
- **Capacidad**
	- Tamaño de la palabras.
		- Normalmente para memorias internas, y se expresa en términos de bytes.
	- Número de palabras.
- **Unidad de transferencia**
	- Para memorias internas, la unidad de transferencia es igual al número de líneas de entrada/salida de datos del módulo de memoria.
	- *Palabra*
		- Es la unidad natural de organización de la memoria. Suele coincidir con el número de bits utilizados para representar números con la longitud de instrucciones.
		- Cuando hablamos de caché o registros.
	- *Unidades direccionables*
		- En algunos sistemas es la palabra.
		- Muchos sistemas permiten direccionar a nivel de bytes. La relación entre la longitud A de una dirección y el número N de unidades direccionables es $2^A=N$.
		- Cuando hablamos de capacidades de memoria mucho más grandes.
	- *Unidad de transferencia*
		- Para la memoria principal es el número de bits que se leen o escriben a la vez.
		- Para la memoria externa, los datos se transfieren en unidades más grandes que la palabra, denominados bloques.
- **Métodos de acceso**
	- *Acceso secuencial*
		- La memoria se organiza por unidades de datos (registros)
		- Se especifica cuál es el inicio de la posición de memoria a acceder. A partir de allí se separan los registros y se accede de forma secuencial.
		- El tiempo de acceso es variable. Depende de la posición de inicio.
	- *Acceso directo*
		- Los bloques individuales tienen una dirección único establecida por la dirección física de la memoria.
		- Entonces, salto directamente a la posición de memoria buscada.
	- *Acceso aleatorio*
		- Cada posición de memoria tiene un mecanismo cableado físicamente.
		- El tiempo para acceder a la posición de memoria es constante. Está todo cableado y no tengo que pasar por los puntos intermedios.
		- Se da en la memoria principal y en la caché
	- *Acceso asociativo*
		- Es del tipo acceso aleatorio.
		- Puedo comparar posiciones de memorias.
		- Comparativa de coincidencia de los datos buscados.
		- Es una combinación entre la aleatoria y el secuenciado.
- **Prestaciones**
	- Tiempo de acceso (latencia).
		- Tiempo que tarda en realizarse una operación de escritura o lectura.
	- Tiempo de ciclo de memoria.
		- A las memorias de acceso aleatorio
		- El tiempo de acceso + el tiempo que se adiciona antes de iniciar el segundo acceso de memoria.
	- Velocidad de transferencia.
		- La velocidad a la que puedo transferir los datos desde o hacia una unidad de memoria
- **Dispositivo físicos**
	- Semiconductor
	- Soporte magnético
	- Soporte óptico
	- Magneto-óptico
- **Características físicas**
	- Volátil/No volátil
		- La información se va perdiendo o desaparece cuando se desconecta la alimentación
	- No volatil
		- La información una vez grabada, permanece sin deteriorarse hasta que se modifique intencionalmente.



## Jerarquía de memoria.
- Para conseguir las prestaciones óptimas las memorias deben seguir a la velocidad del procesador.
	- Cuando el procesador ejecuta instrucciones, no es deseable que tenga que detenerse a la espera de instrucciones o de operandos.
	- A menor tiempo de acceso, mayor coste por bit.
	- A mayor capacidad, menor coste por bit.
	- A mayor capacidad, mayor tiempo de acceso.
![[Pasted image 20230614192718.png | 400]]
- Cuando se desciende por la pirámide ocurre que
	- Disminuye el coste por bit (a)
	- Aumenta la capacidad (b)
	- Aumenta el tiempo de acceso (c)
	- Disminuye la frecuencia de accesos a la memoria por parte del procesador. (d)
- Memorias más pequeñas, más costosas y más rápidas, se complementan con otras más grandes, más económicas y más lentas.


## Restricciones de diseño
- La clave del éxito en el diseño de la organización está en **d** (Disminuye la frecuencia de accesos a la memoria por parte del procesador)
- El uso de dos niveles de memoria funciona solo si se aplican las condiciones (a) y (d). Empleando diversas tecnologías, se tiene todo un espectro de sistemas de memoria que satisfacen las condiciones (a), (c) y generalmente la (d) 
- Principio de **localidad de las referencias**
	- En un programa, las referencias a memoria (instrucciones o datos) se suelen agrupar
	- Cada vez que se ingresa a una subrutina, hay repetidas referencias a un pequeño conjunto de instrucciones
		- El procesador, por tiempos cortos, agrupa (cluster) estas referencias
	- De esta forma, podemos organizar los datos en una jerarquía de tal manera que el porcantaje de accesos a cada nivel siguiente más bajo sea sustancialemente menor que el nivel anterior.
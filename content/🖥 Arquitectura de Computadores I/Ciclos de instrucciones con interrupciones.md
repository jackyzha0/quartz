# Ciclos de instrucciones con interrupciones

%%
Date:: [[2023-05-15]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Funcionamiento del computador]]
%%


Qué son las interrupciones?
- Mecanismo mediante el cual los dispositivos de E/S pueden interrumpir el procesamiento normal de la CPU.
- Proporcionan una forma de mejorar la eficiencia del procesador. 
	- Muchos dispositivos tienen velocidades de transferencias menores a las del CPU, lo que produce que el procesador tenga tiempo ocioso.
- Permite que el procesador pueda dedicarse a ejecutar otras instrucciones mientras una operación de E/S está en curso.
- Cuando el dispositivo externo pasa a estar preparado para actuar, es decir, cuando está listo para aceptar más datos del procesador, el módulo de E/S de este dispositivo externo envía una señal de petición de interrupción al procesador. El procesador responde suspendiendo la operación del programa que estaba ejecutando y salta a un programa
- Las interrupciones las administra el <mark style="background: #FFF3A3A6;">gestor de interrupción.</mark> Por lo tanto, la CPU puede ir realizando otras cosas.


Cuáles son los motivos de las interrupciones? 
![[Pasted image 20230612161720.png]]

## Consecuencias de las Interrupciones
- Desmejora en el rendimiento
	- Disminuye la performance del equipo.
	- Suele ser 
- A favor de una mejora del rendimiento
	- Por ejemplo, las interrupciones buscadas por el programa, busca mejorar la ejecución salvaguardando errores.


## Ciclo de instrucción con una interrupción
![[Pasted image 20230515170530.png]]
- Le agregamos al final del diagrama de estados con una <mark style="background: #FFF3A3A6;">comprobación de interrupción + interrupción.</mark>





___
## Flashcards
# Dispositivos Externos

%%
Date:: [[2023-08-10]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[]] #main_page 
%%

- Jerarquía de buses
	1. Local
	2. Sistema
	3. Alta prestación
	4. Expansión
Utilizamos una jerarquía de buses para poder jerarquizar aquellos dispositivos que poseen una mayor cercanía al procesador. Además, si unificamos los buses, tendría un gran tráfico de información. 

## Módulos de E/S: 
- Módulos que tiene el computador para gestionar los dispositivos externos
	- Dentro de ellos, posee el gestor de interrupción.
- Tipos de comunicaciones con el exterior
	- Interacción con humanos
	- Interacción con máquinas
	- Comunicación: con dispositivos remotos.

## Diagrama de un dispositivo externo
![[Pasted image 20230810162402.png | 400]]
- Interactúa a través del bus del control con el módulo de E/S
- Las entradas son señales de control, y lo que devuelve son estados.
	- Recibe órdenes, y devuelve respuestas sobre el estado de las cosas que realizó.
- El transductor traduce la señal de control, en lo que el dispositivo debe actuar.
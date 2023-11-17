# Flip-Flops SR

%%
Date:: [[2023-04-23]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Circuitos Sincrónicos]]
#arqcompu/sincronicos
%%


Qué son los circuitos flipflop SR?
?
- Posee dos terminales (SR) ![[Pasted image 20230424172541.png]]
	- S = Set
	- R = Reset
	- Si pongo S y R en 0, el flip flop mantiene la última salida anterior
	- Si pongo S y R en 1, se rompe. No responde.

- Lo que hace es mirar sus entradas, y poner en la salida algo que me interese. 
- Siempre que ocurran ciertas condiciones, que aparecen en la <mark style="background: #FFF3A3A6;">entrada clock</mark>
	- Es aquella que el flip flop va a tener que mirar para determinar en que momento del tiempo va a tener que mirar sus entradas, y entregarme una salida.


![[Pasted image 20230424172615.png]]
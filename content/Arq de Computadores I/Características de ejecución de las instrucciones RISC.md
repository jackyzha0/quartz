# Características de ejecución de las instrucciones RISC

%%
Date:: [[2023-10-19]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Repertorio de Instrucciones simple (RISC)]]
%%

## Características de ejecución de las instrucciones RISC
- Por qué es aprovechable las RISC?
	- El costo del hardware es cada vez más bajo.
	- El costo del software es cada vez más caro.
	- Cuando nació la informática, la relación hard-soft era muy equitativa. Con el paso de los años se fue equiparando. Hoy en día el costo del software es más importante que el costo del hardware.
- Aprovecha que el hard bajó el costo, y puedo disponer de una cantidad mayor de registros de uso general. 
- Los lenguajes de alto nivel se fueron complejizando, con un desarrollo más profundo. Por lo que las instrucciones sencillas permiten trabajar en alto nivel con instrucciones sencillas.
- Permite
	- Facilitar el trabajo de los compiladores
	- Mejora la eficiencia en la ejecución -> Las secuencias complejas CISC necesitan micro-código más complejo
	- Los soportes de lenguajes de alto nivel son más complejos y sofisticados.
- Tener registros más simples, por un lado nos hace más eficientes, pero por otro lado necesito más accesos a memoria, contrarrestando la eficiencia conseguida.
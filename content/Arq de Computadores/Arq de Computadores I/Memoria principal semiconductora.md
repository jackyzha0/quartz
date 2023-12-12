# Memoria principal semiconductora

%%
Date:: [[2023-06-02]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Memorias]]
%%

## Celda de memoria semiconductora (organización de la RAM)
- Características
	- Presentan dos estados estables (o semiestables), que pueden emplearse para representar el 1 o 0 binarios 
	- Puede escribirse en ellas para fijar su estado 
	- Pueden leerse para detectar su estado
	- ![[Pasted image 20230602171947.png | 400]]


## Tipos de ram
Las tecnologías RAM se dividen en dos variantes: dinámicas y estáticas
- DRAM (RAM dinámica)
	- Formada por celdas que almacenan los datos como cargas eléctricas en condensadores. La presencia o ausencia de carga en un condensador se interpreta de forma binaria.
	- Como los condensadores tienden a descargarse, las DRAM requieren refrescos periódicos para mantener memorizados los datos.
		- El término *dinámico* hace referencia a esta tendencia a que la carga se pierda (incluso manteniéndola encendida)
- SRAM (RAM estática)
	- La RAM estática es un dispositivo digital basado en los mismos elementos que se usan en el procesador.
	- Los valores binarios se almacenan utilizando configuraciones de puertas biestables (flip-flops)
	- Retendrá sus datos en tanto se mantenga alimentada


## DRAM vs SRAM
- Ambas son volátiles.
- Las celdas de DRAM son más simples  y más pequeñas que las SRAM
	- Las DRAM tienen una mayor densidad de memoria, y son más económicas que las correspondientes SRAM
- Pero, las DRAM requieren una circuitería de refresco
	- En memorias grandes, el coste de la circuitería extra se ve compensado por lo económico de las celdas de DRAM. 
	- Se las usa para memoria principal.
- En general, las SRAM son más rápidas que las DRAM, por lo que se suelen usar para memoria caché.


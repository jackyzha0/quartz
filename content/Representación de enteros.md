# Representación de enteros

%%
Date:: [[2023-11-06]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Unidad Aritmética Lógica]]
%%


- Un ordenador no puede almacenar y procesar números que poseen signo o coma. Para ello se utilizan dígitos 0 y 1.
- Si utilizamos solo enteros no negativos, los representamos fácilmente como números binarios
![[Pasted image 20231106134456.png]]

## Representación en signo y magnitud
- Todas las formas de representar un signo implican el uso de un bit más significativo (el más a la izquierda) de la palabra como un bit de signo.
	- Si dicho bit es 0 el número es positivo, y si es 1, el número es negativo.![[Pasted image 20231106134711.png]]
- Limitaciones
	- La suma y la resta requieren tener en cuenta tanto los signos de los números como sus magnitudes relativas para llevar a cabo la operación.
		- Resulta más difícil corroborar el valor 0 antes que si hubiera una sola representación.

## Representaciones en complemento a dos
- Utiliza el bit más significativo como bit de signo.
- Difiere a la representación signo-magnitud en la forma de representar los bits restantes ![[Pasted image 20231106135037.png]]

## Conversión entre longitudes de bits diferentes
- A veces se desea tomar un entero de $n$ bits y almacenarlo en $m$ bits, siendo $m>n$. Esto se resuelve con la notación signo-magnitud, trasladando el bit de signo a la posición de más a la izquierda.
- Esto no funciona con el complemento a dos
	- En su lugar, la regla de los enteros en complemento a dos es trasladar el bit de signo a la nueva posición más izquierda y completar con copias de bit de signo. Para números positivos, rellenar con ceros, y para negativos, con unos.

## Representación en coma fija
- La representaciones en esta sección se llaman de coma fija, porque la coma de la base está fija y se supone que a la derecha del bit menos significativo.

Teoría : [[Raices de Ecuaciones No Lineales]]

# Métodos Cerrados
## Métodos de Bisección y falsa posición
1. f(0).f(1) < 0 -> Por teorema de Bolzano decimos que posee una raiz.
2. $f(x)=e^{-x}-\ln(x)$
	- Domf = (0;infinito) -> No puede tener cero en \[-2;0\]
	- No se puede afirmar que tenga un cero en \[-1;4]. Parte de la función no está definida en ese intervalo
3. Aproximación con método de la intersección
	-  \[1 ; 2] -> $f(1)f(2) < 0$ y puedo usar el método de bisección
	1. \[1 ; 2] -> $c = 1.5$ -> $f(c)=-1.323$ -> nuevo int = \[1 ; 1.5]
	2. \[1 ; 1.5] -> $c = 1.25$ -> $f(c)=0.0634$ -> nuevo int = \[1.25 ; 1.5]
	3. \[1.25 ; 5] -> $c = 1.375$ -> $f(c)=0.0656$
6. $f(x)=\sin x-x^2$
	- Intervalo inicial \[0.5 ; 1], con un error menor al 2%.
	1. \[0.5 ; 1] -> $c = 0.75$ -> $f(c)=0.1191$ -> nuevo int = \[0.75 ; 1] (no error)
	2. \[0.75 ; 1] -> $c = 0.875$ -> $f(c)=0.0012$ -> nuevo int = \[0.875 ; 1] err=14%
7. $$V=\pi h^2 \dfrac{3R-h}{3}$$
	- Si R=3 m, a qué profundidad debe llenarse el tanque de modo que contenga 30 m³ (trabajando la función algebraicamente)$$f(h)=h^3-9h^2+\frac{90}{\pi}$$
	- Se resuelve igual que los anteriores, con el método de la bisección
12. $$f(x)=\tan^{-1}(x)+x^{-1}$$
	- Se resuelve con el método de la falsa posición
	1. \[0 ; 1] -> $c = 0.5601$ -> $f(c)=0.0707$ -> nuevo int = \[0 ; 0.5601] (no error)
	2. \[0 ; 0.5601] -> $c=0.5231$ -> $f(c)=0.0051$ -> nuevo int = \[0 ; 0.5231] err = 7.07%
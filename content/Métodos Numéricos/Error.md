# Error

%%
Date:: [[2023-08-23]]
Course:: [[Métodos Numéricos]]
Source:: [[U1 - MN]]
%%

## Introducción
En el estudio de los métodos numéricos, se busca lograr aproximaciones con la máxima precisión y exactitud, minimizando los errores inherentes a estas aproximaciones. Es importante reconocer que toda medición o aproximación lleva consigo un error asociado.

>[!quote] Definición: Medir
>Transformar las observaciones en números a través de las cuales podemos verificar las leyes de la naturleza. Hay que definir:
>- Objeto a medir
>- Sistema de medición: Aparato + Teoría de funcionamiento
>- Sistema de referencia: Unidad referida al patrón
>- Operador

- Una medición posee siempre un <mark style="background: #FFF3A3A6;">error</mark> que puede ser 
	- Errores sistemáticos
		- Siempre se cometen de la misma manera
		- Pueden eliminarse con correcciones de los aparatos de medición
		- No se eliminan repitiendo las mediciones
	- Errores aleatorios
		- Aparecen al azar
		- No los puede controlar el observador
		- Causados por condiciones ambientales fluctuantes, oscilaciones propias del instrumento o del operador
		- Se eliminan estadísticamente realizando muchas mediciones
- Cifras significativas
	- Las cifras significativas son una medida que indica la confiabilidad de los dígitos de un número. Determinan cuántos dígitos de un número son realmente informativos y contribuyen a su precisión. Los errores de redondeo surgen cuando debemos truncar un número con infinitas cifras a un número finito de dígitos.
- Exactitud y Precisión
	- La exactitud se refiere a qué tan cerca está una aproximación del valor verdadero. Por otro lado, la precisión se relaciona con la coherencia entre diferentes aproximaciones realizadas. Es importante notar que un resultado puede ser preciso pero no exacto, o viceversa.
![[Pasted image 20231204154350.png]]
## Error teórico
$$x_v=x_a+e_t \Rightarrow e_t = x_v - x_a$$
Donde
- $x_v$ es el valor verdadero
- $x_a$ es el valor aproximado
- $e_t$ es el error teórico
También podemos representarlo como error teórico relativo
$$E=\dfrac{e_t}{x_v}$$
En las situaciones reales no se cuenta con el error verdadero de una medida. En esos casos, para normalizar el error es utilizar la mejor estimación posible. Se normaliza el error a un valor aproximado.
$$\varepsilon_a = \dfrac{e_a}{x_a}$$
## Errores en métodos numéricos iterativos
- Los métodos numéricos son iterativos, por lo que vamos teniendo sucesiones de valores aproximados que tienden al valor verdadero. En tales casos, el error se calcula $$\varepsilon_a = \dfrac{x_i-x_{i-1}}{x_1}$$
## Errores de los métodos numéricos
- Se generan con el uso de aproximaciones para representar las cantidades y operaciones matemáticas.
### Errores de Redondeo
- Se producen cuando los números tienen un límite de cifras significativas que se usan para representar números exactos. 
- Es la omisión de cifras significativas
- Existe el redondeo simétrico y el truncado.
### Errores de truncamiento
- Resultan de representar aproximadamente un procedimiento con un modelo matemático exacto.

## Series de Taylor Formal para F con respecto a C
$$f(x) \sim \sum_{k=0}^\infty \dfrac{f^{(k)}(c)}{k!}(x-c)^k, \space x\in R $$
Utilizamos el símbolo $\sim$ porque no podemos suponer que siempre va a existir las derivadas de cualquier orden.

## Teorema de Taylor en términos de $(x-c)$
Si la función $f$ tiene derivadas continuas de orden $0,1,2,\dots,(n+1)$ en un intervalo cerrado $I=[a,b]$  entonces para cualquier $c$ y $x$ en $I$:
$$f(x) = \sum_{k=0}^\infty \dfrac{f^{(k)}(c)}{k!}(x-c)^k + E_{n+1}, \space x\in I $$
Donde el término de error $E_{n+1}$ puede estar dado en la forma $$ E_{n+1}=\dfrac{f^{(n+1)}(\xi)}{(n+1)!}(x-c)^{n+1}$$

## Teorema de Taylor en términos de H
Si la función $f$ tiene derivadas continuas de orden $0,1,2,\dots,(n+1)$ en un intervalo cerrado $I=[a,b]$  entonces para cualquier $c$ y $x$ en $I$: $$f(x + h) = \sum_{k=0}^\infty \dfrac{f^{(k)}(x)}{k!}(h)^k + E_{n+1}, \space x\in I $$
Donde $h$ es cualquier valor tal que $x+h$ está en $I$
$$ E_{n+1}=\dfrac{f^{(n+1)}(\xi)}{(n+1)!}(h)^{n+1}$$

## Análisis del error al aproximar con una  serie de Taylor
- El término de error $E_{n+1}$ depende de $h$ en dos formas
$$E_{n+1}=\dfrac{f^{(n+1)}(\xi)}{(n+1)!}(h)^{n+1}$$
- $h^{n+1}$ está explícitamente presente
- $\xi$ generalemente depende de h


[[Trabajo Practico 1 - MN]]
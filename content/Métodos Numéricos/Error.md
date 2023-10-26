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
### Errores en métodos iterativos
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


%%## Propagación del Error
En el proceso de operar con números que tienen errores asociados, es crucial comprender cómo estos errores se propagan a través de las operaciones. Las series de Taylor son una herramienta fundamental para aproximaciones numéricas y permiten modelar funciones en términos de sus derivadas en un punto.

## Estabilidad y Condición
Un cálculo numérico se considera inestable si los errores de entrada se amplifican significativamente a través del método numérico utilizado. El número de condición de un problema proporciona información sobre cómo los errores en los datos de entrada afectan el resultado final.

## Error Numérico Total
El error numérico total en una aproximación resulta de la combinación de los errores de redondeo y truncamiento. Reducir el error de redondeo puede llevar a aumentar el número de cifras significativas, lo que a su vez puede aumentar el error de truncamiento, que proviene de la aproximación de operaciones matemáticas.

## Control del Error
No existe un enfoque universal para controlar el error en todos los contextos numéricos. Sin embargo, algunas estrategias generales incluyen evitar restar números casi iguales, trabajar primero con los valores más pequeños al sumar o restar y utilizar métodos diferentes para corroborar los resultados.

## Confiabilidad de los Datos
La precisión y exactitud de los resultados numéricos pueden verse afectadas por diversos factores. Los errores por equivocación en los cálculos, los errores de formulación al definir un problema y la incertidumbre en relación a las variables relevantes son aspectos que deben considerarse.

## Error Absoluto y Relativo
El error absoluto se refiere a la diferencia entre el valor verdadero y la aproximación realizada. El error relativo, por su parte, es el cociente entre el error absoluto y el valor verdadero, y proporciona una medida relativa de la precisión de la aproximación.

## Punto Flotante
La representación en punto flotante es una técnica para expresar números fraccionarios en una computadora. Se divide en dos componentes: la mantisa, que contiene la información significativa del número, y el exponente, que determina el orden de magnitud del número en relación con una base específica.

Con un entendimiento sólido de estos conceptos y técnicas, los métodos numéricos nos brindan las herramientas para abordar problemas matemáticos de manera eficiente y precisa en entornos computacionales.%%

[[Trabajo Practico 1 - MN]]
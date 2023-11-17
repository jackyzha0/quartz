# Autómata con pilas. 

%%
Date:: [[2023-06-01]]
Course:: [[Informática Teórica]]
Source:: [[]]
#main_page 
%%

- No podemos representarlo con un autómata finito
- Controlar la cantidad que ingresan con un autómata finito no es posible
- Necesitamos una estructura adicional para controlar cuántas letras van ingresando.
	- Una memoria adicional. Implementada con la estructura de pila (estructura de tipo pila)

## Cómo usar la pila para reconocer $a^nb^n$ , $n\geq 1$
1. Elegir los símbolos de la pila
2. Estrategia para apilar (push)
3. Estrategia para desapilar (pop)
4. Condiciones de aceptación

- Ya no trabajamos con un elemento, **trabajamos con 3 elementos.** 
	- Se especifica el símbolo de entrada
	- Especifico el símbolo con el cual ese elemento que ingreso, lo<mark style="background: #FFF3A3A6;"> ingreso en la pila</mark>
	- Elemento que voy a tomar <mark style="background: #FFF3A3A6;">para sacar de la pila</mark>
Si no saco o meto nada, entonces uso el símbolo de la palabra vacía $\lambda$
![[Pasted image 20230601171700.png | center | 400]]



- Los AP pertenecen a los lenguajes independientes del contexto y ocupan una posición intermedia entre los AF y las máquinas de Turing, los AP responden al procedimiento LIFO
- **Aplicaciones**
	- Los AP pueden describir la sintaxis de muchos lenguajes de programación.
	- Análisis de clases gramaticales.
	- Análisis de cadenas, palabras, oraciones.
- Características
	- Flujo de entrada y mecanismo de control.
	- Estado inicial y al menos uno de aceptación.
	- Existe una pila para almacenar información que puede utilizarse posteriormente.

>[!important] Definición formal de un autómata a pila
>$$P=(Q,\Sigma,\Gamma, \delta, q_0, Z_0, F)$$
>- $Q$: Conjunto de finito de estados
>-  $\Sigma$: Conjunto finito de símbolos de entrada
>- $\Gamma$ Alfabeto de pila finito 
>- $\delta$ Función de transición
>- $q_0$ Estado inicial
>- $Z_0$ Fondo de la pila
>- $F$ Conjunto de estados de aceptación


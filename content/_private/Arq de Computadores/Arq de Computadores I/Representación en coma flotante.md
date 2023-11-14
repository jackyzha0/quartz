# Representación en coma flotante

%%
Date:: [[2023-08-31]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Unidad Aritmética Lógica]]
%%

## Fundamentos
La representación en coma flotante es un método utilizado para representar números reales, que incluyen tanto enteros como fracciones, en sistemas de cómputo. Este enfoque permite manejar un amplio rango de valores, desde números muy pequeños hasta números muy grandes, utilizando una cantidad fija de bits para su representación. Aquí hay un apunte teórico sobre los fundamentos de la representación en coma flotante:

Fundamentos de la Representación en Coma Flotante:

1. Coma Fija vs. Coma Flotante:
   - La representación en coma fija, como el complemento a dos, se utiliza para representar enteros positivos y negativos en un rango centrado en el cero.
   - Con la coma fija, es posible representar números con parte fraccionaria, pero tiene limitaciones en términos de representar números muy grandes o fracciones muy pequeñas.

2. Notación Científica:
   - Para superar las limitaciones de la coma fija, se utiliza la notación científica, tanto para números decimales como binarios.
   - En la notación científica, un número se expresa como un producto de dos componentes: la mantisa y el exponente.
   - La mantisa contiene los dígitos significativos del número, y el exponente indica la posición de la coma decimal (o binaria) en relación con la mantisa.

3. Representación en Coma Flotante:
   - En la representación en coma flotante de números binarios, un número se expresa en la forma S * B^E, donde:
     - S: Signo (positivo o negativo).
     - B: Base (implícita, generalmente 2 para sistemas binarios).
     - E: Exponente.

4. Estructura de una Representación en Coma Flotante:
   - La representación en coma flotante se almacena en una palabra binaria con tres campos:
     - Signo (1 bit): Indica si el número es positivo (0) o negativo (1).
     - Mantisa (fracción significativa): Almacena los dígitos significativos del número.
     - Exponente: Representa la posición de la coma en relación con la mantisa.

5. Representación Sesgada:
   - Para representar el exponente en una cantidad fija de bits, se utiliza la representación sesgada.
   - Se aplica un sesgo (bias) al exponente, lo que permite representar tanto números muy pequeños como muy grandes.
   - El sesgo se resta del valor del exponente almacenado para obtener el exponente verdadero.

6. Ventajas de la Representación Sesgada:
   - La representación sesgada permite que los números no negativos se traten de manera similar a los enteros al realizar comparaciones.
   - Facilita el manejo de números en coma flotante en operaciones aritméticas y comparaciones.


![[Pasted image 20230831155517.png]]

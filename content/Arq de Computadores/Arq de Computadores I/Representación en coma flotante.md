# Representación en coma flotante

%%
Date:: [[2023-08-31]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Unidad Aritmética Lógica]]
%%


La representación en coma flotante es una forma de representar números reales en una computadora. Este método se utiliza para representar números con una gran cantidad de dígitos y decimales, y se basa en la notación científica. En la representación en coma flotante, un número se divide en dos partes: la mantisa y el exponente. La mantisa es la parte fraccionaria del número, mientras que el exponente indica la posición del punto decimal. El estándar más utilizado para la representación en coma flotante es el IEEE 754[3]. 

Las partes que posee la representación en coma flotante son:

- **Signo**: Indica si el número es positivo o negativo.
- **Mantisa**: Es la parte fraccionaria del número y se representa en binario.
- **Exponente**: Indica la posición del punto decimal y se representa en binario. El exponente se suma a un valor fijo llamado sesgo (bias) para obtener el valor real del exponente[2]. 

![[Pasted image 20230831155517.png]]

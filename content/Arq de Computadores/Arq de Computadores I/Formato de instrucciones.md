# Formato de instrucciones

%%
Date:: [[2023-09-28]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Repertorio de instrucciones]]
%%

## Longitud de Instrucción:
- La longitud de la instrucción es fundamental y afecta a varios aspectos del diseño de la arquitectura de computadores.
- Un equilibrio debe encontrarse entre tener un amplio conjunto de instrucciones, modos de direccionamiento y un amplio rango de direcciones, y el deseo de ahorrar espacio.
- Un conjunto más grande de instrucciones y modos de direccionamiento facilita el trabajo del programador y permite programas más concisos.
- Sin embargo, una instrucción más larga ocupa más espacio en memoria, lo que puede ser ineficiente en sistemas con limitaciones de memoria o cuando se busca un acceso más rápido a las instrucciones.

## Asignación de Bits en la Instrucción:
- La asignación de bits en una instrucción es un desafío complejo que involucra compromisos entre el número de códigos de operación (codops) y la capacidad de direccionamiento.
- Un mayor número de codops requiere más bits en el campo de codop, lo que reduce la cantidad de bits disponibles para direccionamiento.
- En algunos casos, se pueden usar codops de longitud variable, donde ciertas instrucciones tienen una longitud mínima de codop, pero se pueden especificar operaciones adicionales utilizando más bits en la instrucción.
- La cantidad de bits de direccionamiento también depende de factores como el número de modos de direccionamiento, el número de operandos, la elección entre registros y memoria, y el rango de direcciones que se debe abordar.
- La longitud de la instrucción también debe ser un múltiplo de la longitud de un carácter y la longitud de los números en coma fija para evitar problemas de alineación.
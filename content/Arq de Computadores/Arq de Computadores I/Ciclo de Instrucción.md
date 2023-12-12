# Ciclo de Instrucción

%%
Date:: [[2023-10-12]]
Course:: [[]]
Source:: [[]]
%%

## Subciclos de una instrucción
![[Pasted image 20231012160826.png | 400]]
- Captación: Llevar la siguiente instrucción de la memoria al procesador.
- Ejecución: Interpretar el código de operación y llevar a cabo la operación indicada.
- Interrupción: Si las interrupciones están habilitadas y han ocurrido una interrupción, guardar el estado del proceso actual y entender la interrupción 

1. **Ejecución de Instrucciones**: La ejecución de una instrucción puede implicar uno o varios operandos en memoria, lo que requiere el acceso a la memoria. Además, si se utiliza el direccionamiento indirecto, pueden ser necesarios accesos adicionales a la memoria.
    
2. **Captación de Direcciones Indirectas**: La captación de direcciones indirectas se considera como un subciclo adicional de la ejecución de instrucciones. Esto implica verificar si la instrucción incluye direccionamiento indirecto y, en ese caso, captar los operandos requeridos utilizando dicho direccionamiento.
    
3. **Ciclo de Instrucción**: La Figura 12.4 representa el ciclo de instrucción, que implica alternar entre las actividades de captación y ejecución de instrucciones. Después de captar una instrucción, se examina para determinar si utiliza direccionamiento indirecto. Luego, se capturan los operandos necesarios, y finalmente, se ejecuta la instrucción. También se menciona que entre la ejecución de una instrucción y la captación de la siguiente, podría ocurrir el procesamiento de una interrupción.
    
4. **Procesamiento de Operandos**: Una vez captada una instrucción, se identifican sus campos de operandos. Los operandos en memoria se captan de la memoria principal, y en algunos casos, esto puede involucrar direccionamiento indirecto. Los operandos ubicados en registros no requieren ser captados desde la memoria.
    
5. **Almacenamiento de Resultados**: Después de ejecutar la operación, puede ser necesario un proceso similar para almacenar el resultado en la memoria principal si corresponde.

## Flujo de datos
![[Pasted image 20231012161132.png]]
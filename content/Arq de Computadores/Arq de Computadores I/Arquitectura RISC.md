# Arquitectura RISC

%%
Date:: [[2023-10-26]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Repertorio de Instrucciones simple (RISC)]]
%%


## Características de las arquitecturas RISC

1. **Una instrucción por ciclo:** En una arquitectura RISC, se ejecuta una instrucción máquina en cada ciclo de máquina. Un ciclo de máquina se define como el tiempo necesario para captar dos operandos desde dos registros, realizar una operación de la ALU y almacenar el resultado en un registro. Esto significa que las instrucciones RISC son simples y de un ciclo, y no requieren microcódigo complejo.
2. **Operaciones registro a registro:** La mayoría de las operaciones en una arquitectura RISC son del tipo registro a registro. Esto simplifica el repertorio de instrucciones y la unidad de control. Aunque pueden existir operaciones simples de carga y almacenamiento para acceder a la memoria, la arquitectura se centra en operaciones de registros.
3. **Modos de direccionamiento sencillos:** Las arquitecturas RISC utilizan modos de direccionamiento simples, como direccionamiento a registro. Pueden incluir algunos modos adicionales, como el desplazamiento y el relativo al contador de programa, pero tienden a evitar modos de direccionamiento complejos.
4. **Formatos de instrucción sencillos:** Las instrucciones en una arquitectura RISC tienen formatos de instrucción sencillos. La longitud de las instrucciones es fija y alineada en los límites de una palabra. Esto facilita la decodificación del código de operación y el acceso a los operandos en registros, y simplifica la unidad de control.


## RISC VS CISC

| Característica                                     | RISC Clásico                       | CISC                                |
|---------------------------------------------------|------------------------------------|------------------------------------|
| Tamaño de Instrucción                             | Único                             | Variable                           |
| Tamaño de Instrucción (Generalmente)              | 4 bytes                            | Variable                           |
| Modos de Direccionamiento de Datos                | Generalmente menos de 5 modos     | Variedad de modos de direccionamiento |
| Direccionamiento Indirecto                        | No se utiliza                     | Puede ser utilizado                 |
| Operaciones de Carga/Almacenamiento con Cálculos  | No se utilizan                     | Utilizadas en algunas instrucciones |
| Múltiples Operandos de Memoria por Instrucción    | No se utilizan                     | En algunas instrucciones             |
| Restricciones en la Alineación de Datos           | Se imponen algunas restricciones | Menos restricciones o más flexibilidad |
| Uso de la Unidad de Gestión de Memoria (MMU)      | Limitado                          | Variable                           |
| Bits en el Campo de Registro Entero               | Al menos 5 bits                   | Variable                           |
| Bits en el Campo de Registro de Coma Flotante     | Al menos 4 bits                   | Variable                           |


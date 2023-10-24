# Buffer

%%
Date:: [[2023-04-28]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Memorias]]
#arqcompu/memorias 
%%

## Buffer
- Un buffer es un dispositivo electrónico que se utiliza para almacenar temporalmente datos o señales y para transmitirlos de un dispositivo a otro en un sistema digital. Los buffers se utilizan comúnmente para evitar la pérdida de datos debido a diferencias en la velocidad de procesamiento de los dispositivos, o para permitir que múltiples dispositivos compartan recursos comunes sin interferir entre sí.
- Es una especie de "antesala" que sirve para poder compatibilizar las velocidades de los distintos dispositivos. 

## Buffer Three-State
![[Pasted image 20230428170629.png]]
![[Pasted image 20230428170706.png]]
- Un buffer de tres estados es un tipo específico de buffer que tiene la capacidad de poner su salida en un estado de alta impedancia, en lugar de transmitir activamente una señal. Cuando la salida está en estado de alta impedancia, se desconecta completamente del circuito de destino, lo que permite que otros dispositivos compartan el mismo canal de comunicación sin interferencias. 
- Los buffers de tres estados se utilizan comúnmente en aplicaciones de multiplexación de datos y en bus de datos compartidos, donde varios dispositivos pueden compartir un bus de datos común sin interferir entre sí.
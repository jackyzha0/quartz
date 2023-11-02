# Modelo de referencia OSI

%%
Date:: [[2023-10-30]]
Course:: [[Comunicación de Datos]]
Source:: [[]]
%%

El **modelo de referencia OSI (Open Systems Interconnection)** es un marco conceptual que se utiliza para entender y describir cómo funcionan las comunicaciones en una red de computadoras. Fue desarrollado por la Organización Internacional de Normalización (ISO) para estandarizar los protocolos de comunicación en las redes. El modelo OSI consta de siete capas, cada una de las cuales cumple una función específica en el proceso de comunicación. Aquí tienes un apunte teórico de cada capa:

1. **Capa 1 - Capa Física:** Esta capa se encarga de la transmisión física de datos a través del medio de transmisión, como cables, fibra óptica o ondas electromagnéticas. Define aspectos como voltajes, frecuencias y la topología de la red. Ejemplos de dispositivos en esta capa son los cables Ethernet y los concentradores (hubs). ![[Pasted image 20231030162830.png]] **Dirección MAC** ![[Pasted image 20231030162932.png | 400]]
![[Pasted image 20231030171639.png | center | 400 ]]
2. **Capa 2 - Capa de Enlace de Datos:** En esta capa, los datos se dividen en tramas y se agrega información de control para asegurar la correcta transmisión de datos entre dispositivos directamente conectados. Los switches y las tarjetas de red operan en esta capa.

3. **Capa 3 - Capa de Red:** La capa de red se encarga del enrutamiento de datos a través de la red. Aquí, los paquetes de datos se dirigen desde el origen al destino utilizando direcciones IP. Los routers son dispositivos que operan en esta capa. [[TCP 3-Way Handshake]]

4. **Capa 4 - Capa de Transporte:** Esta capa se encarga de la segmentación y reensamblaje de datos, así como del control de flujo y la corrección de errores. El Protocolo de Control de Transmisión (TCP) y el Protocolo de Datagramas de Usuario (UDP) son ejemplos de protocolos de esta capa.![[Pasted image 20231030163016.png]]

5. **Capa 5 - Capa de Sesión:** La capa de sesión establece, mantiene y finaliza sesiones de comunicación entre dispositivos. Puede manejar múltiples conversaciones a la vez y garantizar que la comunicación sea confiable y segura.

6. **Capa 6 - Capa de Presentación:** En esta capa, los datos se traducen, cifran o comprimen según sea necesario para garantizar que puedan ser entendidos por ambas partes. También se encarga de la conversión de códigos de caracteres.

7. **Capa 7 - Capa de Aplicación:** La capa de aplicación es la capa más alta y se relaciona directamente con las aplicaciones y servicios que utilizan la red, como navegadores web, clientes de correo electrónico y aplicaciones de chat. Aquí es donde los usuarios interactúan con la red.

Cada capa del modelo OSI tiene una función específica y se comunica con las capas adyacentes a través de interfaces bien definidas. Esto permite que diferentes fabricantes y sistemas operativos implementen las capas por separado, lo que facilita la interoperabilidad de los dispositivos en una red.

![[Pasted image 20231030161044.png | center | 400]]
![[Pasted image 20231030161115.png | center | 500]]
## Encapsulamiento de datos
![[Pasted image 20231030161145.png | center | 500]]
![[Pasted image 20231030162441.png | 500 | center]]
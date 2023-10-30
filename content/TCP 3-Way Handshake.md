[[Comunicación de Datos]]

El proceso de "TCP 3-Way Handshake" (Apretón de manos de 3 vías en TCP) es un método esencial en las comunicaciones de red que se utiliza para establecer una conexión segura y confiable entre dos dispositivos, generalmente un cliente y un servidor. A continuación, se describe este proceso en tres pasos:

1. **Paso 1 - Solicitud de conexión (SYN):** Cuando un cliente desea establecer una conexión con un servidor, envía un segmento TCP especial llamado "SYN" (Synchronize Sequence Number). Este segmento contiene un número de secuencia inicial aleatorio (ISN) que se utiliza para identificar los datos en la comunicación. El objetivo de este paso es informar al servidor sobre la intención de establecer una conexión.

2. **Paso 2 - Confirmación de la solicitud (SYN-ACK):** El servidor, al recibir la solicitud del cliente, responde con un segmento "SYN-ACK". Este segmento indica que está dispuesto a establecer una conexión y también proporciona un número de secuencia inicial (ISN) propio. Ahora, el servidor también está preparado para recibir datos del cliente.

3. **Paso 3 - Confirmación de la conexión (ACK):** Finalmente, el cliente recibe la respuesta del servidor y envía un tercer segmento, llamado "ACK" (Acknowledgment), al servidor. Este segmento confirma que ha recibido el "SYN-ACK" del servidor y que está listo para comenzar a transmitir datos. La conexión se considera establecida después de este paso, y ambas partes pueden comenzar a intercambiar información de manera segura.


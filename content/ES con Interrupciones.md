# ES con Interrupciones

%%
Date:: [[2023-11-05]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Dispositivos Externos]]
%%

## ES mediante interrupciones
El **problema con la E/S programada es que el procesador debe esperar a que los módulos de E/S estén listos para recibir o transmitir datos**, lo que resulta en una degradación del rendimiento del sistema. Una alternativa más eficiente es utilizar E/S con interrupciones. En este enfoque, el procesador envía una orden de E/S y continúa realizando otras tareas. Cuando el módulo de E/S está listo, interrumpe al procesador para solicitar su servicio. El procesador atiende la solicitud, realiza la transferencia de datos y luego vuelve a su trabajo anterior.

Desde el punto de vista del módulo de E/S, este recibe una orden del procesador, realiza la lectura de datos desde el periférico, y luego envía una interrupción al procesador cuando el dato está listo. Luego, espera a que el procesador solicite el dato y lo transfiere cuando se realiza la solicitud.

Desde el punto de vista del procesador, envía la orden de E/S y continúa con otras tareas. Cuando recibe una interrupción del módulo de E/S, guarda el contexto del programa en curso, procesa la interrupción, almacena el dato en memoria y luego recupera el contexto del programa que estaba ejecutando anteriormente.

La E/S con interrupciones es más eficiente que la E/S programada, ya que elimina las esperas innecesarias. Sin embargo, aún consume tiempo del procesador debido a que todas las transferencias de datos deben pasar a través de él.


## Procesamiento de la Interrupción
![[Pasted image 20231105122750.png | center | 400]]
Cuando se produce una interrupción en un sistema, se desencadenan una serie de eventos en el procesador, tanto a nivel de hardware como de software. Secuencia típica de estos eventos:
1. El dispositivo de E/S finaliza una operación y envía una señal de interrupción al procesador.
2. El procesador completa la ejecución de la instrucción actual antes de responder a la interrupción.
3. Luego, el procesador verifica si existen interrupciones pendientes y reconoce la señal de interrupción enviando una señal de reconocimiento al dispositivo que generó la interrupción. Esto desactiva la señal de interrupción en el dispositivo.
4. Para prepararse para transferir el control a la rutina de interrupción, el procesador debe guardar la información necesaria para continuar el programa en el punto en que se detuvo. Esto incluye el estado del procesador, que se almacena en un registro llamado "Palabra de Estado del Programa (PSW)" y la posición de la siguiente instrucción a ejecutar, que se encuentra en el contador de programa. Estos registros se pueden almacenar en la pila de control del sistema.
5. A continuación, el procesador carga el contador de programa con la dirección de inicio de la rutina de gestión de la interrupción requerida. La estructura de esta rutina puede variar según la arquitectura del computador y el diseño del sistema operativo. Puede haber una sola rutina para todas las interrupciones, una para cada tipo de interrupción, o incluso una por dispositivo y tipo de interrupción. Si se requiere determinar a qué rutina llamar, el procesador puede obtener esta información de la señal de interrupción original o enviar una solicitud al dispositivo que generó la interrupción para obtener la información necesaria.
Cuando el procesador carga el contador de programa y transfiere el control al programa de gestión de interrupción, se llevan a cabo las siguientes operaciones:
6. En este punto, se han almacenado en la pila del sistema el contador de programa y el PSW del programa interrumpido. Sin embargo, también es necesario guardar los contenidos de los registros del procesador, ya que estos registros pueden ser necesarios para la rutina de interrupción. La rutina de gestión de interrupción suele comenzar almacenando en la pila los contenidos de todos los registros. Un ejemplo se muestra en la Figura 7.7a, donde un programa de usuario se interrumpe después de la instrucción en la posición N. Los contenidos de todos los registros, junto con la dirección de la siguiente instrucción (N + 1), se almacenan en la pila. Luego, el puntero de la pila se actualiza para que apunte a la nueva cabecera de la pila, y el contador de programa se actualiza para que apunte al comienzo de la rutina de servicio de interrupción.
7. La rutina de gestión de la interrupción puede continuar procesando la interrupción. Esto incluye el examen de la información de estado relacionada con la operación de E/S u otros eventos que causaron la interrupción. También puede implicar el envío de órdenes o señales de reconocimiento adicionales al dispositivo de E/S.
8. Una vez finalizado el procesamiento de la interrupción, los valores de los registros almacenados en la pila se recuperan y se vuelven a cargar en los registros del procesador, como se muestra en la Figura 7.7b. ![[Pasted image 20231105123051.png]]
9. El paso final es recuperar los valores del PSW y del contador de programa desde la pila. Como resultado, la siguiente instrucción que se ejecute pertenecerá al programa que fue interrumpido anteriormente.


## Cuestiones de diseño
El diseño de la gestión de E/S mediante interrupciones plantea dos cuestiones clave: cómo el procesador identifica el dispositivo que generó la interrupción y cómo decide cuál de varias interrupciones atender. Se emplean cuatro técnicas comunes para abordar estas cuestiones:

1. **Múltiples Líneas de Interrupción:** Se proporcionan varias líneas de interrupción entre el procesador y los módulos de E/S. Sin embargo, no es práctico dedicar muchas líneas del bus a interrupciones, por lo que se conectan varios módulos de E/S a cada línea.
    
2. **Consulta Software (Software Poll):** Cuando se detecta una interrupción, el procesador desencadena una rutina de servicio de interrupción que consulta cada módulo de E/S para identificar el que generó la interrupción. Puede realizarse mediante una línea específica o leyendo registros de estado en cada módulo.
    
3. **Conexión en Cadena (Daisy Chain):** Todos los módulos de E/S comparten una línea para solicitar interrupciones, y la línea de reconocimiento de interrupción se conecta en cadena a través de los módulos. Cuando el procesador recibe una interrupción, la señal se propaga hasta que alcanza el módulo que la solicitó, que responde con un vector que apunta a la rutina de servicio específica para ese dispositivo.
    
4. **Arbitraje de Bus (Vectorizada):** Antes de activar la línea de petición de interrupción, un módulo de E/S debe obtener el control del bus. Solo un módulo puede activar la línea de petición a la vez. Cuando el procesador detecta la interrupción, el módulo que la solicitó coloca su vector en las líneas de datos, que actúa como un puntero a la rutina de servicio del dispositivo.
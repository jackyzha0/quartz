# DMA

%%
Date:: [[2023-08-24]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[Dispositivos Externos]]
%%

## Inconvenientes de la [[ES Programadas]] y [[ES con Interrupciones]]
1. **Limitación de Velocidad:** Ambos métodos limitan la velocidad de transferencia de E/S debido a que el procesador debe verificar y dar servicio a los dispositivos. La velocidad de transferencia de E/S está restringida por la velocidad a la que el procesador puede realizar estas tareas.
2. **Uso del Procesador:** En ambos casos, el procesador debe dedicar recursos a la gestión de las transferencias de E/S. Cada transferencia de E/S implica la ejecución de un número de instrucciones, lo que puede afectar la capacidad del procesador para llevar a cabo otras tareas.

## Funcionamiento del DMA

El funcionamiento del DMA (Acceso Directo a Memoria) implica la presencia de un controlador de DMA en el bus del sistema. Este controlador puede imitar al procesador y asumir el control del sistema cuando sea necesario para transferir datos entre la memoria y los dispositivos de E/S.

El proceso de DMA funciona de la siguiente manera:

1. El procesador envía una orden al módulo de DMA, indicando si se requiere una lectura o escritura, la dirección del dispositivo de E/S, la posición inicial de memoria y el número de palabras a leer o escribir.

2. El procesador puede continuar con otras tareas mientras el módulo de DMA se encarga de la transferencia de datos. El módulo de DMA transfiere los datos directamente entre la memoria y el dispositivo de E/S, sin pasar por el procesador.

3. Una vez que se completa la transferencia, el módulo de DMA envía una señal de interrupción al procesador para notificar la finalización.

4. El procesador solo interviene al comienzo y al final de la transferencia, lo que ralentiza la ejecución de los programas.

El DMA es especialmente eficiente cuando se deben transferir grandes volúmenes de datos, ya que minimiza la carga sobre el procesador y acelera el proceso. El mecanismo de DMA puede configurarse de varias maneras, incluyendo la integración de funciones de DMA y E/S para reducir la cantidad de ciclos de bus requeridos y mejorar la eficiencia de las transferencias de datos.

## Configuraciones de DMA![[Pasted image 20230824170251.png]]
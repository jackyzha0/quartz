# SCPC - Single Channel Per Carrier

%%
Date:: [[2023-08-29]]
Course:: [[Comunicación de Datos]]
Source:: [[Sistemas Satelitales]]
%%

El Servicio de Comunicación Satelital SCPC (Single Channel Per Carrier) es una tecnología de comunicaciones por satélite que se utiliza para transmitir datos, voz y video de manera eficiente y confiable. En contraste con otros esquemas de comunicación satelital que pueden transmitir múltiples canales de datos en una sola portadora (carrier), el enfoque SCPC asigna un único canal de datos a cada portadora individual.

## Características clave del servicio SCPC:

1. **Eficiencia de Ancho de Banda:** En lugar de dividir una portadora en múltiples canales de datos (como en el sistema TDMA o CDMA), SCPC asigna una portadora única a un solo flujo de datos. Esto permite una asignación directa de ancho de banda a una aplicación específica, lo que puede resultar en una transmisión más eficiente y controlada.

2. **Aplicaciones Específicas:** SCPC es útil cuando se necesita dedicar un ancho de banda constante y específico a una aplicación o usuario en particular. Por ejemplo, se puede utilizar en enlaces punto a punto para transmisiones de video, enlaces de backhaul de redes celulares, conexiones de telefonía por satélite y más.

3. **Calidad de Servicio:** Al asignar una portadora individual a una aplicación o usuario, se puede gestionar y controlar mejor la calidad de servicio (QoS), asegurando un rendimiento predecible y constante para aplicaciones críticas como la voz y el video en tiempo real.

4. **Configuración Personalizada:** Dado que cada portadora se utiliza para un solo flujo de datos, es posible ajustar y configurar parámetros específicos de modulación, codificación y potencia para optimizar el rendimiento de una aplicación particular.

5. **Uso Eficiente de Energía:** Debido a que se transmite un único flujo de datos en una portadora, en comparación con sistemas multiplexados que pueden requerir más energía, el uso de energía puede ser más eficiente en aplicaciones que no necesitan múltiples canales de datos.

>[!important] Summary
>En resumen, el servicio de comunicación satelital SCPC es especialmente adecuado para situaciones en las que se necesita una asignación constante y dedicada de ancho de banda para aplicaciones específicas. Su enfoque en asignar un único canal de datos a cada portadora permite una mayor previsibilidad y control sobre el rendimiento de la red y las aplicaciones.


![[Pasted image 20230829145602.png]]
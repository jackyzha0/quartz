# Topología de redes Ethernet

%%
Date:: [[2023-10-30]]
Course:: [[Comunicación de Datos]]
Source:: [[Internetworking]]
%%

1. **Topología de Estrella:**
   - En una topología de estrella, todos los dispositivos están conectados a un concentrador o switch central. Cada dispositivo tiene su propio cable de conexión directa al concentrador.
   - Este enfoque facilita la administración de la red y permite identificar fácilmente problemas en dispositivos individuales. Si un dispositivo falla, los demás siguen funcionando.
   - Sin embargo, si el concentrador central falla, toda la red podría quedar inactiva. Además, se requiere una mayor cantidad de cableado.
	   ![[Pasted image 20231030172741.png | center | 400]]

2. **Topología de Bus:**
   - En una topología de bus, todos los dispositivos están conectados a un solo cable central. Cualquier dispositivo puede enviar datos a través del cable compartido.
   - Esta topología es simple y económica en términos de cableado, pero si el cable central se daña, puede provocar la caída de toda la red.
   - Además, la administración y la detección de problemas pueden ser más complicadas en comparación con otras topologías.

3. **Topología de Anillo:**
   - En una topología de anillo, los dispositivos se conectan en forma de anillo cerrado, donde cada dispositivo está conectado al siguiente y al anterior.
   - Los datos circulan en un solo sentido a lo largo del anillo. Esto proporciona una estructura de red robusta y una alta tolerancia a fallos.
   - Sin embargo, si un dispositivo o enlace falla, puede romper el anillo y afectar la comunicación en la red.

4. **Topología de Malla:**
   - En una topología de malla, cada dispositivo está conectado a todos los demás dispositivos en la red. Esto crea una red altamente redundante y resistente.
   - Las redes de malla son costosas en términos de cableado, pero son muy confiables y tolerantes a fallos, ya que siempre hay múltiples rutas para que los datos lleguen a su destino.

5. **Topología de Árbol:**
   - La topología de árbol es una combinación de la topología de estrella y la topología de bus. Varios grupos de dispositivos se conectan a un concentrador central en una estructura jerárquica.
   - Esto permite una administración eficiente y una alta tolerancia a fallos en las partes superiores de la jerarquía, pero un fallo en el concentrador central puede afectar toda la red.

6. **Topología Híbrida:**
   - Las redes Ethernet modernas a menudo utilizan topologías híbridas que combinan diferentes enfoques según las necesidades. Por ejemplo, una red empresarial puede usar una topología de estrella en su núcleo y una topología de malla en sus sucursales para aumentar la redundancia.
# RAID

%%
Date:: [[2023-09-07]]
Course:: [[Arquitectura de Computadores I]]
Source:: [[]] #main_page 
%%

## Posibilidades que nos brinda el RAID
1. RAID es un conjunto de unidades físicas de disco vistas por el sistema operativo como una única unidad lógica.
2. Los datos se distribuyen a través de las unidades físicas del conjunto de unidades.
3. La capacidad de los discos redundantes se usa para almacenar información de paridad que garantice la recuperación de los datos en caso de fallo de disco.

## RAID 0
- RAID 0 <mark style="background: #FFF3A3A6;">distribuye los datos equitativamente entre dos o más discos sin información de paridad o redundancia</mark>, lo que significa que no ofrece tolerancia a fallos
- Este arreglo se utiliza para mejorar el rendimiento de la computadora, ya que la distribución de los datos entre los discos proporciona un mayor ancho de banda
- RAID 0 no tiene información de paridad ni redundancia de datos, por lo que, si se rompe una de las unidades de almacenamiento, perderemos todos los datos que había en su interior
- Es posible crear un RAID 0 con más de dos discos, aunque la fiabilidad del conjunto será igual a la fiabilidad media de cada disco entre el número de discos del conjunto.
- RAID 0 se usa normalmente para proporcionar un alto rendimiento de escritura ya que los datos se escriben en dos o más discos de forma paralela, aunque un mismo fichero solo está presente una vez en el conjunto.

## RAID 1 
- RAID 1 es un tipo de arreglo RAID que se utiliza para <mark style="background: #FFF3A3A6;">proporcionar redundancia de datos</mark>
- En RAID 1, los datos <mark style="background: #FFF3A3A6;">se escriben en dos o más discos de forma idéntica</mark>, lo que significa que si uno de los discos falla, los datos se pueden recuperar del otro disco
- RAID 1 es útil para proteger los datos importantes, ya que proporciona una copia exacta de los datos en otro disco
- Este arreglo no ofrece mejoras en el rendimiento, ya que los datos se escriben en todos los discos del arreglo de forma simultánea
- El tamaño del conjunto RAID 1 solo puede ser tan grande como el más pequeño de sus discos

## RAID 2
- RAID 2 es un tipo de arreglo RAID que se utiliza para proporcionar alta velocidad de transferencia de datos y una buena redundancia
- Este arreglo utiliza una técnica llamada corrección de errores de bits, que <mark style="background: #FFF3A3A6;">implica la adición de bits de paridad a los datos almacenados</mark> en los discos
- Los bits de paridad <mark style="background: #FFF3A3A6;">se utilizan para detectar y corregir errores</mark> en los datos almacenados en los discos
- RAID 2 es un arreglo **poco utilizado debido a su complejidad** y al hecho de que los discos deben girar a la misma velocidad para que funcione correctamente
- La tecnología moderna ha hecho que la corrección de errores de bits sea menos necesaria, lo que ha llevado a la obsolescencia de RAID 2

## RAID 3
- RAID 3 es un tipo de arreglo RAID que utiliza una técnica llamada corrección de errores de bits, que implica la adición de bits de paridad a los datos almacenados en los discos
- En RAID 3,<mark style="background: #FFF3A3A6;"> los datos se dividen en bloques y se escriben en varios discos, con un disco dedicado a almacenar los bits de paridad</mark>
- Este arreglo proporciona una buena redundancia de datos, ya que los bits de paridad se utilizan para detectar y corregir errores en los datos almacenados en los discos
- RAID 3 es útil para aplicaciones que requieren altas velocidades de transferencia de datos, como la edición de video y audio
- Sin embargo, este arreglo no es adecuado para aplicaciones que requieren un alto rendimiento de escritura, ya que los datos se escriben en un solo disco dedicado a los bits de paridad
- RAID 3 es un arreglo poco utilizado en la actualidad debido a la complejidad de su implementación y al hecho de que la tecnología moderna ha hecho que la corrección de errores de bits sea menos necesaria

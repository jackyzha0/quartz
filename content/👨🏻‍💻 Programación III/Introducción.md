# Introducción

%%
Date:: [[2023-08-09]]
Course:: [[Programación III]]
Source:: [[]] #main_page 
%%

- En SQL, programamos procedimientos para interactuar con bases de datos y gestionar datos de manera eficiente.

## Servidor de Bases de Datos

Existen dos enfoques mediante los cuales un servidor proporciona información: 

1. **Servidores de Archivos:** Estos servidores registran todas las transacciones realizadas y luego el cliente realiza el cálculo necesario para obtener los datos requeridos.
   
2. **Servidores de Bases de Datos:** Estos servidores ofrecen resultados ya calculados, lo que resulta en un cliente delgado que no requiere un procesamiento extensivo. Para ello, el servidor debe ser robusto y potente.

### Características de un Servidor de Bases de Datos

Un servidor de bases de datos debe cumplir con ciertas características para asegurar un rendimiento óptimo:

- **Procesador Potente:** Requiere un procesador de alta potencia, como múltiples procesadores i7, para manejar consultas y operaciones complejas.
- **Suficiente RAM:** Se recomienda tener al menos 32 GB de RAM para almacenar en caché datos y acelerar las consultas.
- **Suministro Eléctrico Ininterrumpido (UPS):** Un sistema de energía ininterrumpida protege al servidor contra cortes repentinos de energía, evitando daños y pérdida de datos.
- **Redundancia de Discos (RAID):** Implementar configuraciones RAID para garantizar la tolerancia a fallos y alta disponibilidad de datos.
- **Extracción de Discos en Caliente:** Los discos deben poder ser reemplazados sin apagar el sistema.
- **Redundancia en Fuentes de Energía:** Idealmente, contar con fuentes de energía redundantes para prevenir cortes eléctricos.

### Configuraciones RAID

- **RAID 1:** Conocido como espejado, consiste en dos grupos de discos idénticos, asegurando la redundancia de datos.
- **RAID 5:** Distribuye los datos en tres partes y utiliza un cuarto disco para almacenar un cálculo de verificación. Es eficiente en términos de espacio.
- **RAID 50:** Es una combinación de dos grupos RAID 5 espejados, ofreciendo mayor rendimiento y redundancia.

![[Pasted image 20230809185108.png]]

## Estructura de Discos en SQL

En un servidor de bases de datos SQL, la estructura de discos es crucial. Contiene principalmente dos tipos de archivos:

- **Datos.dat:** Almacena los datos de la base de datos.
- **ArchivoLog.log:** Registra todas las transacciones, permitiendo recuperar la base de datos en caso de fallos.

Esta configuración asegura el funcionamiento confiable y eficiente de una base de datos SQL en un entorno de servidor.
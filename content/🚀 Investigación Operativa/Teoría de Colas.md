# Teoría de Colas

%%
Date:: [[2023-10-24]]
Course:: [[Investigación Operativa]]
Source:: [[U3 - IO]]
%%



La "Teoría de Colas" es un concepto fundamental en el campo de Investigación Operativa que se centra en el estudio y análisis de las filas o colas de espera en sistemas. A continuación, te proporcionaré un breve resumen teórico de este tema:

**Teoría de Colas en Investigación Operativa**

La Teoría de Colas, también conocida como Teoría de Filas, es una rama de la Investigación Operativa que se enfoca en el análisis de sistemas de colas de espera. Estos sistemas son comunes en una variedad de situaciones del mundo real, como colas en supermercados, centros de llamadas, sistemas de transporte, y más. El objetivo principal de la Teoría de Colas es optimizar el rendimiento de estos sistemas, minimizando el tiempo de espera de los clientes o procesos, maximizando la eficiencia y reduciendo los costos operativos.

**Elementos Clave de la Teoría de Colas:**

1. **Llegadas (Arrivals):** Representan la tasa a la que los clientes o procesos llegan al sistema. Se pueden modelar utilizando distribuciones de probabilidad, como la distribución exponencial o la distribución de Poisson.

2. **Servicio (Service):** Refleja la tasa a la que los clientes son atendidos o procesos son completados. Al igual que las llegadas, el servicio también se modela mediante distribuciones de probabilidad.

3. **Capacidad del Sistema:** Esto se refiere a cuántos clientes o procesos pueden ser atendidos simultáneamente en el sistema. Puede ser limitada o infinita, dependiendo de la situación.

4. **Disciplina de la Cola:** Define las reglas para determinar qué cliente será atendido a continuación. Ejemplos comunes incluyen el servicio en orden de llegada (FIFO) o prioridades específicas.

**Métricas de Desempeño en la Teoría de Colas:**

1. **Longitud Promedio de la Cola (Lq):** Mide la cantidad promedio de clientes en la cola de espera.

2. **Tiempo Promedio de Espera (Wq):** Indica el tiempo promedio que un cliente pasa esperando en la cola antes de ser atendido.

3. **Utilización del Sistema (ρ):** Representa la fracción del tiempo que el servidor está ocupado. Se calcula como ρ = λ / μ, donde λ es la tasa de llegada y μ es la tasa de servicio.

**Modelos de Teoría de Colas:**

Existen varios modelos de Teoría de Colas, cada uno con sus propias características y aplicaciones. Algunos de los modelos más comunes incluyen el modelo M/M/1 (una sola cola, un servidor), el modelo M/M/c (una sola cola, múltiples servidores), y el modelo M/G/1 (llegadas siguen una distribución general).

# Modelo MMS

%%
Date:: [[2023-10-24]]
Course:: [[Investigación Operativa]]
Source:: [[U3 - IO]] [[Teoría de Colas]]
%%

El modelo MMS (Modelo M/M/c) es un modelo común en la Teoría de Colas que se utiliza para analizar sistemas de colas de espera con una sola fila y múltiples servidores. Este modelo es especialmente útil para entender situaciones en las que varios servidores trabajan juntos para atender a los clientes o procesos que están esperando en una cola. A continuación, desarrollaré el modelo MMS en detalle:

**Modelo M/M/c:**
- **Llegadas (λ):** Representa la tasa promedio a la que los clientes llegan al sistema. Por lo general, se asume que las llegadas siguen una distribución de Poisson, lo que significa que los intervalos entre las llegadas son aleatorios e independientes. La tasa de llegada se denota como λ.
- **Servicio (μ):** Representa la tasa promedio a la que cada servidor es capaz de atender a los clientes. Al igual que las llegadas, el tiempo de servicio suele modelarse como una distribución exponencial con una tasa de servicio μ.
- **Número de Servidores (c):** Indica la cantidad de servidores disponibles en el sistema para atender a los clientes.

**Parámetros y Notación:**
- $\rho$ (Rho): La utilización del sistema, que es la fracción del tiempo que al menos un servidor está ocupado. Se calcula como $\rho = \frac{\lambda}{c\mu}$. Cuando $\rho$ es menor que 1, el sistema es estable y manejable. Si $\rho$ es igual o mayor que 1, el sistema es inestable y las colas de espera crecerán indefinidamente.
- $L_q$: La longitud promedio de la cola de espera. Representa la cantidad promedio de clientes esperando en la cola antes de ser atendidos. Se calcula como $L_q = \frac{\rho^c\rho}{(c-1)!(1-\rho)}$.
- $W_q$: El tiempo promedio de espera en la cola. Indica cuánto tiempo en promedio un cliente pasa esperando en la cola antes de ser atendido. Se calcula como $W_q = \frac{L_q}{\lambda}$.
- $L$: La longitud promedio del sistema, que es la cantidad promedio de clientes, incluidos los que están siendo atendidos, en el sistema. Se calcula como $L = \lambda W$.
- $W$: El tiempo promedio en el sistema, que es el tiempo promedio que un cliente pasa en el sistema, incluido el tiempo de espera y el tiempo de servicio. Se calcula como $W = \frac{1}{\mu - \lambda}$.
# Problemas de Asignación

%%
Date:: [[2023-08-31]]
Course:: [[Investigación Operativa]]
Source:: [[U1 - IO]]
%%

## Problema
- Tipos de problemas que se resuelven con programación lineal entera.
- Asignar un conjunto de personas o agentes, a un conjunto de ateas de la manera más eficiente posible, según algún criterio.

## Modelo matemático
- **Variables dicotómicas o dummies **
	- Toman valores 0 o 1. Está activa o no?
	- $x_{ij}$ tomará el valor de 1 si el agente i es asignado a la tarea j
- **Función objetivo**
	- $$\text{Maximizar o Minimizar } \sum_{i=1}^n\sum_{j=1}^m c_{ij}\cdot x_{ij}$$
- **Restricciones**
	- Cada agente debe ser asignado a exactamente una tarea. $$\sum_{i=1}^n x_{ij}=1$$
	- Cada tarea debe ser realizada por exactamente un agente.$$\sum_{j=1}^m x_{ij}=1$$
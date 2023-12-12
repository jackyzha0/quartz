# Medidas de Performance en Colas

%%
Date:: [[2023-10-24]]
Course:: [[Investigación Operativa]]
Source:: [[U3 - IO]] [[Teoría de Colas]]
%%

### Medidas de performance
![[Pasted image 20231024112728.png | 300]]

$$\lambda: \text{Cantidad de gente por hora} $$
$$\mu: \text{Tiempo para atender a cada persona}$$
$$S: \text{Cantidad de cajeros}$$
- $L_s$- longitud de unidades en el sistema

```python
Ls = np.mean([row[1] for row in Q.statetracker.history])
Ls_teorico = Ws * lamda
```

- $L_q$- longitud de la cola

```python
Lq = df['queue_size_at_arrival'].mean()
```

- $W_s$ - Tiempo de flujo del sistema

```python
Ws = (df['waiting_time'] + df['service_time']).mean()
```

- $W_q$ - Tiempo de espera en la cola

```python
Wq = df['waiting_time'] .mean()
```

- Capacidad$${S}*{\mu}$$
- Throughput del sistema o utilización $$Min\space {\frac{\lambda}{S*\mu}}$$   
- ρ: Utilización del servidor    $$ρ=Min{λ/(S*μ);1}$$


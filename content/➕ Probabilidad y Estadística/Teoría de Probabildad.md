# Teoría de Probabilidad

- Date:: [[2023-03-25]]
- Course:: [[Probabilidad y Estadística]]
- Source:: [[Conceptos de Probabilidad]]

- Si $A$ es un evento asociado con experimento aleatorio, no podemos indicar con certeza que $A$ ocurrirá o no. Es importante tratar de asociar un número (cuantificar) con el evento $A$, que medirá, la posibilidad de que el evento $A$ ocurra.
- Trataremos de cuantificar la probabilidad de ocurrencia de un evento aleatorio

## Probabilidad Clásica

Enunciada por Laplace en 1812

Definición de probabilidad de Laplace
?
>[!quote] Definición de Laplace
>El cociente entre el número de casos favorables y el número total de casos,
siempre que todos sean igualmente posibles
Sólo aplicables a situaciones ideales, ya que es muy complicado aceptar la “equi-probabilidad” de los sucesos
- Sucesos igualmente probables. Aunque es difícil de probar la equi-probabilidad.

## Aproximación de frecuencia Relativa

Establecida por Von Mises en 1919

Definición de probabilidad de Von Mises (aproximación de frecuencia relativa)
?
- Necesito tener un experimento que lo pueda repetir un número infinito de veces. Entonces la probabilidad de ese suceso $A$ será $\lim_{N\rightarrow\infty}\dfrac{n}{N}=P(S)$
$f_A=\dfrac{n_A}{n}$ el cociente entre el número de veces que ocurre el evento $A$ y l número de veces que se repite el experimento $\epsilon$ se llama **frecuencia relativa** del evento A en las $n$ repeticiones de $\epsilon$
>[!quote] Definición de Von Mises
>Si $n$ es la frecuencia absoluta del suceso $S$ y $N$ el número total de veces que se
repite el experimento aleatorio, entonces $\lim_{N\rightarrow\infty}\dfrac{n}{N}=P(S)$

## Definición Axiomática de Probabilidad
?
Sea $\epsilon$ un experimento y $S$ un espacio muestral asociado con $\epsilon$. Cada evento de $A$ asociamos un número real, designado con $P(A)$ (llamado probabilidad de $A$) el cual satisface las siguientes propiedades:
<!--SR:!2023-04-10,1,230-->

1. $P(S)=1$
2. $0\leq P(A) \leq 1$
3. Si $A$ y $B$ son eventos mutuamente excluyentes $P(A\cup B)=P(A)+P(B)$
4. Si $A_1, A_2, \dots, A_n \dots$ son eventos mutuamente excluyentes de pear en par, entonces $P(\bigcup_{i=1}^\infty A_i) = P(A_1)+P(A_2)+\dots+P(A_n)+\dots$ 

- Plantea la limitación de no proporcionar un método práctico de obtención de probabilidades de sucesos en el mundo real.

### Propiedades derivadas de la definición axiomática de probabilidad
?
- Teorema 1: La probabilidad del suceso imposible es $0:P(\theta)=0$
- Teorema 2: La probabilidad de la unión de dos sucesos cualesquiera es $P(A\cup B)=P(A)+P(B)-P(A\cap B)$
- Teorema 3: Si $A^c$ es el evento complementario de $A$, entonces $P(A^c) = 1- P(A)$
- Teorema 4: Si un suceso $S_1$ está contenido en otro suceso $S$ $(S_1 \subset S)$ entonces $P(S_1)\leq P(S)$
- Teorema 5: La probabilidad de un suceso es menor o igual a 1

## Cálculo de probabilidades en un espacio muestral finito
?
Sea el espacio muestral $S=\{a_1,a_2,\dots,a_n\}$ . A cada suceso elemental $\{a_i\}$ asignamos un número $p_i$ que satisface las siguientes condiciones.
1. $p_i \geq 0, \space i=1,2,\dots,k$
2. $p_1+p_2,\dots+p_k=1$
Supongamos que un evento $A$ está constituido por $r$ resultados, $1\leq r\leq k$, digamos $A=\{a_{j1},a_{j2},\dots,a_{jn}\}$ donde $j_1,j_2,\dots,j_r$. De las condiciones anteriores se deduce que:
$$P(A)=p_{j1}+p_{j2}+\dots+p_{jr}$$
Para cualquier suceso de $A$ de $S$ se puede determinar un modo único $P(A)$ si se conocen las probabilidades de cada uno de los sucesos elementales de $S$

Teorema para el cálculo de probabilidades
?
>[!importante] Teorema (Cálculo de probabilidades)
>Si un experimento puede tener cualquiera de $N$ resultados posibles difrentes igualmente factibles, y si exactamente $n$ de esos resultados corresponden al evento $A$, entonces la probabilidad de este último es: $$P(A)=\dfrac{n}{N}$$

Si los resultados del espacio muestral de un experimento no tienen la misma posibilidad de ocurrir, las probabilidades deben asignares sobre las bases de un conocimiento previo o una base experimental.


#estadistica/conceptos_probabilidad
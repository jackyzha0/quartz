# Parámetros de una distribución de probabilidad

%%
Date:: [[2023-04-12]]
Course:: [[Probabilidad y Estadística]]
Source:: [[Variables aleatorias y distribuciones de probabilidad]]
#estadistica/distribuciones_probabilidad 
%%

## Valor esperado de una variable aleatoria (<mark style="background: #FFF3A3A6;">Esperanza matemática</mark>, media poblacional)

Cómo se define el valor esperado de una variable aleatoria?
?
>[!quote] Definición de valor esperado
>Sea $X$ una variable aleatoria continua con función de distribución $f$. El valor esperado de $X$ se define como $$E(X)=\int_{-\infty}^{\infty}x\cdot f(x)dx$$
- Esta integral no siempre existe, y en tal caso se dirá que la variable aleatoria no tiene esperanza
- <mark style="background: #BBFABBA6;">Si repito un experimento un número infinito de veces, que es lo que se espera que ocurra. El promedio se acercará cada vez más a ese valor esperado.</mark>

## Propiedades del Valor Esperado

Cuáles son las propiedades del valor esperado?
?
1. Si $X=c$, donde $c$ es una constante. Entonces $E(X)=c$
	-  Si $X=c$ se observa que esta variable aleatoria consta de un solo valor $c$, es decir que su masa se concentra en un punto $c$
2. Si $c$ es constante, y $X$ es una variable aleatoria, entonces $$E(cX)=cE(X)$$
	-  Se deduce que $E(aX+b)=aE(x)+b$
		- LINEALIDAD DE LA ESPERANZA
3. Sean $X_1,X_2,\dots,X_n$, $n$ variables aleatorias cuyas esperanzas $E(X_i)$ con $i=1,2,\dots, n$  existen. Entonces $E(X_1+X_2+\dots+X_n)=E(X_1)+E(X2)+\dots+E(X_n)$
4. Sean $(X,Y)$ una variable aleatoria bidimensional y además $X$ e $Y$ son independientes. Entonces $E(X.Y)=E(X)E(Y)$

### Esperanza de una función de una variable aleatoria
Si $X$ es una variable aleatoria cuya función de distribución $p_x$ (caso discreto) o $f_x$ (caso continuo), entonces la esperanza de cualquier función $H(X)$ se puede determinar aplicando la definición de esperanza de la distribución $Y=H(X)$ como sigue:
- Considera $Y=H(X)$ se determina la distribución de probabilidades de $Y$, y entonces se determina $E(Y)$ aplicando las definiciones vistas para esperanza de una variable aleatoria.

## <mark style="background: #FFF3A3A6;">Varianza</mark> de una variable aleatoria

Cómo se define la varianza de una variable aleatoria?
?
>[!quote] Varianza de una v. aleatoria
>Sea $X$ una variable aleatoria. Definimos la varianza de $X$, que se denota $Var(X)$ ó $\sigma^2$ del siguiente modo: $$Var(X)=E(X-E(X))^2$$
- Conceptualmente, es la dispersión que tiene la variable aleatoria con respecto al valor esperado
- La raíz cuadrada positiva de $Var(X)$ se llama <mark style="background: #FFF3A3A6;">desvío estándar</mark> de $X$ y se designa con $\sigma$
	- Puesto que el desvío posee la misma unidad que la epseranza, se utiliza este último
- Como $Var(X)$ es el valor esperado de la variable aleatoria $(X-E(X))^2$ resulta que $Var(X)\geq 0$

Enuncia el teorema sobre el cálculo de la varianza de una variable aleatoria.
?
>[!important] Teorema
>$$Var(X)=E(X^2)-(E(X))^2$$

Enuncie el teorema de la esperanza de una función de una variable aleatoria.
?
>[!important] **Teorema: Esperanza de una función de una variable aleatoria**
Sea $X$ una variable aleatoria continua en $Y=H(X)$ es una función de la variable aleatoria $X$, y $f_x$ es la función de distribución de $X$, entonces $$E(H(X))= \int_{-\infty}^\infty H(X)f_x(X)dx$$

Enuncie las propiedades sobre la varianza de una variable aleatoria.
?
1. $Var(X)=0$ si y solo si $X=c$
2. Sea $c$ una constante, entonces $Var(X+c)=Var(X)$
3. Si $c$ es una constante. Entonces $Var(cX)=c^2Var(X)$
4. Si $(X,Y)$ es una variable aleatoria bidimensional y $X$ e $Y$ son independientes. Entonces: $$Var(X+Y)=Var(X)+Var(Y)$$
5. Si $(X,Y)$ es una variable aleatoria bidimensional y $X$ e $Y$ son independientes y $a,b$ son constantes. Entonces: $$Var(aX+bY)=a^2Var(X)+b^2Var(Y)$$
[[Análisis matemático II]]

- Cómo se define una ecuación diferencial?
    
    **Definición:** Una ecuación diferencial es una ecuación que contiene las derivadas o las diferenciales de una o más variables dependientes con respecto a una o más variables independientes. (E.D.).
    
    $$
    L\dfrac{d^2q}{dt^2}+R\dfrac{dq}{dt}+\dfrac{1}{C}q=E(t)
    $$
    
- Qué es una ecuación diferencial ordinaria?
    
    Una ecuación diferencial ordinaria es aquella que tiene a “y” como variable dependiente y a “x” como variable independiente. 
    
    Se acostumbra expresar a en la forma
    
    $$
    F(x,y,y',y'', \dots,y^{(n)}=0
    $$
    
- Cómo se clasifican las ecuaciones diferenciales?
    
    Las ecuaciones diferenciales se clasifican en varias categorías, como ya vimos, según su tipo en ordinarias y parciales, o según su linealidad u orden, como veremos.
    
    - *Según el orden:*  Corresponde a la derivada de mayor orden que hay en la ecuación
    - *Según el grado:* Es el exponente de la derivada de mayor orden una vez que la ecuación se ha escrito en forma racional y entera.

- Qué es una ecuación diferencial ordinaria (EDO) lineal?
    
    Una ecuación diferencial ordinaria de orden n es lineal si se puede escribir de la forma
    
    $$
    a_n(x)y^{(n)}+a_{n-1}(x)y^{(n-1)}+\dots+a_1(x)y^{(1)}+a_0(x)y=g(x)
    $$
    
    donde los coeficientes $a_i$ para $i=0,1,2,\dots,n$ son funciones de x con $a_n(x)\neq 0$
    
- Definición de función solución de una ED
    
    **Definición** Se dice que una función f con dominio en un intervalo I, es solución de una ED en el Intervalo $I$ si la función satisface la ED en dicho intervalo.
    
- Teorema de existencia y unicidad de las ecuaciones diferenciales
    
    Sea $R$ una región rectangular en el plano $xy$, definida por $R=\{(x,y)/a\leq x\leq b, c\leq y \leq d\}$ que contiene al punto $(x_0,y_0)$ en su interior.
    
    Si $f(x,y)$ y $\frac{\partial f}{\partial y}$ son continuas en $R$, entonces existe un intervalo $I$ con centro en $x_0$ y una única función $y=y(x)$ definida en $I$ que satisface el problema del valor inicial
    
    $$
    y'=f(x,y)\enspace \wedge \enspace y(x_0)=y_0
    $$

[[Ecuaciones diferenciales de variables separables]]
[[Ecuaciones diferenciales exactas]]
[[Ecuaciones diferenciables lineales]]

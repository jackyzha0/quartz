[[Análisis matemático II]]

Date: February 13, 2023 8:16 PM
Status: Done
Year: 2022

- Qué es una “Ecuación diferencial exacta”?
    
    Una ecuación diferencial de la forma $𝑀(𝑥, 𝑦)𝑑𝑥 + 𝑁(𝑥, 𝑦)𝑑𝑦 = 0$  es una ED exacta si existe una función $f$ , de forma $𝑓(𝑥, 𝑦) = 𝑐$, c constante real, tal que
    
    $$
    \dfrac{\partial f(x,y)}{\partial x}=M(x,y)
    $$
    
    $$
    \dfrac{\partial f(x,y)}{\partial y}=N(x,y)
    $$
    
    Nota: La función $f$ es tal que su diferencial total es $M(x,y)dx+N(x,y)dy$
    
- Explique el criterio para las ED exactas
    
    Si $M$ y $N$ son funciones de $𝑥$ e $𝑦$ continuas y tienen derivadas parciales de primer orden continuas en una región del plano $𝑥𝑦$, entonces la condición necesaria y suficiente para que la forma diferencial
    $𝑀(𝑥, 𝑦)𝑑𝑥 + 𝑁(𝑥, 𝑦)𝑑𝑦$ sea exacta es que
    
    $$
    \dfrac{\partial M(x,y)}{\partial y}=\dfrac{\partial N(x,y)}{\partial x}
    $$
    
    En consecuencia si la forma $𝑀(𝑥, 𝑦)𝑑𝑥 + 𝑁(𝑥, 𝑦)𝑑𝑦$ es exacta la ecuación $𝑀(𝑥, 𝑦)𝑑𝑥 + 𝑁(𝑥, 𝑦)𝑑𝑦 = 0$ es una ecuación diferencial exacta.
    
    1. Considero $\dfrac{\partial f(x,y)}{\partial x}=M(x,y)$, luego integro con respecto de $x$
        
        $$
        f(x,y)=\int M(x,y)dx +g(y)
        $$
        
    2. Para determinar $g(y)$, se calcula la derivada parical con respecto de $y$ de ambos lados de la ecuación
        
        $$
        \dfrac{\partial f(x,y)}{\partial y}=\dfrac{\partial}{\partial y}\int M(x,y)dx +g'(y)
        $$
        
        $$
        N(x,y)=\dfrac{\partial}{\partial y}\int M(x,y)dx +g'(y)
        $$
        
        $$
        g'(y)=N(x,y)-\dfrac{\partial}{\partial y}\int M(x,y)dx
        $$
        
    3. Se integra $g'(y)$ para obtener $g(y)$ salvo una constante numética. Al sustituir $g(y)$ en la ecuación (2) se obtiene $f(x,y)$
    4. La solución de la ecuación $𝑀(𝑥, 𝑦)𝑑𝑥 + 𝑁(𝑥, 𝑦)𝑑𝑦 = 0$ tiene la forma
        
        $$
        f(x,y)=c
        $$
        
- Qué son las “Ecuaciones diferenciales reducibles a exactas”?
    - La exactitud en las ecuaciones diferenciales es una condición muy frágil.
    - **Factor integrante**
        
        Si la ecuación diferencial $𝑀(𝑥, 𝑦)𝑑𝑥 + 𝑁(𝑥, 𝑦)𝑑𝑦 = 0$ n es exacta, se puede multiplicar a ambos lados por una función $\mu$ de $x$ e $y$, llamado factor integrante de manera que:
        
        $$
        \dfrac{\partial (\mu M)}{\partial y} = \dfrac{\partial (\mu N)}{\partial x}
        $$
        
        Es decir 
        
        $$
        \mu(x,y)𝑀(𝑥, 𝑦)𝑑𝑥 + \mu(x,y)𝑁(𝑥, 𝑦)𝑑𝑦 = 0
        $$
        
        1. Si $\dfrac{1}{N(x,y)}[M_y(x,y)-N_x(x,y)]=h(x)$ es solamente una función de $x$, entonces:
            
            $$
            \mu(x)=e^{\int h(x)dx}
            $$
            
        2. Si $\dfrac{1}{M(x,y)}[N_x(x,y)-M_y(x,y)]=k(x)$ es solamente una función de $x$, entonces:
            
            $$
            \mu(y)=e^{\int k(y)dy}
            $$




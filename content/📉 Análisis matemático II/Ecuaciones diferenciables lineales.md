[[Análisis matemático II]]

Date: February 13, 2023 8:16 PM
Status: Done
Year: 2022

- Cómo se resuelven las “Ecuaciones diferenciables lineales”?
    
    Una ecuación diferencial lineal de 1er orden tiene la forma
    
    $$
    a_1(x)\dfrac{dy}{dx}+a_0(x)y=g(x)
    $$
    
    con $a_1$ y $a_0$ funciones continuas de $x$ con $a_1(x) \neq 0$
    
    Su **forma estándar $\dfrac{dy}{dx}+p(x)y=q(x)$**
    
    **Pasos para resolverlas**
    
    1. Se expresa en la forma estándar
    2. Se calcula el factor integrante $\mu(x)=e^{\int p(x)dx}$
    3. Se multiplica la ecuación por el factor integrante
        
        $$
        e^{\int p(x)dx}\dfrac{dy}{dx}+e^{\int p(x)dx}p(x)y=e^{\int p(x)dx}q(x)
        $$
        
    4. El lado izquierdo de la ecuación, es el resultado del producto $e^{\int p(x)dx}y$
        
        $$
        \dfrac{d}{dx}[e^{\int p(x)dx}y]=e^{\int p(x)dx}q(x)
        $$
        
    5. Se integra la ecuación a ambos lados
        
        $$
        \int\dfrac{d}{dx}[e^{\int p(x)dx}y]dx=\int e^{\int p(x)dx}q(x)dx\Rightarrow e^{\int p(x)dx}y= \int e^{\int p(x)dx}q(x)+ C
        $$
        
    6. Despejando $y$
        
        $$
        y(x)=\dfrac{1}{e^{\int p(x)dx}}[\int e^{\int p(x)dx}q(x)dx +C]
        $$
        
        $$
        y(x)=\dfrac{1}{\mu (x)}[\int\mu (x)q(x)dx +C]
        $$
        
        Siendo $\mu (x)$ el factor integrante.
[[Análisis matemático II]]

Date: February 13, 2023 8:14 PM
Status: Done
Year: 2022

- Cómo se define una integral curvilínea en un campo vectorial?
    
    Sean $\gamma =f([a,b])$ una curva regular y simple tal que $\gamma \sub D \sub \mathbb{R^n}$ y $D$ un abierto conexo y sea $F:D\sub\mathbb{R^n}\rightarrow \mathbb{R^n}$ un campo vectorial continuo.
    
    Si una partícula recorre la curva pasando por cada punto $P$ con velocidad unitaria dada por $\vec{v}(P)$, se define la integral curvilínea del campo vectorial $\vec{F}$ sobre $\gamma$ como sigue:
    
    $$
    \int_\gamma[\vec{F}(P)\cdot\vec{v}(P)]ds
    $$
    
    Observamos que $\vec{F}(P)\cdot\vec{v}(P)$ es un scalar, por lo tanto la integral anterior queda como integral curvilínea de un campo escalar.
    
    Observamos que $\forall t\in(a,b) \enspace \frac{f'(t)}{||f'(t)||}$  es un vector unitario tangente a $\gamma$ en el punto $P=f(t)$. Y pueden ocurrir dos situaciones
    
    $$
    \vec{v}(f(t))=\dfrac{f'(t)}{||f'(t)||}
    $$
    
    $$
    \vec{v}(f(t))=-\dfrac{f'(t)}{||f'(t)||}
    $$
    
    Si ocurre lo primero
    
    $$
    \int_\gamma[\vec{F}(P)\cdot\vec{v}(P)]ds=\int_a^b\left[F(f(t))\frac{f'(t)}{||f'(t)||}||f'(t)||\right]dt=\int_a^b\left[F(f(t))f'(t)\right]dt
    $$
    
    Si ocurre lo segundo
    
    $$
    \int_\gamma[\vec{F}(P)\cdot\vec{v}(P)]ds=\int_a^b\left[F(f(t))\frac{-f'(t)}{||f'(t)||}||f'(t)||\right]dt=-\int_a^b\left[F(f(t))f'(t)\right]dt
    $$
    
    Además, si $\gamma$ es regular a trozos, también podemos integrar de la siguiente manera
    
    ![Untitled](Images/Integrales%20curvilíneas%20en%20campos%20vectoriales/Untitled.png)
    
- Cuál es la interpretación física de la integral curvilínea en campo vectorial?
    - Si $\vec{F}$ es un campo de fuerza continuo definido en $\gamma$ curva regular y simple, la $\int_\gamma \vec{F}\cdot\vec{v} \enspace ds$ representa el trabajo realizado por el campo $\vec{F}$ para mover una partícula unida a lo largo de $\gamma$

- Enuncie las propiedades de las integrales curvilíneas en campo vectorial
    1. *Linealidad*
        
        Si $\vec{F}$ y $\vec{G}$ son campos vectoriales contínuos definidos en $\gamma$, curva simple, regular o a torozos y $a\in\mathbb{R}$ y $b\in\mathbb{R}$, entonces
        
        $$
        \int_\gamma(a\vec{F}+b\vec{G})\cdot\vec{v}\enspace ds=a\int_\gamma\vec{F}\cdot\vec{v}\enspace ds+ b\int_\gamma\vec{G}\cdot\vec{v}\enspace ds
        $$
        
    2. *Dependencia de la Orientación del Arco*
        
        Si $\vec{F}$ es un campo vectorial continui definido en $D$ que contiene a $\gamma$ curva simple, regular o regular a trozos, entonces
        
        $$
        \int_\gamma\vec{F}\cdot\vec{v}\enspace ds=-\int_{-\gamma}\vec{F}\cdot\vec{v}\enspace ds
        $$
        
        ![Untitled](Images/Integrales%20curvilíneas%20en%20campos%20vectoriales/Untitled%201.png)
        
- Enuncie y demuestre el teorema de Gauss-Green
    
    Sea $R\sub \mathbb{R^2}$ una región simple, cerrada y acotada. Sea $\gamma = \partial R$ una curva cerrada, simple, regular o regular a trozos, parametrizada de manera que se recorre una sola vez en sentido antihorario, al que llamamos sentido positivo, y sea
    
    $F:U\sub\mathbb{R^2}\rightarrow \mathbb{R^2}\\(x,y)\mapsto (F_1(x,y),F_2(x,y))$ un campo vectorial continuamente diferenciable en $U$ abierto que contiene a $R$. Entonces
    
    $$
    \iint_R\left[  \dfrac{\partial F_2(x,y)}{\partial x} -\dfrac{\partial F_1(x,y)}{\partial y} \right]dxdy=\oint_\gamma F_1(x,y)dx+F_2(x,y)dy
    $$
    
    [CLASE6-CURVAS- INTEG. CURVILÍNEAS-parte 2-2022.pdf](CLASE6-CURVAS-_INTEG._CURVILNEAS-parte_2-2022.pdf)
    
- Indique cómo se realiza el cálculo del area de una región mediante Gauss-Green
    
    $$
    \text{Area de R}=\iint_R1dxdy \Rightarrow 2\text{ Area de R}=\iint_R(1+1)dxdy
    $$
    
    Si $F_1(x,y)=-y$  y $F_2(x,y)=x$
    
    $$
    \iint_R(1+1)dxdy=\oint_{\partial R}(-ydx+xdy)
    $$
    
    Luego 
    
	    $$
	    \text{Area de R} = \frac{1}{2}\oint_{\partial R}(-ydx+xdy)
	    $$
[[Análisis matemático II]]

Date: February 13, 2023 8:13 PM
Status: Done
Year: 2022

- Cómo se define una curva parametrizada?
    
    Sea la función $f$ tal que
    
    $$
    f:\mathbb{R}\rightarrow\mathbb{R^n}\\t\mapsto(f_1(t),\dots,f_n(t)) 
    $$
    
     continua en $I=[a,b]$ ó $I=\mathbb{R}$ ó  $I=[a,\infty)$ ó $I=(-\infty,b]$ la **imagen de $f$** se llama curva en $\mathbb{R^n}$. Luego, una curva en $\mathbb{R^n}$ es
    
    $$
    \gamma=f(I)=\{(f_1(t),\dots,f_n(t))\in R^n:t\in I\}
    $$
    
    Decimos que $\gamma$ es la curva parametrizada de $f$
    
- Cómo se define una curva simple?
    - Es una curva simple si la función $f$ es inyectiva
    
    Sea $\gamma=f([a,b])\sub \mathbb{R}$ una curva. Decimos que $\gamma$ es **simple** sii $f$ es inyectiva en $[a,b)$. Es decir
    
    $$
    \forall t_1,t_2\in[a,b)\enspace f(t_1)=f(t_2)\Rightarrow t_1=t_2
    $$
    
- Cómo se define una curva cerrada?
    - Es una curva cerrada si la función $f$ no es inyectiva
    
    Sea $\gamma=f([a,b])\sub \mathbb{R}$ una curva. Decimos que $\gamma$ es **cerrada** sii $f(a)=f(b)$
    
    - **Observación**: Una curva cerrada es aquella en donde el punto inicial coincide con el punto final.

- Cómo se define la longitud de una curva?
    
    Sea $\gamma =f([a,b])\sub \mathbb{R^n}$ una curva simple, fon $f'$ continua en $(a,b)$. Se define la **longitud de $\gamma$** como 
    
    $$
    l(\gamma)=\int_a^b ||f'(t)||dt
    $$
    
- Cómo se define una curva regular?
    
    La curva $\gamma=f([a,b])\sub \mathbb{R}$ se dice regular sii $f$ cumple con 
    
    1. $f$ continua en $[a,b]$
    2. $f'$ continua en $(a,b)$
    3.  $\forall t\in (a,b)\enspace f'(t) \neq \theta$
    
    <aside>
    💡 En todo punto de una curva regular está determinada su dirección por el vector tangente a la misma en dicho punto. La curva regula tiene en todos sus puntos recta tangente, y esta varía con continuidad cuando nos desplazamos sobre la curva. **No tendrá puntas.**
    
    </aside>
    
- Qué es una curva regular a trozos?
    - **Regular a trozos**
        - Se dice regular a trozo sii se puede descomponer en un número finito de arcos regulares
            
            ![Untitled](Images/Integrales%20curvilíneas%20en%20campos%20escalares/Untitled.png)
            
    - Si $\gamma =f([a,b])$ es regular $\Rightarrow$ $\gamma$ tiene longitud

- Cómo se define $-\gamma$?
    
    Sea la función $f$
    
    $$
    f:[a,b]\rightarrow \mathbb{R^3}\\t\mapsto (x(t),y(t),z(t))
    $$
    
    Llamamos $-\gamma$ al argo parametrizado por 
    
    $$
    g:[a,b]\rightarrow \mathbb{R^3}\\t\mapsto f(a+b-t)=(x(a+b-t),y(a+b-t),z(a+b-t))
    $$
    
    Además, se puede probar que:
    
    1. $f([a,b)]=g([a,b)]$
    2. $f(a)=g(a)$ y $f(b) = g(b)$
    
    ![Untitled](Images/Integrales%20curvilíneas%20en%20campos%20escalares/Untitled%201.png)
    
- Cómo se define una integral curvilínea?
    
    Sea $\gamma = f([a,b])$ una curva regular y simple, tal que $\gamma \sub D\sub \mathbb{R^n}$ y $D$ es un abierto conexo. Sea el campo escalar continuo en $F:D\sub \mathbb{R^n}\rightarrow \mathbb{R}$. Se define la integral curvilínea del campo escalar $F$ a lo largo de $\gamma$ como sigue:
    
    $$
    \int_\gamma F(P)ds=\int_a^bF(f(t))||f'(t)||dt
    $$
    
    - Podemos ademas calcular una integral curvilínea a trozos
        
        ![Untitled](Images/Integrales%20curvilíneas%20en%20campos%20escalares/Untitled%202.png)



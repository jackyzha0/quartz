[[Análisis matemático II]]

Date: February 13, 2023 8:08 PM
Status: Done
Year: 2022

- Defina **Integral Doble** a través de la *suma de Riemann*
    
    Sea $R=[a,b]\times [\alpha,\beta]$ un rectángulo del plano $f:R^2 \rightarrow R$ función **acotada** en $R$
    
    Sea $\pi$ una partición de $R$ que determina $n=pq$ rectángulos parciales $R_k = \forall k =1,\dots , n$ con areas $A(R_k)$
    
    ![Untitled](Images/Integrales%20dobles%20en%20coordenadas%20rectangulares/Untitled.png)
    
    Se denomina *Suma de Riemann de la función f relativa a la partición $\pi$ de* $R$
    
    $$
    \sum_{k=1}^{n=pq} f(P_k)A(R_k)
    $$
    
    Es la suma de todos los rectángulos $R_k = \forall k =1,\dots , n$ del producto de la función en un punto arbitrario del mismo por el area del rectángulo parcial
    
    Si existe el número real $I$ , lo llamamos Integral Doble de Riemann de f en R
    
    $$
    I = \lim_{ n\rightarrow \infty} \sum_{k=1}^{n=pq} f(P_k)A(R_k) = \iint_{R}f(x,y)dxdy
    $$
    
- Defina **Integral Doble**
    
     Si $f$ está definida en una región acotada y cerrada $R$ del plano xy, entonces la integral doble de $f$ sobre $R$ viene dada por 
    
    $$
    \iint_{R} f(x,y)dxdy = \lim_{ n\rightarrow \infty} \sum_{k=1}^{n=pq} f(P_k)A(R_k)
    $$
    
    Cuando el límite existe
    
- **Teorema** sobre la integrabilidad de las funciones continuas
    
    Toda función real de dos variables reales continua en un rectángulo de $R^2$ es integrable en él.
    
    ![Untitled](Images/Integrales%20dobles%20en%20coordenadas%20rectangulares/Untitled%201.png)
    
- Defina las **propiedades** de las integrales dobles
    1. Linealidad
        
        Si $f$ y $g$ son funciones continuas en D (cerrada y acotada), **a** y **b** son números reales. Entonces existe  
        
        $$
        \iint_D(af+bg)=a\iint f(x,y) dxdy + b\iint g(x,y) dxdy
        $$
        
    2. Positividad
        
        Si $\forall P \in D, f(P) \geq0 \Rightarrow \iint f(x,y) dxdy \geq 0$
        
    3. Monotonía
        
        Si $f$ y $g$ son funciones continuas en D (cerrada y acotada), tales que 
        
        $$
        f(P)\geq g(P) \Rightarrow \iint_D f(P) dxdy \geq \iint_D g(P) dxdy
        $$
        
    4. Aditividad
        
        Si $f$ es continua en $D$ (cerrada y acotada) y $D_1 \cup D_2 = D$ disyuntos. Entonces 
        
        $$
        \iint_D f(P)dxdy = \iint_{D_1} f(P)dxdy + \iint_{D_2} f(P)dxdy
        $$
        
- Defina el cálculo de las integrales dobles mediante **Integral Iterada o Sucesiva**
    
    Una Integral Iterada o Sucesiva es un tipo especial de integral definida en la que el integrando es también una integral definida.
    
    $$
    \int_a^b \left[ \int_{\alpha(x)}^{\beta(x)}f(x,y)dy\right]dx = \int_a^b  \int_{\alpha(x)}^{\beta(x)}f(x,y)dydx
    $$
    
    O también
    
    $$
    \int_c^d \left[ \int_{\delta(y)}^{\gamma(x)}f(x,y)dx\right]dy = \int_c^d \int_{\delta(y)}^{\gamma(x)}f(x,y)dxdy
    $$
    
    La integral que calculamos primero pueden ser unciones solo de la variable que se integra al último.
    
    - Para que la integral iterada exista, la función interna debe ser continua.

- Defina **región simple en $\mathbb{R^2}$**
    
    Una región D contenida en $R^2$ es **simple** sii toda paralela a los ejes coordenados intercepta a la frontera de D en a los sumo dos puntos, o en los puntos del segmento rectilíneo de la frontera.
    
    ![Untitled](Images/Integrales%20dobles%20en%20coordenadas%20rectangulares/Untitled%202.png)
    
- Enuncie el **Teorema de Fubini**
    
    Sea $f:D \rightarrow R$ continua en $D=\left\lbrace (x,y) \in R^2, a\leq x\leq b, \alpha(x)\leq y\leq \beta(x) \right\rbrace$
    
    $\alpha : [a,b] \rightarrow R$ y $\beta : [a,b] \rightarrow R$  funciones continuas en [a,b]
    
    Entonces f es integrable en D, y vale la igualdad
    
    $$
    \iint_D f(P)dxdy = \int_a^b  \int_{\alpha(x)}^{\beta(x)}f(x,y)dydx
    $$
    
    ![Untitled](Images/Integrales%20dobles%20en%20coordenadas%20rectangulares/Untitled%203.png)
    
    Si $D=\left\lbrace (x,y) \in R^2, c\leq y\leq d, \varphi(y)\leq x\leq \phi(y) \right\rbrace$
    
    $\varphi : [c,d] \rightarrow R$ y $\phi : [c,d] \rightarrow R$  funciones continuas en [c,d]
    
    Entonces f es integrable en D, y vale la igualdad
    
    $$
    \iint_D f(P)dxdy = \int_c^d  \int_{\varphi(y)}^{\phi(y)}f(x,y)dydx
    $$
    
    ![Untitled](Images/Integrales%20dobles%20en%20coordenadas%20rectangulares/Untitled%204.png)
    
    De los dos resultados anteriores, tenemos que:
    
    $$
    \iint_D f(P)dxdy = \int_c^d  \int_{\varphi(y)}^{\phi(y)}f(x,y)dydx = \int_a^b  \int_{\alpha(x)}^{\beta(x)}f(x,y)dydx
    $$
    
- Mencione las **aplicaciones** de las integrales dobles
    1. Calculo de Ares de Regiones Planas
        
        $$
        \text{Área}(D)=\iint_Ddxdy
        $$
        
    2. Cálculo del volumen de un sólido
        
        Dado un sólido T que se proyecta en una región plana 
        
        $$
        D=\left\lbrace (x,y) \in R^2, a\leq x\leq b, \alpha(x)\leq y\leq \beta(x) \right\rbrace
        $$
        
        y está inferiormente limitado por una superficie $z=h(x,y)$ y speriormente por $z=g(x,y)$.
        
        $\alpha$ y $\beta$ continuas en [a,b], h y g continuas en D.
        
        $$
        \text{Vol}(T) = \iint_D[g(x,y)-h(x,y)]dxdy
        $$
        
        ![Untitled](Images/Integrales%20dobles%20en%20coordenadas%20rectangulares/Untitled%205.png)




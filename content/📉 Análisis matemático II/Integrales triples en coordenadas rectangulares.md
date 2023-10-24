[[Análisis matemático II]]

Date: February 13, 2023 8:10 PM
Status: Done
Year: 2022

- Defina integral triple a través de la suma de Riemann
    
    Sean $R=[a_1,b_1]\times[a_2,b_2]\times [a_3,b_3]$ un rectángulo en $\mathbb{R^3}$. 
    
    - Sean $\pi_1$ una partición de $[a_1,b_1]$  con $p+1$ elementos $a_1=x_0<x_1<\dots<x_i<x_p=b_1$
    - Sean $\pi_2$ una partición de $[a_2,b_2]$  con $q+1$ elementos $a_2=y_0<y_1<\dots<y_i<y_q=b_2$
    - Sean $\pi_3$ una partición de $[a_3,b_3]$  con $r+1$ elementos $a_3=z_0<z_1<\dots<z_i<z_r=b_3$
    
    Trazamos por los elementos de $\pi_1$ planos paralelos al plano YOZ, por los de $\pi_2$ planos paralelos al plano XOZ y por los de $\pi_3$ planos paralelos al plano XOY. Queda dividido el paralelepípedo $R$ en $n=pqr$ paralelepípedos parciales $R_k$
    
    ![Untitled](Images/Integrales%20triples%20en%20coordenadas%20rectangulares/Untitled.png)
    
    Sean $P_k$ puntos arbitrarios de $R_k \enspace \forall k=1,\dots,n$  y sea la función $f:R^3\rightarrow R$, se define la suma de Riemann de la función $f$ relativa a la partición $\pi$ de $R$
    
    $$
    \sum^{n=pqr}_{k=1}f(P_k)V(R_k)
    $$
    
    Si existe el número $I$ tal que 
    
    $$
    I=\lim_{n\rightarrow \infty}\sum^{n}_{k=1}f(P_k)V(R_k)
    $$
    
    independiente de la partición $\pi$ de $R$ y de la elección de puntos $P_k$, este número se llama **Integral Triple de Riemann** de $f$ en $R$ que denotamos
    
    $$
    I=\lim_{n\rightarrow \infty}\sum^{n}_{k=1}f(P_k)V(R_k)=\iiint_R f(x,y,z)dxdydz
    $$
    
    y decimos que $f$ es integrable en $R$
    
- Qué es el diámetro de una sección rectangular en $R^3$?
    
    Llamamos **diámetro** de $R_k$ al número real
    
    $$
    d_k=\max \{d(P,Q)/P\in R_k \wedge Q\in R_k\}
    $$
    
- Teorema sobre las integrales triples y las funciones continuas
    
    Toda función real de tres variable continua en un paralelepípedo de $R^3$ es integrable en él.
    
    $f:R\sub \mathbb{R}^3\rightarrow \mathbb{R}$ continua en $R$
    
     $\Rightarrow$ $f$ es integrable en $R$ (existe $\iiint_R f(x,y,z)dxdydz$)
    
- Defina Integral Triple
    
    Si $f$ es una función de tres variables independientes continua en una región sólida y acotada $S$, entonces la integral triple de $f$ sobre $S$ se define como
    
    $$
    \iiint_S f(x,y,z)dxdydz = \lim_{n\rightarrow \infty}\sum^{n}_{k=1}f(P_k)V(R_k)
    $$
    
    si el límite existe.
    
- Enuncie las propiedades de las integrales triples
    1. Linealidad
    2. Positividad
    3. Monotonia
    4. Aditividad respecto de la región de integración

- Defina Region Simple en $\mathbb{R^3}$
    - Cuando trazamos rectas paralelas a los ejes coordenados, y corta en dos puntos, o en la frontera. Si cortara en más puntos, no es una región simple.
    
    Una región $D\sub \mathbb{R^3}$ se dice simple sii **toda paralela a los ejes coordenados** intersecta a la frontera de $D$ en a lo sumo dos puntos o en los puntos de un segmento rectilíneo de la frontera.
    
    Una región espacial $D$ que puede ser descrita como sigue
    
    $$
    D=\{ (x,y,z\in \mathbb{R^3}:a\leq x \leq b, \alpha(x) \leq y \leq \beta(x), h(x,y)\leq z \leq g(x,y), \enspace \\ a,b\in \mathbb{R}) \}
    $$
    
    Con $\alpha : [a,b]\rightarrow \mathbb{R}$ y $\beta : [a,b]\rightarrow \mathbb{R}$ continuas en $[a,b]$
    
    Con $h : D'\rightarrow \mathbb{R}$ y $g : D'\rightarrow \mathbb{R}$ continuas en $D'$
    
    $$
    D'=\{(x,y)\in \mathbb{R^2}:a\leq x\leq b, \alpha(x) \leq y \leq \beta(x)\}
    $$
    
    y todas las que tienen su forma son regiones simples respecto al eje $\vec{OZ}$ pues las rectas paralelas a dicho eje cortan a la frontera en $D$ a lo sumo en dos puntos o en los de un segmento de la frontera.
    
- Teorema sobre las integrales triples
    
    Sea $f:D\rightarrow \mathbb{R}$ continua en $D$ definida como sigue
    
    $$
    D=\{ (x,y,z\in \mathbb{R^3}:a\leq x \leq b, \alpha(x) \leq y \leq \beta(x), h(x,y)\leq z \leq g(x,y), \enspace\\ a,b\in \mathbb{R}) \}
    $$
    
    Con $\alpha : [a,b]\rightarrow \mathbb{R}$ y $\beta : [a,b]\rightarrow \mathbb{R}$ continuas en $[a,b]$
    
    Con $h : D'\rightarrow \mathbb{R}$ y $g : D'\rightarrow \mathbb{R}$ continuas en $D'$
    
    $$
    D'=\{(x,y)\in \mathbb{R^2}:a\leq x\leq b, \alpha(x) \leq y \leq \beta(x)\}
    $$
    
    Entonces $f$ es integrable en $D$ y vale:
    
    $$
    \iiint_Df(x,y,z)dxdydz =\int_a^bdx\int_{\alpha(x)}^{\beta(x)}dy\int_{h(x,y)}^{g(x,y)}f(x,y,z)dz
    $$
    
- Mencione las aplicaciones de las integrales triples
    1. Cálculo de Volúmenes de sólidos en el espacio
        - Integral triple sobre un sólido, donde $f(x,y,z) = 1$
        
        Dado un sólido $T$ región en $\mathbb{R^3}$ cerrada, acotada, se define el volumen de T como 
        
        $$
        V(T)=\iiint_T dxdydz 
        $$
        
    2. Cálculo de masas distribuidas en regiones espaciales
        - Cuando la densidad de masa de un sólido varía en función de la posición espacial
        - Los ejercicios me van a dar la función $\delta(x,y,z)$
        
        Si un sólido ocupa una región $D$ del espacio, cerrada, acotada, en el que está distribuida una masa total M, según densidad de masa $\delta$, donde $\delta$ es una función continua en x,y,z en D
        
        $$
        M= \iiint_D\delta(x,y,z)dxdydz 
        $$
        
    3. Cálculo de centro de masa y momentos de inercia
        
        (No se ve en el curso)



[[Análisis matemático II]]

Date: February 13, 2023 8:18 PM
Status: Done
Year: 2022

- Cómo se define una sucesión?
    
    Una sucesión es una función cuyo dominio es el conjunto de números naturales. Es decir $f:\mathbb{N}\rightarrow\mathbb{R}$
    
- Qué es el límite de una sucesión?
    
    Sea la sucesión $\{a_n\}$ y sea $L$ un número real. Diremos que el límite de la sucesión $\{a_n\}$ es $L$ si y solo si
    
    $$
    \lim_{n\rightarrow \infty}a_n=L
    $$
    
- Cómo es la convergencia de sucesiones?
    - Sucesión Convergente
        - Se dice que la sucesión $\{a_n\}$ es convergente si y solo si existe el $\lim_{n\rightarrow \infty}a_n$, es decir $\lim_{n\rightarrow \infty}a_n=L$,  $L\in\mathbb{R}$
    - Sucesión Divergente
        - Se dice que la sucesión $\{a_n\}$ es convergente si y solo si no existe el $\lim_{n\rightarrow \infty}a_n$
- Enuncie el teorema del valor absoluto para sucesiones
    
    Dada una sucesión $\{a_n\}$ si
    
    $$
    \lim_{n\rightarrow \infty}|a_n|=0 \Rightarrow \lim_{n\rightarrow \infty}a_n = 0
    $$
    
- Qué es la monotonía en las sucesiones?
    
    Se dice que una sucesión $\{a_n\}$ es
    
    - **Creciente** si $\forall n\geq 1, a_n\leq a_{n+1}$
    - **Decreciente** si $\forall n\geq 1, a_n\geq a_{n+1}$
    - **Monótona** si es creciente o decreciente
- Cómo puede estar acotada una sucesión?
    
    Se dice que una sucesión $\{a_n\}$ es
    
    - **Acotada superiormente** si existe un número real $M$ tal que $a_n \leq M \enspace \forall n\in\mathbb{N}$. El número real $M$ recibe el nombre de cota superior de la sucesión.
    - **Acotada inferiormente** si existe un número real $m$ tal que $a_n \geq m \enspace \forall n\in\mathbb{N}$. El número real $m$ recibe el nombre de cota inferior de la sucesión.
- Teorema de sucesiones monótonas acotadas
    
    Si una sucesión $\{a_n\}$ es monótona y acotada, entonces es convergente.
    
- Teorema de sucesiones convergentes
    
    Si una sucesión es convergente, entonces es acotada.
    
- Cuáles son las propiedades de las sucesiones convergentes
    
    ![Untitled](Images/Sucesiones/Untitled.png)
    
    ![Untitled](Images/Sucesiones/Untitled%201.png)



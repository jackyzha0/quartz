[[Análisis matemático II]]

Date: February 13, 2023 8:18 PM
Status: Done
Year: 2022

- Qué son las series alternadas?
    
    Se llama serie alternada a las series que poseen alternamente términos positivos y negativos, es decir
    
    $$
    \sum_{n=1}^\infty (-1)^na_n
    $$
    
    $$
    \sum_{n=1}^\infty (-1)^{n+1}a_n
    $$
    
- Cuál es el cr iterio de convergencia para series alternadas?
    
    Sea $a_n>0\$ . Las series alternadas  $\sum_{n=1}^\infty (-1)^na_n$ y  $\sum_{n=1}^\infty (-1)^{n+1}a_n$ converge si se cumplen:
    
    1. $\lim_{n\rightarrow\infty}a_n$=0
    2. $a_{n+1}\leq a_n$, para todo n.

- En qué consiste la convergencia absoluta y condicional?
    
    Existen dos tipos de convergencia
    
    1. La serie $\sum_{n=1}^\infty a_n$ es **absolutamente convergente** si la serie de los valores absolutos $\sum_{n=1}^\infty |a_n|$ es convergente
    2. La serie $\sum_{n=1}^\infty a_n$ es **condicionalmente convergente** si la serie $\sum_{n=1}^\infty a_n$ es convergente y la serie de valores absolutos $\sum_{n=1}^\infty |a_n|$ es divergente
        - La serie converge, y la del valor absoluto diverge.
    - La convergencia absoluta es mucho mas fuerte que la condicionalmente

- Teorema de convergencia absoluta
    
    Si una serie $\sum_{n=1}^\infty a_n$ es absolutamente convergente, entonces es convergente.
    
- Explique el criterio del cociente
    - Solo utilizo mi serie, no la comparo con ninguna otra.
    
    Sea $\sum_{n=1}^\infty a_n$ una serie con todos sus términos no nulos, entonces
    
    1. $\sum_{n=1}^\infty a_n$ es **absolutamente convergente** si
        
        $$
        \lim _{n\rightarrow \infty}\dfrac{a_{n+1}}{a_n}<1
        $$
        
    2. $\sum_{n=1}^\infty a_n$ es **divergente** si
        
        $$
        \lim _{n\rightarrow \infty}\dfrac{a_{n+1}}{a_n}>1 \enspace \text{ó} \enspace \lim _{n\rightarrow \infty}\dfrac{a_{n+1}}{a_n} = \infty 
        $$
        
    3. Si $\lim _{n\rightarrow \infty}\dfrac{a_{n+1}}{a_n}=1$ el **criterio no decide**

- Explique el criterio de la Raíz o de Cauchy
    - Solo utilizo mi serie, no la comparo con ninguna otra.
    - Calculo el límite de la raiz n-ésima del valor absoluto.
    
    Sea $\sum_{n=1}^\infty a_n$ una serie con todos sus términos no nulos, entonces
    
    1. $\sum_{n=1}^\infty a_n$ es absolutamente convergente si
        
        $$
        \lim _{n\rightarrow \infty}n\sqrt{|a_n|}<1
        $$
        
    2. $\sum_{n=1}^\infty a_n$ es divergente si
        
        $$
        \lim _{n\rightarrow \infty}n\sqrt{|a_n|}>1 \enspace \text{ó} \enspace \lim _{n\rightarrow \infty}n\sqrt{|a_n|}= \infty 
        $$
        
    3. Si $\lim _{n\rightarrow \infty}n\sqrt{|a_n|}=1$ el criterio no decide
    
    ![Untitled](Images/Series%20alternadas/Untitled.png)



[[Análisis matemático II]]

Date: February 13, 2023 8:18 PM
Status: Done
Year: 2022

- Cómo se define una serie infinita?
    - Surge a partir de la sucesiones. Es una suma infinita de términos, y la expresión de la suma será una serie.
    - Una serie infinita es una expresión de la forma
        
        $$
        \sum_{n=1}^{\infty}a_n=a_1+a_2+a_3+\dots+a_n+\dots
        $$
        
    
    Para hallar la suma de una serie, consideramos la **sucesión de sumas parciales**
    
    - Queremos ver si es convergente o no. Primero vamos a utilizar las sumas parciales, donde cada S_n es la suma de todos los términos. Desde el primero hasta el n-ésimo
    
    ![Untitled](Images/Series%20numéricas%20de%20términos%20positivos/Untitled.png)
    
    - El comportamiento de la serie será el mismo que el de la sucesión $\{S_n\}$. La naturaleza de la serie va a depender del comportamiento de la sucesión.
- Cómo se define la convergencia de una serie?
    
    ### Definición: Convergencia de una serie
    
    Dada la serie $\sum_{n=1}^{\infty}a_n$ y $\{S_n\}=\left\{\sum_{n-=1}^{\infty}a_n\right\}$ la sucesión de sumas parciales que define a la serie. Decimos que:
    
    - La serie infinita $\sum_{n=1}^{\infty}a_n$ es convergente y tiene suma $S$ si y solo si la sucesión de sumas parciales asociada a la serie $\{S_n\}$ converge a $S$
        
        $$
        \lim_{n\rightarrow\infty}S_n=S
        $$
        
        Entonces podemos escribir 
        
        $$
        \sum_{n=1}^{\infty}a_n=S
        $$
        
    - La serie infinita $\sum_{n=1}^{\infty}a_n$ es divergente si y solo si la sucesión de sumas parciales asociada a la serie $\{S_n\}$ diverge. La serie no tiene suma.
- Cómo se define una serie geométrica?
    
    Es la serie en la cual, cada término es igual al anterior multiplicado por una constante, llamada razón de la serie. En particular, si el primer término es a y la razón es $r$ la
    serie será:
    
    $$
    \sum_{n=0}^\infty ar^n=a+ar+ar^2+ar^3+\dots
    $$
    
    Esta serie es convergente si $0<|r|<1$ y en tal caso, converge a 
    
    $$
    \sum_{n=0}^\infty ar^n=\dfrac{a}{1-r}
    $$
    
    y es divergente si $|r|\geq 1$
    
- Cómo se define la serie armónica?
    
    $$
    \sum_{n=1}^\infty \frac{1}{n}=1+\frac{1}{2}+\frac{1}{3}+\dots
    $$
    
    Y es divergente
    
- Cómo se define la serie hiperarmónica o serie p?
    
    $$
    \sum_{n=1}^\infty \frac{1}{n^p}=1+\frac{1}{2^p}+\frac{1}{3^p}+\dots
    $$
    
    naturaleza depende del valor de la constante “p”, esto es:
    
    - Si $p > 1$ la serie es convergente
    - Si $p \leq 1$ la serie es divergente
    
- Explique las propiedades de las series
    
    ![Untitled](Images/Series%20numéricas%20de%20términos%20positivos/Untitled%201.png)
    
    ![Untitled](Images/Series%20numéricas%20de%20términos%20positivos/Untitled%202.png)
    
    ![Untitled](Images/Series%20numéricas%20de%20términos%20positivos/Untitled%203.png)
    
    ![Untitled](Images/Series%20numéricas%20de%20términos%20positivos/Untitled%204.png)
    
- Enuncie y demuestre el teorema condición necesaria para la convergencia
    
    Si la serie $\sum a_n$ converge, entonces: $\lim_{n\rightarrow \infty}a_n =0$
    
    ![Untitled](Images/Series%20numéricas%20de%20términos%20positivos/Untitled%205.png)
    
    Si el $\lim_{n\rightarrow \infty}a_n \neq 0$ o no existe $\Rightarrow \sum a_n$ es divergente
    
- Explique el criterio de comparación directa
    - Para las comparaciones generalmente utilizaremos las series conocidas y mencionadas anteriormente.
    
    ![Untitled](Images/Series%20numéricas%20de%20términos%20positivos/Untitled%206.png)
    
- Explique el criterio de comparación asintótica
    
    ![Untitled](Images/Series%20numéricas%20de%20términos%20positivos/Untitled%207.png)
    
- Explique el criterio de la integral
    
    ![Untitled](Images/Series%20numéricas%20de%20términos%20positivos/Untitled%208.png)
    
    ![Untitled](Images/Series%20numéricas%20de%20términos%20positivos/Untitled%209.png)
    
    - La integral y la serie tendrán el mismo comportamiento.
    
    $$
    \sum_{k=2}^\infty\dfrac{1}{k-1}
    $$
    
    1. Llamo $f(x)=1/(x-1)$
    2. La serie comienza en 2, por lo tanto considero la función $\forall x, x\geq 2$
    3. Debo ver si es positiva, continua y decreciente.
        
        $f'(x)=\dfrac{-1}{(x-1)^2}$ función negativa para todo valor de su dominio